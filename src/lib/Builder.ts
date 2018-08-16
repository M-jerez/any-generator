/**
 * Created by Ma jerez on 30/07/2016.
 */


import {join, basename} from 'path';
import * as fsx from 'fs-extra';
import * as path from "path";
import {Blueprint} from "./Blueprint";
import {replaceAll, isComplaintName, getSubDirectoryNames, listDir} from "./utils";
import {Stats} from "fs";


/**
 * Builds scaffolding files and directories copying from a Blueprint src directory.
 *
 */
export class Builder {


	/**
	 * Stores all the blueprints
	 * @type {{}}
	 */
	private genStore: BlueprintStore = {};


	/**
	 * Alphanumeric and underscore regex, used to constrain the Name of new generated module.
	 * @type {RegExp}
	 */
	private static nameConstrain = /^[a-z0-9_]+$/i;


	/**
	 * Returns the regexp used to constrain the allowed module names
	 * @returns {RegExp}
	 */
	public static  getNameConstrain(): RegExp {
		return Builder.nameConstrain;
	}


	/**
	 * String to be replaced when build the blueprint, in any file or directory name, or withing the file content.
	 */
	private static replaceName = "__name__";


	/**
	 * Search for all the blueprint in the 'rootPath' and add them to the genreratorsRegistry
	 * @param rootPath
	 */
	addBlueprints(rootPath: string) {
		if (!fsx.existsSync(rootPath))
			throw new Error(`${rootPath} is not a Directory.`);
		let nRootPath = path.normalize(rootPath);
		let blueprints = Builder.findBlueprints(nRootPath);
		blueprints.forEach((blueprint: Blueprint)=> {
			var name = blueprint.name;
			if (typeof this.genStore[name] != 'undefined')
				throw new Error(`Duplicated blueprint ${name}. The blueprint already exists.`);
			else
				this.genStore[name] = blueprint;
		})
	}


	/**
	 * Returns an array containing all the names of the available blueprints.
	 * @returns {string[]}
	 */
	getBlueprintNames(): string[] {
		return Object.keys(this.genStore);
	}


	/**
	 * Builds a new directory structure based on the selected blueprint with 'blueprintName'.
	 *
	 * When building de directory structure of the blueprint is copied from the blueprint to
	 * the 'destPath'.
	 * All Directories, file Names and string occurrences matching the string '__name__' are replaced
	 * by the string 'moduleName'
	 *
	 * @param blueprintName
	 * @param moduleName
	 * @param destPath
	 * @returns {Array} a list of the files generated
	 */
	build(blueprintName: string, moduleName: string, destPath: string): string[] {

		if (!isComplaintName(moduleName, Builder.nameConstrain)) {
			throw new Error("Invalid argument 'moduleName'. Only characters, numbers and underscore allowed.")
		}

		// if (!fsx.statSync(destPath).isDirectory()) {
		// 	throw new Error(`Invalid argument 'destPath', ${destPath} is not a valid directory.`)
		// }

		try{
			fsx.ensureDirSync(destPath);
		}catch (err){
			throw new Error(`Error creating destination directory: ${destPath} `);
		}


		var blueprint = this.genStore[blueprintName];

		if (typeof blueprint != 'undefined') {
			let src_root = path.resolve(blueprint.path);
			let generatedList = [];
			let src_files = listDir(src_root);
			let destDirs: string[] = [];
			let destFiles: string[] = [];
			let destFilesContent: string[] = [];

			//parses all source files and generates its corresponding dest file name
			// if destFile already exists an exception is thrown
			src_files.forEach((filePath)=> {
				let stats = fsx.statSync(filePath);
				let dest = path.resolve(destPath);
				if (stats.isDirectory()) {
					let dest_dir = Builder.replacePath(filePath, src_root, dest, moduleName);
					destDirs.push(dest_dir);
					generatedList.push(dest_dir);
				} else if (stats.isFile()) {
					let dest_file = Builder.replacePath(filePath, src_root, dest, moduleName);
					let exist = true;
					try{
						exist = fsx.statSync(dest_file).isFile();
					}catch(e){
						//error has been thrown so file does not exists
						exist = false
					}

					if (exist) {
						throw new Error(`File : ${dest_file} already exists, can't Generate new '${moduleName}'`)
					}

					let content = fsx.readFileSync(filePath, "utf-8");
					let newContent = replaceAll(content, Builder.replaceName, moduleName);
					destFiles.push(dest_file);
					destFilesContent.push((newContent));
					generatedList.push(dest_file);
				}
			});

			//generates new directories
			for (let i = 0; i < destDirs.length; i++) {
				let dest_dir = destDirs[i];
				fsx.ensureDirSync(dest_dir);
			}


			//generate new files
			for (let i = 0; i < destFiles.length; i++) {
				let dest_file = destFiles[i];
				let newContent = destFilesContent[i];
				fsx.writeFileSync(dest_file, newContent, "utf-8");
			}

			return generatedList;
		} else {
			throw new Error(`Blueprint ${blueprintName} nor Found.`);
		}
	}




	/**
	 * Search for all the blueprints in a given 'rootPath'.
	 * A blueprint is any subdirectory of rootPaht containing another subdirectory named "__name__".
	 * The search is not recursive the blueprint needs to be a direct subdirectory of rootPath.
	 *
	 * rootPath
	 * +──  blueprint1
	 * |   └──  __name__
	 * |       +── __name__Controller.js
	 * |       +── __name__Controller.js
	 * |       └── __name__Template.html
	 * └──  blueprint2
	 *     └──  __name__
	 *         +── __name__Controller.js
	 *         +── __name__Controller.js
	 *         └── __name__Template.html
	 *
	 * @param rootPath
	 * @param callback
	 * @returns {Blueprint[]}
	 */
	static findBlueprints(rootPath: string): Blueprint[] {
		let found: Blueprint[] = [];

		let names = getSubDirectoryNames(rootPath);
		if (names.length == 0)
			throw  Error(`No Blueprint found in ${rootPath}`);


		names.forEach((blueprintName: string)=> {
			let name = blueprintName;
			let blueprintPath = path.join(rootPath, blueprintName);
			let blueprint = new Blueprint(name, blueprintPath);
			found.push(blueprint);
		});
		return found;
	}


	/**
	 * Gets a blueprint path and return the path required for the new generated file/directory
	 * @param path
	 * @param root
	 * @param dest
	 * @param moduleName
	 * @returns {string}
	 */
	private static replacePath(path: string, src_root: string, dest_root: string, moduleName: string): string {
		let destpath = path.replace(src_root, dest_root);
		return replaceAll(destpath, Builder.replaceName, moduleName);
	}

}


interface BlueprintStore {
	[key: string]: Blueprint;
}
