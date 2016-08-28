/**
 * Created by marlon.jerez on 29/07/2016.
 */


/**
 * Blueprints are the directories used as templates or 'blueprints' for the new generated modules.
 */
export class Blueprint {


	/**
	 * Blueprint path: <code>name</code> + <code>path</code>
	 * @param name
	 * @param path
	 */
	constructor(/**
				 * The name of the Blueprint, it should be equivalend to a directory name
				 */
				public name: string,
				/**
				 *  The root directory where the blueprint is located
				 */
				public path: string) {

	}
}




