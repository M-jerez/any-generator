/**
 * Created by Ma jerez on 28/08/2016.
 */

import {Builder} from "../lib/Builder";
var chalk = require('yargonaut').chalk();

export  function Generate(argv){
	let error = false;
	if(!argv["modules_root"]){
		console.error(chalk.red("option --modules_root required."));
		error =true;
	}
	if(!argv["blueprints_root"]){
		console.error(chalk.red("option --blueprints_root required."));
		error =true;
	}
	if(error){
		console.log(`Use 'anygen --help' to see all options.`);
		return;
	}

	let modules_root = argv["modules_root"];
	let blueprints_root = argv["blueprints_root"];
	let blueprint_name = argv["blueprint_name"];
	let new_module_name = argv["new_module_name"];
	let builder = new Builder();


	try{
		builder.addBlueprints(blueprints_root);
		let files = builder.build(blueprint_name,new_module_name,modules_root);


		console.log(chalk.green(`Destination Path: '${modules_root}'` ));
		console.log(chalk.green(`Generated files:`));
		files.forEach(item=>{
			console.log("   "+item);
		})
	}catch(err){
		console.error(chalk.red(err));
	}


}



export function List(argv){
	if(!argv["blueprints_root"]){
		console.error(chalk.red("option --blueprints_root required."));
		return;
	}
	let blueprints_root = argv["blueprints_root"];
	let builder = new Builder();
	builder.addBlueprints(blueprints_root);
	let names = builder.getBlueprintNames();

	console.log(chalk.green(`Blueprints Path: ${blueprints_root}`));
	console.log(chalk.green(`Available Blueprints:`));
	names.forEach(item=>{
		console.log("   "+item);
	})
}
