/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles.css */ \"./src/styles.css\");\n/* harmony import */ var cuttie__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cuttie */ \"./node_modules/cuttie/index.js\");\n\n\nvar isAuto = document.getElementById('b-check');\nvar boundsWidth = document.getElementById('b-w');\nvar boundsHeight = document.getElementById('b-h');\nvar viewportWidth = document.getElementById('v-w');\nvar viewportHeight = document.getElementById('v-h');\nvar viewportChanged = document.getElementById('v-check');\nvar viewportAr = document.getElementById('v-ar');\nvar uploadImgContainer = document.getElementById('dnd');\nvar uploadImg = document.getElementById('dnd__ch');\nvar saveBtnSelf = document.getElementById('savefirst');\nvar saveBtnFile = document.getElementById('savefile');\nvar saveBtnFIleResult = document.getElementById('savefileResult');\nvar loadFileBtn = document.getElementById('loadfile');\nvar parent = document.getElementById('cuttie-parent');\nvar resultElement = document.getElementById('cuttie-result');\n\n//layout\nvar harrow = document.getElementById('h_arr');\nvar resultContainer = document.getElementById('result');\nvar closeBtn = document.getElementById('close-result');\nvar overlayResult = document.getElementById('overlay-result');\nvar cuttie;\ncuttie = new cuttie__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\nfunction arToNumber(stringAr) {\n  var ar = stringAr.split('/');\n  if (ar.length !== 2) return null;\n  var r = Number(ar[0]) / Number(ar[1]);\n  return Boolean(r) ? r : null;\n}\nvar handleUploadImage = function handleUploadImage(e) {\n  e.preventDefault();\n  var url = e.dataTransfer ? URL.createObjectURL(Array.from(e.dataTransfer.files)[0]) : URL.createObjectURL(e.target.files[0]);\n  if (!url) return;\n  var ar = viewportAr.value ? arToNumber(viewportAr.value) : null;\n  var options = {\n    bounds: {\n      width: isAuto.checked ? undefined : boundsWidth.value,\n      height: isAuto.checked ? undefined : boundsHeight.value\n    },\n    viewport: {\n      width: Number(viewportWidth.value),\n      height: Number(viewportHeight.value),\n      isChanged: viewportChanged.checked,\n      'aspect-ratio': ar ? ar : undefined\n    },\n    background: {\n      parentImage: true\n    }\n  };\n  cuttie.initCanvas(parent, options, url);\n  var bounds = cuttie.getCurrentBounds();\n  boundsWidth.value = bounds.width;\n  boundsHeight.value = bounds.height;\n  setTimeout(function () {\n    var viewportPos = cuttie.getPosition();\n    viewportWidth.value = viewportPos.width;\n    viewportHeight.value = viewportPos.height;\n  }, 100);\n  saveBtnSelf.addEventListener('click', function () {\n    resultContainer.classList.add('crop-window_open');\n    var imaga = cuttie.getCrop();\n    resultElement.src = imaga;\n    resultElement.style.backgroundColor = '#fff';\n  });\n  saveBtnFile.addEventListener('click', function () {\n    var imaga = cuttie.getCrop();\n    var a = document.createElement('a');\n    a.href = imaga;\n    a.download = 'cuttie.png';\n    parent.appendChild(a);\n    a.click();\n    parent.removeChild(a);\n  });\n  saveBtnFIleResult.addEventListener('click', function () {\n    var imaga = cuttie.getCrop();\n    var a = document.createElement('a');\n    a.href = imaga;\n    a.download = 'cuttie.png';\n    parent.appendChild(a);\n    a.click();\n    parent.removeChild(a);\n  });\n  viewportWidth.addEventListener('change', function (e) {\n    cuttie.updatePosition(0, 0, e.target.value, 0);\n  });\n  viewportHeight.addEventListener('change', function (e) {\n    cuttie.updatePosition(0, 0, 0, e.target.value);\n  });\n  viewportAr.addEventListener('change', function (e) {\n    console.log(arToNumber(e.target.value));\n    cuttie.updateAr(arToNumber(e.target.value));\n  });\n};\nuploadImgContainer.addEventListener(\"dragenter\", function (e) {\n  e.preventDefault();\n  uploadImgContainer.style.cursor = 'pointer';\n});\nuploadImgContainer.addEventListener(\"dragover\", function (e) {\n  e.preventDefault();\n  uploadImgContainer.style.cursor = 'pointer';\n});\nuploadImgContainer.addEventListener(\"dragleave\", function (e) {\n  e.preventDefault();\n  uploadImgContainer.style.cursor = 'pointer';\n});\nuploadImgContainer.addEventListener(\"drop\", handleUploadImage);\nuploadImgContainer.addEventListener(\"click\", function () {\n  dnd__ch.click();\n});\nuploadImg.addEventListener('change', handleUploadImage);\nloadFileBtn.addEventListener('click', function () {\n  dnd__ch.click();\n});\nharrow.addEventListener('click', function () {\n  harrow.classList.toggle('header__burger_open');\n});\ncloseBtn.addEventListener('click', function () {\n  resultContainer.classList.remove('crop-window_open');\n});\noverlayResult.addEventListener('click', function () {\n  resultContainer.classList.remove('crop-window_open');\n});\n\n//# sourceURL=webpack://cuttie/./src/app.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles.css":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles.css ***!
  \**************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/getUrl.js */ \"./node_modules/css-loader/dist/runtime/getUrl.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);\n// Imports\n\n\n\nvar ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ./asset/cuttie_short.svg */ \"./src/asset/cuttie_short.svg\"), __webpack_require__.b);\nvar ___CSS_LOADER_URL_IMPORT_1___ = new URL(/* asset import */ __webpack_require__(/*! ./asset/arrow_up.svg */ \"./src/asset/arrow_up.svg\"), __webpack_require__.b);\nvar ___CSS_LOADER_URL_IMPORT_2___ = new URL(/* asset import */ __webpack_require__(/*! ./asset/close.svg */ \"./src/asset/close.svg\"), __webpack_require__.b);\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\nvar ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);\nvar ___CSS_LOADER_URL_REPLACEMENT_1___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_1___);\nvar ___CSS_LOADER_URL_REPLACEMENT_2___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_2___);\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, `* {\r\n  margin: 0;\r\n  padding: 0;\r\n  font-family: 'Lexend Mega', Courier, monospace;\r\n  font-weight: 500;\r\n  letter-spacing: 2px;\r\n  box-sizing: border-box;\r\n}\r\n\r\n@media screen and (max-width: 1000px) {\r\n  html {\r\n    font-size: 10px;\r\n  }\r\n}\r\n\r\nhtml {\r\n  background-color: #3e3e3e;\r\n}\r\n\r\ninput::-webkit-outer-spin-button,\r\ninput::-webkit-inner-spin-button {\r\n    -webkit-appearance: none;\r\n    margin: 0;\r\n}\r\n\r\ninput[type='number'] {\r\n  -moz-appearance: textfield;\r\n}\r\n\r\n.input, .btn {\r\n  background: none;\r\n  outline: none;\r\n  border: none;\r\n}\r\n\r\n#canvasCuttieDiv {\r\n  position: relative;\r\n  background-color: #fff;\r\n  background-repeat: no-repeat;\r\n  background-position: center center;\r\n  background-size: cover;\r\n}\r\n\r\n.canvasCuttieDivImageBg::before {\r\n  content: '';\r\n  position: absolute;\r\n  top: 0;\r\n  left: 0;\r\n  right: 0;\r\n  bottom: 0;\r\n  background-color: #ffffff80;\r\n  filter: blur(10px);\r\n}\r\n\r\n#canvasCuttie {\r\n  z-index: 1; \r\n  top: 50%;\r\n  left: 50%;\r\n  transform: translate(-50%,-50%);\r\n  position: absolute; \r\n  background: transparent;\r\n}\r\n\r\n#cuttieBg {\r\n  top: 50%;\r\n  left: 50%;\r\n  transform: translate(-50%,-50%);\r\n  position: absolute;\r\n}\r\n\r\n\r\n\r\n\r\n.body {\r\n  max-width: 1400px;\r\n  margin: 0 auto;\r\n  display: flex;\r\n  height: 100vh;\r\n  background-color: transparent;\r\n}\r\n\r\n.header {\r\n  background: #ffa600;\r\n  display: flex;\r\n  width: 298px;\r\n  padding: 24px;\r\n  gap: 2rem;\r\n  flex-direction: column;\r\n}\r\n\r\n.logo {\r\n  width: 250px;\r\n}\r\n\r\n.h2 {\r\n  font-size: 2rem;\r\n}\r\n\r\n.form {\r\n  height: 100%;\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 1rem;\r\n}\r\n\r\n.form-cont {\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: .5rem;\r\n  user-select: none;\r\n}\r\n\r\n.form-cont .label {\r\n  margin-left: 1rem;\r\n}\r\n\r\n.label {\r\n  display: flex;\r\n  align-items: center;\r\n  white-space: nowrap;\r\n}\r\n\r\n.inputText {\r\n  border-bottom: 2px solid black;\r\n  width: 100%;\r\n  padding-left: .2rem;\r\n  transition: all .3s linear;\r\n}\r\n\r\n.inputText:focus {\r\n  border-bottom: 2px solid #00000050;\r\n}\r\n\r\n.label:has(.inputChecked), .inputChecked {\r\n  cursor: pointer;\r\n}\r\n\r\n#dnd {\r\n  cursor: pointer;\r\n  height: 150px;\r\n  border: 2px dashed #3e3e3e;\r\n  background-color: #f3f3f3;\r\n  display: flex;\r\n  padding: 8px;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  text-align: center;\r\n  margin-top: auto;\r\n}\r\n\r\n.dnd__text {\r\n  width: 200px;\r\n}\r\n\r\n.dnd__label {\r\n  color: #ffa600;\r\n  cursor: pointer;\r\n}\r\n\r\n#dnd__ch {\r\n  display: none;\r\n  opacity: 0;\r\n  max-height: 0;\r\n}\r\n\r\n.main {\r\n  width: 100%;\r\n}\r\n\r\n.crop-windows {\r\n  padding: 1rem;\r\n  width: 100%;\r\n  display: grid;\r\n  grid-template-columns: repeat(2, minmax(1px, 350px));\r\n  gap: 1.75rem;\r\n  align-items: center;\r\n  justify-content: center;\r\n  color: #fff;\r\n  text-align: center;\r\n}\r\n\r\n.crop-window__cropbox {\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n  overflow: hidden;\r\n  height: 430px;\r\n  background: #f3f3f3 url(${___CSS_LOADER_URL_REPLACEMENT_0___}) center center no-repeat;\r\n}\r\n\r\n.crop-window__title {\r\n  font-weight: 300;\r\n  white-space: unset;\r\n}\r\n\r\n.crop-window__result {\r\n  border: none;\r\n  outline: none;\r\n}\r\n\r\n.crop-btns {\r\n  width: min-content;\r\n  margin: 0 auto;\r\n  margin-top: 5rem;\r\n}\r\n\r\n.crop-btn {\r\n  width: 250px;\r\n  height: 80px;\r\n  background-color: #ffa600;\r\n  font-size: 2rem;\r\n  white-space: nowrap;\r\n  letter-spacing: 0;\r\n  cursor: pointer;\r\n}\r\n\r\n.crop-btn:last-child {\r\n  margin-top: 1rem;\r\n}\r\n\r\n#cuttie-result {\r\n  width: 100%;\r\n  height: 100%;\r\n  object-fit: contain;\r\n}\r\n\r\n.result__overlay, #loadfile, #savefileResult, .crop-window__close {\r\n  display: none;\r\n}\r\n\r\n@media screen and (max-width: 800px) {\r\n .body {\r\n  flex-direction: column;\r\n } \r\n\r\n .result__overlay, .crop-btn, .crop-window__close {\r\n  display: block;\r\n}\r\n\r\n#loadfile {\r\n  display: block;\r\n}\r\n\r\n .header {\r\n  width: 100%;\r\n  position: absolute;\r\n  z-index: 2;\r\n }\r\n\r\n #dnd {\r\n  display: none;\r\n }\r\n\r\n .form {\r\n  background-color: #ffa600;\r\n  max-height: 0;\r\n  opacity: 0;\r\n  visibility: hidden;\r\n  transition-behavior: allow-discrete;\r\n  transition: all .5s ease-in-out;\r\n }\r\n\r\n .header__burger {\r\n  display: block;\r\n  position: absolute;\r\n  width: 68px;\r\n  height: 20px;\r\n  bottom: -20px;\r\n  left: 50%;\r\n  clip-path: polygon(0 0, 100% 0, 85% 100%, 15% 100%);\r\n  background-color: #ffa600;\r\n  transform: translateX(-50%);\r\n  cursor: pointer;\r\n }\r\n\r\n .header__arrow {\r\n  display: block;\r\n  z-index: 1;\r\n  width: 100%;\r\n  height: 100%;\r\n  background: url(${___CSS_LOADER_URL_REPLACEMENT_1___}) center center no-repeat;\r\n  transition: all .5s ease-in-out;\r\n }\r\n\r\n .header__burger_open > .header__arrow {\r\n  transform: rotate(180deg);\r\n }\r\n\r\n .header:has(.header__burger_open) > .form {\r\n  max-height: 1000px;\r\n  opacity: 1;\r\n  visibility: visible;\r\n }\r\n\r\n .main {\r\n  margin-top: 130px;\r\n }\r\n\r\n #savefile {\r\n  display: none;\r\n }\r\n\r\n .crop-windows {\r\n  display: block;\r\n }\r\n\r\n .result {\r\n  padding: 10px 20px;\r\n  display: none;\r\n  background-color: #ffa600;\r\n  color: #f3f3f3;\r\n  transition-behavior: allow-discrete;\r\n  position: absolute;\r\n  top: 50%;\r\n  transform: translate(-50%, -50%);\r\n  z-index: 5;\r\n  width: calc(100% - 20px);\r\n  left: 50%;\r\n  max-width: 400px;\r\n }\r\n\r\n .crop-windows:has(.crop-window_open) > .result__overlay {\r\n  display: block;\r\n  position: absolute;\r\n  z-index: 4;\r\n  top: 0;\r\n  left: 0;\r\n  right: 0;\r\n  bottom: 0;\r\n  background-color: #3e3e3e80;\r\n }\r\n\r\n .crop-window_open > .crop-window__cropbox {\r\n  background: none;\r\n }\r\n\r\n .options {\r\n  display: none;\r\n }\r\n\r\n .crop-btns {\r\n  margin: 0;\r\n  display: grid;\r\n  align-items: center;\r\n  justify-content: space-between;\r\n  width: 100%;\r\n  padding: 0 10px;\r\n  grid-template-columns: repeat(auto-fit, 100px);\r\n  gap: 10px;\r\n }\r\n\r\n .crop-btn {\r\n  width: 100px;\r\n  height: 50px;\r\n  font-size: 1.5rem;\r\n  white-space: unset;\r\n }\r\n\r\n .crop-window__close {\r\n  position: absolute;\r\n  background: transparent url(${___CSS_LOADER_URL_REPLACEMENT_2___}) center center no-repeat;\r\n  width: 24px;\r\n  height: 24px;\r\n  right: 10px;\r\n  top: 10px;\r\n  border: none;\r\n  cursor: pointer;\r\n }\r\n\r\n .crop-window_open > .crop-window__cropbox {\r\n  height: auto;\r\n }\r\n\r\n .crop-window_open > #savefileResult {\r\n  background-color: #3e3e3e;\r\n  color: #f3f3f3;\r\n  margin-left: auto;\r\n  display: block;\r\n  margin-top: 12px;\r\n }\r\n\r\n .crop-window_open > .h2 {\r\n  font-size: 3rem;\r\n  font-weight: 500;\r\n }\r\n\r\n .crop-window_open {\r\n  display: block;\r\n }\r\n}`, \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://cuttie/./src/styles.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\nmodule.exports = function (cssWithMappingToString) {\n  var list = [];\n\n  // return the list of modules as css string\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = \"\";\n      var needLayer = typeof item[5] !== \"undefined\";\n      if (item[4]) {\n        content += \"@supports (\".concat(item[4], \") {\");\n      }\n      if (item[2]) {\n        content += \"@media \".concat(item[2], \" {\");\n      }\n      if (needLayer) {\n        content += \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\");\n      }\n      content += cssWithMappingToString(item);\n      if (needLayer) {\n        content += \"}\";\n      }\n      if (item[2]) {\n        content += \"}\";\n      }\n      if (item[4]) {\n        content += \"}\";\n      }\n      return content;\n    }).join(\"\");\n  };\n\n  // import a list of modules into the list\n  list.i = function i(modules, media, dedupe, supports, layer) {\n    if (typeof modules === \"string\") {\n      modules = [[null, modules, undefined]];\n    }\n    var alreadyImportedModules = {};\n    if (dedupe) {\n      for (var k = 0; k < this.length; k++) {\n        var id = this[k][0];\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n    for (var _k = 0; _k < modules.length; _k++) {\n      var item = [].concat(modules[_k]);\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        continue;\n      }\n      if (typeof layer !== \"undefined\") {\n        if (typeof item[5] === \"undefined\") {\n          item[5] = layer;\n        } else {\n          item[1] = \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\").concat(item[1], \"}\");\n          item[5] = layer;\n        }\n      }\n      if (media) {\n        if (!item[2]) {\n          item[2] = media;\n        } else {\n          item[1] = \"@media \".concat(item[2], \" {\").concat(item[1], \"}\");\n          item[2] = media;\n        }\n      }\n      if (supports) {\n        if (!item[4]) {\n          item[4] = \"\".concat(supports);\n        } else {\n          item[1] = \"@supports (\".concat(item[4], \") {\").concat(item[1], \"}\");\n          item[4] = supports;\n        }\n      }\n      list.push(item);\n    }\n  };\n  return list;\n};\n\n//# sourceURL=webpack://cuttie/./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = function (url, options) {\n  if (!options) {\n    options = {};\n  }\n  if (!url) {\n    return url;\n  }\n  url = String(url.__esModule ? url.default : url);\n\n  // If url is already wrapped in quotes, remove them\n  if (/^['\"].*['\"]$/.test(url)) {\n    url = url.slice(1, -1);\n  }\n  if (options.hash) {\n    url += options.hash;\n  }\n\n  // Should url be wrapped?\n  // See https://drafts.csswg.org/css-values-3/#urls\n  if (/[\"'() \\t\\n]|(%20)/.test(url) || options.needQuotes) {\n    return \"\\\"\".concat(url.replace(/\"/g, '\\\\\"').replace(/\\n/g, \"\\\\n\"), \"\\\"\");\n  }\n  return url;\n};\n\n//# sourceURL=webpack://cuttie/./node_modules/css-loader/dist/runtime/getUrl.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/noSourceMaps.js":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/noSourceMaps.js ***!
  \**************************************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = function (i) {\n  return i[1];\n};\n\n//# sourceURL=webpack://cuttie/./node_modules/css-loader/dist/runtime/noSourceMaps.js?");

