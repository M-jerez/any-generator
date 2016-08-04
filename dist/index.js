"use strict";
var Builder_1 = require("./Builder");
process.argv.forEach(function (val, index, array) {
    console.log(index + ': ' + val);
});
try {
    var compiler = new Builder_1.Compiler();
    compiler.addGenerators("../test/generators");
    compiler.addGenerators("../test/empty");
}
catch (err) {
    console.error(err.message);
}
//# sourceMappingURL=index.js.map