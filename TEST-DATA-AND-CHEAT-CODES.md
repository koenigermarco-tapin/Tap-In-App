# 🎮 TAP-IN Test Data & Cheat Codes

## Belt Level Cheat Codes

Use these codes to unlock belt levels starting at 0 stripes:

### White Belt (Starting Level)
```
WHITE-START-2024
```

### Blue Belt
```
BLUE-START-2024
```

### Purple Belt
```
PURPLE-START-2024
```

### Brown Belt
```
BROWN-START-2024
```

### Black Belt
```
BLACK-START-2024
```

---

## 🧪 Test Team: "ACME Leadership Team"

**Team Access Code:** `TEAM-ACME123`

### Team Members (5 Different Profiles)

#### 1. Sarah Chen - Visionary Leader
- **Name:** Sarah Chen
- **Email:** sarah.chen@acme.com
- **Belt:** Blue Belt, Stripe 2
- **XP:** 1,250
- **Worker Type:** Visionary
- **Leadership Style:** Strategic Architect
- **Team Role:** CEO/Founder

#### 2. Marcus Rodriguez - Execution Expert
- **Name:** Marcus Rodriguez
- **Email:** marcus.r@acme.com
- **Belt:** White Belt, Stripe 4
- **XP:** 850
- **Worker Type:** Executor
- **Leadership Style:** Action-Oriented
- **Team Role:** Operations Manager

#### 3. Emma Thompson - Facilitator
- **Name:** Emma Thompson
- **Email:** emma.t@acme.com
- **Belt:** Purple Belt, Stripe 1
- **XP:** 2,100
- **Worker Type:** Facilitator
- **Leadership Style:** People-Focused
- **Team Role:** HR Director

#### 4. David Kim - Analytical Architect
- **Name:** David Kim
- **Email:** david.kim@acme.com
- **Belt:** Brown Belt, Stripe 0
- **XP:** 3,500
- **Worker Type:** Architect
- **Leadership Style:** Systems Thinker
- **Team Role:** CTO

#### 5. Lisa Anderson - Balanced Leader
- **Name:** Lisa Anderson
- **Email:** lisa.a@acme.com
- **Belt:** White Belt, Stripe 3
- **XP:** 650
- **Worker Type:** Balanced
- **Leadership Style:** Adaptive
- **Team Role:** Product Manager

---

## 📝 How to Use

### For Belt Codes:
1. Navigate to the belt unlock page or use browser console
2. Enter the cheat code for the desired belt level
3. Your belt will be set to that level with 0 stripes

### For Test Team:
1. Go to `join-team.html`
2. Enter Team Access Code: `TEAM-ACME123`
3. Use any of the 5 member emails above to log in
4. Each profile has different progress and characteristics

---

## 🔧 Quick Setup Script

Run this in browser console to set up test data:

```javascript
// Set up test team
localStorage.setItem('validTeamCodes', JSON.stringify(['TEAM-ACME123']));
localStorage.setItem('teamCode', 'TEAM-ACME123');

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

localStorage.setItem('teamMembers', JSON.stringify(testMembers));
console.log('✅ Test team created! Use TEAM-ACME123 to join.');
```

---

## 🎯 Belt Code Implementation

To use belt codes, add this to your unlock system:

```javascript
const beltCodes = {
  'WHITE-START-2024': { belt: 'white', stripe: 0 },
  'BLUE-START-2024': { belt: 'blue', stripe: 0 },
  'PURPLE-START-2024': { belt: 'purple', stripe: 0 },
  'BROWN-START-2024': { belt: 'brown', stripe: 0 },
  'BLACK-START-2024': { belt: 'black', stripe: 0 }
};

function applyBeltCode(code) {
  const beltData = beltCodes[code.toUpperCase()];
  if (beltData) {
    localStorage.setItem('currentBelt', beltData.belt);
    localStorage.setItem('currentStripe', beltData.stripe.toString());
    localStorage.setItem('beltProgress', JSON.stringify([]));
    console.log(`✅ Unlocked ${beltData.belt} belt at stripe ${beltData.stripe}`);
    return true;
  }
  return false;
}
```

---

Created: 2024-12-13
For: Testing and Development

