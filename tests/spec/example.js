define(['jquery', 'rfl'], function($, rfl) {
	var ajax = rfl.ajax;
	describe('Test rfl.ajax', function(){
		it('Should show the loading icon.', function(){
			ajax.showLoading();
			expect($('#ajax-loading').is(":hidden")).to.not.be.ok();
		});
		it('Should hide the loading icon.', function(){
			ajax.hideLoading();
			expect($('#ajax-loading').is(":hidden")).to.be.ok();
		});
	});
});
