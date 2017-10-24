const path = require('path');
const fse = require('fs-extra');

/**
 * 获取模块文件的执行结果，并将结果保存在相应的路径下
 *
 * @param {String} savePath 保存路径
 * @param {String} modulePath 模块文件的路径
 * @return {Promise}
 */
function saveModule(savePath, modulePath) {
  return new Promise((resolve, reject) => {
    getModuleResult(modulePath)
      .then((saveData) => {
        saveJSON(savePath, saveData)
          .then((data) => {
            resolve(data);
          })
          .catch((err) => {
            reject(err);
          });
      })
      .catch((err) => {
        reject(err);
      });
  });
}

/**
 * 将 JSON 格式的对象保存为json文件。
 *
 * @param {String} savePath 保存路径
 * @param {Object} data 对象，plain object
 * @return {Promise}
 */
function saveJSON(savePath, data) {
  return new Promise((resolve, reject) => {
    fse.outputJson(path.resolve(savePath), data)
      .then(() => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

/**
 * 通过模块的路径，获取模块的执行结果
 * 如果 `filePath` 对应的模块返回一个函数，则 `...props` 将作为该函数的参数传递进去
 *
 * @param {String} filePath 文件路径
 * @return {Promise}
 */
function getModuleResult(filePath, ...props) {
  return new Promise((resolve, reject) => {
    /**
     * require mocker modules 之后的对象
     * @type {Object | Function | Promise}
     */
    let saveTarget = requireModule(filePath);

    if (typeof saveTarget === 'function') {
      // 如果传入的是方法，则执行方法
      let saveObj = saveTarget(...props);

      if (isPromiseObj(saveObj)) {
        // 获得了方法执行的结果之后，判断返回的为 Promise 的话则获取最终结果值
        saveObj
          .then((data) => {
            resolve(data);
          })
          .catch((err) => {
            reject(err);
          });
      } else {
        // 如果方法返回的是普通对象，则直接返回
        resolve(saveObj);
      }
    } else if (isPromiseObj(saveTarget)) {
      // 如果传入的为 Promise 的话则获取最终结果值
      saveTarget
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    } else {
      // 如果传入的是普通对象，则直接返回
      resolve(saveTarget);
    }
  });
}

/**
 * require mocker module 文件，并将结果返回
 *
 * @param {String} filePath 文件路径
 * @return {Object}
 */
function requireModule(filePath) {
  let result = require(path.resolve(filePath));

  // 如果是es6写法 export default xxx，则编译之后的值会存储在result.default中
  // 因此在这种情况下实际返回的时候，只需要返回 result.default 即可
  if (typeof result.default !== 'undefined') {
    result = result.default;
  }

  return result;
}

/**
 * 判断是否为 Promise 对象值，这种判断方式大部分情况下是没问题的
 *
 * @param {Object} obj 对象
 * @return {Boolean}
 */
function isPromiseObj(obj) {
  return obj && (typeof obj.then === 'function');
}

module.exports = {
  saveModule: saveModule,
  saveJSON: saveJSON,
  getModuleResult: getModuleResult
};