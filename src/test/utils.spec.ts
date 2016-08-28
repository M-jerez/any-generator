/**
 * Created by Ma jerez on 02/08/2016.
 */

import * as util from "../lib/utils";
import {expect} from "chai";
import * as fsx from "fs-extra";
import * as path from "path";
import {Builder} from "../lib/Builder";

describe('util',function(){



	describe('replaceAll matches in  multiline string',function(){
		it('Should replace all matches of "__name__" in the View File',function(){
			let refFileV = fsx.readFileSync("tools/reference/refItem/refItemView.ts","utf8");
			let srcFileV = fsx.readFileSync("tools/blueprints/single-dir/__name__/__name__View.ts","utf8");
			let replacedV = util.replaceAll(srcFileV,"__name__","refItem");
			expect(replacedV).to.be.equal(refFileV);

		});

		it('Should replace all matches of "__name__" in the Model File',function(){
			let refFileM = fsx.readFileSync("tools/reference/refItem/refItemModel.ts","utf8");
			let srcFileM = fsx.readFileSync("tools/blueprints/single-dir/__name__/__name__Model.ts","utf8");
			let replacedM = util.replaceAll(srcFileM,"__name__","refItem");
			expect(replacedM).to.be.equal(refFileM);
		});

		it('Should replace all matches of "__name__" in the Controller File',function(){
			let refFileC = fsx.readFileSync("tools/reference/refItem/refItemController.ts","utf8");
			let srcFileC = fsx.readFileSync("tools/blueprints/single-dir/__name__/__name__Controller.ts","utf8");
			let replacedC = util.replaceAll(srcFileC,"__name__","refItem");
			expect(replacedC).to.be.equal(refFileC);
		});
	});



	describe('getSubDirectoryNames',function(){

		it('Should thrown an error when the directory does not exist... no such file or directory' ,function(){
			expect(function(){
				util.getSubDirectoryNames("./tools/false/dir");
			}).to.throw(/no such file or directory/);
		});

		it('Should return an array with a list of the first level subdirectories (non recursive)' +
			'ie: module09, Test, user_admin, userAdmin',function(){
			expect(util.getSubDirectoryNames("./tools/blueprints")).to.be.eql(["multiple-dir","single-dir"]);
			expect(util.getSubDirectoryNames("./tools/empty")).to.be.eql([]);
		});
	});



	describe('getDirAsListSync',function(){

		it('Should return an array with all directories and subdirectories within tools/reference' ,function(){
			let root = path.resolve("./tools/reference");
			let shouldGenerate = [
				path.join(root, "readme.md"),
				path.join(root, "refItem"),
				path.join(root, "refItem/refItemController.ts"),
				path.join(root, "refItem/refItemModel.ts"),
				path.join(root, "refItem/refItemView.ts"),
			];
			let generatedFiles = util.listDir(root);
			expect(generatedFiles).to.be.eql(shouldGenerate);
		});


	});

});
