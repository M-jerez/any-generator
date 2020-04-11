<p align="center">
  <img alt='Anygen' src='./logo/public/logo.svg?sanitize=true' 
  height=120 width=388>
</p>
<p align="center">
  <strong>Simple code scaffolding generation.</strong><br/>
   Anygen is a simple CLI tool for your own projects.
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
</p>


&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;


## Features


Anygen is a CLI tool that generates new scaffolding code based on your own project files. It is build aiming for simplicity.

-   Anygen does not require special blueprint files, although custom made blueprints can be used for advanced cases.
-   You can write a first component and replicate it easily using Anygen.
-   Anygen bluePrints can be shared and reused using npm. 
-   Anygen automatically searches for other `anygen.json` files in your `node_modules`, so it can reuse blueprints from installed packages. 


&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;


## Install


Install globally.

```
npm i -g  anygen
anygen <blueprint_name>  <new_name>
```

Install locally to use programmatically or using [npx](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b).

```
npm i -D anygen
npx anygen <blueprint_name>  <new_name>
```


&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;


## Cofig File


Anygen uses `anygen.json` file in the root of your project as **configuration file**.

Each entry in the config file represents a 'blueprint' to generate code. The name of the blueprint is used in the anygen command as follows: `anygen <blueprint_name> <new_name>`

Having bellow config file,  when the user runs the command `anygen createComponent myNewComponent`; 
Anygen will generate a new component `app/components/myNewComponent` based on `app/components/myOriginalComponent`.

```ts
//file: anygen.json
{
  "createComponent": { //createComponent Blueprint
    "src": "app/components/myOriginalComponent", //blueprint component root
    "dest": "app/components/",
    "files": ["*/**"],
    "transforms": {
      "name" : ["myOriginalComponent"] //regexp to match and replace the name when generating the new component
    }
  }
}
```


&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;


## Config Parameters


