[![Travis](https://img.shields.io/travis/M-jerez/any-generator.svg?style=flat-square)]()
[![npm](https://img.shields.io/npm/v/npm.svg?maxAge=2592000?style=flat-square)]()
[![David](https://img.shields.io/david/M-jerez/any-generator.svg?maxAge=2592000?style=flat-square)]()
[![Github All Releases](https://img.shields.io/github/downloads/M-jerez/any-generator/total.svg?maxAge=2592000?style=flat-square)]()
[![npm](https://img.shields.io/npm/l/express.svg?maxAge=2592000?style=flat-square)]()

> Automatically generate project scaffolding for any project using `blueprints`.

## Install

Install globally  to use the CLI.

```
npm install -g  anygen
```

Install locally  to use programtically.

```
npm install --save  anygen
```

## Configuration

Anygen requires you to set the path of your `blueprints` and the path where you want to generate you new modules.  
In your `package.json` add the object `anygen` and set both paths. You can override this values using the cli options `-b` for blueprints_root and `-m` for modules_root.

```js
//file: package.json
{
	"anygen": {
		"blueprints_root": "./path/to/your/blueprints/",
		"modules_root": "./src/modules"
	}
}

```

## Examples

[![CLI](https://img.shields.io/badge/use--via-CLI-orange.svg)]()  
ganerate a new module:
```bash
anygen generate blueprint_name new_module_name
```

list all Blueprints:
```bash
anygen list
```

[![Javascript](https://img.shields.io/badge/use--via-Javascript-yellow.svg)]()  
```js
var anygen = require('anygen');
var builder = anygen.Builder;

var modules_root = ".src/modules/";
var blueprints_root = "./path/to/your/blueprints/";
var blueprint_name = "ng-component";//this must be a direct subfolder of blueprints_root path (an existing blueprint).
var new_module_name = "MyNewModule";
var builder = new Builder();

builder.addBlueprints(blueprints_root);
var files = builder.build(blueprint_name, new_module_name, modules_root);

console.log("Generated files:");
files.forEach(function (item) {
   console.log("   " + item);
});
```


## API

For detailed info please check the API [documentation](https://m-jerez.github.io/any-generator/) generated using [typedoc](https://www.npmjs.com/package/typedoc)  

`Builder.addBlueprints(blueprints_root)`
* `blueprints_root`: root path to the Blueprint generators, each subdirectory of the `root_path` is a Blueprint

`Builder.build(blueprint_name, new_module_name, modules_root)`
* `blueprint_name`: Name od the Blueprint to be used (a direct subdirectory of `blueprints_oot`)
* `new_module_name`: the name of the new module that is generated
* `modules_root`: path where the new module will be generated, new module path = `modules_root` + `new_module_name`


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
Any `__name__` string withing the content of the Blueprint files also will be replaced by the `new_module_name`.


**Examples of the Blueprints can be found withing the repo: [tools/blueprints/](https://github.com/M-jerez/any-generator/tree/master/tools/blueprints).** 
* `single-dir` blueprint: shows how to create a blueprint with all the files in a single directory with the name of the module
* `multiple-dir` blueprint: show how to create a module where the files are split within multiple directories. in this case the `modules_root` parameter 
should be the `common root` af all the split directories and blueprint should replicate the subdirectory structure of this `common root`. 

## License

[MIT](http://en.wikipedia.org/wiki/MIT_License) @ Ma Jerez
