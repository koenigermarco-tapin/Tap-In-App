// Content Loader - Loads JSON content into stripe pages
(function() {
'use strict';
const ContentLoader = {
scenarios: null,
funFacts: null,
multipleChoice: null,
resources: null,
citations: null,
async loadScenarios(belt, stripe) {
try {
if (!this.scenarios) {
const response = await fetch('content/scenarios-all-stripes.json');
this.scenarios = await response.json();
}
return this.scenarios[belt]?.[`stripe_${stripe}`] || [];
} catch (e) {
                console.warn('Could not load scenarios:', e);
return [];
}
},
async loadFunFacts(belt, stripe) {
try {
if (!this.funFacts) {
const response = await fetch('content/fun-facts-all-sections.json');
this.funFacts = await response.json();
}
return this.funFacts[belt]?.[`stripe_${stripe}`] || [];
} catch (e) {
                console.warn('Could not load fun facts:', e);
return [];
}
},
async loadMultipleChoice(belt, stripe) {
try {
if (!this.multipleChoice) {
const response = await fetch('content/multiple-choice-all-stripes.json');
this.multipleChoice = await response.json();
}
return this.multipleChoice[belt]?.[`stripe_${stripe}`] || [];
} catch (e) {
                console.warn('Could not load multiple choice:', e);
return [];
}
},
async loadResources(belt) {
try {
if (!this.resources) {
const response = await fetch('content/resources-by-belt.json');
this.resources = await response.json();
}
return this.resources[belt] || { books: [], podcasts: [], tools: [] };
} catch (e) {
                console.warn('Could not load resources:', e);
return { books: [], podcasts: [], tools: [] };
}
}
};
window.ContentLoader = ContentLoader;
})();