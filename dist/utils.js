"use strict";
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
//# sourceMappingURL=utils.js.map