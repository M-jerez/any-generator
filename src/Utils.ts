/**
 * Created by Ma jerez on 30/07/2016.
 */

import * as fsx from "fs-extra";
import * as path from "path";


/**
 * Replace All occurrences of the string 'search'  in 'target' with the value of 'replacement
 * @param target
 * @param search
 * @param replacement
 * @returns {string}
 */
export function replaceAll(target:string, search:string, replacement:string):string {
	return target.replace(new RegExp(search, 'g'), replacement);
}


/**
 * Check whether the given name contains only alphanumeric and underscore characters.
 * If the string is not compliant an Error is Thrown.
 * @param moduleName
 * @param nameConstrain
 * @returns {boolean}
 */
export function isComplaintName(moduleName:string,nameConstrain:RegExp){
	return !(moduleName.search(nameConstrain) == -1);
}



/**
 * Returns an array with the subdirectories of 'srcPath' (Non Recursive).
 * @param srcPath
 * @returns string[]
 */
export function getSubDirectoryNames(srcPath):string[]{
	return fsx.readdirSync(srcPath).filter(function(file) {
		return fsx.statSync(path.join(srcPath, file)).isDirectory();
	});
}



