/**
 * Talent Finder Assessment System
 * Based on Marco's Sprinters/Joggers/Ultrarunners framework
 */

const TalentFinder = {
  questions: null,
  currentQuestion: 0,
  answers: {},
  scores: {
    sprinter: 0,
    jogger: 0,
    ultrarunner: 0
  },
  language: 'en',
  
  async init() {
    // Detect language
    this.language = window.location.pathname.includes('-de.html') ? 'de' : 'en';
    
    // Load questions
    try {
      const response = await fetch('talent-assessment-questions.json');
      const data = await response.json();
      this.questions = data.assessment.questions;
      console.log('✅ Talent Finder initialized:', this.questions.length, 'questions');
    } catch (error) {
      console.error('❌ Failed to load questions:', error);
    }
  },
  
  startAssessment() {
    document.getElementById('overview-section').style.display = 'none';
    document.getElementById('assessment-section').style.display = 'block';
    document.getElementById('total-questions').textContent = this.questions.length;
    
    this.currentQuestion = 0;
    this.answers = {};
    this.scores = { sprinter: 0, jogger: 0, ultrarunner: 0 };
    
    this.renderQuestion();
  },
  
  renderQuestion() {
    const question = this.questions[this.currentQuestion];
    if (!question) return;
    
    const textKey = this.language === 'de' ? 'textDE' : 'text';
    
    document.getElementById('current-question').textContent = this.currentQuestion + 1;
    document.getElementById('question-text').textContent = question[textKey];
    
    // Render options
    const container = document.getElementById('options-container');
    container.innerHTML = '';
    
    question.options.forEach((option, index) => {
      const button = document.createElement('button');
      button.className = 'option-button';
      button.textContent = option[textKey];
      button.onclick = () => this.selectOption(index);
      
      if (this.answers[question.id] === index) {
        button.classList.add('selected');
      }
      
      container.appendChild(button);
    });
    
    // Update navigation
    document.getElementById('prev-btn').disabled = this.currentQuestion === 0;
    const nextBtn = document.getElementById('next-btn');
    nextBtn.textContent = this.currentQuestion === this.questions.length - 1 
      ? (this.language === 'de' ? 'Ergebnisse →' : 'See Results →')
      : (this.language === 'de' ? 'Weiter →' : 'Next →');
    
    // Update progress
    const progress = ((this.currentQuestion + 1) / this.questions.length) * 100;
    document.getElementById('progress-bar').style.width = progress + '%';
  },
  
  selectOption(optionIndex) {
    const question = this.questions[this.currentQuestion];
    this.answers[question.id] = optionIndex;
    
    document.querySelectorAll('.option-button').forEach((btn, idx) => {
      btn.classList.toggle('selected', idx === optionIndex);
    });
    
    setTimeout(() => this.nextQuestion(), 300);
  },
  
  nextQuestion() {
    const question = this.questions[this.currentQuestion];
    if (this.answers[question.id] === undefined) {
      alert(this.language === 'de' ? 'Bitte wähle eine Antwort' : 'Please select an answer');
      return;
    }
    
    if (this.currentQuestion < this.questions.length - 1) {
      this.currentQuestion++;
      this.renderQuestion();
    } else {
      this.calculateResults();
    }
  },
  
  previousQuestion() {
    if (this.currentQuestion > 0) {
      this.currentQuestion--;
      this.renderQuestion();
    }
  },
  
  calculateResults() {
    this.scores = { sprinter: 0, jogger: 0, ultrarunner: 0 };
    
    this.questions.forEach(question => {
      const answerIndex = this.answers[question.id];
      if (answerIndex !== undefined) {
        const option = question.options[answerIndex];
        this.scores[option.value] += option.points;
      }
    });
    
    const total = this.scores.sprinter + this.scores.jogger + this.scores.ultrarunner;
    const percentages = {
      sprinter: Math.round((this.scores.sprinter / total) * 100),
      jogger: Math.round((this.scores.jogger / total) * 100),
      ultrarunner: Math.round((this.scores.ultrarunner / total) * 100)
    };
    
    const primaryType = Object.keys(this.scores).reduce((a, b) => 
      this.scores[a] > this.scores[b] ? a : b
    );
    
    localStorage.setItem('talentType', primaryType);
    localStorage.setItem('talentScores', JSON.stringify(this.scores));
    localStorage.setItem('talentPercentages', JSON.stringify(percentages));
    
    // Award XP
    if (typeof addXP === 'function') {
      addXP(75); // +75 XP for talent assessment
    }
    
    this.showResults(percentages, primaryType);
  },
  
  showResults(percentages, primaryType) {
    document.getElementById('assessment-section').style.display = 'none';
    document.getElementById('results-section').style.display = 'block';
    
    setTimeout(() => {
      document.getElementById('sprinter-bar').style.width = percentages.sprinter + '%';
      document.getElementById('jogger-bar').style.width = percentages.jogger + '%';
      document.getElementById('ultrarunner-bar').style.width = percentages.ultrarunner + '%';
      
      document.getElementById('sprinter-percent').textContent = percentages.sprinter + '%';
      document.getElementById('jogger-percent').textContent = percentages.jogger + '%';
      document.getElementById('ultrarunner-percent').textContent = percentages.ultrarunner + '%';
      
      document.getElementById('sprinter-score').textContent = this.scores.sprinter;
      document.getElementById('jogger-score').textContent = this.scores.jogger;
      document.getElementById('ultrarunner-score').textContent = this.scores.ultrarunner;
    }, 300);
    
    const descriptions = {
      sprinter: {
        emoji: '⚡',
        title: 'Sprinter',
        titleDE: 'Sprinter',
        description: 'You thrive in high-intensity, fast-paced environments. Quick wins and immediate results energize you.',
        descriptionDE: 'Du blühst in hochintensiven, schnelllebigen Umgebungen auf. Schnelle Erfolge und sofortige Ergebnisse geben dir Energie.',
        strengths: ['Crisis management', 'Rapid prototyping', 'Quick decision-making', 'High-pressure performance'],
        strengthsDE: ['Krisenmanagement', 'Rapid Prototyping', 'Schnelle Entscheidungsfindung', 'Hochdruck-Performance'],
        challenges: ['Need recovery time', 'May overlook details in rush', 'Can burn out without breaks'],
        challengesDE: ['Braucht Erholungszeit', 'Kann Details übersehen', 'Kann ohne Pausen ausbrennen'],
        idealRoles: ['Launch Manager', 'Crisis Response', 'Sales Closer', 'Rapid Prototyper'],
        idealRolesDE: ['Launch Manager', 'Krisenreaktion', 'Sales Closer', 'Rapid Prototyper'],
        teamNeeds: 'Pair with Joggers for sustainability and Ultrarunners for strategic direction.',
        teamNeedsDE: 'Kombiniere mit Joggern für Nachhaltigkeit und Ultrarunnern für strategische Richtung.'
      },
      jogger: {
        emoji: '🏃',
        title: 'Jogger',
        titleDE: 'Jogger',
        description: 'You are the reliable backbone. Consistency and steady progress define your approach.',
        descriptionDE: 'Du bist das zuverlässige Rückgrat. Beständigkeit und stetiger Fortschritt definieren deinen Ansatz.',
        strengths: ['Reliability', 'Consistency', 'Process excellence', 'Emotional stability'],
        strengthsDE: ['Zuverlässigkeit', 'Beständigkeit', 'Prozessexzellenz', 'Emotionale Stabilität'],
        challenges: ['May resist rapid change', 'Can seem slow to adapt', 'Prefer predictability'],
        challengesDE: ['Kann schnelle Veränderungen ablehnen', 'Kann langsam wirken', 'Bevorzugt Vorhersehbarkeit'],
        idealRoles: ['Operations Manager', 'Customer Support Lead', 'Process Owner', 'Quality Assurance'],
        idealRolesDE: ['Operations Manager', 'Customer Support Lead', 'Prozessverantwortlicher', 'Qualitätssicherung'],
        teamNeeds: 'Pair with Sprinters for quick pivots and Ultrarunners for long-term vision.',
        teamNeedsDE: 'Kombiniere mit Sprintern für schnelle Wendungen und Ultrarunnern für Langzeitvision.'
      },
      ultrarunner: {
        emoji: '🎯',
        title: 'Ultrarunner',
        titleDE: 'Ultrarunner',
        description: 'You excel at long-term strategic thinking. Building something meaningful over time is your strength.',
        descriptionDE: 'Du excellierst im langfristigen strategischen Denken. Etwas Bedeutsames über Zeit aufzubauen ist deine Stärke.',
        strengths: ['Strategic thinking', 'Long-term focus', 'Deep expertise', 'Perseverance'],
        strengthsDE: ['Strategisches Denken', 'Langfristiger Fokus', 'Tiefe Expertise', 'Ausdauer'],
        challenges: ['Slow to pivot', 'May seem detached from daily ops', 'Needs autonomy'],
        challengesDE: ['Langsam im Umschalten', 'Kann vom Tagesgeschäft entfernt wirken', 'Braucht Autonomie'],
        idealRoles: ['Architect', 'Strategist', 'R&D Lead', 'Transformation Manager'],
        idealRolesDE: ['Architekt', 'Stratege', 'F&E-Leiter', 'Transformationsmanager'],
        teamNeeds: 'Pair with Sprinters for execution speed and Joggers for operational stability.',
        teamNeedsDE: 'Kombiniere mit Sprintern für Ausführungsgeschwindigkeit und Joggern für operative Stabilität.'
      }
    };
    
    const desc = descriptions[primaryType];
    const titleKey = this.language === 'de' ? 'titleDE' : 'title';
    const descKey = this.language === 'de' ? 'descriptionDE' : 'description';
    const strengthsKey = this.language === 'de' ? 'strengthsDE' : 'strengths';
    const challengesKey = this.language === 'de' ? 'challengesDE' : 'challenges';
    const rolesKey = this.language === 'de' ? 'idealRolesDE' : 'idealRoles';
    const needsKey = this.language === 'de' ? 'teamNeedsDE' : 'teamNeeds';
    
    const strengthsLabel = this.language === 'de' ? 'Deine Stärken:' : 'Your Strengths:';
    const challengesLabel = this.language === 'de' ? 'Deine Herausforderungen:' : 'Your Challenges:';
    const rolesLabel = this.language === 'de' ? 'Ideale Rollen:' : 'Ideal Roles:';
    
    document.getElementById('primary-type-description').innerHTML = `
      <h2>${desc.emoji} ${this.language === 'de' ? 'Du bist ein' : 'You are a'} ${desc[titleKey]}</h2>
      <p style="font-size: 1.125rem; margin: 1rem 0;">${desc[descKey]}</p>
      
      <h3>${strengthsLabel}</h3>
      <ul>${desc[strengthsKey].map(s => `<li>${s}</li>`).join('')}</ul>
      
      <h3>${challengesLabel}</h3>
      <ul>${desc[challengesKey].map(c => `<li>${c}</li>`).join('')}</ul>
      
      <h3>${rolesLabel}</h3>
      <ul>${desc[rolesKey].map(r => `<li>${r}</li>`).join('')}</ul>
    `;
    
    const teamLabel = this.language === 'de' ? 'Team-Zusammensetzung Empfehlungen:' : 'Team Composition Recommendations:';
    const balanceLabel = this.language === 'de' ? 'Für optimale Team-Balance:' : 'For optimal team balance:';
    const complementLabel = this.language === 'de' ? 'Deine Team-Ergänzung:' : 'Your team complement:';
    
    document.getElementById('team-recommendations').innerHTML = `
      <h2>${teamLabel}</h2>
      <p><strong>${balanceLabel}</strong></p>
      <ul>
        <li><strong>40% Joggers</strong> - ${this.language === 'de' ? 'Bieten Stabilität und Beständigkeit' : 'Provide stability and consistency'}</li>
        <li><strong>30% Sprinters</strong> - ${this.language === 'de' ? 'Treiben Dringlichkeit und schnelle Erfolge' : 'Drive urgency and quick wins'}</li>
        <li><strong>30% Ultrarunners</strong> - ${this.language === 'de' ? 'Sichern strategische Richtung' : 'Ensure strategic direction'}</li>
      </ul>
      <div style="margin-top: 1rem; padding: 1rem; background: rgba(255,215,0,0.1); border-left: 3px solid #ffd700; border-radius: 8px;">
        <strong>${complementLabel}</strong> ${desc[needsKey]}
      </div>
    `;
  },
  
  downloadResults() {
    const type = localStorage.getItem('talentType');
    const scores = JSON.parse(localStorage.getItem('talentScores'));
    
    const content = `
TAP-IN TALENT ASSESSMENT RESULTS
=================================

Your Primary Type: ${type.toUpperCase()}

Detailed Scores:
- Sprinter: ${scores.sprinter} points
- Jogger: ${scores.jogger} points
- Ultrarunner: ${scores.ultrarunner} points

Generated: ${new Date().toLocaleDateString()}
Platform: Tap-In Leadership Academy
    `.trim();
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'talent-assessment-results.txt';
    a.click();
  },
  
  shareResults() {
    const type = localStorage.getItem('talentType');
    
    if (navigator.share) {
      navigator.share({
        title: 'My Talent Type: ' + type,
        text: `I discovered I'm a ${type}! Find out your team type at Tap-In.`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  },
  
  retakeAssessment() {
    document.getElementById('results-section').style.display = 'none';
    document.getElementById('overview-section').style.display = 'block';
  }
};

function startAssessment() {
  TalentFinder.startAssessment();
}

function nextQuestion() {
  TalentFinder.nextQuestion();
}

function previousQuestion() {
  TalentFinder.previousQuestion();
}

function downloadResults() {
  TalentFinder.downloadResults();
}

function shareResults() {
  TalentFinder.shareResults();
}

function retakeAssessment() {
  TalentFinder.retakeAssessment();
}

document.addEventListener('DOMContentLoaded', () => {
  TalentFinder.init();
});

