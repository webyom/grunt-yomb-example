// Make async.
if (window.__karma__) {
	window.__karma__.loaded = function() {};
}

var tests = [];
for (var file in window.__karma__.files) {
  if (window.__karma__.files.hasOwnProperty(file)) {
    if((/\/tests\/spec\//).test(file)) {
    	tests.push(file);
    }
  }
}

require(tests, function() {
	window.__karma__.start();
});
