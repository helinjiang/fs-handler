const path = require('path');
const expect = require('chai').expect;

const utilIndex = require('../../../src/index').util;

const ROOT_PROJECT = path.join(__dirname, '../../../');
const ROOT_TEST = path.join(ROOT_PROJECT, './test');

const BASE_PATH_FIXTURES = path.join(ROOT_TEST, './data/fixtures/util');

describe('util/index.js isDirectory()', () => {

  it('should i-am-directory is directory', () => {
    let result = utilIndex.isDirectory(path.join(BASE_PATH_FIXTURES, 'i-am-directory'));
    expect(result).to.be.true;
  });

  it('should i-am-file is not directory', () => {
    let result = utilIndex.isDirectory(path.join(BASE_PATH_FIXTURES, 'i-am-file.txt'));
    expect(result).to.be.false;
  });

});

describe('util/index.js isFile()', () => {

  it('should i-am-directory is not file', () => {
    let result = utilIndex.isFile(path.join(BASE_PATH_FIXTURES, 'i-am-directory'));
    expect(result).to.be.false;
  });

  it('should i-am-file is file', () => {
    let result = utilIndex.isFile(path.join(BASE_PATH_FIXTURES, 'i-am-file.txt'));
    expect(result).to.be.true;
  });

});
