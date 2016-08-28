"use strict";
var Builder_1 = require("../lib/Builder");
var fsx = require("fs-extra");
var chai_1 = require("chai");
var path = require("path");
var rimraf = require("rimraf");
var utils = require("../lib/utils");
describe('Builder', function () {
    var builder = new Builder_1.Builder();
    var validPath = "./tools/blueprints";
    var invalidPath = 'not/existing/path';
    var emptyPath = "./tools/empty";
    var tempPath = "./tools/temp";
    describe('Wrong BlueprintBlueprint Path', function () {
        it('Should thrown an Error when path not exist', function () {
            chai_1.expect(function () {
                builder.addBlueprints(invalidPath);
            }).to.throw(/is not a Directory/i);
        });
    });
    describe('Wrong BlueprintBlueprint Path', function () {
        it("Should thrown an Error when the blueprint's root path is empty and no blueprints are detected.", function () {
            chai_1.expect(function () {
                builder.addBlueprints(emptyPath);
            }).to.throw(/No Blueprint found/i);
        });
    });
    describe('BlueprintBlueprint Path tools/blueprints', function () {
        it('Should create two blueprints [multiple-dir,single-dir]', function () {
            builder.addBlueprints(validPath);
            chai_1.expect(builder.getBlueprintNames()).to.eql(["multiple-dir", "single-dir"]);
        });
    });
    describe('Wrong BlueprintBlueprint Path', function () {
        it('Should thrown an Error when a trying to add a blueprint that already exist (same name)', function () {
            chai_1.expect(function () {
                builder.addBlueprints(validPath);
            }).to.throw(/Duplicated blueprint/i);
        });
    });
    describe('Module names accept only alphanumeric characters and underscore only.', function () {
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
            rimraf.sync(tempPath);
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
            rimraf.sync(tempPath);
        });
    });
    describe('Build "multiple-dir"', function () {
        it('Should generate the missing directories and a list of files in the tools/temp directory.', function () {
            rimraf.sync(tempPath);
            fsx.ensureDirSync(tempPath);
            var root = path.resolve(tempPath);
            var shouldGenerate = [
                path.join(root, "controllers"),
                path.join(root, "controllers/testModuleController.ts"),
                path.join(root, "models"),
                path.join(root, "models/testModuleModel.ts"),
                path.join(root, "views"),
                path.join(root, "views/testModuleView.ts"),
            ];
            builder.build("multiple-dir", "testModule", tempPath);
            var generatedFiles = utils.listDir(root);
            chai_1.expect(generatedFiles).to.be.eql(shouldGenerate);
            rimraf.sync(tempPath);
        });
    });
    describe('Build "single-dir" success', function () {
        it('Should generate the missing directories and a list of files in the tools/temp directory. ' +
            'A new directory must be created with the name of the new module.', function () {
            rimraf.sync(tempPath);
            fsx.ensureDirSync(tempPath);
            var root = path.resolve(tempPath);
            var shouldGenerate = [
                path.join(root, "refItem"),
                path.join(root, "refItem/refItemController.ts"),
                path.join(root, "refItem/refItemModel.ts"),
                path.join(root, "refItem/refItemView.ts"),
            ];
            builder.build("single-dir", "refItem", tempPath);
            var generatedFiles = utils.listDir(root);
            chai_1.expect(generatedFiles).to.be.eql(shouldGenerate);
            rimraf.sync(tempPath);
        });
    });
    describe('Build fail when new module already exists', function () {
        it('Should throw an exception when a new file exists with the new module name', function () {
            rimraf.sync(tempPath);
            fsx.ensureDirSync(tempPath);
            var root = path.resolve(tempPath);
            builder.build("single-dir", "refItem", tempPath);
            chai_1.expect(function () {
                builder.build("single-dir", "refItem", tempPath);
            }).to.throw(/already exists, can't Generate new/i);
            rimraf.sync(tempPath);
        });
    });
});
//# sourceMappingURL=Builder.spec.js.map