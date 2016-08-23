#!/usr/bin/env node

import * as yargs from 'yargs';
import {Builder} from "../lib/Builder";
import * as fsx from 'fs-extra';
var version = require('../../package').version;
require('yargonaut')
	.style('blue')
	.helpStyle('green')
	.errorsStyle('red');



let ARGS =
	yargs
		.usage(`Version: ${version}\nUsage: $0 <command> [options]`)
		.command('generate <blueprint_name> <module_name> [options...]', 'create a new module')
		.option('br', {
			alias: 'blueprints_root',
			describe: "Root directory where the Blueprints are located",
			type: 'string',
			'default':'./blueprints',
			demand:true
		})
		.option('mr', {
			alias: 'modules_root',
			describe: "Root directory where the Module will be generated",
			type: 'string',
			'default':'./src',
			demand :true
		})
		.option("c",{
			alias:"config",
			describe:'Read the options from a json config file, it looks for the "anygen" key withing the json file.',
			'default':'./package.json',
			demand:true
		})
		.command('list [options]', 'list all available Blueprints')
		.example('$0 generate ng_component my-new-component -c', 'generates a new my-new-component the "ng_component" Blueprint, [blueprints_root] and [modules_root] options are read from package.json.')
		.example('$0 list -br ./src/blueprints','list all the blueprint within the ./src/blueprints directory.')
		.help()
		.wrap(null)
		.argv;

if(ARGS._.length == 0){
	yargs.showHelp();
}else{
	console.log(ARGS);
}

// let package_settings = JSON.parse(fsx.readFileSync(argv['c'], 'utf-8'));
// let anygen_settings = package_settings.anygen;



