#!/usr/bin/env python3
"""
Add progress saving to all assessment files
"""

import re

# The progress saving code block
PROGRESS_SAVING_CODE = '''
                    // Progress Saving System
                    const STORAGE_KEY = 'ASSESSMENT_TYPE-progress';
                    
                    function saveProgress() {
                        const progressData = {
                            currentQuestion,
                            answers,
                            timestamp: new Date().toISOString(),
                            version: '3.0.0'
                        };
                        try {
                            localStorage.setItem(STORAGE_KEY, JSON.stringify(progressData));
                        } catch (e) {
                            console.log('Could not save progress');
                        }
                    }
                    
                    function loadProgress() {
                        try {
                            const saved = localStorage.getItem(STORAGE_KEY);
                            if (saved) {
                                const data = JSON.parse(saved);
                                const savedDate = new Date(data.timestamp);
                                const daysSince = (new Date() - savedDate) / (1000 * 60 * 60 * 24);
                                if (daysSince < 7 && data.version === '3.0.0') {
                                    return data;
                                }
                            }
                        } catch (e) {
                            console.log('Could not load progress');
                        }
                        return null;
                    }
                    
                    function clearProgress() {
                        try {
                            localStorage.removeItem(STORAGE_KEY);
                        } catch (e) {}
                    }
                    
                    function showResumePrompt() {
                        const saved = loadProgress();
                        if (!saved) return;
                        
                        const completedQuestions = Object.keys(saved.answers).length;
                        const totalQuestions = TOTAL_QUESTIONS;
                        const percentage = Math.round((completedQuestions / totalQuestions) * 100);
                        
                        const resumeHTML = `
                            <div style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.8); z-index: 9999; display: flex; align-items: center; justify-content: center; animation: fadeIn 0.3s ease;" id="resumeModal">
                                <div style="background: white; border-radius: 20px; padding: 40px; max-width: 500px; text-align: center; animation: slideUp 0.3s ease;">
                                    <div style="font-size: 3em; margin-bottom: 20px;">🎯</div>
                                    <h2 style="color: #a93226; margin-bottom: 15px;">WELCOME_BACK_TEXT</h2>
                                    <p style="color: #666; font-size: 1.1em; margin-bottom: 10px;">PROGRESS_TEXT <strong>${completedQuestions} of ${totalQuestions} questions</strong></p>
                                    <div style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); padding: 20px; border-radius: 12px; margin: 20px 0;">
                                        <div style="font-size: 2.5em; font-weight: bold; color: #a93226; margin-bottom: 5px;">${percentage}%</div>
                                        <div style="color: #666;">COMPLETE_TEXT</div>
                                    </div>
                                    <div style="display: flex; gap: 15px; margin-top: 25px;">
                                        <button onclick="resumeAssessment()" style="flex: 1; background: linear-gradient(135deg, #a93226 0%, #7a241b 100%); color: white; border: none; padding: 15px 20px; border-radius: 10px; font-size: 1.1em; font-weight: 600; cursor: pointer;">
                                            ▶️ RESUME_TEXT
                                        </button>
                                        <button onclick="startFresh()" style="flex: 1; background: white; color: #666; border: 2px solid #e0e0e0; padding: 15px 20px; border-radius: 10px; font-size: 1.1em; font-weight: 600; cursor: pointer;">
                                            🔄 START_OVER_TEXT
                                        </button>
                                    </div>
                                </div>
                            </div>
                        `;
                        
                        document.body.insertAdjacentHTML('beforeend', resumeHTML);
                    }
                    
                    function resumeAssessment() {
                        const saved = loadProgress();
                        if (saved) {
                            currentQuestion = saved.currentQuestion;
                            answers = saved.answers;
                            document.getElementById('resumeModal')?.remove();
                            renderQuestion();
                            updateProgress();
                        }
                    }
                    
                    function startFresh() {
                        clearProgress();
                        currentQuestion = 0;
                        answers = {};
                        document.getElementById('resumeModal')?.remove();
                        renderQuestion();
                        updateProgress();
                    }
                    
'''

