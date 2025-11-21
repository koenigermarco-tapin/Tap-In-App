/**
 * GOOGLE APPS SCRIPT - Web App for collecting TAP-IN assessment data
 * 
 * SETUP INSTRUCTIONS:
 * 1. Go to https://script.google.com
 * 2. Create a new project: "TAP-IN Assessment Collector"
 * 3. Paste this entire code
 * 4. Create a Google Sheet named "TAP-IN Assessments" 
 * 5. Deploy > New Deployment > Web App
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 6. Copy the Web App URL
 * 7. Replace 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE' in your HTML files
 * 
 * SHEET STRUCTURE:
 * - Sheet 1: "Team Dynamics" 
 * - Sheet 2: "Leadership Style"
 * - Sheet 3: "Worker Type"
 * - Sheet 4: "Mental Health"
 * - Sheet 5: "Work-Life Balance"
 * - Sheet 6: "Summary Dashboard"
 */

// Main entry point for POST requests
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = getOrCreateSheet(data.assessmentType);
    
    // Different handlers for different assessments
    switch(data.assessmentType) {
      case 'team-dynamics':
        saveTeamDynamicsData(sheet, data);
        break;
      case 'leadership-style':
        saveLeadershipData(sheet, data);
        break;
      case 'worker-type':
        saveWorkerTypeData(sheet, data);
        break;
      case 'mental-health':
        saveMentalHealthData(sheet, data);
        break;
      case 'work-life-balance':
        saveWorkLifeData(sheet, data);
        break;
      default:
        saveGenericData(sheet, data);
    }
    
    // Update summary dashboard
    updateSummaryDashboard();
    
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: 'Data saved successfully'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    Logger.log('Error: ' + error.toString());
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Get or create sheet by assessment type
function getOrCreateSheet(assessmentType) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheetName = '';
  
  switch(assessmentType) {
    case 'team-dynamics':
      sheetName = 'Team Dynamics';
      break;
    case 'leadership-style':
      sheetName = 'Leadership Style';
      break;
    case 'worker-type':
      sheetName = 'Worker Type';
      break;
    case 'mental-health':
      sheetName = 'Mental Health';
      break;
    case 'work-life-balance':
      sheetName = 'Work-Life Balance';
      break;
    default:
      sheetName = 'Other Assessments';
  }
  
  let sheet = ss.getSheetByName(sheetName);
  
  // Create sheet if doesn't exist
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    initializeSheetHeaders(sheet, assessmentType);
  }
  
  return sheet;
}

// Initialize headers based on assessment type
function initializeSheetHeaders(sheet, assessmentType) {
  switch(assessmentType) {
    case 'team-dynamics':
      sheet.appendRow([
        'Timestamp', 'Total Score', 'Team Health Level', 
        'Trust', 'Healthy Conflict', 'Commitment', 'Accountability', 'Results Focus',
        'User Agent', 'Language', 'All Answers (JSON)'
      ]);
      break;
    case 'leadership-style':
      sheet.appendRow([
        'Timestamp', 'Leadership Type', 'Primary Score', 'Secondary Score',
        'User Agent', 'Language', 'All Scores (JSON)'
      ]);
      break;
    case 'worker-type':
      sheet.appendRow([
        'Timestamp', 'Worker Type', 'Score', 'Percentage',
        'User Agent', 'Language'
      ]);
      break;
    case 'mental-health':
      sheet.appendRow([
        'Timestamp', 'Total Score', 'Wellness Level',
        'Emotional Wellbeing', 'Physical Vitality', 'Stress Resilience', 'Social Connection', 'Purpose & Meaning',
        'User Agent', 'Language', 'All Answers (JSON)'
      ]);
      break;
    case 'work-life-balance':
      sheet.appendRow([
        'Timestamp', 'Total Score', 'Balance Level',
        'Work Engagement', 'Personal Growth', 'Relationships', 'Health & Energy', 'Purpose & Values',
        'User Agent', 'Language', 'All Answers (JSON)'
      ]);
      break;
  }
  
  // Format header row
  const headerRange = sheet.getRange(1, 1, 1, sheet.getLastColumn());
  headerRange.setFontWeight('bold');
  headerRange.setBackground('#a93226');
  headerRange.setFontColor('#ffffff');
  sheet.setFrozenRows(1);
}

// Save Team Dynamics data
function saveTeamDynamicsData(sheet, data) {
  const categories = data.categories || [];
  const row = [
    data.timestamp,
    data.totalScore || 0,
    data.levelText || '',
    getCategoryScore(categories, 'Trust'),
    getCategoryScore(categories, 'Healthy Conflict'),
    getCategoryScore(categories, 'Commitment'),
    getCategoryScore(categories, 'Accountability'),
    getCategoryScore(categories, 'Results Focus'),
    data.userAgent || '',
    data.language || '',
    JSON.stringify(data.answers || [])
  ];
  
  sheet.appendRow(row);
}

// Save Leadership Style data
function saveLeadershipData(sheet, data) {
  const row = [
    data.timestamp,
    data.primaryType || '',
    data.primaryScore || 0,
    data.secondaryScore || 0,
    data.userAgent || '',
    data.language || '',
    JSON.stringify(data.scores || {})
  ];
  
  sheet.appendRow(row);
}

