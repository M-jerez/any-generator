

import {Builder} from "./Builder";

process.argv.forEach(function (val, index, array) {
	console.log(index + ': ' + val);
});


try{
	// const builder =  new Builder();
	// builder.addGenerators("../test/generators");
	// builder.addGenerators("../test/empty");
}catch (err){
		console.error(err.message);
}


