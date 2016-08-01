/**
 * Created by Ma jerez on 01/08/2016.
 */


import {Compiler} from "./Compiler";
import {expect,assert} from "chai";
import * as path from "path";


describe('Compiler',function(){
	var compiler = new Compiler();
	//path must be relative to project root (from where the node script is called)
	var validPath = "./test/generators";
	var invalidPath = 'not/existing/path';
	var emptyPath = "./test/empty";

	describe('Wrong Generator Path',function(){
		it('Should thrown an Error when path not exist',function(){
			expect(function(){
				compiler.addGenerators(invalidPath)
			}).to.throw(/is not a Directory/i);
		});
	});


	describe('Wrong Generator Path',function(){
		it("Should thrown an Error when the generator's root path is empty and no generators are detected.",function(){
			expect(function(){
				compiler.addGenerators(emptyPath)
			}).to.throw(/No Generator found/i);
		});
	});




	describe('Generator Path test/generators',function(){
		it('Should create two generators [multiple-dir,single-dir]',function(){
			compiler.addGenerators(validPath);
			expect(compiler.getGeneratorNames()).to.eql(["multiple-dir","single-dir"])
		});
	});



	//this should be called after some generators has benn added.
	describe('Wrong Generator Path',function(){
		it('Should thrown an Error when a trying to add a generator that already exist (same name)',function(){
			expect(function(){
				compiler.addGenerators(validPath)
			}).to.throw(/Duplicated generator/i);
		});
	});






});

