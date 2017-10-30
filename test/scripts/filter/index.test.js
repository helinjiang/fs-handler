const path = require('path');
const expect = require('chai').expect;

const filterIndex = require('../../../src/index').filter;

const ROOT_PROJECT = path.join(__dirname, '../../../');
const ROOT_TEST = path.join(ROOT_PROJECT, './test');

const BASE_PATH_FIXTURES = path.join(ROOT_TEST, './data/fixtures/filter');

describe('filter/index.js filterModuleInFolder() for json', () => {
  let resultItem, resultData;

  before((done) => {
    filterIndex.filterModuleInFolder(BASE_PATH_FIXTURES, function (data) {
      return data.route === 'json-file.json';
    }, function (item, data) {
      resultItem = item;
      resultData = data;
      done();
    });
  });

  it('resultItem should exist', () => {
    expect(resultItem).to.be.a('object').and.have.property('relativePath', 'json-file.json');
  });

  it('resultData should exist', () => {
    expect(resultData).to.eql({
      'route': 'json-file.json',
      'version': 1024
    });
  });
});

describe('filter/index.js filterModuleInFolder() for plain-object', () => {
  let resultItem, resultData;

  before((done) => {
    filterIndex.filterModuleInFolder(BASE_PATH_FIXTURES, function (data) {
      return data.route === 'return-plain-object.js';
    }, function (item, data) {
      resultItem = item;
      resultData = data;
      done();
    });
  });

  it('resultItem should exist', () => {
    expect(resultItem).to.be.a('object').and.have.property('relativePath', 'return-plain-object.js');
  });

  it('resultData should exist', () => {
    expect(resultData).to.be.a('object').and.have.property('route', 'return-plain-object.js');
  });
});

describe('filter/index.js filterModuleInFolder() for function computed', () => {
  let resultItem, resultData;

  before((done) => {
    filterIndex.filterModuleInFolder(BASE_PATH_FIXTURES, function (data) {
      return (data.route === 'return-function-pure.js' & data.version === 2048);
    }, function (item, data) {
      resultItem = item;
      resultData = data;
      done();
    });
  });

  it('resultItem should exist', () => {
    expect(resultItem).to.be.a('object').and.have.property('relativePath', 'return-function-pure-2.js');
  });

  it('resultData should exist', () => {
    expect(resultData).to.eql({
      route: 'return-function-pure.js',
      version: 2048
    });
  });
});

describe('filter/index.js filterModuleInFolder() for not match', () => {
  let resultItem, resultData;

  before((done) => {
    filterIndex.filterModuleInFolder(BASE_PATH_FIXTURES, function (data) {
      return data.route === 'not-match.js';
    }, function (item, data) {
      resultItem = item;
      resultData = data;
      done();
    });
  });

  it('resultItem should not exist', () => {
    expect(resultItem).to.be.undefined;
  });

  it('resultData should not exist', () => {
    expect(resultData).to.be.undefined;
  });
});