/**
* SIMPLE ANALYTICS SNIPPET
* Add this to each game HTML file before </head>
*
* Tracks:
* - Game starts
* - Game completions
* - Mode selection (Pass & Play vs Multi-Device)
* - Drop-off points
*/
// Option 1: Google Analytics (Free, Easy)
// Replace YOUR_GA_ID with your actual GA4 measurement ID
const GA_TRACKING_ID = 'G-XXXXXXXXXX'; // Get from analytics.google.com
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', GA_TRACKING_ID);
// Track events in your React components:
function trackGameEvent(action, label = '') {
gtag('event', action, {
'event_category': 'Game',
'event_label': label,
'game_name': document.title // Auto-detects which game
});
}
// Usage examples (add to your existing game code):
// When game starts:
// trackGameEvent('game_started', 'Pass & Play');  // or 'Multi-Device'
// When mode selected:
// trackGameEvent('mode_selected', 'Multi-Device');
// When round completed:
// trackGameEvent('round_completed', `Round ${roundNumber}`);
// When game finished:
// trackGameEvent('game_completed', `Winner: ${winnerName}`);
// When player joins room:
// trackGameEvent('room_joined', roomCode);
// When error occurs:
// trackGameEvent('error', errorMessage);
// -------------------------------------------------------------------
// Option 2: PostHog (Better for product analytics)
// Free tier: 1M events/month
// Sign up at posthog.com
!function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures getActiveMatchingSurveys getSurveys".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
posthog.init('YOUR_PROJECT_API_KEY',{api_host:'https://app.posthog.com'})
// Track with PostHog (richer data):
function trackGameEventPH(action, properties = {}) {
posthog.capture(action, {
...properties,
game_name: document.title,
timestamp: new Date().toISOString()
});
}
// Usage:
// trackGameEventPH('game_started', { mode: 'Multi-Device', players: 4 });
// trackGameEventPH('round_completed', { round: 3, duration_seconds: 45 });
// -------------------------------------------------------------------
// Option 3: SIMPLEST - Just log to your own endpoint
async function trackToServer(event, data) {
try {
await fetch('https://your-domain.com/api/track', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({
event,
data,
game: document.title,
timestamp: Date.now(),
url: window.location.href
})
});
} catch (e) {
        // Fail silently - don't break game if tracking fails
        console.warn('Tracking failed:', e);
}
}
// -------------------------------------------------------------------
// WHAT TO TRACK (Priority Order)
// 🎯 CRITICAL (Must have):
// - Game started (which game, which mode)
// - Game completed (winner, scores, duration)
// - Drop-off point (which screen/phase player left)
// 📊 IMPORTANT (Should have):
// - Mode selected (Pass & Play vs Multi-Device)
// - Number of players
// - Room creation vs room joining
// - Round progression (how far they got)
// 🎁 NICE TO HAVE (Can add later):
// - Specific card choices
// - Voting patterns
// - Timer expirations
// - Challenge usage
// - Social shares
// - Email captures
// -------------------------------------------------------------------
// INTEGRATION STEPS:
/**
* 1. Choose analytics platform (Google Analytics easiest to start)
*
* 2. Add tracking script to each game's <head>:
* - confession-poker-v2.html
* - conflict-cards.html
* - take-the-back.html
* - disagree-commit-roulette.html
*
* 3. Add event tracking calls in React components:
*
* // When game starts (in your main Game component):
* useEffect(() => {
* trackGameEvent('game_started', multiDevice ? 'Multi-Device' : 'Pass & Play');
* }, []);
*
* // When game ends:
* if (gameState === 'finished') {
* trackGameEvent('game_completed', `Winner: ${winner}`);
* }
*
* 4. Deploy and verify events appear in analytics dashboard
*
* 5. Wait 7 days, review data, decide next enhancements
*/
// -------------------------------------------------------------------
// DASHBOARD METRICS TO WATCH:
/**
* Week 1 Questions:
* - Which game do people play most?
* - Pass & Play vs Multi-Device ratio?
* - Where do players drop off?
* - Average game duration?
* - Completion rate (started vs finished)?
*
* Week 2 Decisions:
* - If high drop-off: Fix UX issues
* - If low completion: Simplify rules
* - If one game dominates: Double down on it
* - If multi-device low: Improve room joining UX
* - If completion high: Add social sharing
*/