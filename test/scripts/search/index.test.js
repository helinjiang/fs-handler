const path = require('path');
const expect = require('chai').expect;

const searchIndex = require('../../../src/index').search;

const ROOT_PROJECT = path.join(__dirname, '../../../');
const ROOT_TEST = path.join(ROOT_PROJECT, './test');

const BASE_PATH_FIXTURES = path.join(ROOT_TEST, './data/fixtures/search');

describe('search/index.js getAll()', () => {
  let result;

  before(() => {
    result = searchIndex.getAll(BASE_PATH_FIXTURES);
  });

  it('should be array and have length of 6', () => {
    expect(result).to.be.a('array').and.have.lengthOf(6);
  });

  it('should has 2 directory', () => {
    let checkResult = result.filter(item => item.isDirectory());
    expect(checkResult).to.be.a('array').and.have.lengthOf(2);
  });

});

describe('search/index.js getAllFiles()', () => {
  let result;

  before(() => {
    result = searchIndex.getAllFiles(BASE_PATH_FIXTURES);
  });

  it('should be array and have length of 4', () => {
    expect(result).to.be.a('array').and.have.lengthOf(4);
  });

  it('should has 0 directory', () => {
    let checkResult = result.filter(item => item.isDirectory());
    expect(checkResult).to.be.a('array').that.is.empty;
  });

});