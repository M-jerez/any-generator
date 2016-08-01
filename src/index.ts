

import {Compiler} from "./Compiler";

var newName = process.argv[1];
var genName = process.argv[2];

process.argv.forEach(function (val, index, array) {
	console.log(index + ': ' + val);
});


const compiler =  new Compiler();
compiler.addGenerators("../test/generators");
