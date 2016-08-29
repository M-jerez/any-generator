/**
 * Created by Ma jerez on 29/08/2016.
 */

import {expect} from "chai";
import * as anygen from "../lib/anygen"

describe('Anygen', function () {

	describe('Anygen export the correc objects', function () {
		it('Should export builder, utils, and Blueprint ', function () {
			//this test doesn't really make sense in typescript, it would make sense for javascript
			expect(anygen.Builder).not.to.be.undefined;
			expect(anygen.Blueprint).not.to.be.undefined;
			expect(anygen.utils).not.to.be.undefined;
		});
	});

});
