/**
* TAP-IN Tooltips System
* Native tooltip implementation (no dependencies)
*/
(function() {
'use strict';
const Tooltips = {
tooltips: new Map(),
activeTooltip: null,
init: function() {
      // Initialize tooltips for elements with data-tooltip
this.initDataTooltips();
      // Initialize tooltips for common UI elements
this.initCommonTooltips();
      console.log('💡 Tooltips system initialized');
},
initDataTooltips: function() {
document.querySelectorAll('[data-tooltip]').forEach(element => {
const text = element.getAttribute('data-tooltip');
const placement = element.getAttribute('data-tooltip-placement') || 'top';
this.addTooltip(element, text, placement);
});
},
initCommonTooltips: function() {
      // XP badges
document.querySelectorAll('.xp-badge, [class*="xp"], #totalXP').forEach(el => {
if (!el.hasAttribute('data-tooltip')) {
this.addTooltip(el, 'Earn XP by completing lessons and assessments', 'top');
}
});
      // Belt badges
document.querySelectorAll('.belt-badge, [class*="belt"]').forEach(el => {
if (!el.hasAttribute('data-tooltip') && el.textContent.trim()) {
this.addTooltip(el, 'Your current belt level. Complete 4 stripes to advance.', 'top');
}
});
      // Achievement buttons
document.querySelectorAll('a[href*="achievement"], button:has(🏆)').forEach(el => {
if (!el.hasAttribute('data-tooltip')) {
this.addTooltip(el, 'View your unlocked achievements', 'top');
}
});
},
addTooltip: function(element, text, placement = 'top') {
if (!element || !text) return;
      // Remove existing tooltip
if (this.tooltips.has(element)) {
this.removeTooltip(element);
}
      // Create tooltip
const tooltip = {
element: element,
text: text,
placement: placement,
tooltipEl: null
};
this.tooltips.set(element, tooltip);
      // Add event listeners
element.addEventListener('mouseenter', () => this.showTooltip(tooltip));
element.addEventListener('mouseleave', () => this.hideTooltip(tooltip));
element.addEventListener('focus', () => this.showTooltip(tooltip));
element.addEventListener('blur', () => this.hideTooltip(tooltip));
},
showTooltip: function(tooltip) {
if (this.activeTooltip === tooltip) return;
this.hideTooltip();
const tooltipEl = document.createElement('div');
tooltipEl.className = `tap-in-tooltip tap-in-tooltip-${tooltip.placement}`;
tooltipEl.setAttribute('role', 'tooltip');
tooltipEl.textContent = tooltip.text;
tooltipEl.id = 'active-tooltip';
document.body.appendChild(tooltipEl);
      // Position tooltip
this.positionTooltip(tooltip.element, tooltipEl, tooltip.placement);
tooltip.tooltipEl = tooltipEl;
this.activeTooltip = tooltip;
      // Fade in
setTimeout(() => tooltipEl.classList.add('show'), 10);
},
hideTooltip: function() {
if (this.activeTooltip && this.activeTooltip.tooltipEl) {
const tooltipEl = this.activeTooltip.tooltipEl;
tooltipEl.classList.remove('show');
setTimeout(() => {
if (tooltipEl.parentNode) {
tooltipEl.remove();
}
}, 200);
this.activeTooltip.tooltipEl = null;
}
this.activeTooltip = null;
},
positionTooltip: function(element, tooltipEl, placement) {
const rect = element.getBoundingClientRect();
const tooltipRect = tooltipEl.getBoundingClientRect();
const scrollY = window.scrollY;
const scrollX = window.scrollX;
let top, left;
switch (placement) {
case 'top':
top = rect.top + scrollY - tooltipRect.height - 8;
left = rect.left + scrollX + (rect.width / 2) - (tooltipRect.width / 2);
break;
case 'bottom':
top = rect.bottom + scrollY + 8;
left = rect.left + scrollX + (rect.width / 2) - (tooltipRect.width / 2);
break;
case 'left':
top = rect.top + scrollY + (rect.height / 2) - (tooltipRect.height / 2);
left = rect.left + scrollX - tooltipRect.width - 8;
break;
case 'right':
top = rect.top + scrollY + (rect.height / 2) - (tooltipRect.height / 2);
left = rect.right + scrollX + 8;
break;
default:
top = rect.top + scrollY - tooltipRect.height - 8;
left = rect.left + scrollX + (rect.width / 2) - (tooltipRect.width / 2);
}
      // Keep tooltip in viewport
const padding = 10;
if (left < padding) left = padding;
if (left + tooltipRect.width > window.innerWidth - padding) {
left = window.innerWidth - tooltipRect.width - padding;
}
if (top < scrollY + padding) {
top = scrollY + padding;
        // Switch to bottom if too close to top
if (placement === 'top') {
top = rect.bottom + scrollY + 8;
}
}
tooltipEl.style.top = top + 'px';
tooltipEl.style.left = left + 'px';
},
removeTooltip: function(element) {
const tooltip = this.tooltips.get(element);
if (tooltip) {
this.hideTooltip();
this.tooltips.delete(element);
}
}
};
  // Add styles
if (!document.getElementById('tooltip-styles')) {
const style = document.createElement('style');
style.id = 'tooltip-styles';
style.textContent = `
.tap-in-tooltip {
position: absolute;
background: #1a365d;
color: white;
padding: 8px 12px;
border-radius: 6px;
font-size: 14px;
line-height: 1.4;
max-width: 250px;
z-index: 10001;
pointer-events: none;
opacity: 0;
transition: opacity 0.2s ease;
box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}
.tap-in-tooltip.show {
opacity: 1;
}
.tap-in-tooltip::after {
content: '';
position: absolute;
width: 0;
height: 0;
border: 6px solid transparent;
}
.tap-in-tooltip-top::after {
bottom: -12px;
left: 50%;
transform: translateX(-50%);
border-top-color: #1a365d;
}
.tap-in-tooltip-bottom::after {
top: -12px;
left: 50%;
transform: translateX(-50%);
border-bottom-color: #1a365d;
}
.tap-in-tooltip-left::after {
right: -12px;
top: 50%;
transform: translateY(-50%);
border-left-color: #1a365d;
}
.tap-in-tooltip-right::after {
left: -12px;
top: 50%;
transform: translateY(-50%);
border-right-color: #1a365d;
}
`;
document.head.appendChild(style);
}
  // Initialize on DOM ready
if (document.readyState === 'loading') {
document.addEventListener('DOMContentLoaded', () => Tooltips.init());
} else {
Tooltips.init();
}
  // Re-initialize for dynamically added elements
const observer = new MutationObserver(() => {
Tooltips.initDataTooltips();
});
observer.observe(document.body, {
childList: true,
subtree: true
});
  // Export for global use
window.Tooltips = Tooltips;
})();