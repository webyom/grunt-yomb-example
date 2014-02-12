var ROOT = (location.pathname.match(/(.*?\/)static\//) || ['/', '/'])[1];

var G = G || {
	DOMAIN: document.domain,

	ORIGIN: location.protocol + "//" + location.host,
	CGI_ORIGIN: location.protocol + "//" + location.host,
	CDN_ORIGIN: location.protocol + "//" + location.host,

	BASE: '' ? '' : ROOT + 'static/',
	CGI_BASE: '' ? '' : ROOT,
	CDN_BASE: '' ? '' : ROOT + 'static/',

	LANG: 'en',

	pageTime: [new Date()]
};

if(G.LANG.indexOf('%{{') === 0) {
	G.LANG = 'en';
}
