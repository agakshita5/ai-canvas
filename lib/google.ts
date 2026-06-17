import fs from 'fs';

export default function setupGoogleCredentials() {
  if (process.env.GOOGLE_APPLICATION_CREDENTIALS) return;
  if (!process.env.GOOGLE_CREDENTIALS_JSON) throw new Error('Missing Google credentials');
  
  const credentialsPath = '/tmp/google-credentials.json';
  fs.writeFileSync(credentialsPath, process.env.GOOGLE_CREDENTIALS_JSON);
  process.env.GOOGLE_APPLICATION_CREDENTIALS = credentialsPath;
}