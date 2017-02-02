var Content = {
    html_templates: {},
    replacement_values: [],
    init: function(options) {
        var self = this;
        $("img").each(function() {
            if (typeof $(this).data("src") != "undefined") {
                var src = $(this).data("src");
                $(this).attr("src", src.replace(":uploads_folder:", API.get_uploads_folder()));
            }
        });

        $("[data-content-parse]").each(function(){
            var object = $(this).data("content-parse");
            Content.html_templates[object] = $(this).html();
        })
    },
    parse: function(object, values) {
        var self = this;
        var html = $("[data-content-parse="+object+"]").html();

        if (typeof self.html_templates[object] === "undefined") {
            self.html_templates[object] = html;
        }

        html = self.html_templates[object];

        $('[data-content-parse='+object+']').html(html);

        self.parse_tags(object, html, values, function() {
            $.each(self.find_all_tags(html), function(i, tag) {
                var split = tag.split("|");
                var key = split[0];

                if (split[1]) {
                    var action = split[1].toString().trim();
                    //console.log(action);
                    var value = window[action](self.replacement_values[key]);
                } else {
                    var value = self.replacement_values[key];
                }
                //console.log("Tags", tag, value);

                var replacer = '{' + tag + '}';
                html = html.replaceAll(replacer, value);
            });
            $("[data-content-parse=" + object + "]").html(html);
            $("[data-content-parse=" + object + "]")
                .css("visibility", "visible")
                .css("display", "block");
        });

    },
    loop: function(object, records, callback) {
        var self = this;

        if (typeof self.html_templates[object] === "undefined") {
            self.html_templates[object] = $('[data-content-loop=' + object + ']').html();
        }

        $('[data-content-loop=' + object + ']').html(self.html_templates[object]);

        if (records.length === 0) {
            $('[data-content-loop=' + object + ']').css("visibility", "hidden").hide();
            $('[data-content-loop-notfound=' + object + ']').show();
        } else {

            $('[data-content-loop=' + object + ']').each(function() {
                var loop_object = $(this);
                var object = $(this).data("content-loop");
                $(this).empty();

                $.each(records, function(key, values) {
                    var html = self.html_templates[object];

                    values.count = key + 1;

                    self.parse_tags(object, html, values, function() {
                        var output = html;
                        $.each(self.find_all_tags(html), function(i, tag) {
                            var split = tag.split("|");
                            var key = split[0];

                            if (split[1]) {
                                var action = split[1].toString().trim();
                                //console.log(action);
                                var value = window[action](self.replacement_values[key]);
                            } else {
                                var value = self.replacement_values[key];
                            }
                            //console.log("Tags", tag, value);

                            var replacer = '{' + tag + '}';
                            output = output.replaceAll(replacer, value);
                        });
                        loop_object.append(output);
                    });

                    //console.log(html_templates, object, html, values);
                });

                //console.log(object);
                $('[data-content-loop-notfound=' + object + ']').hide();
                $(this).css("visibility", "visible").show();
            });

            if (typeof callback === "function") {
                setTimeout(function() {
                    callback();
                }, 1000);
            }

        }

        setTimeout(function() {
            $('img').each(function() {
                $(this).load(function() {
                    if (!this.complete || typeof this.naturalWidth == "undefined" || this.naturalWidth == 0) {
                        // image was broken, replace with your new image
                        this.src = '/_assets/images/noimage.gif';
                    }
                });
            });
        }, 1000);

    },
    loop_add: function(object, records, callback) {
        var self = this;

        $('[data-content-loop=' + object + ']').each(function() {
            var loop_object = $(this);
            var object = $(this).data("content-loop");

            $.each(records, function(key, values) {
                var html = self.html_templates[object];

                values.count = key + 1;

                self.parse_tags(object, html, values, function() {
                    var output = html;
                    $.each(self.find_all_tags(html), function(i, tag) {
                        var split = tag.split("|");
                        var key = split[0];

                        if (split[1]) {
                            var action = split[1].toString().trim();
                            //console.log(action);
                            var value = window[action](self.replacement_values[key]);
                        } else {
                            var value = self.replacement_values[key];
                        }
                        //console.log("Tags", tag, value);

                        var replacer = '{' + tag + '}';
                        output = output.replaceAll(replacer, value);
                    });
                    loop_object.append(output);
                });

                //console.log(html_templates, object, html, values);
            });

        });

        if (typeof callback === "function") {
            setTimeout(function() {
                callback();
            }, 1000);
        }
    },
    reload: function(object, records) {
        var self = this;
        $('[data-content-loop=' + object + ']').html(self.html_templates[object]);
        self.loop(object, records);
    },
    hide: function(object) {
        $("#" + object).css("visibility", "hidden");
    },
    find_all_tags: function(str) {
        // "\{.*?\}"
        var results = [],
            re = /{([^}]+)}/g,
            text;

        while (text = re.exec(str)) {
            results.push(text[1]);
        }
        return results;
    },
    parse_values: function(object, values, nodes) {
        var self = this;

        //console.log(object, typeof(values), values, Object.keys(values).length);

        $.each(values, function(key, value) {
            newNodes = nodes ? nodes.slice() : [];
            newNodes.push(key);

            value = (value === null || value === "") ? "&nbsp;" : value;

            if (typeof(value) === "object") {
                self.parse_values(object, value, newNodes);
            } else {
                //console.log(object + '.' + parse_nodes(newNodes), value);
                var replacer = object + '.' + self.parse_nodes(newNodes);
                self.replacement_values[replacer] = value;
            }
        });
    },
    parse_nodes: function(nodes) {
        var output = "";
        $.each(nodes, function(i, node) {
            if (i === 0) {
                output += node;
            } else {
                output += "." + node;
            }
        })
        return output;
    },
    parse_tags: function(object, input, values, callback) {
        var self = this;
        self.parse_values(object, values);
        callback();
    }
}
Content.init();

$(window).bind('hashchange', function() {
    //Content.html_templates = [];
}).load(function() {
    //Content.html_templates = [];
});
