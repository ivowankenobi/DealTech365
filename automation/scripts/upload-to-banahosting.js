#!/usr/bin/env node
/**
 * Upload to Banahosting via FTP
 * Requiere: npm install basic-ftp
 * Uso: node upload-to-banahosting.js
 */

const ftp = require('basic-ftp');
const fs = require('fs');
const path = require('path');

const CONFIG = {
  projectRoot: path.resolve(__dirname, '../..'),
  ftpHost: process.env.FTP_HOST || 'ftp.dealtech365.com',
  ftpUser: process.env.FTP_USER || '',
  ftpPassword: process.env.FTP_PASSWORD || '',
  filesToUpload: [
    { local: 'js/deals-real-v2.js', remote: '/public_html/js/deals-real-v2.js' }
  ]
};

async function uploadFiles() {
  const client = new ftp.Client();
  try {
    console.log('Conectando a Banahosting...');
    await client.access({
      host: CONFIG.ftpHost,
      user: CONFIG.ftpUser,
      password: CONFIG.ftpPassword,
      secure: false
    });

    for (const file of CONFIG.filesToUpload) {
      const localPath = path.join(CONFIG.projectRoot, file.local);
      console.log(`Subiendo: ${file.local}`);
      await client.uploadFrom(localPath, file.remote);
      console.log(`✅ Subido: ${file.local}`);
    }
  } catch (error) {
    console.error(`Error FTP: ${error.message}`);
    throw error;
  } finally {
    client.close();
  }
}

uploadFiles().catch(console.error);
