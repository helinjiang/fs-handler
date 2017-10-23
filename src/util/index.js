const fs = require('fs');

/**
 * 当前路径是否为目录
 * @param {String} paths 路径
 * @return {Boolean}
 */
function isDirectory(paths) {
  return fs.lstatSync(paths).isDirectory();
}

/**
 * 当前路径是否为文件
 * @param {String} paths 路径
 * @return {Boolean}
 */
function isFile(paths) {
  return fs.lstatSync(paths).isFile();
}

module.exports = {
  isDirectory: isDirectory,
  isFile: isFile
};