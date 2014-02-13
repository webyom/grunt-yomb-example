define([ "require", "exports", "module", "jquery" ], function(require) {
    var $ = require("jquery");
    var foo = {};
    foo.bar = function() {
        alert("Hello world!");
    };
    return foo;
});