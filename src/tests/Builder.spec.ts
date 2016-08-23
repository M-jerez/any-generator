/**
 * Created by Ma jerez on 01/08/2016.
 */


import {Builder} from "../lib/Builder";
import * as fsx from "fs-extra";
import {expect} from "chai";
import * as path from "path";
import * as rimraf from "rimraf";
import * as utils from "../lib/utils";

describe('Builder', function () {
	var builder = new Builder();
	//path must be relative to project root (from where the node script is called)
	var validPath = "./test/blueprints";
	var validPath = "./test/blueprints";
	var invalidPath = 'not/existing/path';
	var emptyPath = "./test/empty";
	var tempPath = "./test/temp";

	describe('Wrong BlueprintBlueprint Path', function () {
		it('Should thrown an Error when path not exist', function () {
			expect(function () {
				builder.addBlueprints(invalidPath)
			}).to.throw(/is not a Directory/i);
		});
	});


	describe('Wrong BlueprintBlueprint Path', function () {
		it("Should thrown an Error when the blueprint's root path is empty and no blueprints are detected.", function () {
			expect(function () {
				builder.addBlueprints(emptyPath)
			}).to.throw(/No Blueprint found/i);
		});
	});


	describe('BlueprintBlueprint Path test/blueprints', function () {
		it('Should create two blueprints [multiple-dir,single-dir]', function () {
			builder.addBlueprints(validPath);
			expect(builder.getBlueprintNames()).to.eql(["multiple-dir", "single-dir"])
		});
	});


	//this should be called after some blueprints has been added.
	describe('Wrong BlueprintBlueprint Path', function () {
		it('Should thrown an Error when a trying to add a blueprint that already exist (same name)', function () {
			expect(function () {
				builder.addBlueprints(validPath)
			}).to.throw(/Duplicated blueprint/i);
		});
	});


	describe('Module names accept only alphanumeric characters and underscore only.', function () {

		it('Invalid moduleNames should thrown an error... only characters, numbers and underscore allowed', function () {
			let inValidNames = [
				"hello world",
				"-78ad",
				"@12323",
				"hello-world",
				"=&*poo",
			];

			inValidNames.map((moduleName)=> {
				expect(function () {
					builder.build("single-dir", moduleName, tempPath);
				}).to.throw(/only characters, numbers and underscore allowed/i);
			});
			rimraf.sync(tempPath);
		});


		it('Valid moduleNames should NOT thrown an error..  only characters, numbers and underscore allowed', function () {
			let validNames = [
				"helloworld",
				"HelloWorl",
				"2323_2323",
				"Hello_World",
				"Heloop234_8990_"
			];

			validNames.map((moduleName)=> {
				expect(function () {
					builder.build("single-dir", moduleName, tempPath);
				}).to.not.throw(/only characters, numbers and underscore allowed/i);
			});
			rimraf.sync(tempPath);
		});
	});


	//this should be called after some blueprints has benn added.
	describe('Build "multiple-dir"', function () {
		it('Should generate the missing directories and a list of files in the test/temp directory.', function () {
			rimraf.sync(tempPath);
			fsx.ensureDirSync(tempPath);
			let root = path.resolve(tempPath);
			//the order must be the same of the order returned by utils
			// dirA
			// --- sunFileA
			// dirB
			// ----sunFileB1
			// ----sunFileB2
			let shouldGenerate = [
				path.join(root, "controllers"),
				path.join(root, "controllers/testModuleController.ts"),
				path.join(root, "models"),
				path.join(root, "models/testModuleModel.ts"),
				path.join(root, "views"),
				path.join(root, "views/testModuleView.ts"),
			];
			builder.build("multiple-dir", "testModule", tempPath);
			let generatedFiles = utils.listDir(root);
			expect(generatedFiles).to.be.eql(shouldGenerate);
			rimraf.sync(tempPath);
		});
	});


	//this should be called after some blueprints has benn added.
	describe('Build "single-dir" success', function () {
		it('Should generate the missing directories and a list of files in the test/temp directory. ' +
			'A new directory must be created with the name of the new module.', function () {
			rimraf.sync(tempPath);
			fsx.ensureDirSync(tempPath);
			let root = path.resolve(tempPath);
			//the order must be the same of the order returned by utils
			// dirA
			// --- sunFileA
			// dirB
			// ----sunFileB1
			// ----sunFileB2
			let shouldGenerate = [
				path.join(root, "refItem"),
				path.join(root, "refItem/refItemController.ts"),
				path.join(root, "refItem/refItemModel.ts"),
				path.join(root, "refItem/refItemView.ts"),
			];

			builder.build("single-dir", "refItem", tempPath);
			let generatedFiles = utils.listDir(root);
			expect(generatedFiles).to.be.eql(shouldGenerate);
			rimraf.sync(tempPath);
			//TODO check the content of the files is the same, this is tested in in utils.specs.ts too.
		});
	});

});

