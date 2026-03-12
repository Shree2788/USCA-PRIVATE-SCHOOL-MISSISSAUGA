# Google Sheets Integration Setup

To send form submissions directly to your Google Sheet (`https://docs.google.com/spreadsheets/d/1MFwGZpOfD_ZZr1uqXxSw5BgCGozYmjVgS0kKM-3chVU`), you need to set up a Google Apps Script Web App.

## Step 1: Add Headers to Your Sheet
Open your Google Sheet and ensure the first row has the following exact headers (case-sensitive):
- name
- email
- phone
- program
- date
- time
- utm_source
- utm_medium
- utm_campaign
- utm_content
- utm_term
- placement
- utm_adgroup
- matchtype
- utm_device

## Step 2: Create the Apps Script
1. In your Google Sheet, click on **Extensions > Apps Script**.
2. Delete any code in the editor and paste the following:

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  try {
    var data = JSON.parse(e.postData.contents);
    
    // Get headers from the first row
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    
    // Map data to the correct columns
    var rowData = headers.map(function(header) {
      return data[header] || "";
    });
    
    sheet.appendRow(rowData);
    
    return ContentService.createTextOutput(JSON.stringify({"status": "success"}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({"status": "error", "message": error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

## Step 3: Deploy the Web App
1. Click **Deploy > New deployment** in the top right.
2. Click the gear icon next to "Select type" and choose **Web app**.
3. Set the following:
   - **Description**: Form Submissions
   - **Execute as**: Me
   - **Who has access**: Anyone
4. Click **Deploy**. (You may need to authorize the app).
5. Copy the **Web app URL**.

## Step 4: Add the URL to Your App
In AI Studio, go to the **Settings** menu, find **Environment Variables**, and add a new variable:
- **Key**: `VITE_GOOGLE_SHEETS_WEBHOOK`
- **Value**: *(Paste the Web app URL you copied)*
