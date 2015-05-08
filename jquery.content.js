
var Content = {
    html_templates: [],
    replacement_values: [],
    init: function(options) {
        $("img").each(function() {
            if (typeof $(this).data("src") != "undefined") {
                var src = $(this).data("src");
                $(this).attr("src", src.replace(":uploads_folder:", API.get_uploads_folder()));
            }
        })
    },

    loop: function(object, records) {
        var self = this;
        
        if (!self.html_template[object]) {
            self.html_template[object] = $('[data-content-loop=' + object + ']').html();
        }

        if (records.length === 0) {
            $('[data-content-loop=' + object + ']').hide();
        } else {

            $('[data-content-loop=' + object + ']').each(function() {
                var loop_object = $(this);
                $(this).empty();

                $.each(records, function(key, values) {
                    var html = self.html_template[object];

                    values.count = key+1;
                    html = self.parse_tags(object, html, values);
                    //console.log(html_template, object, html, values);

                    loop_object.append(html).show(0);
                })
            }).css("visibility", "visible");
        }
    },
    reload: function(object, records) {
        var self = this;
        $('[data-content-loop=' + object + ']').html(self.html_template[object]);
        self.loop(object, records);
    },
    parse: function(object, values) {
        var self = this;
        var html = $("#" + object).html();

        $(object).css("visibility", "hidden");
        html = self.parse_tags(object, html, values);
        $(object).css("visibility", "show");
        $("#" + object).html(html);
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

        if (typeof(values) === "object") {
            $.each(values, function(key, value) {
                newNodes = nodes ? nodes.slice() : [];
                newNodes.push(key);

                if (typeof(value) === "object" && value !== null) {
                    self.parse_values(object, value, newNodes);
                } else {
                    //console.log(parse_nodes(newNodes), value);
                    var replacer = object + '.' + self.parse_nodes(newNodes);
                    self.replacement_values[replacer] = value;
                }
            });
        }
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
    parse_tags: function(object, input, values) {
        var self = this;
        
        self.parse_values(object, values);

        $.each(self.find_all_tags(input), function(i, tag) {
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
            input = input.replaceAll(replacer, value);
        });

        return input;
    }
}

$(window).bind('hashchange', function() {   
    Content.html_template = [];
}).load(function() {
    Content.html_template = [];
});
