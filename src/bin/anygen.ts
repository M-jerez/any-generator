#!/usr/bin/env node

import * as yargs from 'yargs';
import {Builder} from "../lib/Builder";
import * as fsx from 'fs-extra';


var version = require('../../package').version;
// yarg extension for colored help
var yargonaut = require('yargonaut');
var chalk = yargonaut.chalk();


var comandGenerate = function (argv) {
	console.log('lol');
	console.log(argv);
};


var commandList = function (argv) {

};


/* ######################################
 Yargs Configuration
 ###################################### */
yargonaut.style('blue')
	.helpStyle('green')
	.errorsStyle('red');

let ARGS =
	yargs
		.usage(
			chalk.green("Version:\n") + `  ${version}\n`
		)
		.usage(chalk.green("Usage:\n") + `  $0 <command> [<args>] [<options>]`)
		.command(
			'generate <blueprint_name> <new_module_name> [-b] [-m] [-c]',
			'creates a new module.',
			function (yergs) {
				return yergs.pkgConf("anygen").options("b",{alias:"blueprints_root"});
			},
			comandGenerate
		)
		.command(
			'list [-b] [-c]',
			'list all available Blueprints in a directory.',
			function (yergs) {
				return yergs.pkgConf("anygen");
			},
			commandList)
		.option('b', {
			alias: 'blueprints_root',
			describe: "Root directory where the Blueprints are located",
			type: 'string'
		})
		.option('m', {
			alias: 'modules_root',
			describe: "Root directory where the Module will be generated",
			type: 'string'
		})
		.config("c", 'Path to JSON config file. Pass this parameter to use a config file other than package.json', function (path) {
			let package_settings = JSON.parse(fsx.readFileSync(path, 'utf-8'));
			let anygen_settings = package_settings.anygen;
			return anygen_settings;
		})
		.example('$0 generate ng_component my_new_component', 'generates a new my-new-component the "ng_component" Blueprint, [blueprints_root] and [modules_root] options are read from package.json.')
		.example('$0 list -b ./src/blueprints', 'list all the blueprint within the ./src/blueprints directory.')
		.epilog(
			chalk.green("Config file\n") +
			'package.json is used as config file, All [' + chalk.cyan('options') + '] are read from the object "' + chalk.blue('anygen') + '" within package.json\n'
			+ 'i.e.: ' + chalk.green('package.json') + ' => {"' + chalk.blue('anygen') + '":{"' + chalk.cyan('blueprints_root') + '":"./tools/blueprints/","' + chalk.cyan('modules_root') + '":"./src/modules/"}}')
		.help()
		.wrap(null)
		.argv;


if (ARGS._.length == 0) {
	yargs.showHelp();
}
console.log(ARGS);


