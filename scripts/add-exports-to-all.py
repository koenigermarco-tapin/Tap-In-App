#!/usr/bin/env python3
"""
Add data export functionality to all assessment files
"""

import re
import os

# Configuration for each assessment type
ASSESSMENT_CONFIGS = {
    'team-assessment-enhanced-v2.de.html': {
        'type': 'team-dynamics',
        'framework': 'Patrick Lencioni',
        'categories': ['Trust', 'Healthy Conflict', 'Commitment', 'Accountability', 'Results Focus'],
        'lang': 'de'
    },
    'mental-health-assessment.html': {
        'type': 'mental-health',
        'framework': 'Mental Wellness Framework',
        'categories': ['Emotional Well-being', 'Physical Vitality', 'Stress Resilience', 'Social Connection', 'Purpose & Meaning'],
        'lang': 'en'
    },
    'mental-health-assessment.de.html': {
        'type': 'mental-health',
        'framework': 'Mental Wellness Framework',
        'categories': ['Emotional Well-being', 'Physical Vitality', 'Stress Resilience', 'Social Connection', 'Purpose & Meaning'],
        'lang': 'de'
    },
    'work-life-balance-carousel.html': {
        'type': 'work-life-balance',
        'framework': 'Work-Life Integration',
        'categories': ['Work Engagement', 'Personal Growth', 'Relationships', 'Health & Energy', 'Purpose & Values'],
        'lang': 'en'
    },
    'work-life-balance-carousel.de.html': {
        'type': 'work-life-balance',
        'framework': 'Work-Life Integration',
        'categories': ['Work Engagement', 'Personal Growth', 'Relationships', 'Health & Energy', 'Purpose & Values'],
        'lang': 'de'
    },
    'leadership-style-assessment.html': {
        'type': 'leadership-style',
        'framework': 'Leadership Archetypes',
        'categories': None,  # Different structure
        'lang': 'en'
    },
    'leadership-style-assessment.de.html': {
        'type': 'leadership-style',
        'framework': 'Leadership Archetypes',
        'categories': None,
        'lang': 'de'
    },
    'worker-type-assessment.html': {
        'type': 'worker-type',
        'framework': 'Work Rhythm Assessment',
        'categories': None,
        'lang': 'en'
    },
    'worker-type-assessment.de.html': {
        'type': 'worker-type',
        'framework': 'Work Rhythm Assessment',
        'categories': None,
        'lang': 'de'
    },
    'combined-leadership-profile.html': {
        'type': 'combined-leadership',
        'framework': 'Comprehensive Leadership Profile',
        'categories': None,
        'lang': 'en'
    },
    'combined-leadership-profile.de.html': {
        'type': 'combined-leadership',
        'framework': 'Comprehensive Leadership Profile',
        'categories': None,
        'lang': 'de'
    }
}

SHEETJS_SCRIPT = '    <script src="https://cdn.sheetjs.com/xlsx-0.20.1/package/dist/xlsx.full.min.js"></script>'

