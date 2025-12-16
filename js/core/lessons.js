/**
* TAP-IN Lesson Utilities
* @module core/lessons
*/
export function completeLesson(lessonId, xpAward = 25) {
try {
        // Mark lesson as complete
if (typeof localStorage !== 'undefined') {
const completed = JSON.parse(localStorage.getItem('completedLessons') || '[]');
if (!completed.includes(lessonId)) {
completed.push(lessonId);
localStorage.setItem('completedLessons', JSON.stringify(completed));
}
}
        // Award XP if XP system is available
if (typeof window !== 'undefined' && window.awardXP) {
window.awardXP(xpAward);
}
return true;
} catch (e) {
        console.warn('Failed to complete lesson:', e);
return false;
}
}
// Make available globally
if (typeof window !== 'undefined') {
window.completeLesson = completeLesson;
}