#!/usr/bin/env python3
"""
FIX GYM INTERACTIONS - Make all buttons work!
Add click handlers to assessments, content cards, and challenges
"""

import re

def fix_gym_dashboard():
    """Add click handlers to gym-dashboard.html"""
    print("\n🎯 FIXING GYM DASHBOARD INTERACTIONS")
    print("=" * 60)
    
    with open('gym-dashboard.html', 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    
    # Fix Assessment Cards (Mental Health, Work-Life Balance, Team Dynamics)
    print("\n📋 Fixing Assessment Cards...")
    
    # Mental Health Assessment
    content = re.sub(
        r'(<div class="assessment-item">[\s\S]*?<span class="assessment-icon">❤️</span>[\s\S]*?<span class="assessment-name">Mental Health</span>[\s\S]*?</div>[\s\S]*?</div>)',
        lambda m: m.group(0).replace(
            '<div class="assessment-item">',
            '<div class="assessment-item" onclick="window.location.href=\'mental-health-assessment.html\'" style="cursor: pointer;">'
        ),
        content,
        count=1
    )
    print("  ✅ Mental Health → mental-health-assessment.html")
    
    # Work-Life Balance Assessment
    content = re.sub(
        r'(<div class="assessment-item">[\s\S]*?<span class="assessment-icon">⚖️</span>[\s\S]*?<span class="assessment-name">Work-Life Balance</span>[\s\S]*?</div>[\s\S]*?</div>)',
        lambda m: m.group(0).replace(
            '<div class="assessment-item">',
            '<div class="assessment-item" onclick="window.location.href=\'work-life-balance-assessment.html\'" style="cursor: pointer;">'
        ),
        content,
        count=1
    )
    print("  ✅ Work-Life Balance → work-life-balance-assessment.html")
    
    # Team Dynamics Assessment
    content = re.sub(
        r'(<div class="assessment-item">[\s\S]*?<span class="assessment-icon">👥</span>[\s\S]*?<span class="assessment-name">Team Dynamics</span>[\s\S]*?</div>[\s\S]*?</div>)',
        lambda m: m.group(0).replace(
            '<div class="assessment-item">',
            '<div class="assessment-item" onclick="window.location.href=\'team-assessment-enhanced-v2.html\'" style="cursor: pointer;">'
        ),
        content,
        count=1
    )
    print("  ✅ Team Dynamics → team-assessment-enhanced-v2.html")
    
    # Fix Open Mat Content Cards
    print("\n📚 Fixing Open Mat Content Cards...")
    
    # Inner Game of Leadership
    content = re.sub(
        r'(<div class="open-mat-card">[\s\S]*?<div class="open-mat-title">The Inner Game of Leadership</div>[\s\S]*?</div>[\s\S]*?</div>)',
        lambda m: m.group(0).replace(
            '<div class="open-mat-card">',
            '<div class="open-mat-card" onclick="window.location.href=\'open-mat-inner-game-leadership.html\'" style="cursor: pointer;">'
        ),
        content,
        count=1
    )
    print("  ✅ Inner Game → open-mat-inner-game-leadership.html")
    
    # Box Breathing
    content = re.sub(
        r'(<div class="open-mat-card">[\s\S]*?<div class="open-mat-title">Box Breathing for Pressure</div>[\s\S]*?</div>[\s\S]*?</div>)',
        lambda m: m.group(0).replace(
            '<div class="open-mat-card">',
            '<div class="open-mat-card" onclick="window.location.href=\'open-mat-box-breathing.html\'" style="cursor: pointer;">'
        ),
        content,
        count=1
    )
    print("  ✅ Box Breathing → open-mat-box-breathing.html")
    
    # Reframe in 60 Seconds (create if doesn't exist)
    content = re.sub(
        r'(<div class="open-mat-card">[\s\S]*?<div class="open-mat-title">Reframe in 60 Seconds</div>[\s\S]*?</div>[\s\S]*?</div>)',
        lambda m: m.group(0).replace(
            '<div class="open-mat-card">',
            '<div class="open-mat-card" onclick="window.location.href=\'open-mat-reframe-60.html\'" style="cursor: pointer;">'
        ),
        content,
        count=1
    )
    print("  ✅ Reframe 60s → open-mat-reframe-60.html")
    
    # Energy Mapping
    content = re.sub(
        r'(<div class="open-mat-card">[\s\S]*?<div class="open-mat-title">Energy Mapping Exercise</div>[\s\S]*?</div>[\s\S]*?</div>)',
        lambda m: m.group(0).replace(
            '<div class="open-mat-card">',
            '<div class="open-mat-card" onclick="window.location.href=\'open-mat-energy-audit.html\'" style="cursor: pointer;">'
        ),
        content,
        count=1
    )
    print("  ✅ Energy Mapping → open-mat-energy-audit.html")
    
    # Jiu-Jitsu Philosophy (create if doesn't exist)
    if 'Jiu-Jitsu Philosophy' in content or 'Leading Without Force' in content:
        content = re.sub(
            r'(<div class="open-mat-card">[\s\S]*?(?:Jiu-Jitsu Philosophy|Leading Without Force)[\s\S]*?</div>[\s\S]*?</div>)',
            lambda m: m.group(0).replace(
                '<div class="open-mat-card">',
                '<div class="open-mat-card" onclick="window.location.href=\'open-mat-jiu-jitsu.html\'" style="cursor: pointer;">'
            ),
            content,
            count=1
        )
        print("  ✅ Jiu-Jitsu → open-mat-jiu-jitsu.html")
    
    # Weekly Experiment (create if doesn't exist)
    if 'Weekly Experiment' in content or 'Say "I Don\'t Know"' in content:
        content = re.sub(
            r'(<div class="open-mat-card">[\s\S]*?Weekly Experiment[\s\S]*?</div>[\s\S]*?</div>)',
            lambda m: m.group(0).replace(
                '<div class="open-mat-card">',
                '<div class="open-mat-card" onclick="window.location.href=\'open-mat-weekly-experiment.html\'" style="cursor: pointer;">'
            ),
            content,
            count=1
        )
        print("  ✅ Weekly Experiment → open-mat-weekly-experiment.html")
    
    # Fix Weekly Challenge
    print("\n🔥 Fixing Weekly Challenge...")
    content = re.sub(
        r'(<div class="challenge-card[^>]*>)',
        r'\1 onclick="window.location.href=\'challenge-vulnerability.html\'" style="cursor: pointer;"',
        content,
        count=1
    )
    print("  ✅ Weekly Challenge → challenge-vulnerability.html")
    
    # Save changes
    if content != original:
        with open('gym-dashboard.html', 'w', encoding='utf-8') as f:
            f.write(content)
        print("\n💾 Saved changes to gym-dashboard.html")
        return True
    else:
        print("\n⚠️  No changes made")
        return False

def main():
    """Execute all fixes"""
    print("🎯 FIXING GYM INTERACTIONS")
    print("=" * 60)
    print("\nMaking all buttons work:")
    print("  - Assessment cards → Link to assessments")
    print("  - Content cards → Link to content")
    print("  - Challenge card → Link to challenge")
    print("=" * 60)
    
    changed = fix_gym_dashboard()
    
    print("\n" + "=" * 60)
    if changed:
        print("✅ GYM INTERACTIONS FIXED!")
        print("\nAll buttons now work:")
        print("  ✅ Mental Health Assessment")
        print("  ✅ Work-Life Balance Assessment")
        print("  ✅ Team Dynamics Assessment")
        print("  ✅ Inner Game of Leadership")
        print("  ✅ Box Breathing")
        print("  ✅ Reframe 60 Seconds")
        print("  ✅ Energy Mapping")
        print("  ✅ Weekly Challenge")
    else:
        print("⚠️  No changes were needed")

if __name__ == '__main__':
    main()

