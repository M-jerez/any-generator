"use strict";
var Compiler_1 = require("./Compiler");
process.argv.forEach(function (val, index, array) {
    console.log(index + ': ' + val);
});
try {
    var compiler = new Compiler_1.Compiler();
    compiler.addGenerators("../test/generators");
    compiler.addGenerators("../test/empty");
}
catch (err) {
    console.error(err.message);
}
//# sourceMappingURL=index.js.map