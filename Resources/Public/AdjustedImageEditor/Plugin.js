/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = readFromConsumerApi;
function readFromConsumerApi(key) {
    return function () {
        if (window['@Neos:HostPluginAPI'] && window['@Neos:HostPluginAPI']['@' + key]) {
            var _window$NeosHostPlu;

            return (_window$NeosHostPlu = window['@Neos:HostPluginAPI'])['@' + key].apply(_window$NeosHostPlu, arguments);
        }

        throw new Error('You are trying to read from a consumer api that hasn\'t been initialized yet!');
    };
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(2);

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _neosUiExtensibility = __webpack_require__(3);

var _neosUiExtensibility2 = _interopRequireDefault(_neosUiExtensibility);

var _ImageEditor = __webpack_require__(7);

var _ImageEditor2 = _interopRequireDefault(_ImageEditor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _neosUiExtensibility2.default)('Neos.Neos.Ui.ExtensibilityExamples:AdjustedImageEditor', {}, function (globalRegistry) {
    var editorsRegistry = globalRegistry.get('inspector').get('editors');

    var standardImageEditorDefinition = editorsRegistry.get('Neos.Neos/Inspector/Editors/ImageEditor');

    editorsRegistry.set('Neos.Neos/Inspector/Editors/ImageEditor', _extends({}, standardImageEditorDefinition, {
        component: (0, _ImageEditor2.default)(standardImageEditorDefinition.component)
    }));
});

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createConsumerApi = undefined;

var _createConsumerApi = __webpack_require__(4);

var _createConsumerApi2 = _interopRequireDefault(_createConsumerApi);

var _readFromConsumerApi = __webpack_require__(0);

var _readFromConsumerApi2 = _interopRequireDefault(_readFromConsumerApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _readFromConsumerApi2.default)('manifest');
exports.createConsumerApi = _createConsumerApi2.default;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = createConsumerApi;

var _package = __webpack_require__(5);

var _manifest = __webpack_require__(6);

var _manifest2 = _interopRequireDefault(_manifest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createReadOnlyValue = function createReadOnlyValue(value) {
    return {
        value: value,
        writable: false,
        enumerable: false,
        configurable: true
    };
};

function createConsumerApi(manifests, exposureMap) {
    var api = {};

    Object.keys(exposureMap).forEach(function (key) {
        Object.defineProperty(api, key, createReadOnlyValue(exposureMap[key]));
    });

    Object.defineProperty(api, '@manifest', createReadOnlyValue((0, _manifest2.default)(manifests)));

    Object.defineProperty(window, '@Neos:HostPluginAPI', createReadOnlyValue(api));
    Object.defineProperty(window['@Neos:HostPluginAPI'], 'VERSION', createReadOnlyValue(_package.version));
}

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = {
	"name": "@neos-project/neos-ui-extensibility",
	"version": "1.0.8",
	"description": "Extensibility mechanisms for the Neos CMS UI",
	"main": "./src/index.js",
	"scripts": {
		"prebuild": "check-dependencies && yarn clean",
		"test": "yarn jest -- -w 2 --coverage",
		"test:watch": "yarn jest -- --watch",
		"build": "exit 0",
		"build:watch": "exit 0",
		"clean": "rimraf ./lib ./dist",
		"lint": "eslint src",
		"jest": "NODE_ENV=test jest"
	},
	"devDependencies": {
		"@neos-project/babel-preset-neos-ui": "1.0.8",
		"@neos-project/jest-preset-neos-ui": "1.0.8"
	},
	"dependencies": {
		"@neos-project/build-essentials": "1.0.8",
		"@neos-project/positional-array-sorter": "1.0.8",
		"babel-core": "^6.13.2",
		"babel-eslint": "^7.1.1",
		"babel-loader": "^7.1.2",
		"babel-plugin-transform-decorators-legacy": "^1.3.4",
		"babel-plugin-transform-object-rest-spread": "^6.20.1",
		"babel-plugin-webpack-alias": "^2.1.1",
		"babel-preset-es2015": "^6.13.2",
		"babel-preset-react": "^6.3.13",
		"babel-preset-stage-0": "^6.3.13",
		"chalk": "^1.1.3",
		"css-loader": "^0.28.4",
		"file-loader": "^1.1.5",
		"json-loader": "^0.5.4",
		"postcss-loader": "^2.0.10",
		"react-dev-utils": "^0.5.0",
		"style-loader": "^0.19.0"
	},
	"bin": {
		"neos-react-scripts": "./bin/neos-react-scripts.js"
	},
	"jest": {
		"preset": "@neos-project/jest-preset-neos-ui"
	}
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

exports.default = function (manifests) {
    return function manifest(identifier, options, bootstrap) {
        manifests.push(_defineProperty({}, identifier, {
            options: options,
            bootstrap: bootstrap
        }));
    };
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = makeCustomImageEditor;

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(9);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactUiComponents = __webpack_require__(10);

var _neosUiDecorators = __webpack_require__(11);

var _neosUiI18n = __webpack_require__(12);

var _neosUiI18n2 = _interopRequireDefault(_neosUiI18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function makeCustomImageEditor(DefaultImageEditor) {
    var _class, _temp2;

    return _temp2 = _class = function (_PureComponent) {
        _inherits(MyImageEditor, _PureComponent);

        function MyImageEditor() {
            var _ref;

            var _temp, _this, _ret;

            _classCallCheck(this, MyImageEditor);

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = MyImageEditor.__proto__ || Object.getPrototypeOf(MyImageEditor)).call.apply(_ref, [this].concat(args))), _this), _this.handleChangeColor = function (newColor) {
                _this.props.commit(newColor.hex);
            }, _temp), _possibleConstructorReturn(_this, _ret);
        }

        _createClass(MyImageEditor, [{
            key: 'render',
            value: function render() {
                var _props = this.props,
                    value = _props.value,
                    commit = _props.commit,
                    options = _props.options,
                    i18nRegistry = _props.i18nRegistry,
                    highlight = _props.highlight;


                return _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(DefaultImageEditor, this.props),
                    _react2.default.createElement(
                        'b',
                        null,
                        'Something below'
                    )
                );
            }
        }]);

        return MyImageEditor;
    }(_react.PureComponent), _class.propTypes = {
        value: _propTypes2.default.string,
        commit: _propTypes2.default.func.isRequired,
        validationErrors: _propTypes2.default.array,
        highlight: _propTypes2.default.bool,
        options: _propTypes2.default.object,

        i18nRegistry: _propTypes2.default.object.isRequired
    }, _temp2;
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _readFromConsumerApi = __webpack_require__(0);

var _readFromConsumerApi2 = _interopRequireDefault(_readFromConsumerApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = (0, _readFromConsumerApi2.default)('vendor')().React;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _readFromConsumerApi = __webpack_require__(0);

var _readFromConsumerApi2 = _interopRequireDefault(_readFromConsumerApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = (0, _readFromConsumerApi2.default)('vendor')().PropTypes;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _readFromConsumerApi = __webpack_require__(0);

var _readFromConsumerApi2 = _interopRequireDefault(_readFromConsumerApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = (0, _readFromConsumerApi2.default)('NeosProjectPackages')().ReactUiComponents;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _readFromConsumerApi = __webpack_require__(0);

var _readFromConsumerApi2 = _interopRequireDefault(_readFromConsumerApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = (0, _readFromConsumerApi2.default)('NeosProjectPackages')().NeosUiDecorators;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _readFromConsumerApi = __webpack_require__(0);

var _readFromConsumerApi2 = _interopRequireDefault(_readFromConsumerApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = (0, _readFromConsumerApi2.default)('NeosProjectPackages')().NeosUiI18n;

/***/ })
/******/ ]);
//# sourceMappingURL=Plugin.js.map