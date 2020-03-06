import { readFilePlease } from '../scripts/readsfile.js/index.js';
// import { mdLinks } from '../index.js';
// import mockLinks from './mock.js';
import {validateLinks} from '../scripts/validate.js/index.js';


describe('validateLinks', () => {
  it('debería ser una función', () => {
    expect(typeof validateLinks).toBe('function');
  });
});


describe('readFilePlease', () => {
  it('should be a function', () => {
    expect(typeof readFilePlease).toBe('function');
  });
});

describe('.md file', () => {
  it('should be a string', () => {
    return readFilePlease('/home/laboratoria-175/proyectos/GDL004-md-links/README.md').then(data => {
      expect(typeof data).toBe('string');
    });
  });
});
describe('error', () => {
  it('should happen with reject', () => {
    return expect(readFilePlease()).rejects.toBe('error');
  });
});
describe('content', () => {
  it('should happen with resolve', () => {
    return readFilePlease('/home/laboratoria-175/proyectos/GDL004-md-links/README.md').then(content => {
      expect(content);
    });
  });
});

/* test('the fetch fails with an error', () => {
  return expect(fetchData()).rejects.toMatch('error');
}); */
/* test('the data is peanut butter', () => {
  return expect(fetchData()).resolves.toBe('peanut butter');
}); */