/***/ }),

/***/ "./node_modules/cuttie/index.js":
/*!**************************************!*\
  !*** ./node_modules/cuttie/index.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Cuttie)\n/* harmony export */ });\n/* harmony import */ var _src_handler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/handler */ \"./node_modules/cuttie/src/handler.js\");\n/* harmony import */ var _src_imageLayaout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/imageLayaout */ \"./node_modules/cuttie/src/imageLayaout.js\");\n/* harmony import */ var _src_viewport__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./src/viewport */ \"./node_modules/cuttie/src/viewport.js\");\n// CUTtie\r\n\r\n\r\n\r\n\r\nclass Cuttie {\r\n  constructor() {\r\n    this.viewportLayer;\r\n    this.imageLayer;\r\n    this.handlerLayer;\r\n    this.bg;\r\n    this.canvas;\r\n    this.ctx;\r\n    this.canvasContainer;\r\n  }\r\n\r\n  _createCanvas(parent, params, url) {\r\n    this.canvas = document.createElement('canvas');\r\n    this.bg = document.createElement('img');\r\n    this.canvasContainer = document.createElement('div');\r\n    this.ctx = this.canvas.getContext('2d');\r\n    this.ctx.strokeStyle = 'lightgrey';\r\n\r\n    this._appendStyles(params, parent, url)\r\n    this.imageLayer = new _src_imageLayaout__WEBPACK_IMPORTED_MODULE_1__[\"default\"](this.canvas, this.bg);\r\n    this.viewportLayer = new _src_viewport__WEBPACK_IMPORTED_MODULE_2__[\"default\"](this.canvas);\r\n    parent.appendChild(this.canvasContainer);\r\n  }\r\n\r\n  _appendStyles(params, parent, url) {\r\n    this.canvasContainer.id = 'canvasCuttieDiv';\r\n    this.canvas.id = 'canvasCuttie';\r\n    this.bg.id = 'cuttieBg';\r\n    console.log(params)\r\n    this.canvas.width = params.bounds.width ? Number(params.bounds.width) : parent.clientWidth;\r\n    this.canvas.height = params.bounds.height ? Number(params.bounds.height) : parent.clientHeight;\r\n    this.canvasContainer.style = `width: ${this.canvas.width}px; height: ${this.canvas.height}px;`;\r\n    \r\n    const bg = params.background;\r\n    if (bg && (bg.image || bg.parentImage)) {\r\n      this.canvasContainer.className = 'canvasCuttieDivImageBg'\r\n      this.canvasContainer.style.backgroundImage = `url(${bg.image ? bg.image : url})`\r\n    }\r\n\r\n    if (bg && bg.color) {\r\n      this.canvasContainer.style.backgroundColor = bg.color;\r\n    }\r\n    this.canvasContainer.appendChild(this.canvas);\r\n    this.canvasContainer.appendChild(this.bg);\r\n    \r\n  }\r\n\r\n  _findXY() {\r\n    const bb = this.canvas.getBoundingClientRect();\r\n    this.XY.offsetX = bb.left;\r\n    this.XY.offsetY = bb.top;\r\n  }\r\n\r\n  initCanvas(parentElem, params, url) {\r\n    const oldCanvasDiv = document.getElementById('canvasCuttieDiv');\r\n    if (oldCanvasDiv) {\r\n      parentElem.removeChild(oldCanvasDiv);\r\n    }\r\n    this._createCanvas(parentElem, params, url);\r\n    this.imageLayer.initImage(url, () => {\r\n      this.viewportLayer.initViewport(params.viewport);\r\n      this.handlerLayer = new _src_handler__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.canvas, this.viewportLayer, this.imageLayer);\r\n      this.handlerLayer.findXY();\r\n      this.handlerLayer.addEventListeners();\r\n    });\r\n  }\r\n\r\n  getCurrentBounds() {\r\n    return {width: this.canvas.width, height: this.canvas.height}\r\n  }\r\n\r\n  getPosition() {\r\n    return this.viewportLayer.getPosition();\r\n  }\r\n\r\n  updatePosition(x,y,w,h) {\r\n    const params = [x, y, w, h].map(Number);\r\n\r\n    for (const param of params) {\r\n      if (isNaN(param)) { \r\n        console.error(`Can't update position, params only number`);\r\n        return;\r\n      }\r\n    }\r\n    params[2] = Math.min(w, this.canvas.width);\r\n    this.viewportLayer.updatePosition(...params);\r\n    this.viewportLayer.updateAr(this.viewportLayer.viewport.ar);\r\n  }\r\n\r\n  updateAr(ar) {\r\n    this.viewportLayer.updateAr(ar);\r\n  }\r\n\r\n  getCrop(width, height) {\r\n    const canvas = document.createElement('canvas');\r\n    canvas.style.backgroundColor = 'transparent';\r\n    const vp = this.viewportLayer.viewport;\r\n    const img = this.imageLayer.image;\r\n    const sx = vp.x/this.imageLayer.scale;\r\n    const sy = vp.y/this.imageLayer.scale;\r\n    const sw = vp.w/this.imageLayer.scale;\r\n    const sh = vp.h/this.imageLayer.scale;\r\n    canvas.width = width ?? sw;\r\n    canvas.height = height ?? sh;\r\n    const ctx = canvas.getContext('2d');\r\n    ctx.drawImage(img, sx, sy, sw, sh,0,0,canvas.width,canvas.height);\r\n\r\n    return canvas.toDataURL('image/png', 1.0);\r\n  }\r\n}\n\n//# sourceURL=webpack://cuttie/./node_modules/cuttie/index.js?");

