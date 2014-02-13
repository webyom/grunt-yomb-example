define(function(require) {
	var $ = require('jquery');
	var foo = require('../package-dependancy/foo');

	return {
		bar: function() {
			alert('Hello world!');
		}
	};
});