<!-- prettier-ignore-start -->
*Parameter* | Description  | Tips  |
----------- | ------------ | ----- |
*src* | The root directory of your original code or 'blueprint'. | This is usually the directory of your own `'component/service/module/etc'` used as blueprint. |
*dest* | The destination directory. | New scaffolding code will be generated within this directory. |
*files* | [Glob](https://www.npmjs.com/package/glob) pattern to include/exclude files in your blueprint **relative to the *`src`* directory.** &nbsp;&nbsp; ***i.e:*** `'*/**'` is internally transformed into `'${src}/*/**'`<br/>If this parameter is omitted, all files within the `src` directory will be included. | To exclude files use a negation of the pattern.  ***i.e:*** `!assets/**/*.png` will exclude all png files within the assets folder of your blueprint.|
[*transforms*](#transforms) | An list of transformations to be performed on files and/or file paths.<br/>Transformations are applied in the same order that they appear in the config file.| Transformations are basically regexp replacement.<br/>Use it to replace custom data in your blueprints, like class names, function names, variable names, dates, author, copyright etc.. | 
[*transforms.name*](#transformsname) | The minimum transformation required to replace `<blueprint_name>` by `<new_name>`.<br/>It can be a list of strings or regular expressions. It will be replaced in file paths and files content.| This can be used in a **shorthand way** for quick setup, is intended to replace file names, class names, etc.<br/>Or can be used in an **expanded way** for more advanced transformations.<br/>[Minimatch](https://www.npmjs.com/package/minimatch) is used for regular expressions.|
<!-- prettier-ignore-end -->


&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;


## Transforms


It is possible to declare a list of transformations to be executed when generating the new code. Each transformation is basically a regular expression to match and replace text in file's content or path names.  *In the future there might be other types of transformations other than regexp replacement.*

**[Minimatch](https://www.npmjs.com/package/minimatch) is used to generate the regular expressions.** Please read Minimatch docs for all differences with the standard javascript Regexp.

The name of each entry in the transforms property, is used as parameter name in the `anygen` command.  
If the parameter is not passed in the command, the user will be asked in the console.

### Transforms Object:

```ts
//file: anygen.json
{
  "createComponent": { //createComponent Blueprint
    // other params ...
    "transforms": {
      "some_transformation" : { //name of the transformation
        "replace": ["myOriginalComponent"], //required value, it is minimatch regexp.
        "files": "*/**", // executes on all files by default, these files are relative to the 'src' directory
        "lines": [0,-1], // [start, end], negative values count from the end of the file, by default include all file lines.
        "in_files": true, // Only the file content transformed by default
        "in_paths": true, // Path names are not transformed by default
        "default_value": null //optional default value,
        "prompt": null //optional message to display to the user
      }
    }
  }
}
```

<!-- prettier-ignore-start -->
*Transform Parameter* | Default Value | Required          | Description |
--------------------- | ------------- | ----------------- | ----------- |
*replace*             | None          | Yes               | Regular expressions to match|
*files*               | `'*/**'`      | No - Uses Default | Glob patter to match files, all files matched by default, these files are relative to the `src` directory |
*lines*               | `[0,-1]`      | No - Uses Default | Start and End lines to limit regexp search. Using negative values indicates a line number starting from the end of the file. By default all lines are included.|
*in_files*            | `true`        | No - Uses Default | File content is transformed by default |
*in_paths*            | `true`        | No - Uses Default | Path names are transformed by default |
*default_value*       | None          | No                | A default value to be used for replacement in the transformation.<br/>if this parameter is omitted the user will be asked for the value in the console.|
*prompt*              | None          | No                | A message to display in the console when the user is asked fot the replacement value |
<!-- prettier-ignore-end -->

### Transforms Shorthand

To simplify configuration a little bit you can set the transform object using a shorthand way as per bellow table.
In the shorthand the transform is just an array of regular expressions that corresponds to the `replace` field, the rest of fields will be set to the default value.

### Transforms.name

`transforms.name` is the minimum transformation required to replace the original blueprint name and is always required within the transforms object.   
Bellow example shows the 'name' transformation in shorthand or expanded way. **Both files are equivalent:**

<!-- prettier-ignore-start -->
<table>
<tbody>
<tr>
<td width='400px'>
Shorthand way:
</td>
<td width='400px'>
Expanded way:
</td>
</tr>
<tr>
<td style='margin:0;padding:0'>

```ts
//file: anygen.json
{
  "createService": { //createService Blueprint
    // other params ...
    "transforms": {
      "name" : ["myBlueprintService"]
    }
  }
}





```
</td>
<td style='margin:0;padding:0'>

```ts
//file: anygen.json
{
  "createService": { //createService Blueprint
    // other params ...
    "transforms": {
      "name": {
        "replace": ["myBlueprintService"],
        "files": "*/**", 
        "in_files": true,
        "in_paths": true
      }
    }
  }
}
```
</td>
</tr>
</tbody>
</table>
<!-- prettier-ignore-end -->


&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;


## Full example
Lets say we want to create a new component, and there is a readme file within it. We want to customize the *Version Number* and *Author* only in the readme file.  
To do this we have to replace the version, author and name of the blueprint component using bellow config file.  

```ts
//file: anygen.json
{
  //createComponent Blueprint
  "createComponent": { 
    "src": "app/components/myOriginalComponent",
    "dest": "app/components/",
    "files": ["*/**"],
    "transforms": {
      "name" : ["myOriginalComponent"], // shorthand to transform 'myOriginalComponent'
      "version" : { //name of the parameter in command line
        "replace": "0.1", // match and replaces '0.1'
        "files": "*/**.md", // executes only in markdown files
        "lines": [0,0], // Search for the regexp only in the first line
        "in_files": true,
        "in_paths": false,
        "prompt": "Please use semver for the new version" //message to display in the prompt
      },
      "author": ["Ma Jerez"] // match 'Ma Jerez' on all the files and all lines.
    }
  },
  
  //createService Blueprint
  "createService": { 
    "src": "app/services/someService",
    "dest": "app/services/",
    "files": ["*/**"],
    "transforms": {
      "name" : ["someService"] // shorthand to transform 'someService'
    }
  }
}
```
**Run anygen:**  
The version `v0.1` will by replaced by `v0.1.3` and the author `Ma jerez` will be replaced by `Joe Jones` in the generated component.
```shell
anygen createComponent  myComponent --version='0.1.3' --author='Joe Jones'
```
**Generated files:**   
All files within `app/components/myOriginalComponent` will be copied and transformed.   
For this example we just display the transformation applied to `app/components/myOriginalComponent/readme.md` file. 
<!-- prettier-ignore-start -->
<table>
<tbody>
<tr>
<td width='400px'>
Original file: &nbsp;&nbsp; <code>myOriginalComponent/readme.md</code>
</td>
<td width='400px'>
Generated file: &nbsp;&nbsp; <code>myComponent/readme.md</code>
</td>
</tr>
<tr>
<td style='margin:0;padding:0'>

```txt
#Readme file for myOriginalComponent v0.1

Lorem ipsum dolor sit amet...    
elit, sed do eiusmod tempor, dolor ...

@author: Ma Jerez
```
</td>
<td style='margin:0;padding:0'>

```txt
#Readme file for myComponent v0.1.3

Lorem ipsum dolor sit amet...    
elit, sed do eiusmod tempor, dolor ...

@author: Joe Jones
```
</td>
</tr>
</tbody>
</table>
<!-- prettier-ignore-end -->


&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;


## Scaffolding Generation Process


1. A file-tree is generated using only the files that match `src` + `files` pattern. The `src` directory is used as root of the file-tree.
2. Applies all the possible transformations to file paths.
3. Check the resulting file-tree with teh existing file-tree so there are no conflicts with existing files, if a file already exists the command is aborted.   
Use the `-force` parameter in the command line to force overwrite existing files. 
4. Applies all the possible transformations to files content.
6. All new files are moved to the `dest` directory.
7. If there is an error during the execution, the process is aborted an no files get ever generated.


&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;


## License


[MIT License](http://en.wikipedia.org/wiki/MIT_License)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

_The software is provided "as is", without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose and noninfringement. In no event shall the authors or copyright holders be liable for any claim, damages or other liability, whether in an action of contract, tort or otherwise, arising from, out of or in connection with the software or the use or other dealings in the software._

[Created by @Ma Jerez](https://twitter.com/Ma_jrz)
