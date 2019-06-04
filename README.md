<p align="center">
  <img alt='Anygen' src='./logo/public/logo.svg?sanitize=true' 
  height=120 width=388>
</p>
<p align="center">
  <strong>Simple scaffolding code generation.</strong><br/>
   Anygen is your own cli-tool based on your own project.
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
Anygen is a Command Line Tool that generates new scaffolding code based on your own project files. Anygen does not require special files as templates, you can write a first component and replicate it easily using Anygen.

Anygen automatically search for other anygen config files in your npm modules, so templates be reused from other packages.  
*This is similar to to the way Typescript search and import type definition files on installed packages.*



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
## Config File

Anygen uses a file `anygen.json` in the root of your project as config file. This is done so config files can be easily found on installed npm modules without any performance overhead.  

Each object in the config file represents a template to generate code for your project. The name of the template is used in the anygen command as follows: `anygen <template_name> <new_name>`.  

Running `anygen starterComponent myNewComponent` will generate a new component `myNewComponent` based on the `starterComponent`.

```ts
//file: anygen.json
{
  "starterComponent": {
    "src": "anygen/templates/starterComponent",
    "dest": "lib/components/",
    "files": ["*/**"],
    "replace_name": ["starterComponent"],
    "transforms" : {}
  },
  "starterService": {
    "src": "anygen/templates/starterService",
    "dest": "lib/services/",
    "files": ["*/**"],
    "replace_name": ["starterService"],
    "transforms" : {}
  }
}
```



&nbsp;
## Config Parameters

<!-- prettier-ignore-start -->
*Parameter* | Description  | Tips  |
----------- | ------------ | ----- |
*src* | The root directory of your template. | This is usually the directory of your scaffolding template. |
*dest* | The destination directory. | New scaffolding will be generated within this directory. |
*files*| [Glob](https://www.npmjs.com/package/glob) patterns to included and excluded files in your template. This are relative to the *`src`* directory. If this parameter is omitted, all files in the `src` directory will be included. | Usi this to exclude files use a negation of the pattern.  &nbsp; ***i.e:*** `!assets/**/*.png` will exclude all png files within the assets folder.
*replace_name* | A regular expression to be replaced by the `<new_name>` parameter. It will be replaced both within files and on file-paths.| Use this to transform class names, variable names, exports, etc. [Minimatch](https://www.npmjs.com/package/minimatch) is used for regular expressions.|
[*transforms*](##Transforms) | An list of extra transformations to be performed on files and/or file paths.| Used to replace some custom data in your scaffolding templates like dates, author, etc.. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <!-- so many spaces is used to set column width --> | 
<!-- prettier-ignore-end -->



&nbsp;
## Transforms

Besides the `<new_name>` parameter it is also possible to declare a list of transformations to be executed when generating the new code. Each transformation is basically a regular expression to match and replace some text in the files content or files name.

**[Minimatch](https://www.npmjs.com/package/minimatch) is used to generate the regular expressions.** Please read Minimatch docs for all differences with the standard javascript Regexp.

Lets say there is a readme file within the template and we want to customize the **_Version Number_**.  
The text `v0.1` in the src file will be replaced by `v0.1.3` in the generated file.

**Command Line:**

```shell
anygen starterComponent  myComponent --version='v0.1.3'
```

<!-- prettier-ignore-start -->
<table>
<tbody>
<tr>
<td width='400px'>
Src: &nbsp;&nbsp; <i><small>starterComponent/readme.md</small><i>
</td>
<td width='400px'>
Dest: &nbsp;&nbsp; <i><small>myComponent/readme.md</small><i>
</td>
</tr>
<tr>
<td style='margin:0;padding:0'>

```txt
#Readme file for starterComponent v0.1

Lorem ipsum dolor sit amet, consectetur adipiscing  
elit, sed do eiusmod tempor ...

@author: Ma Jerez
```
</td>
<td style='margin:0;padding:0'>

```txt
#Readme file for myComponent v0.1.3

Lorem ipsum dolor sit amet, consectetur adipiscing  
elit, sed do eiusmod tempor ...

@author: Ma Jerez
```
</td>
</tr>
</tbody>
</table>
<!-- prettier-ignore-end -->



```ts
//file: anygen.json
{
  "starterComponent": {
    "src": "anygen/templates/starterComponent",
    "dest": "lib/components/",
    "files": ["*/**"],
    "replace_name": ["starterComponent"]
    "transforms": {
      "version" : { //name of the parameter in command line
        "replace": "^v0\.1", // match and replaces 'v0.1'
        "files": "*/**.md", // executes only in markdown files
        "in_files": true,
        "in_paths": false
      }
    }
  }
}
```

**Transforms Config:**

The name of each entry in the transforms object is be used as parameter name in the `anygen` command.  
If the parameter is not passed in the `anygen` command the user will be asked in the console using [inquirer](https://github.com/SBoudrias/Inquirer.js).

<!-- prettier-ignore-start -->
*Transform Parameter* | Default Value | Optional | Description |
--------------------- | ------------- | -------- | ----------- |
*replace*             | ❌            | ❌      | regular expression to match |
*files*               | *             | ✔️      | glob patter to match files, all files matched by default |
*in_files*            | true          | ✔️      | only file content transformed by default |
*in_paths*            | false         | ✔️      | path names are not transformed by default |
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
## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)  

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*The software is provided "as is", without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose and noninfringement. In no event shall the authors or copyright holders be liable for any claim, damages or other liability, whether in an action of contract, tort or otherwise, arising from, out of or in connection with the software or the use or other dealings in the software.*

[Created by @Ma Jerez](https://github.com/M-jerez)
