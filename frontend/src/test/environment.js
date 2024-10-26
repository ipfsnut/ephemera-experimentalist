import { TextEncoder, TextDecoder } from 'util';
import { JSDOM } from 'jsdom';

const dom = new JSDOM('<!doctype html><html><body></body></html>', {
  url: 'http://localhost',
  pretendToBeVisual: true,
  resources: 'usable'
});

global.window = dom.window;
global.document = dom.window.document;
global.navigator = dom.window.navigator;

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

global.requestAnimationFrame = callback => setTimeout(callback, 0);
global.cancelAnimationFrame = id => clearTimeout(id);

Object.defineProperty(window, 'performance', {
  value: {
    now: () => Date.now(),
    mark: jest.fn(),
    measure: jest.fn()
  }
});
