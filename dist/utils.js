"use strict";
var fs = require("fs");
function checkExist(dest_dir) {
    var exist = true;
    try {
        var stats = fs.lstatSync(dest_dir);
    }
    catch (error) {
        exist = false;
    }
    return exist;
}
exports.checkExist = checkExist;
function replaceAll(target, search, replacement) {
    return target.replace(new RegExp(search, 'g'), replacement);
}
exports.replaceAll = replaceAll;
//# sourceMappingURL=utils.js.map