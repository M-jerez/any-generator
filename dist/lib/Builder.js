"use strict";
var fsx = require('fs-extra');
var path = require("path");
var Blueprint_1 = require("./Blueprint");
var utils_1 = require("./utils");
var Builder = (function () {
    function Builder() {
        this.genStore = {};
    }
    Builder.getNameConstrain = function () {
        return Builder.nameConstrain;
    };
    Builder.prototype.addBlueprints = function (rootPath) {
        var _this = this;
        if (!fsx.existsSync(rootPath))
            throw new Error(rootPath + " is not a Directory.");
        var nRootPath = path.normalize(rootPath);
        var blueprints = Builder.findBlueprints(nRootPath);
        blueprints.forEach(function (blueprint) {
            var name = blueprint.name;
            if (typeof _this.genStore[name] != 'undefined')
                throw new Error("Duplicated blueprint " + name + ". The blueprint already exists.");
            else
                _this.genStore[name] = blueprint;
        });
    };
    Builder.prototype.getBlueprintNames = function () {
        return Object.keys(this.genStore);
    };
    Builder.prototype.build = function (blueprintName, moduleName, destPath) {
        if (!utils_1.isComplaintName(moduleName, Builder.nameConstrain)) {
            throw new Error("Invalid argument 'moduleName'. Only characters, numbers and underscore allowed.");
        }
        fsx.ensureDir(destPath, function (err) {
            if (err) {
                throw new Error("Error creating destination directory: " + destPath + " ");
            }
        });
        var blueprint = this.genStore[blueprintName];
        if (typeof blueprint != 'undefined') {
            var src_root_1 = path.resolve(blueprint.path);
            var generatedList_1 = [];
            var src_files = utils_1.listDir(src_root_1);
            var destDirs_1 = [];
            var destFiles_1 = [];
            var destFilesContent_1 = [];
            src_files.forEach(function (filePath) {
                var stats = fsx.statSync(filePath);
                var dest = path.resolve(destPath);
                if (stats.isDirectory()) {
                    var dest_dir = Builder.replacePath(filePath, src_root_1, dest, moduleName);
                    destDirs_1.push(dest_dir);
                    generatedList_1.push(dest_dir);
                }
                else if (stats.isFile()) {
                    var dest_file = Builder.replacePath(filePath, src_root_1, dest, moduleName);
                    var exist = true;
                    try {
                        exist = fsx.statSync(dest_file).isFile();
                    }
                    catch (e) {
                        exist = false;
                    }
                    if (exist) {
                        throw new Error("File : " + dest_file + " already exists, can't Generate new '" + moduleName + "'");
                    }
                    var content = fsx.readFileSync(filePath, "utf-8");
                    var newContent = utils_1.replaceAll(content, Builder.replaceName, moduleName);
                    destFiles_1.push(dest_file);
                    destFilesContent_1.push((newContent));
                    generatedList_1.push(dest_file);
                }
            });
            for (var i = 0; i < destDirs_1.length; i++) {
                var dest_dir = destDirs_1[i];
                fsx.ensureDirSync(dest_dir);
            }
            for (var i = 0; i < destFiles_1.length; i++) {
                var dest_file = destFiles_1[i];
                var newContent = destFilesContent_1[i];
                fsx.writeFileSync(dest_file, newContent, "utf-8");
            }
            return generatedList_1;
        }
        else {
            throw new Error("Blueprint " + blueprintName + " nor Found.");
        }
    };
    Builder.findBlueprints = function (rootPath) {
        var found = [];
        var names = utils_1.getSubDirectoryNames(rootPath);
        if (names.length == 0)
            throw Error("No Blueprint found in " + rootPath);
        names.forEach(function (blueprintName) {
            var name = blueprintName;
            var blueprintPath = path.join(rootPath, blueprintName);
            var blueprint = new Blueprint_1.Blueprint(name, blueprintPath);
            found.push(blueprint);
        });
        return found;
    };
    Builder.replacePath = function (path, src_root, dest_root, moduleName) {
        var destpath = path.replace(src_root, dest_root);
        return utils_1.replaceAll(destpath, Builder.replaceName, moduleName);
    };
    Builder.nameConstrain = /^[a-z0-9_]+$/i;
    Builder.replaceName = "__name__";
    return Builder;
}());
exports.Builder = Builder;
//# sourceMappingURL=Builder.js.map