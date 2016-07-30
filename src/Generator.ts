/**
 * Created by marlon.jerez on 29/07/2016.
 */





export class Generator{

	constructor(name:string,rootPath:string){

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
	 *
	 * @param rootPath
	 * @returns {Generator[]}
	 */
	static findGenerators(rootPath:string):Generator[]{
		let found:Generator[]=[];
		return found;
	}
}


process.argv.forEach(function (val, index, array) {
	console.log(index + ': ' + val);
});


