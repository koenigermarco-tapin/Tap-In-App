// Netlify Function to collect anonymous assessment results
// No PII collected - only aggregate statistics
// For production: Use Fauna DB or similar
// For now: Simple in-memory storage (resets on deploy)
let resultsCache = {
workerType: { sprinter: 0, jogger: 0, ultrarunner: 0 },
leadershipStyle: { visionary: 0, architect: 0, facilitator: 0, executor: 0 },
teamScores: { trust: [], conflict: [], commitment: [], accountability: [], results: [] },
totalSubmissions: 0,
lastUpdated: new Date().toISOString()
};
exports.handler = async (event, context) => {
  // CORS headers
const headers = {
'Access-Control-Allow-Origin': '*',
'Access-Control-Allow-Headers': 'Content-Type',
'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
'Content-Type': 'application/json'
};
  // Handle OPTIONS request for CORS
if (event.httpMethod === 'OPTIONS') {
return { statusCode: 200, headers, body: '' };
}
  // GET: Return aggregate statistics
if (event.httpMethod === 'GET') {
const stats = {
workerType: resultsCache.workerType,
leadershipStyle: resultsCache.leadershipStyle,
teamScores: {
trust: calculateAverage(resultsCache.teamScores.trust),
conflict: calculateAverage(resultsCache.teamScores.conflict),
commitment: calculateAverage(resultsCache.teamScores.commitment),
accountability: calculateAverage(resultsCache.teamScores.accountability),
results: calculateAverage(resultsCache.teamScores.results),
},
totalSubmissions: resultsCache.totalSubmissions,
lastUpdated: resultsCache.lastUpdated
};
return {
statusCode: 200,
headers,
body: JSON.stringify(stats)
};
}
  // POST: Submit new results
if (event.httpMethod === 'POST') {
try {
const data = JSON.parse(event.body);
      // Validate data
if (!data.workerType || !data.leadershipStyle || !data.teamScores) {
return {
statusCode: 400,
headers,
body: JSON.stringify({ error: 'Invalid data format' })
};
}
      // Update counts
resultsCache.workerType[data.workerType]++;
resultsCache.leadershipStyle[data.leadershipStyle]++;
      // Store team scores for averaging
Object.keys(data.teamScores).forEach(key => {
if (resultsCache.teamScores[key]) {
resultsCache.teamScores[key].push(data.teamScores[key]);
          // Keep only last 1000 entries to prevent memory issues
if (resultsCache.teamScores[key].length > 1000) {
resultsCache.teamScores[key].shift();
}
}
});
resultsCache.totalSubmissions++;
resultsCache.lastUpdated = new Date().toISOString();
return {
statusCode: 200,
headers,
body: JSON.stringify({
success: true,
message: 'Results recorded',
totalSubmissions: resultsCache.totalSubmissions
})
};
} catch (error) {
return {
statusCode: 500,
headers,
body: JSON.stringify({ error: 'Failed to process results' })
};
}
}
return {
statusCode: 405,
headers,
body: JSON.stringify({ error: 'Method not allowed' })
};
};
function calculateAverage(arr) {
if (!arr || arr.length === 0) return 0;
const sum = arr.reduce((a, b) => a + b, 0);
return Math.round((sum / arr.length) * 10) / 10; // Round to 1 decimal
}