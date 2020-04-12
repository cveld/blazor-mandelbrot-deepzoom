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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/canvasinterop.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/MandelbrotCanvas.ts":
/*!*********************************!*\
  !*** ./src/MandelbrotCanvas.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Utility_1 = __webpack_require__(/*! ./Utility */ "./src/Utility.ts");
class MandelbrotCanvas {
    constructor() {
        this.rect = {};
        this.drag = false;
    }
    drawPixels(x, y, xw, yw, pixelsbase64) {
        //const pixels = new Uint8Array(atob(pixelsbase64).split("").map(function (c) {
        //    return c.charCodeAt(0);
        //}));
        const pixels = Utility_1.base64ToArrayBuffer(pixelsbase64);
        this.mandelbrot = this.ctx.createImageData(xw, yw);
        // let imageIdx = 0;
        // Iterate through every pixel
        for (let i = 0; i < pixels.length; i++) {
            // Modify pixel data
            this.mandelbrot.data[i] = pixels[i];
        }
        // Draw image data to the canvas
        this.ctx.putImageData(this.mandelbrot, x, y);
    }
    init(id, dotnetobjref) {
        this.dotnetobjref = dotnetobjref;
        this.ctx = BlazorExtensions.Canvas2d.getContext({
            id: id
        });
        this.ctx.canvas.addEventListener('mousedown', (e) => this.mouseDown(e), false);
        this.ctx.canvas.addEventListener('mouseup', (e) => this.mouseUp(e), false);
        this.ctx.canvas.addEventListener('mousemove', (e) => this.mouseMove(e), false);
    }
    mouseDown(e) {
        const element = e.target;
        this.rect.startX = e.pageX - element.offsetLeft;
        this.rect.startY = e.pageY - element.offsetTop;
        this.drag = true;
    }
    mouseUp(e) {
        this.drag = false;
        // this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.draw();
        this.dotnetobjref.invokeMethod('Dragged', this.rect, this.drag);
    }
    mouseMove(e) {
        const element = e.target;
        if (this.drag) {
            this.rect.w = (e.pageX - element.offsetLeft) - this.rect.startX;
            this.rect.h = (e.pageY - element.offsetTop) - this.rect.startY;
            this.draw();
            this.dotnetobjref.invokeMethod('Dragged', this.rect, this.drag);
        }
    }
    draw() {
        if (this.mandelbrot) {
            this.ctx.putImageData(this.mandelbrot, 0, 0);
        }
        else {
            this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        }
        if (this.drag) {
            this.ctx.setLineDash([6]);
            this.ctx.strokeStyle = "#C0C0C0";
            this.ctx.strokeRect(this.rect.startX, this.rect.startY, this.rect.w, this.rect.h);
        }
    }
    destroy() {
        this.ctx.canvas.removeEventListener('mousedown', this.mouseDown);
        this.ctx.canvas.removeEventListener('mouseup', this.mouseDown);
        this.ctx.canvas.removeEventListener('mousemove', this.mouseDown);
    }
}
exports.MandelbrotCanvas = MandelbrotCanvas;


/***/ }),

/***/ "./src/Utility.ts":
/*!************************!*\
  !*** ./src/Utility.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function base64ToArrayBuffer(base64) {
    const binaryString = window.atob(base64);
    const binaryLen = binaryString.length;
    const bytes = new Uint8Array(binaryLen);
    for (let i = 0; i < binaryLen; i++) {
        const ascii = binaryString.charCodeAt(i);
        bytes[i] = ascii;
    }
    return bytes;
}
exports.base64ToArrayBuffer = base64ToArrayBuffer;


/***/ }),

/***/ "./src/canvasinterop.ts":
/*!******************************!*\
  !*** ./src/canvasinterop.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const MandelbrotCanvas_1 = __webpack_require__(/*! ./MandelbrotCanvas */ "./src/MandelbrotCanvas.ts");
