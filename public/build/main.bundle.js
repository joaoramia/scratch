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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//PIXI.js Aliases
var Container = PIXI.Container,
    autoDetectRenderer = PIXI.autoDetectRenderer,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite,
    Text = PIXI.Text;

//Create a Pixi stage and renderer and add the renderer.view to the DOM
var stage = new Container(),
    renderer = autoDetectRenderer(window.innerWidth, window.innerHeight, { transparent: true });
document.body.appendChild(renderer.view);

//Create a 2d html5 canvas for the masking (cardcovers)
var maskCanvas = document.createElement("canvas");
document.body.appendChild(maskCanvas);
var maskCtx = maskCanvas.getContext("2d");
maskCanvas.width = window.innerWidth;
maskCanvas.height = window.innerHeight;

//Padding between cards on the canvas
var padding = 20;

//Boolean checking if user clicked and dragged
var drawing = false;

//load an images and run the `setup` function when it's done
loader.add(["../assets/card.jpg", "../assets/scratch.png", "../assets/cover.png"]).load(setup);

//Generate the cards on PIXI.js stage and their covers on the 2d html5 canvas
function setup() {
    generateCards();
}

//Get card sizes according to the window size. It checks device orientation by getting the comparison of the width and height. It assumes squared cards
function getCardSizes() {
    if (window.innerWidth > window.innerHeight) {
        return (window.innerHeight - 3 * padding) / 3;
    } else {
        return (window.innerWidth - 3 * padding) / 3;
    }
}

//Generate cards on PIXI.js stage and their covers on the 2d html5 canvas, by creating a sprite per card. This could be random on the actual game. Here it assumes it is always a 3x3 matrix
function generateCards() {
    var size = getCardSizes();
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {

            var card = new Sprite(resources["../assets/card.jpg"].texture);
            card.width = size;
            card.height = size;
            card.x = padding * (i + 0.5) + size * i;
            card.y = padding * (j + 0.5) + size * j;
            stage.addChild(card);

            var coverImage = new Image();
            coverImage.src = "../assets/cover.png";
            maskCtx.drawImage(coverImage, padding * (i + 0.5) + size * i, padding * (j + 0.5) + size * j, size, size);
        }
    }
    renderer.render(stage);
}

//Scratch function, it sets the 2d html5 canvas globalCompositeOperation to destination-out so the images drawn on it will have the 'eraser' effect, showing the actual card underneath their covers
function scratch(x, y) {
    var scratch = new Image();
    scratch.src = '../assets/scratch.png';

    maskCtx.globalCompositeOperation = "destination-out";
    maskCtx.drawImage(scratch, x - 15, y - 15, 40, 40);
}

//Mousemove event for the scratching mechanism
document.addEventListener("mousemove", function (e) {
    return scratch(e.x, e.y);
});

/***/ })
/******/ ]);
//# sourceMappingURL=main.bundle.js.map