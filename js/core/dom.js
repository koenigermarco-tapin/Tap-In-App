/**
* TAP-IN DOM Utilities
* @module core/dom
*/
export function safeSetInnerHTML(element, html) {
if (!element) {
        console.warn('safeSetInnerHTML: Element not found');
return;
}
const sanitized = html
.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
.replace(/on\w+\s*=/gi, 'data-blocked=');
element.innerHTML = sanitized;
}
export function $(id) {
return document.getElementById(id);
}
export function $$(selector, parent = document) {
return parent.querySelectorAll(selector);
}
// Make available globally for inline scripts
if (typeof window !== 'undefined') {
window.safeSetInnerHTML = safeSetInnerHTML;
window.$ = $;
window.$$ = $$;
}