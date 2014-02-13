define("../simple/foo", [ "require", "exports", "module", "jquery", "../package-dependancy/foo" ], function(require) {
    var $ = require("jquery");
    var foo = require("../package-dependancy/foo");
    return {
        bar: function() {
            alert("Hello world!");
        }
    };
});

define("./bar", [ "require", "exports", "module", "jquery", "../simple/foo" ], function(require) {
    var $ = require("jquery");
    var foo = require("../simple/foo");
    return {
        baz: function() {
            foo.bar();
        }
    };
});

define("./foo", [ "require", "exports", "module", "jquery", "./bar" ], function(require) {
    var $ = require("jquery");
    var bar = require("./bar");
    return {
        bar: function() {
            bar.baz();
        }
    };
});

define([ "require", "exports", "module", "jquery", "./foo" ], function(require) {
    var $ = require("jquery");
    var foo = require("./foo");
    return {
        bar: function() {
            foo.bar();
        }
    };
});