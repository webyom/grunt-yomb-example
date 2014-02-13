(function() {
    define([ "require", "exports", "module", "jquery" ], function(require) {
        var $, foo;
        $ = require("jquery");
        foo = {};
        foo.bar = function() {
            return alert("Hello world!");
        };
        return foo;
    });
}).call(this);