var require = require || {
	debug: true,
	baseUrl: '/base/dist',
	paths: {
		'jquery': 'lib/jquery/jquery-1.9.1'
	},
	shim: {
		'jquery': {
			exports: 'jQuery'
		}
	}
};
