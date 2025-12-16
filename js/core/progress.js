/**
* TAP-IN Progress Utilities
* @module core/progress
*/
export function updateProgress(answered, total, progressTextId, progressBarId) {
const percentage = total > 0 ? (answered / total) * 100 : 0;
const progressText = document.getElementById(progressTextId);
if (progressText) {
progressText.textContent = `${answered}/${total}`;
}
const progressBar = document.getElementById(progressBarId);
if (progressBar) {
progressBar.style.width = `${percentage}%`;
}
}
export function saveProgress(key, data) {
try {
if (typeof localStorage !== 'undefined') {
localStorage.setItem(key, JSON.stringify(data));
}
} catch (e) {
        console.warn('Failed to save progress:', e);
}
}
export function loadProgress(key) {
try {
if (typeof localStorage !== 'undefined') {
const data = localStorage.getItem(key);
return data ? JSON.parse(data) : null;
}
} catch (e) {
        console.warn('Failed to load progress:', e);
}
return null;
}
// Make available globally
if (typeof window !== 'undefined') {
window.updateProgress = updateProgress;
window.saveProgress = saveProgress;
window.loadProgress = loadProgress;
}