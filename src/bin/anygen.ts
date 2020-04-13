#!/usr/bin/env node

import AnygenCLI from '../lib/cli';

new AnygenCLI()
  .commandAnygen((blueprintName: string, newName: string, props: any) => null)
  .commandList(() => null)
  .run(process.argv);

// tslint:disable-next-line
console.log('anygen argv:', process.argv);
