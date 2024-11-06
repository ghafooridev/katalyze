/* eslint-disable import/no-anonymous-default-export */
import type { Config } from 'jest';

process.env = Object.assign(process.env, {
  NEXT_PUBLIC_API_BASE_URL: 'http://localhost:8081',
});

export default (): Config => ({
  testEnvironment: 'jsdom',
  preset: 'ts-jest',
  setupFilesAfterEnv: ['<rootDir>/tests/setup/index.ts'],
  testMatch: ['**/tests/unit/**/*.(spec|test).[jt]s?(x)'],
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': ['ts-jest', { tsconfig: 'tsconfig.test.json' }],
  },
  reporters: [
    'default',
    ['jest-junit', { outputDirectory: './coverage' }],
  ],
  roots: ['tests'],
  collectCoverage: true,
  coverageReporters: ['html', 'lcov'],
  coverageDirectory: '<rootDir>/coverage',
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/node_modules/**',
    '!**/icons/**',
  ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/tests/mocks/file.ts',
    '\\.(css|less|scss)$': 'identity-obj-proxy',
    // '~/(.*)': '<rootDir>/src/',
    '@/(.*)': '<rootDir>/src/$1',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: [
    // node_modules'
  ],
});
