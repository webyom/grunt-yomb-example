define([ "require", "exports", "module", "jquery" ], function(require, exports, module) {
    var $ = require("jquery");
    var foo = {};
    foo.bar = function() {
        alert("Hello world!");
    };
    module.exports = foo;
});