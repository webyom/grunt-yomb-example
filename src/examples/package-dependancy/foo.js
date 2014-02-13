define(function(require) {
	var $ = require('jquery');
	var bar = require('./bar');

	return {
		bar: function() {
			bar.baz();
		}
	};
});