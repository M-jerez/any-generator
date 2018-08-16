"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util = require("../lib/utils");
var chai_1 = require("chai");
var fsx = require("fs-extra");
var path = require("path");
describe('util', function () {
    describe('replaceAll matches in  multiline string', function () {
        it('Should replace all matches of "__name__" in the View File', function () {
            var refFileV = fsx.readFileSync("tools/reference/refItem/refItemView.ts", "utf8");
            var srcFileV = fsx.readFileSync("tools/blueprints/single-dir/__name__/__name__View.ts", "utf8");
            var replacedV = util.replaceAll(srcFileV, "__name__", "refItem");
            chai_1.expect(replacedV).to.be.equal(refFileV);
        });
        it('Should replace all matches of "__name__" in the Model File', function () {
            var refFileM = fsx.readFileSync("tools/reference/refItem/refItemModel.ts", "utf8");
            var srcFileM = fsx.readFileSync("tools/blueprints/single-dir/__name__/__name__Model.ts", "utf8");
            var replacedM = util.replaceAll(srcFileM, "__name__", "refItem");
            chai_1.expect(replacedM).to.be.equal(refFileM);
        });
        it('Should replace all matches of "__name__" in the Controller File', function () {
            var refFileC = fsx.readFileSync("tools/reference/refItem/refItemController.ts", "utf8");
            var srcFileC = fsx.readFileSync("tools/blueprints/single-dir/__name__/__name__Controller.ts", "utf8");
            var replacedC = util.replaceAll(srcFileC, "__name__", "refItem");
            chai_1.expect(replacedC).to.be.equal(refFileC);
        });
    });
    describe('getSubDirectoryNames', function () {
        it('Should thrown an error when the directory does not exist... no such file or directory', function () {
            chai_1.expect(function () {
                util.getSubDirectoryNames("./tools/false/dir");
            }).to.throw(/no such file or directory/);
        });
        it('Should return an array with a list of the first level subdirectories (non recursive)' +
            'ie: module09, Test, user_admin, userAdmin', function () {
            chai_1.expect(util.getSubDirectoryNames("./tools/blueprints")).to.be.eql(["multiple-dir", "single-dir"]);
            chai_1.expect(util.getSubDirectoryNames("./tools/empty")).to.be.eql([]);
        });
    });
    describe('getDirAsListSync', function () {
        it('Should return an array with all directories and subdirectories within tools/reference', function () {
            var root = path.resolve("./tools/reference");
            var shouldGenerate = [
                path.join(root, "readme.md"),
                path.join(root, "refItem"),
                path.join(root, "refItem/refItemController.ts"),
                path.join(root, "refItem/refItemModel.ts"),
                path.join(root, "refItem/refItemView.ts"),
            ];
            var generatedFiles = util.listDir(root);
            chai_1.expect(generatedFiles).to.be.eql(shouldGenerate);
        });
    });
});
//# sourceMappingURL=utils.spec.js.map