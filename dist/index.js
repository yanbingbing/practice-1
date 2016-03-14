/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(1);
	__webpack_require__(5);
	__webpack_require__(19);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(2);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./../node_modules/less-loader/index.js!./index.less", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./../node_modules/less-loader/index.js!./index.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports
	
	
	// module
	exports.push([module.id, "#demo1,\n#demo2 {\n  height: 600px;\n  padding: 50px;\n}\n#demo1 {\n  background: white;\n}\n#demo2 {\n  background: #4b4b4b;\n}\n", ""]);
	
	// exports


/***/ },
/* 3 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(React) {'use strict';
	
	__webpack_require__(7);
	var ReactDOM = __webpack_require__(9);
	var Icon = __webpack_require__(10);
	
	ReactDOM.render(React.createElement(
	    'div',
	    null,
	    React.createElement(Icon, { name: 'smile', className: 'emoji smile' }),
	    React.createElement(Icon, { name: 'cry', className: 'emoji cry' }),
	    React.createElement(Icon, { name: 'angry', className: 'emoji angry' }),
	    React.createElement(Icon, { name: 'happy', className: 'emoji happy' })
	), document.getElementById('demo1'));
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = window.React;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(8);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./../node_modules/less-loader/index.js!./icons.less", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./../node_modules/less-loader/index.js!./icons.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports
	
	
	// module
	exports.push([module.id, ".emoji {\n  margin: 5px;\n}\n.emoji.smile path:nth-child(2) {\n  fill: #ff3a3a;\n}\n.emoji.cry path:nth-child(4),\n.emoji.cry path:nth-child(5) {\n  fill: #cd2079;\n}\n", ""]);
	
	// exports


/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = window.ReactDOM;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	__webpack_require__(11);
	var React = __webpack_require__(6);
	
	function getIcon(name) {
	    try {
	        return __webpack_require__(13)("./" + name + '.svg');
	    } catch (ex) {
	        return null;
	    }
	}
	
	var Icon = function (_React$Component) {
	    _inherits(Icon, _React$Component);
	
	    function Icon() {
	        _classCallCheck(this, Icon);
	
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Icon).apply(this, arguments));
	    }
	
	    _createClass(Icon, [{
	        key: 'render',
	        value: function render() {
	            var SvgIcon = getIcon(this.props.name);
	            if (!SvgIcon) {
	                return null;
	            }
	            return React.createElement(SvgIcon, { className: "icon" + (this.props.className ? ' ' + this.props.className : '') });
	        }
	    }]);
	
	    return Icon;
	}(React.Component);
	
	module.exports = Icon;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(12);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/less-loader/index.js!./index.less", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/less-loader/index.js!./index.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports
	
	
	// module
	exports.push([module.id, ".icon {\n  max-height: 30px;\n  max-width: 30px;\n}\n", ""]);
	
	// exports


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./angry.svg": 14,
		"./check.svg": 15,
		"./cry.svg": 16,
		"./happy.svg": 17,
		"./smile.svg": 18
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 13;


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var React = __webpack_require__(6);
	
	module.exports = React.createClass({
	
	    displayName: "Angry",
	
	    getDefaultProps: function getDefaultProps() {
	        return { "version": "1.1", "xmlns": "http://www.w3.org/2000/svg", "x": "0px", "y": "0px", "width": "1024px", "height": "1024px", "viewBox": "0 0 1024 1024", "enableBackground": "new 0 0 1024 1024" };
	    },
	    render: function render() {
	        var props = this.props;
	
	        return React.createElement(
	            "svg",
	            props,
	            React.createElement("path", { className: "svgpath", dataIndex: "path_0", fill: "#f00", d: "M512 1024c282.784 0 512-229.216 512-512s-229.216-512-512-512-512 229.216-512 512 229.216 512 512 512zM512 96c229.76 0 416 186.24 416 416s-186.24 416-416 416-416-186.24-416-416 186.24-416 416-416zM704.096 780.736c-39.168-65.152-110.528-108.736-192.096-108.736s-152.928 43.584-192.096 108.736l-82.336-49.408c55.968-93.056 157.92-155.36 274.432-155.36s218.464 62.272 274.432 155.36l-82.336 49.408zM767.04 280.256c4.288 17.152-6.144 34.528-23.296 38.816-17.632 4.448-38.528 12.128-56.928 21.344 10.656 11.424 17.184 26.752 17.184 43.616 0 35.36-28.64 64-64 64s-64-28.64-64-64c0-1.184 0.032-2.336 0.096-3.488 2.048-47.456 45.216-78.944 81.6-97.152 34.752-17.376 69.088-26.048 70.56-26.432 17.152-4.288 34.528 6.144 38.816 23.296zM256.96 280.256c4.288-17.152 21.664-27.584 38.816-23.296 1.44 0.352 35.808 9.056 70.56 26.432 36.384 18.208 79.552 49.696 81.6 97.152 0.064 1.152 0.096 2.304 0.096 3.488 0 35.36-28.64 64-64 64s-64-28.64-64-64c0-16.864 6.528-32.16 17.184-43.616-18.4-9.216-39.296-16.896-56.928-21.344-17.152-4.288-27.552-21.664-23.296-38.816z" })
	        );
	    }
	});

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var React = __webpack_require__(6);
	
	module.exports = React.createClass({
	
	    displayName: "Check",
	
	    getDefaultProps: function getDefaultProps() {
	        return { "xmlns": "http://www.w3.org/2000/svg", "x": "0px", "y": "0px", "width": "1024px", "height": "1024px", "viewBox": "0 0 1024 1024", "enableBackground": "new 0 0 1024 1024" };
	    },
	    render: function render() {
	        var props = this.props;
	
	        return React.createElement(
	            "svg",
	            props,
	            React.createElement("path", { className: "svgpath", dataIndex: "path_1", fill: "#92ff41", d: "M494.92802 698.024441C494.547454 698.430336 494.159021 698.831531 493.76272 699.227832 473.808561 719.18199 441.35817 719.231016 421.373615 699.246461L240.24709 518.119937C220.304856 498.177702 220.270876 465.725676 240.26572 445.730831 260.219877 425.776673 292.670269 425.727647 312.654824 445.712202L457.539807 590.597186 715.73926 332.397733C735.716006 312.420987 768.160068 312.476343 788.114225 332.430502 808.109069 352.425345 808.085191 384.867271 788.146995 404.805467L494.92802 698.024441Z" }),
	            React.createElement("path", { className: "svgpath", dataIndex: "path_0", fill: "#ecf0f1", d: "M102.4 102.400653 102.4 102.400653 102.4 921.599347C102.4 921.612242 102.387756 921.6 102.400653 921.6L921.599347 921.6C921.612242 921.6 921.6 921.612244 921.6 921.599347L921.6 102.400653C921.6 102.387758 921.612244 102.4 921.599347 102.4L102.400653 102.4C102.387758 102.4 102.4 102.387756 102.4 102.400653L102.4 102.400653ZM0 102.400653C0 45.846334 45.821265 0 102.400653 0L921.599347 0C978.153666 0 1024 45.821265 1024 102.400653L1024 921.599347C1024 978.153666 978.178735 1024 921.599347 1024L102.400653 1024C45.846334 1024 0 978.178735 0 921.599347L0 102.400653 0 102.400653Z" })
	        );
	    }
	});

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var React = __webpack_require__(6);
	
	module.exports = React.createClass({
	
	    displayName: "Cry",
	
	    getDefaultProps: function getDefaultProps() {
	        return { "version": "1.1", "xmlns": "http://www.w3.org/2000/svg", "x": "0px", "y": "0px", "width": "1024px", "height": "1024px", "viewBox": "0 0 1024 1024", "enableBackground": "new 0 0 1024 1024" };
	    },
	    render: function render() {
	        var props = this.props;
	
	        return React.createElement(
	            "svg",
	            props,
	            React.createElement("path", { className: "svgpath", dataIndex: "path_0", fill: "#ea8010", d: "M326.725501 972.402215" }),
	            React.createElement("path", { className: "svgpath", dataIndex: "path_1", fill: "#ea8010", d: "M512 1023.999925C229.683386 1023.999925 3.8e-05 794.324081 3.8e-05 511.999962 3.8e-05 229.683348 229.683386 0 512 0s511.992458 229.683348 511.992458 511.999962C1023.999962 794.324081 794.324118 1023.999925 512 1023.999925zM512 45.02418C254.506717 45.02418 45.024217 254.514183 45.024217 511.999962s209.4825 466.975783 466.975783 466.975783c257.485779 0 466.968279-209.4825 466.968279-466.975783S769.493283 45.02418 512 45.02418z" }),
	            React.createElement("path", { className: "svgpath", dataIndex: "path_2", fill: "#ea8010", d: "M430.138537 677.771488c0 8.607122 6.453466 15.570862 14.437754 15.570862 7.961776 0 14.422746-6.96374 14.422746-15.570862l0.157585 0c2.258713-31.704526 24.943396-56.685442 52.955939-56.685442 27.975024 0 50.682218 24.980916 52.963443 56.685442l0.052528 0c0 8.607122 6.46097 15.570862 14.422746 15.570862 7.961776 0 14.422746-6.96374 14.422746-15.570862-0.450242-47.447981-36.1244-85.756054-80.14304-85.756054l-3.44435 0c-43.733486 0-79.145004 37.827815-80.067999 84.81805C430.288618 677.163661 430.138537 677.448814 430.138537 677.771488L430.138537 677.771488zM430.138537 677.771488" }),
	            React.createElement("path", { className: "svgpath", dataIndex: "path_3", fill: "#ea8010", d: "M357.927257 368.56043c-1.493302-0.667859-2.994108-1.215653-4.502418-1.815975-12.936948-4.262289-27.719887-1.410758-38.007912 8.877267-7.654111 7.654111-11.188509 17.784551-10.745771 27.802431-0.457746-10.025384 3.084156-20.163328 10.745771-27.824943 10.288025-10.288025 25.06346-13.139556 38.007912-8.877267-51.004891-20.808675-111.607437-10.730763-153.014674 30.66897-11.038428 11.038428-11.030924 28.898019 0 39.936447 11.030924 11.030924 28.905523 11.038428 39.936447 0 18.152248-18.152248 42.405273-25.933927 66.103-24.012896 0 0.007504 0 0.015008 0 0.015008 2.416298 0.210113 4.810083 0.397714 7.181357 0.795427-1.845991 1.073076-3.706991 2.326249-5.552982 3.451854l-0.007504-0.022512c-16.733987 10.235497-33.430453 23.097404-49.12138 38.788331-8.427026 8.427026-16.036112 17.161716-22.962332 26.023976l0.285153 0.285153c-5.590502 6.626058-5.035204 16.929092 1.778455 23.742751 6.813659 6.813659 17.109188 7.391469 23.750255 1.785959l0.42773 0.42773c6.656075-8.869763 14.017528-17.747031 22.632154-26.361657 19.818143-19.818143 41.024532-34.398473 60.174816-42.998092l0.382706-0.382706 0.030016-0.030016 0.007504-0.007504c8.254433-0.817939 16.313761-4.224769 22.639658-10.550666 6.325897-6.325897 9.747735-14.400233 10.565674-22.654666l0.015008-0.015008-0.015008-0.015008c1.050564-10.715755-2.356265-21.791703-10.55817-29.993608C365.06359 372.58259 361.589224 370.331381 357.927257 368.56043z" }),
	            React.createElement("path", { className: "svgpath", dataIndex: "path_4", fill: "#ea8010", d: "M666.072743 368.56043c1.493302-0.667859 2.994108-1.215653 4.502418-1.815975 12.936948-4.262289 27.719887-1.410758 38.007912 8.877267 7.654111 7.654111 11.188509 17.784551 10.745771 27.802431 0.457746-10.025384-3.084156-20.163328-10.745771-27.824943-10.288025-10.288025-25.06346-13.139556-38.007912-8.877267 51.004891-20.808675 111.607437-10.730763 153.014674 30.66897 11.038428 11.038428 11.030924 28.898019 0 39.936447-11.030924 11.030924-28.905523 11.038428-39.936447 0-18.152248-18.152248-42.405273-25.933927-66.103-24.012896 0 0 0 0.015008-0.007504 0.022512-2.408794 0.202609-4.802579 0.39021-7.173853 0.787923 1.845991 1.073076 3.706991 2.326249 5.552982 3.451854 0-0.007504 0.007504-0.015008 0.007504-0.022512 16.733987 10.235497 33.430453 23.097404 49.12138 38.788331 8.427026 8.427026 16.036112 17.161716 22.962332 26.023976l-0.285153 0.285153c5.590502 6.626058 5.035204 16.929092-1.778455 23.742751-6.813659 6.813659-17.109188 7.391469-23.750255 1.785959l-0.42773 0.42773c-6.656075-8.869763-14.017528-17.747031-22.632154-26.361657-19.818143-19.818143-41.024532-34.398473-60.174816-42.998092l-0.382706-0.382706-0.030016-0.030016-0.007504-0.007504c-8.254433-0.817939-16.313761-4.224769-22.639658-10.550666-6.325897-6.325897-9.747735-14.400233-10.565674-22.654666l-0.015008-0.015008 0.015008-0.015008c-1.050564-10.715755 2.356265-21.791703 10.55817-29.993608C658.93641 372.58259 662.410776 370.331381 666.072743 368.56043z" }),
	            React.createElement("path", { className: "svgpath", dataIndex: "path_5", fill: "#ea8010", d: "M256.697894 608.922013c-3.024124 3.024124-7.278909 4.787571-11.556206 4.787571-4.277297 0-8.532082-1.763447-11.556206-4.787571-3.024124-3.024124-4.787571-7.278909-4.787571-11.556206 0-4.277297 1.763447-8.532082 4.787571-11.556206 3.024124-3.024124 7.278909-4.787571 11.556206-4.787571 1.635879 0 3.249245 0.330177 4.810083 0.817939-5.335365-5.230309-12.741843-8.284449-20.208353-8.284449-7.564062 0-15.075596 3.114172-20.418465 8.457042-5.342869 5.342869-8.457042 12.854403-8.457042 20.418465 0 7.556558 3.114172 15.075596 8.457042 20.418465 5.342869 5.342869 12.854403 8.457042 20.418465 8.457042 7.556558 0 15.075596-3.114172 20.418465-8.457042 4.224769-4.224769 6.978748-9.807767 7.976784-15.690927C257.680921 607.766393 257.23068 608.381723 256.697894 608.922013z" })
	        );
	    }
	});

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var React = __webpack_require__(6);
	
	module.exports = React.createClass({
	
	    displayName: "Happy",
	
	    getDefaultProps: function getDefaultProps() {
	        return { "version": "1.1", "xmlns": "http://www.w3.org/2000/svg", "x": "0px", "y": "0px", "width": "1024px", "height": "1024px", "viewBox": "0 0 1024 1024", "enableBackground": "new 0 0 1024 1024" };
	    },
	    render: function render() {
	        var props = this.props;
	
	        return React.createElement(
	            "svg",
	            props,
	            React.createElement("path", { className: "svgpath", dataIndex: "path_0", fill: "#eb4f38", d: "M512 1024c282.76736 0 512-229.23264 512-512s-229.23264-512-512-512-512 229.23264-512 512 229.23264 512 512 512zM512 96.01024c229.74464 0 416.01024 186.24512 416.01024 416.01024s-186.24512 416.01024-416.01024 416.01024-416.01024-186.24512-416.01024-416.01024 186.24512-416.01024 416.01024-416.01024zM512 598.75328c115.95776 0 226.22208-30.80192 320-84.91008-14.58176 178.44224-153.12896 318.1568-320 318.1568s-305.41824-139.8784-320-318.30016c93.77792 54.10816 204.04224 85.07392 320 85.07392zM256 352.01024c0-53.02272 28.65152-96.01024 64-96.01024s64 42.98752 64 96.01024c0 53.02272-28.65152 96.01024-64 96.01024s-64-42.98752-64-96.01024zM640 352.01024c0-53.02272 28.65152-96.01024 64-96.01024s64 42.98752 64 96.01024c0 53.02272-28.65152 96.01024-64 96.01024s-64-42.98752-64-96.01024z" })
	        );
	    }
	});

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var React = __webpack_require__(6);
	
	module.exports = React.createClass({
	
	    displayName: "Smile",
	
	    getDefaultProps: function getDefaultProps() {
	        return { "version": "1.1", "xmlns": "http://www.w3.org/2000/svg", "x": "0px", "y": "0px", "width": "1025px", "height": "1024px", "viewBox": "0 0 1025 1024", "enableBackground": "new 0 0 1025 1024" };
	    },
	    render: function render() {
	        var props = this.props;
	
	        return React.createElement(
	            "svg",
	            props,
	            React.createElement("path", { className: "svgpath", dataIndex: "path_0", fill: "#11cd6e", d: "M32 523.508c0-179.132 98.374-335.344 244.098-417.662 69.695-39.359 150.236-61.847 236.01-61.847 265.121 0 480.084 214.674 480.084 479.484 0.023 264.881-214.914 479.556-480.084 479.556C246.939 1003.062 32 788.388 32 523.508L32 523.508zM512.108 103.975c-232.027 0-420.11 187.843-420.11 419.558 0.023 231.714 188.083 419.582 420.11 419.582 231.978 0 420.062-187.843 420.062-419.582C932.17 291.819 744.11 103.975 512.108 103.975L512.108 103.975z" }),
	            React.createElement("path", { className: "svgpath", dataIndex: "path_1", fill: "#11cd6e", d: "M354.993 392.501c28.82 0 52.2-23.82 52.2-53.18 0-29.42-23.36-53.22-52.2-53.22-28.86 0-52.2 23.8-52.2 53.22C302.793 368.681 326.153 392.501 354.993 392.501L354.993 392.501zM668.213 392.501c28.82 0 52.24-23.82 52.24-53.18 0-29.42-23.42-53.22-52.24-53.22s-52.2 23.8-52.2 53.22C616.013 368.681 639.393 392.501 668.213 392.501L668.213 392.501zM741.333 477.681c-11.56 0-20.88 9.5-20.88 21.28 0 117.58-93.5 212.94-208.82 212.94-115.3 0-208.82-95.36-208.82-212.94 0-11.78-9.36-21.28-20.88-21.28-11.52 0-20.88 9.5-20.88 21.28 0 141.06 112.2 255.44 250.58 255.44s250.54-114.4 250.54-255.44C762.133 487.181 752.813 477.681 741.333 477.681L741.333 477.681 741.333 477.681z" })
	        );
	    }
	});

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(React, ReactDOM) {'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	__webpack_require__(20);
	var Icon = __webpack_require__(10);
	
	var Checkbox = function (_React$Component) {
	    _inherits(Checkbox, _React$Component);
	
	    function Checkbox(props) {
	        _classCallCheck(this, Checkbox);
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Checkbox).call(this, props));
	
	        _this.state = { actived: _this.props.actived };
	        return _this;
	    }
	
	    _createClass(Checkbox, [{
	        key: 'render',
	        value: function render() {
	            var _this2 = this;
	
	            var className = "mycheckbox" + (this.state.actived ? " actived" : "");
	            var onClick = function onClick() {
	                _this2.setState({ actived: !_this2.state.actived });
	            };
	            return React.createElement(
	                'a',
	                { className: className, onClick: onClick },
	                React.createElement(Icon, { name: 'check', className: 'checkIcon' })
	            );
	        }
	    }]);
	
	    return Checkbox;
	}(React.Component);
	
	ReactDOM.render(React.createElement(Checkbox, null), document.getElementById('demo2'));
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6), __webpack_require__(9)))

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(21);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./../node_modules/less-loader/index.js!./checkbox.less", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./../node_modules/less-loader/index.js!./checkbox.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports
	
	
	// module
	exports.push([module.id, ".mycheckbox {\n  cursor: pointer;\n}\n.mycheckbox path:first-child {\n  opacity: 0;\n}\n.mycheckbox:hover path:first-child {\n  opacity: 0.3;\n}\n.mycheckbox.actived path:first-child {\n  opacity: 1;\n}\n", ""]);
	
	// exports


/***/ }
/******/ ]);
//# sourceMappingURL=index.js.map