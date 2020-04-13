/**
 * @package Anygen
 * @license MIT , License text available at https://opensource.org/licenses/MIT
 * @author Ma Jerez, 2020
 */

import {Command} from 'commander';
import {mocked} from 'ts-jest/utils';

jest.mock('commander');

const commandMock = mocked(Command, true);

// runs anygen
import * as anygen from '../lib/anygen-cli';

test('Should configure commander', () => {
  const instances = commandMock.mock;
  console.log(commandMock.mock);
  // expect(instance).toHaveBeenCalledWith('0.0.4');
});
