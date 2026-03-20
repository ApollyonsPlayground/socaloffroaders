# Google Sheets + AgentMail Integration Setup

This setup allows trail submissions to be:
1. ✅ Stored in Google Sheets
2. ✅ Emailed to AgentMail (caelumheyron@agentmail.to)

## Step-by-Step Setup

### 1. Create Google Sheet
1. Go to https://sheets.new
2. Name it "SoCal Off-Roaders - Trail Submissions"
3. Click "Extensions" → "Apps Script"

### 2. Add Apps Script Code
1. Delete the default `myFunction()` code
2. Paste the entire contents of `google-apps-script/Code.gs`
3. Save (Ctrl+S / Cmd+S)
4. Run `setupSheet()` function once (click dropdown next to ▶️, select setupSheet, click run)
5. Authorize permissions when prompted

### 3. Deploy as Web App
1. Click "Deploy" → "New deployment"
2. Click "Select type" → "Web app"
3. Settings:
   - Description: "Trail Submission Handler"
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Click "Deploy"
5. Copy the **Web App URL** (looks like: `https://script.google.com/macros/s/XXXX/exec`)

### 4. Update Website
1. Open `submit-trail.html`
2. Find this line:
   ```html
   <input type="hidden" id="gasUrl" value="YOUR_GOOGLE_APPS_SCRIPT_URL_HERE">
   ```
3. Replace `YOUR_GOOGLE_APPS_SCRIPT_URL_HERE` with your actual Web App URL

### 5. Test It
1. Open your website locally or deployed
2. Submit a test trail
3. Check your Google Sheet (should have new row)
4. Check AgentMail inbox (should receive email)

## How It Works

```
User submits trail → Google Apps Script → Google Sheets + AgentMail Email
                                      ↓
                               You review & approve
                                      ↓
                         Add to trails-data.js → GitHub
```

## Troubleshooting

**Form not submitting?**
- Check browser console for errors
- Verify Web App URL is correct
- Make sure Web App is deployed (not just saved)

**Not receiving emails?**
- Check spam folder
- Verify MailApp quota hasn't been exceeded (100 emails/day for free accounts)
- Check execution logs in Apps Script (View → Executions)

**Sheet not updating?**
- Run `setupSheet()` function again
- Check Apps Script execution logs
- Make sure sheet isn't protected

## Free Quota Limits (Google Apps Script)
- 100 emails/day
- 20,000 URL fetches/day
- Unlimited sheet operations

For a trail submission site, these limits are plenty!

## Admin Workflow

When you receive an AgentMail notification:
1. Review trail details in the email
2. Click "View all submissions" link in email
3. Review in Google Sheets
4. If approved: Add trail to `js/trails-data.js`
5. Commit and push to GitHub
6. Mark status as "Approved" in Google Sheet
