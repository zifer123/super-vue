/* 控制台颜色区分
 * chalk.<style>[.<style>][.<color>]
 * styles: reset bold dim italic (Not widely supported) underline inverse hidden strikethrough (Not widely supported) visible
 * colors: black red green yellow blue magenta cyan white gray redBright greenBright yellowBright
  * */
const path = require('path');
const fs = require('fs');

// 封装path.resolve，更方便的使用
const resolve = (...filePath) => path.resolve(__dirname, ...filePath);

const generateFile = (path, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, 'utf-8', err => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

exports.resolve = resolve;
exports.generateFile = generateFile;
exports.hasDir = (path) => fs.existsSync(path);
exports.mkdir = (path) => new Promise((resolve, reject) => {
  fs.mkdir(path, (err) => {
    if (!err) {
      resolve();
    } else {
      reject(err);
    }
  })
});
