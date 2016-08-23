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
        if (!fsx.statSync(destPath).isDirectory()) {
            throw new Error("Invalid argument 'destPath', " + destPath + " is not a valid directory.");
        }
        var blueprint = this.genStore[blueprintName];
        if (typeof blueprint != 'undefined') {
            var src_root = path.resolve(blueprint.path);
            var generatedList = [];
            var files = utils_1.listDir(src_root);
            files.forEach(function (filePath) {
                var stats = fsx.statSync(filePath);
                var dest = path.resolve(destPath);
                if (stats.isDirectory()) {
                    var dest_dir = Builder.replacePath(filePath, src_root, dest, moduleName);
                    fsx.ensureDirSync(dest_dir);
                    generatedList.push(dest_dir);
                }
                else if (stats.isFile()) {
                    var dest_file = Builder.replacePath(filePath, src_root, dest, moduleName);
                    var content = fsx.readFileSync(filePath, "utf-8");
                    var newContent = utils_1.replaceAll(content, Builder.replaceName, moduleName);
                    fsx.writeFileSync(dest_file, newContent, "utf-8");
                    generatedList.push(dest_file);
                }
            });
            return generatedList;
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