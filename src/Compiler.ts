/**
 * Created by Ma jerez on 30/07/2016.
 */


import {join, basename} from 'path';
import {COPY,PATH,GENERATORS} from './index';
import * as fs from "fs";
import * as fsx from 'fs-extra';
import {Generator} from "./Generator";



interface GeneratorStore{
	[key: string]: Generator;
}

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
	 * String to be replaced when build the generator, in any file or directory name, or withing the file content.
	 */
	private static replaceName = "__name__";




	constructor(){

	}


	/**
	 * Search for all the generator in the 'rootPath' and ad them to the genreratorsRegistry
	 * @param path
	 */
	addGenerators(rootPath:string){

	}

	/**
	 * Add a new generator Rooth path from an npm compatible package.
	 */
	addGeneratorFromPackage(){

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
	build(generatorName:string,moduleName:string,destPath:string){
		var generator = GENERATORS[genName];

		if(generator){
			var pattern =  generator.pattern;
			var src_dir = join(generator.src_dir,generator.pattern);
			var dest_dir = join(generator.dest_dir,newName);

			if(checkExist(dest_dir)){
				gutil.log(gutil.colors.red("Dest directory "+dest_dir+" is not empty."));
				done();
				return;
			}
			fsx.ensureDirSync(dest_dir);
			fsx.walk(src_dir)
				.on('data', function (item) {
					if(!item.stats.isDirectory()){
						var basen = basename(item.path);
						var newFile = 	join(generator.dest_dir,newName,basen.replace(pattern,newName));
						var content = fs.readFileSync(item.path, "utf-8");
						var newContent = replaceAll(content,pattern,newName);
						fs.writeFileSync(newFile,newContent,"utf-8");
					}
				})
				.on('end', function () {
					gutil.log(gutil.colors.cyan("Component "+newName+" cretaed in: "),dest_dir);
					done();
				})
		}else{
			gutil.log(gutil.colors.red(`Cant find the generator '${genName}'`));
			done();
		}
	}


	/**
	 * Check whether the given name contains only alphanumeric and underscore characters.
	 * If the string is not compliant an Error is Thrown.
	 * @param moduleName
	 */
	isComplaintName(moduleName:string){
		if (moduleName.search(AnyGenerator.nameConstrain) == -1){
			throw new Error("Invalid argument 'moduleName', only characters ,  numbers and underscore allowed.")
		}else{
			return true;
		}
	}


	/**
	 * Checks if the 'generatorPath' is an existing directory.
	 * @param generatorPath
	 * @returns {boolean}
	 */
	checkGeneratorExists(generatorPath){
		try {
			var stats = fs.lstatSync(generatorPath);
			return stats.isDirectory();
		}catch (error) {
			return false;
		}
	}
}
