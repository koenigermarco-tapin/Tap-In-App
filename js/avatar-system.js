/**
* TAP-IN Avatar System
* Handles avatar customization and display
*/
const AvatarSystem = {
    // Default configuration
config: {
background: 'dojo',
gi: 'white',
belt: 'white',
face: '😊',
hair: 'short',
stripes: 0
},
    // Initialize
init() {
this.loadConfig();
this.setupClickHandler();
this.updateBeltFromProgress();
if (console && console.log) {
            console.log('✅ Avatar system initialized');
}
},
    // Load saved configuration
loadConfig() {
try {
const saved = localStorage.getItem('avatar_config');
if (saved) {
this.config = { ...this.config, ...JSON.parse(saved) };
}
} catch (e) {
            console.warn('Error loading avatar config:', e);
}
        // Auto-update belt from XPManager
this.updateBeltFromProgress();
},
    // Update belt from XP progress
updateBeltFromProgress() {
if (window.XPManager) {
const progress = XPManager.getProgress();
this.config.belt = progress.currentBelt;
this.config.stripes = progress.currentStripe;
}
},
    // Save configuration
saveConfig() {
try {
localStorage.setItem('avatar_config', JSON.stringify(this.config));
if (console && console.log) {
                console.log('✅ Avatar configuration saved');
}
} catch (e) {
            console.warn('Error saving avatar config:', e);
}
},
    // Make avatar clickable
setupClickHandler() {
        // Find all avatars on page
document.addEventListener('click', (e) => {
if (e.target.closest('.user-avatar, .avatar-container')) {
this.openCustomizer();
}
});
},
    // Generate avatar HTML
generateHTML() {
const { background, gi, belt, face, stripes } = this.config;
        // Create stripe elements
let stripeHTML = '';
for (let i = 0; i < stripes && i < 4; i++) {
stripeHTML += '<div class="avatar-stripe" style="width: 100%; height: 3px; background: #f59e0b; margin: 2px 0;"></div>';
}
        // Belt colors
const beltColors = {
white: '#f7fafc',
blue: '#3b82f6',
purple: '#7c3aed',
brown: '#92400e',
black: '#1f2937'
};
const beltColor = beltColors[belt] || beltColors.white;
        // Background emojis
const backgrounds = {
garage: '🏭',
dojo: '🏯',
arena: '🏟️',
japan: '🗾',
temple: '⛩️'
};
const bgEmoji = backgrounds[background] || backgrounds.dojo;
        // Gi colors
const giColors = {
white: '#ffffff',
blue: '#3b82f6',
black: '#1f2937',
purple: '#7c3aed',
gold: '#f59e0b'
};
const giColor = giColors[gi] || giColors.white;
return `
<div class="avatar-layers" style="position: relative; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; flex-direction: column;">
<div class="avatar-bg" style="position: absolute; font-size: 4rem; opacity: 0.3; z-index: 0;">${bgEmoji}</div>
<div class="avatar-body" style="position: relative; z-index: 1; display: flex; flex-direction: column; align-items: center;">
<div style="font-size: 4rem; margin-bottom: 0.5rem;">${face}</div>
<div class="avatar-gi" style="width: 60px; height: 40px; background: ${giColor}; border-radius: 8px; margin-bottom: 0.25rem; border: 2px solid rgba(0,0,0,0.2);"></div>
<div class="avatar-belt" style="width: 70px; height: 12px; background: ${beltColor}; border-radius: 6px; position: relative; box-shadow: 0 2px 4px rgba(0,0,0,0.2);">
${stripeHTML}
</div>
</div>
</div>
`;
},
    // Render avatar
render(containerId = 'avatarPreview') {
const container = document.getElementById(containerId);
if (container) {
container.innerHTML = this.generateHTML();
}
        // Also render in all avatar containers
document.querySelectorAll('.avatar-container:not(#avatarPreview)').forEach(container => {
container.innerHTML = this.generateHTML();
});
},
    // Open customizer
openCustomizer() {
const modal = document.getElementById('avatarCustomizerModal');
if (modal) {
modal.style.display = 'flex';
this.render('avatarPreview');
this.updateBeltDisplay();
            // Mark selected options
Object.keys(this.config).forEach(key => {
const buttons = document.querySelectorAll(`#tab-${key} .option-btn`);
buttons.forEach(btn => {
if (btn.dataset.value === this.config[key]) {
btn.classList.add('selected');
} else {
btn.classList.remove('selected');
}
});
});
}
},
    // Update belt display in modal
updateBeltDisplay() {
const beltDisplay = document.getElementById('currentBeltDisplay');
if (beltDisplay) {
const beltNames = {
white: 'White Belt',
blue: 'Blue Belt',
purple: 'Purple Belt',
brown: 'Brown Belt',
black: 'Black Belt'
};
beltDisplay.textContent = beltNames[this.config.belt] || 'White Belt';
}
}
};
// Make globally available
window.AvatarSystem = AvatarSystem;
// Initialize when DOM ready
if (document.readyState === 'loading') {
document.addEventListener('DOMContentLoaded', () => {
AvatarSystem.init();
        // Load avatar customizer component
loadAvatarCustomizer();
});
} else {
AvatarSystem.init();
loadAvatarCustomizer();
}
// Load avatar customizer component
function loadAvatarCustomizer() {
const container = document.getElementById('avatarCustomizerContainer');
if (container) {
fetch('components/avatar-customizer.html')
.then(r => r.text())
.then(html => {
container.innerHTML = html;
                // Re-initialize after component loads
setTimeout(() => {
AvatarSystem.render('avatarPreview');
}, 100);
})
.catch(e => {
if (console && console.warn) {
                    console.warn('Avatar customizer not loaded:', e);
}
});
}
}