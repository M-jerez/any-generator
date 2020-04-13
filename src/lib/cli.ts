/**
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND.
 * @license MIT , License text available at https://opensource.org/licenses/MIT
 * @copyright 2020  @author Ma Jerez
 * @package Anygen.
 */

import {Command} from 'commander';
// tslint:disable-next-line
const pkg = require('../../package.json');

type anygenCB = (blueprint: string, newName: any, props: {}) => any;
type listCB = () => any;

export default class AnygenCLI {
  private onAnygen!: anygenCB;
  private onList!: listCB;
  private anygen = new Command();
  commandAnygen(cb: anygenCB) {
    this.onAnygen = cb;
    return this;
  }
  commandList(cb: listCB) {
    this.onList = cb;
    return this;
  }
  run(argv: string[]) {
    this.anygen
      .version(pkg.version)
      .description(
        'Anygen is a CLI tool for simple scaffolding code generation.' +
          '\nPassed [options] override values in the "anygen.json" config file.' +
          '\nhttps://github.com/M-jerez/any-generator',
      )
      .arguments('<blueprint_name> <new_name>')
      .option('-s, --src <path>', 'The root directory of the "blueprint" code')
      .option('-d, --dest <path>', 'The destination directory where the new code will be generated')
      .option(
        '-f, --files <string>',
        'Glob patter to filter the files used as "blueprint" code. (relative to "src" directory)',
      )
      .option('-tn, --transformName <string>', 'The name or regExp to be replaced in the "blueprint"')
      .option('-vb, --verbose', 'Provides additional details while executing the command')
      .action((blueprintName: string, newName: string, command: Command) =>
        this.onAnygen(blueprintName, newName, command.opts()),
      );

    this.anygen
      .command('list')
      .description('list all available blueprints')
      .action(() => this.onList());

    this.anygen.parse(argv);
  }
}
