import { TextDecoder as _TextDecoder, TextEncoder as _TextEncoder } from 'util';

import '@testing-library/jest-dom/extend-expect';

const originalWarn = console.warn.bind(console.warn);
const originalError = console.error.bind(console.error);

global.TextEncoder = _TextEncoder as typeof TextEncoder;
global.TextDecoder = _TextDecoder as typeof TextDecoder;

beforeAll(() => {
  console.warn = (msg) => !msg.toString().includes('Error');
  console.error = (msg) => !msg.toString().includes('Warning');
});
afterAll(() => {
  console.warn = originalWarn;
  console.error = originalError;
});
