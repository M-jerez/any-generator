<p align="center">
  <img alt='Anygen' src='./logo/public/logo.svg?sanitize=true' 
  height=120 width=388>
</p>
<p align="center">
  <strong>Simple scaffolding generator for any project.</strong><br/>
   Anygen can be an advanced copy-paste command or your little cli-tool.
</p>

---

<p align=center>
<img src="https://img.shields.io/travis/M-jerez/any-generator.svg?style=flat-square&maxAge=86400" alt="Travis" style="max-width:100%;">
<img src="https://img.shields.io/npm/v/anygen.svg?style=flat-square&maxAge=86400" alt="npm" style="max-width:100%;">
<img src="https://img.shields.io/david/M-jerez/any-generator.svg?style=flat-square&maxAge=86400" alt="David" style="max-width:100%;">
<img src="https://img.shields.io/npm/dt/anygen.svg?style=flat-square&maxAge=86400" alt="Github All Releases"  style="max-width:100%;">
<img src="https://img.shields.io/npm/l/anygen.svg?style=flat-square&maxAge=86400" alt="npm"  style="max-width:100%;">
<br/>
<img src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square&maxAge=99999999" alt="npm"  style="max-width:100%;">
<img src="https://badges.greenkeeper.io/M-jerez/any-generator.svg?style=flat-square" alt="npm"  style="max-width:100%;">    
</p>

&nbsp;

## How It Works

Anygen is Command Line Tool that generates project scaffolding based on your own project files, Anygen does not require special files as templates so you can write a first component and replicate it easily using Anygen.

Anygen automatically sarch for anygen config files on installed packages so templates configured on those packages can be reused (this is simmilar to to the way typescript search and import definition fiels on installed packages).  

&nbsp;

## Install

Install globally.

```
npm i -g  anygen
anygen <template_name>  <new_name>
```

Install locally to use programmatically or using [npx](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b).

```
npm i -D anygen
npx anygen <template_name>  <new_name>
```

&nbsp;


## Configuration

Anygen uses [cosmiconfig](https://github.com/davidtheclark/cosmiconfig) to read the configuration. It is possible to write your config using the files `.anygenrc.json`, `.anygenrc.yaml`, `.anygenrc.js` or in a property called `anygen` in `package.json`.

Each object in the config file represents a template to generate a different scaffolding for your project and is using as the first parameter in the anygen command `anygen <template_name> <new_name>`

<!-- prettier-ignore-start -->
```yaml
#file:  .anygenrc.yaml
create_component:
  src: 'lib/components/'
  dest: 'lib/components/'
  files: ['component-starter/**']
  old_name: ['componentStarter']
```

```ts
//file: .anygenrc.json
{
  "create_component": {
    "src": "lib/components/",
    "dest": "lib/components/",
    "files": ["componentStarter/**"],
    "old_name": ["starterComponent"]
  }
}
```

```ts
//file: package.json
{
  "anygen": {
    "create_component": {
      "src": "lib/components/",
      "dest": "lib/components/",
      "files": ["componentStarter/**"],
      "old_name": ["starterComponent"]
    }
  }
}
```
<!-- prettier-ignore-end -->

Runnig `anygen create_component myNewComponent` will generate a new component `myNewComponent` based on the `starterComponent`.

&nbsp;

## Configuration Parameters

<!-- prettier-ignore-start -->
*Parameter* | Description  | Tips  |
-------------- | ------------ | ----- |
*src* | The root directory of your template. | This is usually the parent directory of your scaffolding template. |
*dest* | The destination directory. | New scaffolding will be generated within this directory. |
*files*| A list of [glob](https://www.npmjs.com/package/glob) patterns to included and excluded files in your template. <br/> **This filepaths are relative to the *`src`* directory.** <br/> By default all files within the `src` directory are coppied. | To exclude files use a negation of the pattern.<br/> i.e. `!assets/**/*.png` will exclude all png files within the assets folder.
*old_name* | A list of patterns to match strings within your files and file-paths.<br/> The matched string will be replaced by the `<new_name>` parameter from the anygen command.| Use this to transform class names, variable names, exports, etc. <br/> [minimatch](https://www.npmjs.com/package/minimatch) is used to transform glob patterns into Regular expressions.|
*transforms* | An array of other transformations to be executed on the files.<br/>See bellow table for more info.  | Used this to replace some other data in your scaffolding like dates, author, etc.. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <!-- so many spaces is used to set column width --> | 
<!-- prettier-ignore-end -->

&nbsp;

## Scaffolding Generation Process

1. A file-tree is generated using only the files that mathc the `files` pattern. The `src` directory is used as root of the file-tree.
2. All file names that match the `replace_name` pattern are renamed using the `<new_name>` argument from the anygen command.
3. Check the resulting file names so dont conflict wiht existing files, if a file already exists the command is aborted.
4. All files are parsed and the strings that match the `replace_name` pattern are replaced using the `<new_name>` argument from the anygen command.
5. Execute all extra transforms especified in the `transforms` object.
6. All new files are moved to the `dest` directory.

&nbsp;

## Full Example

//TODO

&nbsp;

## Using The Anygen JS Library.

[![Javascript](https://img.shields.io/badge/use--via-Javascript-yellow.svg)]()

```js
var anygen = require('anygen');
var builder = anygen.Builder;

var modules_root = '.src/modules/';
var blueprints_root = './path/to/your/blueprints/';
var blueprint_name = 'ng-component'; //this must be a direct subfolder of blueprints_root path (an existing blueprint).
var new_module_name = 'MyNewModule';
var builder = new Builder();

builder.addBlueprints(blueprints_root);
var files = builder.build(blueprint_name, new_module_name, modules_root);

console.log('Generated files:');
files.forEach(function(item) {
	console.log('   ' + item);
});
```

## API

For detailed info please check the API [documentation](https://m-jerez.github.io/any-generator/) generated using [typedoc](https://www.npmjs.com/package/typedoc)

`Builder.addBlueprints(blueprints_root)`

-   `blueprints_root`: root path to the Blueprint generators, each subdirectory of the `root_path` is a Blueprint

`Builder.build(blueprint_name, new_module_name, modules_root)`

-   `blueprint_name`: Name od the Blueprint to be used (a direct subdirectory of `blueprints_oot`)
-   `new_module_name`: the name of the new module that is generated
-   `modules_root`: path where the new module will be generated, new module path = `modules_root` + `new_module_name`

## Creating Your Blueprints

A blueprint is any direct `">"` subdirectory of your `blueprints_root` directory.

    path/to/your/blueprints_root
      +──  blueprint1
      |   └──  __name__
      |       +── __name__Controller.js
      |       +── __name__Controller.js
      |       └── __name__Template.html
      └──  blueprint2
          └──  __name__
              +── __name__Controller.js
              +── __name__Controller.js
              └── __name__Template.html

**The `__name__` string:**  
Any `__name__` string in a directory or file name will be replaced by the `new_module_name` when the build process is executed.  
Any `__name__` string within the content of the Blueprint files also will be replaced by the `new_module_name`.

**Examples of the Blueprints can be found within the repo: [tools/blueprints/](https://github.com/M-jerez/any-generator/tree/master/tools/blueprints).**

-   `single-dir` blueprint: shows how to create a blueprint with all the files in a single directory with the name of the module
-   `multiple-dir` blueprint: show how to create a module where the files are split within multiple directories. in this case the `modules_root` parameter
    should be the `common root` of all the split directories and blueprint should replicate the subdirectory structure of this `common root`.

## License

[MIT](http://en.wikipedia.org/wiki/MIT_License) @ Ma Jerez
