#!/usr/bin/env python3
import re

# Read business-portal.html
with open('business-portal.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Team analyzer HTML
team_analyzer = '''
<!-- Team Composition Analyzer -->
<section id="team-analyzer" style="margin-top: 3rem; padding: 2rem; background: rgba(255,255,255,0.03); border-radius: 16px;">
  <h2>🎯 Team Composition Analyzer</h2>
  <p>Analyze your team's talent distribution based on Sprinters/Joggers/Ultrarunners framework</p>
  
  <button onclick="analyzeTeam()" style="padding: 1rem 2rem; background: linear-gradient(135deg, #4a7c9c 0%, #6fa8d8 100%); border: none; border-radius: 12px; color: white; font-weight: bold; cursor: pointer; margin: 1rem 0; font-size: 1rem;">
    Analyze Team Composition
  </button>
  
  <div id="composition-results" style="margin-top: 2rem;"></div>
</section>

<style>
  .composition-chart {
    background: rgba(255,255,255,0.05);
    padding: 2rem;
    border-radius: 16px;
    margin: 2rem 0;
  }
  
  .comp-bar {
    height: 50px;
    background: rgba(255,255,255,0.1);
    border-radius: 25px;
    margin: 1rem 0;
    overflow: hidden;
    position: relative;
  }
  
  .comp-fill {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    transition: width 1s ease-out;
  }
  
  .comp-fill.sprinter { background: linear-gradient(90deg, #ff6b6b 0%, #ff8787 100%); }
  .comp-fill.jogger { background: linear-gradient(90deg, #51cf66 0%, #69db7c 100%); }
  .comp-fill.ultrarunner { background: linear-gradient(90deg, #4a7c9c 0%, #6fa8d8 100%); }
  
  .recommendation {
    background: rgba(255,215,0,0.1);
    border-left: 3px solid #ffd700;
    padding: 1rem;
    margin: 0.5rem 0;
    border-radius: 8px;
  }
</style>

<script>
function analyzeTeam() {
  const teamMembers = JSON.parse(localStorage.getItem('mockTeamMembers') || '[]');
  
  if (teamMembers.length === 0) {
    const demoTeam = [
      { name: 'Alex M.', talentType: 'sprinter' },
      { name: 'Sarah K.', talentType: 'jogger' },
      { name: 'Mike R.', talentType: 'jogger' },
      { name: 'Lisa T.', talentType: 'ultrarunner' },
      { name: 'Tom B.', talentType: 'sprinter' },
      { name: 'Emma W.', talentType: 'jogger' },
      { name: 'David L.', talentType: 'jogger' },
      { name: 'Nina P.', talentType: 'ultrarunner' },
      { name: 'Chris H.', talentType: 'sprinter' },
      { name: 'Sofia G.', talentType: 'jogger' }
    ];
    localStorage.setItem('mockTeamMembers', JSON.stringify(demoTeam));
    analyzeTeam();
    return;
  }
  
  const composition = { sprinters: 0, joggers: 0, ultrarunners: 0 };
  teamMembers.forEach(member => {
    const type = member.talentType;
    if (composition[type + 's'] !== undefined) {
      composition[type + 's']++;
    }
  });
  
  const total = teamMembers.length;
  const percentages = {
    sprinters: Math.round((composition.sprinters / total) * 100),
    joggers: Math.round((composition.joggers / total) * 100),
    ultrarunners: Math.round((composition.ultrarunners / total) * 100)
  };
  
  const ideal = {
    sprinters: Math.round(total * 0.3),
    joggers: Math.round(total * 0.4),
    ultrarunners: Math.round(total * 0.3)
  };
  
  const gaps = {
    sprinters: ideal.sprinters - composition.sprinters,
    joggers: ideal.joggers - composition.joggers,
    ultrarunners: ideal.ultrarunners - composition.ultrarunners
  };
  
  let resultsHTML = `
    <div class="composition-chart">
      <h3>Current Team Composition (${total} members)</h3>
      <div style="margin: 2rem 0;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
          <span><strong>⚡ Sprinters:</strong> ${composition.sprinters} (${percentages.sprinters}%)</span>
          <span style="color: rgba(255,255,255,0.6);">Ideal: ${ideal.sprinters} (30%)</span>
        </div>
        <div class="comp-bar">
          <div class="comp-fill sprinter" style="width: ${percentages.sprinters}%;">${composition.sprinters} Sprinters</div>
        </div>
      </div>
      <div style="margin: 2rem 0;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
          <span><strong>🏃 Joggers:</strong> ${composition.joggers} (${percentages.joggers}%)</span>
          <span style="color: rgba(255,255,255,0.6);">Ideal: ${ideal.joggers} (40%)</span>
        </div>
        <div class="comp-bar">
          <div class="comp-fill jogger" style="width: ${percentages.joggers}%;">${composition.joggers} Joggers</div>
        </div>
      </div>
      <div style="margin: 2rem 0;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
          <span><strong>🎯 Ultrarunners:</strong> ${composition.ultrarunners} (${percentages.ultrarunners}%)</span>
          <span style="color: rgba(255,255,255,0.6);">Ideal: ${ideal.ultrarunners} (30%)</span>
        </div>
        <div class="comp-bar">
          <div class="comp-fill ultrarunner" style="width: ${percentages.ultrarunners}%;">${composition.ultrarunners} Ultrarunners</div>
        </div>
      </div>
    </div>
    <div class="composition-chart">
      <h3>💡 Hiring Recommendations</h3>`;
  
  if (gaps.sprinters > 0) {
    resultsHTML += `<div class="recommendation"><strong>⚡ Hire ${gaps.sprinters} more Sprinter${gaps.sprinters > 1 ? 's' : ''}</strong><p>Your team needs more high-intensity performers who can deliver quick wins and handle crisis situations.</p></div>`;
  }
  if (gaps.joggers > 0) {
    resultsHTML += `<div class="recommendation"><strong>🏃 Hire ${gaps.joggers} more Jogger${gaps.joggers > 1 ? 's' : ''}</strong><p>You need more steady, reliable performers who provide operational stability.</p></div>`;
  }
  if (gaps.ultrarunners > 0) {
    resultsHTML += `<div class="recommendation"><strong>🎯 Hire ${gaps.ultrarunners} more Ultrarunner${gaps.ultrarunners > 1 ? 's' : ''}</strong><p>Your team lacks strategic thinkers with long-term focus.</p></div>`;
  }
  if (gaps.sprinters === 0 && gaps.joggers === 0 && gaps.ultrarunners === 0) {
    resultsHTML += `<div class="recommendation" style="border-left-color: #51cf66; background: rgba(81,207,102,0.1);"><strong>✅ Perfect Balance!</strong><p>Your team has the ideal composition.</p></div>`;
  }
  
  resultsHTML += `</div>`;
  document.getElementById('composition-results').innerHTML = resultsHTML;
  
  setTimeout(() => {
    document.querySelectorAll('.comp-fill').forEach(el => {
      el.style.width = el.style.width;
    });
  }, 100);
}
</script>
'''

# Insert before closing </body>
if '</body>' in content and 'analyzeTeam' not in content:
    content = content.replace('</body>', team_analyzer + '\n</body>')
    with open('business-portal.html', 'w', encoding='utf-8') as f:
        f.write(content)
    print("✅ Team analyzer added to business-portal.html")
else:
    print("⚠️ Team analyzer already exists or no </body> tag found")