FILES_CONFIG = {
    'team-assessment-enhanced-v2.de.html': {
        'storage_key': 'team-assessment',
        'total_questions': 20,
        'welcome': 'Willkommen zurück!',
        'progress': 'Du hast bereits',
        'complete': 'Fortschritt abgeschlossen',
        'resume': 'Fortsetzen',
        'start_over': 'Neu beginnen'
    },
    'mental-health-assessment.html': {
        'storage_key': 'mental-health',
        'total_questions': 20,
        'welcome': 'Welcome Back!',
        'progress': 'You\'ve already completed',
        'complete': 'Progress Complete',
        'resume': 'Resume',
        'start_over': 'Start Over'
    },
    'mental-health-assessment.de.html': {
        'storage_key': 'mental-health',
        'total_questions': 20,
        'welcome': 'Willkommen zurück!',
        'progress': 'Du hast bereits',
        'complete': 'Fortschritt abgeschlossen',
        'resume': 'Fortsetzen',
        'start_over': 'Neu beginnen'
    },
    'work-life-balance-carousel.html': {
        'storage_key': 'work-life',
        'total_questions': 20,
        'welcome': 'Welcome Back!',
        'progress': 'You\'ve already completed',
        'complete': 'Progress Complete',
        'resume': 'Resume',
        'start_over': 'Start Over'
    },
    'work-life-balance-carousel.de.html': {
        'storage_key': 'work-life',
        'total_questions': 20,
        'welcome': 'Willkommen zurück!',
        'progress': 'Du hast bereits',
        'complete': 'Fortschritt abgeschlossen',
        'resume': 'Fortsetzen',
        'start_over': 'Neu beginnen'
    },
    'leadership-style-assessment.html': {
        'storage_key': 'leadership',
        'total_questions': 15,
        'welcome': 'Welcome Back!',
        'progress': 'You\'ve already completed',
        'complete': 'Progress Complete',
        'resume': 'Resume',
        'start_over': 'Start Over'
    },
    'leadership-style-assessment.de.html': {
        'storage_key': 'leadership',
        'total_questions': 15,
        'welcome': 'Willkommen zurück!',
        'progress': 'Du hast bereits',
        'complete': 'Fortschritt abgeschlossen',
        'resume': 'Fortsetzen',
        'start_over': 'Neu beginnen'
    },
    'worker-type-assessment.html': {
        'storage_key': 'worker-type',
        'total_questions': 12,
        'welcome': 'Welcome Back!',
        'progress': 'You\'ve already completed',
        'complete': 'Progress Complete',
        'resume': 'Resume',
        'start_over': 'Start Over'
    },
    'worker-type-assessment.de.html': {
        'storage_key': 'worker-type',
        'total_questions': 12,
        'welcome': 'Willkommen zurück!',
        'progress': 'Du hast bereits',
        'complete': 'Fortschritt abgeschlossen',
        'resume': 'Fortsetzen',
        'start_over': 'Neu beginnen'
    },
    'combined-leadership-profile.html': {
        'storage_key': 'combined-profile',
        'total_questions': 30,
        'welcome': 'Welcome Back!',
        'progress': 'You\'ve already completed',
        'complete': 'Progress Complete',
        'resume': 'Resume',
        'start_over': 'Start Over'
    },
    'combined-leadership-profile.de.html': {
        'storage_key': 'combined-profile',
        'total_questions': 30,
        'welcome': 'Willkommen zurück!',
        'progress': 'Du hast bereits',
        'complete': 'Fortschritt abgeschlossen',
        'resume': 'Fortsetzen',
        'start_over': 'Neu beginnen'
    }
}

def add_progress_saving(filename):
    """Add progress saving to a file"""
    print(f"\n📄 Processing {filename}...")
    
    try:
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()
    except FileNotFoundError:
        print(f"  ⚠️  File not found, skipping")
        return False
    
    # Check if already has progress saving
    if 'saveProgress()' in content or 'STORAGE_KEY' in content:
        print(f"  ℹ️  Already has progress saving")
        return False
    
    config = FILES_CONFIG.get(filename)
    if not config:
        print(f"  ⚠️  No configuration found")
        return False
    
    # Customize the code for this file
    code = PROGRESS_SAVING_CODE
    code = code.replace('ASSESSMENT_TYPE', config['storage_key'])
    code = code.replace('TOTAL_QUESTIONS', str(config['total_questions']))
    code = code.replace('WELCOME_BACK_TEXT', config['welcome'])
    code = code.replace('PROGRESS_TEXT', config['progress'])
    code = code.replace('COMPLETE_TEXT', config['complete'])
    code = code.replace('RESUME_TEXT', config['resume'])
    code = code.replace('START_OVER_TEXT', config['start_over'])
    
    # Insert after answers initialization
    pattern = r'(let answers = \{\};)'
    if re.search(pattern, content):
        content = re.sub(pattern, r'\1' + code, content, count=1)
        print(f"  ✅ Added progress saving code")
    else:
        print(f"  ⚠️  Could not find insertion point")
        return False
    
    # Add saveProgress() call in selectOption
    content = re.sub(
        r'(answers\[currentQuestion\] = value;)',
        r'\1\n                        saveProgress();',
        content,
        count=1
    )
    
    # Add clearProgress() in showResults
    content = re.sub(
        r'(function showResults\(\) \{)',
        r'\1\n                        clearProgress();',
        content,
        count=1
    )
    
    # Add initialization
    content = re.sub(
        r'(renderQuestion\(\);)',
        r'setTimeout(() => showResumePrompt(), 500);\n                    \1',
        content,
        count=1
    )
    
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"  ✅ Saved {filename}")
    return True

def main():
    print("🚀 Adding progress saving to all assessments...")
    
    updated = []
    for filename in FILES_CONFIG.keys():
        if add_progress_saving(filename):
            updated.append(filename)
    
    print(f"\n{'='*60}")
    print(f"✅ Updated {len(updated)} files with progress saving!")
    for f in updated:
        print(f"   • {f}")

if __name__ == '__main__':
    main()
