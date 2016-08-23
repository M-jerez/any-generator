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

/**
 * Recursive function to store a directory three in result[]
 * @param $root
 * @param result
 */
function dirAsListSync($root:string,result:string[]){
	let p = path.normalize($root);
	let items =fsx.readdirSync(p);
	items.forEach((item)=>{
		let fileName = path.join(p,item);
		let stats = fsx.statSync(fileName);
		if(stats.isDirectory()){
			result.push(fileName);
			dirAsListSync(fileName,result);
		}else if(stats.isFile()){
			result.push(fileName);
		}
	});
}

/**
 * Returs an array caontaining all subdirectories and files of $root
 * @param $root
 * @returns {Array}
 */
export function listDir($root:string):string[]{
	let $fileList = [];
	dirAsListSync($root,$fileList);
	return $fileList;
}


