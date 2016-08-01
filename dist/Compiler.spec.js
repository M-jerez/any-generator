"use strict";
var Compiler_1 = require("./Compiler");
var chai_1 = require("chai");
describe('Compiler', function () {
    var compiler = new Compiler_1.Compiler();
    var validPath = "./test/generators";
    var invalidPath = 'not/existing/path';
    var emptyPath = "./test/empty";
    describe('Wrong Generator Path', function () {
        it('Should thrown an Error when path not exist', function () {
            chai_1.expect(function () {
                compiler.addGenerators(invalidPath);
            }).to.throw(/is not a Directory/i);
        });
    });
    describe('Wrong Generator Path', function () {
        it("Should thrown an Error when the generator's root path is empty and no generators are detected.", function () {
            chai_1.expect(function () {
                compiler.addGenerators(emptyPath);
            }).to.throw(/No Generator found/i);
        });
    });
    describe('Generator Path test/generators', function () {
        it('Should create two generators [multiple-dir,single-dir]', function () {
            compiler.addGenerators(validPath);
            chai_1.expect(compiler.getGeneratorNames()).to.eql(["multiple-dir", "single-dir"]);
        });
    });
    describe('Wrong Generator Path', function () {
        it('Should thrown an Error when a trying to add a generator that already exist (same name)', function () {
            chai_1.expect(function () {
                compiler.addGenerators(validPath);
            }).to.throw(/Duplicated generator/i);
        });
    });
});
//# sourceMappingURL=Compiler.spec.js.map