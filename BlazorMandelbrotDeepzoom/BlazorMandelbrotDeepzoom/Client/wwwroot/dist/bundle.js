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

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var Utility_1 = __webpack_require__(/*! ./Utility */ "./src/Utility.ts");
var MandelbrotCanvas = /** @class */ (function () {
    function MandelbrotCanvas() {
        this.rect = {};
        this.drag = false;
    }
    /**
     * Fetches a new mandelbrot image including a new iteration limit based on captured statistics.
     * Returns the new iteration limit
     * @param mPos
     * the real part of the position
     * @param mPosi
     * the imaginary part of the position
     * @param size
     * the mathematical size of the area
     * @param iterationlimit
     * the iteration limit of the Mandelbrot iteration loop
     */
    MandelbrotCanvas.prototype.fetchAndDraw = function (mPos, mPosi, mSize, iterationlimit) {
        return __awaiter(this, void 0, void 0, function () {
            var result, payload;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch("Mandelbrot?pos=" + mPos + "&posi=" + mPosi + "&size=" + mSize + "&iterationlimit=" + iterationlimit)];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, result.json()];
                    case 2:
                        payload = _a.sent();
                        this.drawPixelsString(payload.image);
                        this.dotnetobjref.invokeMethod('NewIterationLimit', payload.newIterationLimit);
                        return [2 /*return*/];
                }
            });
        });
    };
    MandelbrotCanvas.prototype.drawPixelsString = function (pixelsbase64) {
        //const pixels = new Uint8Array(atob(pixelsbase64).split("").map(function (c) {
        //    return c.charCodeAt(0);
        //}));
        var pixels = Utility_1.base64ToArrayBuffer(pixelsbase64);
        this.drawPixelsUint8Array(pixels);
        // Draw image data to the canvas        
    };
    MandelbrotCanvas.prototype.drawPixelsUint8Array = function (pixels) {
        for (var i = 0; i < pixels.length; i++) {
            this.mandelbrot.data[i] = pixels[i];
        }
        this.draw();
    };
    MandelbrotCanvas.prototype.getImageFromServer = function (url) {
        var _this = this;
        fetch(url).then(function (response) {
            response.arrayBuffer().then(function (arrayBuffer) {
                _this.drawPixelsUint8Array(new Uint8Array(arrayBuffer));
            });
        });
    };
    MandelbrotCanvas.prototype.init = function (id, dotnetobjref, xw, yw) {
        var _this = this;
        this.xw = xw;
        this.yw = yw;
        this.dotnetobjref = dotnetobjref;
        this.ctx = BlazorExtensions.Canvas2d.getContext({
            id: id
        });
        this.ctx.canvas.addEventListener('mousedown', function (e) { return _this.mouseDown(e); }, false);
        this.ctx.canvas.addEventListener('mouseup', function (e) { return _this.mouseUp(e); }, false);
        this.ctx.canvas.addEventListener('mousemove', function (e) { return _this.mouseMove(e); }, false);
        this.mandelbrot = this.ctx.createImageData(xw, yw);
    };
    MandelbrotCanvas.prototype.mouseDown = function (e) {
        var element = e.target;
        this.rect.startX = e.pageX - element.offsetLeft;
        this.rect.startY = e.pageY - element.offsetTop;
        this.drag = true;
    };
    MandelbrotCanvas.prototype.mouseUp = function (e) {
        this.drag = false;
        // this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.draw();
        this.dotnetobjref.invokeMethod('Dragged', this.rect, this.drag);
    };
    MandelbrotCanvas.prototype.mouseMove = function (e) {
        var element = e.target;
        if (this.drag) {
            var w = (e.pageX - element.offsetLeft) - this.rect.startX;
            var h = (e.pageY - element.offsetTop) - this.rect.startY;
            this.rect.w = w > h ? w : h;
            this.draw();
            this.dotnetobjref.invokeMethod('Dragged', this.rect, this.drag);
        }
    };
    MandelbrotCanvas.prototype.draw = function () {
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
    };
    MandelbrotCanvas.prototype.destroy = function () {
        this.ctx.canvas.removeEventListener('mousedown', this.mouseDown);
        this.ctx.canvas.removeEventListener('mouseup', this.mouseDown);
        this.ctx.canvas.removeEventListener('mousemove', this.mouseDown);
    };
    return MandelbrotCanvas;
}());
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
    var binaryString = window.atob(base64);
    var binaryLen = binaryString.length;
    var bytes = new Uint8Array(binaryLen);
    for (var i = 0; i < binaryLen; i++) {
        var ascii = binaryString.charCodeAt(i);
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
var MandelbrotCanvas_1 = __webpack_require__(/*! ./MandelbrotCanvas */ "./src/MandelbrotCanvas.ts");
window.canvasInterop = new MandelbrotCanvas_1.MandelbrotCanvas();


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL01hbmRlbGJyb3RDYW52YXMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1V0aWxpdHkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NhbnZhc2ludGVyb3AudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsRkEseUVBQWdEO0FBV2hEO0lBQUE7UUFLSSxTQUFJLEdBQTRCLEVBQUUsQ0FBQztRQUNuQyxTQUFJLEdBQUcsS0FBSyxDQUFDO0lBNEdqQixDQUFDO0lBekdHOzs7Ozs7Ozs7OztPQVdHO0lBQ0csdUNBQVksR0FBbEIsVUFBbUIsSUFBWSxFQUFFLEtBQWEsRUFBRSxLQUFhLEVBQUUsY0FBc0I7Ozs7OzRCQUNsRSxxQkFBTSxLQUFL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QUMsTUFBTSxDQUFDLG1CQUFtQixDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDL0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsbUJBQW1CLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNyRSxDQUFDO0lBQ0wsdUJBQUM7QUFBRCxDQUFDO0FBbEhZLDRDQUFnQjs7Ozs7Ozs7Ozs7Ozs7O0FDWDdCLDZCQUFvQyxNQUFjO0lBQzlDLElBQU0sWUFBWSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDekMsSUFBTSxTQUFTLEdBQUcsWUFBWSxDQUFDLE1BQU0sQ0FBQztJQUN0QyxJQUFNLEtBQUssR0FBRyxJQUFJLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUN4QyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ2hDLElBQU0sS0FBSyxHQUFHLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQztLQUNwQjtJQUNELE9BQU8sS0FBSyxDQUFDO0FBQ2pCLENBQUM7QUFURCxrREFTQzs7Ozs7Ozs7Ozs7Ozs7O0FDVEQsb0dBQXNEO0FBTXRELE1BQU0sQ0FBQyxhQUFhLEdBQUcsSUFBSSxtQ0FBZ0IsRUFBRSxDQUFDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2NhbnZhc2ludGVyb3AudHNcIik7XG4iLCJpbXBvcnQgeyBiYXNlNjRUb0FycmF5QnVmZmVyIH0gZnJvbSBcIi4vVXRpbGl0eVwiO1xyXG5cclxuZGVjbGFyZSBuYW1lc3BhY2UgQmxhem9yRXh0ZW5zaW9ucyB7XHJcbiAgICBjbGFzcyBDYW52YXMyZCB7XHJcbiAgICAgICAgc3RhdGljIGdldENvbnRleHQoY2FudmFzOiB7IGlkIH0pOiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XHJcbiAgICB9XHJcbn1cclxuZGVjbGFyZSBjbGFzcyBEb3ROZXQge1xyXG4gICAgc3RhdGljIGludm9rZU1ldGhvZEFzeW5jKC4uLmFyZ3M6IGFueVtdKTtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIE1hbmRlbGJyb3RDYW52YXMge1xyXG4gICAgY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XHJcbiAgICBtYW5kZWxicm90OiBJbWFnZURhdGE7XHJcbiAgICB4dzogbnVtYmVyO1xyXG4gICAgeXc6IG51bWJlcjtcclxuICAgIHJlY3Q6IHsgc3RhcnRYPywgc3RhcnRZPywgdz99ID0ge307XHJcbiAgICBkcmFnID0gZmFsc2U7XHJcbiAgICBkb3RuZXRvYmpyZWY7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGZXRjaGVzIGEgbmV3IG1hbmRlbGJyb3QgaW1hZ2UgaW5jbHVkaW5nIGEgbmV3IGl0ZXJhdGlvbiBsaW1pdCBiYXNlZCBvbiBjYXB0dXJlZCBzdGF0aXN0aWNzLlxyXG4gICAgICogUmV0dXJucyB0aGUgbmV3IGl0ZXJhdGlvbiBsaW1pdFxyXG4gICAgICogQHBhcmFtIG1Qb3NcclxuICAgICAqIHRoZSByZWFsIHBhcnQgb2YgdGhlIHBvc2l0aW9uXHJcbiAgICAgKiBAcGFyYW0gbVBvc2lcclxuICAgICAqIHRoZSBpbWFnaW5hcnkgcGFydCBvZiB0aGUgcG9zaXRpb25cclxuICAgICAqIEBwYXJhbSBzaXplXHJcbiAgICAgKiB0aGUgbWF0aGVtYXRpY2FsIHNpemUgb2YgdGhlIGFyZWFcclxuICAgICAqIEBwYXJhbSBpdGVyYXRpb25saW1pdFxyXG4gICAgICogdGhlIGl0ZXJhdGlvbiBsaW1pdCBvZiB0aGUgTWFuZGVsYnJvdCBpdGVyYXRpb24gbG9vcFxyXG4gICAgICovICAgIFxyXG4gICAgYXN5bmMgZmV0Y2hBbmREcmF3KG1Qb3M6IHN0cmluZywgbVBvc2k6IHN0cmluZywgbVNpemU6IHN0cmluZywgaXRlcmF0aW9ubGltaXQ6IG51bWJlcik6IFByb21pc2U8dm9pZD4geyAgICAgICAgXHJcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZmV0Y2goYE1hbmRlbGJyb3Q/cG9zPSR7bVBvc30mcG9zaT0ke21Qb3NpfSZzaXplPSR7bVNpemV9Jml0ZXJhdGlvbmxpbWl0PSR7aXRlcmF0aW9ubGltaXR9YCk7XHJcbiAgICAgICAgY29uc3QgcGF5bG9hZDoge1xyXG4gICAgICAgICAgICBpbWFnZTogc3RyaW5nO1xyXG4gICAgICAgICAgICBuZXdJdGVyYXRpb25MaW1pdDogbnVtYmVyO1xyXG4gICAgICAgIH0gPSBhd2FpdCByZXN1bHQuanNvbigpO1xyXG4gICAgICAgIHRoaXMuZHJhd1BpeGVsc1N0cmluZyhwYXlsb2FkLmltYWdlKTsgICAgICAgIFxyXG4gICAgICAgIHRoaXMuZG90bmV0b2JqcmVmLmludm9rZU1ldGhvZCgnTmV3SXRlcmF0aW9uTGltaXQnLCBwYXlsb2FkLm5ld0l0ZXJhdGlvbkxpbWl0KTsgICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGRyYXdQaXhlbHNTdHJpbmcocGl4ZWxzYmFzZTY0OiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICAvL2NvbnN0IHBpeGVscyA9IG5ldyBVaW50OEFycmF5KGF0b2IocGl4ZWxzYmFzZTY0KS5zcGxpdChcIlwiKS5tYXAoZnVuY3Rpb24gKGMpIHtcclxuICAgICAgICAvLyAgICByZXR1cm4gYy5jaGFyQ29kZUF0KDApO1xyXG4gICAgICAgIC8vfSkpO1xyXG4gICAgICAgIGNvbnN0IHBpeGVscyA9IGJhc2U2NFRvQXJyYXlCdWZmZXIocGl4ZWxzYmFzZTY0KTtcclxuICAgICAgICB0aGlzLmRyYXdQaXhlbHNVaW50OEFycmF5KHBpeGVscyk7ICAgICAgXHJcbiAgICAgICAgLy8gRHJhdyBpbWFnZSBkYXRhIHRvIHRoZSBjYW52YXMgICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGRyYXdQaXhlbHNVaW50OEFycmF5KHBpeGVsczogVWludDhBcnJheSk6IHZvaWQge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGl4ZWxzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMubWFuZGVsYnJvdC5kYXRhW2ldID0gcGl4ZWxzW2ldO1xyXG4gICAgICAgIH0gICAgICAgIFxyXG4gICAgICAgIHRoaXMuZHJhdygpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEltYWdlRnJvbVNlcnZlcih1cmw6IHN0cmluZykge1xyXG4gICAgICAgIGZldGNoKHVybCkudGhlbihyZXNwb25zZSA9PiB7XHJcbiAgICAgICAgICAgIHJlc3BvbnNlLmFycmF5QnVmZmVyKCkudGhlbihhcnJheUJ1ZmZlciA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRyYXdQaXhlbHNVaW50OEFycmF5KG5ldyBVaW50OEFycmF5KGFycmF5QnVmZmVyKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXQoaWQ6IG51bWJlciwgZG90bmV0b2JqcmVmLCB4dywgeXcpIHtcclxuICAgICAgICB0aGlzLnh3ID0geHc7XHJcbiAgICAgICAgdGhpcy55dyA9IHl3OyAgICAgICAgXHJcbiAgICAgICAgdGhpcy5kb3RuZXRvYmpyZWYgPSBkb3RuZXRvYmpyZWY7XHJcbiAgICAgICAgdGhpcy5jdHggPSBCbGF6b3JFeHRlbnNpb25zLkNhbnZhczJkLmdldENvbnRleHQoe1xyXG4gICAgICAgICAgICBpZDogaWRcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmN0eC5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgKGUpID0+IHRoaXMubW91c2VEb3duKGUpLCBmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5jdHguY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCAoZSkgPT4gdGhpcy5tb3VzZVVwKGUpLCBmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5jdHguY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIChlKSA9PiB0aGlzLm1vdXNlTW92ZShlKSwgZmFsc2UpO1xyXG4gICAgICAgIHRoaXMubWFuZGVsYnJvdCA9IHRoaXMuY3R4LmNyZWF0ZUltYWdlRGF0YSh4dywgeXcpO1xyXG4gICAgfVxyXG5cclxuICAgIG1vdXNlRG93bihlOiBNb3VzZUV2ZW50KSB7XHJcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IGUudGFyZ2V0IGFzIEhUTUxFbGVtZW50O1xyXG4gICAgICAgIHRoaXMucmVjdC5zdGFydFggPSBlLnBhZ2VYIC0gZWxlbWVudC5vZmZzZXRMZWZ0O1xyXG4gICAgICAgIHRoaXMucmVjdC5zdGFydFkgPSBlLnBhZ2VZIC0gZWxlbWVudC5vZmZzZXRUb3A7XHJcbiAgICAgICAgdGhpcy5kcmFnID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBtb3VzZVVwKGU6IE1vdXNlRXZlbnQpIHtcclxuICAgICAgICB0aGlzLmRyYWcgPSBmYWxzZTtcclxuICAgICAgICAvLyB0aGlzLmN0eC5jbGVhclJlY3QoMCwgMCwgdGhpcy5jdHguY2FudmFzLndpZHRoLCB0aGlzLmN0eC5jYW52YXMuaGVpZ2h0KTtcclxuICAgICAgICB0aGlzLmRyYXcoKTtcclxuICAgICAgICB0aGlzLmRvdG5ldG9ianJlZi5pbnZva2VNZXRob2QoJ0RyYWdnZWQnLCB0aGlzLnJlY3QsIHRoaXMuZHJhZyk7XHJcbiAgICB9XHJcbiAgICBtb3VzZU1vdmUoZTogTW91c2VFdmVudCkge1xyXG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSBlLnRhcmdldCBhcyBIVE1MRWxlbWVudDtcclxuICAgICAgICBpZiAodGhpcy5kcmFnKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHcgPSAoZS5wYWdlWCAtIGVsZW1lbnQub2Zmc2V0TGVmdCkgLSB0aGlzLnJlY3Quc3RhcnRYO1xyXG4gICAgICAgICAgICBjb25zdCBoID0gKGUucGFnZVkgLSBlbGVtZW50Lm9mZnNldFRvcCkgLSB0aGlzLnJlY3Quc3RhcnRZOyAgIFxyXG4gICAgICAgICAgICB0aGlzLnJlY3QudyA9IHcgPiBoID8gdyA6IGg7IFxyXG4gICAgICAgICAgICB0aGlzLmRyYXcoKTtcclxuICAgICAgICAgICAgdGhpcy5kb3RuZXRvYmpyZWYuaW52b2tlTWV0aG9kKCdEcmFnZ2VkJywgdGhpcy5yZWN0LCB0aGlzLmRyYWcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBkcmF3KCkge1xyXG4gICAgICAgIGlmICh0aGlzLm1hbmRlbGJyb3QpIHtcclxuICAgICAgICAgICAgdGhpcy5jdHgucHV0SW1hZ2VEYXRhKHRoaXMubWFuZGVsYnJvdCwgMCwgMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmN0eC5jbGVhclJlY3QoMCwgMCwgdGhpcy5jdHguY2FudmFzLndpZHRoLCB0aGlzLmN0eC5jYW52YXMuaGVpZ2h0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMucmVjdC5zdGFydFgpIHtcclxuICAgICAgICAgICAgdGhpcy5jdHguc2V0TGluZURhc2goWzZdKTtcclxuICAgICAgICAgICAgdGhpcy5jdHguc3Ryb2tlU3R5bGUgPSBcIiNDMEMwQzBcIjtcclxuICAgICAgICAgICAgdGhpcy5jdHguc3Ryb2tlUmVjdChcclxuICAgICAgICAgICAgICAgIHRoaXMucmVjdC5zdGFydFggLSB0aGlzLnJlY3QudyxcclxuICAgICAgICAgICAgICAgIHRoaXMucmVjdC5zdGFydFkgLSB0aGlzLnJlY3QudyAqIHRoaXMueXcgLyB0aGlzLnh3LFxyXG4gICAgICAgICAgICAgICAgMiAqIHRoaXMucmVjdC53LCAyICogdGhpcy5yZWN0LncgKiB0aGlzLnl3IC8gdGhpcy54dyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGRlc3Ryb3koKSB7XHJcbiAgICAgICAgdGhpcy5jdHguY2FudmFzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMubW91c2VEb3duKTtcclxuICAgICAgICB0aGlzLmN0eC5jYW52YXMucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMubW91c2VEb3duKTtcclxuICAgICAgICB0aGlzLmN0eC5jYW52YXMucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5tb3VzZURvd24pO1xyXG4gICAgfVxyXG59IiwiZXhwb3J0IGZ1bmN0aW9uIGJhc2U2NFRvQXJyYXlCdWZmZXIoYmFzZTY0OiBzdHJpbmcpIHtcclxuICAgIGNvbnN0IGJpbmFyeVN0cmluZyA9IHdpbmRvdy5hdG9iKGJhc2U2NCk7XHJcbiAgICBjb25zdCBiaW5hcnlMZW4gPSBiaW5hcnlTdHJpbmcubGVuZ3RoO1xyXG4gICAgY29uc3QgYnl0ZXMgPSBuZXcgVWludDhBcnJheShiaW5hcnlMZW4pO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBiaW5hcnlMZW47IGkrKykge1xyXG4gICAgICAgIGNvbnN0IGFzY2lpID0gYmluYXJ5U3RyaW5nLmNoYXJDb2RlQXQoaSk7XHJcbiAgICAgICAgYnl0ZXNbaV0gPSBhc2NpaTtcclxuICAgIH1cclxuICAgIHJldHVybiBieXRlcztcclxufVxyXG4iLCJpbXBvcnQgeyBNYW5kZWxicm90Q2FudmFzIH0gZnJvbSAnLi9NYW5kZWxicm90Q2FudmFzJztcclxuXHJcbmRlY2xhcmUgZ2xvYmFsIHtcclxuICAgIGludGVyZmFjZSBXaW5kb3cgeyBjYW52YXNJbnRlcm9wOiBhbnkgfVxyXG59XHJcblxyXG53aW5kb3cuY2FudmFzSW50ZXJvcCA9IG5ldyBNYW5kZWxicm90Q2FudmFzKCk7Il0sInNvdXJjZVJvb3QiOiIifQ==