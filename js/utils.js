(function() {
    var escapeData = "\\|\\|2 \r|r|1 \n|n|1 \t|t|1",
		tmplComponent = new (function() {
			var escapeRegexpStr = "",
				unescapeRegexpStr = "\\\\(",
				separator = "",
				escapeRegexp,
				unescapeRegexp;
			escapeData.split(" ").forEach(function(str) {
				var values = str.split("|");
				this[values[0]] = values[1];
				this[values[1]] = values[0];
				escapeRegexpStr += separator + (values[2]==0 ? "" : "\\") + values[1];
				unescapeRegexpStr += separator + (values[2]!=2 ? "" : "\\") + values[1];
				separator = "|";
			}, this);
			escapeRegexp = new RegExp(escapeRegexpStr, "g");
			unescapeRegexp = new RegExp(unescapeRegexpStr+")", "g");
			this.getRegexp = function(escUnesc) {
				return escUnesc != "unesc" ? escapeRegexp : unescapeRegexp;
			};
		});
	
	this.utils = {};
	this.utils.template = function(tmplStr, context) {
        var rules = {
				evaluate: /<%([\s\S]+?)%>/g,
				interpolate: /<%=([\s\S]+?)%>/g,
				forced: /<\/%|%\/>/g
			},
			unescape = function(code) {
				return code.replace(tmplComponent.getRegexp("unesc"), function (match) {
					return tmplComponent[match];
				});
			},
			funcBody = "res += '" + tmplStr.replace(tmplComponent.getRegexp(), function (match) {
				return '\\' + tmplComponent[match];
            }).replace(rules.interpolate, function(subStr, tmplCode) {
                return "'+" + unescape(tmplCode) + "+'";
            }).replace(rules.evaluate, function(subStr, tmplCode) {
                return "';\n" + unescape(tmplCode) + "\nres += '";
            }).replace(rules.forced, function(subStr) {
                return subStr[0] + subStr[2];
            }) + "';\n";
        funcBody = "var res = '';\nfunction print()\n{\nres += Array.prototype.join.call(arguments,'')\n}\n" +
            "with (data || {})\n{\n" + funcBody + "}\nreturn res;";
        return (new Function("data",funcBody)).bind(context);
	};
	this.utils.getTemplateHTML = function(id) {
		var elem = document.getElementById(id);
		return elem ? elem.innerHTML.trim() : "";
	};
	this.utils.insertElement = function(html, id) {
		var container = document.getElementById(id);
		if (container) {
			container.innerHTML = html;
		}
	};
	this.utils.eventOn = function(name, selector, callback) {
		if (typeof name === "string" && typeof callback === "function") {
			var type = typeof selector;
			if (type === "string") {
				document.querySelectorAll(selector || null).forEach(function(elem) {
					elem.addEventListener(name, callback);
				});
			} else if (type = "object") {
				selector.addEventListener(name, callback);
			}
		}
	};
})();