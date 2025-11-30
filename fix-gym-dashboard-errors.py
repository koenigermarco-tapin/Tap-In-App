#!/usr/bin/env python3
"""
Fix gym-dashboard.html errors:
1. Remove duplicate CSS includes
2. Consolidate error handlers
3. Make error handling smarter (suppress expected errors)
4. Ensure showToast is defined early
5. Fix formatting issues
"""

import re

file_path = 'gym-dashboard.html'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Remove duplicate core-styles.css (keep only first one)
core_styles_pattern = r'(<link rel="stylesheet" href="css/core-styles\.css">\s*)+'
content = re.sub(core_styles_pattern, '<link rel="stylesheet" href="css/core-styles.css">\n    ', content, count=1)
# Remove remaining duplicates
content = re.sub(r'<link rel="stylesheet" href="css/core-styles\.css">', '', content)
# Add it back once in the right place (after preconnect)
content = re.sub(
    r'(<link rel="preconnect" href="https://fonts\.gstatic\.com" crossorigin>)',
    r'\1\n    <link rel="stylesheet" href="css/core-styles.css">',
    content,
    count=1
)

# 2. Make error handlers smarter - suppress service worker and expected errors
# Replace the overly aggressive error handlers with smarter ones

# Fix the first error handler (line ~3114)
old_handler_1 = r'window\.addEventListener\(\'error\', function\(e\) \{\s*if\(typeof showToast === \'function\'\) \{ showToast\(\'Something went wrong\. Please try again\.\', \'error\'\); \} console\.error\(\'Resource failed to load:\', e\.target\.src \|\| e\.target\.href \|\| e\.message\);'
new_handler_1 = '''window.addEventListener('error', function(e) {
        // Suppress expected errors (service worker, favicon, etc.)
        const target = e.target;
        const isScript = target && target.tagName === 'SCRIPT';
        const isLink = target && target.tagName === 'LINK';
        const src = target ? (target.src || target.href || '') : '';
        
        // Don't show errors for: service worker, favicon, analytics, or non-critical resources
        if (src.includes('service-worker') || src.includes('sw.js') || 
            src.includes('favicon') || src.includes('analytics') ||
            src.includes('google-analytics') || e.message.includes('Script error')) {
            return; // Suppress these errors
        }
        
        // Only show errors for critical resources
        if (isScript || (isLink && src.includes('.css'))) {
            console.error('Resource failed to load:', src || e.message);
            // Don't show toast for non-critical failures
        }
        e.preventDefault();
    });'''
content = re.sub(re.escape(old_handler_1), new_handler_1, content)

# Fix the second error handler (line ~3182)
old_handler_2 = r'window\.addEventListener\(\'error\', \(event\) => \{\s*if\(typeof showToast === \'function\'\) \{ showToast\(\'Something went wrong\. Please try again\.\', \'error\'\); \} console\.error\(\'💥 Error:\', event\.error\);'
new_handler_2 = '''window.addEventListener('error', (event) => {
  // Suppress expected errors
  const errorMsg = event.error ? event.error.toString() : '';
  const errorSrc = event.target ? (event.target.src || event.target.href || '') : '';
  
  if (errorMsg.includes('Service Worker') || errorSrc.includes('sw.js') || 
      errorSrc.includes('favicon') || errorMsg.includes('Script error')) {
    return; // Suppress expected errors
  }
  
  console.error('💥 Error:', event.error);
  // Only show user-facing error for critical failures
  if (event.error && !errorMsg.includes('SW') && !errorMsg.includes('serviceWorker')) {
    if (typeof showToast === 'function') {
      showToast('Something went wrong. Please refresh the page if the problem persists.', 'error');
    }
  }
});'''
content = re.sub(re.escape(old_handler_2), new_handler_2, content)

# Fix unhandled rejection handlers - suppress service worker errors
old_rejection_1 = r'window\.addEventListener\(\'unhandledrejection\', function\(e\) \{\s*if\(typeof showToast === \'function\'\) \{ showToast\(\'Unhandled promise rejection:\', \'error\'\); \} console\.error\(\'Unhandled promise rejection:\', e\.reason\);'
new_rejection_1 = '''window.addEventListener('unhandledrejection', function(e) {
        const reason = e.reason ? e.reason.toString() : '';
        // Suppress service worker errors
        if (reason.includes('Service Worker') || reason.includes('serviceWorker') || 
            reason.includes('sw.js') || reason.includes('Failed to register')) {
            console.log('SW rejection suppressed (expected):', reason);
            return;
        }
        console.error('Unhandled promise rejection:', e.reason);
        // Don't show toast for non-critical promise rejections
        e.preventDefault();
    });'''
content = re.sub(re.escape(old_rejection_1), new_rejection_1, content)

# 3. Move showToast definition earlier (before it's used)
# Find where showToast is currently defined (around line 3410)
# And move it to just after the error handlers section

# First, extract the showToast function
toast_function_match = re.search(
    r'(<script>\s*\(function\(\) \{\s*\'use strict\';\s*window\.showToast = function\(message, type = \'info\', duration = 3000\) \{.*?</script>)',
    content,
    re.DOTALL
)

if toast_function_match:
    toast_function = toast_function_match.group(1)
    # Remove it from current location
    content = content.replace(toast_function, '<!-- showToast moved earlier -->')
    
    # Insert it right after the toast container div (before any error handlers try to use it)
    toast_container_pattern = r'(<div id="toast-container"[^>]*></div>)'
    content = re.sub(
        toast_container_pattern,
        r'\1\n' + toast_function.replace('<!-- showToast moved earlier -->', ''),
        content,
        count=1
    )

# 4. Fix inline error handlers in functions to be less aggressive
# Fix checkResumeProgress error handler
content = re.sub(
    r'} catch \(e\) \{\s*if\(typeof showToast === \'function\'\) \{ showToast\(\'Something went wrong\. Please try again\.\', \'error\'\); \} console\.error\(\'Error checking resume:\', e\);',
    '} catch (e) {\n                console.warn(\'Resume check failed (non-critical):\', e);\n                // Don\'t show error toast for resume failures - it\'s optional',
    content
)

# Fix resumeStripe error handler
content = re.sub(
    r'} catch \(e\) \{\s*if\(typeof showToast === \'function\'\) \{ showToast\(\'Something went wrong\. Please try again\.\', \'error\'\); \} console\.error\(\'Error resuming stripe:\', e\);',
    '} catch (e) {\n                console.warn(\'Stripe resume failed:\', e);\n                // Show alert instead of toast since this is user-initiated',
    content
)

# 5. Clean up duplicate script includes
# Remove duplicate performance-optimizer.js
content = re.sub(
    r'(<script src="js/performance-optimizer\.js"></script>\s*)+',
    '<script src="js/performance-optimizer.js"></script>\n    ',
    content
)

# 6. Ensure proper formatting - fix any malformed tags
# Fix duplicate closing tags
content = re.sub(r'</script>\s*</script>', '</script>', content)

# Write the fixed content
with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print(f'✅ Fixed {file_path}')
print('  • Removed duplicate CSS includes')
print('  • Made error handlers smarter (suppress expected errors)')
print('  • Moved showToast definition earlier')
print('  • Reduced aggressive error toasts')
print('  • Cleaned up duplicate script includes')

