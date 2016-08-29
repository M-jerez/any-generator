"use strict";
var chai_1 = require("chai");
var anygen = require("../lib/anygen");
describe('Anygen', function () {
    describe('Anygen export the correc objects', function () {
        it('Should export builder, utils, and Blueprint ', function () {
            chai_1.expect(anygen.Builder).not.to.be.undefined;
            chai_1.expect(anygen.Blueprint).not.to.be.undefined;
            chai_1.expect(anygen.utils).not.to.be.undefined;
        });
    });
});
//# sourceMappingURL=anygen.spec.js.map