window.canvasInterop = new MandelbrotCanvas_1.MandelbrotCanvas();


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL01hbmRlbGJyb3RDYW52YXMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1V0aWxpdHkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NhbnZhc2ludGVyb3AudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDbEZBLDJFQUFnRDtBQVdoRDtJQUFBO1FBR0ksU0FBSSxHQUFnQyxFQUFFLENBQUM7UUFDdkMsU0FBSSxHQUFHLEtBQUssQ0FBQztJQTRFakIsQ0FBQztJQXpFRyxVQUFVLENBQUMsQ0FBUyxFQUFFLENBQVMsRUFBRSxFQUFVLEVBQUUsRUFBVSxFQUFFLFlBQW9CO1FBQ3pFLCtFQUErRTtRQUMvRSw2QkFBNkI7UUFDN0IsTUFBTTtRQUVOLE1BQU0sTUFBTSxHQUFHLDZCQUFtQixDQUFDLFlBQVks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QUMsV0FBVyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNyRSxDQUFDO0NBQ0o7QUFoRkQsNENBZ0ZDOzs7Ozs7Ozs7Ozs7Ozs7QUMzRkQsNkJBQW9DLE1BQWM7SUFDOUMsTUFBTSxZQUFZLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN6QyxNQUFNLFNBQVMsR0FBRyxZQUFZLENBQUMsTUFBTSxDQUFDO0lBQ3RDLE1BQU0sS0FBSyxHQUFHLElBQUksVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3hDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDaEMsTUFBTSxLQUFLLEdBQUcsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN6QyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDO0tBQ3BCO0lBQ0QsT0FBTyxLQUFLLENBQUM7QUFDakIsQ0FBQztBQVRELGtEQVNDOzs7Ozs7Ozs7Ozs7Ozs7QUNURCxzR0FBc0Q7QUFNdEQsTUFBTSxDQUFDLGFBQWEsR0FBRyxJQUFJLG1DQUFnQixFQUFFLENBQUMiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvY2FudmFzaW50ZXJvcC50c1wiKTtcbiIsImltcG9ydCB7IGJhc2U2NFRvQXJyYXlCdWZmZXIgfSBmcm9tIFwiLi9VdGlsaXR5XCI7XHJcblxyXG5kZWNsYXJlIG5hbWVzcGFjZSBCbGF6b3JFeHRlbnNpb25zIHtcclxuICAgIGNsYXNzIENhbnZhczJkIHtcclxuICAgICAgICBzdGF0aWMgZ2V0Q29udGV4dChjYW52YXM6IHsgaWQgfSk6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRDtcclxuICAgIH1cclxufVxyXG5kZWNsYXJlIGNsYXNzIERvdE5ldCB7XHJcbiAgICBzdGF0aWMgaW52b2tlTWV0aG9kQXN5bmMoLi4uYXJnczogYW55W10pO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTWFuZGVsYnJvdENhbnZhcyB7XHJcbiAgICBjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRDtcclxuICAgIG1hbmRlbGJyb3Q6IEltYWdlRGF0YTtcclxuICAgIHJlY3Q6IHsgc3RhcnRYPywgc3RhcnRZPywgdz8sIGg/fSA9IHt9O1xyXG4gICAgZHJhZyA9IGZhbHNlO1xyXG4gICAgZG90bmV0b2JqcmVmO1xyXG4gICBcclxuICAgIGRyYXdQaXhlbHMoeDogbnVtYmVyLCB5OiBudW1iZXIsIHh3OiBudW1iZXIsIHl3OiBudW1iZXIsIHBpeGVsc2Jhc2U2NDogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgLy9jb25zdCBwaXhlbHMgPSBuZXcgVWludDhBcnJheShhdG9iKHBpeGVsc2Jhc2U2NCkuc3BsaXQoXCJcIikubWFwKGZ1bmN0aW9uIChjKSB7XHJcbiAgICAgICAgLy8gICAgcmV0dXJuIGMuY2hhckNvZGVBdCgwKTtcclxuICAgICAgICAvL30pKTtcclxuXHJcbiAgICAgICAgY29uc3QgcGl4ZWxzID0gYmFzZTY0VG9BcnJheUJ1ZmZlcihwaXhlbHNiYXNlNjQpO1xyXG5cclxuICAgICAgICB0aGlzLm1hbmRlbGJyb3QgPSB0aGlzLmN0eC5jcmVhdGVJbWFnZURhdGEoeHcsIHl3KTtcclxuXHJcbiAgICAgICAgLy8gbGV0IGltYWdlSWR4ID0gMDtcclxuICAgICAgICAvLyBJdGVyYXRlIHRocm91Z2ggZXZlcnkgcGl4ZWxcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBpeGVscy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAvLyBNb2RpZnkgcGl4ZWwgZGF0YVxyXG4gICAgICAgICAgICB0aGlzLm1hbmRlbGJyb3QuZGF0YVtpXSA9IHBpeGVsc1tpXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIERyYXcgaW1hZ2UgZGF0YSB0byB0aGUgY2FudmFzXHJcbiAgICAgICAgdGhpcy5jdHgucHV0SW1hZ2VEYXRhKHRoaXMubWFuZGVsYnJvdCwgeCwgeSk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdChpZDogbnVtYmVyLCBkb3RuZXRvYmpyZWYpIHtcclxuICAgICAgICB0aGlzLmRvdG5ldG9ianJlZiA9IGRvdG5ldG9ianJlZjtcclxuICAgICAgICB0aGlzLmN0eCA9IEJsYXpvckV4dGVuc2lvbnMuQ2FudmFzMmQuZ2V0Q29udGV4dCh7XHJcbiAgICAgICAgICAgIGlkOiBpZFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuY3R4LmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCAoZSkgPT4gdGhpcy5tb3VzZURvd24oZSksIGZhbHNlKTtcclxuICAgICAgICB0aGlzLmN0eC5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIChlKSA9PiB0aGlzLm1vdXNlVXAoZSksIGZhbHNlKTtcclxuICAgICAgICB0aGlzLmN0eC5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgKGUpID0+IHRoaXMubW91c2VNb3ZlKGUpLCBmYWxzZSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIG1vdXNlRG93bihlOiBNb3VzZUV2ZW50KSB7XHJcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IGUudGFyZ2V0IGFzIEhUTUxFbGVtZW50O1xyXG4gICAgICAgIHRoaXMucmVjdC5zdGFydFggPSBlLnBhZ2VYIC0gZWxlbWVudC5vZmZzZXRMZWZ0O1xyXG4gICAgICAgIHRoaXMucmVjdC5zdGFydFkgPSBlLnBhZ2VZIC0gZWxlbWVudC5vZmZzZXRUb3A7XHJcbiAgICAgICAgdGhpcy5kcmFnID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBtb3VzZVVwKGU6IE1vdXNlRXZlbnQpIHtcclxuICAgICAgICB0aGlzLmRyYWcgPSBmYWxzZTtcclxuICAgICAgICAvLyB0aGlzLmN0eC5jbGVhclJlY3QoMCwgMCwgdGhpcy5jdHguY2FudmFzLndpZHRoLCB0aGlzLmN0eC5jYW52YXMuaGVpZ2h0KTtcclxuICAgICAgICB0aGlzLmRyYXcoKTtcclxuICAgICAgICB0aGlzLmRvdG5ldG9ianJlZi5pbnZva2VNZXRob2QoJ0RyYWdnZWQnLCB0aGlzLnJlY3QsIHRoaXMuZHJhZyk7XHJcbiAgICB9XHJcbiAgICBtb3VzZU1vdmUoZTogTW91c2VFdmVudCkge1xyXG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSBlLnRhcmdldCBhcyBIVE1MRWxlbWVudDtcclxuICAgICAgICBpZiAodGhpcy5kcmFnKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVjdC53ID0gKGUucGFnZVggLSBlbGVtZW50Lm9mZnNldExlZnQpIC0gdGhpcy5yZWN0LnN0YXJ0WDtcclxuICAgICAgICAgICAgdGhpcy5yZWN0LmggPSAoZS5wYWdlWSAtIGVsZW1lbnQub2Zmc2V0VG9wKSAtIHRoaXMucmVjdC5zdGFydFk7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuZHJhdygpO1xyXG4gICAgICAgICAgICB0aGlzLmRvdG5ldG9ianJlZi5pbnZva2VNZXRob2QoJ0RyYWdnZWQnLCB0aGlzLnJlY3QsIHRoaXMuZHJhZyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGRyYXcoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubWFuZGVsYnJvdCkge1xyXG4gICAgICAgICAgICB0aGlzLmN0eC5wdXRJbWFnZURhdGEodGhpcy5tYW5kZWxicm90LCAwLCAwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3R4LmNsZWFyUmVjdCgwLCAwLCB0aGlzLmN0eC5jYW52YXMud2lkdGgsIHRoaXMuY3R4LmNhbnZhcy5oZWlnaHQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5kcmFnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3R4LnNldExpbmVEYXNoKFs2XSk7XHJcbiAgICAgICAgICAgIHRoaXMuY3R4LnN0cm9rZVN0eWxlID0gXCIjQzBDMEMwXCI7XHJcbiAgICAgICAgICAgIHRoaXMuY3R4LnN0cm9rZVJlY3QodGhpcy5yZWN0LnN0YXJ0WCwgdGhpcy5yZWN0LnN0YXJ0WSwgdGhpcy5yZWN0LncsIHRoaXMucmVjdC5oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZGVzdHJveSgpIHtcclxuICAgICAgICB0aGlzLmN0eC5jYW52YXMucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5tb3VzZURvd24pO1xyXG4gICAgICAgIHRoaXMuY3R4LmNhbnZhcy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5tb3VzZURvd24pO1xyXG4gICAgICAgIHRoaXMuY3R4LmNhbnZhcy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLm1vdXNlRG93bik7XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgZnVuY3Rpb24gYmFzZTY0VG9BcnJheUJ1ZmZlcihiYXNlNjQ6IHN0cmluZykge1xyXG4gICAgY29uc3QgYmluYXJ5U3RyaW5nID0gd2luZG93LmF0b2IoYmFzZTY0KTtcclxuICAgIGNvbnN0IGJpbmFyeUxlbiA9IGJpbmFyeVN0cmluZy5sZW5ndGg7XHJcbiAgICBjb25zdCBieXRlcyA9IG5ldyBVaW50OEFycmF5KGJpbmFyeUxlbik7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJpbmFyeUxlbjsgaSsrKSB7XHJcbiAgICAgICAgY29uc3QgYXNjaWkgPSBiaW5hcnlTdHJpbmcuY2hhckNvZGVBdChpKTtcclxuICAgICAgICBieXRlc1tpXSA9IGFzY2lpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGJ5dGVzO1xyXG59XHJcbiIsImltcG9ydCB7IE1hbmRlbGJyb3RDYW52YXMgfSBmcm9tICcuL01hbmRlbGJyb3RDYW52YXMnO1xyXG5cclxuZGVjbGFyZSBnbG9iYWwge1xyXG4gICAgaW50ZXJmYWNlIFdpbmRvdyB7IGNhbnZhc0ludGVyb3A6IGFueSB9XHJcbn1cclxuXHJcbndpbmRvdy5jYW52YXNJbnRlcm9wID0gbmV3IE1hbmRlbGJyb3RDYW52YXMoKTsiXSwic291cmNlUm9vdCI6IiJ9