"use strict";
var Builder_1 = require("../lib/Builder");
var chalk = require('yargonaut').chalk();
function Generate(argv) {
    var error = false;
    if (!argv["modules_root"]) {
        console.error(chalk.red("option --modules_root required."));
        error = true;
    }
    if (!argv["blueprints_root"]) {
        console.error(chalk.red("option --blueprints_root required."));
        error = true;
    }
    if (error) {
        console.log("Use 'anygen --help' to see all options.");
        return;
    }
    var modules_root = argv["modules_root"];
    var blueprints_root = argv["blueprints_root"];
    var blueprint_name = argv["blueprint_name"];
    var new_module_name = argv["new_module_name"];
    var builder = new Builder_1.Builder();
    try {
        builder.addBlueprints(blueprints_root);
        var files = builder.build(blueprint_name, new_module_name, modules_root);
        console.log(chalk.green("Destination Path: '" + modules_root + "'"));
        console.log(chalk.green("Generated files:"));
        files.forEach(function (item) {
            console.log("   " + item);
        });
    }
    catch (err) {
        console.error(chalk.red(err));
    }
}
exports.Generate = Generate;
function List(argv) {
    if (!argv["blueprints_root"]) {
        console.error(chalk.red("option --blueprints_root required."));
        return;
    }
    var blueprints_root = argv["blueprints_root"];
    var builder = new Builder_1.Builder();
    builder.addBlueprints(blueprints_root);
    var names = builder.getBlueprintNames();
    console.log(chalk.green("Blueprints Path: " + blueprints_root));
    console.log(chalk.green("Available Blueprints:"));
    names.forEach(function (item) {
        console.log("   " + item);
    });
}
exports.List = List;
//# sourceMappingURL=Commands.js.map