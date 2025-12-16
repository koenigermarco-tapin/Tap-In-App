#!/usr/bin/env python3
"""
Fix all German assessment files
"""

import os
import re
from pathlib import Path

GAMIFICATION_IMPORTS = '''
<!-- Gamification System -->
<script src="../../js/gamification-v10.js"></script>
<link rel="stylesheet" href="../../css/gamification-v10.css">
'''

COMPLETE_ASSESSMENT_FUNCTION = '''
function completeAssessment(assessmentType) {
  if (!assessmentType) {
    const filename = window.location.pathname.split('/').pop();
    if (filename.includes('belt')) assessmentType = 'belt';
    else if (filename.includes('deep-dive')) assessmentType = 'deepdive';
    else if (filename.includes('mental-health')) assessmentType = 'mentalhealth';
    else if (filename.includes('worker-type')) assessmentType = 'workertype';
    else if (filename.includes('team')) assessmentType = 'team';
    else if (filename.includes('leadership')) assessmentType = 'leadership';
    else assessmentType = 'general';
  }
  
  const key = `assessment_${assessmentType}_completed`;
  const completedAssessments = JSON.parse(localStorage.getItem('completedAssessments') || '{}');
  
  if (completedAssessments[key]) {
    console.log('Assessment bereits abgeschlossen');
    redirectAfterCompletion();
    return;
  }
  
  completedAssessments[key] = {
    completedAt: new Date().toISOString(),
    xpEarned: 100
  };
  localStorage.setItem('completedAssessments', JSON.stringify(completedAssessments));
  
  if (typeof TapInGamification !== 'undefined') {
    TapInGamification.addXP(100, `${assessmentType} assessment abgeschlossen`);
  }
  
  showAchievement('Assessment abgeschlossen! +100 XP');
  setTimeout(redirectAfterCompletion, 2000);
}

function redirectAfterCompletion() {
  const filename = window.location.pathname.split('/').pop();
  if (filename.includes('belt')) {
    window.location.href = '../../gym/gym-dashboard-de.html';
  } else if (filename.includes('deep-dive')) {
    window.location.href = '../../hub/learning-hub-de.html';
  } else if (filename.includes('mental-health')) {
    window.location.href = '../../gym/gym-dashboard-de.html';
  } else {
    window.location.href = '../../gym/gym-dashboard-de.html';
  }
}

function showAchievement(message) {
  const achievement = document.createElement('div');
  achievement.className = 'achievement-toast';
  achievement.innerHTML = `
    <svg class="achievement-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
    </svg>
    <span>${message}</span>
  `;
  document.body.appendChild(achievement);
  setTimeout(() => achievement.classList.add('show'), 100);
  setTimeout(() => {
    achievement.classList.remove('show');
    setTimeout(() => achievement.remove(), 300);
  }, 3000);
}
'''

ACHIEVEMENT_CSS = '''
.achievement-toast {
  position: fixed;
  top: 20px;
  right: 20px;
  background: linear-gradient(135deg, #00ff88 0%, #00cc6a 100%);
  color: white;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  box-shadow: 0 4px 20px rgba(0, 255, 136, 0.3);
  transform: translateX(400px);
  opacity: 0;
  transition: all 0.3s ease;
  z-index: 10000;
  font-weight: 600;
}

.achievement-toast.show {
  transform: translateX(0);
  opacity: 1;
}

.achievement-icon {
  width: 24px;
  height: 24px;
  flex-shrink: 0;
}
'''

def get_relative_path(filepath):
    """Determine relative path to js/css based on file location"""
    path_parts = Path(filepath).parts
    depth = len([p for p in path_parts if p not in ['src', 'pages']])
    
    if 'assessments' in path_parts:
        return '../../'
    elif 'gym' in path_parts:
        return '../../'
    else:
        return '../'

