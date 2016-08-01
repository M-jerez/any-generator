"use strict";
var path_1 = require('path');
var fsx = require('fs-extra');
var path = require("path");
var Generator_1 = require("./Generator");
var utils_1 = require("./utils");
var Compiler = (function () {
    function Compiler() {
        this.genStore = {};
    }
    Compiler.prototype.addGenerators = function (rootPath) {
        var _this = this;
        if (!fsx.existsSync(rootPath))
            throw new Error(rootPath + " is not a Directory.");
        var nRootPath = path.normalize(rootPath);
        var generators = Compiler.findGenerators(nRootPath);
        generators.forEach(function (generator) {
            var name = generator.name;
            if (typeof _this.genStore[name] != 'undefined')
                throw new Error("Duplicated generator " + name + ". The generator already exists.");
            else
                _this.genStore[name] = generator;
        });
    };
    Compiler.prototype.getGeneratorNames = function () {
        return Object.keys(this.genStore);
    };
    Compiler.prototype.build = function (generatorName, moduleName, destPath) {
        if (!utils_1.isComplaintName(moduleName, Compiler.nameConstrain)) {
            throw new Error("Invalid argument 'moduleName'. Only characters, numbers and underscore allowed.");
        }
        var generator = this.genStore[moduleName];
        if (typeof generator != 'undefined') {
            var pattern = Compiler.replaceName;
            var src_dir = path_1.join(generator.path, pattern);
            var dest_dir = path_1.join(destPath, moduleName);
            fsx.walk(src_dir)
                .on('data', function (item) {
                var stats = item.stats;
                if (stats.isDirectory()) {
                    fsx.ensureDirSync(dest_dir);
                }
                else if (stats.isFile()) {
                    var basen = path_1.basename(item.path);
                    var newFile = path_1.join(destPath, moduleName, basen.replace(pattern, moduleName));
                    var content = fsx.readFileSync(item.path, "utf-8");
                    var newContent = utils_1.replaceAll(content, pattern, moduleName);
                    fsx.writeFileSync(newFile, newContent, "utf-8");
                }
            })
                .on('end', function () {
            });
        }
        else {
            throw new Error("Generator " + generatorName + " nor Found.");
        }
    };
    Compiler.findGenerators = function (rootPath) {
        var found = [];
        var subdirs = utils_1.getSubDirectories(rootPath);
        if (subdirs.length == 0)
            throw Error("No Generator found in " + rootPath);
        subdirs.forEach(function (generatorPath) {
            var name = path.basename(generatorPath);
            var generator = new Generator_1.Generator(name, generatorPath);
            found.push(generator);
        });
        return found;
    };
    Compiler.nameConstrain = /^[a-z0-9_]+$/i;
    Compiler.replaceName = "__name__";
    return Compiler;
}());
exports.Compiler = Compiler;
//# sourceMappingURL=Compiler.js.map