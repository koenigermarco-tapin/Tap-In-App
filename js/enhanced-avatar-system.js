/**
* TAP-IN Enhanced Avatar System
* Full customization with gender, hair color, skin color, and accessories
*/
const EnhancedAvatarSystem = {
    // Default avatar settings
defaults: {
gender: 'male',
hairColor: '#3b2e1f',
skinColor: '#f0d9b5',
accessories: []
},
    /**
* Get current avatar settings
*/
getSettings: function() {
const stored = localStorage.getItem('avatarCustomization');
if (stored) {
try {
return JSON.parse(stored);
} catch (e) {
                console.warn('Error parsing avatar settings:', e);
}
}
return { ...this.defaults };
},
    /**
* Save avatar settings
*/
saveSettings: function(settings) {
const current = this.getSettings();
const updated = { ...current, ...settings };
localStorage.setItem('avatarCustomization', JSON.stringify(updated));
        // Trigger update event
window.dispatchEvent(new CustomEvent('avatarUpdated', { detail: updated }));
return updated;
},
    /**
* Get gender
*/
getGender: function() {
return this.getSettings().gender || 'male';
},
    /**
* Set gender
*/
setGender: function(gender) {
if (gender !== 'male' && gender !== 'female') {
            console.warn('Invalid gender:', gender);
return;
}
return this.saveSettings({ gender: gender });
},
    /**
* Get hair color
*/
getHairColor: function() {
return this.getSettings().hairColor || '#3b2e1f';
},
    /**
* Set hair color
*/
setHairColor: function(color) {
return this.saveSettings({ hairColor: color });
},
    /**
* Get skin color
*/
getSkinColor: function() {
return this.getSettings().skinColor || '#f0d9b5';
},
    /**
* Set skin color
*/
setSkinColor: function(color) {
return this.saveSettings({ skinColor: color });
},
    /**
* Get accessories
*/
getAccessories: function() {
return this.getSettings().accessories || [];
},
    /**
* Add accessory
*/
addAccessory: function(accessoryId) {
const accessories = this.getAccessories();
if (!accessories.includes(accessoryId)) {
accessories.push(accessoryId);
return this.saveSettings({ accessories: accessories });
}
return this.getSettings();
},
    /**
* Remove accessory
*/
removeAccessory: function(accessoryId) {
const accessories = this.getAccessories();
const filtered = accessories.filter(id => id !== accessoryId);
return this.saveSettings({ accessories: filtered });
},
    /**
* Get current belt (for Gi color)
*/
getCurrentBelt: function() {
        // Check belt completion flags
if (localStorage.getItem('blackBeltComplete') === 'true') return 'black';
if (localStorage.getItem('brownBeltComplete') === 'true') return 'brown';
if (localStorage.getItem('purpleBeltComplete') === 'true') return 'purple';
if (localStorage.getItem('blueBeltComplete') === 'true') return 'blue';
if (localStorage.getItem('whiteBeltComplete') === 'true') return 'white';
        // Check assessment result
const assessment = localStorage.getItem('tapinBeltAssessment');
if (assessment) {
try {
const result = JSON.parse(assessment);
if (result.belt) {
return result.belt.toLowerCase();
}
} catch (e) {
                console.warn('Error parsing assessment:', e);
}
}
return 'white';
},
    /**
* Get Gi color based on belt
*/
getGiColor: function() {
const belt = this.getCurrentBelt();
const giColors = {
'white': '#ffffff',
'blue': '#2563eb',
'purple': '#7c3aed',
'brown': '#92400e',
'black': '#1f2937'
};
return giColors[belt] || giColors.white;
},
    /**
* Render avatar to SVG element
*/
renderAvatar: function(svgElement) {
if (!svgElement) return;
const settings = this.getSettings();
const giColor = this.getGiColor();
const belt = this.getCurrentBelt();
        // Get SVG viewBox (default if not set)
const viewBox = svgElement.getAttribute('viewBox') || '0 0 200 300';
const [x, y, width, height] = viewBox.split(' ').map(Number);
        // Clear existing content (except defs)
const existing = svgElement.querySelectorAll(':not(defs)');
existing.forEach(el => el.remove());
        // Create avatar elements
const svgNS = 'http://www.w3.org/2000/svg';
        // Background
const bg = document.createElementNS(svgNS, 'rect');
bg.setAttribute('x', x);
bg.setAttribute('y', y);
bg.setAttribute('width', width);
bg.setAttribute('height', height);
bg.setAttribute('fill', '#f3f4f6');
svgElement.appendChild(bg);
        // Head (with skin color)
const head = document.createElementNS(svgNS, 'circle');
head.setAttribute('cx', width / 2);
head.setAttribute('cy', 50);
head.setAttribute('r', 30);
head.setAttribute('fill', settings.skinColor);
head.classList.add('avatar-head');
svgElement.appendChild(head);
        // Hair (gender-specific)
if (settings.gender === 'male') {
            // Short hair
const hair = document.createElementNS(svgNS, 'path');
hair.setAttribute('d', `M ${width/2 - 28} 35 Q ${width/2 - 28} 25 ${width/2} 25 Q ${width/2 + 28} 25 ${width/2 + 28} 35 L ${width/2 + 25} 50 L ${width/2 - 25} 50 Z`);
hair.setAttribute('fill', settings.hairColor);
hair.classList.add('avatar-hair');
svgElement.appendChild(hair);
} else {
            // Long hair
const hair = document.createElementNS(svgNS, 'path');
hair.setAttribute('d', `M ${width/2 - 30} 35 Q ${width/2 - 30} 20 ${width/2} 20 Q ${width/2 + 30} 20 ${width/2 + 30} 35 L ${width/2 + 32} 70 L ${width/2 - 32} 70 Z`);
hair.setAttribute('fill', settings.hairColor);
hair.classList.add('avatar-hair');
svgElement.appendChild(hair);
}
        // Body (Gi)
const body = document.createElementNS(svgNS, 'rect');
body.setAttribute('x', width/2 - 30);
body.setAttribute('y', 80);
body.setAttribute('width', 60);
body.setAttribute('height', 80);
body.setAttribute('fill', giColor);
body.classList.add('avatar-gi');
svgElement.appendChild(body);
        // Belt
const beltRect = document.createElementNS(svgNS, 'rect');
beltRect.setAttribute('x', width/2 - 40);
beltRect.setAttribute('y', 130);
beltRect.setAttribute('width', 80);
beltRect.setAttribute('height', 15);
beltRect.setAttribute('fill', this.getBeltColor(belt));
beltRect.classList.add('avatar-belt', `${belt}-belt`);
svgElement.appendChild(beltRect);
        // Arms
const leftArm = document.createElementNS(svgNS, 'line');
leftArm.setAttribute('x1', width/2 - 30);
leftArm.setAttribute('y1', 90);
leftArm.setAttribute('x2', width/2 - 50);
leftArm.setAttribute('y2', 120);
leftArm.setAttribute('stroke', giColor);
leftArm.setAttribute('stroke-width', '8');
svgElement.appendChild(leftArm);
const rightArm = document.createElementNS(svgNS, 'line');
rightArm.setAttribute('x1', width/2 + 30);
rightArm.setAttribute('y1', 90);
rightArm.setAttribute('x2', width/2 + 50);
rightArm.setAttribute('y2', 120);
rightArm.setAttribute('stroke', giColor);
rightArm.setAttribute('stroke-width', '8');
svgElement.appendChild(rightArm);
        // Legs
const leftLeg = document.createElementNS(svgNS, 'rect');
leftLeg.setAttribute('x', width/2 - 30);
leftLeg.setAttribute('y', 160);
leftLeg.setAttribute('width', 20);
leftLeg.setAttribute('height', 60);
leftLeg.setAttribute('fill', giColor);
svgElement.appendChild(leftLeg);
const rightLeg = document.createElementNS(svgNS, 'rect');
rightLeg.setAttribute('x', width/2 + 10);
rightLeg.setAttribute('y', 160);
rightLeg.setAttribute('width', 20);
rightLeg.setAttribute('height', 60);
rightLeg.setAttribute('fill', giColor);
svgElement.appendChild(rightLeg);
        // Feet
const leftFoot = document.createElementNS(svgNS, 'ellipse');
leftFoot.setAttribute('cx', width/2 - 20);
leftFoot.setAttribute('cy', 225);
leftFoot.setAttribute('rx', 15);
leftFoot.setAttribute('ry', 8);
leftFoot.setAttribute('fill', '#333');
svgElement.appendChild(leftFoot);
const rightFoot = document.createElementNS(svgNS, 'ellipse');
rightFoot.setAttribute('cx', width/2 + 20);
rightFoot.setAttribute('cy', 225);
rightFoot.setAttribute('rx', 15);
rightFoot.setAttribute('ry', 8);
rightFoot.setAttribute('fill', '#333');
svgElement.appendChild(rightFoot);
        // Add accessories
settings.accessories.forEach(accessoryId => {
this.renderAccessory(svgElement, accessoryId, width, height);
});
},
    /**
* Get belt color
*/
getBeltColor: function(belt) {
const colors = {
'white': '#FFFFFF',
'blue': '#1e40af',
'purple': '#7c3aed',
'brown': '#92400e',
'black': '#1f2937'
};
return colors[belt] || colors.white;
},
    /**
* Render accessory
*/
renderAccessory: function(svgElement, accessoryId, width, height) {
        // Accessory rendering logic would go here
        // For now, placeholder
        console.log('Rendering accessory:', accessoryId);
},
    /**
* Initialize avatar display
*/
init: function() {
        // Auto-render all avatar SVGs on page
document.querySelectorAll('.avatar-svg, .martial-artist, [data-avatar]').forEach(svg => {
this.renderAvatar(svg);
});
        // Listen for updates
window.addEventListener('avatarUpdated', () => {
document.querySelectorAll('.avatar-svg, .martial-artist, [data-avatar]').forEach(svg => {
this.renderAvatar(svg);
});
});
}
};
// Export to global scope
window.EnhancedAvatarSystem = EnhancedAvatarSystem;
// Initialize on DOM ready
if (document.readyState === 'loading') {
document.addEventListener('DOMContentLoaded', () => EnhancedAvatarSystem.init());
} else {
EnhancedAvatarSystem.init();
}