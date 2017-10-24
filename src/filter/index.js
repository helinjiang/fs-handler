const path = require('path');
const fsHandlerSearch = require('../search');
const fsHandlerHandle = require('../handle');

/**
 * 过滤出某个文件夹下的指定模块
 *
 * @param {String} folderPath 文件夹路径
 * @param {Function} filterFunc 过滤函数，接受一个参数data(模块数据)，如果返回 true，则为找到了
 * @param {Function} callback 回调，如果成功，则会返回两个参数：item(文件对象)和data(模块数据)
 */
function filterModuleInFolder(folderPath, filterFunc, callback) {
  // 获取文件夹下所有的文件
  let fileArr = fsHandlerSearch.getAllFiles(folderPath);

  if (!fileArr || !fileArr.length) {
    callback();
    return;
  }

  _filter(fileArr, 0, filterFunc, callback);
}

function _filter(arr, index, filterFunc, callback) {
  if (index > arr.length - 1) {
    callback();
    return;
  }

  const item = arr[index];

  fsHandlerHandle.getModuleResult(path.join(item.basePath, item.relativePath))
    .then((data) => {
      if (filterFunc(data)) {
        callback(item, data);
      } else {
        _filter(arr, index + 1, filterFunc, callback);
      }

    })
    .catch((err) => {
      console.error(err);
      _filter(arr, index + 1, filterFunc, callback);
    });
}

module.exports = {
  filterModuleInFolder: filterModuleInFolder
};