#!/usr/bin/env node
"use strict";
var yargs = require('yargs');
var Commands_1 = require("./Commands");
var version = require('../../package').version;
var yargonaut = require('yargonaut');
var chalk = yargonaut.chalk();
var command = false;
yargonaut.style('blue')
    .helpStyle('green')
    .errorsStyle('red');
var ARGS = yargs
    .usage(chalk.green("Version:\n") + ("  " + version + "\n") +
    chalk.green("Usage:\n") + "  $0 <command> [<args>] [options]")
    .command('generate <blueprint_name> <new_module_name> [options]', 'creates a new module.', function (yergs) {
    return yergs.pkgConf("anygen")
        .options("b", { alias: "blueprints_root" })
        .options("m", { alias: "modules_root" });
}, function (argv) {
    command = true;
    Commands_1.Generate(argv);
})
    .command('list [--blueprints_root]', 'list all available Blueprints in a directory.', function (yergs) {
    return yergs.pkgConf("anygen");
}, function (argv) {
    command = true;
    Commands_1.List(argv);
})
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
    .example('$0 generate ng_component my_new_component', 'generates a new my-new-component the "ng_component" Blueprint, [blueprints_root] and [modules_root] options are read from package.json.')
    .example('$0 list -b ./src/blueprints', 'list all the blueprint within the ./src/blueprints directory.')
    .epilog(chalk.green("Config file\n") +
    'package.json is used as config file, All [' + chalk.cyan('options') + '] are read from the object "' + chalk.blue('anygen') + '" within package.json\n'
    + 'i.e.: ' + chalk.green('package.json') + ' => {"' + chalk.blue('anygen') + '":{"' + chalk.cyan('blueprints_root') + '":"./tools/blueprints/","' + chalk.cyan('modules_root') + '":"./src/modules/"}}')
    .help()
    .wrap(null)
    .argv;
if (ARGS._.length == 0) {
    yargs.showHelp();
}
else if (!command) {
    console.error(chalk.red("anygen <command:'" + ARGS._[0] + "'>, not found."));
    console.log("Use 'anygen --help' to see available commands.");
}
//# sourceMappingURL=anygen.js.map