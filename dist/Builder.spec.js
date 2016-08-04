"use strict";
var Builder_1 = require("./Builder");
var fsx = require("fs-extra");
var chai_1 = require("chai");
var path = require("path");
var rimraf = require("rimraf");
describe('Builder', function () {
    var builder = new Builder_1.Builder();
    var validPath = "./test/generators";
    var invalidPath = 'not/existing/path';
    var emptyPath = "./test/empty";
    var tempPath = "./test/temp";
    describe('Wrong Generator Path', function () {
        it('Should thrown an Error when path not exist', function () {
            chai_1.expect(function () {
                builder.addGenerators(invalidPath);
            }).to.throw(/is not a Directory/i);
        });
    });
    describe('Wrong Generator Path', function () {
        it("Should thrown an Error when the generator's root path is empty and no generators are detected.", function () {
            chai_1.expect(function () {
                builder.addGenerators(emptyPath);
            }).to.throw(/No Generator found/i);
        });
    });
    describe('Generator Path test/generators', function () {
        it('Should create two generators [multiple-dir,single-dir]', function () {
            builder.addGenerators(validPath);
            chai_1.expect(builder.getGeneratorNames()).to.eql(["multiple-dir", "single-dir"]);
        });
    });
    describe('Wrong Generator Path', function () {
        it('Should thrown an Error when a trying to add a generator that already exist (same name)', function () {
            chai_1.expect(function () {
                builder.addGenerators(validPath);
            }).to.throw(/Duplicated generator/i);
        });
    });
    describe('Build "multiple-dir" should generate the same files as generators/multiple-dir with new Names', function () {
        it('Should generate the missing directories and a list of files in the test/temp directory.', function (done) {
            rimraf.sync(tempPath);
            fsx.ensureDirSync(tempPath);
            builder.build("multiple-dir", "testModule", tempPath, function (fn) {
                var root = path.resolve(tempPath);
                var shouldGenerate = [
                    path.join(root, "controllers"),
                    path.join(root, "models"),
                    path.join(root, "views"),
                    path.join(root, "controllers/testModuleController.ts"),
                    path.join(root, "models/testModuleModel.ts"),
                    path.join(root, "views/testModuleView.ts"),
                ];
                var generatedFiles = [];
                fsx.walk(tempPath)
                    .on('data', function (item) {
                    generatedFiles.push(item.path);
                })
                    .on("end", function () {
                    chai_1.expect(generatedFiles).to.be.eql(shouldGenerate);
                    done();
                })
                    .on("error", function () {
                    chai_1.expect(generatedFiles).to.be.eql(shouldGenerate);
                    done();
                });
                console.log(shouldGenerate);
            });
        });
    });
    describe('Build "single-dir" success', function () {
        it('Should generate the missing directories and a list of files in the test/temp directory. ' +
            'A new directory must be created with the name of the new module.', function () {
        });
    });
    describe('Module names accept only alphanumeric characters and underscore only', function () {
        it('Invalid moduleNames should thrown an error... only characters, numbers and underscore allowed', function () {
            var inValidNames = [
                "hello world",
                "-78ad",
                "@12323",
                "hello-world",
                "=&*poo",
            ];
            inValidNames.map(function (moduleName) {
                chai_1.expect(function () {
                    builder.build("single-dir", moduleName, tempPath);
                }).to.throw(/only characters, numbers and underscore allowed/i);
            });
        });
        it('Valid moduleNames should NOT thrown an error..  only characters, numbers and underscore allowed', function () {
            var validNames = [
                "helloworld",
                "HelloWorl",
                "2323_2323",
                "Hello_World",
                "Heloop234_8990_"
            ];
            validNames.map(function (moduleName) {
                chai_1.expect(function () {
                    builder.build("single-dir", moduleName, tempPath);
                }).to.not.throw(/only characters, numbers and underscore allowed/i);
            });
        });
    });
});
//# sourceMappingURL=Builder.spec.js.map