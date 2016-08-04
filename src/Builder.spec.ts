/**
 * Created by Ma jerez on 01/08/2016.
 */


import {Builder} from "./Builder";
import {expect} from "chai";
import * as path from "path";


describe('Builder',function(){
	var builder = new Builder();
	//path must be relative to project root (from where the node script is called)
	var validPath = "./test/generators";
	var invalidPath = 'not/existing/path';
	var emptyPath = "./test/empty";
	var desPath = "./test/temp";

	describe('Wrong Generator Path',function(){
		it('Should thrown an Error when path not exist',function(){
			expect(function(){
				builder.addGenerators(invalidPath)
			}).to.throw(/is not a Directory/i);
		});
	});


	describe('Wrong Generator Path',function(){
		it("Should thrown an Error when the generator's root path is empty and no generators are detected.",function(){
			expect(function(){
				builder.addGenerators(emptyPath)
			}).to.throw(/No Generator found/i);
		});
	});




	describe('Generator Path test/generators',function(){
		it('Should create two generators [multiple-dir,single-dir]',function(){
			builder.addGenerators(validPath);
			expect(builder.getGeneratorNames()).to.eql(["multiple-dir","single-dir"])
		});
	});



	//this should be called after some generators has benn added.
	describe('Wrong Generator Path',function(){
		it('Should thrown an Error when a trying to add a generator that already exist (same name)',function(){
			expect(function(){
				builder.addGenerators(validPath)
			}).to.throw(/Duplicated generator/i);
		});
	});



	//this should be called after some generators has benn added.
	describe('Build "multiple-dir" success',function(){
		it('Should generate the missing directories and a list of files in the test/temp directory.',function(){
			//TODO
		});
	});


	//this should be called after some generators has benn added.
	describe('Build "single-dir" success',function(){
		it('Should generate the missing directories and a list of files in the test/temp directory. ' +
			'A new directory must be created with the name of the new module.',function(){
			//TODO
		});
	});


	describe('Module names should be limited to alphanumeric characters and underscore only',function(){

		it('Invalid moduleNames should thrown an error... only characters, numbers and underscore allowed',function(){
			let inValidNames = [
				"hello world",
				"-78ad",
				"@12323",
				"hello-world",
				"=&*poo",
			];


			inValidNames.map((moduleName)=>{
				expect(function(){
					builder.build("single-dir",moduleName,desPath);
				}).to.throw(/only characters, numbers and underscore allowed/i);
			});
		});


		it('Valid moduleNames should NOT thrown an error..  only characters, numbers and underscore allowed',function(){
			let validNames = [
				"helloworld",
				"HelloWorl",
				"2323_2323",
				"Hello_World",
				"Heloop234_8990_"
			];

			validNames.map((moduleName)=>{
				expect(function(){
					builder.build("single-dir",moduleName,desPath);
				}).to.not.throw(/only characters, numbers and underscore allowed/i);
			});

		});


	});







});