/***/ }),

/***/ "./node_modules/cuttie/src/handler.js":
/*!********************************************!*\
  !*** ./node_modules/cuttie/src/handler.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ CuttieHandler)\n/* harmony export */ });\nclass CuttieHandler {\r\n  constructor(canvas, vpLayer, imgLayer) {\r\n    this.canvas = canvas;\r\n    this.vpLayer = vpLayer;\r\n    this.imgLayer = imgLayer;\r\n    this.viewport = vpLayer.viewport;\r\n    this.XY = {offsetX:0,offsetY:0,startX:0,startY:0}\r\n    this.corners = this.viewport.corners;\r\n    this.isDraggable = false;\r\n    this.max = {w:0,h:0};\r\n    this.comp;\r\n  }\r\n\r\n  _updateMax() {\r\n    this.max = {w: this.vpLayer.getMax().maxW, h: this.vpLayer.getMax().maxH};\r\n  }\r\n\r\n  _draw(x,y,w,h) {\r\n    this.vpLayer.updatePosition(x,y,w,h);\r\n  }\r\n\r\n  _onMouseDown(e) {\r\n    e.preventDefault();\r\n    e.stopPropagation();\r\n\r\n    this._updateMax();\r\n    if (!e.touches) {\r\n      this.isDraggable = true;\r\n    }\r\n    const {mx,my} = this._updateXY(e);\r\n    this.comp = {\r\n      rdrux: this.viewport.x+this.viewport.w-mx,\r\n      rdldy: this.viewport.y+this.viewport.h-my,\r\n      luruy: this.viewport.y-my,\r\n      ldlux: this.viewport.x-mx,\r\n    }\r\n  }\r\n\r\n  _onMouseUp(e) {\r\n    e.preventDefault();\r\n    e.stopPropagation();\r\n    this.isDraggable = false;\r\n    this.XY.startX = 0;\r\n    this.XY.startY = 0;\r\n  }\r\n\r\n  _handleMoveViewport(e) {\r\n    if (!this.isDraggable) return;\r\n    const {mx,my} = this._updateXY(e);\r\n\r\n    const newX = Math.min(Math.max(0, this.comp.ldlux + mx), this.canvas.width-this.viewport.w);\r\n    const newY = Math.min(Math.max(0, this.comp.luruy + my), this.canvas.height-this.viewport.h);\r\n    this._draw(newX,newY,false,false);\r\n  }\r\n\r\n  _handleHoverMouse(e) {\r\n    //lock состояния\r\n    if (this.isDraggable) return;\r\n    const clientX = e.touches ? e.touches[0].clientX : e.clientX;\r\n    const clientY = e.touches ? e.touches[0].clientY : e.clientY;\r\n\r\n    const withinViewportX = (this.viewport.x + this.XY.offsetX) <= clientX && clientX <= (this.viewport.x + this.XY.offsetX + this.viewport.w);\r\n    const withinViewportY = (this.viewport.y + this.XY.offsetY) <= clientY && clientY <= (this.viewport.y + this.XY.offsetY + this.viewport.h);\r\n\r\n    if (this.viewport.changed) {\r\n      this.corners.lu = (this.viewport.x + this.XY.offsetX <= clientX && this.viewport.x + this.XY.offsetX +20 >= clientX) && (this.viewport.y + this.XY.offsetY <= clientY && this.viewport.y + this.XY.offsetY +20 >= clientY);\r\n      this.corners.rd = (this.viewport.x + this.viewport.w + this.XY.offsetX >= clientX && this.viewport.x + this.viewport.w + this.XY.offsetX -20 <= clientX) && (this.viewport.y + this.viewport.h + this.XY.offsetY >= clientY && this.viewport.y + this.viewport.h + this.XY.offsetY -20 <= clientY);\r\n      this.corners.ld = (this.viewport.x + this.XY.offsetX <= clientX && this.viewport.x + this.XY.offsetX +20 >= clientX) && (this.viewport.y + this.viewport.h + this.XY.offsetY >= clientY && this.viewport.y + this.viewport.h + this.XY.offsetY -20 <= clientY);\r\n      this.corners.ru = (this.viewport.x + this.viewport.w + this.XY.offsetX >= clientX && this.viewport.x + this.viewport.w + this.XY.offsetX -20 <= clientX) && (this.viewport.y + this.XY.offsetY <= clientY && this.viewport.y + this.XY.offsetY +20 >= clientY);\r\n      this.vpLayer.drawCorners();\r\n    }\r\n\r\n    if (this.viewport.changed) {\r\n      this.canvas.style.cursor = this.corners.lu || this.corners.rd ? 'nwse-resize' : this.corners.ld || this.corners.ru ? 'nesw-resize' : withinViewportX && withinViewportY ? 'move' : 'auto';\r\n    } else {\r\n      this.canvas.style.cursor = withinViewportX && withinViewportY ? 'move' : 'auto';\r\n    }\r\n    if (e.touches) {\r\n      this.isDraggable = true;\r\n    }\r\n  }\r\n\r\n  _handleMove(e) {\r\n    e.preventDefault();\r\n    e.stopPropagation();\r\n\r\n    this._handleHoverMouse(e);\r\n    this.findXY();\r\n    if (!this.isDraggable) return;\r\n    switch (true) {\r\n      case this.corners.rd:\r\n        this._changeRD(e);\r\n        break;\r\n      case this.corners.ru:\r\n        this._changeRU(e);\r\n        break;\r\n      case this.corners.ld:\r\n        this._changeLD(e);\r\n        break;\r\n      case this.corners.lu:\r\n        this._changeLU(e);\r\n        break;\r\n      case this.canvas.style.cursor === 'move':\r\n        this._handleMoveViewport(e);\r\n        break;\r\n    }\r\n  }\r\n\r\n  _changeLU(e) {\r\n    const {mx,my} = this._updateXY(e);\r\n    let newX,newY, newW, newH;\r\n    newX = Math.max(0, mx+this.comp.ldlux);\r\n\r\n    if (this.viewport.ar) {\r\n      newW = Math.max(50, this.viewport.w+(this.viewport.x-newX));\r\n      newH = newW/this.viewport.ar;\r\n      newY = Math.max(0, this.viewport.y+(this.viewport.h-newH));\r\n      if (!newY) {\r\n        newW = this.viewport.w;\r\n        newX = this.viewport.x;\r\n        newH = this.viewport.h+(this.viewport.y-newY);\r\n      }\r\n      if (!newX) {\r\n        newW = this.viewport.w+this.viewport.x;\r\n        newH = newW/this.viewport.ar;\r\n      }\r\n      if (newW === 50) {\r\n        newX = this.viewport.x+(this.viewport.w-newW);\r\n      }\r\n    } else {\r\n      newY = Math.max(0, my+this.comp.luruy);\r\n      newW = Math.max(50, this.viewport.w+(this.viewport.x-newX));\r\n      newH = Math.max(50, this.viewport.h+(this.viewport.y-newY));\r\n\r\n      if (newW === 50) {\r\n        newX = this.viewport.x+(this.viewport.w-newW);\r\n      }\r\n      if (newH === 50) {\r\n        newY = this.viewport.y+(this.viewport.h-newH);\r\n      }\r\n    }\r\n\r\n    this._draw(newX,newY,newW,newH);\r\n  }\r\n\r\n  _changeLD(e) {\r\n    const {mx,my} = this._updateXY(e);\r\n    let newX, newW, newH;\r\n    newX = Math.max(0, mx+this.comp.ldlux);\r\n\r\n    if (this.viewport.ar) {\r\n      newW = Math.max(50, this.viewport.w+(this.viewport.x-newX));\r\n      if (!newX) {\r\n        newW = this.viewport.w+this.viewport.x;\r\n      }\r\n      if (newW === 50) {\r\n        newX = this.viewport.x+(this.viewport.w-newW);\r\n      }\r\n      newH = Math.min(this.canvas.height - this.viewport.y, newW/this.viewport.ar);\r\n      if (newH === this.canvas.height - this.viewport.y) {\r\n        newW = this.viewport.w;\r\n        newX = this.viewport.x;\r\n      }\r\n    } else {\r\n      newW = Math.max(50,  this.viewport.w+(this.viewport.x-newX));\r\n      newH = Math.max(50, Math.min(this.max.h, my+this.comp.rdldy-this.viewport.y));\r\n      if (newW === 50 || !newX) {\r\n        newX = newX===0?newX:this.viewport.x;\r\n        newW = this.viewport.w;\r\n      }\r\n    }\r\n\r\n    this._draw(newX,false,newW,newH);\r\n  }\r\n\r\n  _changeRU(e) {\r\n    const {mx,my} = this._updateXY(e);\r\n    let newY, newW, newH;\r\n    newW = Math.max(50, Math.min(this.max.w, mx+this.comp.rdrux-this.viewport.x));\r\n    if (this.viewport.ar) {\r\n      newH = Math.max(10, newW/this.viewport.ar);\r\n      newY = Math.max(0, this.viewport.y+(this.viewport.h-newH));\r\n      if (!newY) {\r\n        newW = this.viewport.w+this.viewport.y*this.viewport.ar\r\n        newH = Math.max(10, newW/this.viewport.ar);\r\n      }\r\n    } else {\r\n      newY = Math.max(0, my+this.comp.luruy);\r\n      newH = Math.max(50, this.viewport.h+(this.viewport.y-newY));\r\n      if (newH === 50) {\r\n        newY = newY === 0?newY:this.viewport.y\r\n        newH = this.viewport.h\r\n      }\r\n    }\r\n\r\n    this._draw(false,newY,newW,newH);\r\n  }\r\n\r\n  _changeRD(e) {\r\n    const {mx,my} = this._updateXY(e);\r\n    let newW = Math.max(50, Math.min(this.max.w, mx+this.comp.rdrux-this.viewport.x));\r\n    let newH;\r\n    if (this.viewport.ar) {\r\n      newH = Math.max(10, Math.min(this.max.h, newW/this.viewport.ar));\r\n      newW = newH*this.viewport.ar;\r\n    } else {\r\n      newH = Math.max(50, Math.min(this.max.h, my+this.comp.rdldy-this.viewport.y));\r\n    }\r\n\r\n    this._draw(false,false,newW,newH);\r\n  }\r\n\r\n  _updateXY(e) {\r\n    let mx,my\r\n    if (e.touches) {\r\n      mx = parseInt(e.touches[0].clientX - this.XY.offsetX);\r\n      my = parseInt(e.touches[0].clientY - this.XY.offsetY);\r\n    } else {\r\n      mx = parseInt(e.clientX - this.XY.offsetX);\r\n      my = parseInt(e.clientY - this.XY.offsetY);\r\n    }\r\n\r\n    this.XY.startX = mx;\r\n    this.XY.startY = my;\r\n    return {mx,my};\r\n  }\r\n\r\n  findXY() {\r\n    const bb = this.canvas.getBoundingClientRect();\r\n    this.XY.offsetX = bb.left;\r\n    this.XY.offsetY = bb.top;\r\n  }\r\n\r\n  addEventListeners() {\r\n    this.findXY();\r\n    this.canvas.onmousedown = this._onMouseDown.bind(this);\r\n    this.canvas.onmouseup = this._onMouseUp.bind(this);\r\n    this.canvas.onmousemove = this._handleMove.bind(this);\r\n    this.canvas.onmouseleave = this._onMouseUp.bind(this);\r\n\r\n    this.canvas.ontouchstart = this._onMouseDown.bind(this);\r\n    this.canvas.ontouchend = this._onMouseUp.bind(this);\r\n    this.canvas.ontouchmove = this._handleMove.bind(this);\r\n    this.canvas.ontouchcancel = this._onMouseUp.bind(this);\r\n  }\r\n}\n\n//# sourceURL=webpack://cuttie/./node_modules/cuttie/src/handler.js?");

/***/ }),

