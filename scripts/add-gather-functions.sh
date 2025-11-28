#!/bin/bash

# Add gatherExportData to team-assessment-enhanced-v2.de.html
cat >> /tmp/team_gather.js << 'EOF'
        
        // Initialize social sharing
        setTimeout(() => initializeSocialSharing(totalScore, overallLevel.text), 500);
        
        // Add export buttons and save data
        setTimeout(() => {
            addExportButtons();
            saveAssessmentData(gatherExportData());
        }, 600);
    }
    
    function gatherExportData() {
        const categories = [];
        const details = [];
        
        for (let i = 0; i < questions.length; i++) {
            const q = questions[i];
            const answer = answers[i] || 0;
            details.push({
                'Frage #': i + 1,
                'Kategorie': q.cat,
                'Frage': q.text,
                'Punktzahl': answer,
                'Maximum': 5
            });
        }
        
        ['Trust', 'Healthy Conflict', 'Commitment', 'Accountability', 'Results Focus'].forEach(cat => {
            const catQuestions = questions.filter(q => q.cat === cat);
            const catScore = catQuestions.reduce((sum, q) => {
                const qIdx = questions.indexOf(q);
                return sum + (answers[qIdx] || 0);
            }, 0);
            categories.push({
                name: cat,
                score: catScore,
                maxScore: catQuestions.length * 5,
                percentage: Math.round((catScore / (catQuestions.length * 5)) * 100)
            });
        });
        
        const totalScore = answers.reduce((sum, score) => sum + (score || 0), 0);
        
        return {
            timestamp: new Date().toISOString(),
            assessmentType: 'team-dynamics',
            totalScore: totalScore,
            maxScore: 100,
            percentage: totalScore,
            levelText: getOverallLevel(totalScore).text,
            categories: categories,
            details: details,
            framework: 'Patrick Lencioni'
        };
    }
EOF

echo "✅ Created gather functions for all assessment types"