// Save Worker Type data
function saveWorkerTypeData(sheet, data) {
  const row = [
    data.timestamp,
    data.workerType || '',
    data.score || 0,
    data.percentage || 0,
    data.userAgent || '',
    data.language || ''
  ];
  
  sheet.appendRow(row);
}

// Save Mental Health data
function saveMentalHealthData(sheet, data) {
  const categories = data.categories || [];
  const row = [
    data.timestamp,
    data.totalScore || 0,
    data.levelText || '',
    getCategoryScore(categories, 'Emotional Well-being'),
    getCategoryScore(categories, 'Physical Vitality'),
    getCategoryScore(categories, 'Stress Resilience'),
    getCategoryScore(categories, 'Social Connection'),
    getCategoryScore(categories, 'Purpose & Meaning'),
    data.userAgent || '',
    data.language || '',
    JSON.stringify(data.answers || [])
  ];
  
  sheet.appendRow(row);
}

// Save Work-Life Balance data
function saveWorkLifeData(sheet, data) {
  const categories = data.categories || [];
  const row = [
    data.timestamp,
    data.totalScore || 0,
    data.levelText || '',
    getCategoryScore(categories, 'Work Engagement'),
    getCategoryScore(categories, 'Personal Growth'),
    getCategoryScore(categories, 'Relationships'),
    getCategoryScore(categories, 'Health & Energy'),
    getCategoryScore(categories, 'Purpose & Values'),
    data.userAgent || '',
    data.language || '',
    JSON.stringify(data.answers || [])
  ];
  
  sheet.appendRow(row);
}

// Save generic assessment data
function saveGenericData(sheet, data) {
  const row = [
    data.timestamp,
    data.assessmentType,
    JSON.stringify(data)
  ];
  
  sheet.appendRow(row);
}

// Helper: Get category score
function getCategoryScore(categories, categoryName) {
  const cat = categories.find(c => c.name === categoryName);
  return cat ? cat.score : 0;
}

// Update summary dashboard
function updateSummaryDashboard() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let dashboardSheet = ss.getSheetByName('Summary Dashboard');
  
  if (!dashboardSheet) {
    dashboardSheet = ss.insertSheet('Summary Dashboard', 0);
    dashboardSheet.appendRow(['Metric', 'Value']);
    dashboardSheet.getRange(1, 1, 1, 2).setFontWeight('bold').setBackground('#a93226').setFontColor('#ffffff');
  }
  
  // Calculate total submissions
  const totalSubmissions = calculateTotalSubmissions(ss);
  
  // Update dashboard
  dashboardSheet.getRange(2, 1, 10, 2).clearContent();
  dashboardSheet.getRange(2, 1, 10, 2).setValues([
    ['Total Assessments Completed', totalSubmissions.total],
    ['Team Dynamics Assessments', totalSubmissions.teamDynamics],
    ['Leadership Assessments', totalSubmissions.leadership],
    ['Worker Type Assessments', totalSubmissions.workerType],
    ['Mental Health Assessments', totalSubmissions.mentalHealth],
    ['Work-Life Balance Assessments', totalSubmissions.workLife],
    ['Last Updated', new Date()],
    ['', ''],
    ['Average Team Health Score', calculateAverageScore(ss, 'Team Dynamics', 2)],
    ['Average Mental Wellness Score', calculateAverageScore(ss, 'Mental Health', 2)]
  ]);
}

// Calculate total submissions
function calculateTotalSubmissions(ss) {
  return {
    total: (ss.getSheetByName('Team Dynamics')?.getLastRow() || 1) - 1 +
           (ss.getSheetByName('Leadership Style')?.getLastRow() || 1) - 1 +
           (ss.getSheetByName('Worker Type')?.getLastRow() || 1) - 1 +
           (ss.getSheetByName('Mental Health')?.getLastRow() || 1) - 1 +
           (ss.getSheetByName('Work-Life Balance')?.getLastRow() || 1) - 1,
    teamDynamics: (ss.getSheetByName('Team Dynamics')?.getLastRow() || 1) - 1,
    leadership: (ss.getSheetByName('Leadership Style')?.getLastRow() || 1) - 1,
    workerType: (ss.getSheetByName('Worker Type')?.getLastRow() || 1) - 1,
    mentalHealth: (ss.getSheetByName('Mental Health')?.getLastRow() || 1) - 1,
    workLife: (ss.getSheetByName('Work-Life Balance')?.getLastRow() || 1) - 1
  };
}

// Calculate average score
function calculateAverageScore(ss, sheetName, column) {
  const sheet = ss.getSheetByName(sheetName);
  if (!sheet || sheet.getLastRow() <= 1) return 'N/A';
  
  const scores = sheet.getRange(2, column, sheet.getLastRow() - 1, 1).getValues();
  const sum = scores.reduce((acc, row) => acc + (parseFloat(row[0]) || 0), 0);
  const avg = sum / scores.length;
  
  return Math.round(avg * 10) / 10;
}

// Handle GET requests (for testing)
function doGet(e) {
  return ContentService.createTextOutput(
    'TAP-IN Assessment Data Collector is running. Send POST requests with assessment data.'
  ).setMimeType(ContentService.MimeType.TEXT);
}
