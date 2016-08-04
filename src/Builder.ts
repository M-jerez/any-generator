/**
 * Created by Ma jerez on 30/07/2016.
 */


import {join, basename} from 'path';
import * as fsx from 'fs-extra';
import * as path from "path";
import {Generator} from "./Generator";
import {replaceAll,isComplaintName, getSubDirectories} from "./utils";
import {Stats} from "fs";


/**
 * Generates scaffolding for any project.
 * It uses one directory as generator and wen
 */
export class Compiler{


	/**
	 * Stores all the generators
	 * @type {{}}
	 */
	private genStore:GeneratorStore={};


	/**
	 * Alphanumeric and underscore regex, used to constrain the Name of new generated module.
	 * @type {RegExp}
	 */
	private static nameConstrain = /^[a-z0-9_]+$/i;


	/**
	 * Returns the regexp used to constrain the allowed module names
	 * @returns {RegExp}
     */
	public static  getNameConstrain():RegExp{
		return Compiler.nameConstrain;
	}


	/**
	 * String to be replaced when build the generator, in any file or directory name, or withing the file content.
	 */
	private static replaceName = "__name__";



	/**
	 * Search for all the generator in the 'rootPath' and add them to the genreratorsRegistry
	 * @param rootPath
	 */
	addGenerators(rootPath:string){
		if(!fsx.existsSync(rootPath))
			throw new Error(`${rootPath} is not a Directory.`);
		let nRootPath =  path.normalize(rootPath);
		let generators = Compiler.findGenerators(nRootPath);
		generators.forEach((generator:Generator)=>{
			var name = generator.name;
			if (typeof this.genStore[name] != 'undefined')
				throw new Error(`Duplicated generator ${name}. The generator already exists.`);
			else
				this.genStore[name] = generator;
		})
	}


	/**
	 * Returns an array containing all the names of the available generators.
	 * @returns {string[]}
     */
	getGeneratorNames():string[]{
		return Object.keys(this.genStore);
	}



	/**
	 * Builds a new directory structure based on the selected generator with 'generatorName'.
	 *
	 * When building de directory structure of the generator is copied from the generator to
	 * the 'destPath'.
	 * All Directories, file Names and string occurrences matching the string '__name__' are replaced
	 * by the string 'moduleName'
	 * @param generatorName
	 * @param moduleName
	 * @param destPath
	 */
	compile(generatorName:string,moduleName:string,destPath:string){

		if (!isComplaintName(moduleName,Compiler.nameConstrain)){
			throw new Error("Invalid argument 'moduleName'. Only characters, numbers and underscore allowed.")
		}

		var generator = this.genStore[moduleName];

		if(typeof generator != 'undefined'){
			var pattern =  Compiler.replaceName;
			var src_dir = join(generator.path,pattern);
			var dest_dir = join(destPath,moduleName);



			fsx.walk(src_dir)
				.on('data', function (item) {
					let stats: Stats= <Stats>item.stats;
					if(stats.isDirectory()){
						fsx.ensureDirSync(dest_dir);
					}else if(stats.isFile()){
						var basen = basename(item.path);
						var newFile = 	join(destPath,moduleName,basen.replace(pattern,moduleName));
						var content = fsx.readFileSync(item.path, "utf-8");
						var newContent = replaceAll(content,pattern,moduleName);
						fsx.writeFileSync(newFile,newContent,"utf-8");
					}
				})
				.on('end', function () {

				})
		}else{
			throw new Error (`Generator ${generatorName} nor Found.`);
		}
	}


	/**
	 * Search for all the generators in a given 'rootPath'.
	 * A generator is any subdirectory of rootPaht containing another subdirectory named "__name__".
	 * The search is not recursive the generator needs to be a direct subdirectory of rootPath.
	 *
	 * rootPath
	 * +──  generator1
	 * |   └──  __name__
	 * |       +── __name__Controller.js
	 * |       +── __name__Controller.js
	 * |       └── __name__Template.html
	 * └──  generator2
	 *     └──  __name__
	 *         +── __name__Controller.js
	 *         +── __name__Controller.js
	 *         └── __name__Template.html
	 *
	 * @param rootPath
	 * @param callback
	 * @returns {Generator[]}
     */
	static findGenerators(rootPath:string):Generator[]{
		let found:Generator[]=[];

		let subdirs = getSubDirectories(rootPath);
		if(subdirs.length == 0)
			throw  Error(`No Generator found in ${rootPath}`);


		subdirs.forEach((generatorPath:string)=>{
			let name = path.basename(generatorPath);
			let generator = new Generator(name,generatorPath);
			found.push(generator);
		});
		return found;
	}

}



interface GeneratorStore{
	[key: string]: Generator;
}
