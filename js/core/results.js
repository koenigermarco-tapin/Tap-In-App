/**
* TAP-IN Results Display Utilities
* @module core/results
*/
export function showResults(resultsContainerId, results) {
const container = document.getElementById(resultsContainerId);
if (!container) {
        console.warn('showResults: Container not found:', resultsContainerId);
return;
}
    // Use safeSetInnerHTML if available
if (typeof window !== 'undefined' && window.safeSetInnerHTML) {
window.safeSetInnerHTML(container, results);
} else {
container.innerHTML = results;
}
}
// Make available globally
if (typeof window !== 'undefined') {
window.showResults = showResults;
}