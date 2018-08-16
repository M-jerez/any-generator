"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fsx = require("fs-extra");
var path = require("path");
function replaceAll(target, search, replacement) {
    return target.replace(new RegExp(search, 'g'), replacement);
}
exports.replaceAll = replaceAll;
function isComplaintName(moduleName, nameConstrain) {
    return !(moduleName.search(nameConstrain) == -1);
}
exports.isComplaintName = isComplaintName;
function getSubDirectoryNames(srcPath) {
    return fsx.readdirSync(srcPath).filter(function (file) {
        return fsx.statSync(path.join(srcPath, file)).isDirectory();
    });
}
exports.getSubDirectoryNames = getSubDirectoryNames;
function dirAsListSync($root, result) {
    var p = path.normalize($root);
    var items = fsx.readdirSync(p);
    items.forEach(function (item) {
        var fileName = path.join(p, item);
        var stats = fsx.statSync(fileName);
        if (stats.isDirectory()) {
            result.push(fileName);
            dirAsListSync(fileName, result);
        }
        else if (stats.isFile()) {
            result.push(fileName);
        }
    });
}
function listDir($root) {
    var $fileList = [];
    dirAsListSync($root, $fileList);
    return $fileList;
}
exports.listDir = listDir;
//# sourceMappingURL=utils.js.map