'use strict';

var path = require('path');
var fse = require('fs-extra');

/**
 * 获取模块文件的执行结果，并将结果保存在相应的路径下
 *
 * @param {String} savePath 保存路径
 * @param {String} modulePath 模块文件的路径
 * @return {Promise}
 */
function saveModule(savePath, modulePath) {
  return new Promise(function (resolve, reject) {
    getModuleResult(modulePath).then(function (saveData) {
      saveJSON(savePath, saveData).then(function (data) {
        resolve(data);
      }).catch(function (err) {
        reject(err);
      });
    }).catch(function (err) {
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
  return new Promise(function (resolve, reject) {
    fse.outputJson(path.resolve(savePath), data).then(function () {
      resolve(data);
    }).catch(function (err) {
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
function getModuleResult(filePath) {
  for (var _len = arguments.length, props = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    props[_key - 1] = arguments[_key];
  }

  return getTargetResult.apply(undefined, [requireModule(filePath)].concat(props));
}

/**
 * 获得模块内容之后，计算出最终返回值
 * 如果 `saveTarget` 是一个函数，则 `...props` 将作为该函数的参数传递进去
 *
 * @param {*} saveTarget 有可能是函数、对象或者普通字符串
 * @return {Promise}
 */
function getTargetResult(saveTarget) {
  for (var _len2 = arguments.length, props = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    props[_key2 - 1] = arguments[_key2];
  }

  return new Promise(function (resolve, reject) {
    if (typeof saveTarget === 'function') {
      // 如果传入的是方法，则执行方法
      var saveObj = saveTarget.apply(undefined, props);

      if (isPromiseObj(saveObj)) {
        // 获得了方法执行的结果之后，判断返回的为 Promise 的话则获取最终结果值
        saveObj.then(function (data) {
          resolve(data);
        }).catch(function (err) {
          reject(err);
        });
      } else {
        // 如果方法返回的是普通对象，则直接返回
        resolve(saveObj);
      }
    } else if (isPromiseObj(saveTarget)) {
      // 如果传入的为 Promise 的话则获取最终结果值
      saveTarget.then(function (data) {
        resolve(data);
      }).catch(function (err) {
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
  var result = require(path.resolve(filePath));

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
  return obj && typeof obj.then === 'function';
}

module.exports = {
  saveModule: saveModule,
  saveJSON: saveJSON,
  getModuleResult: getModuleResult,
  getTargetResult: getTargetResult
};