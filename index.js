"use strict";
var path = require('path');
var Config_1 = require('../Config');
var fs = require("fs");
var camelCase = require('camelcase');
var yargs = require('yargs');
var fsx = require('fs-extra');
var argv = yargs.argv;
var newName = argv.n;
var genName = argv.g;
function checkparams() {
    if (!newName) {
        gutil.log("missing parameter ", gutil.colors.red("-n"), ", use:", gutil.colors.cyan("generator -g generatorName -n newName"));
    }
    if (!genName) {
        gutil.log("missing parameter ", gutil.colors.red("-g"), ", use:", gutil.colors.cyan("generator -g generatorName -n newName"));
    }
    else {
        newName = camelCase(newName);
    }
    return (genName && newName);
}
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
var replaceAll = function (target, search, replacement) {
    return target.replace(new RegExp(search, 'g'), replacement);
};
var copyTask = (function () {
    function copyTask() {
        this.name = "generator";
    }
    copyTask.prototype.register = function (gulp) {
        gulp.task(this.name, function (done) {
            if (!checkparams()) {
                done();
                return;
            }
            var generator = Config_1.GENERATORS[genName];
            if (generator) {
                var pattern = generator.pattern;
                var src_dir = path.join(generator.src_dir, generator.pattern);
                var dest_dir = path.join(generator.dest_dir, newName);
                if (checkExist(dest_dir)) {
                    gutil.log(gutil.colors.red("Dest directory " + dest_dir + " is not empty."));
                    done();
                    return;
                }
                fsx.ensureDirSync(dest_dir);
                fsx.walk(src_dir)
                    .on('data', function (item) {
                    if (!item.stats.isDirectory()) {
                        var basen = path.basename(item.path);
                        var newFile = path.join(generator.dest_dir, newName, basen.replace(pattern, newName));
                        var content = fs.readFileSync(item.path, "utf-8");
                        var newContent = replaceAll(content, pattern, newName);
                        fs.writeFileSync(newFile, newContent, "utf-8");
                    }
                })
                    .on('end', function () {
                    gutil.log(gutil.colors.cyan("Component " + newName + " cretaed in: "), dest_dir);
                    done();
                });
            }
            else {
                gutil.log(gutil.colors.red("Cant find the generator '" + genName + "'"));
                done();
            }
        });
    };
    return copyTask;
}());

