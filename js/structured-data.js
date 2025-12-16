/**
* TAP-IN Structured Data (JSON-LD)
* Adds structured data for SEO and rich snippets
*/
(function() {
'use strict';
const StructuredData = {
init: function() {
            // Structured data is typically added in HTML
            // This module provides utilities for dynamic updates
this.ensureStructuredData();
},
ensureStructuredData: function() {
            // Check if structured data already exists
const existing = document.querySelector('script[type="application/ld+json"]');
if (existing) {
return; // Already present
}
            // Add basic structured data for organization
const structuredData = {
"@context": "https://schema.org",
"@type": "EducationalOrganization",
"name": "TAP-IN Leadership Academy",
"description": "Transform teams through embodied leadership training",
"url": window.location.origin,
"logo": window.location.origin + "/icons/icon-512x512.png"
};
this.addStructuredData(structuredData);
},
addStructuredData: function(data) {
const script = document.createElement('script');
script.type = 'application/ld+json';
script.textContent = JSON.stringify(data);
document.head.appendChild(script);
},
addCourseStructuredData: function(courseData) {
const structuredData = {
"@context": "https://schema.org",
"@type": "Course",
"name": courseData.name || document.title,
"description": courseData.description || "",
"provider": {
"@type": "Organization",
"name": "TAP-IN Leadership Academy"
}
};
this.addStructuredData(structuredData);
},
addArticleStructuredData: function(articleData) {
const structuredData = {
"@context": "https://schema.org",
"@type": "Article",
"headline": articleData.headline || document.title,
"author": {
"@type": "Organization",
"name": "TAP-IN Leadership Academy"
},
"datePublished": articleData.datePublished || new Date().toISOString(),
"description": articleData.description || ""
};
this.addStructuredData(structuredData);
}
};
    // Initialize
if (document.readyState === 'loading') {
document.addEventListener('DOMContentLoaded', () => StructuredData.init());
} else {
StructuredData.init();
}
    // Export
window.StructuredData = StructuredData;
})();