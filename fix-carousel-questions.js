#!/usr/bin/env node
// Fix Worker Type questions in combined-profile-carousel.html
// Convert from generic 'scale' type to proper 'radio' options
const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'combined-profile-carousel.html');
let content = fs.readFileSync(file, 'utf8');
// Define the 12 worker type questions with proper options
const workerQuestions = [
{
number: 1,
text: 'How do you prefer to tackle your work?',
options: [
{value: 'sprinter', text: 'In intense bursts with breaks in between'},
{value: 'jogger', text: 'At a steady, consistent pace throughout the day'},
{value: 'ultrarunner', text: 'Slow and methodical, sustainable over long periods'}
]
},
{
number: 2,
text: 'When facing a deadline, you:',
options: [
{value: 'sprinter', text: 'Thrive under pressure and work best at the last minute'},
{value: 'jogger', text: 'Maintain steady progress to finish on time'},
{value: 'ultrarunner', text: 'Start early and pace yourself to avoid stress'}
]
},
{
number: 3,
text: 'Your energy levels throughout the day are:',
options: [
{value: 'sprinter', text: 'Peaks and valleys - high energy then need recovery'},
{value: 'jogger', text: 'Relatively stable and predictable'},
{value: 'ultrarunner', text: 'Steady and enduring, rarely fluctuate'}
]
},
{
number: 4,
text: 'How do you handle multiple projects?',
options: [
{value: 'sprinter', text: 'Focus intensely on one, complete it, then move to the next'},
{value: 'jogger', text: 'Balance time across projects throughout the week'},
{value: 'ultrarunner', text: 'Make slow, consistent progress on all simultaneously'}
]
},
{
number: 5,
text: 'Your ideal work environment allows you to:',
options: [
{value: 'sprinter', text: 'Work in short, focused sessions with flexibility for breaks'},
{value: 'jogger', text: 'Maintain a regular routine and consistent schedule'},
{value: 'ultrarunner', text: 'Work at your own pace without time pressure'}
]
},
{
number: 6,
text: 'After completing a major project, you:',
options: [
{value: 'sprinter', text: 'Need significant downtime before the next challenge'},
{value: 'jogger', text: 'Transition smoothly to the next project'},
{value: 'ultrarunner', text: 'Already well into the next long-term initiative'}
]
},
{
number: 7,
text: 'When learning something new, you prefer to:',
options: [
{value: 'sprinter', text: 'Dive in intensely and master it quickly'},
{value: 'jogger', text: 'Learn consistently through regular practice'},
{value: 'ultrarunner', text: 'Take time to deeply understand before moving forward'}
]
},
{
number: 8,
text: 'Your productivity is highest when:',
options: [
{value: 'sprinter', text: "There's a clear deadline creating urgency"},
{value: 'jogger', text: 'You have a structured routine to follow'},
{value: 'ultrarunner', text: 'You have ample time to do thorough work'}
]
},
{
number: 9,
text: 'How do you recharge?',
options: [
{value: 'sprinter', text: 'Complete breaks from work - clear boundaries'},
{value: 'jogger', text: 'Regular short breaks throughout the day'},
{value: 'ultrarunner', text: 'Rarely feel drained - work is sustainable'}
]
},
{
number: 10,
text: 'In a typical work week, you prefer:',
options: [
{value: 'sprinter', text: 'Variety and intensity - different challenges daily'},
{value: 'jogger', text: 'Predictable structure with some variety'},
{value: 'ultrarunner', text: 'Consistency - similar tasks and rhythms'}
]
},
{
number: 11,
text: 'Your approach to meetings is:',
options: [
{value: 'sprinter', text: 'Short and intense - get in, decide, get out'},
{value: 'jogger', text: 'Scheduled regularly with clear agendas'},
{value: 'ultrarunner', text: 'Thorough discussions - take time needed'}
]
},
{
number: 12,
text: 'When stressed, you perform best by:',
options: [
{value: 'sprinter', text: 'Channeling it into rapid, focused action'},
{value: 'jogger', text: 'Maintaining your normal routine and pace'},
{value: 'ultrarunner', text: 'Staying calm and methodical'}
]
}
];
// Replace type: 'scale' with type: 'radio' and add options for each worker question
workerQuestions.forEach(q => {
    // Find the question block
const searchPattern = new RegExp(
`(\\s+section: 'worker',\\s+number: ${q.number},\\s+text: '${q.text.replace(/[?:]/g, '\\$&')}',\\s+)type: 'scale',\\s+labels: \\[[^\\]]+\\],`,
'g'
);
const replacement = `$1type: 'radio',\n options: [\n` +
q.options.map(opt =>
` {value: '${opt.value}', text: '${opt.text}'}`
).join(',\n') +
'\n ],';
content = content.replace(searchPattern, replacement);
});
// Write the fixed content
fs.writeFileSync(file, content, 'utf8');
console.log('✅ Fixed all 12 Worker Type questions - changed from scale to radio with proper options');