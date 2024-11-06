import dayjs from 'dayjs';
import fs from 'fs';
import report from 'multiple-cucumber-html-reporter';

const data = fs.readFileSync('cypress/reports/results.json', {
  encoding: 'utf8',
  flag: 'r',
});
const runInfo = JSON.parse(data);

const osName = () => {
  switch (runInfo.osName) {
    case 'darwin':
      return 'osx';
    case 'win32':
      return 'windows';
    case 'ubuntu':
    case 'linux':
      return 'ubuntu';
    default:
      return undefined;
  }
};

const appVersion =
  process.env.VUE_APP_VERSION || 'release: v1.0 (local) - Actual Version';

const [currentDate, currentTime] = new Date().toISOString().split('T');

report.generate({
  jsonDir: 'cypress/reports/json',
  reportPath: 'cypress/reports/html',
  metadata: {
    browser: {
      name: runInfo.browserName,
      version: runInfo.browserVersion,
    },
    device: 'Local Test Machine',
    platform: {
      name: osName(),
      version: runInfo.osVersion,
    },
  },
  customData: {
    title: 'Run Info',
    data: [
      { label: 'Project', value: 'Root Config' },
      { label: 'Release', value: appVersion },
      { label: 'Cypress Version', value: runInfo.cypressVersion },
      { label: 'Node Version', value: runInfo.nodeVersion },
      {
        label: 'Execution Start Time',
        value: dayjs(runInfo.startedTestsAt).format('YYYY-MM-DD HH:mm:ss.SSS'),
      },
      {
        label: 'Execution End Time',
        value: dayjs(runInfo.endedTestsAt).format('YYYY-MM-DD HH:mm:ss.SSS'),
      },
    ],
  },
  disableLog: true,
  pageTitle: 'Integration Test Report',
  reportName: `Integration Test Report - ${currentDate} ${currentTime}`,
  openReportInBrowser: true,
  displayDuration: true,
  displayReportTime: true,
});
