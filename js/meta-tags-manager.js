/**
* TAP-IN Meta Tags Manager
* Dynamically manages meta tags for SEO and social sharing
*/
(function() {
'use strict';
const MetaTagsManager = {
init: function() {
            // Meta tags are typically static in HTML
            // This module provides utilities for dynamic updates if needed
this.updateCanonical();
},
updateCanonical: function() {
            // Ensure canonical URL is set
let canonical = document.querySelector('link[rel="canonical"]');
if (!canonical) {
canonical = document.createElement('link');
canonical.rel = 'canonical';
document.head.appendChild(canonical);
}
canonical.href = window.location.href.split('?')[0]; // Remove query params
},
updateTitle: function(newTitle) {
document.title = newTitle;
},
updateDescription: function(newDescription) {
let meta = document.querySelector('meta[name="description"]');
if (!meta) {
meta = document.createElement('meta');
meta.name = 'description';
document.head.appendChild(meta);
}
meta.content = newDescription;
            // Also update Open Graph description
let ogDesc = document.querySelector('meta[property="og:description"]');
if (!ogDesc) {
ogDesc = document.createElement('meta');
ogDesc.setAttribute('property', 'og:description');
document.head.appendChild(ogDesc);
}
ogDesc.content = newDescription;
},
updateImage: function(imageUrl) {
let ogImage = document.querySelector('meta[property="og:image"]');
if (!ogImage) {
ogImage = document.createElement('meta');
ogImage.setAttribute('property', 'og:image');
document.head.appendChild(ogImage);
}
ogImage.content = imageUrl;
}
};
    // Initialize
if (document.readyState === 'loading') {
document.addEventListener('DOMContentLoaded', () => MetaTagsManager.init());
} else {
MetaTagsManager.init();
}
    // Export
window.MetaTagsManager = MetaTagsManager;
})();