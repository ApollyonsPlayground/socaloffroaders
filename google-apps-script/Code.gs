// Google Apps Script - Trail Submission Handler
// 1. Create new Google Sheet
// 2. Extensions > Apps Script
// 3. Paste this code
// 4. Deploy as Web App (Execute as: Me, Access: Anyone)
// 5. Copy web app URL and update submit-trail.html

function doPost(e) {
  try {
    // Get the active spreadsheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parse form data
    const data = e.parameter;
    
    // Add timestamp
    const timestamp = new Date();
    
    // Append row to sheet
    sheet.appendRow([
      timestamp,
      data.trailName,
      data.location,
      data.county,
      data.difficulty,
      data.type,
      data.distance,
      data.duration,
      data.coordinates,
      data.description,
      data.camping,
      data.submitterName,
      data.submitterEmail,
      'Pending Review' // Status
    ]);
    
    // Send email notification to AgentMail
    sendAgentMailNotification(data, timestamp);
    
    // Return success
    return ContentService.createTextOutput(JSON.stringify({
      result: 'success',
      message: 'Trail submitted successfully'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Log error
    console.error('Error:', error);
    
    return ContentService.createTextOutput(JSON.stringify({
      result: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function sendAgentMailNotification(data, timestamp) {
  const subject = `[NEW TRAIL SUBMISSION] ${data.trailName}`;
  
  const body = `
New Trail Submission Received

📍 TRAIL DETAILS:
━━━━━━━━━━━━━━━━━━━━━━━
Name: ${data.trailName}
Location: ${data.location}, ${data.county} County
Difficulty: ${data.difficulty}
Type: ${data.type}
Distance: ${data.distance || 'Not specified'}
Duration: ${data.duration || 'Not specified'}
Coordinates: ${data.coordinates || 'Not provided'}

📝 DESCRIPTION:
${data.description}

🏕️ CAMPING INFO:
${data.camping || 'Not provided'}

👤 SUBMITTED BY:
Name: ${data.submitterName}
Email: ${data.submitterEmail}
Date: ${timestamp.toLocaleString()}

━━━━━━━━━━━━━━━━━━━━━━━

To approve this trail:
1. Review the details above
2. Add it to trails-data.js
3. Push to GitHub

View all submissions: https://docs.google.com/spreadsheets/d/[YOUR_SHEET_ID]/edit
`;

  // Send email to AgentMail
  MailApp.sendEmail({
    to: 'caelumheyron@agentmail.to',
    subject: subject,
    body: body,
    name: 'SoCal Off-Roaders Website'
  });
}

// Setup function - run once to create sheet headers
function setupSheet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  // Set headers
  sheet.getRange(1, 1, 1, 15).setValues([[
    'Timestamp',
    'Trail Name',
    'Location',
    'County',
    'Difficulty',
    'Type',
    'Distance',
    'Duration',
    'Coordinates',
    'Description',
    'Camping Info',
    'Submitter Name',
    'Submitter Email',
    'Status'
  ]]);
  
  // Format header row
  sheet.getRange(1, 1, 1, 15)
    .setFontWeight('bold')
    .setBackground('#4285f4')
    .setFontColor('white');
  
  // Auto-resize columns
  sheet.autoResizeColumns(1, 15);
  
  Logger.log('Sheet setup complete!');
}
