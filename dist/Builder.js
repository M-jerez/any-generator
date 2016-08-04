"use strict";
var fsx = require('fs-extra');
var path = require("path");
var Generator_1 = require("./Generator");
var utils_1 = require("./utils");
var Builder = (function () {
    function Builder() {
        this.genStore = {};
    }
    Builder.getNameConstrain = function () {
        return Builder.nameConstrain;
    };
    Builder.prototype.addGenerators = function (rootPath) {
        var _this = this;
        if (!fsx.existsSync(rootPath))
            throw new Error(rootPath + " is not a Directory.");
        var nRootPath = path.normalize(rootPath);
        var generators = Builder.findGenerators(nRootPath);
        generators.forEach(function (generator) {
            var name = generator.name;
            if (typeof _this.genStore[name] != 'undefined')
                throw new Error("Duplicated generator " + name + ". The generator already exists.");
            else
                _this.genStore[name] = generator;
        });
    };
    Builder.prototype.getGeneratorNames = function () {
        return Object.keys(this.genStore);
    };
    Builder.prototype.build = function (generatorName, moduleName, destPath, cb) {
        if (!utils_1.isComplaintName(moduleName, Builder.nameConstrain)) {
            throw new Error("Invalid argument 'moduleName'. Only characters, numbers and underscore allowed.");
        }
        if (!fsx.statSync(destPath).isDirectory()) {
            throw new Error("Invalid argument 'destPath', " + destPath + " is not a valid directory.");
        }
        var generator = this.genStore[generatorName];
        if (typeof generator != 'undefined') {
            var pattern = Builder.replaceName;
            var src_root = generator.path;
            var generatedList = [];
            fsx.walk(src_root)
                .on('data', function (item) {
                var stats = item.stats;
                if (stats.isDirectory()) {
                    var generatedPath = "";
                    generatedList.push(generatedPath);
                }
                else if (stats.isFile()) {
                    var generatedPath = "";
                    generatedList.push(generatedPath);
                }
            })
                .on('end', function (fn) {
                if (typeof cb != 'undefined')
                    cb(null, generatedList);
            })
                .on('error', function (err) {
                if (typeof cb != 'undefined')
                    cb(err, generatedList);
            });
        }
        else {
            throw new Error("Generator " + generatorName + " nor Found.");
        }
    };
    Builder.findGenerators = function (rootPath) {
        var found = [];
        var names = utils_1.getSubDirectoryNames(rootPath);
        if (names.length == 0)
            throw Error("No Generator found in " + rootPath);
        names.forEach(function (generatorName) {
            var name = generatorName;
            var generatorPath = path.join(rootPath, generatorName);
            var generator = new Generator_1.Generator(name, generatorPath);
            found.push(generator);
        });
        return found;
    };
    Builder.nameConstrain = /^[a-z0-9_]+$/i;
    Builder.replaceName = "__name__";
    return Builder;
}());
exports.Builder = Builder;
//# sourceMappingURL=Builder.js.map