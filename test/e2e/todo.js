(function () {
	'use strict';

	describe('Todo', function() {
		it('should have a title', function() {
			browser.get('http://127.0.0.1:8888');

			expect(browser.getTitle()).toEqual('MileageTracker');
		});
	});

}());