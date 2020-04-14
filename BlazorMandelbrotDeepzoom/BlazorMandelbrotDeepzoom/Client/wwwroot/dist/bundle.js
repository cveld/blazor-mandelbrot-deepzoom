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
    drawPixelsString(pixelsbase64) {
        //const pixels = new Uint8Array(atob(pixelsbase64).split("").map(function (c) {
        //    return c.charCodeAt(0);
        //}));
        const pixels = Utility_1.base64ToArrayBuffer(pixelsbase64);
        this.drawPixelsUint8Array(pixels);
        // Draw image data to the canvas        
    }
    drawPixelsUint8Array(pixels) {
        for (let i = 0; i < pixels.length; i++) {
            this.mandelbrot.data[i] = pixels[i];
        }
        this.draw();
    }
    getImageFromServer(url) {
        fetch(url).then(response => {
            response.arrayBuffer().then(arrayBuffer => {
                this.drawPixelsUint8Array(new Uint8Array(arrayBuffer));
            });
        });
    }
    init(id, dotnetobjref, xw, yw) {
        this.xw = xw;
        this.yw = yw;
        this.dotnetobjref = dotnetobjref;
        this.ctx = BlazorExtensions.Canvas2d.getContext({
            id: id
        });
        this.ctx.canvas.addEventListener('mousedown', (e) => this.mouseDown(e), false);
        this.ctx.canvas.addEventListener('mouseup', (e) => this.mouseUp(e), false);
        this.ctx.canvas.addEventListener('mousemove', (e) => this.mouseMove(e), false);
        this.mandelbrot = this.ctx.createImageData(xw, yw);
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
            const w = (e.pageX - element.offsetLeft) - this.rect.startX;
            const h = (e.pageY - element.offsetTop) - this.rect.startY;
            this.rect.w = w > h ? w : h;
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
        if (this.rect.startX) {
            this.ctx.setLineDash([6]);
            this.ctx.strokeStyle = "#C0C0C0";
            this.ctx.strokeRect(this.rect.startX - this.rect.w, this.rect.startY - this.rect.w * this.yw / this.xw, 2 * this.rect.w, 2 * this.rect.w * this.yw / this.xw);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL01hbmRlbGJyb3RDYW52YXMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1V0aWxpdHkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NhbnZhc2ludGVyb3AudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDbEZBLDJFQUFnRDtBQVdoRDtJQUFBO1FBS0ksU0FBSSxHQUE0QixFQUFFLENBQUM7UUFDbkMsU0FBSSxHQUFHLEtBQUssQ0FBQztJQXNGakIsQ0FBQztJQW5GRyxnQkFBZ0IsQ0FBQyxZQUFvQjtRQUNqQywrRUFBK0U7UUFDL0UsNkJBQTZCO1FBQzdCLE1BQU07UUFDTixNQUFNLE1BQU0sR0FBRyw2QkFBbUIsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsb0JBQW9CLENBQUMs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QztRQUN6QyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDO0tBQ3BCO0lBQ0QsT0FBTyxLQUFLLENBQUM7QUFDakIsQ0FBQztBQVRELGtEQVNDOzs7Ozs7Ozs7Ozs7Ozs7QUNURCxzR0FBc0Q7QUFNdEQsTUFBTSxDQUFDLGFBQWEsR0FBRyxJQUFJLG1DQUFnQixFQUFFLENBQUMiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvY2FudmFzaW50ZXJvcC50c1wiKTtcbiIsImltcG9ydCB7IGJhc2U2NFRvQXJyYXlCdWZmZXIgfSBmcm9tIFwiLi9VdGlsaXR5XCI7XHJcblxyXG5kZWNsYXJlIG5hbWVzcGFjZSBCbGF6b3JFeHRlbnNpb25zIHtcclxuICAgIGNsYXNzIENhbnZhczJkIHtcclxuICAgICAgICBzdGF0aWMgZ2V0Q29udGV4dChjYW52YXM6IHsgaWQgfSk6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRDtcclxuICAgIH1cclxufVxyXG5kZWNsYXJlIGNsYXNzIERvdE5ldCB7XHJcbiAgICBzdGF0aWMgaW52b2tlTWV0aG9kQXN5bmMoLi4uYXJnczogYW55W10pO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTWFuZGVsYnJvdENhbnZhcyB7XHJcbiAgICBjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRDtcclxuICAgIG1hbmRlbGJyb3Q6IEltYWdlRGF0YTtcclxuICAgIHh3OiBudW1iZXI7XHJcbiAgICB5dzogbnVtYmVyO1xyXG4gICAgcmVjdDogeyBzdGFydFg/LCBzdGFydFk/LCB3P30gPSB7fTtcclxuICAgIGRyYWcgPSBmYWxzZTtcclxuICAgIGRvdG5ldG9ianJlZjtcclxuXHJcbiAgICBkcmF3UGl4ZWxzU3RyaW5nKHBpeGVsc2Jhc2U2NDogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgLy9jb25zdCBwaXhlbHMgPSBuZXcgVWludDhBcnJheShhdG9iKHBpeGVsc2Jhc2U2NCkuc3BsaXQoXCJcIikubWFwKGZ1bmN0aW9uIChjKSB7XHJcbiAgICAgICAgLy8gICAgcmV0dXJuIGMuY2hhckNvZGVBdCgwKTtcclxuICAgICAgICAvL30pKTtcclxuICAgICAgICBjb25zdCBwaXhlbHMgPSBiYXNlNjRUb0FycmF5QnVmZmVyKHBpeGVsc2Jhc2U2NCk7XHJcbiAgICAgICAgdGhpcy5kcmF3UGl4ZWxzVWludDhBcnJheShwaXhlbHMpOyAgICAgIFxyXG4gICAgICAgIC8vIERyYXcgaW1hZ2UgZGF0YSB0byB0aGUgY2FudmFzICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBkcmF3UGl4ZWxzVWludDhBcnJheShwaXhlbHM6IFVpbnQ4QXJyYXkpOiB2b2lkIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBpeGVscy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLm1hbmRlbGJyb3QuZGF0YVtpXSA9IHBpeGVsc1tpXTtcclxuICAgICAgICB9ICAgICAgICBcclxuICAgICAgICB0aGlzLmRyYXcoKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRJbWFnZUZyb21TZXJ2ZXIodXJsOiBzdHJpbmcpIHtcclxuICAgICAgICBmZXRjaCh1cmwpLnRoZW4ocmVzcG9uc2UgPT4ge1xyXG4gICAgICAgICAgICByZXNwb25zZS5hcnJheUJ1ZmZlcigpLnRoZW4oYXJyYXlCdWZmZXIgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3UGl4ZWxzVWludDhBcnJheShuZXcgVWludDhBcnJheShhcnJheUJ1ZmZlcikpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0KGlkOiBudW1iZXIsIGRvdG5ldG9ianJlZiwgeHcsIHl3KSB7XHJcbiAgICAgICAgdGhpcy54dyA9IHh3O1xyXG4gICAgICAgIHRoaXMueXcgPSB5dzsgICAgICAgIFxyXG4gICAgICAgIHRoaXMuZG90bmV0b2JqcmVmID0gZG90bmV0b2JqcmVmO1xyXG4gICAgICAgIHRoaXMuY3R4ID0gQmxhem9yRXh0ZW5zaW9ucy5DYW52YXMyZC5nZXRDb250ZXh0KHtcclxuICAgICAgICAgICAgaWQ6IGlkXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5jdHguY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIChlKSA9PiB0aGlzLm1vdXNlRG93bihlKSwgZmFsc2UpO1xyXG4gICAgICAgIHRoaXMuY3R4LmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgKGUpID0+IHRoaXMubW91c2VVcChlKSwgZmFsc2UpO1xyXG4gICAgICAgIHRoaXMuY3R4LmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCAoZSkgPT4gdGhpcy5tb3VzZU1vdmUoZSksIGZhbHNlKTtcclxuICAgICAgICB0aGlzLm1hbmRlbGJyb3QgPSB0aGlzLmN0eC5jcmVhdGVJbWFnZURhdGEoeHcsIHl3KTtcclxuICAgIH1cclxuXHJcbiAgICBtb3VzZURvd24oZTogTW91c2VFdmVudCkge1xyXG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSBlLnRhcmdldCBhcyBIVE1MRWxlbWVudDtcclxuICAgICAgICB0aGlzLnJlY3Quc3RhcnRYID0gZS5wYWdlWCAtIGVsZW1lbnQub2Zmc2V0TGVmdDtcclxuICAgICAgICB0aGlzLnJlY3Quc3RhcnRZID0gZS5wYWdlWSAtIGVsZW1lbnQub2Zmc2V0VG9wO1xyXG4gICAgICAgIHRoaXMuZHJhZyA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgbW91c2VVcChlOiBNb3VzZUV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5kcmFnID0gZmFsc2U7XHJcbiAgICAgICAgLy8gdGhpcy5jdHguY2xlYXJSZWN0KDAsIDAsIHRoaXMuY3R4LmNhbnZhcy53aWR0aCwgdGhpcy5jdHguY2FudmFzLmhlaWdodCk7XHJcbiAgICAgICAgdGhpcy5kcmF3KCk7XHJcbiAgICAgICAgdGhpcy5kb3RuZXRvYmpyZWYuaW52b2tlTWV0aG9kKCdEcmFnZ2VkJywgdGhpcy5yZWN0LCB0aGlzLmRyYWcpO1xyXG4gICAgfVxyXG4gICAgbW91c2VNb3ZlKGU6IE1vdXNlRXZlbnQpIHtcclxuICAgICAgICBjb25zdCBlbGVtZW50ID0gZS50YXJnZXQgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICAgICAgaWYgKHRoaXMuZHJhZykge1xyXG4gICAgICAgICAgICBjb25zdCB3ID0gKGUucGFnZVggLSBlbGVtZW50Lm9mZnNldExlZnQpIC0gdGhpcy5yZWN0LnN0YXJ0WDtcclxuICAgICAgICAgICAgY29uc3QgaCA9IChlLnBhZ2VZIC0gZWxlbWVudC5vZmZzZXRUb3ApIC0gdGhpcy5yZWN0LnN0YXJ0WTsgICBcclxuICAgICAgICAgICAgdGhpcy5yZWN0LncgPSB3ID4gaCA/IHcgOiBoOyBcclxuICAgICAgICAgICAgdGhpcy5kcmF3KCk7XHJcbiAgICAgICAgICAgIHRoaXMuZG90bmV0b2JqcmVmLmludm9rZU1ldGhvZCgnRHJhZ2dlZCcsIHRoaXMucmVjdCwgdGhpcy5kcmFnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZHJhdygpIHtcclxuICAgICAgICBpZiAodGhpcy5tYW5kZWxicm90KSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3R4LnB1dEltYWdlRGF0YSh0aGlzLm1hbmRlbGJyb3QsIDAsIDApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5jdHguY2xlYXJSZWN0KDAsIDAsIHRoaXMuY3R4LmNhbnZhcy53aWR0aCwgdGhpcy5jdHguY2FudmFzLmhlaWdodCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnJlY3Quc3RhcnRYKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3R4LnNldExpbmVEYXNoKFs2XSk7XHJcbiAgICAgICAgICAgIHRoaXMuY3R4LnN0cm9rZVN0eWxlID0gXCIjQzBDMEMwXCI7XHJcbiAgICAgICAgICAgIHRoaXMuY3R4LnN0cm9rZVJlY3QoXHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlY3Quc3RhcnRYIC0gdGhpcy5yZWN0LncsXHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlY3Quc3RhcnRZIC0gdGhpcy5yZWN0LncgKiB0aGlzLnl3IC8gdGhpcy54dyxcclxuICAgICAgICAgICAgICAgIDIgKiB0aGlzLnJlY3QudywgMiAqIHRoaXMucmVjdC53ICogdGhpcy55dyAvIHRoaXMueHcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBkZXN0cm95KCkge1xyXG4gICAgICAgIHRoaXMuY3R4LmNhbnZhcy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLm1vdXNlRG93bik7XHJcbiAgICAgICAgdGhpcy5jdHguY2FudmFzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLm1vdXNlRG93bik7XHJcbiAgICAgICAgdGhpcy5jdHguY2FudmFzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMubW91c2VEb3duKTtcclxuICAgIH1cclxufSIsImV4cG9ydCBmdW5jdGlvbiBiYXNlNjRUb0FycmF5QnVmZmVyKGJhc2U2NDogc3RyaW5nKSB7XHJcbiAgICBjb25zdCBiaW5hcnlTdHJpbmcgPSB3aW5kb3cuYXRvYihiYXNlNjQpO1xyXG4gICAgY29uc3QgYmluYXJ5TGVuID0gYmluYXJ5U3RyaW5nLmxlbmd0aDtcclxuICAgIGNvbnN0IGJ5dGVzID0gbmV3IFVpbnQ4QXJyYXkoYmluYXJ5TGVuKTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYmluYXJ5TGVuOyBpKyspIHtcclxuICAgICAgICBjb25zdCBhc2NpaSA9IGJpbmFyeVN0cmluZy5jaGFyQ29kZUF0KGkpO1xyXG4gICAgICAgIGJ5dGVzW2ldID0gYXNjaWk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYnl0ZXM7XHJcbn1cclxuIiwiaW1wb3J0IHsgTWFuZGVsYnJvdENhbnZhcyB9IGZyb20gJy4vTWFuZGVsYnJvdENhbnZhcyc7XHJcblxyXG5kZWNsYXJlIGdsb2JhbCB7XHJcbiAgICBpbnRlcmZhY2UgV2luZG93IHsgY2FudmFzSW50ZXJvcDogYW55IH1cclxufVxyXG5cclxud2luZG93LmNhbnZhc0ludGVyb3AgPSBuZXcgTWFuZGVsYnJvdENhbnZhcygpOyJdLCJzb3VyY2VSb290IjoiIn0=