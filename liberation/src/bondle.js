/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	riot.tag('app', __webpack_require__(1));
	riot.mount('app');
	riot.tag('header-section', __webpack_require__(2));
	riot.mount('header-section')


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = "\r\n  <header-section></header-section>\r\n\r\n  <div id=\"editor\">\r\n    <selector></selector>\r\n    <view-panel></view-panel>\r\n    <manager></manager>\r\n  </div>\r\n\r\n\r\n\r\n  <style>\r\n  body {\r\n    background-image: linear-gradient(90deg, #83D9C5, #114F44);\r\n    color: #fff;\r\n  }\r\n\r\n  header {\r\n    height: 50px;\r\n    font-size: 50px;\r\n    text-align: center;\r\n  }\r\n\r\n\r\n  #editor {\r\n    height: 100%;\r\n  }\r\n\r\n  button, input {\r\n    opacity: 0.4;\r\n    border: 1px solid white;\r\n    width: 100px;\r\n    margin: 10px;\r\n  }\r\n\r\n  button:hover {\r\n    opacity: 0.7;\r\n  }\r\n\r\n  label {\r\n    display: block;\r\n  }\r\n  </style>\r\n"

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = "  <div>\r\n    <label for=\"tableName\">Table Name: <input id=\"tableName\" value=\"{data.tableName}\"></label>\r\n    <button type=\"button\" id=\"submitBtn\" onclick=\"{ add }\">Add</button>\r\n    <button type=\"button\" id=\"saveBtn\">Save</button>\r\n  </div>\r\n  <style scoped>\r\n  #tableName:focus {\r\n    opacity : 0.7\r\n  }\r\n  </style>\r\n"

/***/ }
/******/ ]);