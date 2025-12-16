(function(){
  // Always initialize window.__i18n with English as default, even if no ?lang param is present.
function getQueryParam(name) {
const params = new URLSearchParams(window.location.search);
return params.get(name);
}
function fetchJSON(path){
return fetch(path).then(r=>{
if(!r.ok) throw new Error('Failed to load '+path);
return r.json();
});
}
const requestedLang = getQueryParam('lang');
const lang = requestedLang || 'en';
  // Always load translations and mapping
Promise.all([
fetchJSON('/i18n/lang-map.json').catch(()=>({})),
fetchJSON('/i18n/translations.json').catch(()=>({}))
]).then(([map, translations])=>{
const page = location.pathname.split('/').pop() || 'index.html';
window.__i18n = {
lang: lang,
dict: translations || {},
t: function(key){
try{
const l = this.lang || 'en';
return this.dict[l] && this.dict[l][key] ? this.dict[l][key] : undefined;
}catch(e){ return undefined; }
},
localizePage: function() {
if(!translations || !translations[lang]) return;
const dict = translations[lang];
document.querySelectorAll('[data-i18n]').forEach(el=>{
const key = el.getAttribute('data-i18n');
if(!key) return;
const val = dict[key];
if(val !== undefined){
if(el.placeholder !== undefined && el.tagName.toLowerCase()==='input') el.placeholder = val;
else el.textContent = val;
}
});
}
};
    // If a mapping exists and requestedLang is not 'en', redirect to mapped file
if(requestedLang && requestedLang !== 'en' && map && map[page]){
const target = '/' + map[page];
if(location.pathname.endsWith(map[page])) {
        // Already on target page (maybe user toggled), so apply translations in-place
window.__i18n.localizePage();
} else {
        // redirect to the mapped file, preserve hash
const hash = location.hash || '';
window.location.href = target + hash;
}
return;
}
    // Otherwise, try to apply translations to elements with data-i18n
window.__i18n.localizePage();
}).catch(err=>{
    console.warn('i18n loader error', err);
    // Always set a minimal fallback __i18n
if(!window.__i18n) {
window.__i18n = {
lang: 'en',
dict: {},
t: function(){ return undefined; },
localizePage: function(){}
};
}
});
})();