def fix_german_assessment(filepath):
    """Apply all fixes to a German assessment file"""
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_content = content
    changes_made = []
    
    # Determine relative path for imports
    rel_path = get_relative_path(filepath)
    gamification_imports = GAMIFICATION_IMPORTS.replace('../../', rel_path)
    
    # Fix 1: Add gamification if missing
    if 'gamification-v10.js' not in content:
        if '</body>' in content:
            # Insert before </body>
            content = content.replace('</body>', gamification_imports + '\n</body>')
            changes_made.append('Added gamification imports')
    
    # Fix 2: Add completeAssessment function if missing
    if 'function completeAssessment' not in content:
        # Find last </script> before </body>
        script_pos = content.rfind('</script>', 0, content.rfind('</body>'))
        if script_pos > 0:
            content = content[:script_pos] + COMPLETE_ASSESSMENT_FUNCTION + '\n' + content[script_pos:]
            changes_made.append('Added completeAssessment function')
        elif '</script>' in content:
            # Fallback: add before last </script>
            script_pos = content.rfind('</script>')
            content = content[:script_pos] + COMPLETE_ASSESSMENT_FUNCTION + '\n' + content[script_pos:]
            changes_made.append('Added completeAssessment function')
    
    # Fix 3: Add achievement CSS if missing
    if '.achievement-toast' not in content:
        if '</style>' in content:
            style_pos = content.rfind('</style>')
            content = content[:style_pos] + ACHIEVEMENT_CSS + '\n' + content[style_pos:]
            changes_made.append('Added achievement CSS')
        elif '<style>' in content:
            # Add after first <style> tag
            style_pos = content.find('<style>') + len('<style>')
            content = content[:style_pos] + '\n' + ACHIEVEMENT_CSS + content[style_pos:]
            changes_made.append('Added achievement CSS')
        else:
            # Add style block in head
            if '</head>' in content:
                content = content.replace('</head>', f'<style>{ACHIEVEMENT_CSS}</style>\n</head>')
                changes_made.append('Added achievement CSS')
    
    # Fix 4: Fix broken onclick handlers
    content = re.sub(
        r'onclick="([^"]*)\n\s*',
        r'onclick="\1; ',
        content
    )
    if 'onclick' in original_content and content != original_content:
        changes_made.append('Fixed broken onclick handlers')
    
    # Fix 5: Remove stray variables
    content = re.sub(r'^\s*(const|let|var)\s+\w+\s*=\s*$', '', content, flags=re.MULTILINE)
    content = re.sub(r'^\s*(const|let|var)\s+\w+\s*=\s*//.*$', '', content, flags=re.MULTILINE)
    
    # Fix 6: Fix icon typos
    if 'icon-bok-open' in content:
        content = content.replace('icon-bok-open', 'icon-book-open')
        changes_made.append('Fixed icon typos')
    if 'icon-cheveron-right' in content:
        content = content.replace('icon-cheveron-right', 'icon-chevron-right')
        changes_made.append('Fixed icon typos')
    
    # Fix 7: Replace safeSetInnerHTML
    if 'safeSetInnerHTML' in content:
        content = re.sub(
            r'safeSetInnerHTML\(([^,]+),\s*([^)]+)\)',
            r'\1.innerHTML = \2',
            content
        )
        changes_made.append('Replaced safeSetInnerHTML')
    
    # Only write if changes were made
    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True, changes_made
    
    return False, []

def main():
    """Fix all German assessment files"""
    
    # Find all German assessment files
    assessment_files = []
    
    # Common patterns
    patterns = [
        '**/*assessment*-de.html',
        '**/*-carousel-de.html',
        '**/mental-health-*-de.html',
        '**/limiting-beliefs-*-de.html'
    ]
    
    for pattern in patterns:
        for filepath in Path('.').rglob(pattern):
            if filepath.is_file() and '-de.html' in str(filepath):
                assessment_files.append(str(filepath))
    
    # Remove duplicates
    assessment_files = list(set(assessment_files))
    assessment_files.sort()
    
    print(f'Found {len(assessment_files)} German assessment files:\n')
    
    fixed_count = 0
    for filepath in assessment_files:
        print(f'Processing: {filepath}')
        fixed, changes = fix_german_assessment(filepath)
        
        if fixed:
            fixed_count += 1
            for change in changes:
                print(f'  ✅ {change}')
        else:
            print(f'  ℹ️  No changes needed')
        print()
    
    print(f'\n✅ Fixed {fixed_count}/{len(assessment_files)} German assessment files')

if __name__ == '__main__':
    main()

