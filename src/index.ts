

import {Compiler} from "./Builder";

process.argv.forEach(function (val, index, array) {
	console.log(index + ': ' + val);
});


try{
	const compiler =  new Compiler();
	compiler.addGenerators("../test/generators");
	compiler.addGenerators("../test/empty");
}catch (err){
		console.error(err.message);
}


