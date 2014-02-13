define(function(require) {
	var $ = require('jquery');
	var foo = require('./foo');

	return {
		bar: function() {
			foo.bar();
		}
	};
});