/***/ "./node_modules/cuttie/src/imageLayaout.js":
/*!*************************************************!*\
  !*** ./node_modules/cuttie/src/imageLayaout.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ CuttieImage)\n/* harmony export */ });\nclass CuttieImage {\r\n  constructor(canvas, bg) {\r\n    this.canvas = canvas;\r\n    this.bg = bg;\r\n    this.image;\r\n    this.scale = 1;\r\n  }\r\n\r\n  initImage(url, onLoad) {\r\n    const img = new Image();\r\n    img.src = url;\r\n    this.image = img;\r\n    this.image.onload = () => {\r\n      this._onLoadImage();\r\n      onLoad();\r\n    }\r\n  }\r\n\r\n  _onLoadImage() {\r\n    this.scale = Math.min(this.canvas.width / this.image.width, this.canvas.height / this.image.height);\r\n    this.canvas.width = this.image.width * this.scale;\r\n    this.canvas.height =  this.image.height * this.scale;\r\n    this.bg.width = this.canvas.width;\r\n    this.bg.height = this.canvas.height;\r\n    this.bg.src = this.image.src;\r\n  }\r\n}\n\n//# sourceURL=webpack://cuttie/./node_modules/cuttie/src/imageLayaout.js?");

/***/ }),

/***/ "./node_modules/cuttie/src/viewport.js":
/*!*********************************************!*\
  !*** ./node_modules/cuttie/src/viewport.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ CuttieViewport)\n/* harmony export */ });\nclass CuttieViewport {\r\n  constructor(canvas) {\r\n    this.canvas = canvas\r\n    this.ctx;\r\n    this.maxW;\r\n    this.maxH;\r\n    this.viewport = {x:0,y:0,w:0,h:0,ar:0,changed:false,corners:{lu:false,ld:false,ru:false,rd:false}};\r\n  }\r\n\r\n  clearScene() {\r\n    this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);\r\n  }\r\n\r\n  drawViewport() {\r\n    this.ctx.fillStyle = '#00000070';\r\n    this.ctx.fillRect(0,0,this.viewport.x,this.canvas.height);\r\n    this.ctx.fillRect((this.viewport.x + this.viewport.w),0,this.canvas.width-(this.viewport.x + this.viewport.w),this.canvas.height);\r\n    this.ctx.fillRect(this.viewport.x,0,this.viewport.w,this.viewport.y);\r\n    this.ctx.fillRect(this.viewport.x,this.viewport.y+this.viewport.h,this.viewport.w,this.canvas.height-(this.viewport.y+this.viewport.h));\r\n    this.maxW = this.canvas.width - this.viewport.x;\r\n    this.maxH = this.canvas.height - this.viewport.y;\r\n    if (this.viewport.changed) {\r\n      this.drawCorners();\r\n    }\r\n  }\r\n\r\n  drawCorners() {\r\n    const {corners} = this.viewport;\r\n    this.ctx.fillStyle = corners.lu ? '#e89643' : '#f1f1f1';\r\n    this.ctx.fillRect(this.viewport.x,this.viewport.y,5,5);\r\n    this.ctx.fillStyle = corners.ld ? '#e89643' : '#f1f1f1';\r\n    this.ctx.fillRect(this.viewport.x,this.viewport.y+this.viewport.h-5,5,5);\r\n    this.ctx.fillStyle = corners.ru ? '#e89643' : '#f1f1f1';\r\n    this.ctx.fillRect(this.viewport.x+this.viewport.w-5,this.viewport.y,5,5);\r\n    this.ctx.fillStyle = corners.rd ? '#e89643' : '#f1f1f1';\r\n    this.ctx.fillRect(this.viewport.x+this.viewport.w-5,this.viewport.y+this.viewport.h-5,5,5);\r\n  }\r\n\r\n  getMax() {\r\n    return {maxW:this.maxW,maxH:this.maxH}\r\n  }\r\n\r\n  getPosition() {\r\n    return {x: this.viewport.x, y: this.viewport.y, width: this.viewport.w, height: this.viewport.h}\r\n  }\r\n\r\n  updatePosition(x,y,w,h) {\r\n    this.viewport.h=h?Math.min(this.canvas.height, h):this.viewport.h;\r\n    this.viewport.w=w?Math.min(this.canvas.width, w):this.viewport.w;\r\n    this.viewport.x=x||x===0?x:this.viewport.x;\r\n    this.viewport.y=y||y===0?y:this.viewport.y;\r\n    this.clearScene();\r\n    this.drawViewport();\r\n  }\r\n\r\n  updateWithAr(ar) {\r\n    this.viewport.ar = ar;\r\n    this.viewport.h = this.viewport.w/ar;\r\n      \r\n\r\n    if (this.canvas.height < this.viewport.h) {\r\n      this.viewport.h = this.canvas.height;\r\n    }\r\n\r\n    this.viewport.w = Math.floor(this.viewport.h*ar);\r\n    this.viewport.h = this.viewport.w/ar;\r\n  }\r\n\r\n  initViewport(params) {\r\n    this.ctx = this.canvas.getContext('2d');\r\n    this.viewport = {...this.viewport, h: params.height ? Math.abs(Number(params.height)):100, w: params.width ? Math.abs(Number(params.width)):100, changed: Boolean(params.isChanged)};\r\n\r\n    if (this.canvas.width < this.viewport.w) {\r\n      this.viewport.w = this.canvas.width;\r\n    }\r\n\r\n    if (this.canvas.height < this.viewport.h) {\r\n      this.viewport.h = this.canvas.height;\r\n    }\r\n\r\n    if (params['aspect-ratio']) {\r\n      const ar = Number(params['aspect-ratio']);\r\n      this.updateWithAr(ar);\r\n    }\r\n\r\n    this.drawViewport();\r\n  }\r\n\r\n  updateAr(ar) {\r\n    if (!ar) {\r\n      this.viewport.ar = 0;\r\n    } else {\r\n      this.updateWithAr(ar);\r\n    }\r\n    this.clearScene();\r\n    this.drawViewport();\r\n  }\r\n}\n\n//# sourceURL=webpack://cuttie/./node_modules/cuttie/src/viewport.js?");

