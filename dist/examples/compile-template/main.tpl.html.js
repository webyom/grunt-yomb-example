define("./items.tpl.html", [ "require", "exports", "module", "jquery" ], function(require, exports, module) {
    function $encodeHtml(str) {
        return (str + "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/`/g, "&#96;").replace(/'/g, "&#39;").replace(/"/g, "&quot;");
    }
    exports.render = function($data, $opt) {
        $data = $data || {};
        var _$out_ = [];
        var $print = function(str) {
            _$out_.push(str);
        };
        (function() {
            with ($data) {
                var $ = require("jquery");
                $.each(items, function(i, item) {
                    _$out_.push("<li>", $encodeHtml(item.name), "</li>");
                });
            }
        })();
        return _$out_.join("");
    };
});

define([ "require", "exports", "module", "jquery", "./items.tpl.html" ], function(require, exports, module) {
    function $encodeHtml(str) {
        return (str + "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/`/g, "&#96;").replace(/'/g, "&#39;").replace(/"/g, "&quot;");
    }
    exports.render = function($data, $opt) {
        $data = $data || {};
        var _$out_ = [];
        var $print = function(str) {
            _$out_.push(str);
        };
        (function() {
            with ($data) {
                var $ = require("jquery");
                var itemsTpl = require("./items.tpl.html");
                _$out_.push("<ul>", itemsTpl.render($data), "</ul><ul>");
                (function() {
                    with ($data) {
                        var $ = require("jquery");
                        $.each(items, function(i, item) {
                            _$out_.push("<li>", item.name, "</li>");
                        });
                    }
                })();
                _$out_.push("</ul>");
            }
        })();
        return _$out_.join("");
    };
});