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
function checkGeneratorExists(generatorPath) {
    try {
        var stats = fsx.statSync(generatorPath);
        return stats.isDirectory();
    }
    catch (error) {
        return false;
    }
}
exports.checkGeneratorExists = checkGeneratorExists;
function getSubDirectories(srcPath) {
    return fsx.readdirSync(srcPath).filter(function (file) {
        return fsx.statSync(path.join(srcPath, file)).isDirectory();
    });
}
exports.getSubDirectories = getSubDirectories;
//# sourceMappingURL=utils.js.map