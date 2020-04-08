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


Anygen is a CLI tool that generates new scaffolding code based on your own project files. it is aimed for simplicity.

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

Using bellow config file and running the command `anygen myFirstComponent myNewComponent` will generate a new component `myNewComponent` based ob `myFirstComponent` on the `app/components/` directory.

```ts
//file: anygen.json
{
  "myFirstComponent": {
    "src": "app/components/myFirstComponent",
    "dest": "app/components/",
    "files": ["*/**"],
    "transforms": {
      "_default_" : ["myFirstComponent"]
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
[*transforms.\_default\_*](#transforms._default_) | The minimum 'default' transformation required to replace `<blueprint_name>` by `<new_name>`.<br/>It can be a list of strings or regular expressions. It will be replaced within the files content and file paths.| This can be used in a **shorthand way** for quick setup and replace file names, class names, etc.<br/>Or can be used in an **expanded way** for more advanced transformations.<br/>[Minimatch](https://www.npmjs.com/package/minimatch) is used for regular expressions.|
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
  "myFirstComponent": {
    //...
    "transforms": {
      "some_transformation" : { //name of the transformation
        "replace": null, //required value, it is minimatch regexp i.e: 'myFirstComponent'
        "files": "*/**", // executes on all files by default
        "lines": [0,-1], // [start, end], negative values count from the end of the file, by default include all file lines.
        "in_files": true, // Only the file content transformed by default
        "in_paths": false, // Path names are not transformed by default
        "default_value": null //optional default value
      }
    }
  }
}
```

<!-- prettier-ignore-start -->
*Transform Parameter* | Default Value | Optional | Description |
--------------------- | ------------- | -------- | ----------- |
*replace*             | None          | No       | Regular expression to match |
*files*               | `'*/**'`      | Yes      | Glob patter to match files, all files matched by default |
*lines*               | `[0,-1]`      | Yes      | Start and End lines to limit regexp replace. Using negative values indicates a line number from the end of the file.|
*in_files*            | `true`        | Yes      | Only the file content transformed by default |
*in_paths*            | `false`       | Yes      | Path names are not transformed by default<br/>Except for the \_default\_ shorthand transformation where paths are also transformed by default. |
*default_value*       | None          | Yes       | A default value to be used for replacement in the transformation.<br/>if this parameter is omitted the user will be asked for the value in the console.|
<!-- prettier-ignore-end -->

### Transforms.\_default\_
The `_default_` entry within the `transforms` object is just shorthand to simplify the config file.   
It is always required either ins a shorthand way or expanded way. Use expanded object allows for better customization.

**Bellow configuration files are equivalent:**

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
  "myFirstComponent": {
    //...
    "transforms": {
      "_default_" : ["myFirstComponent"]
    }
  }
}





```
</td>
<td style='margin:0;padding:0'>

```ts
//file: anygen.json
{
  "myFirstComponent": {
    //...
    "transforms": {
      "_default_": {
        "replace": ["myFirstComponent"],
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
Lets say there is a readme file within the template and we want to customize the **_Version Number_**.  
The text `v0.1` in the src file will be replaced by `v0.1.3` in the generated file.

```ts
//file: anygen.json
{
  "myFirstComponent": {
    "src": "app/components/myFirstComponent",
    "dest": "app/components/",
    "files": ["*/**"],
    "transform_names": ["myFirstComponent"]
    "transforms": {
      "version" : { //name of the parameter in command line
        "replace": "^v0\.1", // match and replaces 'v0.1'
        "files": "*/**.md", // executes only in markdown files
        "lines": null, // optional start and end line limit for the regexp replace. [startLine, endLine]
        "in_files": true,
        "in_paths": false,
        "default_value": null //optional default value
      }
    }
  }
}
```
Run anygen
```shell
anygen myFirstComponent  myComponent --version='v0.1.3'
```
Generated files:
<!-- prettier-ignore-start -->
<table>
<tbody>
<tr>
<td width='400px'>
Original file: &nbsp;&nbsp; <i><small>myFirstComponent/readme.md</small><i>
</td>
<td width='400px'>
Generated file: &nbsp;&nbsp; <i><small>myComponent/readme.md</small><i>
</td>
</tr>
<tr>
<td style='margin:0;padding:0'>

```txt
#Readme file for starterComponent v0.1

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

@author: Ma Jerez
```
</td>
</tr>
</tbody>
</table>
<!-- prettier-ignore-end -->


&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;


## Scaffolding Generation Process


1. A file-tree is generated using only the files that mathc the `files` pattern. The `src` directory is used as root of the file-tree.
2. All file names that match the `transform_names` pattern are renamed using the `<new_name>` argument from the anygen command.
3. Check the resulting file names so dont conflict wiht existing files, if a file already exists the command is aborted.
4. All files are parsed and the strings that match the `transform_names` pattern are replaced using the `<new_name>` argument from the anygen command.
5. Execute all extra transforms especified in the `transforms` object.
6. All new files are moved to the `dest` directory.


&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;


## License


[MIT License](http://en.wikipedia.org/wiki/MIT_License)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

_The software is provided "as is", without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose and noninfringement. In no event shall the authors or copyright holders be liable for any claim, damages or other liability, whether in an action of contract, tort or otherwise, arising from, out of or in connection with the software or the use or other dealings in the software._

[Created by @Ma Jerez](https://twitter.com/Ma_jrz)
