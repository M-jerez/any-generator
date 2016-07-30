/**
 * Created by Ma jerez on 30/07/2016.
 */

import * as fs from "fs";


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