/***/ }),

/***/ "./src/styles.css":
/*!************************!*\
  !*** ./src/styles.css ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ \"./node_modules/style-loader/dist/runtime/styleDomAPI.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ \"./node_modules/style-loader/dist/runtime/insertBySelector.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ \"./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ \"./node_modules/style-loader/dist/runtime/insertStyleElement.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ \"./node_modules/style-loader/dist/runtime/styleTagTransform.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./styles.css */ \"./node_modules/css-loader/dist/cjs.js!./src/styles.css\");\n\n      \n      \n      \n      \n      \n      \n      \n      \n      \n\nvar options = {};\n\noptions.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());\noptions.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());\noptions.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, \"head\");\noptions.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());\noptions.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"], options);\n\n\n\n\n       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"] && _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals ? _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals : undefined);\n\n\n//# sourceURL=webpack://cuttie/./src/styles.css?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

eval("\n\nvar stylesInDOM = [];\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n  for (var i = 0; i < stylesInDOM.length; i++) {\n    if (stylesInDOM[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n  return result;\n}\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var indexByIdentifier = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3],\n      supports: item[4],\n      layer: item[5]\n    };\n    if (indexByIdentifier !== -1) {\n      stylesInDOM[indexByIdentifier].references++;\n      stylesInDOM[indexByIdentifier].updater(obj);\n    } else {\n      var updater = addElementStyle(obj, options);\n      options.byIndex = i;\n      stylesInDOM.splice(i, 0, {\n        identifier: identifier,\n        updater: updater,\n        references: 1\n      });\n    }\n    identifiers.push(identifier);\n  }\n  return identifiers;\n}\nfunction addElementStyle(obj, options) {\n  var api = options.domAPI(options);\n  api.update(obj);\n  var updater = function updater(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {\n        return;\n      }\n      api.update(obj = newObj);\n    } else {\n      api.remove();\n    }\n  };\n  return updater;\n}\nmodule.exports = function (list, options) {\n  options = options || {};\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDOM[index].references--;\n    }\n    var newLastIdentifiers = modulesToDom(newList, options);\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n      var _index = getIndexByIdentifier(_identifier);\n      if (stylesInDOM[_index].references === 0) {\n        stylesInDOM[_index].updater();\n        stylesInDOM.splice(_index, 1);\n      }\n    }\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack://cuttie/./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

eval("\n\nvar memo = {};\n\n/* istanbul ignore next  */\nfunction getTarget(target) {\n  if (typeof memo[target] === \"undefined\") {\n    var styleTarget = document.querySelector(target);\n\n    // Special case to return head of iframe instead of iframe itself\n    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n      try {\n        // This will throw an exception if access to iframe is blocked\n        // due to cross-origin restrictions\n        styleTarget = styleTarget.contentDocument.head;\n      } catch (e) {\n        // istanbul ignore next\n        styleTarget = null;\n      }\n    }\n    memo[target] = styleTarget;\n  }\n  return memo[target];\n}\n\n/* istanbul ignore next  */\nfunction insertBySelector(insert, style) {\n  var target = getTarget(insert);\n  if (!target) {\n    throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n  }\n  target.appendChild(style);\n}\nmodule.exports = insertBySelector;\n\n//# sourceURL=webpack://cuttie/./node_modules/style-loader/dist/runtime/insertBySelector.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction insertStyleElement(options) {\n  var element = document.createElement(\"style\");\n  options.setAttributes(element, options.attributes);\n  options.insert(element, options.options);\n  return element;\n}\nmodule.exports = insertStyleElement;\n\n//# sourceURL=webpack://cuttie/./node_modules/style-loader/dist/runtime/insertStyleElement.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\n/* istanbul ignore next  */\nfunction setAttributesWithoutAttributes(styleElement) {\n  var nonce =  true ? __webpack_require__.nc : 0;\n  if (nonce) {\n    styleElement.setAttribute(\"nonce\", nonce);\n  }\n}\nmodule.exports = setAttributesWithoutAttributes;\n\n//# sourceURL=webpack://cuttie/./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction apply(styleElement, options, obj) {\n  var css = \"\";\n  if (obj.supports) {\n    css += \"@supports (\".concat(obj.supports, \") {\");\n  }\n  if (obj.media) {\n    css += \"@media \".concat(obj.media, \" {\");\n  }\n  var needLayer = typeof obj.layer !== \"undefined\";\n  if (needLayer) {\n    css += \"@layer\".concat(obj.layer.length > 0 ? \" \".concat(obj.layer) : \"\", \" {\");\n  }\n  css += obj.css;\n  if (needLayer) {\n    css += \"}\";\n  }\n  if (obj.media) {\n    css += \"}\";\n  }\n  if (obj.supports) {\n    css += \"}\";\n  }\n  var sourceMap = obj.sourceMap;\n  if (sourceMap && typeof btoa !== \"undefined\") {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  }\n\n  // For old IE\n  /* istanbul ignore if  */\n  options.styleTagTransform(css, styleElement, options.options);\n}\nfunction removeStyleElement(styleElement) {\n  // istanbul ignore if\n  if (styleElement.parentNode === null) {\n    return false;\n  }\n  styleElement.parentNode.removeChild(styleElement);\n}\n\n/* istanbul ignore next  */\nfunction domAPI(options) {\n  if (typeof document === \"undefined\") {\n    return {\n      update: function update() {},\n      remove: function remove() {}\n    };\n  }\n  var styleElement = options.insertStyleElement(options);\n  return {\n    update: function update(obj) {\n      apply(styleElement, options, obj);\n    },\n    remove: function remove() {\n      removeStyleElement(styleElement);\n    }\n  };\n}\nmodule.exports = domAPI;\n\n//# sourceURL=webpack://cuttie/./node_modules/style-loader/dist/runtime/styleDomAPI.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction styleTagTransform(css, styleElement) {\n  if (styleElement.styleSheet) {\n    styleElement.styleSheet.cssText = css;\n  } else {\n    while (styleElement.firstChild) {\n      styleElement.removeChild(styleElement.firstChild);\n    }\n    styleElement.appendChild(document.createTextNode(css));\n  }\n}\nmodule.exports = styleTagTransform;\n\n//# sourceURL=webpack://cuttie/./node_modules/style-loader/dist/runtime/styleTagTransform.js?");

/***/ }),

/***/ "./src/asset/arrow_up.svg":
/*!********************************!*\
  !*** ./src/asset/arrow_up.svg ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"bf1b780cdeafc171c8d2.svg\";\n\n//# sourceURL=webpack://cuttie/./src/asset/arrow_up.svg?");

/***/ }),

/***/ "./src/asset/close.svg":
/*!*****************************!*\
  !*** ./src/asset/close.svg ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"3c9bb5f193a692fa8092.svg\";\n\n//# sourceURL=webpack://cuttie/./src/asset/close.svg?");

/***/ }),

/***/ "./src/asset/cuttie_short.svg":
/*!************************************!*\
  !*** ./src/asset/cuttie_short.svg ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"5e14a42e0abeb948f636.svg\";\n\n//# sourceURL=webpack://cuttie/./src/asset/cuttie_short.svg?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript && document.currentScript.tagName.toUpperCase() === 'SCRIPT')
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && (!scriptUrl || !/^http(s?):/.test(scriptUrl))) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/app.js");
/******/ 	
/******/ })()
;