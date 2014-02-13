define(function(require) {
	var $ = require('jquery');
	var foo = require('../simple/foo');

	return {
		baz: function() {
			foo.bar();
		}
	};
});