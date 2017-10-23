const path = require('path');
const fse = require('fs-extra');
const expect = require('chai').expect;

const hanleIndex = require('../../../src/index').handle;

const ROOT_PROJECT = path.join(__dirname, '../../../');
const ROOT_TEST = path.join(ROOT_PROJECT, './test');

const BASE_PATH_FIXTURES = path.join(ROOT_TEST, './data/fixtures/handle');
const BASE_PATH_EXPECTED = path.join(ROOT_TEST, './data/expected/handle');
const BASE_PATH_TMP = path.join(ROOT_TEST, './tmp/handle');

describe('handle/index.js getResult()', () => {

  it('support json file', () => {
    return hanleIndex.getResult(path.join(BASE_PATH_FIXTURES, 'json-file.json'))
      .then((data) => {
        expect(data).to.deep.equal({name: 'json-file.json', age: 16});
      });
  });

  it('return plain object', () => {
    return hanleIndex.getResult(
      path.join(BASE_PATH_FIXTURES, 'return-plain-object.js'))
      .then((data) => {
        expect(data).to.deep.equal({name: 'return-plain-object', age: 16});
      });
  });

  it('return function of object', () => {
    return hanleIndex.getResult(
      path.join(BASE_PATH_FIXTURES, 'return-function-pure.js'))
      .then((data) => {
        expect(data).to.deep.equal({name: 'return-function-pure', age: 16});
      });
  });

  it('return promise', () => {
    return hanleIndex.getResult(
      path.join(BASE_PATH_FIXTURES, 'return-promise.js'))
      .then((data) => {
        expect(data).to.deep.equal({name: 'return-promise', age: 16});
      });
  });

  it('return function of promise', () => {
    return hanleIndex.getResult(
      path.join(BASE_PATH_FIXTURES, 'return-function-promise.js'))
      .then((data) => {
        expect(data).to.deep.equal({name: 'return-function-promise', age: 16});
      });
  });

});

describe('util/handle.js save() and saveJSON()', () => {

  after(() => {
    fse.removeSync(BASE_PATH_TMP);
  });

  describe('saveJSON()', () => {
    it('save plain object as .json file', () => {
      const TMP_SAVE_FILE = path.join(BASE_PATH_TMP, 'saveJSON-1.json');

      let data = {
        name: 'saveJSON-1',
        age: 1
      };

      return hanleIndex.saveJSON(data, TMP_SAVE_FILE)
        .then(() => {
          const newSavedFile = fse.readJsonSync(TMP_SAVE_FILE);

          expect(newSavedFile).to.deep.equal(data);
        });
    });
  });

  describe('save()', () => {
    it('save plain object as .json file', () => {
      const SRC_FILE = path.join(BASE_PATH_FIXTURES, 'return-plain-object.js');
      const TMP_SAVE_FILE = path.join(BASE_PATH_TMP,
        'return-plain-object.json');
      const EXPECTED_SAVE_FILE = path.join(BASE_PATH_EXPECTED,
        'return-plain-object.json');

      return hanleIndex.save(SRC_FILE, TMP_SAVE_FILE)
        .then(() => {
          const newSavedFile = fse.readFileSync(TMP_SAVE_FILE, 'utf8');
          const expectedFile = fse.readFileSync(EXPECTED_SAVE_FILE, 'utf8');

          expect(newSavedFile).to.equal(expectedFile);
        });
    });

    it('save promise object as .json file', () => {
      const SRC_FILE = path.join(BASE_PATH_FIXTURES, 'return-promise.js');
      const TMP_SAVE_FILE = path.join(BASE_PATH_TMP, 'return-promise.json');
      const EXPECTED_SAVE_FILE = path.join(BASE_PATH_EXPECTED,
        'return-promise.json');

      return hanleIndex.save(SRC_FILE, TMP_SAVE_FILE)
        .then(() => {
          const newSavedFile = fse.readFileSync(TMP_SAVE_FILE, 'utf8');
          const expectedFile = fse.readFileSync(EXPECTED_SAVE_FILE, 'utf8');

          expect(newSavedFile).to.equal(expectedFile);
        });
    });
  });
});
