/**
 * TAP-IN Test Data Setup Script
 * Run this in browser console to set up cheat codes and test team
 */

(function() {
  console.log('🎮 Setting up TAP-IN test data...');

  // Belt Cheat Codes
  const beltCodes = {
    'WHITE-START-2024': { belt: 'white', stripe: 0, xp: 0 },
    'BLUE-START-2024': { belt: 'blue', stripe: 0, xp: 1000 },
    'PURPLE-START-2024': { belt: 'purple', stripe: 0, xp: 2500 },
    'BROWN-START-2024': { belt: 'brown', stripe: 0, xp: 5000 },
    'BLACK-START-2024': { belt: 'black', stripe: 0, xp: 10000 }
  };

  // Store belt codes
  localStorage.setItem('beltCheatCodes', JSON.stringify(beltCodes));
  console.log('✅ Belt cheat codes stored');

  // Create test team members
  const testMembers = [
    {
      id: 1,
      teamCode: 'TEAM-ACME123',
      name: 'Sarah Chen',
      email: 'sarah.chen@acme.com',
      belt: 'blue',
      stripe: 2,
      xp: 1250,
      workerType: 'visionary',
      leadershipStyle: 'strategic-architect',
      role: 'CEO/Founder',
      joinedDate: '2024-01-15',
      lastActive: new Date().toISOString().split('T')[0]
    },
    {
      id: 2,
      teamCode: 'TEAM-ACME123',
      name: 'Marcus Rodriguez',
      email: 'marcus.r@acme.com',
      belt: 'white',
      stripe: 4,
      xp: 850,
      workerType: 'executor',
      leadershipStyle: 'action-oriented',
      role: 'Operations Manager',
      joinedDate: '2024-02-01',
      lastActive: new Date().toISOString().split('T')[0]
    },
    {
      id: 3,
      teamCode: 'TEAM-ACME123',
      name: 'Emma Thompson',
      email: 'emma.t@acme.com',
      belt: 'purple',
      stripe: 1,
      xp: 2100,
      workerType: 'facilitator',
      leadershipStyle: 'people-focused',
      role: 'HR Director',
      joinedDate: '2024-01-20',
      lastActive: new Date().toISOString().split('T')[0]
    },
    {
      id: 4,
      teamCode: 'TEAM-ACME123',
      name: 'David Kim',
      email: 'david.kim@acme.com',
      belt: 'brown',
      stripe: 0,
      xp: 3500,
      workerType: 'architect',
      leadershipStyle: 'systems-thinker',
      role: 'CTO',
      joinedDate: '2024-01-10',
      lastActive: new Date().toISOString().split('T')[0]
    },
    {
      id: 5,
      teamCode: 'TEAM-ACME123',
      name: 'Lisa Anderson',
      email: 'lisa.a@acme.com',
      belt: 'white',
      stripe: 3,
      xp: 650,
      workerType: 'balanced',
      leadershipStyle: 'adaptive',
      role: 'Product Manager',
      joinedDate: '2024-02-15',
      lastActive: new Date().toISOString().split('T')[0]
    }
  ];

  // Store test team
  localStorage.setItem('teamMembers', JSON.stringify(testMembers));
  localStorage.setItem('validTeamCodes', JSON.stringify(['TEAM-ACME123', 'TEAM-ROOTS']));
  localStorage.setItem('teamCode', 'TEAM-ACME123');
  
  // Create Roots Collective team (empty team for QR code joining)
  const rootsTeamCode = 'TEAM-ROOTS';
  if (!localStorage.getItem('rootsTeamCreated')) {
    localStorage.setItem('rootsTeamCreated', 'true');
    console.log('✅ Roots Collective team code ready: TEAM-ROOTS');
  }
  
  console.log('✅ Test team created: TEAM-ACME123');
  console.log('📋 Team Members:');
  testMembers.forEach(m => {
    console.log(`   - ${m.name} (${m.email}) - ${m.belt} belt, stripe ${m.stripe}`);
  });

  // Helper function to apply belt code
  window.applyBeltCode = function(code) {
    const codes = JSON.parse(localStorage.getItem('beltCheatCodes') || '{}');
    const beltData = codes[code.toUpperCase()];
    if (beltData) {
      localStorage.setItem('currentBelt', beltData.belt);
      localStorage.setItem('currentStripe', beltData.stripe.toString());
      localStorage.setItem('totalXP', beltData.xp.toString());
      localStorage.setItem('beltProgress', JSON.stringify([]));
      console.log(`✅ Unlocked ${beltData.belt} belt at stripe ${beltData.stripe} (${beltData.xp} XP)`);
      return true;
    }
    console.log('❌ Invalid belt code');
    return false;
  };

  // Helper function to login as test member
  window.loginAsTestMember = function(email) {
    const members = JSON.parse(localStorage.getItem('teamMembers') || '[]');
    const member = members.find(m => m.email.toLowerCase() === email.toLowerCase());
    if (member) {
      localStorage.setItem('currentUser', JSON.stringify(member));
      localStorage.setItem('userTeamCode', member.teamCode);
      localStorage.setItem('currentBelt', member.belt);
      localStorage.setItem('currentStripe', member.stripe.toString());
      localStorage.setItem('totalXP', member.xp.toString());
      console.log(`✅ Logged in as ${member.name}`);
      console.log(`   Belt: ${member.belt}, Stripe: ${member.stripe}, XP: ${member.xp}`);
      return true;
    }
    console.log('❌ Member not found');
    return false;
  };

  console.log('\n🎯 Usage:');
  console.log('   applyBeltCode("WHITE-START-2024") - Unlock white belt');
  console.log('   applyBeltCode("BLUE-START-2024") - Unlock blue belt');
  console.log('   applyBeltCode("PURPLE-START-2024") - Unlock purple belt');
  console.log('   applyBeltCode("BROWN-START-2024") - Unlock brown belt');
  console.log('   applyBeltCode("BLACK-START-2024") - Unlock black belt');
  console.log('\n👥 Test Team Login:');
  console.log('   loginAsTestMember("sarah.chen@acme.com")');
  console.log('   loginAsTestMember("marcus.r@acme.com")');
  console.log('   loginAsTestMember("emma.t@acme.com")');
  console.log('   loginAsTestMember("david.kim@acme.com")');
  console.log('   loginAsTestMember("lisa.a@acme.com")');
  console.log('\n✅ Setup complete!');
})();

