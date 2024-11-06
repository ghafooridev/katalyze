import dotenv from 'dotenv';
import scanner from 'sonarqube-scanner';

dotenv.config();
scanner(
  {
    serverUrl: process.env.SONAR_SERVER_URL,
    token: process.env.SONAR_TOKEN,
  },
  () => process.exit(),
);
