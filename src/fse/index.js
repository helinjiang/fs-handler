const fse = require('fs-extra');
const Promise = require('bluebird');

module.exports = Promise.promisifyAll(fse);
