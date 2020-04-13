/**
 * @package Anygen
 * @license MIT , License text available at https://opensource.org/licenses/MIT
 * @author Ma Jerez, 2020
 */

import * as commander from 'commander';
import {mocked} from 'ts-jest/utils';
import Anygen from '../lib/cli';

// tslint:disable-next-line
const pkg = require('../../package.json');

const opts = {src: 'src', dest: 'dest'};
const cInstance = {
  version: jest.fn().mockReturnThis(),
  description: jest.fn().mockReturnThis(),
  arguments: jest.fn().mockReturnThis(),
  option: jest.fn().mockReturnThis(),
  action: jest.fn().mockReturnThis(),
  command: jest.fn().mockReturnThis(),
  parse: jest.fn().mockReturnThis(),
  opts: jest.fn().mockReturnValue(opts),
};
jest.mock('commander', () => ({
  Command: jest.fn(() => cInstance),
}));

const onAnygen = jest.fn();
const onList = jest.fn();
const ang = new Anygen().commandAnygen(onAnygen).commandList(onList);

afterEach(() => jest.clearAllMocks());

test('configure commander', () => {
  const argv = ['node', '.dist/aa', 'abc', 'cde'];
  ang.run(argv);
  // configure anygen command and options
  expect(cInstance.version).toHaveBeenCalledWith(pkg.version);
  expect(cInstance.arguments).toHaveBeenCalledWith('<blueprint_name> <new_name>');
  expect(cInstance.option).toHaveBeenCalledWith(expect.stringContaining('-s, --src'), expect.any(String));
  expect(cInstance.option).toHaveBeenCalledWith(expect.stringContaining('-d, --dest'), expect.any(String));
  expect(cInstance.option).toHaveBeenCalledWith(expect.stringContaining('-f, --files'), expect.any(String));
  expect(cInstance.option).toHaveBeenCalledWith(expect.stringContaining('-tn, --transformName'), expect.any(String));
  expect(cInstance.option).toHaveBeenCalledWith(expect.stringContaining('-vb, --verbose'), expect.any(String));
  // configure the list command
  ang.run(['node', '.dist/aa', 'list']);
  expect(cInstance.parse).toBeCalledWith(argv);
});
