require('dotenv').config();
const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');

const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

oauth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

const drive = google.drive({ version: 'v3', auth: oauth2Client });

async function uploadFile(filePath, portfolioName) {
  try {
    const response = await drive.files.create({
      requestBody: {
        name: portfolioName + '_' + path.basename(filePath),
        parents: ['1ukhq1cXLCyA9XbL1x9bRMOSpUIj13HQF'], // Optional: specify a folder ID
      },
      media: {
        mimeType: 'application/octet-stream',
        body: fs.createReadStream(filePath),
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

async function listFiles() {
  try {
    const response = await drive.files.list({
      pageSize: 10,
      fields: 'files(id, name, webViewLink)',
    });
    return response.data.files;
  } catch (error) {
    throw error;
  }
}

module.exports = { uploadFile, listFiles };
