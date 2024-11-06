import {
  addCucumberPreprocessorPlugin,
  afterRunHandler,
} from '@badeball/cypress-cucumber-preprocessor';
// @ts-ignore
import { createEsbuildPlugin } from '@badeball/cypress-cucumber-preprocessor/esbuild';
import createBundler from '@bahmutov/cypress-esbuild-preprocessor';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';
import { defineConfig } from 'cypress';
import addCypressLocalStoragePlugin from 'cypress-localstorage-commands/plugin';
import dotenv from 'dotenv';
import fs from 'fs';

type AfterRunResult =
  | CypressCommandLine.CypressRunResult
  | (CypressCommandLine.CypressFailedRunResult & { [key: string]: string } & {
    config: { resolvedNodeVersion: string };
  });

type PluginBuild = { name: string; setup: () => void };

dotenv.config();

export default defineConfig({
  defaultCommandTimeout: 20000,
  video: true,
  viewportWidth: 1920,
  viewportHeight: 1080,
  e2e: {
    specPattern: 'cypress/integration/**/*.feature',
    baseUrl: 'http://localhost:4173',
    supportFile: 'cypress/support/e2e.ts',
    env: {
      REACT_APP_BASE_URL: 'http://localhost:4173',
      REACT_APP_COGNITO_REGION: process.env.REACT_APP_COGNITO_REGION ?? '',
      REACT_APP_COGNITO_USERPOOL_ID:
        process.env.REACT_APP_COGNITO_USERPOOL_ID ?? '',
      REACT_APP_COGNITO_USERPOOL_WEB_CLIENT_ID:
        process.env.REACT_APP_COGNITO_USERPOOL_WEB_CLIENT_ID ?? '',
      REACT_APP_COGNITO_DOMAIN: process.env.REACT_APP_COGNITO_DOMAIN ?? '',
      REACT_APP_COGNITO_PROVIDER_ID:
        process.env.REACT_APP_COGNITO_PROVIDER_ID ?? '',
      REACT_APP_COGNITO_USERNAME: process.env.REACT_APP_COGNITO_USERNAME ?? '',
      REACT_APP_COGNITO_PASSWORD: process.env.REACT_APP_COGNITO_PASSWORD ?? '',
    },
    retries: {
      runMode: 2,
      openMode: 0,
    },

    async setupNodeEvents(on, config) {
      const customConfig = { ...config, env: { ...process.env } };
      const bundler = createBundler({
        plugins: [
          NodeModulesPolyfillPlugin(),
          NodeGlobalsPolyfillPlugin({
            process: true,
            buffer: true,
          }),
          createEsbuildPlugin(customConfig) as PluginBuild,
        ],
      });

      on('file:preprocessor', bundler);
      await addCucumberPreprocessorPlugin(on, customConfig);
      addCypressLocalStoragePlugin(on, customConfig);

      on('before:browser:launch', (browser, launchOptions) => {
        const customLaunchOptions = { ...launchOptions };
        if (['edge', 'chrome'].includes(browser.name) && browser.isHeadless) {
          customLaunchOptions.args.push('--window-size=1920,1080');
          customLaunchOptions.args.push('--force-device-scale-factor=1');
        }

        if (browser.name === 'electron' && browser.isHeadless) {
          customLaunchOptions.preferences.width = 1920;
          customLaunchOptions.preferences.height = 1080;
        }

        if (browser.name === 'firefox' && browser.isHeadless) {
          customLaunchOptions.args.push('--width=1920');
          customLaunchOptions.args.push('--height=1080');
        }

        return customLaunchOptions;
      });

      on('after:run', async (results) => {
        await afterRunHandler(customConfig);
        const {
          browserName,
          browserVersion,
          osName,
          osVersion,
          config: { resolvedNodeVersion },
          cypressVersion,
          startedTestsAt,
          endedTestsAt,
        } = results as AfterRunResult;

        fs.writeFileSync(
          'cypress/reports/results.json',
          JSON.stringify(
            {
              browserName,
              browserVersion,
              osName,
              osVersion,
              nodeVersion: resolvedNodeVersion,
              cypressVersion,
              startedTestsAt,
              endedTestsAt,
            },
            null,
            '\t'
          )
        );
      });

      return customConfig;
    },
  },
});