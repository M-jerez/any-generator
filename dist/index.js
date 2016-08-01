"use strict";
var Compiler_1 = require("./Compiler");
var newName = process.argv[1];
var genName = process.argv[2];
process.argv.forEach(function (val, index, array) {
    console.log(index + ': ' + val);
});
var compiler = new Compiler_1.Compiler();
compiler.addGenerators("../test/generators");