# Export functions template
EXPORT_FUNCTIONS_TEMPLATE = '''
    // Export Functions (Option 1: Client-Side CSV/XLSX)
    function addExportButtons(data) {
        const exportHTML = `
            <div style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-radius: 15px; padding: 30px; margin: 30px 0; text-align: center; border: 2px solid #e0e0e0;">
                <h3 style="color: #333; margin-bottom: 15px;">📊 Export Your Results</h3>
                <p style="color: #666; margin-bottom: 20px;">Download your complete assessment results for analysis, reporting, or personal records.</p>
                <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
                    <button onclick="exportToCSV()" style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; border: none; padding: 15px 30px; border-radius: 10px; font-size: 1.1em; font-weight: 600; cursor: pointer; transition: all 0.2s; box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);">
                        📥 Download CSV
                    </button>
                    <button onclick="exportToExcel()" style="background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); color: white; border: none; padding: 15px 30px; border-radius: 10px; font-size: 1.1em; font-weight: 600; cursor: pointer; transition: all 0.2s; box-shadow: 0 4px 15px rgba(37, 99, 235, 0.3);">
                        📊 Download Excel
                    </button>
                    <button onclick="exportToJSON()" style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); color: white; border: none; padding: 15px 30px; border-radius: 10px; font-size: 1.1em; font-weight: 600; cursor: pointer; transition: all 0.2s; box-shadow: 0 4px 15px rgba(139, 92, 246, 0.3);">
                        💾 Download JSON
                    </button>
                </div>
                <p style="color: #999; margin-top: 15px; font-size: 0.9em;">Your data stays private - all exports happen directly in your browser.</p>
            </div>
        `;
        const resultContainer = document.getElementById('resultContent') || document.querySelector('.result-display') || document.querySelector('.results-container');
        if (resultContainer) {
            resultContainer.insertAdjacentHTML('beforeend', exportHTML);
        }
    }
    
    function exportToCSV() {
        const data = gatherExportData();
        const csv = convertToCSV(data);
        downloadFile(csv, 'assessment-results-' + Date.now() + '.csv', 'text/csv');
        trackExport('CSV');
    }
    
    function exportToExcel() {
        const data = gatherExportData();
        const ws = XLSX.utils.json_to_sheet(data.details || [data]);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Assessment Results");
        
        // Add summary sheet if categories exist
        if (data.categories && data.categories.length > 0) {
            const summaryData = [{
                'Assessment Date': data.timestamp,
                'Overall Score': (data.totalScore || data.score) + '/' + (data.maxScore || 100),
                'Level': data.levelText || data.type || ''
            }];
            data.categories.forEach(cat => {
                summaryData[0][cat.name + ' Score'] = cat.score + '/' + cat.maxScore;
            });
            const summaryWs = XLSX.utils.json_to_sheet(summaryData);
            XLSX.utils.book_append_sheet(wb, summaryWs, "Summary");
        }
        
        XLSX.writeFile(wb, 'assessment-results-' + Date.now() + '.xlsx');
        trackExport('Excel');
    }
    
    function exportToJSON() {
        const data = gatherExportData();
        const json = JSON.stringify(data, null, 2);
        downloadFile(json, 'assessment-results-' + Date.now() + '.json', 'application/json');
        trackExport('JSON');
    }
    
    function convertToCSV(data) {
        let csv = (data.assessmentType || 'Assessment') + ' Results\n';
        csv += `Date,${data.timestamp}\n`;
        csv += `Score,${(data.totalScore || data.score)}/${(data.maxScore || 100)}\n`;
        csv += `Level,${data.levelText || data.type || ''}\n`;
        csv += '\n';
        
        if (data.categories && data.categories.length > 0) {
            csv += 'Category Scores\n';
            csv += 'Category,Score,Max,Percentage\n';
            data.categories.forEach(cat => {
                csv += `${cat.name},${cat.score},${cat.maxScore},${cat.percentage}%\n`;
            });
            csv += '\n';
        }
        
        if (data.details && data.details.length > 0) {
            csv += 'Detailed Responses\n';
            const headers = Object.keys(data.details[0]);
            csv += headers.join(',') + '\n';
            data.details.forEach(row => {
                const values = headers.map(h => {
                    let v = row[h];
                    if (typeof v === 'string') v = v.replace(/"/g, '""');
                    return `"${v}"`;
                });
                csv += values.join(',') + '\n';
            });
        }
        
        return csv;
    }
    
    function downloadFile(content, filename, mimeType) {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }
    
    function trackExport(format) {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'export_data', {
                'event_category': 'Data Export',
                'event_label': format + '_Assessment',
                'value': 1
            });
        }
    }
    
    // Backend data collection (Google Sheets + Database)
    async function saveAssessmentData(data) {
        const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE';
        
        try {
            await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...data,
                    userAgent: navigator.userAgent,
                    language: navigator.language
                })
            });
        } catch (error) {
            console.log('Google Sheets not configured');
        }
        
        try {
            await fetch('/.netlify/functions/save-assessment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
        } catch (error) {
            console.log('Database not configured');
        }
        
        try {
            const existing = JSON.parse(localStorage.getItem('tap-in-assessments') || '[]');
            existing.push({ ...data, id: Date.now() });
            if (existing.length > 10) existing.shift();
            localStorage.setItem('tap-in-assessments', JSON.stringify(existing));
        } catch (e) {}
    }
'''

def add_sheetjs_library(content, filename):
    """Add SheetJS library to <head> if not present"""
    if 'sheetjs.com/xlsx' in content:
        print(f"  ✓ {filename}: SheetJS already present")
        return content
    
    # Find </title> and add script after it
    pattern = r'(</title>)'
    replacement = r'\1\n' + SHEETJS_SCRIPT
    content = re.sub(pattern, replacement, content, count=1)
    print(f"  ✓ {filename}: Added SheetJS library")
    return content

def add_export_functions(content, filename):
    """Add export functions before closing </script> tag"""
    if 'function exportToCSV()' in content or 'function addExportButtons' in content:
        print(f"  ✓ {filename}: Export functions already present")
        return content
    
    # Find last </script> before </body>
    pattern = r'(</script>\s*</body>)'
    replacement = EXPORT_FUNCTIONS_TEMPLATE + r'\n    \1'
    content = re.sub(pattern, replacement, content, count=1)
    print(f"  ✓ {filename}: Added export functions")
    return content

def process_file(filename):
    """Process a single assessment file"""
    print(f"\n📄 Processing {filename}...")
    
    if not os.path.exists(filename):
        print(f"  ⚠️  File not found, skipping")
        return False
    
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_content = content
    
    # Add SheetJS library
    content = add_sheetjs_library(content, filename)
    
    # Add export functions
    content = add_export_functions(content, filename)
    
    # Save if changed
    if content != original_content:
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"  ✅ {filename}: Updated successfully")
        return True
    else:
        print(f"  ℹ️  {filename}: No changes needed")
        return False

def main():
    print("🚀 Adding data export functionality to all assessments...\n")
    
    updated_files = []
    for filename in ASSESSMENT_CONFIGS.keys():
        if process_file(filename):
            updated_files.append(filename)
    
    print(f"\n{'='*60}")
    print(f"✅ Complete! Updated {len(updated_files)} files:")
    for f in updated_files:
        print(f"   • {f}")
    
    if updated_files:
        print(f"\n📋 Next: Each file needs custom gatherExportData() function")
        print(f"   (based on its specific data structure)")
    
    print(f"\n🔗 Setup Google Sheets: See DATA-ANALYTICS-GUIDE.md")

if __name__ == '__main__':
    main()
