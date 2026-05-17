/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/InterpolationInterop.ts"
/*!*************************************!*\
  !*** ./src/InterpolationInterop.ts ***!
  \*************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InterpolationInterop = void 0;
var InterpolationInterop = /** @class */ (function () {
    function InterpolationInterop() {
    }
    InterpolationInterop.prototype.drawPixelsToCanvas = function (canvasId, base64, width, height) {
        var canvas = document.getElementById(canvasId);
        if (!canvas)
            return;
        var ctx = canvas.getContext('2d');
        var imageData = ctx.createImageData(width, height);
        var binaryString = window.atob(base64);
        for (var i = 0; i < binaryString.length; i++) {
            imageData.data[i] = binaryString.charCodeAt(i);
        }
        ctx.putImageData(imageData, 0, 0);
    };
    return InterpolationInterop;
}());
exports.InterpolationInterop = InterpolationInterop;


/***/ },

/***/ "./src/MandelbrotCanvas.ts"
/*!*********************************!*\
  !*** ./src/MandelbrotCanvas.ts ***!
  \*********************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MandelbrotCanvas = void 0;
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
                    case 0: return [4 /*yield*/, fetch("Mandelbrot?pos=".concat(mPos, "&posi=").concat(mPosi, "&size=").concat(mSize, "&iterationlimit=").concat(iterationlimit))];
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
        var pixels = (0, Utility_1.base64ToArrayBuffer)(pixelsbase64);
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
        this.ctx = document.getElementById(id).getContext('2d');
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
    MandelbrotCanvas.prototype.getCanvasDataUrl = function () {
        return this.ctx.canvas.toDataURL('image/png');
    };
    MandelbrotCanvas.prototype.destroy = function () {
        this.ctx.canvas.removeEventListener('mousedown', this.mouseDown);
        this.ctx.canvas.removeEventListener('mouseup', this.mouseDown);
        this.ctx.canvas.removeEventListener('mousemove', this.mouseDown);
    };
    return MandelbrotCanvas;
}());
exports.MandelbrotCanvas = MandelbrotCanvas;


/***/ },

/***/ "./src/MovieMakerInterop.ts"
/*!**********************************!*\
  !*** ./src/MovieMakerInterop.ts ***!
  \**********************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MovieMakerInterop = void 0;
var webm_muxer_1 = __webpack_require__(/*! webm-muxer */ "./node_modules/webm-muxer/build/webm-muxer.js");
var MovieMakerInterop = /** @class */ (function () {
    function MovieMakerInterop() {
        this.frames = [];
    }
    MovieMakerInterop.prototype.init = function (canvasId, width, height) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.width = width;
        this.height = height;
        this.frames = [];
    };
    MovieMakerInterop.prototype.reset = function () {
        this.frames = [];
        if (this.ctx)
            this.ctx.clearRect(0, 0, this.width, this.height);
    };
    MovieMakerInterop.prototype.addFrameFromUrl = function (url, frameIndex) {
        return __awaiter(this, void 0, void 0, function () {
            var response, buffer, pixels;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch(url)];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.arrayBuffer()];
                    case 2:
                        buffer = _a.sent();
                        pixels = new Uint8Array(buffer);
                        this.frames[frameIndex] = pixels;
                        this.drawPixels(pixels);
                        return [2 /*return*/];
                }
            });
        });
    };
    MovieMakerInterop.prototype.drawPixels = function (pixels) {
        var imageData = this.ctx.createImageData(this.width, this.height);
        imageData.data.set(pixels);
        this.ctx.putImageData(imageData, 0, 0);
    };
    MovieMakerInterop.prototype.renderAndDownload = function (fps) {
        return __awaiter(this, void 0, void 0, function () {
            var target, muxer, encoder, frameDurationMicros, i, frame, blob;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        target = new webm_muxer_1.ArrayBufferTarget();
                        muxer = new webm_muxer_1.Muxer({
                            target: target,
                            video: {
                                codec: 'V_VP9',
                                width: this.width,
                                height: this.height,
                                frameRate: fps,
                            }
                        });
                        encoder = new VideoEncoder({
                            output: function (chunk, meta) { return muxer.addVideoChunk(chunk, meta); },
                            error: function (e) { return console.error('VideoEncoder error:', e); },
                        });
                        encoder.configure({
                            codec: 'vp09.00.10.08',
                            width: this.width,
                            height: this.height,
                            bitrate: 40000000,
                            framerate: fps,
                        });
                        frameDurationMicros = Math.round(1000000 / fps);
                        for (i = 0; i < this.frames.length; i++) {
                            frame = new VideoFrame(this.frames[i], {
                                format: 'RGBA',
                                codedWidth: this.width,
                                codedHeight: this.height,
                                timestamp: i * frameDurationMicros,
                                duration: frameDurationMicros,
                            });
                            encoder.encode(frame, { keyFrame: i % (fps * 2) === 0 });
                            frame.close();
                        }
                        return [4 /*yield*/, encoder.flush()];
                    case 1:
                        _a.sent();
                        encoder.close();
                        muxer.finalize();
                        blob = new Blob([target.buffer], { type: 'video/webm' });
                        return [2 /*return*/, URL.createObjectURL(blob)];
                }
            });
        });
    };
    return MovieMakerInterop;
}());
exports.MovieMakerInterop = MovieMakerInterop;


/***/ },

/***/ "./src/Utility.ts"
/*!************************!*\
  !*** ./src/Utility.ts ***!
  \************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.base64ToArrayBuffer = base64ToArrayBuffer;
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


/***/ },

/***/ "./node_modules/webm-muxer/build/webm-muxer.js"
/*!*****************************************************!*\
  !*** ./node_modules/webm-muxer/build/webm-muxer.js ***!
  \*****************************************************/
(module) {


var WebMMuxer = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var __accessCheck = (obj, member, msg) => {
    if (!member.has(obj))
      throw TypeError("Cannot " + msg);
  };
  var __privateGet = (obj, member, getter) => {
    __accessCheck(obj, member, "read from private field");
    return getter ? getter.call(obj) : member.get(obj);
  };
  var __privateAdd = (obj, member, value) => {
    if (member.has(obj))
      throw TypeError("Cannot add the same private member more than once");
    member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
  };
  var __privateSet = (obj, member, value, setter) => {
    __accessCheck(obj, member, "write to private field");
    setter ? setter.call(obj, value) : member.set(obj, value);
    return value;
  };
  var __privateMethod = (obj, member, method) => {
    __accessCheck(obj, member, "access private method");
    return method;
  };

  // src/index.ts
  var src_exports = {};
  __export(src_exports, {
    ArrayBufferTarget: () => ArrayBufferTarget,
    FileSystemWritableFileStreamTarget: () => FileSystemWritableFileStreamTarget,
    Muxer: () => Muxer,
    StreamTarget: () => StreamTarget,
    SubtitleEncoder: () => SubtitleEncoder
  });

  // src/ebml.ts
  var EBMLFloat32 = class {
    constructor(value) {
      this.value = value;
    }
  };
  var EBMLFloat64 = class {
    constructor(value) {
      this.value = value;
    }
  };
  var measureUnsignedInt = (value) => {
    if (value < 1 << 8) {
      return 1;
    } else if (value < 1 << 16) {
      return 2;
    } else if (value < 1 << 24) {
      return 3;
    } else if (value < 2 ** 32) {
      return 4;
    } else if (value < 2 ** 40) {
      return 5;
    } else {
      return 6;
    }
  };
  var measureEBMLVarInt = (value) => {
    if (value < (1 << 7) - 1) {
      return 1;
    } else if (value < (1 << 14) - 1) {
      return 2;
    } else if (value < (1 << 21) - 1) {
      return 3;
    } else if (value < (1 << 28) - 1) {
      return 4;
    } else if (value < 2 ** 35 - 1) {
      return 5;
    } else if (value < 2 ** 42 - 1) {
      return 6;
    } else {
      throw new Error("EBML VINT size not supported " + value);
    }
  };

  // src/misc.ts
  var readBits = (bytes, start, end) => {
    let result = 0;
    for (let i = start; i < end; i++) {
      let byteIndex = Math.floor(i / 8);
      let byte = bytes[byteIndex];
      let bitIndex = 7 - (i & 7);
      let bit = (byte & 1 << bitIndex) >> bitIndex;
      result <<= 1;
      result |= bit;
    }
    return result;
  };
  var writeBits = (bytes, start, end, value) => {
    for (let i = start; i < end; i++) {
      let byteIndex = Math.floor(i / 8);
      let byte = bytes[byteIndex];
      let bitIndex = 7 - (i & 7);
      byte &= ~(1 << bitIndex);
      byte |= (value & 1 << end - i - 1) >> end - i - 1 << bitIndex;
      bytes[byteIndex] = byte;
    }
  };

  // src/target.ts
  var isTarget = Symbol("isTarget");
  var Target = class {
  };
  isTarget;
  var ArrayBufferTarget = class extends Target {
    constructor() {
      super(...arguments);
      this.buffer = null;
    }
  };
  var StreamTarget = class extends Target {
    constructor(options) {
      super();
      this.options = options;
      if (typeof options !== "object") {
        throw new TypeError("StreamTarget requires an options object to be passed to its constructor.");
      }
      if (options.onData) {
        if (typeof options.onData !== "function") {
          throw new TypeError("options.onData, when provided, must be a function.");
        }
        if (options.onData.length < 2) {
          throw new TypeError(
            "options.onData, when provided, must be a function that takes in at least two arguments (data and position). Ignoring the position argument, which specifies the byte offset at which the data is to be written, can lead to broken outputs."
          );
        }
      }
      if (options.onHeader && typeof options.onHeader !== "function") {
        throw new TypeError("options.onHeader, when provided, must be a function.");
      }
      if (options.onCluster && typeof options.onCluster !== "function") {
        throw new TypeError("options.onCluster, when provided, must be a function.");
      }
      if (options.chunked !== void 0 && typeof options.chunked !== "boolean") {
        throw new TypeError("options.chunked, when provided, must be a boolean.");
      }
      if (options.chunkSize !== void 0 && (!Number.isInteger(options.chunkSize) || options.chunkSize < 1024)) {
        throw new TypeError("options.chunkSize, when provided, must be an integer and not smaller than 1024.");
      }
    }
  };
  var FileSystemWritableFileStreamTarget = class extends Target {
    constructor(stream, options) {
      super();
      this.stream = stream;
      this.options = options;
      if (!(stream instanceof FileSystemWritableFileStream)) {
        throw new TypeError("FileSystemWritableFileStreamTarget requires a FileSystemWritableFileStream instance.");
      }
      if (options !== void 0 && typeof options !== "object") {
        throw new TypeError("FileSystemWritableFileStreamTarget's options, when provided, must be an object.");
      }
      if (options) {
        if (options.chunkSize !== void 0 && (!Number.isInteger(options.chunkSize) || options.chunkSize <= 0)) {
          throw new TypeError("options.chunkSize, when provided, must be a positive integer");
        }
      }
    }
  };

  // src/writer.ts
  var _helper, _helperView, _writeByte, writeByte_fn, _writeFloat32, writeFloat32_fn, _writeFloat64, writeFloat64_fn, _writeUnsignedInt, writeUnsignedInt_fn, _writeString, writeString_fn;
  var Writer = class {
    constructor() {
      __privateAdd(this, _writeByte);
      __privateAdd(this, _writeFloat32);
      __privateAdd(this, _writeFloat64);
      __privateAdd(this, _writeUnsignedInt);
      __privateAdd(this, _writeString);
      this.pos = 0;
      __privateAdd(this, _helper, new Uint8Array(8));
      __privateAdd(this, _helperView, new DataView(__privateGet(this, _helper).buffer));
      this.offsets = /* @__PURE__ */ new WeakMap();
      this.dataOffsets = /* @__PURE__ */ new WeakMap();
    }
    seek(newPos) {
      this.pos = newPos;
    }
    writeEBMLVarInt(value, width = measureEBMLVarInt(value)) {
      let pos = 0;
      switch (width) {
        case 1:
          __privateGet(this, _helperView).setUint8(pos++, 1 << 7 | value);
          break;
        case 2:
          __privateGet(this, _helperView).setUint8(pos++, 1 << 6 | value >> 8);
          __privateGet(this, _helperView).setUint8(pos++, value);
          break;
        case 3:
          __privateGet(this, _helperView).setUint8(pos++, 1 << 5 | value >> 16);
          __privateGet(this, _helperView).setUint8(pos++, value >> 8);
          __privateGet(this, _helperView).setUint8(pos++, value);
          break;
        case 4:
          __privateGet(this, _helperView).setUint8(pos++, 1 << 4 | value >> 24);
          __privateGet(this, _helperView).setUint8(pos++, value >> 16);
          __privateGet(this, _helperView).setUint8(pos++, value >> 8);
          __privateGet(this, _helperView).setUint8(pos++, value);
          break;
        case 5:
          __privateGet(this, _helperView).setUint8(pos++, 1 << 3 | value / 2 ** 32 & 7);
          __privateGet(this, _helperView).setUint8(pos++, value >> 24);
          __privateGet(this, _helperView).setUint8(pos++, value >> 16);
          __privateGet(this, _helperView).setUint8(pos++, value >> 8);
          __privateGet(this, _helperView).setUint8(pos++, value);
          break;
        case 6:
          __privateGet(this, _helperView).setUint8(pos++, 1 << 2 | value / 2 ** 40 & 3);
          __privateGet(this, _helperView).setUint8(pos++, value / 2 ** 32 | 0);
          __privateGet(this, _helperView).setUint8(pos++, value >> 24);
          __privateGet(this, _helperView).setUint8(pos++, value >> 16);
          __privateGet(this, _helperView).setUint8(pos++, value >> 8);
          __privateGet(this, _helperView).setUint8(pos++, value);
          break;
        default:
          throw new Error("Bad EBML VINT size " + width);
      }
      this.write(__privateGet(this, _helper).subarray(0, pos));
    }
    writeEBML(data) {
      if (data === null)
        return;
      if (data instanceof Uint8Array) {
        this.write(data);
      } else if (Array.isArray(data)) {
        for (let elem of data) {
          this.writeEBML(elem);
        }
      } else {
        this.offsets.set(data, this.pos);
        __privateMethod(this, _writeUnsignedInt, writeUnsignedInt_fn).call(this, data.id);
        if (Array.isArray(data.data)) {
          let sizePos = this.pos;
          let sizeSize = data.size === -1 ? 1 : data.size ?? 4;
          if (data.size === -1) {
            __privateMethod(this, _writeByte, writeByte_fn).call(this, 255);
          } else {
            this.seek(this.pos + sizeSize);
          }
          let startPos = this.pos;
          this.dataOffsets.set(data, startPos);
          this.writeEBML(data.data);
          if (data.size !== -1) {
            let size = this.pos - startPos;
            let endPos = this.pos;
            this.seek(sizePos);
            this.writeEBMLVarInt(size, sizeSize);
            this.seek(endPos);
          }
        } else if (typeof data.data === "number") {
          let size = data.size ?? measureUnsignedInt(data.data);
          this.writeEBMLVarInt(size);
          __privateMethod(this, _writeUnsignedInt, writeUnsignedInt_fn).call(this, data.data, size);
        } else if (typeof data.data === "string") {
          this.writeEBMLVarInt(data.data.length);
          __privateMethod(this, _writeString, writeString_fn).call(this, data.data);
        } else if (data.data instanceof Uint8Array) {
          this.writeEBMLVarInt(data.data.byteLength, data.size);
          this.write(data.data);
        } else if (data.data instanceof EBMLFloat32) {
          this.writeEBMLVarInt(4);
          __privateMethod(this, _writeFloat32, writeFloat32_fn).call(this, data.data.value);
        } else if (data.data instanceof EBMLFloat64) {
          this.writeEBMLVarInt(8);
          __privateMethod(this, _writeFloat64, writeFloat64_fn).call(this, data.data.value);
        }
      }
    }
  };
  _helper = new WeakMap();
  _helperView = new WeakMap();
  _writeByte = new WeakSet();
  writeByte_fn = function(value) {
    __privateGet(this, _helperView).setUint8(0, value);
    this.write(__privateGet(this, _helper).subarray(0, 1));
  };
  _writeFloat32 = new WeakSet();
  writeFloat32_fn = function(value) {
    __privateGet(this, _helperView).setFloat32(0, value, false);
    this.write(__privateGet(this, _helper).subarray(0, 4));
  };
  _writeFloat64 = new WeakSet();
  writeFloat64_fn = function(value) {
    __privateGet(this, _helperView).setFloat64(0, value, false);
    this.write(__privateGet(this, _helper));
  };
  _writeUnsignedInt = new WeakSet();
  writeUnsignedInt_fn = function(value, width = measureUnsignedInt(value)) {
    let pos = 0;
    switch (width) {
      case 6:
        __privateGet(this, _helperView).setUint8(pos++, value / 2 ** 40 | 0);
      case 5:
        __privateGet(this, _helperView).setUint8(pos++, value / 2 ** 32 | 0);
      case 4:
        __privateGet(this, _helperView).setUint8(pos++, value >> 24);
      case 3:
        __privateGet(this, _helperView).setUint8(pos++, value >> 16);
      case 2:
        __privateGet(this, _helperView).setUint8(pos++, value >> 8);
      case 1:
        __privateGet(this, _helperView).setUint8(pos++, value);
        break;
      default:
        throw new Error("Bad UINT size " + width);
    }
    this.write(__privateGet(this, _helper).subarray(0, pos));
  };
  _writeString = new WeakSet();
  writeString_fn = function(str) {
    this.write(new Uint8Array(str.split("").map((x) => x.charCodeAt(0))));
  };
  var _target, _buffer, _bytes, _ensureSize, ensureSize_fn;
  var ArrayBufferTargetWriter = class extends Writer {
    constructor(target) {
      super();
      __privateAdd(this, _ensureSize);
      __privateAdd(this, _target, void 0);
      __privateAdd(this, _buffer, new ArrayBuffer(2 ** 16));
      __privateAdd(this, _bytes, new Uint8Array(__privateGet(this, _buffer)));
      __privateSet(this, _target, target);
    }
    write(data) {
      __privateMethod(this, _ensureSize, ensureSize_fn).call(this, this.pos + data.byteLength);
      __privateGet(this, _bytes).set(data, this.pos);
      this.pos += data.byteLength;
    }
    finalize() {
      __privateMethod(this, _ensureSize, ensureSize_fn).call(this, this.pos);
      __privateGet(this, _target).buffer = __privateGet(this, _buffer).slice(0, this.pos);
    }
  };
  _target = new WeakMap();
  _buffer = new WeakMap();
  _bytes = new WeakMap();
  _ensureSize = new WeakSet();
  ensureSize_fn = function(size) {
    let newLength = __privateGet(this, _buffer).byteLength;
    while (newLength < size)
      newLength *= 2;
    if (newLength === __privateGet(this, _buffer).byteLength)
      return;
    let newBuffer = new ArrayBuffer(newLength);
    let newBytes = new Uint8Array(newBuffer);
    newBytes.set(__privateGet(this, _bytes), 0);
    __privateSet(this, _buffer, newBuffer);
    __privateSet(this, _bytes, newBytes);
  };
  var _trackingWrites, _trackedWrites, _trackedStart, _trackedEnd;
  var BaseStreamTargetWriter = class extends Writer {
    constructor(target) {
      super();
      this.target = target;
      __privateAdd(this, _trackingWrites, false);
      __privateAdd(this, _trackedWrites, void 0);
      __privateAdd(this, _trackedStart, void 0);
      __privateAdd(this, _trackedEnd, void 0);
    }
    write(data) {
      if (!__privateGet(this, _trackingWrites))
        return;
      let pos = this.pos;
      if (pos < __privateGet(this, _trackedStart)) {
        if (pos + data.byteLength <= __privateGet(this, _trackedStart))
          return;
        data = data.subarray(__privateGet(this, _trackedStart) - pos);
        pos = 0;
      }
      let neededSize = pos + data.byteLength - __privateGet(this, _trackedStart);
      let newLength = __privateGet(this, _trackedWrites).byteLength;
      while (newLength < neededSize)
        newLength *= 2;
      if (newLength !== __privateGet(this, _trackedWrites).byteLength) {
        let copy = new Uint8Array(newLength);
        copy.set(__privateGet(this, _trackedWrites), 0);
        __privateSet(this, _trackedWrites, copy);
      }
      __privateGet(this, _trackedWrites).set(data, pos - __privateGet(this, _trackedStart));
      __privateSet(this, _trackedEnd, Math.max(__privateGet(this, _trackedEnd), pos + data.byteLength));
    }
    startTrackingWrites() {
      __privateSet(this, _trackingWrites, true);
      __privateSet(this, _trackedWrites, new Uint8Array(2 ** 10));
      __privateSet(this, _trackedStart, this.pos);
      __privateSet(this, _trackedEnd, this.pos);
    }
    getTrackedWrites() {
      if (!__privateGet(this, _trackingWrites)) {
        throw new Error("Can't get tracked writes since nothing was tracked.");
      }
      let slice = __privateGet(this, _trackedWrites).subarray(0, __privateGet(this, _trackedEnd) - __privateGet(this, _trackedStart));
      let result = {
        data: slice,
        start: __privateGet(this, _trackedStart),
        end: __privateGet(this, _trackedEnd)
      };
      __privateSet(this, _trackedWrites, void 0);
      __privateSet(this, _trackingWrites, false);
      return result;
    }
  };
  _trackingWrites = new WeakMap();
  _trackedWrites = new WeakMap();
  _trackedStart = new WeakMap();
  _trackedEnd = new WeakMap();
  var DEFAULT_CHUNK_SIZE = 2 ** 24;
  var MAX_CHUNKS_AT_ONCE = 2;
  var _sections, _lastFlushEnd, _ensureMonotonicity, _chunked, _chunkSize, _chunks, _writeDataIntoChunks, writeDataIntoChunks_fn, _insertSectionIntoChunk, insertSectionIntoChunk_fn, _createChunk, createChunk_fn, _flushChunks, flushChunks_fn;
  var StreamTargetWriter = class extends BaseStreamTargetWriter {
    constructor(target, ensureMonotonicity) {
      super(target);
      __privateAdd(this, _writeDataIntoChunks);
      __privateAdd(this, _insertSectionIntoChunk);
      __privateAdd(this, _createChunk);
      __privateAdd(this, _flushChunks);
      __privateAdd(this, _sections, []);
      __privateAdd(this, _lastFlushEnd, 0);
      __privateAdd(this, _ensureMonotonicity, void 0);
      __privateAdd(this, _chunked, void 0);
      __privateAdd(this, _chunkSize, void 0);
      __privateAdd(this, _chunks, []);
      __privateSet(this, _ensureMonotonicity, ensureMonotonicity);
      __privateSet(this, _chunked, target.options?.chunked ?? false);
      __privateSet(this, _chunkSize, target.options?.chunkSize ?? DEFAULT_CHUNK_SIZE);
    }
    write(data) {
      super.write(data);
      __privateGet(this, _sections).push({
        data: data.slice(),
        start: this.pos
      });
      this.pos += data.byteLength;
    }
    flush() {
      if (__privateGet(this, _sections).length === 0)
        return;
      let chunks = [];
      let sorted = [...__privateGet(this, _sections)].sort((a, b) => a.start - b.start);
      chunks.push({
        start: sorted[0].start,
        size: sorted[0].data.byteLength
      });
      for (let i = 1; i < sorted.length; i++) {
        let lastChunk = chunks[chunks.length - 1];
        let section = sorted[i];
        if (section.start <= lastChunk.start + lastChunk.size) {
          lastChunk.size = Math.max(lastChunk.size, section.start + section.data.byteLength - lastChunk.start);
        } else {
          chunks.push({
            start: section.start,
            size: section.data.byteLength
          });
        }
      }
      for (let chunk of chunks) {
        chunk.data = new Uint8Array(chunk.size);
        for (let section of __privateGet(this, _sections)) {
          if (chunk.start <= section.start && section.start < chunk.start + chunk.size) {
            chunk.data.set(section.data, section.start - chunk.start);
          }
        }
        if (__privateGet(this, _chunked)) {
          __privateMethod(this, _writeDataIntoChunks, writeDataIntoChunks_fn).call(this, chunk.data, chunk.start);
          __privateMethod(this, _flushChunks, flushChunks_fn).call(this);
        } else {
          if (__privateGet(this, _ensureMonotonicity) && chunk.start < __privateGet(this, _lastFlushEnd)) {
            throw new Error("Internal error: Monotonicity violation.");
          }
          this.target.options.onData?.(chunk.data, chunk.start);
          __privateSet(this, _lastFlushEnd, chunk.start + chunk.data.byteLength);
        }
      }
      __privateGet(this, _sections).length = 0;
    }
    finalize() {
      if (__privateGet(this, _chunked)) {
        __privateMethod(this, _flushChunks, flushChunks_fn).call(this, true);
      }
    }
  };
  _sections = new WeakMap();
  _lastFlushEnd = new WeakMap();
  _ensureMonotonicity = new WeakMap();
  _chunked = new WeakMap();
  _chunkSize = new WeakMap();
  _chunks = new WeakMap();
  _writeDataIntoChunks = new WeakSet();
  writeDataIntoChunks_fn = function(data, position) {
    let chunkIndex = __privateGet(this, _chunks).findIndex((x) => x.start <= position && position < x.start + __privateGet(this, _chunkSize));
    if (chunkIndex === -1)
      chunkIndex = __privateMethod(this, _createChunk, createChunk_fn).call(this, position);
    let chunk = __privateGet(this, _chunks)[chunkIndex];
    let relativePosition = position - chunk.start;
    let toWrite = data.subarray(0, Math.min(__privateGet(this, _chunkSize) - relativePosition, data.byteLength));
    chunk.data.set(toWrite, relativePosition);
    let section = {
      start: relativePosition,
      end: relativePosition + toWrite.byteLength
    };
    __privateMethod(this, _insertSectionIntoChunk, insertSectionIntoChunk_fn).call(this, chunk, section);
    if (chunk.written[0].start === 0 && chunk.written[0].end === __privateGet(this, _chunkSize)) {
      chunk.shouldFlush = true;
    }
    if (__privateGet(this, _chunks).length > MAX_CHUNKS_AT_ONCE) {
      for (let i = 0; i < __privateGet(this, _chunks).length - 1; i++) {
        __privateGet(this, _chunks)[i].shouldFlush = true;
      }
      __privateMethod(this, _flushChunks, flushChunks_fn).call(this);
    }
    if (toWrite.byteLength < data.byteLength) {
      __privateMethod(this, _writeDataIntoChunks, writeDataIntoChunks_fn).call(this, data.subarray(toWrite.byteLength), position + toWrite.byteLength);
    }
  };
  _insertSectionIntoChunk = new WeakSet();
  insertSectionIntoChunk_fn = function(chunk, section) {
    let low = 0;
    let high = chunk.written.length - 1;
    let index = -1;
    while (low <= high) {
      let mid = Math.floor(low + (high - low + 1) / 2);
      if (chunk.written[mid].start <= section.start) {
        low = mid + 1;
        index = mid;
      } else {
        high = mid - 1;
      }
    }
    chunk.written.splice(index + 1, 0, section);
    if (index === -1 || chunk.written[index].end < section.start)
      index++;
    while (index < chunk.written.length - 1 && chunk.written[index].end >= chunk.written[index + 1].start) {
      chunk.written[index].end = Math.max(chunk.written[index].end, chunk.written[index + 1].end);
      chunk.written.splice(index + 1, 1);
    }
  };
  _createChunk = new WeakSet();
  createChunk_fn = function(includesPosition) {
    let start = Math.floor(includesPosition / __privateGet(this, _chunkSize)) * __privateGet(this, _chunkSize);
    let chunk = {
      start,
      data: new Uint8Array(__privateGet(this, _chunkSize)),
      written: [],
      shouldFlush: false
    };
    __privateGet(this, _chunks).push(chunk);
    __privateGet(this, _chunks).sort((a, b) => a.start - b.start);
    return __privateGet(this, _chunks).indexOf(chunk);
  };
  _flushChunks = new WeakSet();
  flushChunks_fn = function(force = false) {
    for (let i = 0; i < __privateGet(this, _chunks).length; i++) {
      let chunk = __privateGet(this, _chunks)[i];
      if (!chunk.shouldFlush && !force)
        continue;
      for (let section of chunk.written) {
        if (__privateGet(this, _ensureMonotonicity) && chunk.start + section.start < __privateGet(this, _lastFlushEnd)) {
          throw new Error("Internal error: Monotonicity violation.");
        }
        this.target.options.onData?.(
          chunk.data.subarray(section.start, section.end),
          chunk.start + section.start
        );
        __privateSet(this, _lastFlushEnd, chunk.start + section.end);
      }
      __privateGet(this, _chunks).splice(i--, 1);
    }
  };
  var FileSystemWritableFileStreamTargetWriter = class extends StreamTargetWriter {
    constructor(target, ensureMonotonicity) {
      super(new StreamTarget({
        onData: (data, position) => target.stream.write({
          type: "write",
          data,
          position
        }),
        chunked: true,
        chunkSize: target.options?.chunkSize
      }), ensureMonotonicity);
    }
  };

  // src/muxer.ts
  var VIDEO_TRACK_NUMBER = 1;
  var AUDIO_TRACK_NUMBER = 2;
  var SUBTITLE_TRACK_NUMBER = 3;
  var VIDEO_TRACK_TYPE = 1;
  var AUDIO_TRACK_TYPE = 2;
  var SUBTITLE_TRACK_TYPE = 17;
  var MAX_CHUNK_LENGTH_MS = 2 ** 15;
  var CODEC_PRIVATE_MAX_SIZE = 2 ** 13;
  var APP_NAME = "https://github.com/Vanilagy/webm-muxer";
  var SEGMENT_SIZE_BYTES = 6;
  var CLUSTER_SIZE_BYTES = 5;
  var FIRST_TIMESTAMP_BEHAVIORS = ["strict", "offset", "permissive"];
  var _options, _writer, _segment, _segmentInfo, _seekHead, _tracksElement, _segmentDuration, _colourElement, _videoCodecPrivate, _audioCodecPrivate, _subtitleCodecPrivate, _cues, _currentCluster, _currentClusterTimestamp, _duration, _videoChunkQueue, _audioChunkQueue, _subtitleChunkQueue, _firstVideoTimestamp, _firstAudioTimestamp, _lastVideoTimestamp, _lastAudioTimestamp, _lastSubtitleTimestamp, _colorSpace, _finalized, _validateOptions, validateOptions_fn, _createFileHeader, createFileHeader_fn, _writeEBMLHeader, writeEBMLHeader_fn, _createCodecPrivatePlaceholders, createCodecPrivatePlaceholders_fn, _createColourElement, createColourElement_fn, _createSeekHead, createSeekHead_fn, _createSegmentInfo, createSegmentInfo_fn, _createTracks, createTracks_fn, _createSegment, createSegment_fn, _createCues, createCues_fn, _maybeFlushStreamingTargetWriter, maybeFlushStreamingTargetWriter_fn, _segmentDataOffset, segmentDataOffset_get, _writeVideoDecoderConfig, writeVideoDecoderConfig_fn, _fixVP9ColorSpace, fixVP9ColorSpace_fn, _writeSubtitleChunks, writeSubtitleChunks_fn, _createInternalChunk, createInternalChunk_fn, _validateTimestamp, validateTimestamp_fn, _writeBlock, writeBlock_fn, _createCodecPrivateElement, createCodecPrivateElement_fn, _writeCodecPrivate, writeCodecPrivate_fn, _createNewCluster, createNewCluster_fn, _finalizeCurrentCluster, finalizeCurrentCluster_fn, _ensureNotFinalized, ensureNotFinalized_fn;
  var Muxer = class {
    constructor(options) {
      __privateAdd(this, _validateOptions);
      __privateAdd(this, _createFileHeader);
      __privateAdd(this, _writeEBMLHeader);
      __privateAdd(this, _createCodecPrivatePlaceholders);
      __privateAdd(this, _createColourElement);
      __privateAdd(this, _createSeekHead);
      __privateAdd(this, _createSegmentInfo);
      __privateAdd(this, _createTracks);
      __privateAdd(this, _createSegment);
      __privateAdd(this, _createCues);
      __privateAdd(this, _maybeFlushStreamingTargetWriter);
      __privateAdd(this, _segmentDataOffset);
      __privateAdd(this, _writeVideoDecoderConfig);
      __privateAdd(this, _fixVP9ColorSpace);
      __privateAdd(this, _writeSubtitleChunks);
      __privateAdd(this, _createInternalChunk);
      __privateAdd(this, _validateTimestamp);
      __privateAdd(this, _writeBlock);
      __privateAdd(this, _createCodecPrivateElement);
      __privateAdd(this, _writeCodecPrivate);
      __privateAdd(this, _createNewCluster);
      __privateAdd(this, _finalizeCurrentCluster);
      __privateAdd(this, _ensureNotFinalized);
      __privateAdd(this, _options, void 0);
      __privateAdd(this, _writer, void 0);
      __privateAdd(this, _segment, void 0);
      __privateAdd(this, _segmentInfo, void 0);
      __privateAdd(this, _seekHead, void 0);
      __privateAdd(this, _tracksElement, void 0);
      __privateAdd(this, _segmentDuration, void 0);
      __privateAdd(this, _colourElement, void 0);
      __privateAdd(this, _videoCodecPrivate, void 0);
      __privateAdd(this, _audioCodecPrivate, void 0);
      __privateAdd(this, _subtitleCodecPrivate, void 0);
      __privateAdd(this, _cues, void 0);
      __privateAdd(this, _currentCluster, void 0);
      __privateAdd(this, _currentClusterTimestamp, void 0);
      __privateAdd(this, _duration, 0);
      __privateAdd(this, _videoChunkQueue, []);
      __privateAdd(this, _audioChunkQueue, []);
      __privateAdd(this, _subtitleChunkQueue, []);
      __privateAdd(this, _firstVideoTimestamp, void 0);
      __privateAdd(this, _firstAudioTimestamp, void 0);
      __privateAdd(this, _lastVideoTimestamp, -1);
      __privateAdd(this, _lastAudioTimestamp, -1);
      __privateAdd(this, _lastSubtitleTimestamp, -1);
      __privateAdd(this, _colorSpace, void 0);
      __privateAdd(this, _finalized, false);
      __privateMethod(this, _validateOptions, validateOptions_fn).call(this, options);
      __privateSet(this, _options, {
        type: "webm",
        firstTimestampBehavior: "strict",
        ...options
      });
      this.target = options.target;
      let ensureMonotonicity = !!__privateGet(this, _options).streaming;
      if (options.target instanceof ArrayBufferTarget) {
        __privateSet(this, _writer, new ArrayBufferTargetWriter(options.target));
      } else if (options.target instanceof StreamTarget) {
        __privateSet(this, _writer, new StreamTargetWriter(options.target, ensureMonotonicity));
      } else if (options.target instanceof FileSystemWritableFileStreamTarget) {
        __privateSet(this, _writer, new FileSystemWritableFileStreamTargetWriter(options.target, ensureMonotonicity));
      } else {
        throw new Error(`Invalid target: ${options.target}`);
      }
      __privateMethod(this, _createFileHeader, createFileHeader_fn).call(this);
    }
    addVideoChunk(chunk, meta, timestamp) {
      if (!(chunk instanceof EncodedVideoChunk)) {
        throw new TypeError("addVideoChunk's first argument (chunk) must be of type EncodedVideoChunk.");
      }
      if (meta && typeof meta !== "object") {
        throw new TypeError("addVideoChunk's second argument (meta), when provided, must be an object.");
      }
      if (timestamp !== void 0 && (!Number.isFinite(timestamp) || timestamp < 0)) {
        throw new TypeError(
          "addVideoChunk's third argument (timestamp), when provided, must be a non-negative real number."
        );
      }
      let data = new Uint8Array(chunk.byteLength);
      chunk.copyTo(data);
      this.addVideoChunkRaw(data, chunk.type, timestamp ?? chunk.timestamp, meta);
    }
    addVideoChunkRaw(data, type, timestamp, meta) {
      if (!(data instanceof Uint8Array)) {
        throw new TypeError("addVideoChunkRaw's first argument (data) must be an instance of Uint8Array.");
      }
      if (type !== "key" && type !== "delta") {
        throw new TypeError("addVideoChunkRaw's second argument (type) must be either 'key' or 'delta'.");
      }
      if (!Number.isFinite(timestamp) || timestamp < 0) {
        throw new TypeError("addVideoChunkRaw's third argument (timestamp) must be a non-negative real number.");
      }
      if (meta && typeof meta !== "object") {
        throw new TypeError("addVideoChunkRaw's fourth argument (meta), when provided, must be an object.");
      }
      __privateMethod(this, _ensureNotFinalized, ensureNotFinalized_fn).call(this);
      if (!__privateGet(this, _options).video)
        throw new Error("No video track declared.");
      if (__privateGet(this, _firstVideoTimestamp) === void 0)
        __privateSet(this, _firstVideoTimestamp, timestamp);
      if (meta)
        __privateMethod(this, _writeVideoDecoderConfig, writeVideoDecoderConfig_fn).call(this, meta);
      let videoChunk = __privateMethod(this, _createInternalChunk, createInternalChunk_fn).call(this, data, type, timestamp, VIDEO_TRACK_NUMBER);
      if (__privateGet(this, _options).video.codec === "V_VP9")
        __privateMethod(this, _fixVP9ColorSpace, fixVP9ColorSpace_fn).call(this, videoChunk);
      __privateSet(this, _lastVideoTimestamp, videoChunk.timestamp);
      while (__privateGet(this, _audioChunkQueue).length > 0 && __privateGet(this, _audioChunkQueue)[0].timestamp <= videoChunk.timestamp) {
        let audioChunk = __privateGet(this, _audioChunkQueue).shift();
        __privateMethod(this, _writeBlock, writeBlock_fn).call(this, audioChunk, false);
      }
      if (!__privateGet(this, _options).audio || videoChunk.timestamp <= __privateGet(this, _lastAudioTimestamp)) {
        __privateMethod(this, _writeBlock, writeBlock_fn).call(this, videoChunk, true);
      } else {
        __privateGet(this, _videoChunkQueue).push(videoChunk);
      }
      __privateMethod(this, _writeSubtitleChunks, writeSubtitleChunks_fn).call(this);
      __privateMethod(this, _maybeFlushStreamingTargetWriter, maybeFlushStreamingTargetWriter_fn).call(this);
    }
    addAudioChunk(chunk, meta, timestamp) {
      if (!(chunk instanceof EncodedAudioChunk)) {
        throw new TypeError("addAudioChunk's first argument (chunk) must be of type EncodedAudioChunk.");
      }
      if (meta && typeof meta !== "object") {
        throw new TypeError("addAudioChunk's second argument (meta), when provided, must be an object.");
      }
      if (timestamp !== void 0 && (!Number.isFinite(timestamp) || timestamp < 0)) {
        throw new TypeError(
          "addAudioChunk's third argument (timestamp), when provided, must be a non-negative real number."
        );
      }
      let data = new Uint8Array(chunk.byteLength);
      chunk.copyTo(data);
      this.addAudioChunkRaw(data, chunk.type, timestamp ?? chunk.timestamp, meta);
    }
    addAudioChunkRaw(data, type, timestamp, meta) {
      if (!(data instanceof Uint8Array)) {
        throw new TypeError("addAudioChunkRaw's first argument (data) must be an instance of Uint8Array.");
      }
      if (type !== "key" && type !== "delta") {
        throw new TypeError("addAudioChunkRaw's second argument (type) must be either 'key' or 'delta'.");
      }
      if (!Number.isFinite(timestamp) || timestamp < 0) {
        throw new TypeError("addAudioChunkRaw's third argument (timestamp) must be a non-negative real number.");
      }
      if (meta && typeof meta !== "object") {
        throw new TypeError("addAudioChunkRaw's fourth argument (meta), when provided, must be an object.");
      }
      __privateMethod(this, _ensureNotFinalized, ensureNotFinalized_fn).call(this);
      if (!__privateGet(this, _options).audio)
        throw new Error("No audio track declared.");
      if (__privateGet(this, _firstAudioTimestamp) === void 0)
        __privateSet(this, _firstAudioTimestamp, timestamp);
      if (meta?.decoderConfig) {
        if (__privateGet(this, _options).streaming) {
          __privateSet(this, _audioCodecPrivate, __privateMethod(this, _createCodecPrivateElement, createCodecPrivateElement_fn).call(this, meta.decoderConfig.description));
        } else {
          __privateMethod(this, _writeCodecPrivate, writeCodecPrivate_fn).call(this, __privateGet(this, _audioCodecPrivate), meta.decoderConfig.description);
        }
      }
      let audioChunk = __privateMethod(this, _createInternalChunk, createInternalChunk_fn).call(this, data, type, timestamp, AUDIO_TRACK_NUMBER);
      __privateSet(this, _lastAudioTimestamp, audioChunk.timestamp);
      while (__privateGet(this, _videoChunkQueue).length > 0 && __privateGet(this, _videoChunkQueue)[0].timestamp <= audioChunk.timestamp) {
        let videoChunk = __privateGet(this, _videoChunkQueue).shift();
        __privateMethod(this, _writeBlock, writeBlock_fn).call(this, videoChunk, true);
      }
      if (!__privateGet(this, _options).video || audioChunk.timestamp <= __privateGet(this, _lastVideoTimestamp)) {
        __privateMethod(this, _writeBlock, writeBlock_fn).call(this, audioChunk, !__privateGet(this, _options).video);
      } else {
        __privateGet(this, _audioChunkQueue).push(audioChunk);
      }
      __privateMethod(this, _writeSubtitleChunks, writeSubtitleChunks_fn).call(this);
      __privateMethod(this, _maybeFlushStreamingTargetWriter, maybeFlushStreamingTargetWriter_fn).call(this);
    }
    addSubtitleChunk(chunk, meta, timestamp) {
      if (typeof chunk !== "object" || !chunk) {
        throw new TypeError("addSubtitleChunk's first argument (chunk) must be an object.");
      } else {
        if (!(chunk.body instanceof Uint8Array)) {
          throw new TypeError("body must be an instance of Uint8Array.");
        }
        if (!Number.isFinite(chunk.timestamp) || chunk.timestamp < 0) {
          throw new TypeError("timestamp must be a non-negative real number.");
        }
        if (!Number.isFinite(chunk.duration) || chunk.duration < 0) {
          throw new TypeError("duration must be a non-negative real number.");
        }
        if (chunk.additions && !(chunk.additions instanceof Uint8Array)) {
          throw new TypeError("additions, when present, must be an instance of Uint8Array.");
        }
      }
      if (typeof meta !== "object") {
        throw new TypeError("addSubtitleChunk's second argument (meta) must be an object.");
      }
      __privateMethod(this, _ensureNotFinalized, ensureNotFinalized_fn).call(this);
      if (!__privateGet(this, _options).subtitles)
        throw new Error("No subtitle track declared.");
      if (meta?.decoderConfig) {
        if (__privateGet(this, _options).streaming) {
          __privateSet(this, _subtitleCodecPrivate, __privateMethod(this, _createCodecPrivateElement, createCodecPrivateElement_fn).call(this, meta.decoderConfig.description));
        } else {
          __privateMethod(this, _writeCodecPrivate, writeCodecPrivate_fn).call(this, __privateGet(this, _subtitleCodecPrivate), meta.decoderConfig.description);
        }
      }
      let subtitleChunk = __privateMethod(this, _createInternalChunk, createInternalChunk_fn).call(this, chunk.body, "key", timestamp ?? chunk.timestamp, SUBTITLE_TRACK_NUMBER, chunk.duration, chunk.additions);
      __privateSet(this, _lastSubtitleTimestamp, subtitleChunk.timestamp);
      __privateGet(this, _subtitleChunkQueue).push(subtitleChunk);
      __privateMethod(this, _writeSubtitleChunks, writeSubtitleChunks_fn).call(this);
      __privateMethod(this, _maybeFlushStreamingTargetWriter, maybeFlushStreamingTargetWriter_fn).call(this);
    }
    finalize() {
      if (__privateGet(this, _finalized)) {
        throw new Error("Cannot finalize a muxer more than once.");
      }
      while (__privateGet(this, _videoChunkQueue).length > 0)
        __privateMethod(this, _writeBlock, writeBlock_fn).call(this, __privateGet(this, _videoChunkQueue).shift(), true);
      while (__privateGet(this, _audioChunkQueue).length > 0)
        __privateMethod(this, _writeBlock, writeBlock_fn).call(this, __privateGet(this, _audioChunkQueue).shift(), true);
      while (__privateGet(this, _subtitleChunkQueue).length > 0 && __privateGet(this, _subtitleChunkQueue)[0].timestamp <= __privateGet(this, _duration)) {
        __privateMethod(this, _writeBlock, writeBlock_fn).call(this, __privateGet(this, _subtitleChunkQueue).shift(), false);
      }
      if (__privateGet(this, _currentCluster)) {
        __privateMethod(this, _finalizeCurrentCluster, finalizeCurrentCluster_fn).call(this);
      }
      __privateGet(this, _writer).writeEBML(__privateGet(this, _cues));
      if (!__privateGet(this, _options).streaming) {
        let endPos = __privateGet(this, _writer).pos;
        let segmentSize = __privateGet(this, _writer).pos - __privateGet(this, _segmentDataOffset, segmentDataOffset_get);
        __privateGet(this, _writer).seek(__privateGet(this, _writer).offsets.get(__privateGet(this, _segment)) + 4);
        __privateGet(this, _writer).writeEBMLVarInt(segmentSize, SEGMENT_SIZE_BYTES);
        __privateGet(this, _segmentDuration).data = new EBMLFloat64(__privateGet(this, _duration));
        __privateGet(this, _writer).seek(__privateGet(this, _writer).offsets.get(__privateGet(this, _segmentDuration)));
        __privateGet(this, _writer).writeEBML(__privateGet(this, _segmentDuration));
        __privateGet(this, _seekHead).data[0].data[1].data = __privateGet(this, _writer).offsets.get(__privateGet(this, _cues)) - __privateGet(this, _segmentDataOffset, segmentDataOffset_get);
        __privateGet(this, _seekHead).data[1].data[1].data = __privateGet(this, _writer).offsets.get(__privateGet(this, _segmentInfo)) - __privateGet(this, _segmentDataOffset, segmentDataOffset_get);
        __privateGet(this, _seekHead).data[2].data[1].data = __privateGet(this, _writer).offsets.get(__privateGet(this, _tracksElement)) - __privateGet(this, _segmentDataOffset, segmentDataOffset_get);
        __privateGet(this, _writer).seek(__privateGet(this, _writer).offsets.get(__privateGet(this, _seekHead)));
        __privateGet(this, _writer).writeEBML(__privateGet(this, _seekHead));
        __privateGet(this, _writer).seek(endPos);
      }
      __privateMethod(this, _maybeFlushStreamingTargetWriter, maybeFlushStreamingTargetWriter_fn).call(this);
      __privateGet(this, _writer).finalize();
      __privateSet(this, _finalized, true);
    }
  };
  _options = new WeakMap();
  _writer = new WeakMap();
  _segment = new WeakMap();
  _segmentInfo = new WeakMap();
  _seekHead = new WeakMap();
  _tracksElement = new WeakMap();
  _segmentDuration = new WeakMap();
  _colourElement = new WeakMap();
  _videoCodecPrivate = new WeakMap();
  _audioCodecPrivate = new WeakMap();
  _subtitleCodecPrivate = new WeakMap();
  _cues = new WeakMap();
  _currentCluster = new WeakMap();
  _currentClusterTimestamp = new WeakMap();
  _duration = new WeakMap();
  _videoChunkQueue = new WeakMap();
  _audioChunkQueue = new WeakMap();
  _subtitleChunkQueue = new WeakMap();
  _firstVideoTimestamp = new WeakMap();
  _firstAudioTimestamp = new WeakMap();
  _lastVideoTimestamp = new WeakMap();
  _lastAudioTimestamp = new WeakMap();
  _lastSubtitleTimestamp = new WeakMap();
  _colorSpace = new WeakMap();
  _finalized = new WeakMap();
  _validateOptions = new WeakSet();
  validateOptions_fn = function(options) {
    if (typeof options !== "object") {
      throw new TypeError("The muxer requires an options object to be passed to its constructor.");
    }
    if (!(options.target instanceof Target)) {
      throw new TypeError("The target must be provided and an instance of Target.");
    }
    if (options.video) {
      if (typeof options.video.codec !== "string") {
        throw new TypeError(`Invalid video codec: ${options.video.codec}. Must be a string.`);
      }
      if (!Number.isInteger(options.video.width) || options.video.width <= 0) {
        throw new TypeError(`Invalid video width: ${options.video.width}. Must be a positive integer.`);
      }
      if (!Number.isInteger(options.video.height) || options.video.height <= 0) {
        throw new TypeError(`Invalid video height: ${options.video.height}. Must be a positive integer.`);
      }
      if (options.video.frameRate !== void 0) {
        if (!Number.isFinite(options.video.frameRate) || options.video.frameRate <= 0) {
          throw new TypeError(
            `Invalid video frame rate: ${options.video.frameRate}. Must be a positive number.`
          );
        }
      }
      if (options.video.alpha !== void 0 && typeof options.video.alpha !== "boolean") {
        throw new TypeError(`Invalid video alpha: ${options.video.alpha}. Must be a boolean.`);
      }
    }
    if (options.audio) {
      if (typeof options.audio.codec !== "string") {
        throw new TypeError(`Invalid audio codec: ${options.audio.codec}. Must be a string.`);
      }
      if (!Number.isInteger(options.audio.numberOfChannels) || options.audio.numberOfChannels <= 0) {
        throw new TypeError(
          `Invalid number of audio channels: ${options.audio.numberOfChannels}. Must be a positive integer.`
        );
      }
      if (!Number.isInteger(options.audio.sampleRate) || options.audio.sampleRate <= 0) {
        throw new TypeError(
          `Invalid audio sample rate: ${options.audio.sampleRate}. Must be a positive integer.`
        );
      }
      if (options.audio.bitDepth !== void 0) {
        if (!Number.isInteger(options.audio.bitDepth) || options.audio.bitDepth <= 0) {
          throw new TypeError(
            `Invalid audio bit depth: ${options.audio.bitDepth}. Must be a positive integer.`
          );
        }
      }
    }
    if (options.subtitles) {
      if (typeof options.subtitles.codec !== "string") {
        throw new TypeError(`Invalid subtitles codec: ${options.subtitles.codec}. Must be a string.`);
      }
    }
    if (options.type !== void 0 && !["webm", "matroska"].includes(options.type)) {
      throw new TypeError(`Invalid type: ${options.type}. Must be 'webm' or 'matroska'.`);
    }
    if (options.firstTimestampBehavior && !FIRST_TIMESTAMP_BEHAVIORS.includes(options.firstTimestampBehavior)) {
      throw new TypeError(`Invalid first timestamp behavior: ${options.firstTimestampBehavior}`);
    }
    if (options.streaming !== void 0 && typeof options.streaming !== "boolean") {
      throw new TypeError(`Invalid streaming option: ${options.streaming}. Must be a boolean.`);
    }
  };
  _createFileHeader = new WeakSet();
  createFileHeader_fn = function() {
    if (__privateGet(this, _writer) instanceof BaseStreamTargetWriter && __privateGet(this, _writer).target.options.onHeader) {
      __privateGet(this, _writer).startTrackingWrites();
    }
    __privateMethod(this, _writeEBMLHeader, writeEBMLHeader_fn).call(this);
    if (!__privateGet(this, _options).streaming) {
      __privateMethod(this, _createSeekHead, createSeekHead_fn).call(this);
    }
    __privateMethod(this, _createSegmentInfo, createSegmentInfo_fn).call(this);
    __privateMethod(this, _createCodecPrivatePlaceholders, createCodecPrivatePlaceholders_fn).call(this);
    __privateMethod(this, _createColourElement, createColourElement_fn).call(this);
    if (!__privateGet(this, _options).streaming) {
      __privateMethod(this, _createTracks, createTracks_fn).call(this);
      __privateMethod(this, _createSegment, createSegment_fn).call(this);
    } else {
    }
    __privateMethod(this, _createCues, createCues_fn).call(this);
    __privateMethod(this, _maybeFlushStreamingTargetWriter, maybeFlushStreamingTargetWriter_fn).call(this);
  };
  _writeEBMLHeader = new WeakSet();
  writeEBMLHeader_fn = function() {
    let ebmlHeader = { id: 440786851 /* EBML */, data: [
      { id: 17030 /* EBMLVersion */, data: 1 },
      { id: 17143 /* EBMLReadVersion */, data: 1 },
      { id: 17138 /* EBMLMaxIDLength */, data: 4 },
      { id: 17139 /* EBMLMaxSizeLength */, data: 8 },
      { id: 17026 /* DocType */, data: __privateGet(this, _options).type ?? "webm" },
      { id: 17031 /* DocTypeVersion */, data: 2 },
      { id: 17029 /* DocTypeReadVersion */, data: 2 }
    ] };
    __privateGet(this, _writer).writeEBML(ebmlHeader);
  };
  _createCodecPrivatePlaceholders = new WeakSet();
  createCodecPrivatePlaceholders_fn = function() {
    __privateSet(this, _videoCodecPrivate, { id: 236 /* Void */, size: 4, data: new Uint8Array(CODEC_PRIVATE_MAX_SIZE) });
    __privateSet(this, _audioCodecPrivate, { id: 236 /* Void */, size: 4, data: new Uint8Array(CODEC_PRIVATE_MAX_SIZE) });
    __privateSet(this, _subtitleCodecPrivate, { id: 236 /* Void */, size: 4, data: new Uint8Array(CODEC_PRIVATE_MAX_SIZE) });
  };
  _createColourElement = new WeakSet();
  createColourElement_fn = function() {
    __privateSet(this, _colourElement, { id: 21936 /* Colour */, data: [
      { id: 21937 /* MatrixCoefficients */, data: 2 },
      { id: 21946 /* TransferCharacteristics */, data: 2 },
      { id: 21947 /* Primaries */, data: 2 },
      { id: 21945 /* Range */, data: 0 }
    ] });
  };
  _createSeekHead = new WeakSet();
  createSeekHead_fn = function() {
    const kaxCues = new Uint8Array([28, 83, 187, 107]);
    const kaxInfo = new Uint8Array([21, 73, 169, 102]);
    const kaxTracks = new Uint8Array([22, 84, 174, 107]);
    let seekHead = { id: 290298740 /* SeekHead */, data: [
      { id: 19899 /* Seek */, data: [
        { id: 21419 /* SeekID */, data: kaxCues },
        { id: 21420 /* SeekPosition */, size: 5, data: 0 }
      ] },
      { id: 19899 /* Seek */, data: [
        { id: 21419 /* SeekID */, data: kaxInfo },
        { id: 21420 /* SeekPosition */, size: 5, data: 0 }
      ] },
      { id: 19899 /* Seek */, data: [
        { id: 21419 /* SeekID */, data: kaxTracks },
        { id: 21420 /* SeekPosition */, size: 5, data: 0 }
      ] }
    ] };
    __privateSet(this, _seekHead, seekHead);
  };
  _createSegmentInfo = new WeakSet();
  createSegmentInfo_fn = function() {
    let segmentDuration = { id: 17545 /* Duration */, data: new EBMLFloat64(0) };
    __privateSet(this, _segmentDuration, segmentDuration);
    let segmentInfo = { id: 357149030 /* Info */, data: [
      { id: 2807729 /* TimestampScale */, data: 1e6 },
      { id: 19840 /* MuxingApp */, data: APP_NAME },
      { id: 22337 /* WritingApp */, data: APP_NAME },
      !__privateGet(this, _options).streaming ? segmentDuration : null
    ] };
    __privateSet(this, _segmentInfo, segmentInfo);
  };
  _createTracks = new WeakSet();
  createTracks_fn = function() {
    let tracksElement = { id: 374648427 /* Tracks */, data: [] };
    __privateSet(this, _tracksElement, tracksElement);
    if (__privateGet(this, _options).video) {
      tracksElement.data.push({ id: 174 /* TrackEntry */, data: [
        { id: 215 /* TrackNumber */, data: VIDEO_TRACK_NUMBER },
        { id: 29637 /* TrackUID */, data: VIDEO_TRACK_NUMBER },
        { id: 131 /* TrackType */, data: VIDEO_TRACK_TYPE },
        { id: 134 /* CodecID */, data: __privateGet(this, _options).video.codec },
        __privateGet(this, _videoCodecPrivate),
        __privateGet(this, _options).video.frameRate ? { id: 2352003 /* DefaultDuration */, data: 1e9 / __privateGet(this, _options).video.frameRate } : null,
        { id: 224 /* Video */, data: [
          { id: 176 /* PixelWidth */, data: __privateGet(this, _options).video.width },
          { id: 186 /* PixelHeight */, data: __privateGet(this, _options).video.height },
          __privateGet(this, _options).video.alpha ? { id: 21440 /* AlphaMode */, data: 1 } : null,
          __privateGet(this, _colourElement)
        ] }
      ] });
    }
    if (__privateGet(this, _options).audio) {
      __privateSet(this, _audioCodecPrivate, __privateGet(this, _options).streaming ? __privateGet(this, _audioCodecPrivate) || null : { id: 236 /* Void */, size: 4, data: new Uint8Array(CODEC_PRIVATE_MAX_SIZE) });
      tracksElement.data.push({ id: 174 /* TrackEntry */, data: [
        { id: 215 /* TrackNumber */, data: AUDIO_TRACK_NUMBER },
        { id: 29637 /* TrackUID */, data: AUDIO_TRACK_NUMBER },
        { id: 131 /* TrackType */, data: AUDIO_TRACK_TYPE },
        { id: 134 /* CodecID */, data: __privateGet(this, _options).audio.codec },
        __privateGet(this, _audioCodecPrivate),
        { id: 225 /* Audio */, data: [
          { id: 181 /* SamplingFrequency */, data: new EBMLFloat32(__privateGet(this, _options).audio.sampleRate) },
          { id: 159 /* Channels */, data: __privateGet(this, _options).audio.numberOfChannels },
          __privateGet(this, _options).audio.bitDepth ? { id: 25188 /* BitDepth */, data: __privateGet(this, _options).audio.bitDepth } : null
        ] }
      ] });
    }
    if (__privateGet(this, _options).subtitles) {
      tracksElement.data.push({ id: 174 /* TrackEntry */, data: [
        { id: 215 /* TrackNumber */, data: SUBTITLE_TRACK_NUMBER },
        { id: 29637 /* TrackUID */, data: SUBTITLE_TRACK_NUMBER },
        { id: 131 /* TrackType */, data: SUBTITLE_TRACK_TYPE },
        { id: 134 /* CodecID */, data: __privateGet(this, _options).subtitles.codec },
        __privateGet(this, _subtitleCodecPrivate)
      ] });
    }
  };
  _createSegment = new WeakSet();
  createSegment_fn = function() {
    let segment = {
      id: 408125543 /* Segment */,
      size: __privateGet(this, _options).streaming ? -1 : SEGMENT_SIZE_BYTES,
      data: [
        !__privateGet(this, _options).streaming ? __privateGet(this, _seekHead) : null,
        __privateGet(this, _segmentInfo),
        __privateGet(this, _tracksElement)
      ]
    };
    __privateSet(this, _segment, segment);
    __privateGet(this, _writer).writeEBML(segment);
    if (__privateGet(this, _writer) instanceof BaseStreamTargetWriter && __privateGet(this, _writer).target.options.onHeader) {
      let { data, start } = __privateGet(this, _writer).getTrackedWrites();
      __privateGet(this, _writer).target.options.onHeader(data, start);
    }
  };
  _createCues = new WeakSet();
  createCues_fn = function() {
    __privateSet(this, _cues, { id: 475249515 /* Cues */, data: [] });
  };
  _maybeFlushStreamingTargetWriter = new WeakSet();
  maybeFlushStreamingTargetWriter_fn = function() {
    if (__privateGet(this, _writer) instanceof StreamTargetWriter) {
      __privateGet(this, _writer).flush();
    }
  };
  _segmentDataOffset = new WeakSet();
  segmentDataOffset_get = function() {
    return __privateGet(this, _writer).dataOffsets.get(__privateGet(this, _segment));
  };
  _writeVideoDecoderConfig = new WeakSet();
  writeVideoDecoderConfig_fn = function(meta) {
    if (!meta.decoderConfig)
      return;
    if (meta.decoderConfig.colorSpace) {
      let colorSpace = meta.decoderConfig.colorSpace;
      __privateSet(this, _colorSpace, colorSpace);
      __privateGet(this, _colourElement).data = [
        { id: 21937 /* MatrixCoefficients */, data: {
          "rgb": 1,
          "bt709": 1,
          "bt470bg": 5,
          "smpte170m": 6
        }[colorSpace.matrix] },
        { id: 21946 /* TransferCharacteristics */, data: {
          "bt709": 1,
          "smpte170m": 6,
          "iec61966-2-1": 13
        }[colorSpace.transfer] },
        { id: 21947 /* Primaries */, data: {
          "bt709": 1,
          "bt470bg": 5,
          "smpte170m": 6
        }[colorSpace.primaries] },
        { id: 21945 /* Range */, data: [1, 2][Number(colorSpace.fullRange)] }
      ];
      if (!__privateGet(this, _options).streaming) {
        let endPos = __privateGet(this, _writer).pos;
        __privateGet(this, _writer).seek(__privateGet(this, _writer).offsets.get(__privateGet(this, _colourElement)));
        __privateGet(this, _writer).writeEBML(__privateGet(this, _colourElement));
        __privateGet(this, _writer).seek(endPos);
      }
    }
    if (meta.decoderConfig.description) {
      if (__privateGet(this, _options).streaming) {
        __privateSet(this, _videoCodecPrivate, __privateMethod(this, _createCodecPrivateElement, createCodecPrivateElement_fn).call(this, meta.decoderConfig.description));
      } else {
        __privateMethod(this, _writeCodecPrivate, writeCodecPrivate_fn).call(this, __privateGet(this, _videoCodecPrivate), meta.decoderConfig.description);
      }
    }
  };
  _fixVP9ColorSpace = new WeakSet();
  fixVP9ColorSpace_fn = function(chunk) {
    if (chunk.type !== "key")
      return;
    if (!__privateGet(this, _colorSpace))
      return;
    let i = 0;
    if (readBits(chunk.data, 0, 2) !== 2)
      return;
    i += 2;
    let profile = (readBits(chunk.data, i + 1, i + 2) << 1) + readBits(chunk.data, i + 0, i + 1);
    i += 2;
    if (profile === 3)
      i++;
    let showExistingFrame = readBits(chunk.data, i + 0, i + 1);
    i++;
    if (showExistingFrame)
      return;
    let frameType = readBits(chunk.data, i + 0, i + 1);
    i++;
    if (frameType !== 0)
      return;
    i += 2;
    let syncCode = readBits(chunk.data, i + 0, i + 24);
    i += 24;
    if (syncCode !== 4817730)
      return;
    if (profile >= 2)
      i++;
    let colorSpaceID = {
      "rgb": 7,
      "bt709": 2,
      "bt470bg": 1,
      "smpte170m": 3
    }[__privateGet(this, _colorSpace).matrix];
    writeBits(chunk.data, i + 0, i + 3, colorSpaceID);
  };
  _writeSubtitleChunks = new WeakSet();
  writeSubtitleChunks_fn = function() {
    let lastWrittenMediaTimestamp = Math.min(
      __privateGet(this, _options).video ? __privateGet(this, _lastVideoTimestamp) : Infinity,
      __privateGet(this, _options).audio ? __privateGet(this, _lastAudioTimestamp) : Infinity
    );
    let queue = __privateGet(this, _subtitleChunkQueue);
    while (queue.length > 0 && queue[0].timestamp <= lastWrittenMediaTimestamp) {
      __privateMethod(this, _writeBlock, writeBlock_fn).call(this, queue.shift(), !__privateGet(this, _options).video && !__privateGet(this, _options).audio);
    }
  };
  _createInternalChunk = new WeakSet();
  createInternalChunk_fn = function(data, type, timestamp, trackNumber, duration, additions) {
    let adjustedTimestamp = __privateMethod(this, _validateTimestamp, validateTimestamp_fn).call(this, timestamp, trackNumber);
    let internalChunk = {
      data,
      additions,
      type,
      timestamp: adjustedTimestamp,
      duration,
      trackNumber
    };
    return internalChunk;
  };
  _validateTimestamp = new WeakSet();
  validateTimestamp_fn = function(timestamp, trackNumber) {
    let lastTimestamp = trackNumber === VIDEO_TRACK_NUMBER ? __privateGet(this, _lastVideoTimestamp) : trackNumber === AUDIO_TRACK_NUMBER ? __privateGet(this, _lastAudioTimestamp) : __privateGet(this, _lastSubtitleTimestamp);
    if (trackNumber !== SUBTITLE_TRACK_NUMBER) {
      let firstTimestamp = trackNumber === VIDEO_TRACK_NUMBER ? __privateGet(this, _firstVideoTimestamp) : __privateGet(this, _firstAudioTimestamp);
      if (__privateGet(this, _options).firstTimestampBehavior === "strict" && lastTimestamp === -1 && timestamp !== 0) {
        throw new Error(
          `The first chunk for your media track must have a timestamp of 0 (received ${timestamp}). Non-zero first timestamps are often caused by directly piping frames or audio data from a MediaStreamTrack into the encoder. Their timestamps are typically relative to the age of the document, which is probably what you want.

If you want to offset all timestamps of a track such that the first one is zero, set firstTimestampBehavior: 'offset' in the options.
If you want to allow non-zero first timestamps, set firstTimestampBehavior: 'permissive'.
`
        );
      } else if (__privateGet(this, _options).firstTimestampBehavior === "offset") {
        timestamp -= firstTimestamp;
      }
    }
    if (timestamp < lastTimestamp) {
      throw new Error(
        `Timestamps must be monotonically increasing (went from ${lastTimestamp} to ${timestamp}).`
      );
    }
    if (timestamp < 0) {
      throw new Error(`Timestamps must be non-negative (received ${timestamp}).`);
    }
    return timestamp;
  };
  _writeBlock = new WeakSet();
  writeBlock_fn = function(chunk, canCreateNewCluster) {
    if (__privateGet(this, _options).streaming && !__privateGet(this, _tracksElement)) {
      __privateMethod(this, _createTracks, createTracks_fn).call(this);
      __privateMethod(this, _createSegment, createSegment_fn).call(this);
    }
    let msTimestamp = Math.floor(chunk.timestamp / 1e3);
    let relativeTimestamp = msTimestamp - __privateGet(this, _currentClusterTimestamp);
    let shouldCreateNewClusterFromKeyFrame = canCreateNewCluster && chunk.type === "key" && relativeTimestamp >= 1e3;
    let clusterWouldBeTooLong = relativeTimestamp >= MAX_CHUNK_LENGTH_MS;
    if (!__privateGet(this, _currentCluster) || shouldCreateNewClusterFromKeyFrame || clusterWouldBeTooLong) {
      __privateMethod(this, _createNewCluster, createNewCluster_fn).call(this, msTimestamp);
      relativeTimestamp = 0;
    }
    if (relativeTimestamp < 0) {
      return;
    }
    let prelude = new Uint8Array(4);
    let view = new DataView(prelude.buffer);
    view.setUint8(0, 128 | chunk.trackNumber);
    view.setInt16(1, relativeTimestamp, false);
    if (chunk.duration === void 0 && !chunk.additions) {
      view.setUint8(3, Number(chunk.type === "key") << 7);
      let simpleBlock = { id: 163 /* SimpleBlock */, data: [
        prelude,
        chunk.data
      ] };
      __privateGet(this, _writer).writeEBML(simpleBlock);
    } else {
      let msDuration = Math.floor(chunk.duration / 1e3);
      let blockGroup = { id: 160 /* BlockGroup */, data: [
        { id: 161 /* Block */, data: [
          prelude,
          chunk.data
        ] },
        chunk.duration !== void 0 ? { id: 155 /* BlockDuration */, data: msDuration } : null,
        chunk.additions ? { id: 30113 /* BlockAdditions */, data: chunk.additions } : null
      ] };
      __privateGet(this, _writer).writeEBML(blockGroup);
    }
    __privateSet(this, _duration, Math.max(__privateGet(this, _duration), msTimestamp));
  };
  _createCodecPrivateElement = new WeakSet();
  createCodecPrivateElement_fn = function(data) {
    return { id: 25506 /* CodecPrivate */, size: 4, data: new Uint8Array(data) };
  };
  _writeCodecPrivate = new WeakSet();
  writeCodecPrivate_fn = function(element, data) {
    let endPos = __privateGet(this, _writer).pos;
    __privateGet(this, _writer).seek(__privateGet(this, _writer).offsets.get(element));
    let codecPrivateElementSize = 2 + 4 + data.byteLength;
    let voidDataSize = CODEC_PRIVATE_MAX_SIZE - codecPrivateElementSize;
    if (voidDataSize < 0) {
      let newByteLength = data.byteLength + voidDataSize;
      if (data instanceof ArrayBuffer) {
        data = data.slice(0, newByteLength);
      } else {
        data = data.buffer.slice(0, newByteLength);
      }
      voidDataSize = 0;
    }
    element = [
      __privateMethod(this, _createCodecPrivateElement, createCodecPrivateElement_fn).call(this, data),
      { id: 236 /* Void */, size: 4, data: new Uint8Array(voidDataSize) }
    ];
    __privateGet(this, _writer).writeEBML(element);
    __privateGet(this, _writer).seek(endPos);
  };
  _createNewCluster = new WeakSet();
  createNewCluster_fn = function(timestamp) {
    if (__privateGet(this, _currentCluster)) {
      __privateMethod(this, _finalizeCurrentCluster, finalizeCurrentCluster_fn).call(this);
    }
    if (__privateGet(this, _writer) instanceof BaseStreamTargetWriter && __privateGet(this, _writer).target.options.onCluster) {
      __privateGet(this, _writer).startTrackingWrites();
    }
    __privateSet(this, _currentCluster, {
      id: 524531317 /* Cluster */,
      size: __privateGet(this, _options).streaming ? -1 : CLUSTER_SIZE_BYTES,
      data: [
        { id: 231 /* Timestamp */, data: timestamp }
      ]
    });
    __privateGet(this, _writer).writeEBML(__privateGet(this, _currentCluster));
    __privateSet(this, _currentClusterTimestamp, timestamp);
    let clusterOffsetFromSegment = __privateGet(this, _writer).offsets.get(__privateGet(this, _currentCluster)) - __privateGet(this, _segmentDataOffset, segmentDataOffset_get);
    __privateGet(this, _cues).data.push({ id: 187 /* CuePoint */, data: [
      { id: 179 /* CueTime */, data: timestamp },
      __privateGet(this, _options).video ? { id: 183 /* CueTrackPositions */, data: [
        { id: 247 /* CueTrack */, data: VIDEO_TRACK_NUMBER },
        { id: 241 /* CueClusterPosition */, data: clusterOffsetFromSegment }
      ] } : null,
      __privateGet(this, _options).audio ? { id: 183 /* CueTrackPositions */, data: [
        { id: 247 /* CueTrack */, data: AUDIO_TRACK_NUMBER },
        { id: 241 /* CueClusterPosition */, data: clusterOffsetFromSegment }
      ] } : null
    ] });
  };
  _finalizeCurrentCluster = new WeakSet();
  finalizeCurrentCluster_fn = function() {
    if (!__privateGet(this, _options).streaming) {
      let clusterSize = __privateGet(this, _writer).pos - __privateGet(this, _writer).dataOffsets.get(__privateGet(this, _currentCluster));
      let endPos = __privateGet(this, _writer).pos;
      __privateGet(this, _writer).seek(__privateGet(this, _writer).offsets.get(__privateGet(this, _currentCluster)) + 4);
      __privateGet(this, _writer).writeEBMLVarInt(clusterSize, CLUSTER_SIZE_BYTES);
      __privateGet(this, _writer).seek(endPos);
    }
    if (__privateGet(this, _writer) instanceof BaseStreamTargetWriter && __privateGet(this, _writer).target.options.onCluster) {
      let { data, start } = __privateGet(this, _writer).getTrackedWrites();
      __privateGet(this, _writer).target.options.onCluster(data, start, __privateGet(this, _currentClusterTimestamp));
    }
  };
  _ensureNotFinalized = new WeakSet();
  ensureNotFinalized_fn = function() {
    if (__privateGet(this, _finalized)) {
      throw new Error("Cannot add new video or audio chunks after the file has been finalized.");
    }
  };

  // src/subtitles.ts
  var cueBlockHeaderRegex = /(?:(.+?)\n)?((?:\d{2}:)?\d{2}:\d{2}.\d{3})\s+-->\s+((?:\d{2}:)?\d{2}:\d{2}.\d{3})/g;
  var preambleStartRegex = /^WEBVTT.*?\n{2}/;
  var timestampRegex = /(?:(\d{2}):)?(\d{2}):(\d{2}).(\d{3})/;
  var inlineTimestampRegex = /<(?:(\d{2}):)?(\d{2}):(\d{2}).(\d{3})>/g;
  var textEncoder = new TextEncoder();
  var _options2, _config, _preambleSeen, _preambleBytes, _preambleEmitted, _parseTimestamp, parseTimestamp_fn, _formatTimestamp, formatTimestamp_fn;
  var SubtitleEncoder = class {
    constructor(options) {
      __privateAdd(this, _parseTimestamp);
      __privateAdd(this, _formatTimestamp);
      __privateAdd(this, _options2, void 0);
      __privateAdd(this, _config, void 0);
      __privateAdd(this, _preambleSeen, false);
      __privateAdd(this, _preambleBytes, void 0);
      __privateAdd(this, _preambleEmitted, false);
      __privateSet(this, _options2, options);
    }
    configure(config) {
      if (config.codec !== "webvtt") {
        throw new Error("Codec must be 'webvtt'.");
      }
      __privateSet(this, _config, config);
    }
    encode(text) {
      if (!__privateGet(this, _config)) {
        throw new Error("Encoder not configured.");
      }
      text = text.replace("\r\n", "\n").replace("\r", "\n");
      cueBlockHeaderRegex.lastIndex = 0;
      let match;
      if (!__privateGet(this, _preambleSeen)) {
        if (!preambleStartRegex.test(text)) {
          let error = new Error("WebVTT preamble incorrect.");
          __privateGet(this, _options2).error(error);
          throw error;
        }
        match = cueBlockHeaderRegex.exec(text);
        let preamble = text.slice(0, match?.index ?? text.length).trimEnd();
        if (!preamble) {
          let error = new Error("No WebVTT preamble provided.");
          __privateGet(this, _options2).error(error);
          throw error;
        }
        __privateSet(this, _preambleBytes, textEncoder.encode(preamble));
        __privateSet(this, _preambleSeen, true);
        if (match) {
          text = text.slice(match.index);
          cueBlockHeaderRegex.lastIndex = 0;
        }
      }
      while (match = cueBlockHeaderRegex.exec(text)) {
        let notes = text.slice(0, match.index);
        let cueIdentifier = match[1] || "";
        let matchEnd = match.index + match[0].length;
        let bodyStart = text.indexOf("\n", matchEnd) + 1;
        let cueSettings = text.slice(matchEnd, bodyStart).trim();
        let bodyEnd = text.indexOf("\n\n", matchEnd);
        if (bodyEnd === -1)
          bodyEnd = text.length;
        let startTime = __privateMethod(this, _parseTimestamp, parseTimestamp_fn).call(this, match[2]);
        let endTime = __privateMethod(this, _parseTimestamp, parseTimestamp_fn).call(this, match[3]);
        let duration = endTime - startTime;
        let body = text.slice(bodyStart, bodyEnd);
        let additions = `${cueSettings}
${cueIdentifier}
${notes}`;
        inlineTimestampRegex.lastIndex = 0;
        body = body.replace(inlineTimestampRegex, (match2) => {
          let time = __privateMethod(this, _parseTimestamp, parseTimestamp_fn).call(this, match2.slice(1, -1));
          let offsetTime = time - startTime;
          return `<${__privateMethod(this, _formatTimestamp, formatTimestamp_fn).call(this, offsetTime)}>`;
        });
        text = text.slice(bodyEnd).trimStart();
        cueBlockHeaderRegex.lastIndex = 0;
        let chunk = {
          body: textEncoder.encode(body),
          additions: additions.trim() === "" ? void 0 : textEncoder.encode(additions),
          timestamp: startTime * 1e3,
          duration: duration * 1e3
        };
        let meta = {};
        if (!__privateGet(this, _preambleEmitted)) {
          meta.decoderConfig = {
            description: __privateGet(this, _preambleBytes)
          };
          __privateSet(this, _preambleEmitted, true);
        }
        __privateGet(this, _options2).output(chunk, meta);
      }
    }
  };
  _options2 = new WeakMap();
  _config = new WeakMap();
  _preambleSeen = new WeakMap();
  _preambleBytes = new WeakMap();
  _preambleEmitted = new WeakMap();
  _parseTimestamp = new WeakSet();
  parseTimestamp_fn = function(string) {
    let match = timestampRegex.exec(string);
    if (!match)
      throw new Error("Expected match.");
    return 60 * 60 * 1e3 * Number(match[1] || "0") + 60 * 1e3 * Number(match[2]) + 1e3 * Number(match[3]) + Number(match[4]);
  };
  _formatTimestamp = new WeakSet();
  formatTimestamp_fn = function(timestamp) {
    let hours = Math.floor(timestamp / (60 * 60 * 1e3));
    let minutes = Math.floor(timestamp % (60 * 60 * 1e3) / (60 * 1e3));
    let seconds = Math.floor(timestamp % (60 * 1e3) / 1e3);
    let milliseconds = timestamp % 1e3;
    return hours.toString().padStart(2, "0") + ":" + minutes.toString().padStart(2, "0") + ":" + seconds.toString().padStart(2, "0") + "." + milliseconds.toString().padStart(3, "0");
  };
  return __toCommonJS(src_exports);
})();
if ( true && typeof module.exports === "object") Object.assign(module.exports, WebMMuxer)


/***/ }

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
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!******************************!*\
  !*** ./src/canvasinterop.ts ***!
  \******************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
var MandelbrotCanvas_1 = __webpack_require__(/*! ./MandelbrotCanvas */ "./src/MandelbrotCanvas.ts");
var MovieMakerInterop_1 = __webpack_require__(/*! ./MovieMakerInterop */ "./src/MovieMakerInterop.ts");
var InterpolationInterop_1 = __webpack_require__(/*! ./InterpolationInterop */ "./src/InterpolationInterop.ts");
window.canvasInterop = new MandelbrotCanvas_1.MandelbrotCanvas();
window.movieMakerInterop = new MovieMakerInterop_1.MovieMakerInterop();
window.interpolationInterop = new InterpolationInterop_1.InterpolationInterop();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQSxNQUFNO0FBQ047QUFDQSxNQUFNO0FBQ047QUFDQSxNQUFNO0FBQ047QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsU0FBUztBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixTQUFTO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1Asc0JBQXNCLG1CQUFtQjtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQiw0Q0FBNEM7QUFDbEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0Isd0NBQXdDO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBLFFBQVE7QUFDUjtBQUNBLFFBQVE7QUFDUiwyQ0FBMkMsZUFBZTtBQUMxRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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QUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7Ozs7Ozs7OztBQzVCQSxvR0FBc0Q7QUFDdEQsdUdBQXdEO0FBQ3hELGdIQUE4RDtBQVU5RCxNQUFNLENBQUMsYUFBYSxHQUFHLElBQUksbUNBQWdCLEVBQUUsQ0FBQztBQUM5QyxNQUFNLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxxQ0FBaUIsRUFBRSxDQUFDO0FBQ25ELE1BQU0sQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLDJDQUFvQixFQUFFLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9ibGF6b3IubWFuZGVsYnJvdC5kZWVwem9vbS8uL3NyYy9JbnRlcnBvbGF0aW9uSW50ZXJvcC50cyIsIndlYnBhY2s6Ly9ibGF6b3IubWFuZGVsYnJvdC5kZWVwem9vbS8uL3NyYy9NYW5kZWxicm90Q2FudmFzLnRzIiwid2VicGFjazovL2JsYXpvci5tYW5kZWxicm90LmRlZXB6b29tLy4vc3JjL01vdmllTWFrZXJJbnRlcm9wLnRzIiwid2VicGFjazovL2JsYXpvci5tYW5kZWxicm90LmRlZXB6b29tLy4vc3JjL1V0aWxpdHkudHMiLCJ3ZWJwYWNrOi8vYmxhem9yLm1hbmRlbGJyb3QuZGVlcHpvb20vLi9ub2RlX21vZHVsZXMvd2VibS1tdXhlci9idWlsZC93ZWJtLW11eGVyLmpzIiwid2VicGFjazovL2JsYXpvci5tYW5kZWxicm90LmRlZXB6b29tL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JsYXpvci5tYW5kZWxicm90LmRlZXB6b29tLy4vc3JjL2NhbnZhc2ludGVyb3AudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIEludGVycG9sYXRpb25JbnRlcm9wIHtcbiAgICBkcmF3UGl4ZWxzVG9DYW52YXMoY2FudmFzSWQ6IHN0cmluZywgYmFzZTY0OiBzdHJpbmcsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNhbnZhc0lkKSBhcyBIVE1MQ2FudmFzRWxlbWVudDtcbiAgICAgICAgaWYgKCFjYW52YXMpIHJldHVybjtcbiAgICAgICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgICAgIGNvbnN0IGltYWdlRGF0YSA9IGN0eC5jcmVhdGVJbWFnZURhdGEod2lkdGgsIGhlaWdodCk7XG4gICAgICAgIGNvbnN0IGJpbmFyeVN0cmluZyA9IHdpbmRvdy5hdG9iKGJhc2U2NCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYmluYXJ5U3RyaW5nLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpbWFnZURhdGEuZGF0YVtpXSA9IGJpbmFyeVN0cmluZy5jaGFyQ29kZUF0KGkpO1xuICAgICAgICB9XG4gICAgICAgIGN0eC5wdXRJbWFnZURhdGEoaW1hZ2VEYXRhLCAwLCAwKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBiYXNlNjRUb0FycmF5QnVmZmVyIH0gZnJvbSBcIi4vVXRpbGl0eVwiO1xyXG5cclxuZGVjbGFyZSBjbGFzcyBEb3ROZXQge1xyXG4gICAgc3RhdGljIGludm9rZU1ldGhvZEFzeW5jKC4uLmFyZ3M6IGFueVtdKTtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIE1hbmRlbGJyb3RDYW52YXMge1xyXG4gICAgY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XHJcbiAgICBtYW5kZWxicm90OiBJbWFnZURhdGE7XHJcbiAgICB4dzogbnVtYmVyO1xyXG4gICAgeXc6IG51bWJlcjtcclxuICAgIHJlY3Q6IHsgc3RhcnRYPywgc3RhcnRZPywgdz99ID0ge307XHJcbiAgICBkcmFnID0gZmFsc2U7XHJcbiAgICBkb3RuZXRvYmpyZWY7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGZXRjaGVzIGEgbmV3IG1hbmRlbGJyb3QgaW1hZ2UgaW5jbHVkaW5nIGEgbmV3IGl0ZXJhdGlvbiBsaW1pdCBiYXNlZCBvbiBjYXB0dXJlZCBzdGF0aXN0aWNzLlxyXG4gICAgICogUmV0dXJucyB0aGUgbmV3IGl0ZXJhdGlvbiBsaW1pdFxyXG4gICAgICogQHBhcmFtIG1Qb3NcclxuICAgICAqIHRoZSByZWFsIHBhcnQgb2YgdGhlIHBvc2l0aW9uXHJcbiAgICAgKiBAcGFyYW0gbVBvc2lcclxuICAgICAqIHRoZSBpbWFnaW5hcnkgcGFydCBvZiB0aGUgcG9zaXRpb25cclxuICAgICAqIEBwYXJhbSBzaXplXHJcbiAgICAgKiB0aGUgbWF0aGVtYXRpY2FsIHNpemUgb2YgdGhlIGFyZWFcclxuICAgICAqIEBwYXJhbSBpdGVyYXRpb25saW1pdFxyXG4gICAgICogdGhlIGl0ZXJhdGlvbiBsaW1pdCBvZiB0aGUgTWFuZGVsYnJvdCBpdGVyYXRpb24gbG9vcFxyXG4gICAgICovICAgIFxyXG4gICAgYXN5bmMgZmV0Y2hBbmREcmF3KG1Qb3M6IHN0cmluZywgbVBvc2k6IHN0cmluZywgbVNpemU6IHN0cmluZywgaXRlcmF0aW9ubGltaXQ6IG51bWJlcik6IFByb21pc2U8dm9pZD4geyAgICAgICAgXHJcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZmV0Y2goYE1hbmRlbGJyb3Q/cG9zPSR7bVBvc30mcG9zaT0ke21Qb3NpfSZzaXplPSR7bVNpemV9Jml0ZXJhdGlvbmxpbWl0PSR7aXRlcmF0aW9ubGltaXR9YCk7XHJcbiAgICAgICAgY29uc3QgcGF5bG9hZDoge1xyXG4gICAgICAgICAgICBpbWFnZTogc3RyaW5nO1xyXG4gICAgICAgICAgICBuZXdJdGVyYXRpb25MaW1pdDogbnVtYmVyO1xyXG4gICAgICAgIH0gPSBhd2FpdCByZXN1bHQuanNvbigpO1xyXG4gICAgICAgIHRoaXMuZHJhd1BpeGVsc1N0cmluZyhwYXlsb2FkLmltYWdlKTsgICAgICAgIFxyXG4gICAgICAgIHRoaXMuZG90bmV0b2JqcmVmLmludm9rZU1ldGhvZCgnTmV3SXRlcmF0aW9uTGltaXQnLCBwYXlsb2FkLm5ld0l0ZXJhdGlvbkxpbWl0KTsgICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGRyYXdQaXhlbHNTdHJpbmcocGl4ZWxzYmFzZTY0OiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICAvL2NvbnN0IHBpeGVscyA9IG5ldyBVaW50OEFycmF5KGF0b2IocGl4ZWxzYmFzZTY0KS5zcGxpdChcIlwiKS5tYXAoZnVuY3Rpb24gKGMpIHtcclxuICAgICAgICAvLyAgICByZXR1cm4gYy5jaGFyQ29kZUF0KDApO1xyXG4gICAgICAgIC8vfSkpO1xyXG4gICAgICAgIGNvbnN0IHBpeGVscyA9IGJhc2U2NFRvQXJyYXlCdWZmZXIocGl4ZWxzYmFzZTY0KTtcclxuICAgICAgICB0aGlzLmRyYXdQaXhlbHNVaW50OEFycmF5KHBpeGVscyk7ICAgICAgXHJcbiAgICAgICAgLy8gRHJhdyBpbWFnZSBkYXRhIHRvIHRoZSBjYW52YXMgICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGRyYXdQaXhlbHNVaW50OEFycmF5KHBpeGVsczogVWludDhBcnJheSk6IHZvaWQge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGl4ZWxzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMubWFuZGVsYnJvdC5kYXRhW2ldID0gcGl4ZWxzW2ldO1xyXG4gICAgICAgIH0gICAgICAgIFxyXG4gICAgICAgIHRoaXMuZHJhdygpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEltYWdlRnJvbVNlcnZlcih1cmw6IHN0cmluZykge1xyXG4gICAgICAgIGZldGNoKHVybCkudGhlbihyZXNwb25zZSA9PiB7XHJcbiAgICAgICAgICAgIHJlc3BvbnNlLmFycmF5QnVmZmVyKCkudGhlbihhcnJheUJ1ZmZlciA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRyYXdQaXhlbHNVaW50OEFycmF5KG5ldyBVaW50OEFycmF5KGFycmF5QnVmZmVyKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXQoaWQ6IHN0cmluZywgZG90bmV0b2JqcmVmLCB4dywgeXcpIHtcclxuICAgICAgICB0aGlzLnh3ID0geHc7XHJcbiAgICAgICAgdGhpcy55dyA9IHl3O1xyXG4gICAgICAgIHRoaXMuZG90bmV0b2JqcmVmID0gZG90bmV0b2JqcmVmO1xyXG4gICAgICAgIHRoaXMuY3R4ID0gKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKSBhcyBIVE1MQ2FudmFzRWxlbWVudCkuZ2V0Q29udGV4dCgnMmQnKTtcclxuICAgICAgICB0aGlzLmN0eC5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgKGUpID0+IHRoaXMubW91c2VEb3duKGUpLCBmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5jdHguY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCAoZSkgPT4gdGhpcy5tb3VzZVVwKGUpLCBmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5jdHguY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIChlKSA9PiB0aGlzLm1vdXNlTW92ZShlKSwgZmFsc2UpO1xyXG4gICAgICAgIHRoaXMubWFuZGVsYnJvdCA9IHRoaXMuY3R4LmNyZWF0ZUltYWdlRGF0YSh4dywgeXcpO1xyXG4gICAgfVxyXG5cclxuICAgIG1vdXNlRG93bihlOiBNb3VzZUV2ZW50KSB7XHJcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IGUudGFyZ2V0IGFzIEhUTUxFbGVtZW50O1xyXG4gICAgICAgIHRoaXMucmVjdC5zdGFydFggPSBlLnBhZ2VYIC0gZWxlbWVudC5vZmZzZXRMZWZ0O1xyXG4gICAgICAgIHRoaXMucmVjdC5zdGFydFkgPSBlLnBhZ2VZIC0gZWxlbWVudC5vZmZzZXRUb3A7XHJcbiAgICAgICAgdGhpcy5kcmFnID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBtb3VzZVVwKGU6IE1vdXNlRXZlbnQpIHtcclxuICAgICAgICB0aGlzLmRyYWcgPSBmYWxzZTtcclxuICAgICAgICAvLyB0aGlzLmN0eC5jbGVhclJlY3QoMCwgMCwgdGhpcy5jdHguY2FudmFzLndpZHRoLCB0aGlzLmN0eC5jYW52YXMuaGVpZ2h0KTtcclxuICAgICAgICB0aGlzLmRyYXcoKTtcclxuICAgICAgICB0aGlzLmRvdG5ldG9ianJlZi5pbnZva2VNZXRob2QoJ0RyYWdnZWQnLCB0aGlzLnJlY3QsIHRoaXMuZHJhZyk7XHJcbiAgICB9XHJcbiAgICBtb3VzZU1vdmUoZTogTW91c2VFdmVudCkge1xyXG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSBlLnRhcmdldCBhcyBIVE1MRWxlbWVudDtcclxuICAgICAgICBpZiAodGhpcy5kcmFnKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHcgPSAoZS5wYWdlWCAtIGVsZW1lbnQub2Zmc2V0TGVmdCkgLSB0aGlzLnJlY3Quc3RhcnRYO1xyXG4gICAgICAgICAgICBjb25zdCBoID0gKGUucGFnZVkgLSBlbGVtZW50Lm9mZnNldFRvcCkgLSB0aGlzLnJlY3Quc3RhcnRZOyAgIFxyXG4gICAgICAgICAgICB0aGlzLnJlY3QudyA9IHcgPiBoID8gdyA6IGg7IFxyXG4gICAgICAgICAgICB0aGlzLmRyYXcoKTtcclxuICAgICAgICAgICAgdGhpcy5kb3RuZXRvYmpyZWYuaW52b2tlTWV0aG9kKCdEcmFnZ2VkJywgdGhpcy5yZWN0LCB0aGlzLmRyYWcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBkcmF3KCkge1xyXG4gICAgICAgIGlmICh0aGlzLm1hbmRlbGJyb3QpIHtcclxuICAgICAgICAgICAgdGhpcy5jdHgucHV0SW1hZ2VEYXRhKHRoaXMubWFuZGVsYnJvdCwgMCwgMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmN0eC5jbGVhclJlY3QoMCwgMCwgdGhpcy5jdHguY2FudmFzLndpZHRoLCB0aGlzLmN0eC5jYW52YXMuaGVpZ2h0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMucmVjdC5zdGFydFgpIHtcclxuICAgICAgICAgICAgdGhpcy5jdHguc2V0TGluZURhc2goWzZdKTtcclxuICAgICAgICAgICAgdGhpcy5jdHguc3Ryb2tlU3R5bGUgPSBcIiNDMEMwQzBcIjtcclxuICAgICAgICAgICAgdGhpcy5jdHguc3Ryb2tlUmVjdChcclxuICAgICAgICAgICAgICAgIHRoaXMucmVjdC5zdGFydFggLSB0aGlzLnJlY3QudyxcclxuICAgICAgICAgICAgICAgIHRoaXMucmVjdC5zdGFydFkgLSB0aGlzLnJlY3QudyAqIHRoaXMueXcgLyB0aGlzLnh3LFxyXG4gICAgICAgICAgICAgICAgMiAqIHRoaXMucmVjdC53LCAyICogdGhpcy5yZWN0LncgKiB0aGlzLnl3IC8gdGhpcy54dyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldENhbnZhc0RhdGFVcmwoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jdHguY2FudmFzLnRvRGF0YVVSTCgnaW1hZ2UvcG5nJyk7XHJcbiAgICB9XHJcblxyXG4gICAgZGVzdHJveSgpIHtcclxuICAgICAgICB0aGlzLmN0eC5jYW52YXMucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5tb3VzZURvd24pO1xyXG4gICAgICAgIHRoaXMuY3R4LmNhbnZhcy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5tb3VzZURvd24pO1xyXG4gICAgICAgIHRoaXMuY3R4LmNhbnZhcy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLm1vdXNlRG93bik7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBNdXhlciwgQXJyYXlCdWZmZXJUYXJnZXQgfSBmcm9tICd3ZWJtLW11eGVyJztcblxuZXhwb3J0IGNsYXNzIE1vdmllTWFrZXJJbnRlcm9wIHtcbiAgICBwcml2YXRlIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQ7XG4gICAgcHJpdmF0ZSBjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRDtcbiAgICBwcml2YXRlIHdpZHRoOiBudW1iZXI7XG4gICAgcHJpdmF0ZSBoZWlnaHQ6IG51bWJlcjtcbiAgICBwcml2YXRlIGZyYW1lczogVWludDhBcnJheVtdID0gW107XG5cbiAgICBpbml0KGNhbnZhc0lkOiBzdHJpbmcsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY2FudmFzSWQpIGFzIEhUTUxDYW52YXNFbGVtZW50O1xuICAgICAgICB0aGlzLmN0eCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgICAgIHRoaXMuZnJhbWVzID0gW107XG4gICAgfVxuXG4gICAgcmVzZXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZnJhbWVzID0gW107XG4gICAgICAgIGlmICh0aGlzLmN0eClcbiAgICAgICAgICAgIHRoaXMuY3R4LmNsZWFyUmVjdCgwLCAwLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gICAgfVxuXG4gICAgYXN5bmMgYWRkRnJhbWVGcm9tVXJsKHVybDogc3RyaW5nLCBmcmFtZUluZGV4OiBudW1iZXIpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwpO1xuICAgICAgICBjb25zdCBidWZmZXIgPSBhd2FpdCByZXNwb25zZS5hcnJheUJ1ZmZlcigpO1xuICAgICAgICBjb25zdCBwaXhlbHMgPSBuZXcgVWludDhBcnJheShidWZmZXIpO1xuICAgICAgICB0aGlzLmZyYW1lc1tmcmFtZUluZGV4XSA9IHBpeGVscztcbiAgICAgICAgdGhpcy5kcmF3UGl4ZWxzKHBpeGVscyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkcmF3UGl4ZWxzKHBpeGVsczogVWludDhBcnJheSk6IHZvaWQge1xuICAgICAgICBjb25zdCBpbWFnZURhdGEgPSB0aGlzLmN0eC5jcmVhdGVJbWFnZURhdGEodGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICAgICAgICBpbWFnZURhdGEuZGF0YS5zZXQocGl4ZWxzKTtcbiAgICAgICAgdGhpcy5jdHgucHV0SW1hZ2VEYXRhKGltYWdlRGF0YSwgMCwgMCk7XG4gICAgfVxuXG4gICAgYXN5bmMgcmVuZGVyQW5kRG93bmxvYWQoZnBzOiBudW1iZXIpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICBjb25zdCB0YXJnZXQgPSBuZXcgQXJyYXlCdWZmZXJUYXJnZXQoKTtcbiAgICAgICAgY29uc3QgbXV4ZXIgPSBuZXcgTXV4ZXIoe1xuICAgICAgICAgICAgdGFyZ2V0LFxuICAgICAgICAgICAgdmlkZW86IHtcbiAgICAgICAgICAgICAgICBjb2RlYzogJ1ZfVlA5JyxcbiAgICAgICAgICAgICAgICB3aWR0aDogdGhpcy53aWR0aCxcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IHRoaXMuaGVpZ2h0LFxuICAgICAgICAgICAgICAgIGZyYW1lUmF0ZTogZnBzLFxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBlbmNvZGVyID0gbmV3IFZpZGVvRW5jb2Rlcih7XG4gICAgICAgICAgICBvdXRwdXQ6IChjaHVuaywgbWV0YSkgPT4gbXV4ZXIuYWRkVmlkZW9DaHVuayhjaHVuaywgbWV0YSksXG4gICAgICAgICAgICBlcnJvcjogKGUpID0+IGNvbnNvbGUuZXJyb3IoJ1ZpZGVvRW5jb2RlciBlcnJvcjonLCBlKSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZW5jb2Rlci5jb25maWd1cmUoe1xuICAgICAgICAgICAgY29kZWM6ICd2cDA5LjAwLjEwLjA4JyxcbiAgICAgICAgICAgIHdpZHRoOiB0aGlzLndpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0OiB0aGlzLmhlaWdodCxcbiAgICAgICAgICAgIGJpdHJhdGU6IDQwXzAwMF8wMDAsXG4gICAgICAgICAgICBmcmFtZXJhdGU6IGZwcyxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgZnJhbWVEdXJhdGlvbk1pY3JvcyA9IE1hdGgucm91bmQoMV8wMDBfMDAwIC8gZnBzKTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZnJhbWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBmcmFtZSA9IG5ldyBWaWRlb0ZyYW1lKHRoaXMuZnJhbWVzW2ldLCB7XG4gICAgICAgICAgICAgICAgZm9ybWF0OiAnUkdCQScsXG4gICAgICAgICAgICAgICAgY29kZWRXaWR0aDogdGhpcy53aWR0aCxcbiAgICAgICAgICAgICAgICBjb2RlZEhlaWdodDogdGhpcy5oZWlnaHQsXG4gICAgICAgICAgICAgICAgdGltZXN0YW1wOiBpICogZnJhbWVEdXJhdGlvbk1pY3JvcyxcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogZnJhbWVEdXJhdGlvbk1pY3JvcyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZW5jb2Rlci5lbmNvZGUoZnJhbWUsIHsga2V5RnJhbWU6IGkgJSAoZnBzICogMikgPT09IDAgfSk7XG4gICAgICAgICAgICBmcmFtZS5jbG9zZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgYXdhaXQgZW5jb2Rlci5mbHVzaCgpO1xuICAgICAgICBlbmNvZGVyLmNsb3NlKCk7XG4gICAgICAgIG11eGVyLmZpbmFsaXplKCk7XG5cbiAgICAgICAgY29uc3QgYmxvYiA9IG5ldyBCbG9iKFt0YXJnZXQuYnVmZmVyXSwgeyB0eXBlOiAndmlkZW8vd2VibScgfSk7XG4gICAgICAgIHJldHVybiBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuICAgIH1cbn1cbiIsImV4cG9ydCBmdW5jdGlvbiBiYXNlNjRUb0FycmF5QnVmZmVyKGJhc2U2NDogc3RyaW5nKSB7XHJcbiAgICBjb25zdCBiaW5hcnlTdHJpbmcgPSB3aW5kb3cuYXRvYihiYXNlNjQpO1xyXG4gICAgY29uc3QgYmluYXJ5TGVuID0gYmluYXJ5U3RyaW5nLmxlbmd0aDtcclxuICAgIGNvbnN0IGJ5dGVzID0gbmV3IFVpbnQ4QXJyYXkoYmluYXJ5TGVuKTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYmluYXJ5TGVuOyBpKyspIHtcclxuICAgICAgICBjb25zdCBhc2NpaSA9IGJpbmFyeVN0cmluZy5jaGFyQ29kZUF0KGkpO1xyXG4gICAgICAgIGJ5dGVzW2ldID0gYXNjaWk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYnl0ZXM7XHJcbn1cclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgV2ViTU11eGVyID0gKCgpID0+IHtcbiAgdmFyIF9fZGVmUHJvcCA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcbiAgdmFyIF9fZ2V0T3duUHJvcERlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xuICB2YXIgX19nZXRPd25Qcm9wTmFtZXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcztcbiAgdmFyIF9faGFzT3duUHJvcCA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG4gIHZhciBfX2V4cG9ydCA9ICh0YXJnZXQsIGFsbCkgPT4ge1xuICAgIGZvciAodmFyIG5hbWUgaW4gYWxsKVxuICAgICAgX19kZWZQcm9wKHRhcmdldCwgbmFtZSwgeyBnZXQ6IGFsbFtuYW1lXSwgZW51bWVyYWJsZTogdHJ1ZSB9KTtcbiAgfTtcbiAgdmFyIF9fY29weVByb3BzID0gKHRvLCBmcm9tLCBleGNlcHQsIGRlc2MpID0+IHtcbiAgICBpZiAoZnJvbSAmJiB0eXBlb2YgZnJvbSA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgZnJvbSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICBmb3IgKGxldCBrZXkgb2YgX19nZXRPd25Qcm9wTmFtZXMoZnJvbSkpXG4gICAgICAgIGlmICghX19oYXNPd25Qcm9wLmNhbGwodG8sIGtleSkgJiYga2V5ICE9PSBleGNlcHQpXG4gICAgICAgICAgX19kZWZQcm9wKHRvLCBrZXksIHsgZ2V0OiAoKSA9PiBmcm9tW2tleV0sIGVudW1lcmFibGU6ICEoZGVzYyA9IF9fZ2V0T3duUHJvcERlc2MoZnJvbSwga2V5KSkgfHwgZGVzYy5lbnVtZXJhYmxlIH0pO1xuICAgIH1cbiAgICByZXR1cm4gdG87XG4gIH07XG4gIHZhciBfX3RvQ29tbW9uSlMgPSAobW9kKSA9PiBfX2NvcHlQcm9wcyhfX2RlZlByb3Aoe30sIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pLCBtb2QpO1xuICB2YXIgX19hY2Nlc3NDaGVjayA9IChvYmosIG1lbWJlciwgbXNnKSA9PiB7XG4gICAgaWYgKCFtZW1iZXIuaGFzKG9iaikpXG4gICAgICB0aHJvdyBUeXBlRXJyb3IoXCJDYW5ub3QgXCIgKyBtc2cpO1xuICB9O1xuICB2YXIgX19wcml2YXRlR2V0ID0gKG9iaiwgbWVtYmVyLCBnZXR0ZXIpID0+IHtcbiAgICBfX2FjY2Vzc0NoZWNrKG9iaiwgbWVtYmVyLCBcInJlYWQgZnJvbSBwcml2YXRlIGZpZWxkXCIpO1xuICAgIHJldHVybiBnZXR0ZXIgPyBnZXR0ZXIuY2FsbChvYmopIDogbWVtYmVyLmdldChvYmopO1xuICB9O1xuICB2YXIgX19wcml2YXRlQWRkID0gKG9iaiwgbWVtYmVyLCB2YWx1ZSkgPT4ge1xuICAgIGlmIChtZW1iZXIuaGFzKG9iaikpXG4gICAgICB0aHJvdyBUeXBlRXJyb3IoXCJDYW5ub3QgYWRkIHRoZSBzYW1lIHByaXZhdGUgbWVtYmVyIG1vcmUgdGhhbiBvbmNlXCIpO1xuICAgIG1lbWJlciBpbnN0YW5jZW9mIFdlYWtTZXQgPyBtZW1iZXIuYWRkKG9iaikgOiBtZW1iZXIuc2V0KG9iaiwgdmFsdWUpO1xuICB9O1xuICB2YXIgX19wcml2YXRlU2V0ID0gKG9iaiwgbWVtYmVyLCB2YWx1ZSwgc2V0dGVyKSA9PiB7XG4gICAgX19hY2Nlc3NDaGVjayhvYmosIG1lbWJlciwgXCJ3cml0ZSB0byBwcml2YXRlIGZpZWxkXCIpO1xuICAgIHNldHRlciA/IHNldHRlci5jYWxsKG9iaiwgdmFsdWUpIDogbWVtYmVyLnNldChvYmosIHZhbHVlKTtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH07XG4gIHZhciBfX3ByaXZhdGVNZXRob2QgPSAob2JqLCBtZW1iZXIsIG1ldGhvZCkgPT4ge1xuICAgIF9fYWNjZXNzQ2hlY2sob2JqLCBtZW1iZXIsIFwiYWNjZXNzIHByaXZhdGUgbWV0aG9kXCIpO1xuICAgIHJldHVybiBtZXRob2Q7XG4gIH07XG5cbiAgLy8gc3JjL2luZGV4LnRzXG4gIHZhciBzcmNfZXhwb3J0cyA9IHt9O1xuICBfX2V4cG9ydChzcmNfZXhwb3J0cywge1xuICAgIEFycmF5QnVmZmVyVGFyZ2V0OiAoKSA9PiBBcnJheUJ1ZmZlclRhcmdldCxcbiAgICBGaWxlU3lzdGVtV3JpdGFibGVGaWxlU3RyZWFtVGFyZ2V0OiAoKSA9PiBGaWxlU3lzdGVtV3JpdGFibGVGaWxlU3RyZWFtVGFyZ2V0LFxuICAgIE11eGVyOiAoKSA9PiBNdXhlcixcbiAgICBTdHJlYW1UYXJnZXQ6ICgpID0+IFN0cmVhbVRhcmdldCxcbiAgICBTdWJ0aXRsZUVuY29kZXI6ICgpID0+IFN1YnRpdGxlRW5jb2RlclxuICB9KTtcblxuICAvLyBzcmMvZWJtbC50c1xuICB2YXIgRUJNTEZsb2F0MzIgPSBjbGFzcyB7XG4gICAgY29uc3RydWN0b3IodmFsdWUpIHtcbiAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB9XG4gIH07XG4gIHZhciBFQk1MRmxvYXQ2NCA9IGNsYXNzIHtcbiAgICBjb25zdHJ1Y3Rvcih2YWx1ZSkge1xuICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIH1cbiAgfTtcbiAgdmFyIG1lYXN1cmVVbnNpZ25lZEludCA9ICh2YWx1ZSkgPT4ge1xuICAgIGlmICh2YWx1ZSA8IDEgPDwgOCkge1xuICAgICAgcmV0dXJuIDE7XG4gICAgfSBlbHNlIGlmICh2YWx1ZSA8IDEgPDwgMTYpIHtcbiAgICAgIHJldHVybiAyO1xuICAgIH0gZWxzZSBpZiAodmFsdWUgPCAxIDw8IDI0KSB7XG4gICAgICByZXR1cm4gMztcbiAgICB9IGVsc2UgaWYgKHZhbHVlIDwgMiAqKiAzMikge1xuICAgICAgcmV0dXJuIDQ7XG4gICAgfSBlbHNlIGlmICh2YWx1ZSA8IDIgKiogNDApIHtcbiAgICAgIHJldHVybiA1O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gNjtcbiAgICB9XG4gIH07XG4gIHZhciBtZWFzdXJlRUJNTFZhckludCA9ICh2YWx1ZSkgPT4ge1xuICAgIGlmICh2YWx1ZSA8ICgxIDw8IDcpIC0gMSkge1xuICAgICAgcmV0dXJuIDE7XG4gICAgfSBlbHNlIGlmICh2YWx1ZSA8ICgxIDw8IDE0KSAtIDEpIHtcbiAgICAgIHJldHVybiAyO1xuICAgIH0gZWxzZSBpZiAodmFsdWUgPCAoMSA8PCAyMSkgLSAxKSB7XG4gICAgICByZXR1cm4gMztcbiAgICB9IGVsc2UgaWYgKHZhbHVlIDwgKDEgPDwgMjgpIC0gMSkge1xuICAgICAgcmV0dXJuIDQ7XG4gICAgfSBlbHNlIGlmICh2YWx1ZSA8IDIgKiogMzUgLSAxKSB7XG4gICAgICByZXR1cm4gNTtcbiAgICB9IGVsc2UgaWYgKHZhbHVlIDwgMiAqKiA0MiAtIDEpIHtcbiAgICAgIHJldHVybiA2O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJFQk1MIFZJTlQgc2l6ZSBub3Qgc3VwcG9ydGVkIFwiICsgdmFsdWUpO1xuICAgIH1cbiAgfTtcblxuICAvLyBzcmMvbWlzYy50c1xuICB2YXIgcmVhZEJpdHMgPSAoYnl0ZXMsIHN0YXJ0LCBlbmQpID0+IHtcbiAgICBsZXQgcmVzdWx0ID0gMDtcbiAgICBmb3IgKGxldCBpID0gc3RhcnQ7IGkgPCBlbmQ7IGkrKykge1xuICAgICAgbGV0IGJ5dGVJbmRleCA9IE1hdGguZmxvb3IoaSAvIDgpO1xuICAgICAgbGV0IGJ5dGUgPSBieXRlc1tieXRlSW5kZXhdO1xuICAgICAgbGV0IGJpdEluZGV4ID0gNyAtIChpICYgNyk7XG4gICAgICBsZXQgYml0ID0gKGJ5dGUgJiAxIDw8IGJpdEluZGV4KSA+PiBiaXRJbmRleDtcbiAgICAgIHJlc3VsdCA8PD0gMTtcbiAgICAgIHJlc3VsdCB8PSBiaXQ7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG4gIHZhciB3cml0ZUJpdHMgPSAoYnl0ZXMsIHN0YXJ0LCBlbmQsIHZhbHVlKSA9PiB7XG4gICAgZm9yIChsZXQgaSA9IHN0YXJ0OyBpIDwgZW5kOyBpKyspIHtcbiAgICAgIGxldCBieXRlSW5kZXggPSBNYXRoLmZsb29yKGkgLyA4KTtcbiAgICAgIGxldCBieXRlID0gYnl0ZXNbYnl0ZUluZGV4XTtcbiAgICAgIGxldCBiaXRJbmRleCA9IDcgLSAoaSAmIDcpO1xuICAgICAgYnl0ZSAmPSB+KDEgPDwgYml0SW5kZXgpO1xuICAgICAgYnl0ZSB8PSAodmFsdWUgJiAxIDw8IGVuZCAtIGkgLSAxKSA+PiBlbmQgLSBpIC0gMSA8PCBiaXRJbmRleDtcbiAgICAgIGJ5dGVzW2J5dGVJbmRleF0gPSBieXRlO1xuICAgIH1cbiAgfTtcblxuICAvLyBzcmMvdGFyZ2V0LnRzXG4gIHZhciBpc1RhcmdldCA9IFN5bWJvbChcImlzVGFyZ2V0XCIpO1xuICB2YXIgVGFyZ2V0ID0gY2xhc3Mge1xuICB9O1xuICBpc1RhcmdldDtcbiAgdmFyIEFycmF5QnVmZmVyVGFyZ2V0ID0gY2xhc3MgZXh0ZW5kcyBUYXJnZXQge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgc3VwZXIoLi4uYXJndW1lbnRzKTtcbiAgICAgIHRoaXMuYnVmZmVyID0gbnVsbDtcbiAgICB9XG4gIH07XG4gIHZhciBTdHJlYW1UYXJnZXQgPSBjbGFzcyBleHRlbmRzIFRhcmdldCB7XG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgICAgc3VwZXIoKTtcbiAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgICBpZiAodHlwZW9mIG9wdGlvbnMgIT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN0cmVhbVRhcmdldCByZXF1aXJlcyBhbiBvcHRpb25zIG9iamVjdCB0byBiZSBwYXNzZWQgdG8gaXRzIGNvbnN0cnVjdG9yLlwiKTtcbiAgICAgIH1cbiAgICAgIGlmIChvcHRpb25zLm9uRGF0YSkge1xuICAgICAgICBpZiAodHlwZW9mIG9wdGlvbnMub25EYXRhICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwib3B0aW9ucy5vbkRhdGEsIHdoZW4gcHJvdmlkZWQsIG11c3QgYmUgYSBmdW5jdGlvbi5cIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9wdGlvbnMub25EYXRhLmxlbmd0aCA8IDIpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICAgICAgICAgXCJvcHRpb25zLm9uRGF0YSwgd2hlbiBwcm92aWRlZCwgbXVzdCBiZSBhIGZ1bmN0aW9uIHRoYXQgdGFrZXMgaW4gYXQgbGVhc3QgdHdvIGFyZ3VtZW50cyAoZGF0YSBhbmQgcG9zaXRpb24pLiBJZ25vcmluZyB0aGUgcG9zaXRpb24gYXJndW1lbnQsIHdoaWNoIHNwZWNpZmllcyB0aGUgYnl0ZSBvZmZzZXQgYXQgd2hpY2ggdGhlIGRhdGEgaXMgdG8gYmUgd3JpdHRlbiwgY2FuIGxlYWQgdG8gYnJva2VuIG91dHB1dHMuXCJcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAob3B0aW9ucy5vbkhlYWRlciAmJiB0eXBlb2Ygb3B0aW9ucy5vbkhlYWRlciAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJvcHRpb25zLm9uSGVhZGVyLCB3aGVuIHByb3ZpZGVkLCBtdXN0IGJlIGEgZnVuY3Rpb24uXCIpO1xuICAgICAgfVxuICAgICAgaWYgKG9wdGlvbnMub25DbHVzdGVyICYmIHR5cGVvZiBvcHRpb25zLm9uQ2x1c3RlciAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJvcHRpb25zLm9uQ2x1c3Rlciwgd2hlbiBwcm92aWRlZCwgbXVzdCBiZSBhIGZ1bmN0aW9uLlwiKTtcbiAgICAgIH1cbiAgICAgIGlmIChvcHRpb25zLmNodW5rZWQgIT09IHZvaWQgMCAmJiB0eXBlb2Ygb3B0aW9ucy5jaHVua2VkICE9PSBcImJvb2xlYW5cIikge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwib3B0aW9ucy5jaHVua2VkLCB3aGVuIHByb3ZpZGVkLCBtdXN0IGJlIGEgYm9vbGVhbi5cIik7XG4gICAgICB9XG4gICAgICBpZiAob3B0aW9ucy5jaHVua1NpemUgIT09IHZvaWQgMCAmJiAoIU51bWJlci5pc0ludGVnZXIob3B0aW9ucy5jaHVua1NpemUpIHx8IG9wdGlvbnMuY2h1bmtTaXplIDwgMTAyNCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIm9wdGlvbnMuY2h1bmtTaXplLCB3aGVuIHByb3ZpZGVkLCBtdXN0IGJlIGFuIGludGVnZXIgYW5kIG5vdCBzbWFsbGVyIHRoYW4gMTAyNC5cIik7XG4gICAgICB9XG4gICAgfVxuICB9O1xuICB2YXIgRmlsZVN5c3RlbVdyaXRhYmxlRmlsZVN0cmVhbVRhcmdldCA9IGNsYXNzIGV4dGVuZHMgVGFyZ2V0IHtcbiAgICBjb25zdHJ1Y3RvcihzdHJlYW0sIG9wdGlvbnMpIHtcbiAgICAgIHN1cGVyKCk7XG4gICAgICB0aGlzLnN0cmVhbSA9IHN0cmVhbTtcbiAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgICBpZiAoIShzdHJlYW0gaW5zdGFuY2VvZiBGaWxlU3lzdGVtV3JpdGFibGVGaWxlU3RyZWFtKSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiRmlsZVN5c3RlbVdyaXRhYmxlRmlsZVN0cmVhbVRhcmdldCByZXF1aXJlcyBhIEZpbGVTeXN0ZW1Xcml0YWJsZUZpbGVTdHJlYW0gaW5zdGFuY2UuXCIpO1xuICAgICAgfVxuICAgICAgaWYgKG9wdGlvbnMgIT09IHZvaWQgMCAmJiB0eXBlb2Ygb3B0aW9ucyAhPT0gXCJvYmplY3RcIikge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiRmlsZVN5c3RlbVdyaXRhYmxlRmlsZVN0cmVhbVRhcmdldCdzIG9wdGlvbnMsIHdoZW4gcHJvdmlkZWQsIG11c3QgYmUgYW4gb2JqZWN0LlwiKTtcbiAgICAgIH1cbiAgICAgIGlmIChvcHRpb25zKSB7XG4gICAgICAgIGlmIChvcHRpb25zLmNodW5rU2l6ZSAhPT0gdm9pZCAwICYmICghTnVtYmVyLmlzSW50ZWdlcihvcHRpb25zLmNodW5rU2l6ZSkgfHwgb3B0aW9ucy5jaHVua1NpemUgPD0gMCkpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwib3B0aW9ucy5jaHVua1NpemUsIHdoZW4gcHJvdmlkZWQsIG11c3QgYmUgYSBwb3NpdGl2ZSBpbnRlZ2VyXCIpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIC8vIHNyYy93cml0ZXIudHNcbiAgdmFyIF9oZWxwZXIsIF9oZWxwZXJWaWV3LCBfd3JpdGVCeXRlLCB3cml0ZUJ5dGVfZm4sIF93cml0ZUZsb2F0MzIsIHdyaXRlRmxvYXQzMl9mbiwgX3dyaXRlRmxvYXQ2NCwgd3JpdGVGbG9hdDY0X2ZuLCBfd3JpdGVVbnNpZ25lZEludCwgd3JpdGVVbnNpZ25lZEludF9mbiwgX3dyaXRlU3RyaW5nLCB3cml0ZVN0cmluZ19mbjtcbiAgdmFyIFdyaXRlciA9IGNsYXNzIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgIF9fcHJpdmF0ZUFkZCh0aGlzLCBfd3JpdGVCeXRlKTtcbiAgICAgIF9fcHJpdmF0ZUFkZCh0aGlzLCBfd3JpdGVGbG9hdDMyKTtcbiAgICAgIF9fcHJpdmF0ZUFkZCh0aGlzLCBfd3JpdGVGbG9hdDY0KTtcbiAgICAgIF9fcHJpdmF0ZUFkZCh0aGlzLCBfd3JpdGVVbnNpZ25lZEludCk7XG4gICAgICBfX3ByaXZhdGVBZGQodGhpcywgX3dyaXRlU3RyaW5nKTtcbiAgICAgIHRoaXMucG9zID0gMDtcbiAgICAgIF9fcHJpdmF0ZUFkZCh0aGlzLCBfaGVscGVyLCBuZXcgVWludDhBcnJheSg4KSk7XG4gICAgICBfX3ByaXZhdGVBZGQodGhpcywgX2hlbHBlclZpZXcsIG5ldyBEYXRhVmlldyhfX3ByaXZhdGVHZXQodGhpcywgX2hlbHBlcikuYnVmZmVyKSk7XG4gICAgICB0aGlzLm9mZnNldHMgPSAvKiBAX19QVVJFX18gKi8gbmV3IFdlYWtNYXAoKTtcbiAgICAgIHRoaXMuZGF0YU9mZnNldHMgPSAvKiBAX19QVVJFX18gKi8gbmV3IFdlYWtNYXAoKTtcbiAgICB9XG4gICAgc2VlayhuZXdQb3MpIHtcbiAgICAgIHRoaXMucG9zID0gbmV3UG9zO1xuICAgIH1cbiAgICB3cml0ZUVCTUxWYXJJbnQodmFsdWUsIHdpZHRoID0gbWVhc3VyZUVCTUxWYXJJbnQodmFsdWUpKSB7XG4gICAgICBsZXQgcG9zID0gMDtcbiAgICAgIHN3aXRjaCAod2lkdGgpIHtcbiAgICAgICAgY2FzZSAxOlxuICAgICAgICAgIF9fcHJpdmF0ZUdldCh0aGlzLCBfaGVscGVyVmlldykuc2V0VWludDgocG9zKyssIDEgPDwgNyB8IHZhbHVlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAyOlxuICAgICAgICAgIF9fcHJpdmF0ZUdldCh0aGlzLCBfaGVscGVyVmlldykuc2V0VWludDgocG9zKyssIDEgPDwgNiB8IHZhbHVlID4+IDgpO1xuICAgICAgICAgIF9fcHJpdmF0ZUdldCh0aGlzLCBfaGVscGVyVmlldykuc2V0VWludDgocG9zKyssIHZhbHVlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAzOlxuICAgICAgICAgIF9fcHJpdmF0ZUdldCh0aGlzLCBfaGVscGVyVmlldykuc2V0VWludDgocG9zKyssIDEgPDwgNSB8IHZhbHVlID4+IDE2KTtcbiAgICAgICAgICBfX3ByaXZhdGVHZXQodGhpcywgX2hlbHBlclZpZXcpLnNldFVpbnQ4KHBvcysrLCB2YWx1ZSA+PiA4KTtcbiAgICAgICAgICBfX3ByaXZhdGVHZXQodGhpcywgX2hlbHBlclZpZXcpLnNldFVpbnQ4KHBvcysrLCB2YWx1ZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgNDpcbiAgICAgICAgICBfX3ByaXZhdGVHZXQodGhpcywgX2hlbHBlclZpZXcpLnNldFVpbnQ4KHBvcysrLCAxIDw8IDQgfCB2YWx1ZSA+PiAyNCk7XG4gICAgICAgICAgX19wcml2YXRlR2V0KHRoaXMsIF9oZWxwZXJWaWV3KS5zZXRVaW50OChwb3MrKywgdmFsdWUgPj4gMTYpO1xuICAgICAgICAgIF9fcHJpdmF0ZUdldCh0aGlzLCBfaGVscGVyVmlldykuc2V0VWludDgocG9zKyssIHZhbHVlID4+IDgpO1xuICAgICAgICAgIF9fcHJpdmF0ZUdldCh0aGlzLCBfaGVscGVyVmlldykuc2V0VWludDgocG9zKyssIHZhbHVlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSA1OlxuICAgICAgICAgIF9fcHJpdmF0ZUdldCh0aGlzLCBfaGVscGVyVmlldykuc2V0VWludDgocG9zKyssIDEgPDwgMyB8IHZhbHVlIC8gMiAqKiAzMiAmIDcpO1xuICAgICAgICAgIF9fcHJpdmF0ZUdldCh0aGlzLCBfaGVscGVyVmlldykuc2V0VWludDgocG9zKyssIHZhbHVlID4+IDI0KTtcbiAgICAgICAgICBfX3ByaXZhdGVHZXQodGhpcywgX2hlbHBlclZpZXcpLnNldFVpbnQ4KHBvcysrLCB2YWx1ZSA+PiAxNik7XG4gICAgICAgICAgX19wcml2YXRlR2V0KHRoaXMsIF9oZWxwZXJWaWV3KS5zZXRVaW50OChwb3MrKywgdmFsdWUgPj4gOCk7XG4gICAgICAgICAgX19wcml2YXRlR2V0KHRoaXMsIF9oZWxwZXJWaWV3KS5zZXRVaW50OChwb3MrKywgdmFsdWUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDY6XG4gICAgICAgICAgX19wcml2YXRlR2V0KHRoaXMsIF9oZWxwZXJWaWV3KS5zZXRVaW50OChwb3MrKywgMSA8PCAyIHwgdmFsdWUgLyAyICoqIDQwICYgMyk7XG4gICAgICAgICAgX19wcml2YXRlR2V0KHRoaXMsIF9oZWxwZXJWaWV3KS5zZXRVaW50OChwb3MrKywgdmFsdWUgLyAyICoqIDMyIHwgMCk7XG4gICAgICAgICAgX19wcml2YXRlR2V0KHRoaXMsIF9oZWxwZXJWaWV3KS5zZXRVaW50OChwb3MrKywgdmFsdWUgPj4gMjQpO1xuICAgICAgICAgIF9fcHJpdmF0ZUdldCh0aGlzLCBfaGVscGVyVmlldykuc2V0VWludDgocG9zKyssIHZhbHVlID4+IDE2KTtcbiAgICAgICAgICBfX3ByaXZhdGVHZXQodGhpcywgX2hlbHBlclZpZXcpLnNldFVpbnQ4KHBvcysrLCB2YWx1ZSA+PiA4KTtcbiAgICAgICAgICBfX3ByaXZhdGVHZXQodGhpcywgX2hlbHBlclZpZXcpLnNldFVpbnQ4KHBvcysrLCB2YWx1ZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQmFkIEVCTUwgVklOVCBzaXplIFwiICsgd2lkdGgpO1xuICAgICAgfVxuICAgICAgdGhpcy53cml0ZShfX3ByaXZhdGVHZXQodGhpcywgX2hlbHBlcikuc3ViYXJyYXkoMCwgcG9zKSk7XG4gICAgfVxuICAgIHdyaXRlRUJNTChkYXRhKSB7XG4gICAgICBpZiAoZGF0YSA9PT0gbnVsbClcbiAgICAgICAgcmV0dXJuO1xuICAgICAgaWYgKGRhdGEgaW5zdGFuY2VvZiBVaW50OEFycmF5KSB7XG4gICAgICAgIHRoaXMud3JpdGUoZGF0YSk7XG4gICAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoZGF0YSkpIHtcbiAgICAgICAgZm9yIChsZXQgZWxlbSBvZiBkYXRhKSB7XG4gICAgICAgICAgdGhpcy53cml0ZUVCTUwoZWxlbSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMub2Zmc2V0cy5zZXQoZGF0YSwgdGhpcy5wb3MpO1xuICAgICAgICBfX3ByaXZhdGVNZXRob2QodGhpcywgX3dyaXRlVW5zaWduZWRJbnQsIHdyaXRlVW5zaWduZWRJbnRfZm4pLmNhbGwodGhpcywgZGF0YS5pZCk7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGRhdGEuZGF0YSkpIHtcbiAgICAgICAgICBsZXQgc2l6ZVBvcyA9IHRoaXMucG9zO1xuICAgICAgICAgIGxldCBzaXplU2l6ZSA9IGRhdGEuc2l6ZSA9PT0gLTEgPyAxIDogZGF0YS5zaXplID8/IDQ7XG4gICAgICAgICAgaWYgKGRhdGEuc2l6ZSA9PT0gLTEpIHtcbiAgICAgICAgICAgIF9fcHJpdmF0ZU1ldGhvZCh0aGlzLCBfd3JpdGVCeXRlLCB3cml0ZUJ5dGVfZm4pLmNhbGwodGhpcywgMjU1KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZWVrKHRoaXMucG9zICsgc2l6ZVNpemUpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBsZXQgc3RhcnRQb3MgPSB0aGlzLnBvcztcbiAgICAgICAgICB0aGlzLmRhdGFPZmZzZXRzLnNldChkYXRhLCBzdGFydFBvcyk7XG4gICAgICAgICAgdGhpcy53cml0ZUVCTUwoZGF0YS5kYXRhKTtcbiAgICAgICAgICBpZiAoZGF0YS5zaXplICE9PSAtMSkge1xuICAgICAgICAgICAgbGV0IHNpemUgPSB0aGlzLnBvcyAtIHN0YXJ0UG9zO1xuICAgICAgICAgICAgbGV0IGVuZFBvcyA9IHRoaXMucG9zO1xuICAgICAgICAgICAgdGhpcy5zZWVrKHNpemVQb3MpO1xuICAgICAgICAgICAgdGhpcy53cml0ZUVCTUxWYXJJbnQoc2l6ZSwgc2l6ZVNpemUpO1xuICAgICAgICAgICAgdGhpcy5zZWVrKGVuZFBvcyk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBkYXRhLmRhdGEgPT09IFwibnVtYmVyXCIpIHtcbiAgICAgICAgICBsZXQgc2l6ZSA9IGRhdGEuc2l6ZSA/PyBtZWFzdXJlVW5zaWduZWRJbnQoZGF0YS5kYXRhKTtcbiAgICAgICAgICB0aGlzLndyaXRlRUJNTFZhckludChzaXplKTtcbiAgICAgICAgICBfX3ByaXZhdGVNZXRob2QodGhpcywgX3dyaXRlVW5zaWduZWRJbnQsIHdyaXRlVW5zaWduZWRJbnRfZm4pLmNhbGwodGhpcywgZGF0YS5kYXRhLCBzaXplKTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgZGF0YS5kYXRhID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgdGhpcy53cml0ZUVCTUxWYXJJbnQoZGF0YS5kYXRhLmxlbmd0aCk7XG4gICAgICAgICAgX19wcml2YXRlTWV0aG9kKHRoaXMsIF93cml0ZVN0cmluZywgd3JpdGVTdHJpbmdfZm4pLmNhbGwodGhpcywgZGF0YS5kYXRhKTtcbiAgICAgICAgfSBlbHNlIGlmIChkYXRhLmRhdGEgaW5zdGFuY2VvZiBVaW50OEFycmF5KSB7XG4gICAgICAgICAgdGhpcy53cml0ZUVCTUxWYXJJbnQoZGF0YS5kYXRhLmJ5dGVMZW5ndGgsIGRhdGEuc2l6ZSk7XG4gICAgICAgICAgdGhpcy53cml0ZShkYXRhLmRhdGEpO1xuICAgICAgICB9IGVsc2UgaWYgKGRhdGEuZGF0YSBpbnN0YW5jZW9mIEVCTUxGbG9hdDMyKSB7XG4gICAgICAgICAgdGhpcy53cml0ZUVCTUxWYXJJbnQoNCk7XG4gICAgICAgICAgX19wcml2YXRlTWV0aG9kKHRoaXMsIF93cml0ZUZsb2F0MzIsIHdyaXRlRmxvYXQzMl9mbikuY2FsbCh0aGlzLCBkYXRhLmRhdGEudmFsdWUpO1xuICAgICAgICB9IGVsc2UgaWYgKGRhdGEuZGF0YSBpbnN0YW5jZW9mIEVCTUxGbG9hdDY0KSB7XG4gICAgICAgICAgdGhpcy53cml0ZUVCTUxWYXJJbnQoOCk7XG4gICAgICAgICAgX19wcml2YXRlTWV0aG9kKHRoaXMsIF93cml0ZUZsb2F0NjQsIHdyaXRlRmxvYXQ2NF9mbikuY2FsbCh0aGlzLCBkYXRhLmRhdGEudmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9O1xuICBfaGVscGVyID0gbmV3IFdlYWtNYXAoKTtcbiAgX2hlbHBlclZpZXcgPSBuZXcgV2Vha01hcCgpO1xuICBfd3JpdGVCeXRlID0gbmV3IFdlYWtTZXQoKTtcbiAgd3JpdGVCeXRlX2ZuID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICBfX3ByaXZhdGVHZXQodGhpcywgX2hlbHBlclZpZXcpLnNldFVpbnQ4KDAsIHZhbHVlKTtcbiAgICB0aGlzLndyaXRlKF9fcHJpdmF0ZUdldCh0aGlzLCBfaGVscGVyKS5zdWJhcnJheSgwLCAxKSk7XG4gIH07XG4gIF93cml0ZUZsb2F0MzIgPSBuZXcgV2Vha1NldCgpO1xuICB3cml0ZUZsb2F0MzJfZm4gPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgIF9fcHJpdmF0ZUdldCh0aGlzLCBfaGVscGVyVmlldykuc2V0RmxvYXQzMigwLCB2YWx1ZSwgZmFsc2UpO1xuICAgIHRoaXMud3JpdGUoX19wcml2YXRlR2V0KHRoaXMsIF9oZWxwZXIpLnN1YmFycmF5KDAsIDQpKTtcbiAgfTtcbiAgX3dyaXRlRmxvYXQ2NCA9IG5ldyBXZWFrU2V0KCk7XG4gIHdyaXRlRmxvYXQ2NF9mbiA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgX19wcml2YXRlR2V0KHRoaXMsIF9oZWxwZXJWaWV3KS5zZXRGbG9hdDY0KDAsIHZhbHVlLCBmYWxzZSk7XG4gICAgdGhpcy53cml0ZShfX3ByaXZhdGVHZXQodGhpcywgX2hlbHBlcikpO1xuICB9O1xuICBfd3JpdGVVbnNpZ25lZEludCA9IG5ldyBXZWFrU2V0KCk7XG4gIHdyaXRlVW5zaWduZWRJbnRfZm4gPSBmdW5jdGlvbih2YWx1ZSwgd2lkdGggPSBtZWFzdXJlVW5zaWduZWRJbnQodmFsdWUpKSB7XG4gICAgbGV0IHBvcyA9IDA7XG4gICAgc3dpdGNoICh3aWR0aCkge1xuICAgICAgY2FzZSA2OlxuICAgICAgICBfX3ByaXZhdGVHZXQodGhpcywgX2hlbHBlclZpZXcpLnNldFVpbnQ4KHBvcysrLCB2YWx1ZSAvIDIgKiogNDAgfCAwKTtcbiAgICAgIGNhc2UgNTpcbiAgICAgICAgX19wcml2YXRlR2V0KHRoaXMsIF9oZWxwZXJWaWV3KS5zZXRVaW50OChwb3MrKywgdmFsdWUgLyAyICoqIDMyIHwgMCk7XG4gICAgICBjYXNlIDQ6XG4gICAgICAgIF9fcHJpdmF0ZUdldCh0aGlzLCBfaGVscGVyVmlldykuc2V0VWludDgocG9zKyssIHZhbHVlID4+IDI0KTtcbiAgICAgIGNhc2UgMzpcbiAgICAgICAgX19wcml2YXRlR2V0KHRoaXMsIF9oZWxwZXJWaWV3KS5zZXRVaW50OChwb3MrKywgdmFsdWUgPj4gMTYpO1xuICAgICAgY2FzZSAyOlxuICAgICAgICBfX3ByaXZhdGVHZXQodGhpcywgX2hlbHBlclZpZXcpLnNldFVpbnQ4KHBvcysrLCB2YWx1ZSA+PiA4KTtcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgX19wcml2YXRlR2V0KHRoaXMsIF9oZWxwZXJWaWV3KS5zZXRVaW50OChwb3MrKywgdmFsdWUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkJhZCBVSU5UIHNpemUgXCIgKyB3aWR0aCk7XG4gICAgfVxuICAgIHRoaXMud3JpdGUoX19wcml2YXRlR2V0KHRoaXMsIF9oZWxwZXIpLnN1YmFycmF5KDAsIHBvcykpO1xuICB9O1xuICBfd3JpdGVTdHJpbmcgPSBuZXcgV2Vha1NldCgpO1xuICB3cml0ZVN0cmluZ19mbiA9IGZ1bmN0aW9uKHN0cikge1xuICAgIHRoaXMud3JpdGUobmV3IFVpbnQ4QXJyYXkoc3RyLnNwbGl0KFwiXCIpLm1hcCgoeCkgPT4geC5jaGFyQ29kZUF0KDApKSkpO1xuICB9O1xuICB2YXIgX3RhcmdldCwgX2J1ZmZlciwgX2J5dGVzLCBfZW5zdXJlU2l6ZSwgZW5zdXJlU2l6ZV9mbjtcbiAgdmFyIEFycmF5QnVmZmVyVGFyZ2V0V3JpdGVyID0gY2xhc3MgZXh0ZW5kcyBXcml0ZXIge1xuICAgIGNvbnN0cnVjdG9yKHRhcmdldCkge1xuICAgICAgc3VwZXIoKTtcbiAgICAgIF9fcHJpdmF0ZUFkZCh0aGlzLCBfZW5zdXJlU2l6ZSk7XG4gICAgICBfX3ByaXZhdGVBZGQodGhpcywgX3RhcmdldCwgdm9pZCAwKTtcbiAgICAgIF9fcHJpdmF0ZUFkZCh0aGlzLCBfYnVmZmVyLCBuZXcgQXJyYXlCdWZmZXIoMiAqKiAxNikpO1xuICAgICAgX19wcml2YXRlQWRkKHRoaXMsIF9ieXRlcywgbmV3IFVpbnQ4QXJyYXkoX19wcml2YXRlR2V0KHRoaXMsIF9idWZmZXIpKSk7XG4gICAgICBfX3ByaXZhdGVTZXQodGhpcywgX3RhcmdldCwgdGFyZ2V0KTtcbiAgICB9XG4gICAgd3JpdGUoZGF0YSkge1xuICAgICAgX19wcml2YXRlTWV0aG9kKHRoaXMsIF9lbnN1cmVTaXplLCBlbnN1cmVTaXplX2ZuKS5jYWxsKHRoaXMsIHRoaXMucG9zICsgZGF0YS5ieXRlTGVuZ3RoKTtcbiAgICAgIF9fcHJpdmF0ZUdldCh0aGlzLCBfYnl0ZXMpLnNldChkYXRhLCB0aGlzLnBvcyk7XG4gICAgICB0aGlzLnBvcyArPSBkYXRhLmJ5dGVMZW5ndGg7XG4gICAgfVxuICAgIGZpbmFsaXplKCkge1xuICAgICAgX19wcml2YXRlTWV0aG9kKHRoaXMsIF9lbnN1cmVTaXplLCBlbnN1cmVTaXplX2ZuKS5jYWxsKHRoaXMsIHRoaXMucG9zKTtcbiAgICAgIF9fcHJpdmF0ZUdldCh0aGlzLCBfdGFyZ2V0KS5idWZmZXIgPSBfX3ByaXZhdGVHZXQodGhpcywgX2J1ZmZlcikuc2xpY2UoMCwgdGhpcy5wb3MpO1xuICAgIH1cbiAgfTtcbiAgX3RhcmdldCA9IG5ldyBXZWFrTWFwKCk7XG4gIF9idWZmZXIgPSBuZXcgV2Vha01hcCgpO1xuICBfYnl0ZXMgPSBuZXcgV2Vha01hcCgpO1xuICBfZW5zdXJlU2l6ZSA9IG5ldyBXZWFrU2V0KCk7XG4gIGVuc3VyZVNpemVfZm4gPSBmdW5jdGlvbihzaXplKSB7XG4gICAgbGV0IG5ld0xlbmd0aCA9IF9fcHJpdmF0ZUdldCh0aGlzLCBfYnVmZmVyKS5ieXRlTGVuZ3RoO1xuICAgIHdoaWxlIChuZXdMZW5ndGggPCBzaXplKVxuICAgICAgbmV3TGVuZ3RoICo9IDI7XG4gICAgaWYgKG5ld0xlbmd0aCA9PT0gX19wcml2YXRlR2V0KHRoaXMsIF9idWZmZXIpLmJ5dGVMZW5ndGgpXG4gICAgICByZXR1cm47XG4gICAgbGV0IG5ld0J1ZmZlciA9IG5ldyBBcnJheUJ1ZmZlcihuZXdMZW5ndGgpO1xuICAgIGxldCBuZXdCeXRlcyA9IG5ldyBVaW50OEFycmF5KG5ld0J1ZmZlcik7XG4gICAgbmV3Qnl0ZXMuc2V0KF9fcHJpdmF0ZUdldCh0aGlzLCBfYnl0ZXMpLCAwKTtcbiAgICBfX3ByaXZhdGVTZXQodGhpcywgX2J1ZmZlciwgbmV3QnVmZmVyKTtcbiAgICBfX3ByaXZhdGVTZXQodGhpcywgX2J5dGVzLCBuZXdCeXRlcyk7XG4gIH07XG4gIHZhciBfdHJhY2tpbmdXcml0ZXMsIF90cmFja2VkV3JpdGVzLCBfdHJhY2tlZFN0YXJ0LCBfdHJhY2tlZEVuZDtcbiAgdmFyIEJhc2VTdHJlYW1UYXJnZXRXcml0ZXIgPSBjbGFzcyBleHRlbmRzIFdyaXRlciB7XG4gICAgY29uc3RydWN0b3IodGFyZ2V0KSB7XG4gICAgICBzdXBlcigpO1xuICAgICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XG4gICAgICBfX3ByaXZhdGVBZGQodGhpcywgX3RyYWNraW5nV3JpdGVzLCBmYWxzZSk7XG4gICAgICBfX3ByaXZhdGVBZGQodGhpcywgX3RyYWNrZWRXcml0ZXMsIHZvaWQgMCk7XG4gICAgICBfX3ByaXZhdGVBZGQodGhpcywgX3RyYWNrZWRTdGFydCwgdm9pZCAwKTtcbiAgICAgIF9fcHJpdmF0ZUFkZCh0aGlzLCBfdHJhY2tlZEVuZCwgdm9pZCAwKTtcbiAgICB9XG4gICAgd3JpdGUoZGF0YSkge1xuICAgICAgaWYgKCFfX3ByaXZhdGVHZXQodGhpcywgX3RyYWNraW5nV3JpdGVzKSlcbiAgICAgICAgcmV0dXJuO1xuICAgICAgbGV0IHBvcyA9IHRoaXMucG9zO1xuICAgICAgaWYgKHBvcyA8IF9fcHJpdmF0ZUdldCh0aGlzLCBfdHJhY2tlZFN0YXJ0KSkge1xuICAgICAgICBpZiAocG9zICsgZGF0YS5ieXRlTGVuZ3RoIDw9IF9fcHJpdmF0ZUdldCh0aGlzLCBfdHJhY2tlZFN0YXJ0KSlcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIGRhdGEgPSBkYXRhLnN1YmFycmF5KF9fcHJpdmF0ZUdldCh0aGlzLCBfdHJhY2tlZFN0YXJ0KSAtIHBvcyk7XG4gICAgICAgIHBvcyA9IDA7XG4gICAgICB9XG4gICAgICBsZXQgbmVlZGVkU2l6ZSA9IHBvcyArIGRhdGEuYnl0ZUxlbmd0aCAtIF9fcHJpdmF0ZUdldCh0aGlzLCBfdHJhY2tlZFN0YXJ0KTtcbiAgICAgIGxldCBuZXdMZW5ndGggPSBfX3ByaXZhdGVHZXQodGhpcywgX3RyYWNrZWRXcml0ZXMpLmJ5dGVMZW5ndGg7XG4gICAgICB3aGlsZSAobmV3TGVuZ3RoIDwgbmVlZGVkU2l6ZSlcbiAgICAgICAgbmV3TGVuZ3RoICo9IDI7XG4gICAgICBpZiAobmV3TGVuZ3RoICE9PSBfX3ByaXZhdGVHZXQodGhpcywgX3RyYWNrZWRXcml0ZXMpLmJ5dGVMZW5ndGgpIHtcbiAgICAgICAgbGV0IGNvcHkgPSBuZXcgVWludDhBcnJheShuZXdMZW5ndGgpO1xuICAgICAgICBjb3B5LnNldChfX3ByaXZhdGVHZXQodGhpcywgX3RyYWNrZWRXcml0ZXMpLCAwKTtcbiAgICAgICAgX19wcml2YXRlU2V0KHRoaXMsIF90cmFja2VkV3JpdGVzLCBjb3B5KTtcbiAgICAgIH1cbiAgICAgIF9fcHJpdmF0ZUdldCh0aGlzLCBfdHJhY2tlZFdyaXRlcykuc2V0KGRhdGEsIHBvcyAtIF9fcHJpdmF0ZUdldCh0aGlzLCBfdHJhY2tlZFN0YXJ0KSk7XG4gICAgICBfX3ByaXZhdGVTZXQodGhpcywgX3RyYWNrZWRFbmQsIE1hdGgubWF4KF9fcHJpdmF0ZUdldCh0aGlzLCBfdHJhY2tlZEVuZCksIHBvcyArIGRhdGEuYnl0ZUxlbmd0aCkpO1xuICAgIH1cbiAgICBzdGFydFRyYWNraW5nV3JpdGVzKCkge1xuICAgICAgX19wcml2YXRlU2V0KHRoaXMsIF90cmFja2luZ1dyaXRlcywgdHJ1ZSk7XG4gICAgICBfX3ByaXZhdGVTZXQodGhpcywgX3RyYWNrZWRXcml0ZXMsIG5ldyBVaW50OEFycmF5KDIgKiogMTApKTtcbiAgICAgIF9fcHJpdmF0ZVNldCh0aGlzLCBfdHJhY2tlZFN0YXJ0LCB0aGlzLnBvcyk7XG4gICAgICBfX3ByaXZhdGVTZXQodGhpcywgX3RyYWNrZWRFbmQsIHRoaXMucG9zKTtcbiAgICB9XG4gICAgZ2V0VHJhY2tlZFdyaXRlcygpIHtcbiAgICAgIGlmICghX19wcml2YXRlR2V0KHRoaXMsIF90cmFja2luZ1dyaXRlcykpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2FuJ3QgZ2V0IHRyYWNrZWQgd3JpdGVzIHNpbmNlIG5vdGhpbmcgd2FzIHRyYWNrZWQuXCIpO1xuICAgICAgfVxuICAgICAgbGV0IHNsaWNlID0gX19wcml2YXRlR2V0KHRoaXMsIF90cmFja2VkV3JpdGVzKS5zdWJhcnJheSgwLCBfX3ByaXZhdGVHZXQodGhpcywgX3RyYWNrZWRFbmQpIC0gX19wcml2YXRlR2V0KHRoaXMsIF90cmFja2VkU3RhcnQpKTtcbiAgICAgIGxldCByZXN1bHQgPSB7XG4gICAgICAgIGRhdGE6IHNsaWNlLFxuICAgICAgICBzdGFydDogX19wcml2YXRlR2V0KHRoaXMsIF90cmFja2VkU3RhcnQpLFxuICAgICAgICBlbmQ6IF9fcHJpdmF0ZUdldCh0aGlzLCBfdHJhY2tlZEVuZClcbiAgICAgIH07XG4gICAgICBfX3ByaXZhdGVTZXQodGhpcywgX3RyYWNrZWRXcml0ZXMsIHZvaWQgMCk7XG4gICAgICBfX3ByaXZhdGVTZXQodGhpcywgX3RyYWNraW5nV3JpdGVzLCBmYWxzZSk7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgfTtcbiAgX3RyYWNraW5nV3JpdGVzID0gbmV3IFdlYWtNYXAoKTtcbiAgX3RyYWNrZWRXcml0ZXMgPSBuZXcgV2Vha01hcCgpO1xuICBfdHJhY2tlZFN0YXJ0ID0gbmV3IFdlYWtNYXAoKTtcbiAgX3RyYWNrZWRFbmQgPSBuZXcgV2Vha01hcCgpO1xuICB2YXIgREVGQVVMVF9DSFVOS19TSVpFID0gMiAqKiAyNDtcbiAgdmFyIE1BWF9DSFVOS1NfQVRfT05DRSA9IDI7XG4gIHZhciBfc2VjdGlvbnMsIF9sYXN0Rmx1c2hFbmQsIF9lbnN1cmVNb25vdG9uaWNpdHksIF9jaHVua2VkLCBfY2h1bmtTaXplLCBfY2h1bmtzLCBfd3JpdGVEYXRhSW50b0NodW5rcywgd3JpdGVEYXRhSW50b0NodW5rc19mbiwgX2luc2VydFNlY3Rpb25JbnRvQ2h1bmssIGluc2VydFNlY3Rpb25JbnRvQ2h1bmtfZm4sIF9jcmVhdGVDaHVuaywgY3JlYXRlQ2h1bmtfZm4sIF9mbHVzaENodW5rcywgZmx1c2hDaHVua3NfZm47XG4gIHZhciBTdHJlYW1UYXJnZXRXcml0ZXIgPSBjbGFzcyBleHRlbmRzIEJhc2VTdHJlYW1UYXJnZXRXcml0ZXIge1xuICAgIGNvbnN0cnVjdG9yKHRhcmdldCwgZW5zdXJlTW9ub3RvbmljaXR5KSB7XG4gICAgICBzdXBlcih0YXJnZXQpO1xuICAgICAgX19wcml2YXRlQWRkKHRoaXMsIF93cml0ZURhdGFJbnRvQ2h1bmtzKTtcbiAgICAgIF9fcHJpdmF0ZUFkZCh0aGlzLCBfaW5zZXJ0U2VjdGlvbkludG9DaHVuayk7XG4gICAgICBfX3ByaXZhdGVBZGQodGhpcywgX2NyZWF0ZUNodW5rKTtcbiAgICAgIF9fcHJpdmF0ZUFkZCh0aGlzLCBfZmx1c2hDaHVua3MpO1xuICAgICAgX19wcml2YXRlQWRkKHRoaXMsIF9zZWN0aW9ucywgW10pO1xuICAgICAgX19wcml2YXRlQWRkKHRoaXMsIF9sYXN0Rmx1c2hFbmQsIDApO1xuICAgICAgX19wcml2YXRlQWRkKHRoaXMsIF9lbnN1cmVNb25vdG9uaWNpdHksIHZvaWQgMCk7XG4gICAgICBfX3ByaXZhdGVBZGQodGhpcywgX2NodW5rZWQsIHZvaWQgMCk7XG4gICAgICBfX3ByaXZhdGVBZGQodGhpcywgX2NodW5rU2l6ZSwgdm9pZCAwKTtcbiAgICAgIF9fcHJpdmF0ZUFkZCh0aGlzLCBfY2h1bmtzLCBbXSk7XG4gICAgICBfX3ByaXZhdGVTZXQodGhpcywgX2Vuc3VyZU1vbm90b25pY2l0eSwgZW5zdXJlTW9ub3RvbmljaXR5KTtcbiAgICAgIF9fcHJpdmF0ZVNldCh0aGlzLCBfY2h1bmtlZCwgdGFyZ2V0Lm9wdGlvbnM/LmNodW5rZWQgPz8gZmFsc2UpO1xuICAgICAgX19wcml2YXRlU2V0KHRoaXMsIF9jaHVua1NpemUsIHRhcmdldC5vcHRpb25zPy5jaHVua1NpemUgPz8gREVGQVVMVF9DSFVOS19TSVpFKTtcbiAgICB9XG4gICAgd3JpdGUoZGF0YSkge1xuICAgICAgc3VwZXIud3JpdGUoZGF0YSk7XG4gICAgICBfX3ByaXZhdGVHZXQodGhpcywgX3NlY3Rpb25zKS5wdXNoKHtcbiAgICAgICAgZGF0YTogZGF0YS5zbGljZSgpLFxuICAgICAgICBzdGFydDogdGhpcy5wb3NcbiAgICAgIH0pO1xuICAgICAgdGhpcy5wb3MgKz0gZGF0YS5ieXRlTGVuZ3RoO1xuICAgIH1cbiAgICBmbHVzaCgpIHtcbiAgICAgIGlmIChfX3ByaXZhdGVHZXQodGhpcywgX3NlY3Rpb25zKS5sZW5ndGggPT09IDApXG4gICAgICAgIHJldHVybjtcbiAgICAgIGxldCBjaHVua3MgPSBbXTtcbiAgICAgIGxldCBzb3J0ZWQgPSBbLi4uX19wcml2YXRlR2V0KHRoaXMsIF9zZWN0aW9ucyldLnNvcnQoKGEsIGIpID0+IGEuc3RhcnQgLSBiLnN0YXJ0KTtcbiAgICAgIGNodW5rcy5wdXNoKHtcbiAgICAgICAgc3RhcnQ6IHNvcnRlZFswXS5zdGFydCxcbiAgICAgICAgc2l6ZTogc29ydGVkWzBdLmRhdGEuYnl0ZUxlbmd0aFxuICAgICAgfSk7XG4gICAgICBmb3IgKGxldCBpID0gMTsgaSA8IHNvcnRlZC5sZW5ndGg7IGkrKykge1xuICAgICAgICBsZXQgbGFzdENodW5rID0gY2h1bmtzW2NodW5rcy5sZW5ndGggLSAxXTtcbiAgICAgICAgbGV0IHNlY3Rpb24gPSBzb3J0ZWRbaV07XG4gICAgICAgIGlmIChzZWN0aW9uLnN0YXJ0IDw9IGxhc3RDaHVuay5zdGFydCArIGxhc3RDaHVuay5zaXplKSB7XG4gICAgICAgICAgbGFzdENodW5rLnNpemUgPSBNYXRoLm1heChsYXN0Q2h1bmsuc2l6ZSwgc2VjdGlvbi5zdGFydCArIHNlY3Rpb24uZGF0YS5ieXRlTGVuZ3RoIC0gbGFzdENodW5rLnN0YXJ0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjaHVua3MucHVzaCh7XG4gICAgICAgICAgICBzdGFydDogc2VjdGlvbi5zdGFydCxcbiAgICAgICAgICAgIHNpemU6IHNlY3Rpb24uZGF0YS5ieXRlTGVuZ3RoXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGZvciAobGV0IGNodW5rIG9mIGNodW5rcykge1xuICAgICAgICBjaHVuay5kYXRhID0gbmV3IFVpbnQ4QXJyYXkoY2h1bmsuc2l6ZSk7XG4gICAgICAgIGZvciAobGV0IHNlY3Rpb24gb2YgX19wcml2YXRlR2V0KHRoaXMsIF9zZWN0aW9ucykpIHtcbiAgICAgICAgICBpZiAoY2h1bmsuc3RhcnQgPD0gc2VjdGlvbi5zdGFydCAmJiBzZWN0aW9uLnN0YXJ0IDwgY2h1bmsuc3RhcnQgKyBjaHVuay5zaXplKSB7XG4gICAgICAgICAgICBjaHVuay5kYXRhLnNldChzZWN0aW9uLmRhdGEsIHNlY3Rpb24uc3RhcnQgLSBjaHVuay5zdGFydCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChfX3ByaXZhdGVHZXQodGhpcywgX2NodW5rZWQpKSB7XG4gICAgICAgICAgX19wcml2YXRlTWV0aG9kKHRoaXMsIF93cml0ZURhdGFJbnRvQ2h1bmtzLCB3cml0ZURhdGFJbnRvQ2h1bmtzX2ZuKS5jYWxsKHRoaXMsIGNodW5rLmRhdGEsIGNodW5rLnN0YXJ0KTtcbiAgICAgICAgICBfX3ByaXZhdGVNZXRob2QodGhpcywgX2ZsdXNoQ2h1bmtzLCBmbHVzaENodW5rc19mbikuY2FsbCh0aGlzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoX19wcml2YXRlR2V0KHRoaXMsIF9lbnN1cmVNb25vdG9uaWNpdHkpICYmIGNodW5rLnN0YXJ0IDwgX19wcml2YXRlR2V0KHRoaXMsIF9sYXN0Rmx1c2hFbmQpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnRlcm5hbCBlcnJvcjogTW9ub3RvbmljaXR5IHZpb2xhdGlvbi5cIik7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMudGFyZ2V0Lm9wdGlvbnMub25EYXRhPy4oY2h1bmsuZGF0YSwgY2h1bmsuc3RhcnQpO1xuICAgICAgICAgIF9fcHJpdmF0ZVNldCh0aGlzLCBfbGFzdEZsdXNoRW5kLCBjaHVuay5zdGFydCArIGNodW5rLmRhdGEuYnl0ZUxlbmd0aCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIF9fcHJpdmF0ZUdldCh0aGlzLCBfc2VjdGlvbnMpLmxlbmd0aCA9IDA7XG4gICAgfVxuICAgIGZpbmFsaXplKCkge1xuICAgICAgaWYgKF9fcHJpdmF0ZUdldCh0aGlzLCBfY2h1bmtlZCkpIHtcbiAgICAgICAgX19wcml2YXRlTWV0aG9kKHRoaXMsIF9mbHVzaENodW5rcywgZmx1c2hDaHVua3NfZm4pLmNhbGwodGhpcywgdHJ1ZSk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuICBfc2VjdGlvbnMgPSBuZXcgV2Vha01hcCgpO1xuICBfbGFzdEZsdXNoRW5kID0gbmV3IFdlYWtNYXAoKTtcbiAgX2Vuc3VyZU1vbm90b25pY2l0eSA9IG5ldyBXZWFrTWFwKCk7XG4gIF9jaHVua2VkID0gbmV3IFdlYWtNYXAoKTtcbiAgX2NodW5rU2l6ZSA9IG5ldyBXZWFrTWFwKCk7XG4gIF9jaHVua3MgPSBuZXcgV2Vha01hcCgpO1xuICBfd3JpdGVEYXRhSW50b0NodW5rcyA9IG5ldyBXZWFrU2V0KCk7XG4gIHdyaXRlRGF0YUludG9DaHVua3NfZm4gPSBmdW5jdGlvbihkYXRhLCBwb3NpdGlvbikge1xuICAgIGxldCBjaHVua0luZGV4ID0gX19wcml2YXRlR2V0KHRoaXMsIF9jaHVua3MpLmZpbmRJbmRleCgoeCkgPT4geC5zdGFydCA8PSBwb3NpdGlvbiAmJiBwb3NpdGlvbiA8IHguc3RhcnQgKyBfX3ByaXZhdGVHZXQodGhpcywgX2NodW5rU2l6ZSkpO1xuICAgIGlmIChjaHVua0luZGV4ID09PSAtMSlcbiAgICAgIGNodW5rSW5kZXggPSBfX3ByaXZhdGVNZXRob2QodGhpcywgX2NyZWF0ZUNodW5rLCBjcmVhdGVDaHVua19mbikuY2FsbCh0aGlzLCBwb3NpdGlvbik7XG4gICAgbGV0IGNodW5rID0gX19wcml2YXRlR2V0KHRoaXMsIF9jaHVua3MpW2NodW5rSW5kZXhdO1xuICAgIGxldCByZWxhdGl2ZVBvc2l0aW9uID0gcG9zaXRpb24gLSBjaHVuay5zdGFydDtcbiAgICBsZXQgdG9Xcml0ZSA9IGRhdGEuc3ViYXJyYXkoMCwgTWF0aC5taW4oX19wcml2YXRlR2V0KHRoaXMsIF9jaHVua1NpemUpIC0gcmVsYXRpdmVQb3NpdGlvbiwgZGF0YS5ieXRlTGVuZ3RoKSk7XG4gICAgY2h1bmsuZGF0YS5zZXQodG9Xcml0ZSwgcmVsYXRpdmVQb3NpdGlvbik7XG4gICAgbGV0IHNlY3Rpb24gPSB7XG4gICAgICBzdGFydDogcmVsYXRpdmVQb3NpdGlvbixcbiAgICAgIGVuZDogcmVsYXRpdmVQb3NpdGlvbiArIHRvV3JpdGUuYnl0ZUxlbmd0aFxuICAgIH07XG4gICAgX19wcml2YXRlTWV0aG9kKHRoaXMsIF9pbnNlcnRTZWN0aW9uSW50b0NodW5rLCBpbnNlcnRTZWN0aW9uSW50b0NodW5rX2ZuKS5jYWxsKHRoaXMsIGNodW5rLCBzZWN0aW9uKTtcbiAgICBpZiAoY2h1bmsud3JpdHRlblswXS5zdGFydCA9PT0gMCAmJiBjaHVuay53cml0dGVuWzBdLmVuZCA9PT0gX19wcml2YXRlR2V0KHRoaXMsIF9jaHVua1NpemUpKSB7XG4gICAgICBjaHVuay5zaG91bGRGbHVzaCA9IHRydWU7XG4gICAgfVxuICAgIGlmIChfX3ByaXZhdGVHZXQodGhpcywgX2NodW5rcykubGVuZ3RoID4gTUFYX0NIVU5LU19BVF9PTkNFKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IF9fcHJpdmF0ZUdldCh0aGlzLCBfY2h1bmtzKS5sZW5ndGggLSAxOyBpKyspIHtcbiAgICAgICAgX19wcml2YXRlR2V0KHRoaXMsIF9jaHVua3MpW2ldLnNob3VsZEZsdXNoID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIF9fcHJpdmF0ZU1ldGhvZCh0aGlzLCBfZmx1c2hDaHVua3MsIGZsdXNoQ2h1bmtzX2ZuKS5jYWxsKHRoaXMpO1xuICAgIH1cbiAgICBpZiAodG9Xcml0ZS5ieXRlTGVuZ3RoIDwgZGF0YS5ieXRlTGVuZ3RoKSB7XG4gICAgICBfX3ByaXZhdGVNZXRob2QodGhpcywgX3dyaXRlRGF0YUludG9DaHVua3MsIHdyaXRlRGF0YUludG9DaHVua3NfZm4pLmNhbGwodGhpcywgZGF0YS5zdWJhcnJheSh0b1dyaXRlLmJ5dGVMZW5ndGgpLCBwb3NpdGlvbiArIHRvV3JpdGUuYnl0ZUxlbmd0aCk7XG4gICAgfVxuICB9O1xuICBfaW5zZXJ0U2VjdGlvbkludG9DaHVuayA9IG5ldyBXZWFrU2V0KCk7XG4gIGluc2VydFNlY3Rpb25JbnRvQ2h1bmtfZm4gPSBmdW5jdGlvbihjaHVuaywgc2VjdGlvbikge1xuICAgIGxldCBsb3cgPSAwO1xuICAgIGxldCBoaWdoID0gY2h1bmsud3JpdHRlbi5sZW5ndGggLSAxO1xuICAgIGxldCBpbmRleCA9IC0xO1xuICAgIHdoaWxlIChsb3cgPD0gaGlnaCkge1xuICAgICAgbGV0IG1pZCA9IE1hdGguZmxvb3IobG93ICsgKGhpZ2ggLSBsb3cgKyAxKSAvIDIpO1xuICAgICAgaWYgKGNodW5rLndyaXR0ZW5bbWlkXS5zdGFydCA8PSBzZWN0aW9uLnN0YXJ0KSB7XG4gICAgICAgIGxvdyA9IG1pZCArIDE7XG4gICAgICAgIGluZGV4ID0gbWlkO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaGlnaCA9IG1pZCAtIDE7XG4gICAgICB9XG4gICAgfVxuICAgIGNodW5rLndyaXR0ZW4uc3BsaWNlKGluZGV4ICsgMSwgMCwgc2VjdGlvbik7XG4gICAgaWYgKGluZGV4ID09PSAtMSB8fCBjaHVuay53cml0dGVuW2luZGV4XS5lbmQgPCBzZWN0aW9uLnN0YXJ0KVxuICAgICAgaW5kZXgrKztcbiAgICB3aGlsZSAoaW5kZXggPCBjaHVuay53cml0dGVuLmxlbmd0aCAtIDEgJiYgY2h1bmsud3JpdHRlbltpbmRleF0uZW5kID49IGNodW5rLndyaXR0ZW5baW5kZXggKyAxXS5zdGFydCkge1xuICAgICAgY2h1bmsud3JpdHRlbltpbmRleF0uZW5kID0gTWF0aC5tYXgoY2h1bmsud3JpdHRlbltpbmRleF0uZW5kLCBjaHVuay53cml0dGVuW2luZGV4ICsgMV0uZW5kKTtcbiAgICAgIGNodW5rLndyaXR0ZW4uc3BsaWNlKGluZGV4ICsgMSwgMSk7XG4gICAgfVxuICB9O1xuICBfY3JlYXRlQ2h1bmsgPSBuZXcgV2Vha1NldCgpO1xuICBjcmVhdGVDaHVua19mbiA9IGZ1bmN0aW9uKGluY2x1ZGVzUG9zaXRpb24pIHtcbiAgICBsZXQgc3RhcnQgPSBNYXRoLmZsb29yKGluY2x1ZGVzUG9zaXRpb24gLyBfX3ByaXZhdGVHZXQodGhpcywgX2NodW5rU2l6ZSkpICogX19wcml2YXRlR2V0KHRoaXMsIF9jaHVua1NpemUpO1xuICAgIGxldCBjaHVuayA9IHtcbiAgICAgIHN0YXJ0LFxuICAgICAgZGF0YTogbmV3IFVpbnQ4QXJyYXkoX19wcml2YXRlR2V0KHRoaXMsIF9jaHVua1NpemUpKSxcbiAgICAgIHdyaXR0ZW46IFtdLFxuICAgICAgc2hvdWxkRmx1c2g6IGZhbHNlXG4gICAgfTtcbiAgICBfX3ByaXZhdGVHZXQodGhpcywgX2NodW5rcykucHVzaChjaHVuayk7XG4gICAgX19wcml2YXRlR2V0KHRoaXMsIF9jaHVua3MpLnNvcnQoKGEsIGIpID0+IGEuc3RhcnQgLSBiLnN0YXJ0KTtcbiAgICByZXR1cm4gX19wcml2YXRlR2V0KHRoaXMsIF9jaHVua3MpLmluZGV4T2YoY2h1bmspO1xuICB9O1xuICBfZmx1c2hDaHVua3MgPSBuZXcgV2Vha1NldCgpO1xuICBmbHVzaENodW5rc19mbiA9IGZ1bmN0aW9uKGZvcmNlID0gZmFsc2UpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IF9fcHJpdmF0ZUdldCh0aGlzLCBfY2h1bmtzKS5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IGNodW5rID0gX19wcml2YXRlR2V0KHRoaXMsIF9jaHVua3MpW2ldO1xuICAgICAgaWYgKCFjaHVuay5zaG91bGRGbHVzaCAmJiAhZm9yY2UpXG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgZm9yIChsZXQgc2VjdGlvbiBvZiBjaHVuay53cml0dGVuKSB7XG4gICAgICAgIGlmIChfX3ByaXZhdGVHZXQodGhpcywgX2Vuc3VyZU1vbm90b25pY2l0eSkgJiYgY2h1bmsuc3RhcnQgKyBzZWN0aW9uLnN0YXJ0IDwgX19wcml2YXRlR2V0KHRoaXMsIF9sYXN0Rmx1c2hFbmQpKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW50ZXJuYWwgZXJyb3I6IE1vbm90b25pY2l0eSB2aW9sYXRpb24uXCIpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudGFyZ2V0Lm9wdGlvbnMub25EYXRhPy4oXG4gICAgICAgICAgY2h1bmsuZGF0YS5zdWJhcnJheShzZWN0aW9uLnN0YXJ0LCBzZWN0aW9uLmVuZCksXG4gICAgICAgICAgY2h1bmsuc3RhcnQgKyBzZWN0aW9uLnN0YXJ0XG4gICAgICAgICk7XG4gICAgICAgIF9fcHJpdmF0ZVNldCh0aGlzLCBfbGFzdEZsdXNoRW5kLCBjaHVuay5zdGFydCArIHNlY3Rpb24uZW5kKTtcbiAgICAgIH1cbiAgICAgIF9fcHJpdmF0ZUdldCh0aGlzLCBfY2h1bmtzKS5zcGxpY2UoaS0tLCAxKTtcbiAgICB9XG4gIH07XG4gIHZhciBGaWxlU3lzdGVtV3JpdGFibGVGaWxlU3RyZWFtVGFyZ2V0V3JpdGVyID0gY2xhc3MgZXh0ZW5kcyBTdHJlYW1UYXJnZXRXcml0ZXIge1xuICAgIGNvbnN0cnVjdG9yKHRhcmdldCwgZW5zdXJlTW9ub3RvbmljaXR5KSB7XG4gICAgICBzdXBlcihuZXcgU3RyZWFtVGFyZ2V0KHtcbiAgICAgICAgb25EYXRhOiAoZGF0YSwgcG9zaXRpb24pID0+IHRhcmdldC5zdHJlYW0ud3JpdGUoe1xuICAgICAgICAgIHR5cGU6IFwid3JpdGVcIixcbiAgICAgICAgICBkYXRhLFxuICAgICAgICAgIHBvc2l0aW9uXG4gICAgICAgIH0pLFxuICAgICAgICBjaHVua2VkOiB0cnVlLFxuICAgICAgICBjaHVua1NpemU6IHRhcmdldC5vcHRpb25zPy5jaHVua1NpemVcbiAgICAgIH0pLCBlbnN1cmVNb25vdG9uaWNpdHkpO1xuICAgIH1cbiAgfTtcblxuICAvLyBzcmMvbXV4ZXIudHNcbiAgdmFyIFZJREVPX1RSQUNLX05VTUJFUiA9IDE7XG4gIHZhciBBVURJT19UUkFDS19OVU1CRVIgPSAyO1xuICB2YXIgU1VCVElUTEVfVFJBQ0tfTlVNQkVSID0gMztcbiAgdmFyIFZJREVPX1RSQUNLX1RZUEUgPSAxO1xuICB2YXIgQVVESU9fVFJBQ0tfVFlQRSA9IDI7XG4gIHZhciBTVUJUSVRMRV9UUkFDS19UWVBFID0gMTc7XG4gIHZhciBNQVhfQ0hVTktfTEVOR1RIX01TID0gMiAqKiAxNTtcbiAgdmFyIENPREVDX1BSSVZBVEVfTUFYX1NJWkUgPSAyICoqIDEzO1xuICB2YXIgQVBQX05BTUUgPSBcImh0dHBzOi8vZ2l0aHViLmNvbS9WYW5pbGFneS93ZWJtLW11eGVyXCI7XG4gIHZhciBTRUdNRU5UX1NJWkVfQllURVMgPSA2O1xuICB2YXIgQ0xVU1RFUl9TSVpFX0JZVEVTID0gNTtcbiAgdmFyIEZJUlNUX1RJTUVTVEFNUF9CRUhBVklPUlMgPSBbXCJzdHJpY3RcIiwgXCJvZmZzZXRcIiwgXCJwZXJtaXNzaXZlXCJdO1xuICB2YXIgX29wdGlvbnMsIF93cml0ZXIsIF9zZWdtZW50LCBfc2VnbWVudEluZm8sIF9zZWVrSGVhZCwgX3RyYWNrc0VsZW1lbnQsIF9zZWdtZW50RHVyYXRpb24sIF9jb2xvdXJFbGVtZW50LCBfdmlkZW9Db2RlY1ByaXZhdGUsIF9hdWRpb0NvZGVjUHJpdmF0ZSwgX3N1YnRpdGxlQ29kZWNQcml2YXRlLCBfY3VlcywgX2N1cnJlbnRDbHVzdGVyLCBfY3VycmVudENsdXN0ZXJUaW1lc3RhbXAsIF9kdXJhdGlvbiwgX3ZpZGVvQ2h1bmtRdWV1ZSwgX2F1ZGlvQ2h1bmtRdWV1ZSwgX3N1YnRpdGxlQ2h1bmtRdWV1ZSwgX2ZpcnN0VmlkZW9UaW1lc3RhbXAsIF9maXJzdEF1ZGlvVGltZXN0YW1wLCBfbGFzdFZpZGVvVGltZXN0YW1wLCBfbGFzdEF1ZGlvVGltZXN0YW1wLCBfbGFzdFN1YnRpdGxlVGltZXN0YW1wLCBfY29sb3JTcGFjZSwgX2ZpbmFsaXplZCwgX3ZhbGlkYXRlT3B0aW9ucywgdmFsaWRhdGVPcHRpb25zX2ZuLCBfY3JlYXRlRmlsZUhlYWRlciwgY3JlYXRlRmlsZUhlYWRlcl9mbiwgX3dyaXRlRUJNTEhlYWRlciwgd3JpdGVFQk1MSGVhZGVyX2ZuLCBfY3JlYXRlQ29kZWNQcml2YXRlUGxhY2Vob2xkZXJzLCBjcmVhdGVDb2RlY1ByaXZhdGVQbGFjZWhvbGRlcnNfZm4sIF9jcmVhdGVDb2xvdXJFbGVtZW50LCBjcmVhdGVDb2xvdXJFbGVtZW50X2ZuLCBfY3JlYXRlU2Vla0hlYWQsIGNyZWF0ZVNlZWtIZWFkX2ZuLCBfY3JlYXRlU2VnbWVudEluZm8sIGNyZWF0ZVNlZ21lbnRJbmZvX2ZuLCBfY3JlYXRlVHJhY2tzLCBjcmVhdGVUcmFja3NfZm4sIF9jcmVhdGVTZWdtZW50LCBjcmVhdGVTZWdtZW50X2ZuLCBfY3JlYXRlQ3VlcywgY3JlYXRlQ3Vlc19mbiwgX21heWJlRmx1c2hTdHJlYW1pbmdUYXJnZXRXcml0ZXIsIG1heWJlRmx1c2hTdHJlYW1pbmdUYXJnZXRXcml0ZXJfZm4sIF9zZWdtZW50RGF0YU9mZnNldCwgc2VnbWVudERhdGFPZmZzZXRfZ2V0LCBfd3JpdGVWaWRlb0RlY29kZXJDb25maWcsIHdyaXRlVmlkZW9EZWNvZGVyQ29uZmlnX2ZuLCBfZml4VlA5Q29sb3JTcGFjZSwgZml4VlA5Q29sb3JTcGFjZV9mbiwgX3dyaXRlU3VidGl0bGVDaHVua3MsIHdyaXRlU3VidGl0bGVDaHVua3NfZm4sIF9jcmVhdGVJbnRlcm5hbENodW5rLCBjcmVhdGVJbnRlcm5hbENodW5rX2ZuLCBfdmFsaWRhdGVUaW1lc3RhbXAsIHZhbGlkYXRlVGltZXN0YW1wX2ZuLCBfd3JpdGVCbG9jaywgd3JpdGVCbG9ja19mbiwgX2NyZWF0ZUNvZGVjUHJpdmF0ZUVsZW1lbnQsIGNyZWF0ZUNvZGVjUHJpdmF0ZUVsZW1lbnRfZm4sIF93cml0ZUNvZGVjUHJpdmF0ZSwgd3JpdGVDb2RlY1ByaXZhdGVfZm4sIF9jcmVhdGVOZXdDbHVzdGVyLCBjcmVhdGVOZXdDbHVzdGVyX2ZuLCBfZmluYWxpemVDdXJyZW50Q2x1c3RlciwgZmluYWxpemVDdXJyZW50Q2x1c3Rlcl9mbiwgX2Vuc3VyZU5vdEZpbmFsaXplZCwgZW5zdXJlTm90RmluYWxpemVkX2ZuO1xuICB2YXIgTXV4ZXIgPSBjbGFzcyB7XG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgICAgX19wcml2YXRlQWRkKHRoaXMsIF92YWxpZGF0ZU9wdGlvbnMpO1xuICAgICAgX19wcml2YXRlQWRkKHRoaXMsIF9jcmVhdGVGaWxlSGVhZGVyKTtcbiAgICAgIF9fcHJpdmF0ZUFkZCh0aGlzLCBfd3JpdGVFQk1MSGVhZGVyKTtcbiAgICAgIF9fcHJpdmF0ZUFkZCh0aGlzLCBfY3JlYXRlQ29kZWNQcml2YXRlUGxhY2Vob2xkZXJzKTtcbiAgICAgIF9fcHJpdmF0ZUFkZCh0aGlzLCBfY3JlYXRlQ29sb3VyRWxlbWVudCk7XG4gICAgICBfX3ByaXZhdGVBZGQodGhpcywgX2NyZWF0ZVNlZWtIZWFkKTtcbiAgICAgIF9fcHJpdmF0ZUFkZCh0aGlzLCBfY3JlYXRlU2VnbWVudEluZm8pO1xuICAgICAgX19wcml2YXRlQWRkKHRoaXMsIF9jcmVhdGVUcmFja3MpO1xuICAgICAgX19wcml2YXRlQWRkKHRoaXMsIF9jcmVhdGVTZWdtZW50KTtcbiAgICAgIF9fcHJpdmF0ZUFkZCh0aGlzLCBfY3JlYXRlQ3Vlcyk7XG4gICAgICBfX3ByaXZhdGVBZGQodGhpcywgX21heWJlRmx1c2hTdHJlYW1pbmdUYXJnZXRXcml0ZXIpO1xuICAgICAgX19wcml2YXRlQWRkKHRoaXMsIF9zZWdtZW50RGF0YU9mZnNldCk7XG4gICAgICBfX3ByaXZhdGVBZGQodGhpcywgX3dyaXRlVmlkZW9EZWNvZGVyQ29uZmlnKTtcbiAgICAgIF9fcHJpdmF0ZUFkZCh0aGlzLCBfZml4VlA5Q29sb3JTcGFjZSk7XG4gICAgICBfX3ByaXZhdGVBZGQodGhpcywgX3dyaXRlU3VidGl0bGVDaHVua3MpO1xuICAgICAgX19wcml2YXRlQWRkKHRoaXMsIF9jcmVhdGVJbnRlcm5hbENodW5rKTtcbiAgICAgIF9fcHJpdmF0ZUFkZCh0aGlzLCBfdmFsaWRhdGVUaW1lc3RhbXApO1xuICAgICAgX19wcml2YXRlQWRkKHRoaXMsIF93cml0ZUJsb2NrKTtcbiAgICAgIF9fcHJpdmF0ZUFkZCh0aGlzLCBfY3JlYXRlQ29kZWNQcml2YXRlRWxlbWVudCk7XG4gICAgICBfX3ByaXZhdGVBZGQodGhpcywgX3dyaXRlQ29kZWNQcml2YXRlKTtcbiAgICAgIF9fcHJpdmF0ZUFkZCh0aGlzLCBfY3JlYXRlTmV3Q2x1c3Rlcik7XG4gICAgICBfX3ByaXZhdGVBZGQodGhpcywgX2ZpbmFsaXplQ3VycmVudENsdXN0ZXIpO1xuICAgICAgX19wcml2YXRlQWRkKHRoaXMsIF9lbnN1cmVOb3RGaW5hbGl6ZWQpO1xuICAgICAgX19wcml2YXRlQWRkKHRoaXMsIF9vcHRpb25zLCB2b2lkIDApO1xuICAgICAgX19wcml2YXRlQWRkKHRoaXMsIF93cml0ZXIsIHZvaWQgMCk7XG4gICAgICBfX3ByaXZhdGVBZGQodGhpcywgX3NlZ21lbnQsIHZvaWQgMCk7XG4gICAgICBfX3ByaXZhdGVBZGQodGhpcywgX3NlZ21lbnRJbmZvLCB2b2lkIDApO1xuICAgICAgX19wcml2YXRlQWRkKHRoaXMsIF9zZWVrSGVhZCwgdm9pZCAwKTtcbiAgICAgIF9fcHJpdmF0ZUFkZCh0aGlzLCBfdHJhY2tzRWxlbWVudCwgdm9pZCAwKTtcbiAgICAgIF9fcHJpdmF0ZUFkZCh0aGlzLCBfc2VnbWVudER1cmF0aW9uLCB2b2lkIDApO1xuICAgICAgX19wcml2YXRlQWRkKHRoaXMsIF9jb2xvdXJFbGVtZW50LCB2b2lkIDApO1xuICAgICAgX19wcml2YXRlQWRkKHRoaXMsIF92aWRlb0NvZGVjUHJpdmF0ZSwgdm9pZCAwKTtcbiAgICAgIF9fcHJpdmF0ZUFkZCh0aGlzLCBfYXVkaW9Db2RlY1ByaXZhdGUsIHZvaWQgMCk7XG4gICAgICBfX3ByaXZhdGVBZGQodGhpcywgX3N1YnRpdGxlQ29kZWNQcml2YXRlLCB2b2lkIDApO1xuICAgICAgX19wcml2YXRlQWRkKHRoaXMsIF9jdWVzLCB2b2lkIDApO1xuICAgICAgX19wcml2YXRlQWRkKHRoaXMsIF9jdXJyZW50Q2x1c3Rlciwgdm9pZCAwKTtcbiAgICAgIF9fcHJpdmF0ZUFkZCh0aGlzLCBfY3VycmVudENsdXN0ZXJUaW1lc3RhbXAsIHZvaWQgMCk7XG4gICAgICBfX3ByaXZhdGVBZGQodGhpcywgX2R1cmF0aW9uLCAwKTtcbiAgICAgIF9fcHJpdmF0ZUFkZCh0aGlzLCBfdmlkZW9DaHVua1F1ZXVlLCBbXSk7XG4gICAgICBfX3ByaXZhdGVBZGQodGhpcywgX2F1ZGlvQ2h1bmtRdWV1ZSwgW10pO1xuICAgICAgX19wcml2YXRlQWRkKHRoaXMsIF9zdWJ0aXRsZUNodW5rUXVldWUsIFtdKTtcbiAgICAgIF9fcHJpdmF0ZUFkZCh0aGlzLCBfZmlyc3RWaWRlb1RpbWVzdGFtcCwgdm9pZCAwKTtcbiAgICAgIF9fcHJpdmF0ZUFkZCh0aGlzLCBfZmlyc3RBdWRpb1RpbWVzdGFtcCwgdm9pZCAwKTtcbiAgICAgIF9fcHJpdmF0ZUFkZCh0aGlzLCBfbGFzdFZpZGVvVGltZXN0YW1wLCAtMSk7XG4gICAgICBfX3ByaXZhdGVBZGQodGhpcywgX2xhc3RBdWRpb1RpbWVzdGFtcCwgLTEpO1xuICAgICAgX19wcml2YXRlQWRkKHRoaXMsIF9sYXN0U3VidGl0bGVUaW1lc3RhbXAsIC0xKTtcbiAgICAgIF9fcHJpdmF0ZUFkZCh0aGlzLCBfY29sb3JTcGFjZSwgdm9pZCAwKTtcbiAgICAgIF9fcHJpdmF0ZUFkZCh0aGlzLCBfZmluYWxpemVkLCBmYWxzZSk7XG4gICAgICBfX3ByaXZhdGVNZXRob2QodGhpcywgX3ZhbGlkYXRlT3B0aW9ucywgdmFsaWRhdGVPcHRpb25zX2ZuKS5jYWxsKHRoaXMsIG9wdGlvbnMpO1xuICAgICAgX19wcml2YXRlU2V0KHRoaXMsIF9vcHRpb25zLCB7XG4gICAgICAgIHR5cGU6IFwid2VibVwiLFxuICAgICAgICBmaXJzdFRpbWVzdGFtcEJlaGF2aW9yOiBcInN0cmljdFwiLFxuICAgICAgICAuLi5vcHRpb25zXG4gICAgICB9KTtcbiAgICAgIHRoaXMudGFyZ2V0ID0gb3B0aW9ucy50YXJnZXQ7XG4gICAgICBsZXQgZW5zdXJlTW9ub3RvbmljaXR5ID0gISFfX3ByaXZhdGVHZXQodGhpcywgX29wdGlvbnMpLnN0cmVhbWluZztcbiAgICAgIGlmIChvcHRpb25zLnRhcmdldCBpbnN0YW5jZW9mIEFycmF5QnVmZmVyVGFyZ2V0KSB7XG4gICAgICAgIF9fcHJpdmF0ZVNldCh0aGlzLCBfd3JpdGVyLCBuZXcgQXJyYXlCdWZmZXJUYXJnZXRXcml0ZXIob3B0aW9ucy50YXJnZXQpKTtcbiAgICAgIH0gZWxzZSBpZiAob3B0aW9ucy50YXJnZXQgaW5zdGFuY2VvZiBTdHJlYW1UYXJnZXQpIHtcbiAgICAgICAgX19wcml2YXRlU2V0KHRoaXMsIF93cml0ZXIsIG5ldyBTdHJlYW1UYXJnZXRXcml0ZXIob3B0aW9ucy50YXJnZXQsIGVuc3VyZU1vbm90b25pY2l0eSkpO1xuICAgICAgfSBlbHNlIGlmIChvcHRpb25zLnRhcmdldCBpbnN0YW5jZW9mIEZpbGVTeXN0ZW1Xcml0YWJsZUZpbGVTdHJlYW1UYXJnZXQpIHtcbiAgICAgICAgX19wcml2YXRlU2V0KHRoaXMsIF93cml0ZXIsIG5ldyBGaWxlU3lzdGVtV3JpdGFibGVGaWxlU3RyZWFtVGFyZ2V0V3JpdGVyKG9wdGlvbnMudGFyZ2V0LCBlbnN1cmVNb25vdG9uaWNpdHkpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCB0YXJnZXQ6ICR7b3B0aW9ucy50YXJnZXR9YCk7XG4gICAgICB9XG4gICAgICBfX3ByaXZhdGVNZXRob2QodGhpcywgX2NyZWF0ZUZpbGVIZWFkZXIsIGNyZWF0ZUZpbGVIZWFkZXJfZm4pLmNhbGwodGhpcyk7XG4gICAgfVxuICAgIGFkZFZpZGVvQ2h1bmsoY2h1bmssIG1ldGEsIHRpbWVzdGFtcCkge1xuICAgICAgaWYgKCEoY2h1bmsgaW5zdGFuY2VvZiBFbmNvZGVkVmlkZW9DaHVuaykpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcImFkZFZpZGVvQ2h1bmsncyBmaXJzdCBhcmd1bWVudCAoY2h1bmspIG11c3QgYmUgb2YgdHlwZSBFbmNvZGVkVmlkZW9DaHVuay5cIik7XG4gICAgICB9XG4gICAgICBpZiAobWV0YSAmJiB0eXBlb2YgbWV0YSAhPT0gXCJvYmplY3RcIikge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiYWRkVmlkZW9DaHVuaydzIHNlY29uZCBhcmd1bWVudCAobWV0YSksIHdoZW4gcHJvdmlkZWQsIG11c3QgYmUgYW4gb2JqZWN0LlwiKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aW1lc3RhbXAgIT09IHZvaWQgMCAmJiAoIU51bWJlci5pc0Zpbml0ZSh0aW1lc3RhbXApIHx8IHRpbWVzdGFtcCA8IDApKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXG4gICAgICAgICAgXCJhZGRWaWRlb0NodW5rJ3MgdGhpcmQgYXJndW1lbnQgKHRpbWVzdGFtcCksIHdoZW4gcHJvdmlkZWQsIG11c3QgYmUgYSBub24tbmVnYXRpdmUgcmVhbCBudW1iZXIuXCJcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGxldCBkYXRhID0gbmV3IFVpbnQ4QXJyYXkoY2h1bmsuYnl0ZUxlbmd0aCk7XG4gICAgICBjaHVuay5jb3B5VG8oZGF0YSk7XG4gICAgICB0aGlzLmFkZFZpZGVvQ2h1bmtSYXcoZGF0YSwgY2h1bmsudHlwZSwgdGltZXN0YW1wID8/IGNodW5rLnRpbWVzdGFtcCwgbWV0YSk7XG4gICAgfVxuICAgIGFkZFZpZGVvQ2h1bmtSYXcoZGF0YSwgdHlwZSwgdGltZXN0YW1wLCBtZXRhKSB7XG4gICAgICBpZiAoIShkYXRhIGluc3RhbmNlb2YgVWludDhBcnJheSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcImFkZFZpZGVvQ2h1bmtSYXcncyBmaXJzdCBhcmd1bWVudCAoZGF0YSkgbXVzdCBiZSBhbiBpbnN0YW5jZSBvZiBVaW50OEFycmF5LlwiKTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlICE9PSBcImtleVwiICYmIHR5cGUgIT09IFwiZGVsdGFcIikge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiYWRkVmlkZW9DaHVua1JhdydzIHNlY29uZCBhcmd1bWVudCAodHlwZSkgbXVzdCBiZSBlaXRoZXIgJ2tleScgb3IgJ2RlbHRhJy5cIik7XG4gICAgICB9XG4gICAgICBpZiAoIU51bWJlci5pc0Zpbml0ZSh0aW1lc3RhbXApIHx8IHRpbWVzdGFtcCA8IDApIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcImFkZFZpZGVvQ2h1bmtSYXcncyB0aGlyZCBhcmd1bWVudCAodGltZXN0YW1wKSBtdXN0IGJlIGEgbm9uLW5lZ2F0aXZlIHJlYWwgbnVtYmVyLlwiKTtcbiAgICAgIH1cbiAgICAgIGlmIChtZXRhICYmIHR5cGVvZiBtZXRhICE9PSBcIm9iamVjdFwiKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJhZGRWaWRlb0NodW5rUmF3J3MgZm91cnRoIGFyZ3VtZW50IChtZXRhKSwgd2hlbiBwcm92aWRlZCwgbXVzdCBiZSBhbiBvYmplY3QuXCIpO1xuICAgICAgfVxuICAgICAgX19wcml2YXRlTWV0aG9kKHRoaXMsIF9lbnN1cmVOb3RGaW5hbGl6ZWQsIGVuc3VyZU5vdEZpbmFsaXplZF9mbikuY2FsbCh0aGlzKTtcbiAgICAgIGlmICghX19wcml2YXRlR2V0KHRoaXMsIF9vcHRpb25zKS52aWRlbylcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm8gdmlkZW8gdHJhY2sgZGVjbGFyZWQuXCIpO1xuICAgICAgaWYgKF9fcHJpdmF0ZUdldCh0aGlzLCBfZmlyc3RWaWRlb1RpbWVzdGFtcCkgPT09IHZvaWQgMClcbiAgICAgICAgX19wcml2YXRlU2V0KHRoaXMsIF9maXJzdFZpZGVvVGltZXN0YW1wLCB0aW1lc3RhbXApO1xuICAgICAgaWYgKG1ldGEpXG4gICAgICAgIF9fcHJpdmF0ZU1ldGhvZCh0aGlzLCBfd3JpdGVWaWRlb0RlY29kZXJDb25maWcsIHdyaXRlVmlkZW9EZWNvZGVyQ29uZmlnX2ZuKS5jYWxsKHRoaXMsIG1ldGEpO1xuICAgICAgbGV0IHZpZGVvQ2h1bmsgPSBfX3ByaXZhdGVNZXRob2QodGhpcywgX2NyZWF0ZUludGVybmFsQ2h1bmssIGNyZWF0ZUludGVybmFsQ2h1bmtfZm4pLmNhbGwodGhpcywgZGF0YSwgdHlwZSwgdGltZXN0YW1wLCBWSURFT19UUkFDS19OVU1CRVIpO1xuICAgICAgaWYgKF9fcHJpdmF0ZUdldCh0aGlzLCBfb3B0aW9ucykudmlkZW8uY29kZWMgPT09IFwiVl9WUDlcIilcbiAgICAgICAgX19wcml2YXRlTWV0aG9kKHRoaXMsIF9maXhWUDlDb2xvclNwYWNlLCBmaXhWUDlDb2xvclNwYWNlX2ZuKS5jYWxsKHRoaXMsIHZpZGVvQ2h1bmspO1xuICAgICAgX19wcml2YXRlU2V0KHRoaXMsIF9sYXN0VmlkZW9UaW1lc3RhbXAsIHZpZGVvQ2h1bmsudGltZXN0YW1wKTtcbiAgICAgIHdoaWxlIChfX3ByaXZhdGVHZXQodGhpcywgX2F1ZGlvQ2h1bmtRdWV1ZSkubGVuZ3RoID4gMCAmJiBfX3ByaXZhdGVHZXQodGhpcywgX2F1ZGlvQ2h1bmtRdWV1ZSlbMF0udGltZXN0YW1wIDw9IHZpZGVvQ2h1bmsudGltZXN0YW1wKSB7XG4gICAgICAgIGxldCBhdWRpb0NodW5rID0gX19wcml2YXRlR2V0KHRoaXMsIF9hdWRpb0NodW5rUXVldWUpLnNoaWZ0KCk7XG4gICAgICAgIF9fcHJpdmF0ZU1ldGhvZCh0aGlzLCBfd3JpdGVCbG9jaywgd3JpdGVCbG9ja19mbikuY2FsbCh0aGlzLCBhdWRpb0NodW5rLCBmYWxzZSk7XG4gICAgICB9XG4gICAgICBpZiAoIV9fcHJpdmF0ZUdldCh0aGlzLCBfb3B0aW9ucykuYXVkaW8gfHwgdmlkZW9DaHVuay50aW1lc3RhbXAgPD0gX19wcml2YXRlR2V0KHRoaXMsIF9sYXN0QXVkaW9UaW1lc3RhbXApKSB7XG4gICAgICAgIF9fcHJpdmF0ZU1ldGhvZCh0aGlzLCBfd3JpdGVCbG9jaywgd3JpdGVCbG9ja19mbikuY2FsbCh0aGlzLCB2aWRlb0NodW5rLCB0cnVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIF9fcHJpdmF0ZUdldCh0aGlzLCBfdmlkZW9DaHVua1F1ZXVlKS5wdXNoKHZpZGVvQ2h1bmspO1xuICAgICAgfVxuICAgICAgX19wcml2YXRlTWV0aG9kKHRoaXMsIF93cml0ZVN1YnRpdGxlQ2h1bmtzLCB3cml0ZVN1YnRpdGxlQ2h1bmtzX2ZuKS5jYWxsKHRoaXMpO1xuICAgICAgX19wcml2YXRlTWV0aG9kKHRoaXMsIF9tYXliZUZsdXNoU3RyZWFtaW5nVGFyZ2V0V3JpdGVyLCBtYXliZUZsdXNoU3RyZWFtaW5nVGFyZ2V0V3JpdGVyX2ZuKS5jYWxsKHRoaXMpO1xuICAgIH1cbiAgICBhZGRBdWRpb0NodW5rKGNodW5rLCBtZXRhLCB0aW1lc3RhbXApIHtcbiAgICAgIGlmICghKGNodW5rIGluc3RhbmNlb2YgRW5jb2RlZEF1ZGlvQ2h1bmspKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJhZGRBdWRpb0NodW5rJ3MgZmlyc3QgYXJndW1lbnQgKGNodW5rKSBtdXN0IGJlIG9mIHR5cGUgRW5jb2RlZEF1ZGlvQ2h1bmsuXCIpO1xuICAgICAgfVxuICAgICAgaWYgKG1ldGEgJiYgdHlwZW9mIG1ldGEgIT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcImFkZEF1ZGlvQ2h1bmsncyBzZWNvbmQgYXJndW1lbnQgKG1ldGEpLCB3aGVuIHByb3ZpZGVkLCBtdXN0IGJlIGFuIG9iamVjdC5cIik7XG4gICAgICB9XG4gICAgICBpZiAodGltZXN0YW1wICE9PSB2b2lkIDAgJiYgKCFOdW1iZXIuaXNGaW5pdGUodGltZXN0YW1wKSB8fCB0aW1lc3RhbXAgPCAwKSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICAgICAgIFwiYWRkQXVkaW9DaHVuaydzIHRoaXJkIGFyZ3VtZW50ICh0aW1lc3RhbXApLCB3aGVuIHByb3ZpZGVkLCBtdXN0IGJlIGEgbm9uLW5lZ2F0aXZlIHJlYWwgbnVtYmVyLlwiXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBsZXQgZGF0YSA9IG5ldyBVaW50OEFycmF5KGNodW5rLmJ5dGVMZW5ndGgpO1xuICAgICAgY2h1bmsuY29weVRvKGRhdGEpO1xuICAgICAgdGhpcy5hZGRBdWRpb0NodW5rUmF3KGRhdGEsIGNodW5rLnR5cGUsIHRpbWVzdGFtcCA/PyBjaHVuay50aW1lc3RhbXAsIG1ldGEpO1xuICAgIH1cbiAgICBhZGRBdWRpb0NodW5rUmF3KGRhdGEsIHR5cGUsIHRpbWVzdGFtcCwgbWV0YSkge1xuICAgICAgaWYgKCEoZGF0YSBpbnN0YW5jZW9mIFVpbnQ4QXJyYXkpKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJhZGRBdWRpb0NodW5rUmF3J3MgZmlyc3QgYXJndW1lbnQgKGRhdGEpIG11c3QgYmUgYW4gaW5zdGFuY2Ugb2YgVWludDhBcnJheS5cIik7XG4gICAgICB9XG4gICAgICBpZiAodHlwZSAhPT0gXCJrZXlcIiAmJiB0eXBlICE9PSBcImRlbHRhXCIpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcImFkZEF1ZGlvQ2h1bmtSYXcncyBzZWNvbmQgYXJndW1lbnQgKHR5cGUpIG11c3QgYmUgZWl0aGVyICdrZXknIG9yICdkZWx0YScuXCIpO1xuICAgICAgfVxuICAgICAgaWYgKCFOdW1iZXIuaXNGaW5pdGUodGltZXN0YW1wKSB8fCB0aW1lc3RhbXAgPCAwKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJhZGRBdWRpb0NodW5rUmF3J3MgdGhpcmQgYXJndW1lbnQgKHRpbWVzdGFtcCkgbXVzdCBiZSBhIG5vbi1uZWdhdGl2ZSByZWFsIG51bWJlci5cIik7XG4gICAgICB9XG4gICAgICBpZiAobWV0YSAmJiB0eXBlb2YgbWV0YSAhPT0gXCJvYmplY3RcIikge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiYWRkQXVkaW9DaHVua1JhdydzIGZvdXJ0aCBhcmd1bWVudCAobWV0YSksIHdoZW4gcHJvdmlkZWQsIG11c3QgYmUgYW4gb2JqZWN0LlwiKTtcbiAgICAgIH1cbiAgICAgIF9fcHJpdmF0ZU1ldGhvZCh0aGlzLCBfZW5zdXJlTm90RmluYWxpemVkLCBlbnN1cmVOb3RGaW5hbGl6ZWRfZm4pLmNhbGwodGhpcyk7XG4gICAgICBpZiAoIV9fcHJpdmF0ZUdldCh0aGlzLCBfb3B0aW9ucykuYXVkaW8pXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vIGF1ZGlvIHRyYWNrIGRlY2xhcmVkLlwiKTtcbiAgICAgIGlmIChfX3ByaXZhdGVHZXQodGhpcywgX2ZpcnN0QXVkaW9UaW1lc3RhbXApID09PSB2b2lkIDApXG4gICAgICAgIF9fcHJpdmF0ZVNldCh0aGlzLCBfZmlyc3RBdWRpb1RpbWVzdGFtcCwgdGltZXN0YW1wKTtcbiAgICAgIGlmIChtZXRhPy5kZWNvZGVyQ29uZmlnKSB7XG4gICAgICAgIGlmIChfX3ByaXZhdGVHZXQodGhpcywgX29wdGlvbnMpLnN0cmVhbWluZykge1xuICAgICAgICAgIF9fcHJpdmF0ZVNldCh0aGlzLCBfYXVkaW9Db2RlY1ByaXZhdGUsIF9fcHJpdmF0ZU1ldGhvZCh0aGlzLCBfY3JlYXRlQ29kZWNQcml2YXRlRWxlbWVudCwgY3JlYXRlQ29kZWNQcml2YXRlRWxlbWVudF9mbikuY2FsbCh0aGlzLCBtZXRhLmRlY29kZXJDb25maWcuZGVzY3JpcHRpb24pKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBfX3ByaXZhdGVNZXRob2QodGhpcywgX3dyaXRlQ29kZWNQcml2YXRlLCB3cml0ZUNvZGVjUHJpdmF0ZV9mbikuY2FsbCh0aGlzLCBfX3ByaXZhdGVHZXQodGhpcywgX2F1ZGlvQ29kZWNQcml2YXRlKSwgbWV0YS5kZWNvZGVyQ29uZmlnLmRlc2NyaXB0aW9uKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGV0IGF1ZGlvQ2h1bmsgPSBfX3ByaXZhdGVNZXRob2QodGhpcywgX2NyZWF0ZUludGVybmFsQ2h1bmssIGNyZWF0ZUludGVybmFsQ2h1bmtfZm4pLmNhbGwodGhpcywgZGF0YSwgdHlwZSwgdGltZXN0YW1wLCBBVURJT19UUkFDS19OVU1CRVIpO1xuICAgICAgX19wcml2YXRlU2V0KHRoaXMsIF9sYXN0QXVkaW9UaW1lc3RhbXAsIGF1ZGlvQ2h1bmsudGltZXN0YW1wKTtcbiAgICAgIHdoaWxlIChfX3ByaXZhdGVHZXQodGhpcywgX3ZpZGVvQ2h1bmtRdWV1ZSkubGVuZ3RoID4gMCAmJiBfX3ByaXZhdGVHZXQodGhpcywgX3ZpZGVvQ2h1bmtRdWV1ZSlbMF0udGltZXN0YW1wIDw9IGF1ZGlvQ2h1bmsudGltZXN0YW1wKSB7XG4gICAgICAgIGxldCB2aWRlb0NodW5rID0gX19wcml2YXRlR2V0KHRoaXMsIF92aWRlb0NodW5rUXVldWUpLnNoaWZ0KCk7XG4gICAgICAgIF9fcHJpdmF0ZU1ldGhvZCh0aGlzLCBfd3JpdGVCbG9jaywgd3JpdGVCbG9ja19mbikuY2FsbCh0aGlzLCB2aWRlb0NodW5rLCB0cnVlKTtcbiAgICAgIH1cbiAgICAgIGlmICghX19wcml2YXRlR2V0KHRoaXMsIF9vcHRpb25zKS52aWRlbyB8fCBhdWRpb0NodW5rLnRpbWVzdGFtcCA8PSBfX3ByaXZhdGVHZXQodGhpcywgX2xhc3RWaWRlb1RpbWVzdGFtcCkpIHtcbiAgICAgICAgX19wcml2YXRlTWV0aG9kKHRoaXMsIF93cml0ZUJsb2NrLCB3cml0ZUJsb2NrX2ZuKS5jYWxsKHRoaXMsIGF1ZGlvQ2h1bmssICFfX3ByaXZhdGVHZXQodGhpcywgX29wdGlvbnMpLnZpZGVvKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIF9fcHJpdmF0ZUdldCh0aGlzLCBfYXVkaW9DaHVua1F1ZXVlKS5wdXNoKGF1ZGlvQ2h1bmspO1xuICAgICAgfVxuICAgICAgX19wcml2YXRlTWV0aG9kKHRoaXMsIF93cml0ZVN1YnRpdGxlQ2h1bmtzLCB3cml0ZVN1YnRpdGxlQ2h1bmtzX2ZuKS5jYWxsKHRoaXMpO1xuICAgICAgX19wcml2YXRlTWV0aG9kKHRoaXMsIF9tYXliZUZsdXNoU3RyZWFtaW5nVGFyZ2V0V3JpdGVyLCBtYXliZUZsdXNoU3RyZWFtaW5nVGFyZ2V0V3JpdGVyX2ZuKS5jYWxsKHRoaXMpO1xuICAgIH1cbiAgICBhZGRTdWJ0aXRsZUNodW5rKGNodW5rLCBtZXRhLCB0aW1lc3RhbXApIHtcbiAgICAgIGlmICh0eXBlb2YgY2h1bmsgIT09IFwib2JqZWN0XCIgfHwgIWNodW5rKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJhZGRTdWJ0aXRsZUNodW5rJ3MgZmlyc3QgYXJndW1lbnQgKGNodW5rKSBtdXN0IGJlIGFuIG9iamVjdC5cIik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoIShjaHVuay5ib2R5IGluc3RhbmNlb2YgVWludDhBcnJheSkpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiYm9keSBtdXN0IGJlIGFuIGluc3RhbmNlIG9mIFVpbnQ4QXJyYXkuXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghTnVtYmVyLmlzRmluaXRlKGNodW5rLnRpbWVzdGFtcCkgfHwgY2h1bmsudGltZXN0YW1wIDwgMCkge1xuICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJ0aW1lc3RhbXAgbXVzdCBiZSBhIG5vbi1uZWdhdGl2ZSByZWFsIG51bWJlci5cIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFOdW1iZXIuaXNGaW5pdGUoY2h1bmsuZHVyYXRpb24pIHx8IGNodW5rLmR1cmF0aW9uIDwgMCkge1xuICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJkdXJhdGlvbiBtdXN0IGJlIGEgbm9uLW5lZ2F0aXZlIHJlYWwgbnVtYmVyLlwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2h1bmsuYWRkaXRpb25zICYmICEoY2h1bmsuYWRkaXRpb25zIGluc3RhbmNlb2YgVWludDhBcnJheSkpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiYWRkaXRpb25zLCB3aGVuIHByZXNlbnQsIG11c3QgYmUgYW4gaW5zdGFuY2Ugb2YgVWludDhBcnJheS5cIik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgbWV0YSAhPT0gXCJvYmplY3RcIikge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiYWRkU3VidGl0bGVDaHVuaydzIHNlY29uZCBhcmd1bWVudCAobWV0YSkgbXVzdCBiZSBhbiBvYmplY3QuXCIpO1xuICAgICAgfVxuICAgICAgX19wcml2YXRlTWV0aG9kKHRoaXMsIF9lbnN1cmVOb3RGaW5hbGl6ZWQsIGVuc3VyZU5vdEZpbmFsaXplZF9mbikuY2FsbCh0aGlzKTtcbiAgICAgIGlmICghX19wcml2YXRlR2V0KHRoaXMsIF9vcHRpb25zKS5zdWJ0aXRsZXMpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vIHN1YnRpdGxlIHRyYWNrIGRlY2xhcmVkLlwiKTtcbiAgICAgIGlmIChtZXRhPy5kZWNvZGVyQ29uZmlnKSB7XG4gICAgICAgIGlmIChfX3ByaXZhdGVHZXQodGhpcywgX29wdGlvbnMpLnN0cmVhbWluZykge1xuICAgICAgICAgIF9fcHJpdmF0ZVNldCh0aGlzLCBfc3VidGl0bGVDb2RlY1ByaXZhdGUsIF9fcHJpdmF0ZU1ldGhvZCh0aGlzLCBfY3JlYXRlQ29kZWNQcml2YXRlRWxlbWVudCwgY3JlYXRlQ29kZWNQcml2YXRlRWxlbWVudF9mbikuY2FsbCh0aGlzLCBtZXRhLmRlY29kZXJDb25maWcuZGVzY3JpcHRpb24pKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBfX3ByaXZhdGVNZXRob2QodGhpcywgX3dyaXRlQ29kZWNQcml2YXRlLCB3cml0ZUNvZGVjUHJpdmF0ZV9mbikuY2FsbCh0aGlzLCBfX3ByaXZhdGVHZXQodGhpcywgX3N1YnRpdGxlQ29kZWNQcml2YXRlKSwgbWV0YS5kZWNvZGVyQ29uZmlnLmRlc2NyaXB0aW9uKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGV0IHN1YnRpdGxlQ2h1bmsgPSBfX3ByaXZhdGVNZXRob2QodGhpcywgX2NyZWF0ZUludGVybmFsQ2h1bmssIGNyZWF0ZUludGVybmFsQ2h1bmtfZm4pLmNhbGwodGhpcywgY2h1bmsuYm9keSwgXCJrZXlcIiwgdGltZXN0YW1wID8/IGNodW5rLnRpbWVzdGFtcCwgU1VCVElUTEVfVFJBQ0tfTlVNQkVSLCBjaHVuay5kdXJhdGlvbiwgY2h1bmsuYWRkaXRpb25zKTtcbiAgICAgIF9fcHJpdmF0ZVNldCh0aGlzLCBfbGFzdFN1YnRpdGxlVGltZXN0YW1wLCBzdWJ0aXRsZUNodW5rLnRpbWVzdGFtcCk7XG4gICAgICBfX3ByaXZhdGVHZXQodGhpcywgX3N1YnRpdGxlQ2h1bmtRdWV1ZSkucHVzaChzdWJ0aXRsZUNodW5rKTtcbiAgICAgIF9fcHJpdmF0ZU1ldGhvZCh0aGlzLCBfd3JpdGVTdWJ0aXRsZUNodW5rcywgd3JpdGVTdWJ0aXRsZUNodW5rc19mbikuY2FsbCh0aGlzKTtcbiAgICAgIF9fcHJpdmF0ZU1ldGhvZCh0aGlzLCBfbWF5YmVGbHVzaFN0cmVhbWluZ1RhcmdldFdyaXRlciwgbWF5YmVGbHVzaFN0cmVhbWluZ1RhcmdldFdyaXRlcl9mbikuY2FsbCh0aGlzKTtcbiAgICB9XG4gICAgZmluYWxpemUoKSB7XG4gICAgICBpZiAoX19wcml2YXRlR2V0KHRoaXMsIF9maW5hbGl6ZWQpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5hbGl6ZSBhIG11eGVyIG1vcmUgdGhhbiBvbmNlLlwiKTtcbiAgICAgIH1cbiAgICAgIHdoaWxlIChfX3ByaXZhdGVHZXQodGhpcywgX3ZpZGVvQ2h1bmtRdWV1ZSkubGVuZ3RoID4gMClcbiAgICAgICAgX19wcml2YXRlTWV0aG9kKHRoaXMsIF93cml0ZUJsb2NrLCB3cml0ZUJsb2NrX2ZuKS5jYWxsKHRoaXMsIF9fcHJpdmF0ZUdldCh0aGlzLCBfdmlkZW9DaHVua1F1ZXVlKS5zaGlmdCgpLCB0cnVlKTtcbiAgICAgIHdoaWxlIChfX3ByaXZhdGVHZXQodGhpcywgX2F1ZGlvQ2h1bmtRdWV1ZSkubGVuZ3RoID4gMClcbiAgICAgICAgX19wcml2YXRlTWV0aG9kKHRoaXMsIF93cml0ZUJsb2NrLCB3cml0ZUJsb2NrX2ZuKS5jYWxsKHRoaXMsIF9fcHJpdmF0ZUdldCh0aGlzLCBfYXVkaW9DaHVua1F1ZXVlKS5zaGlmdCgpLCB0cnVlKTtcbiAgICAgIHdoaWxlIChfX3ByaXZhdGVHZXQodGhpcywgX3N1YnRpdGxlQ2h1bmtRdWV1ZSkubGVuZ3RoID4gMCAmJiBfX3ByaXZhdGVHZXQodGhpcywgX3N1YnRpdGxlQ2h1bmtRdWV1ZSlbMF0udGltZXN0YW1wIDw9IF9fcHJpdmF0ZUdldCh0aGlzLCBfZHVyYXRpb24pKSB7XG4gICAgICAgIF9fcHJpdmF0ZU1ldGhvZCh0aGlzLCBfd3JpdGVCbG9jaywgd3JpdGVCbG9ja19mbikuY2FsbCh0aGlzLCBfX3ByaXZhdGVHZXQodGhpcywgX3N1YnRpdGxlQ2h1bmtRdWV1ZSkuc2hpZnQoKSwgZmFsc2UpO1xuICAgICAgfVxuICAgICAgaWYgKF9fcHJpdmF0ZUdldCh0aGlzLCBfY3VycmVudENsdXN0ZXIpKSB7XG4gICAgICAgIF9fcHJpdmF0ZU1ldGhvZCh0aGlzLCBfZmluYWxpemVDdXJyZW50Q2x1c3RlciwgZmluYWxpemVDdXJyZW50Q2x1c3Rlcl9mbikuY2FsbCh0aGlzKTtcbiAgICAgIH1cbiAgICAgIF9fcHJpdmF0ZUdldCh0aGlzLCBfd3JpdGVyKS53cml0ZUVCTUwoX19wcml2YXRlR2V0KHRoaXMsIF9jdWVzKSk7XG4gICAgICBpZiAoIV9fcHJpdmF0ZUdldCh0aGlzLCBfb3B0aW9ucykuc3RyZWFtaW5nKSB7XG4gICAgICAgIGxldCBlbmRQb3MgPSBfX3ByaXZhdGVHZXQodGhpcywgX3dyaXRlcikucG9zO1xuICAgICAgICBsZXQgc2VnbWVudFNpemUgPSBfX3ByaXZhdGVHZXQodGhpcywgX3dyaXRlcikucG9zIC0gX19wcml2YXRlR2V0KHRoaXMsIF9zZWdtZW50RGF0YU9mZnNldCwgc2VnbWVudERhdGFPZmZzZXRfZ2V0KTtcbiAgICAgICAgX19wcml2YXRlR2V0KHRoaXMsIF93cml0ZXIpLnNlZWsoX19wcml2YXRlR2V0KHRoaXMsIF93cml0ZXIpLm9mZnNldHMuZ2V0KF9fcHJpdmF0ZUdldCh0aGlzLCBfc2VnbWVudCkpICsgNCk7XG4gICAgICAgIF9fcHJpdmF0ZUdldCh0aGlzLCBfd3JpdGVyKS53cml0ZUVCTUxWYXJJbnQoc2VnbWVudFNpemUsIFNFR01FTlRfU0laRV9CWVRFUyk7XG4gICAgICAgIF9fcHJpdmF0ZUdldCh0aGlzLCBfc2VnbWVudER1cmF0aW9uKS5kYXRhID0gbmV3IEVCTUxGbG9hdDY0KF9fcHJpdmF0ZUdldCh0aGlzLCBfZHVyYXRpb24pKTtcbiAgICAgICAgX19wcml2YXRlR2V0KHRoaXMsIF93cml0ZXIpLnNlZWsoX19wcml2YXRlR2V0KHRoaXMsIF93cml0ZXIpLm9mZnNldHMuZ2V0KF9fcHJpdmF0ZUdldCh0aGlzLCBfc2VnbWVudER1cmF0aW9uKSkpO1xuICAgICAgICBfX3ByaXZhdGVHZXQodGhpcywgX3dyaXRlcikud3JpdGVFQk1MKF9fcHJpdmF0ZUdldCh0aGlzLCBfc2VnbWVudER1cmF0aW9uKSk7XG4gICAgICAgIF9fcHJpdmF0ZUdldCh0aGlzLCBfc2Vla0hlYWQpLmRhdGFbMF0uZGF0YVsxXS5kYXRhID0gX19wcml2YXRlR2V0KHRoaXMsIF93cml0ZXIpLm9mZnNldHMuZ2V0KF9fcHJpdmF0ZUdldCh0aGlzLCBfY3VlcykpIC0gX19wcml2YXRlR2V0KHRoaXMsIF9zZWdtZW50RGF0YU9mZnNldCwgc2VnbWVudERhdGFPZmZzZXRfZ2V0KTtcbiAgICAgICAgX19wcml2YXRlR2V0KHRoaXMsIF9zZWVrSGVhZCkuZGF0YVsxXS5kYXRhWzFdLmRhdGEgPSBfX3ByaXZhdGVHZXQodGhpcywgX3dyaXRlcikub2Zmc2V0cy5nZXQoX19wcml2YXRlR2V0KHRoaXMsIF9zZWdtZW50SW5mbykpIC0gX19wcml2YXRlR2V0KHRoaXMsIF9zZWdtZW50RGF0YU9mZnNldCwgc2VnbWVudERhdGFPZmZzZXRfZ2V0KTtcbiAgICAgICAgX19wcml2YXRlR2V0KHRoaXMsIF9zZWVrSGVhZCkuZGF0YVsyXS5kYXRhWzFdLmRhdGEgPSBfX3ByaXZhdGVHZXQodGhpcywgX3dyaXRlcikub2Zmc2V0cy5nZXQoX19wcml2YXRlR2V0KHRoaXMsIF90cmFja3NFbGVtZW50KSkgLSBfX3ByaXZhdGVHZXQodGhpcywgX3NlZ21lbnREYXRhT2Zmc2V0LCBzZWdtZW50RGF0YU9mZnNldF9nZXQpO1xuICAgICAgICBfX3ByaXZhdGVHZXQodGhpcywgX3dyaXRlcikuc2VlayhfX3ByaXZhdGVHZXQodGhpcywgX3dyaXRlcikub2Zmc2V0cy5nZXQoX19wcml2YXRlR2V0KHRoaXMsIF9zZWVrSGVhZCkpKTtcbiAgICAgICAgX19wcml2YXRlR2V0KHRoaXMsIF93cml0ZXIpLndyaXRlRUJNTChfX3ByaXZhdGVHZXQodGhpcywgX3NlZWtIZWFkKSk7XG4gICAgICAgIF9fcHJpdmF0ZUdldCh0aGlzLCBfd3JpdGVyKS5zZWVrKGVuZFBvcyk7XG4gICAgICB9XG4gICAgICBfX3ByaXZhdGVNZXRob2QodGhpcywgX21heWJlRmx1c2hTdHJlYW1pbmdUYXJnZXRXcml0ZXIsIG1heWJlRmx1c2hTdHJlYW1pbmdUYXJnZXRXcml0ZXJfZm4pLmNhbGwodGhpcyk7XG4gICAgICBfX3ByaXZhdGVHZXQodGhpcywgX3dyaXRlcikuZmluYWxpemUoKTtcbiAgICAgIF9fcHJpdmF0ZVNldCh0aGlzLCBfZmluYWxpemVkLCB0cnVlKTtcbiAgICB9XG4gIH07XG4gIF9vcHRpb25zID0gbmV3IFdlYWtNYXAoKTtcbiAgX3dyaXRlciA9IG5ldyBXZWFrTWFwKCk7XG4gIF9zZWdtZW50ID0gbmV3IFdlYWtNYXAoKTtcbiAgX3NlZ21lbnRJbmZvID0gbmV3IFdlYWtNYXAoKTtcbiAgX3NlZWtIZWFkID0gbmV3IFdlYWtNYXAoKTtcbiAgX3RyYWNrc0VsZW1lbnQgPSBuZXcgV2Vha01hcCgpO1xuICBfc2VnbWVudER1cmF0aW9uID0gbmV3IFdlYWtNYXAoKTtcbiAgX2NvbG91ckVsZW1lbnQgPSBuZXcgV2Vha01hcCgpO1xuICBfdmlkZW9Db2RlY1ByaXZhdGUgPSBuZXcgV2Vha01hcCgpO1xuICBfYXVkaW9Db2RlY1ByaXZhdGUgPSBuZXcgV2Vha01hcCgpO1xuICBfc3VidGl0bGVDb2RlY1ByaXZhdGUgPSBuZXcgV2Vha01hcCgpO1xuICBfY3VlcyA9IG5ldyBXZWFrTWFwKCk7XG4gIF9jdXJyZW50Q2x1c3RlciA9IG5ldyBXZWFrTWFwKCk7XG4gIF9jdXJyZW50Q2x1c3RlclRpbWVzdGFtcCA9IG5ldyBXZWFrTWFwKCk7XG4gIF9kdXJhdGlvbiA9IG5ldyBXZWFrTWFwKCk7XG4gIF92aWRlb0NodW5rUXVldWUgPSBuZXcgV2Vha01hcCgpO1xuICBfYXVkaW9DaHVua1F1ZXVlID0gbmV3IFdlYWtNYXAoKTtcbiAgX3N1YnRpdGxlQ2h1bmtRdWV1ZSA9IG5ldyBXZWFrTWFwKCk7XG4gIF9maXJzdFZpZGVvVGltZXN0YW1wID0gbmV3IFdlYWtNYXAoKTtcbiAgX2ZpcnN0QXVkaW9UaW1lc3RhbXAgPSBuZXcgV2Vha01hcCgpO1xuICBfbGFzdFZpZGVvVGltZXN0YW1wID0gbmV3IFdlYWtNYXAoKTtcbiAgX2xhc3RBdWRpb1RpbWVzdGFtcCA9IG5ldyBXZWFrTWFwKCk7XG4gIF9sYXN0U3VidGl0bGVUaW1lc3RhbXAgPSBuZXcgV2Vha01hcCgpO1xuICBfY29sb3JTcGFjZSA9IG5ldyBXZWFrTWFwKCk7XG4gIF9maW5hbGl6ZWQgPSBuZXcgV2Vha01hcCgpO1xuICBfdmFsaWRhdGVPcHRpb25zID0gbmV3IFdlYWtTZXQoKTtcbiAgdmFsaWRhdGVPcHRpb25zX2ZuID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICAgIGlmICh0eXBlb2Ygb3B0aW9ucyAhPT0gXCJvYmplY3RcIikge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlRoZSBtdXhlciByZXF1aXJlcyBhbiBvcHRpb25zIG9iamVjdCB0byBiZSBwYXNzZWQgdG8gaXRzIGNvbnN0cnVjdG9yLlwiKTtcbiAgICB9XG4gICAgaWYgKCEob3B0aW9ucy50YXJnZXQgaW5zdGFuY2VvZiBUYXJnZXQpKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiVGhlIHRhcmdldCBtdXN0IGJlIHByb3ZpZGVkIGFuZCBhbiBpbnN0YW5jZSBvZiBUYXJnZXQuXCIpO1xuICAgIH1cbiAgICBpZiAob3B0aW9ucy52aWRlbykge1xuICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLnZpZGVvLmNvZGVjICE9PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYEludmFsaWQgdmlkZW8gY29kZWM6ICR7b3B0aW9ucy52aWRlby5jb2RlY30uIE11c3QgYmUgYSBzdHJpbmcuYCk7XG4gICAgICB9XG4gICAgICBpZiAoIU51bWJlci5pc0ludGVnZXIob3B0aW9ucy52aWRlby53aWR0aCkgfHwgb3B0aW9ucy52aWRlby53aWR0aCA8PSAwKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYEludmFsaWQgdmlkZW8gd2lkdGg6ICR7b3B0aW9ucy52aWRlby53aWR0aH0uIE11c3QgYmUgYSBwb3NpdGl2ZSBpbnRlZ2VyLmApO1xuICAgICAgfVxuICAgICAgaWYgKCFOdW1iZXIuaXNJbnRlZ2VyKG9wdGlvbnMudmlkZW8uaGVpZ2h0KSB8fCBvcHRpb25zLnZpZGVvLmhlaWdodCA8PSAwKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYEludmFsaWQgdmlkZW8gaGVpZ2h0OiAke29wdGlvbnMudmlkZW8uaGVpZ2h0fS4gTXVzdCBiZSBhIHBvc2l0aXZlIGludGVnZXIuYCk7XG4gICAgICB9XG4gICAgICBpZiAob3B0aW9ucy52aWRlby5mcmFtZVJhdGUgIT09IHZvaWQgMCkge1xuICAgICAgICBpZiAoIU51bWJlci5pc0Zpbml0ZShvcHRpb25zLnZpZGVvLmZyYW1lUmF0ZSkgfHwgb3B0aW9ucy52aWRlby5mcmFtZVJhdGUgPD0gMCkge1xuICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXG4gICAgICAgICAgICBgSW52YWxpZCB2aWRlbyBmcmFtZSByYXRlOiAke29wdGlvbnMudmlkZW8uZnJhbWVSYXRlfS4gTXVzdCBiZSBhIHBvc2l0aXZlIG51bWJlci5gXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG9wdGlvbnMudmlkZW8uYWxwaGEgIT09IHZvaWQgMCAmJiB0eXBlb2Ygb3B0aW9ucy52aWRlby5hbHBoYSAhPT0gXCJib29sZWFuXCIpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgSW52YWxpZCB2aWRlbyBhbHBoYTogJHtvcHRpb25zLnZpZGVvLmFscGhhfS4gTXVzdCBiZSBhIGJvb2xlYW4uYCk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChvcHRpb25zLmF1ZGlvKSB7XG4gICAgICBpZiAodHlwZW9mIG9wdGlvbnMuYXVkaW8uY29kZWMgIT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgSW52YWxpZCBhdWRpbyBjb2RlYzogJHtvcHRpb25zLmF1ZGlvLmNvZGVjfS4gTXVzdCBiZSBhIHN0cmluZy5gKTtcbiAgICAgIH1cbiAgICAgIGlmICghTnVtYmVyLmlzSW50ZWdlcihvcHRpb25zLmF1ZGlvLm51bWJlck9mQ2hhbm5lbHMpIHx8IG9wdGlvbnMuYXVkaW8ubnVtYmVyT2ZDaGFubmVscyA8PSAwKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXG4gICAgICAgICAgYEludmFsaWQgbnVtYmVyIG9mIGF1ZGlvIGNoYW5uZWxzOiAke29wdGlvbnMuYXVkaW8ubnVtYmVyT2ZDaGFubmVsc30uIE11c3QgYmUgYSBwb3NpdGl2ZSBpbnRlZ2VyLmBcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGlmICghTnVtYmVyLmlzSW50ZWdlcihvcHRpb25zLmF1ZGlvLnNhbXBsZVJhdGUpIHx8IG9wdGlvbnMuYXVkaW8uc2FtcGxlUmF0ZSA8PSAwKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXG4gICAgICAgICAgYEludmFsaWQgYXVkaW8gc2FtcGxlIHJhdGU6ICR7b3B0aW9ucy5hdWRpby5zYW1wbGVSYXRlfS4gTXVzdCBiZSBhIHBvc2l0aXZlIGludGVnZXIuYFxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgaWYgKG9wdGlvbnMuYXVkaW8uYml0RGVwdGggIT09IHZvaWQgMCkge1xuICAgICAgICBpZiAoIU51bWJlci5pc0ludGVnZXIob3B0aW9ucy5hdWRpby5iaXREZXB0aCkgfHwgb3B0aW9ucy5hdWRpby5iaXREZXB0aCA8PSAwKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcbiAgICAgICAgICAgIGBJbnZhbGlkIGF1ZGlvIGJpdCBkZXB0aDogJHtvcHRpb25zLmF1ZGlvLmJpdERlcHRofS4gTXVzdCBiZSBhIHBvc2l0aXZlIGludGVnZXIuYFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKG9wdGlvbnMuc3VidGl0bGVzKSB7XG4gICAgICBpZiAodHlwZW9mIG9wdGlvbnMuc3VidGl0bGVzLmNvZGVjICE9PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYEludmFsaWQgc3VidGl0bGVzIGNvZGVjOiAke29wdGlvbnMuc3VidGl0bGVzLmNvZGVjfS4gTXVzdCBiZSBhIHN0cmluZy5gKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKG9wdGlvbnMudHlwZSAhPT0gdm9pZCAwICYmICFbXCJ3ZWJtXCIsIFwibWF0cm9za2FcIl0uaW5jbHVkZXMob3B0aW9ucy50eXBlKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgSW52YWxpZCB0eXBlOiAke29wdGlvbnMudHlwZX0uIE11c3QgYmUgJ3dlYm0nIG9yICdtYXRyb3NrYScuYCk7XG4gICAgfVxuICAgIGlmIChvcHRpb25zLmZpcnN0VGltZXN0YW1wQmVoYXZpb3IgJiYgIUZJUlNUX1RJTUVTVEFNUF9CRUhBVklPUlMuaW5jbHVkZXMob3B0aW9ucy5maXJzdFRpbWVzdGFtcEJlaGF2aW9yKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgSW52YWxpZCBmaXJzdCB0aW1lc3RhbXAgYmVoYXZpb3I6ICR7b3B0aW9ucy5maXJzdFRpbWVzdGFtcEJlaGF2aW9yfWApO1xuICAgIH1cbiAgICBpZiAob3B0aW9ucy5zdHJlYW1pbmcgIT09IHZvaWQgMCAmJiB0eXBlb2Ygb3B0aW9ucy5zdHJlYW1pbmcgIT09IFwiYm9vbGVhblwiKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBJbnZhbGlkIHN0cmVhbWluZyBvcHRpb246ICR7b3B0aW9ucy5zdHJlYW1pbmd9LiBNdXN0IGJlIGEgYm9vbGVhbi5gKTtcbiAgICB9XG4gIH07XG4gIF9jcmVhdGVGaWxlSGVhZGVyID0gbmV3IFdlYWtTZXQoKTtcbiAgY3JlYXRlRmlsZUhlYWRlcl9mbiA9IGZ1bmN0aW9uKCkge1xuICAgIGlmIChfX3ByaXZhdGVHZXQodGhpcywgX3dyaXRlcikgaW5zdGFuY2VvZiBCYXNlU3RyZWFtVGFyZ2V0V3JpdGVyICYmIF9fcHJpdmF0ZUdldCh0aGlzLCBfd3JpdGVyKS50YXJnZXQub3B0aW9ucy5vbkhlYWRlcikge1xuICAgICAgX19wcml2YXRlR2V0KHRoaXMsIF93cml0ZXIpLnN0YXJ0VHJhY2tpbmdXcml0ZXMoKTtcbiAgICB9XG4gICAgX19wcml2YXRlTWV0aG9kKHRoaXMsIF93cml0ZUVCTUxIZWFkZXIsIHdyaXRlRUJNTEhlYWRlcl9mbikuY2FsbCh0aGlzKTtcbiAgICBpZiAoIV9fcHJpdmF0ZUdldCh0aGlzLCBfb3B0aW9ucykuc3RyZWFtaW5nKSB7XG4gICAgICBfX3ByaXZhdGVNZXRob2QodGhpcywgX2NyZWF0ZVNlZWtIZWFkLCBjcmVhdGVTZWVrSGVhZF9mbikuY2FsbCh0aGlzKTtcbiAgICB9XG4gICAgX19wcml2YXRlTWV0aG9kKHRoaXMsIF9jcmVhdGVTZWdtZW50SW5mbywgY3JlYXRlU2VnbWVudEluZm9fZm4pLmNhbGwodGhpcyk7XG4gICAgX19wcml2YXRlTWV0aG9kKHRoaXMsIF9jcmVhdGVDb2RlY1ByaXZhdGVQbGFjZWhvbGRlcnMsIGNyZWF0ZUNvZGVjUHJpdmF0ZVBsYWNlaG9sZGVyc19mbikuY2FsbCh0aGlzKTtcbiAgICBfX3ByaXZhdGVNZXRob2QodGhpcywgX2NyZWF0ZUNvbG91ckVsZW1lbnQsIGNyZWF0ZUNvbG91ckVsZW1lbnRfZm4pLmNhbGwodGhpcyk7XG4gICAgaWYgKCFfX3ByaXZhdGVHZXQodGhpcywgX29wdGlvbnMpLnN0cmVhbWluZykge1xuICAgICAgX19wcml2YXRlTWV0aG9kKHRoaXMsIF9jcmVhdGVUcmFja3MsIGNyZWF0ZVRyYWNrc19mbikuY2FsbCh0aGlzKTtcbiAgICAgIF9fcHJpdmF0ZU1ldGhvZCh0aGlzLCBfY3JlYXRlU2VnbWVudCwgY3JlYXRlU2VnbWVudF9mbikuY2FsbCh0aGlzKTtcbiAgICB9IGVsc2Uge1xuICAgIH1cbiAgICBfX3ByaXZhdGVNZXRob2QodGhpcywgX2NyZWF0ZUN1ZXMsIGNyZWF0ZUN1ZXNfZm4pLmNhbGwodGhpcyk7XG4gICAgX19wcml2YXRlTWV0aG9kKHRoaXMsIF9tYXliZUZsdXNoU3RyZWFtaW5nVGFyZ2V0V3JpdGVyLCBtYXliZUZsdXNoU3RyZWFtaW5nVGFyZ2V0V3JpdGVyX2ZuKS5jYWxsKHRoaXMpO1xuICB9O1xuICBfd3JpdGVFQk1MSGVhZGVyID0gbmV3IFdlYWtTZXQoKTtcbiAgd3JpdGVFQk1MSGVhZGVyX2ZuID0gZnVuY3Rpb24oKSB7XG4gICAgbGV0IGVibWxIZWFkZXIgPSB7IGlkOiA0NDA3ODY4NTEgLyogRUJNTCAqLywgZGF0YTogW1xuICAgICAgeyBpZDogMTcwMzAgLyogRUJNTFZlcnNpb24gKi8sIGRhdGE6IDEgfSxcbiAgICAgIHsgaWQ6IDE3MTQzIC8qIEVCTUxSZWFkVmVyc2lvbiAqLywgZGF0YTogMSB9LFxuICAgICAgeyBpZDogMTcxMzggLyogRUJNTE1heElETGVuZ3RoICovLCBkYXRhOiA0IH0sXG4gICAgICB7IGlkOiAxNzEzOSAvKiBFQk1MTWF4U2l6ZUxlbmd0aCAqLywgZGF0YTogOCB9LFxuICAgICAgeyBpZDogMTcwMjYgLyogRG9jVHlwZSAqLywgZGF0YTogX19wcml2YXRlR2V0KHRoaXMsIF9vcHRpb25zKS50eXBlID8/IFwid2VibVwiIH0sXG4gICAgICB7IGlkOiAxNzAzMSAvKiBEb2NUeXBlVmVyc2lvbiAqLywgZGF0YTogMiB9LFxuICAgICAgeyBpZDogMTcwMjkgLyogRG9jVHlwZVJlYWRWZXJzaW9uICovLCBkYXRhOiAyIH1cbiAgICBdIH07XG4gICAgX19wcml2YXRlR2V0KHRoaXMsIF93cml0ZXIpLndyaXRlRUJNTChlYm1sSGVhZGVyKTtcbiAgfTtcbiAgX2NyZWF0ZUNvZGVjUHJpdmF0ZVBsYWNlaG9sZGVycyA9IG5ldyBXZWFrU2V0KCk7XG4gIGNyZWF0ZUNvZGVjUHJpdmF0ZVBsYWNlaG9sZGVyc19mbiA9IGZ1bmN0aW9uKCkge1xuICAgIF9fcHJpdmF0ZVNldCh0aGlzLCBfdmlkZW9Db2RlY1ByaXZhdGUsIHsgaWQ6IDIzNiAvKiBWb2lkICovLCBzaXplOiA0LCBkYXRhOiBuZXcgVWludDhBcnJheShDT0RFQ19QUklWQVRFX01BWF9TSVpFKSB9KTtcbiAgICBfX3ByaXZhdGVTZXQodGhpcywgX2F1ZGlvQ29kZWNQcml2YXRlLCB7IGlkOiAyMzYgLyogVm9pZCAqLywgc2l6ZTogNCwgZGF0YTogbmV3IFVpbnQ4QXJyYXkoQ09ERUNfUFJJVkFURV9NQVhfU0laRSkgfSk7XG4gICAgX19wcml2YXRlU2V0KHRoaXMsIF9zdWJ0aXRsZUNvZGVjUHJpdmF0ZSwgeyBpZDogMjM2IC8qIFZvaWQgKi8sIHNpemU6IDQsIGRhdGE6IG5ldyBVaW50OEFycmF5KENPREVDX1BSSVZBVEVfTUFYX1NJWkUpIH0pO1xuICB9O1xuICBfY3JlYXRlQ29sb3VyRWxlbWVudCA9IG5ldyBXZWFrU2V0KCk7XG4gIGNyZWF0ZUNvbG91ckVsZW1lbnRfZm4gPSBmdW5jdGlvbigpIHtcbiAgICBfX3ByaXZhdGVTZXQodGhpcywgX2NvbG91ckVsZW1lbnQsIHsgaWQ6IDIxOTM2IC8qIENvbG91ciAqLywgZGF0YTogW1xuICAgICAgeyBpZDogMjE5MzcgLyogTWF0cml4Q29lZmZpY2llbnRzICovLCBkYXRhOiAyIH0sXG4gICAgICB7IGlkOiAyMTk0NiAvKiBUcmFuc2ZlckNoYXJhY3RlcmlzdGljcyAqLywgZGF0YTogMiB9LFxuICAgICAgeyBpZDogMjE5NDcgLyogUHJpbWFyaWVzICovLCBkYXRhOiAyIH0sXG4gICAgICB7IGlkOiAyMTk0NSAvKiBSYW5nZSAqLywgZGF0YTogMCB9XG4gICAgXSB9KTtcbiAgfTtcbiAgX2NyZWF0ZVNlZWtIZWFkID0gbmV3IFdlYWtTZXQoKTtcbiAgY3JlYXRlU2Vla0hlYWRfZm4gPSBmdW5jdGlvbigpIHtcbiAgICBjb25zdCBrYXhDdWVzID0gbmV3IFVpbnQ4QXJyYXkoWzI4LCA4MywgMTg3LCAxMDddKTtcbiAgICBjb25zdCBrYXhJbmZvID0gbmV3IFVpbnQ4QXJyYXkoWzIxLCA3MywgMTY5LCAxMDJdKTtcbiAgICBjb25zdCBrYXhUcmFja3MgPSBuZXcgVWludDhBcnJheShbMjIsIDg0LCAxNzQsIDEwN10pO1xuICAgIGxldCBzZWVrSGVhZCA9IHsgaWQ6IDI5MDI5ODc0MCAvKiBTZWVrSGVhZCAqLywgZGF0YTogW1xuICAgICAgeyBpZDogMTk4OTkgLyogU2VlayAqLywgZGF0YTogW1xuICAgICAgICB7IGlkOiAyMTQxOSAvKiBTZWVrSUQgKi8sIGRhdGE6IGtheEN1ZXMgfSxcbiAgICAgICAgeyBpZDogMjE0MjAgLyogU2Vla1Bvc2l0aW9uICovLCBzaXplOiA1LCBkYXRhOiAwIH1cbiAgICAgIF0gfSxcbiAgICAgIHsgaWQ6IDE5ODk5IC8qIFNlZWsgKi8sIGRhdGE6IFtcbiAgICAgICAgeyBpZDogMjE0MTkgLyogU2Vla0lEICovLCBkYXRhOiBrYXhJbmZvIH0sXG4gICAgICAgIHsgaWQ6IDIxNDIwIC8qIFNlZWtQb3NpdGlvbiAqLywgc2l6ZTogNSwgZGF0YTogMCB9XG4gICAgICBdIH0sXG4gICAgICB7IGlkOiAxOTg5OSAvKiBTZWVrICovLCBkYXRhOiBbXG4gICAgICAgIHsgaWQ6IDIxNDE5IC8qIFNlZWtJRCAqLywgZGF0YToga2F4VHJhY2tzIH0sXG4gICAgICAgIHsgaWQ6IDIxNDIwIC8qIFNlZWtQb3NpdGlvbiAqLywgc2l6ZTogNSwgZGF0YTogMCB9XG4gICAgICBdIH1cbiAgICBdIH07XG4gICAgX19wcml2YXRlU2V0KHRoaXMsIF9zZWVrSGVhZCwgc2Vla0hlYWQpO1xuICB9O1xuICBfY3JlYXRlU2VnbWVudEluZm8gPSBuZXcgV2Vha1NldCgpO1xuICBjcmVhdGVTZWdtZW50SW5mb19mbiA9IGZ1bmN0aW9uKCkge1xuICAgIGxldCBzZWdtZW50RHVyYXRpb24gPSB7IGlkOiAxNzU0NSAvKiBEdXJhdGlvbiAqLywgZGF0YTogbmV3IEVCTUxGbG9hdDY0KDApIH07XG4gICAgX19wcml2YXRlU2V0KHRoaXMsIF9zZWdtZW50RHVyYXRpb24sIHNlZ21lbnREdXJhdGlvbik7XG4gICAgbGV0IHNlZ21lbnRJbmZvID0geyBpZDogMzU3MTQ5MDMwIC8qIEluZm8gKi8sIGRhdGE6IFtcbiAgICAgIHsgaWQ6IDI4MDc3MjkgLyogVGltZXN0YW1wU2NhbGUgKi8sIGRhdGE6IDFlNiB9LFxuICAgICAgeyBpZDogMTk4NDAgLyogTXV4aW5nQXBwICovLCBkYXRhOiBBUFBfTkFNRSB9LFxuICAgICAgeyBpZDogMjIzMzcgLyogV3JpdGluZ0FwcCAqLywgZGF0YTogQVBQX05BTUUgfSxcbiAgICAgICFfX3ByaXZhdGVHZXQodGhpcywgX29wdGlvbnMpLnN0cmVhbWluZyA/IHNlZ21lbnREdXJhdGlvbiA6IG51bGxcbiAgICBdIH07XG4gICAgX19wcml2YXRlU2V0KHRoaXMsIF9zZWdtZW50SW5mbywgc2VnbWVudEluZm8pO1xuICB9O1xuICBfY3JlYXRlVHJhY2tzID0gbmV3IFdlYWtTZXQoKTtcbiAgY3JlYXRlVHJhY2tzX2ZuID0gZnVuY3Rpb24oKSB7XG4gICAgbGV0IHRyYWNrc0VsZW1lbnQgPSB7IGlkOiAzNzQ2NDg0MjcgLyogVHJhY2tzICovLCBkYXRhOiBbXSB9O1xuICAgIF9fcHJpdmF0ZVNldCh0aGlzLCBfdHJhY2tzRWxlbWVudCwgdHJhY2tzRWxlbWVudCk7XG4gICAgaWYgKF9fcHJpdmF0ZUdldCh0aGlzLCBfb3B0aW9ucykudmlkZW8pIHtcbiAgICAgIHRyYWNrc0VsZW1lbnQuZGF0YS5wdXNoKHsgaWQ6IDE3NCAvKiBUcmFja0VudHJ5ICovLCBkYXRhOiBbXG4gICAgICAgIHsgaWQ6IDIxNSAvKiBUcmFja051bWJlciAqLywgZGF0YTogVklERU9fVFJBQ0tfTlVNQkVSIH0sXG4gICAgICAgIHsgaWQ6IDI5NjM3IC8qIFRyYWNrVUlEICovLCBkYXRhOiBWSURFT19UUkFDS19OVU1CRVIgfSxcbiAgICAgICAgeyBpZDogMTMxIC8qIFRyYWNrVHlwZSAqLywgZGF0YTogVklERU9fVFJBQ0tfVFlQRSB9LFxuICAgICAgICB7IGlkOiAxMzQgLyogQ29kZWNJRCAqLywgZGF0YTogX19wcml2YXRlR2V0KHRoaXMsIF9vcHRpb25zKS52aWRlby5jb2RlYyB9LFxuICAgICAgICBfX3ByaXZhdGVHZXQodGhpcywgX3ZpZGVvQ29kZWNQcml2YXRlKSxcbiAgICAgICAgX19wcml2YXRlR2V0KHRoaXMsIF9vcHRpb25zKS52aWRlby5mcmFtZVJhdGUgPyB7IGlkOiAyMzUyMDAzIC8qIERlZmF1bHREdXJhdGlvbiAqLywgZGF0YTogMWU5IC8gX19wcml2YXRlR2V0KHRoaXMsIF9vcHRpb25zKS52aWRlby5mcmFtZVJhdGUgfSA6IG51bGwsXG4gICAgICAgIHsgaWQ6IDIyNCAvKiBWaWRlbyAqLywgZGF0YTogW1xuICAgICAgICAgIHsgaWQ6IDE3NiAvKiBQaXhlbFdpZHRoICovLCBkYXRhOiBfX3ByaXZhdGVHZXQodGhpcywgX29wdGlvbnMpLnZpZGVvLndpZHRoIH0sXG4gICAgICAgICAgeyBpZDogMTg2IC8qIFBpeGVsSGVpZ2h0ICovLCBkYXRhOiBfX3ByaXZhdGVHZXQodGhpcywgX29wdGlvbnMpLnZpZGVvLmhlaWdodCB9LFxuICAgICAgICAgIF9fcHJpdmF0ZUdldCh0aGlzLCBfb3B0aW9ucykudmlkZW8uYWxwaGEgPyB7IGlkOiAyMTQ0MCAvKiBBbHBoYU1vZGUgKi8sIGRhdGE6IDEgfSA6IG51bGwsXG4gICAgICAgICAgX19wcml2YXRlR2V0KHRoaXMsIF9jb2xvdXJFbGVtZW50KVxuICAgICAgICBdIH1cbiAgICAgIF0gfSk7XG4gICAgfVxuICAgIGlmIChfX3ByaXZhdGVHZXQodGhpcywgX29wdGlvbnMpLmF1ZGlvKSB7XG4gICAgICBfX3ByaXZhdGVTZXQodGhpcywgX2F1ZGlvQ29kZWNQcml2YXRlLCBfX3ByaXZhdGVHZXQodGhpcywgX29wdGlvbnMpLnN0cmVhbWluZyA/IF9fcHJpdmF0ZUdldCh0aGlzLCBfYXVkaW9Db2RlY1ByaXZhdGUpIHx8IG51bGwgOiB7IGlkOiAyMzYgLyogVm9pZCAqLywgc2l6ZTogNCwgZGF0YTogbmV3IFVpbnQ4QXJyYXkoQ09ERUNfUFJJVkFURV9NQVhfU0laRSkgfSk7XG4gICAgICB0cmFja3NFbGVtZW50LmRhdGEucHVzaCh7IGlkOiAxNzQgLyogVHJhY2tFbnRyeSAqLywgZGF0YTogW1xuICAgICAgICB7IGlkOiAyMTUgLyogVHJhY2tOdW1iZXIgKi8sIGRhdGE6IEFVRElPX1RSQUNLX05VTUJFUiB9LFxuICAgICAgICB7IGlkOiAyOTYzNyAvKiBUcmFja1VJRCAqLywgZGF0YTogQVVESU9fVFJBQ0tfTlVNQkVSIH0sXG4gICAgICAgIHsgaWQ6IDEzMSAvKiBUcmFja1R5cGUgKi8sIGRhdGE6IEFVRElPX1RSQUNLX1RZUEUgfSxcbiAgICAgICAgeyBpZDogMTM0IC8qIENvZGVjSUQgKi8sIGRhdGE6IF9fcHJpdmF0ZUdldCh0aGlzLCBfb3B0aW9ucykuYXVkaW8uY29kZWMgfSxcbiAgICAgICAgX19wcml2YXRlR2V0KHRoaXMsIF9hdWRpb0NvZGVjUHJpdmF0ZSksXG4gICAgICAgIHsgaWQ6IDIyNSAvKiBBdWRpbyAqLywgZGF0YTogW1xuICAgICAgICAgIHsgaWQ6IDE4MSAvKiBTYW1wbGluZ0ZyZXF1ZW5jeSAqLywgZGF0YTogbmV3IEVCTUxGbG9hdDMyKF9fcHJpdmF0ZUdldCh0aGlzLCBfb3B0aW9ucykuYXVkaW8uc2FtcGxlUmF0ZSkgfSxcbiAgICAgICAgICB7IGlkOiAxNTkgLyogQ2hhbm5lbHMgKi8sIGRhdGE6IF9fcHJpdmF0ZUdldCh0aGlzLCBfb3B0aW9ucykuYXVkaW8ubnVtYmVyT2ZDaGFubmVscyB9LFxuICAgICAgICAgIF9fcHJpdmF0ZUdldCh0aGlzLCBfb3B0aW9ucykuYXVkaW8uYml0RGVwdGggPyB7IGlkOiAyNTE4OCAvKiBCaXREZXB0aCAqLywgZGF0YTogX19wcml2YXRlR2V0KHRoaXMsIF9vcHRpb25zKS5hdWRpby5iaXREZXB0aCB9IDogbnVsbFxuICAgICAgICBdIH1cbiAgICAgIF0gfSk7XG4gICAgfVxuICAgIGlmIChfX3ByaXZhdGVHZXQodGhpcywgX29wdGlvbnMpLnN1YnRpdGxlcykge1xuICAgICAgdHJhY2tzRWxlbWVudC5kYXRhLnB1c2goeyBpZDogMTc0IC8qIFRyYWNrRW50cnkgKi8sIGRhdGE6IFtcbiAgICAgICAgeyBpZDogMjE1IC8qIFRyYWNrTnVtYmVyICovLCBkYXRhOiBTVUJUSVRMRV9UUkFDS19OVU1CRVIgfSxcbiAgICAgICAgeyBpZDogMjk2MzcgLyogVHJhY2tVSUQgKi8sIGRhdGE6IFNVQlRJVExFX1RSQUNLX05VTUJFUiB9LFxuICAgICAgICB7IGlkOiAxMzEgLyogVHJhY2tUeXBlICovLCBkYXRhOiBTVUJUSVRMRV9UUkFDS19UWVBFIH0sXG4gICAgICAgIHsgaWQ6IDEzNCAvKiBDb2RlY0lEICovLCBkYXRhOiBfX3ByaXZhdGVHZXQodGhpcywgX29wdGlvbnMpLnN1YnRpdGxlcy5jb2RlYyB9LFxuICAgICAgICBfX3ByaXZhdGVHZXQodGhpcywgX3N1YnRpdGxlQ29kZWNQcml2YXRlKVxuICAgICAgXSB9KTtcbiAgICB9XG4gIH07XG4gIF9jcmVhdGVTZWdtZW50ID0gbmV3IFdlYWtTZXQoKTtcbiAgY3JlYXRlU2VnbWVudF9mbiA9IGZ1bmN0aW9uKCkge1xuICAgIGxldCBzZWdtZW50ID0ge1xuICAgICAgaWQ6IDQwODEyNTU0MyAvKiBTZWdtZW50ICovLFxuICAgICAgc2l6ZTogX19wcml2YXRlR2V0KHRoaXMsIF9vcHRpb25zKS5zdHJlYW1pbmcgPyAtMSA6IFNFR01FTlRfU0laRV9CWVRFUyxcbiAgICAgIGRhdGE6IFtcbiAgICAgICAgIV9fcHJpdmF0ZUdldCh0aGlzLCBfb3B0aW9ucykuc3RyZWFtaW5nID8gX19wcml2YXRlR2V0KHRoaXMsIF9zZWVrSGVhZCkgOiBudWxsLFxuICAgICAgICBfX3ByaXZhdGVHZXQodGhpcywgX3NlZ21lbnRJbmZvKSxcbiAgICAgICAgX19wcml2YXRlR2V0KHRoaXMsIF90cmFja3NFbGVtZW50KVxuICAgICAgXVxuICAgIH07XG4gICAgX19wcml2YXRlU2V0KHRoaXMsIF9zZWdtZW50LCBzZWdtZW50KTtcbiAgICBfX3ByaXZhdGVHZXQodGhpcywgX3dyaXRlcikud3JpdGVFQk1MKHNlZ21lbnQpO1xuICAgIGlmIChfX3ByaXZhdGVHZXQodGhpcywgX3dyaXRlcikgaW5zdGFuY2VvZiBCYXNlU3RyZWFtVGFyZ2V0V3JpdGVyICYmIF9fcHJpdmF0ZUdldCh0aGlzLCBfd3JpdGVyKS50YXJnZXQub3B0aW9ucy5vbkhlYWRlcikge1xuICAgICAgbGV0IHsgZGF0YSwgc3RhcnQgfSA9IF9fcHJpdmF0ZUdldCh0aGlzLCBfd3JpdGVyKS5nZXRUcmFja2VkV3JpdGVzKCk7XG4gICAgICBfX3ByaXZhdGVHZXQodGhpcywgX3dyaXRlcikudGFyZ2V0Lm9wdGlvbnMub25IZWFkZXIoZGF0YSwgc3RhcnQpO1xuICAgIH1cbiAgfTtcbiAgX2NyZWF0ZUN1ZXMgPSBuZXcgV2Vha1NldCgpO1xuICBjcmVhdGVDdWVzX2ZuID0gZnVuY3Rpb24oKSB7XG4gICAgX19wcml2YXRlU2V0KHRoaXMsIF9jdWVzLCB7IGlkOiA0NzUyNDk1MTUgLyogQ3VlcyAqLywgZGF0YTogW10gfSk7XG4gIH07XG4gIF9tYXliZUZsdXNoU3RyZWFtaW5nVGFyZ2V0V3JpdGVyID0gbmV3IFdlYWtTZXQoKTtcbiAgbWF5YmVGbHVzaFN0cmVhbWluZ1RhcmdldFdyaXRlcl9mbiA9IGZ1bmN0aW9uKCkge1xuICAgIGlmIChfX3ByaXZhdGVHZXQodGhpcywgX3dyaXRlcikgaW5zdGFuY2VvZiBTdHJlYW1UYXJnZXRXcml0ZXIpIHtcbiAgICAgIF9fcHJpdmF0ZUdldCh0aGlzLCBfd3JpdGVyKS5mbHVzaCgpO1xuICAgIH1cbiAgfTtcbiAgX3NlZ21lbnREYXRhT2Zmc2V0ID0gbmV3IFdlYWtTZXQoKTtcbiAgc2VnbWVudERhdGFPZmZzZXRfZ2V0ID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIF9fcHJpdmF0ZUdldCh0aGlzLCBfd3JpdGVyKS5kYXRhT2Zmc2V0cy5nZXQoX19wcml2YXRlR2V0KHRoaXMsIF9zZWdtZW50KSk7XG4gIH07XG4gIF93cml0ZVZpZGVvRGVjb2RlckNvbmZpZyA9IG5ldyBXZWFrU2V0KCk7XG4gIHdyaXRlVmlkZW9EZWNvZGVyQ29uZmlnX2ZuID0gZnVuY3Rpb24obWV0YSkge1xuICAgIGlmICghbWV0YS5kZWNvZGVyQ29uZmlnKVxuICAgICAgcmV0dXJuO1xuICAgIGlmIChtZXRhLmRlY29kZXJDb25maWcuY29sb3JTcGFjZSkge1xuICAgICAgbGV0IGNvbG9yU3BhY2UgPSBtZXRhLmRlY29kZXJDb25maWcuY29sb3JTcGFjZTtcbiAgICAgIF9fcHJpdmF0ZVNldCh0aGlzLCBfY29sb3JTcGFjZSwgY29sb3JTcGFjZSk7XG4gICAgICBfX3ByaXZhdGVHZXQodGhpcywgX2NvbG91ckVsZW1lbnQpLmRhdGEgPSBbXG4gICAgICAgIHsgaWQ6IDIxOTM3IC8qIE1hdHJpeENvZWZmaWNpZW50cyAqLywgZGF0YToge1xuICAgICAgICAgIFwicmdiXCI6IDEsXG4gICAgICAgICAgXCJidDcwOVwiOiAxLFxuICAgICAgICAgIFwiYnQ0NzBiZ1wiOiA1LFxuICAgICAgICAgIFwic21wdGUxNzBtXCI6IDZcbiAgICAgICAgfVtjb2xvclNwYWNlLm1hdHJpeF0gfSxcbiAgICAgICAgeyBpZDogMjE5NDYgLyogVHJhbnNmZXJDaGFyYWN0ZXJpc3RpY3MgKi8sIGRhdGE6IHtcbiAgICAgICAgICBcImJ0NzA5XCI6IDEsXG4gICAgICAgICAgXCJzbXB0ZTE3MG1cIjogNixcbiAgICAgICAgICBcImllYzYxOTY2LTItMVwiOiAxM1xuICAgICAgICB9W2NvbG9yU3BhY2UudHJhbnNmZXJdIH0sXG4gICAgICAgIHsgaWQ6IDIxOTQ3IC8qIFByaW1hcmllcyAqLywgZGF0YToge1xuICAgICAgICAgIFwiYnQ3MDlcIjogMSxcbiAgICAgICAgICBcImJ0NDcwYmdcIjogNSxcbiAgICAgICAgICBcInNtcHRlMTcwbVwiOiA2XG4gICAgICAgIH1bY29sb3JTcGFjZS5wcmltYXJpZXNdIH0sXG4gICAgICAgIHsgaWQ6IDIxOTQ1IC8qIFJhbmdlICovLCBkYXRhOiBbMSwgMl1bTnVtYmVyKGNvbG9yU3BhY2UuZnVsbFJhbmdlKV0gfVxuICAgICAgXTtcbiAgICAgIGlmICghX19wcml2YXRlR2V0KHRoaXMsIF9vcHRpb25zKS5zdHJlYW1pbmcpIHtcbiAgICAgICAgbGV0IGVuZFBvcyA9IF9fcHJpdmF0ZUdldCh0aGlzLCBfd3JpdGVyKS5wb3M7XG4gICAgICAgIF9fcHJpdmF0ZUdldCh0aGlzLCBfd3JpdGVyKS5zZWVrKF9fcHJpdmF0ZUdldCh0aGlzLCBfd3JpdGVyKS5vZmZzZXRzLmdldChfX3ByaXZhdGVHZXQodGhpcywgX2NvbG91ckVsZW1lbnQpKSk7XG4gICAgICAgIF9fcHJpdmF0ZUdldCh0aGlzLCBfd3JpdGVyKS53cml0ZUVCTUwoX19wcml2YXRlR2V0KHRoaXMsIF9jb2xvdXJFbGVtZW50KSk7XG4gICAgICAgIF9fcHJpdmF0ZUdldCh0aGlzLCBfd3JpdGVyKS5zZWVrKGVuZFBvcyk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChtZXRhLmRlY29kZXJDb25maWcuZGVzY3JpcHRpb24pIHtcbiAgICAgIGlmIChfX3ByaXZhdGVHZXQodGhpcywgX29wdGlvbnMpLnN0cmVhbWluZykge1xuICAgICAgICBfX3ByaXZhdGVTZXQodGhpcywgX3ZpZGVvQ29kZWNQcml2YXRlLCBfX3ByaXZhdGVNZXRob2QodGhpcywgX2NyZWF0ZUNvZGVjUHJpdmF0ZUVsZW1lbnQsIGNyZWF0ZUNvZGVjUHJpdmF0ZUVsZW1lbnRfZm4pLmNhbGwodGhpcywgbWV0YS5kZWNvZGVyQ29uZmlnLmRlc2NyaXB0aW9uKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBfX3ByaXZhdGVNZXRob2QodGhpcywgX3dyaXRlQ29kZWNQcml2YXRlLCB3cml0ZUNvZGVjUHJpdmF0ZV9mbikuY2FsbCh0aGlzLCBfX3ByaXZhdGVHZXQodGhpcywgX3ZpZGVvQ29kZWNQcml2YXRlKSwgbWV0YS5kZWNvZGVyQ29uZmlnLmRlc2NyaXB0aW9uKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG4gIF9maXhWUDlDb2xvclNwYWNlID0gbmV3IFdlYWtTZXQoKTtcbiAgZml4VlA5Q29sb3JTcGFjZV9mbiA9IGZ1bmN0aW9uKGNodW5rKSB7XG4gICAgaWYgKGNodW5rLnR5cGUgIT09IFwia2V5XCIpXG4gICAgICByZXR1cm47XG4gICAgaWYgKCFfX3ByaXZhdGVHZXQodGhpcywgX2NvbG9yU3BhY2UpKVxuICAgICAgcmV0dXJuO1xuICAgIGxldCBpID0gMDtcbiAgICBpZiAocmVhZEJpdHMoY2h1bmsuZGF0YSwgMCwgMikgIT09IDIpXG4gICAgICByZXR1cm47XG4gICAgaSArPSAyO1xuICAgIGxldCBwcm9maWxlID0gKHJlYWRCaXRzKGNodW5rLmRhdGEsIGkgKyAxLCBpICsgMikgPDwgMSkgKyByZWFkQml0cyhjaHVuay5kYXRhLCBpICsgMCwgaSArIDEpO1xuICAgIGkgKz0gMjtcbiAgICBpZiAocHJvZmlsZSA9PT0gMylcbiAgICAgIGkrKztcbiAgICBsZXQgc2hvd0V4aXN0aW5nRnJhbWUgPSByZWFkQml0cyhjaHVuay5kYXRhLCBpICsgMCwgaSArIDEpO1xuICAgIGkrKztcbiAgICBpZiAoc2hvd0V4aXN0aW5nRnJhbWUpXG4gICAgICByZXR1cm47XG4gICAgbGV0IGZyYW1lVHlwZSA9IHJlYWRCaXRzKGNodW5rLmRhdGEsIGkgKyAwLCBpICsgMSk7XG4gICAgaSsrO1xuICAgIGlmIChmcmFtZVR5cGUgIT09IDApXG4gICAgICByZXR1cm47XG4gICAgaSArPSAyO1xuICAgIGxldCBzeW5jQ29kZSA9IHJlYWRCaXRzKGNodW5rLmRhdGEsIGkgKyAwLCBpICsgMjQpO1xuICAgIGkgKz0gMjQ7XG4gICAgaWYgKHN5bmNDb2RlICE9PSA0ODE3NzMwKVxuICAgICAgcmV0dXJuO1xuICAgIGlmIChwcm9maWxlID49IDIpXG4gICAgICBpKys7XG4gICAgbGV0IGNvbG9yU3BhY2VJRCA9IHtcbiAgICAgIFwicmdiXCI6IDcsXG4gICAgICBcImJ0NzA5XCI6IDIsXG4gICAgICBcImJ0NDcwYmdcIjogMSxcbiAgICAgIFwic21wdGUxNzBtXCI6IDNcbiAgICB9W19fcHJpdmF0ZUdldCh0aGlzLCBfY29sb3JTcGFjZSkubWF0cml4XTtcbiAgICB3cml0ZUJpdHMoY2h1bmsuZGF0YSwgaSArIDAsIGkgKyAzLCBjb2xvclNwYWNlSUQpO1xuICB9O1xuICBfd3JpdGVTdWJ0aXRsZUNodW5rcyA9IG5ldyBXZWFrU2V0KCk7XG4gIHdyaXRlU3VidGl0bGVDaHVua3NfZm4gPSBmdW5jdGlvbigpIHtcbiAgICBsZXQgbGFzdFdyaXR0ZW5NZWRpYVRpbWVzdGFtcCA9IE1hdGgubWluKFxuICAgICAgX19wcml2YXRlR2V0KHRoaXMsIF9vcHRpb25zKS52aWRlbyA/IF9fcHJpdmF0ZUdldCh0aGlzLCBfbGFzdFZpZGVvVGltZXN0YW1wKSA6IEluZmluaXR5LFxuICAgICAgX19wcml2YXRlR2V0KHRoaXMsIF9vcHRpb25zKS5hdWRpbyA/IF9fcHJpdmF0ZUdldCh0aGlzLCBfbGFzdEF1ZGlvVGltZXN0YW1wKSA6IEluZmluaXR5XG4gICAgKTtcbiAgICBsZXQgcXVldWUgPSBfX3ByaXZhdGVHZXQodGhpcywgX3N1YnRpdGxlQ2h1bmtRdWV1ZSk7XG4gICAgd2hpbGUgKHF1ZXVlLmxlbmd0aCA+IDAgJiYgcXVldWVbMF0udGltZXN0YW1wIDw9IGxhc3RXcml0dGVuTWVkaWFUaW1lc3RhbXApIHtcbiAgICAgIF9fcHJpdmF0ZU1ldGhvZCh0aGlzLCBfd3JpdGVCbG9jaywgd3JpdGVCbG9ja19mbikuY2FsbCh0aGlzLCBxdWV1ZS5zaGlmdCgpLCAhX19wcml2YXRlR2V0KHRoaXMsIF9vcHRpb25zKS52aWRlbyAmJiAhX19wcml2YXRlR2V0KHRoaXMsIF9vcHRpb25zKS5hdWRpbyk7XG4gICAgfVxuICB9O1xuICBfY3JlYXRlSW50ZXJuYWxDaHVuayA9IG5ldyBXZWFrU2V0KCk7XG4gIGNyZWF0ZUludGVybmFsQ2h1bmtfZm4gPSBmdW5jdGlvbihkYXRhLCB0eXBlLCB0aW1lc3RhbXAsIHRyYWNrTnVtYmVyLCBkdXJhdGlvbiwgYWRkaXRpb25zKSB7XG4gICAgbGV0IGFkanVzdGVkVGltZXN0YW1wID0gX19wcml2YXRlTWV0aG9kKHRoaXMsIF92YWxpZGF0ZVRpbWVzdGFtcCwgdmFsaWRhdGVUaW1lc3RhbXBfZm4pLmNhbGwodGhpcywgdGltZXN0YW1wLCB0cmFja051bWJlcik7XG4gICAgbGV0IGludGVybmFsQ2h1bmsgPSB7XG4gICAgICBkYXRhLFxuICAgICAgYWRkaXRpb25zLFxuICAgICAgdHlwZSxcbiAgICAgIHRpbWVzdGFtcDogYWRqdXN0ZWRUaW1lc3RhbXAsXG4gICAgICBkdXJhdGlvbixcbiAgICAgIHRyYWNrTnVtYmVyXG4gICAgfTtcbiAgICByZXR1cm4gaW50ZXJuYWxDaHVuaztcbiAgfTtcbiAgX3ZhbGlkYXRlVGltZXN0YW1wID0gbmV3IFdlYWtTZXQoKTtcbiAgdmFsaWRhdGVUaW1lc3RhbXBfZm4gPSBmdW5jdGlvbih0aW1lc3RhbXAsIHRyYWNrTnVtYmVyKSB7XG4gICAgbGV0IGxhc3RUaW1lc3RhbXAgPSB0cmFja051bWJlciA9PT0gVklERU9fVFJBQ0tfTlVNQkVSID8gX19wcml2YXRlR2V0KHRoaXMsIF9sYXN0VmlkZW9UaW1lc3RhbXApIDogdHJhY2tOdW1iZXIgPT09IEFVRElPX1RSQUNLX05VTUJFUiA/IF9fcHJpdmF0ZUdldCh0aGlzLCBfbGFzdEF1ZGlvVGltZXN0YW1wKSA6IF9fcHJpdmF0ZUdldCh0aGlzLCBfbGFzdFN1YnRpdGxlVGltZXN0YW1wKTtcbiAgICBpZiAodHJhY2tOdW1iZXIgIT09IFNVQlRJVExFX1RSQUNLX05VTUJFUikge1xuICAgICAgbGV0IGZpcnN0VGltZXN0YW1wID0gdHJhY2tOdW1iZXIgPT09IFZJREVPX1RSQUNLX05VTUJFUiA/IF9fcHJpdmF0ZUdldCh0aGlzLCBfZmlyc3RWaWRlb1RpbWVzdGFtcCkgOiBfX3ByaXZhdGVHZXQodGhpcywgX2ZpcnN0QXVkaW9UaW1lc3RhbXApO1xuICAgICAgaWYgKF9fcHJpdmF0ZUdldCh0aGlzLCBfb3B0aW9ucykuZmlyc3RUaW1lc3RhbXBCZWhhdmlvciA9PT0gXCJzdHJpY3RcIiAmJiBsYXN0VGltZXN0YW1wID09PSAtMSAmJiB0aW1lc3RhbXAgIT09IDApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgIGBUaGUgZmlyc3QgY2h1bmsgZm9yIHlvdXIgbWVkaWEgdHJhY2sgbXVzdCBoYXZlIGEgdGltZXN0YW1wIG9mIDAgKHJlY2VpdmVkICR7dGltZXN0YW1wfSkuIE5vbi16ZXJvIGZpcnN0IHRpbWVzdGFtcHMgYXJlIG9mdGVuIGNhdXNlZCBieSBkaXJlY3RseSBwaXBpbmcgZnJhbWVzIG9yIGF1ZGlvIGRhdGEgZnJvbSBhIE1lZGlhU3RyZWFtVHJhY2sgaW50byB0aGUgZW5jb2Rlci4gVGhlaXIgdGltZXN0YW1wcyBhcmUgdHlwaWNhbGx5IHJlbGF0aXZlIHRvIHRoZSBhZ2Ugb2YgdGhlIGRvY3VtZW50LCB3aGljaCBpcyBwcm9iYWJseSB3aGF0IHlvdSB3YW50LlxuXG5JZiB5b3Ugd2FudCB0byBvZmZzZXQgYWxsIHRpbWVzdGFtcHMgb2YgYSB0cmFjayBzdWNoIHRoYXQgdGhlIGZpcnN0IG9uZSBpcyB6ZXJvLCBzZXQgZmlyc3RUaW1lc3RhbXBCZWhhdmlvcjogJ29mZnNldCcgaW4gdGhlIG9wdGlvbnMuXG5JZiB5b3Ugd2FudCB0byBhbGxvdyBub24temVybyBmaXJzdCB0aW1lc3RhbXBzLCBzZXQgZmlyc3RUaW1lc3RhbXBCZWhhdmlvcjogJ3Blcm1pc3NpdmUnLlxuYFxuICAgICAgICApO1xuICAgICAgfSBlbHNlIGlmIChfX3ByaXZhdGVHZXQodGhpcywgX29wdGlvbnMpLmZpcnN0VGltZXN0YW1wQmVoYXZpb3IgPT09IFwib2Zmc2V0XCIpIHtcbiAgICAgICAgdGltZXN0YW1wIC09IGZpcnN0VGltZXN0YW1wO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAodGltZXN0YW1wIDwgbGFzdFRpbWVzdGFtcCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBgVGltZXN0YW1wcyBtdXN0IGJlIG1vbm90b25pY2FsbHkgaW5jcmVhc2luZyAod2VudCBmcm9tICR7bGFzdFRpbWVzdGFtcH0gdG8gJHt0aW1lc3RhbXB9KS5gXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAodGltZXN0YW1wIDwgMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBUaW1lc3RhbXBzIG11c3QgYmUgbm9uLW5lZ2F0aXZlIChyZWNlaXZlZCAke3RpbWVzdGFtcH0pLmApO1xuICAgIH1cbiAgICByZXR1cm4gdGltZXN0YW1wO1xuICB9O1xuICBfd3JpdGVCbG9jayA9IG5ldyBXZWFrU2V0KCk7XG4gIHdyaXRlQmxvY2tfZm4gPSBmdW5jdGlvbihjaHVuaywgY2FuQ3JlYXRlTmV3Q2x1c3Rlcikge1xuICAgIGlmIChfX3ByaXZhdGVHZXQodGhpcywgX29wdGlvbnMpLnN0cmVhbWluZyAmJiAhX19wcml2YXRlR2V0KHRoaXMsIF90cmFja3NFbGVtZW50KSkge1xuICAgICAgX19wcml2YXRlTWV0aG9kKHRoaXMsIF9jcmVhdGVUcmFja3MsIGNyZWF0ZVRyYWNrc19mbikuY2FsbCh0aGlzKTtcbiAgICAgIF9fcHJpdmF0ZU1ldGhvZCh0aGlzLCBfY3JlYXRlU2VnbWVudCwgY3JlYXRlU2VnbWVudF9mbikuY2FsbCh0aGlzKTtcbiAgICB9XG4gICAgbGV0IG1zVGltZXN0YW1wID0gTWF0aC5mbG9vcihjaHVuay50aW1lc3RhbXAgLyAxZTMpO1xuICAgIGxldCByZWxhdGl2ZVRpbWVzdGFtcCA9IG1zVGltZXN0YW1wIC0gX19wcml2YXRlR2V0KHRoaXMsIF9jdXJyZW50Q2x1c3RlclRpbWVzdGFtcCk7XG4gICAgbGV0IHNob3VsZENyZWF0ZU5ld0NsdXN0ZXJGcm9tS2V5RnJhbWUgPSBjYW5DcmVhdGVOZXdDbHVzdGVyICYmIGNodW5rLnR5cGUgPT09IFwia2V5XCIgJiYgcmVsYXRpdmVUaW1lc3RhbXAgPj0gMWUzO1xuICAgIGxldCBjbHVzdGVyV291bGRCZVRvb0xvbmcgPSByZWxhdGl2ZVRpbWVzdGFtcCA+PSBNQVhfQ0hVTktfTEVOR1RIX01TO1xuICAgIGlmICghX19wcml2YXRlR2V0KHRoaXMsIF9jdXJyZW50Q2x1c3RlcikgfHwgc2hvdWxkQ3JlYXRlTmV3Q2x1c3RlckZyb21LZXlGcmFtZSB8fCBjbHVzdGVyV291bGRCZVRvb0xvbmcpIHtcbiAgICAgIF9fcHJpdmF0ZU1ldGhvZCh0aGlzLCBfY3JlYXRlTmV3Q2x1c3RlciwgY3JlYXRlTmV3Q2x1c3Rlcl9mbikuY2FsbCh0aGlzLCBtc1RpbWVzdGFtcCk7XG4gICAgICByZWxhdGl2ZVRpbWVzdGFtcCA9IDA7XG4gICAgfVxuICAgIGlmIChyZWxhdGl2ZVRpbWVzdGFtcCA8IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbGV0IHByZWx1ZGUgPSBuZXcgVWludDhBcnJheSg0KTtcbiAgICBsZXQgdmlldyA9IG5ldyBEYXRhVmlldyhwcmVsdWRlLmJ1ZmZlcik7XG4gICAgdmlldy5zZXRVaW50OCgwLCAxMjggfCBjaHVuay50cmFja051bWJlcik7XG4gICAgdmlldy5zZXRJbnQxNigxLCByZWxhdGl2ZVRpbWVzdGFtcCwgZmFsc2UpO1xuICAgIGlmIChjaHVuay5kdXJhdGlvbiA9PT0gdm9pZCAwICYmICFjaHVuay5hZGRpdGlvbnMpIHtcbiAgICAgIHZpZXcuc2V0VWludDgoMywgTnVtYmVyKGNodW5rLnR5cGUgPT09IFwia2V5XCIpIDw8IDcpO1xuICAgICAgbGV0IHNpbXBsZUJsb2NrID0geyBpZDogMTYzIC8qIFNpbXBsZUJsb2NrICovLCBkYXRhOiBbXG4gICAgICAgIHByZWx1ZGUsXG4gICAgICAgIGNodW5rLmRhdGFcbiAgICAgIF0gfTtcbiAgICAgIF9fcHJpdmF0ZUdldCh0aGlzLCBfd3JpdGVyKS53cml0ZUVCTUwoc2ltcGxlQmxvY2spO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgbXNEdXJhdGlvbiA9IE1hdGguZmxvb3IoY2h1bmsuZHVyYXRpb24gLyAxZTMpO1xuICAgICAgbGV0IGJsb2NrR3JvdXAgPSB7IGlkOiAxNjAgLyogQmxvY2tHcm91cCAqLywgZGF0YTogW1xuICAgICAgICB7IGlkOiAxNjEgLyogQmxvY2sgKi8sIGRhdGE6IFtcbiAgICAgICAgICBwcmVsdWRlLFxuICAgICAgICAgIGNodW5rLmRhdGFcbiAgICAgICAgXSB9LFxuICAgICAgICBjaHVuay5kdXJhdGlvbiAhPT0gdm9pZCAwID8geyBpZDogMTU1IC8qIEJsb2NrRHVyYXRpb24gKi8sIGRhdGE6IG1zRHVyYXRpb24gfSA6IG51bGwsXG4gICAgICAgIGNodW5rLmFkZGl0aW9ucyA/IHsgaWQ6IDMwMTEzIC8qIEJsb2NrQWRkaXRpb25zICovLCBkYXRhOiBjaHVuay5hZGRpdGlvbnMgfSA6IG51bGxcbiAgICAgIF0gfTtcbiAgICAgIF9fcHJpdmF0ZUdldCh0aGlzLCBfd3JpdGVyKS53cml0ZUVCTUwoYmxvY2tHcm91cCk7XG4gICAgfVxuICAgIF9fcHJpdmF0ZVNldCh0aGlzLCBfZHVyYXRpb24sIE1hdGgubWF4KF9fcHJpdmF0ZUdldCh0aGlzLCBfZHVyYXRpb24pLCBtc1RpbWVzdGFtcCkpO1xuICB9O1xuICBfY3JlYXRlQ29kZWNQcml2YXRlRWxlbWVudCA9IG5ldyBXZWFrU2V0KCk7XG4gIGNyZWF0ZUNvZGVjUHJpdmF0ZUVsZW1lbnRfZm4gPSBmdW5jdGlvbihkYXRhKSB7XG4gICAgcmV0dXJuIHsgaWQ6IDI1NTA2IC8qIENvZGVjUHJpdmF0ZSAqLywgc2l6ZTogNCwgZGF0YTogbmV3IFVpbnQ4QXJyYXkoZGF0YSkgfTtcbiAgfTtcbiAgX3dyaXRlQ29kZWNQcml2YXRlID0gbmV3IFdlYWtTZXQoKTtcbiAgd3JpdGVDb2RlY1ByaXZhdGVfZm4gPSBmdW5jdGlvbihlbGVtZW50LCBkYXRhKSB7XG4gICAgbGV0IGVuZFBvcyA9IF9fcHJpdmF0ZUdldCh0aGlzLCBfd3JpdGVyKS5wb3M7XG4gICAgX19wcml2YXRlR2V0KHRoaXMsIF93cml0ZXIpLnNlZWsoX19wcml2YXRlR2V0KHRoaXMsIF93cml0ZXIpLm9mZnNldHMuZ2V0KGVsZW1lbnQpKTtcbiAgICBsZXQgY29kZWNQcml2YXRlRWxlbWVudFNpemUgPSAyICsgNCArIGRhdGEuYnl0ZUxlbmd0aDtcbiAgICBsZXQgdm9pZERhdGFTaXplID0gQ09ERUNfUFJJVkFURV9NQVhfU0laRSAtIGNvZGVjUHJpdmF0ZUVsZW1lbnRTaXplO1xuICAgIGlmICh2b2lkRGF0YVNpemUgPCAwKSB7XG4gICAgICBsZXQgbmV3Qnl0ZUxlbmd0aCA9IGRhdGEuYnl0ZUxlbmd0aCArIHZvaWREYXRhU2l6ZTtcbiAgICAgIGlmIChkYXRhIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpIHtcbiAgICAgICAgZGF0YSA9IGRhdGEuc2xpY2UoMCwgbmV3Qnl0ZUxlbmd0aCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkYXRhID0gZGF0YS5idWZmZXIuc2xpY2UoMCwgbmV3Qnl0ZUxlbmd0aCk7XG4gICAgICB9XG4gICAgICB2b2lkRGF0YVNpemUgPSAwO1xuICAgIH1cbiAgICBlbGVtZW50ID0gW1xuICAgICAgX19wcml2YXRlTWV0aG9kKHRoaXMsIF9jcmVhdGVDb2RlY1ByaXZhdGVFbGVtZW50LCBjcmVhdGVDb2RlY1ByaXZhdGVFbGVtZW50X2ZuKS5jYWxsKHRoaXMsIGRhdGEpLFxuICAgICAgeyBpZDogMjM2IC8qIFZvaWQgKi8sIHNpemU6IDQsIGRhdGE6IG5ldyBVaW50OEFycmF5KHZvaWREYXRhU2l6ZSkgfVxuICAgIF07XG4gICAgX19wcml2YXRlR2V0KHRoaXMsIF93cml0ZXIpLndyaXRlRUJNTChlbGVtZW50KTtcbiAgICBfX3ByaXZhdGVHZXQodGhpcywgX3dyaXRlcikuc2VlayhlbmRQb3MpO1xuICB9O1xuICBfY3JlYXRlTmV3Q2x1c3RlciA9IG5ldyBXZWFrU2V0KCk7XG4gIGNyZWF0ZU5ld0NsdXN0ZXJfZm4gPSBmdW5jdGlvbih0aW1lc3RhbXApIHtcbiAgICBpZiAoX19wcml2YXRlR2V0KHRoaXMsIF9jdXJyZW50Q2x1c3RlcikpIHtcbiAgICAgIF9fcHJpdmF0ZU1ldGhvZCh0aGlzLCBfZmluYWxpemVDdXJyZW50Q2x1c3RlciwgZmluYWxpemVDdXJyZW50Q2x1c3Rlcl9mbikuY2FsbCh0aGlzKTtcbiAgICB9XG4gICAgaWYgKF9fcHJpdmF0ZUdldCh0aGlzLCBfd3JpdGVyKSBpbnN0YW5jZW9mIEJhc2VTdHJlYW1UYXJnZXRXcml0ZXIgJiYgX19wcml2YXRlR2V0KHRoaXMsIF93cml0ZXIpLnRhcmdldC5vcHRpb25zLm9uQ2x1c3Rlcikge1xuICAgICAgX19wcml2YXRlR2V0KHRoaXMsIF93cml0ZXIpLnN0YXJ0VHJhY2tpbmdXcml0ZXMoKTtcbiAgICB9XG4gICAgX19wcml2YXRlU2V0KHRoaXMsIF9jdXJyZW50Q2x1c3Rlciwge1xuICAgICAgaWQ6IDUyNDUzMTMxNyAvKiBDbHVzdGVyICovLFxuICAgICAgc2l6ZTogX19wcml2YXRlR2V0KHRoaXMsIF9vcHRpb25zKS5zdHJlYW1pbmcgPyAtMSA6IENMVVNURVJfU0laRV9CWVRFUyxcbiAgICAgIGRhdGE6IFtcbiAgICAgICAgeyBpZDogMjMxIC8qIFRpbWVzdGFtcCAqLywgZGF0YTogdGltZXN0YW1wIH1cbiAgICAgIF1cbiAgICB9KTtcbiAgICBfX3ByaXZhdGVHZXQodGhpcywgX3dyaXRlcikud3JpdGVFQk1MKF9fcHJpdmF0ZUdldCh0aGlzLCBfY3VycmVudENsdXN0ZXIpKTtcbiAgICBfX3ByaXZhdGVTZXQodGhpcywgX2N1cnJlbnRDbHVzdGVyVGltZXN0YW1wLCB0aW1lc3RhbXApO1xuICAgIGxldCBjbHVzdGVyT2Zmc2V0RnJvbVNlZ21lbnQgPSBfX3ByaXZhdGVHZXQodGhpcywgX3dyaXRlcikub2Zmc2V0cy5nZXQoX19wcml2YXRlR2V0KHRoaXMsIF9jdXJyZW50Q2x1c3RlcikpIC0gX19wcml2YXRlR2V0KHRoaXMsIF9zZWdtZW50RGF0YU9mZnNldCwgc2VnbWVudERhdGFPZmZzZXRfZ2V0KTtcbiAgICBfX3ByaXZhdGVHZXQodGhpcywgX2N1ZXMpLmRhdGEucHVzaCh7IGlkOiAxODcgLyogQ3VlUG9pbnQgKi8sIGRhdGE6IFtcbiAgICAgIHsgaWQ6IDE3OSAvKiBDdWVUaW1lICovLCBkYXRhOiB0aW1lc3RhbXAgfSxcbiAgICAgIF9fcHJpdmF0ZUdldCh0aGlzLCBfb3B0aW9ucykudmlkZW8gPyB7IGlkOiAxODMgLyogQ3VlVHJhY2tQb3NpdGlvbnMgKi8sIGRhdGE6IFtcbiAgICAgICAgeyBpZDogMjQ3IC8qIEN1ZVRyYWNrICovLCBkYXRhOiBWSURFT19UUkFDS19OVU1CRVIgfSxcbiAgICAgICAgeyBpZDogMjQxIC8qIEN1ZUNsdXN0ZXJQb3NpdGlvbiAqLywgZGF0YTogY2x1c3Rlck9mZnNldEZyb21TZWdtZW50IH1cbiAgICAgIF0gfSA6IG51bGwsXG4gICAgICBfX3ByaXZhdGVHZXQodGhpcywgX29wdGlvbnMpLmF1ZGlvID8geyBpZDogMTgzIC8qIEN1ZVRyYWNrUG9zaXRpb25zICovLCBkYXRhOiBbXG4gICAgICAgIHsgaWQ6IDI0NyAvKiBDdWVUcmFjayAqLywgZGF0YTogQVVESU9fVFJBQ0tfTlVNQkVSIH0sXG4gICAgICAgIHsgaWQ6IDI0MSAvKiBDdWVDbHVzdGVyUG9zaXRpb24gKi8sIGRhdGE6IGNsdXN0ZXJPZmZzZXRGcm9tU2VnbWVudCB9XG4gICAgICBdIH0gOiBudWxsXG4gICAgXSB9KTtcbiAgfTtcbiAgX2ZpbmFsaXplQ3VycmVudENsdXN0ZXIgPSBuZXcgV2Vha1NldCgpO1xuICBmaW5hbGl6ZUN1cnJlbnRDbHVzdGVyX2ZuID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKCFfX3ByaXZhdGVHZXQodGhpcywgX29wdGlvbnMpLnN0cmVhbWluZykge1xuICAgICAgbGV0IGNsdXN0ZXJTaXplID0gX19wcml2YXRlR2V0KHRoaXMsIF93cml0ZXIpLnBvcyAtIF9fcHJpdmF0ZUdldCh0aGlzLCBfd3JpdGVyKS5kYXRhT2Zmc2V0cy5nZXQoX19wcml2YXRlR2V0KHRoaXMsIF9jdXJyZW50Q2x1c3RlcikpO1xuICAgICAgbGV0IGVuZFBvcyA9IF9fcHJpdmF0ZUdldCh0aGlzLCBfd3JpdGVyKS5wb3M7XG4gICAgICBfX3ByaXZhdGVHZXQodGhpcywgX3dyaXRlcikuc2VlayhfX3ByaXZhdGVHZXQodGhpcywgX3dyaXRlcikub2Zmc2V0cy5nZXQoX19wcml2YXRlR2V0KHRoaXMsIF9jdXJyZW50Q2x1c3RlcikpICsgNCk7XG4gICAgICBfX3ByaXZhdGVHZXQodGhpcywgX3dyaXRlcikud3JpdGVFQk1MVmFySW50KGNsdXN0ZXJTaXplLCBDTFVTVEVSX1NJWkVfQllURVMpO1xuICAgICAgX19wcml2YXRlR2V0KHRoaXMsIF93cml0ZXIpLnNlZWsoZW5kUG9zKTtcbiAgICB9XG4gICAgaWYgKF9fcHJpdmF0ZUdldCh0aGlzLCBfd3JpdGVyKSBpbnN0YW5jZW9mIEJhc2VTdHJlYW1UYXJnZXRXcml0ZXIgJiYgX19wcml2YXRlR2V0KHRoaXMsIF93cml0ZXIpLnRhcmdldC5vcHRpb25zLm9uQ2x1c3Rlcikge1xuICAgICAgbGV0IHsgZGF0YSwgc3RhcnQgfSA9IF9fcHJpdmF0ZUdldCh0aGlzLCBfd3JpdGVyKS5nZXRUcmFja2VkV3JpdGVzKCk7XG4gICAgICBfX3ByaXZhdGVHZXQodGhpcywgX3dyaXRlcikudGFyZ2V0Lm9wdGlvbnMub25DbHVzdGVyKGRhdGEsIHN0YXJ0LCBfX3ByaXZhdGVHZXQodGhpcywgX2N1cnJlbnRDbHVzdGVyVGltZXN0YW1wKSk7XG4gICAgfVxuICB9O1xuICBfZW5zdXJlTm90RmluYWxpemVkID0gbmV3IFdlYWtTZXQoKTtcbiAgZW5zdXJlTm90RmluYWxpemVkX2ZuID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKF9fcHJpdmF0ZUdldCh0aGlzLCBfZmluYWxpemVkKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGFkZCBuZXcgdmlkZW8gb3IgYXVkaW8gY2h1bmtzIGFmdGVyIHRoZSBmaWxlIGhhcyBiZWVuIGZpbmFsaXplZC5cIik7XG4gICAgfVxuICB9O1xuXG4gIC8vIHNyYy9zdWJ0aXRsZXMudHNcbiAgdmFyIGN1ZUJsb2NrSGVhZGVyUmVnZXggPSAvKD86KC4rPylcXG4pPygoPzpcXGR7Mn06KT9cXGR7Mn06XFxkezJ9LlxcZHszfSlcXHMrLS0+XFxzKygoPzpcXGR7Mn06KT9cXGR7Mn06XFxkezJ9LlxcZHszfSkvZztcbiAgdmFyIHByZWFtYmxlU3RhcnRSZWdleCA9IC9eV0VCVlRULio/XFxuezJ9LztcbiAgdmFyIHRpbWVzdGFtcFJlZ2V4ID0gLyg/OihcXGR7Mn0pOik/KFxcZHsyfSk6KFxcZHsyfSkuKFxcZHszfSkvO1xuICB2YXIgaW5saW5lVGltZXN0YW1wUmVnZXggPSAvPCg/OihcXGR7Mn0pOik/KFxcZHsyfSk6KFxcZHsyfSkuKFxcZHszfSk+L2c7XG4gIHZhciB0ZXh0RW5jb2RlciA9IG5ldyBUZXh0RW5jb2RlcigpO1xuICB2YXIgX29wdGlvbnMyLCBfY29uZmlnLCBfcHJlYW1ibGVTZWVuLCBfcHJlYW1ibGVCeXRlcywgX3ByZWFtYmxlRW1pdHRlZCwgX3BhcnNlVGltZXN0YW1wLCBwYXJzZVRpbWVzdGFtcF9mbiwgX2Zvcm1hdFRpbWVzdGFtcCwgZm9ybWF0VGltZXN0YW1wX2ZuO1xuICB2YXIgU3VidGl0bGVFbmNvZGVyID0gY2xhc3Mge1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgIF9fcHJpdmF0ZUFkZCh0aGlzLCBfcGFyc2VUaW1lc3RhbXApO1xuICAgICAgX19wcml2YXRlQWRkKHRoaXMsIF9mb3JtYXRUaW1lc3RhbXApO1xuICAgICAgX19wcml2YXRlQWRkKHRoaXMsIF9vcHRpb25zMiwgdm9pZCAwKTtcbiAgICAgIF9fcHJpdmF0ZUFkZCh0aGlzLCBfY29uZmlnLCB2b2lkIDApO1xuICAgICAgX19wcml2YXRlQWRkKHRoaXMsIF9wcmVhbWJsZVNlZW4sIGZhbHNlKTtcbiAgICAgIF9fcHJpdmF0ZUFkZCh0aGlzLCBfcHJlYW1ibGVCeXRlcywgdm9pZCAwKTtcbiAgICAgIF9fcHJpdmF0ZUFkZCh0aGlzLCBfcHJlYW1ibGVFbWl0dGVkLCBmYWxzZSk7XG4gICAgICBfX3ByaXZhdGVTZXQodGhpcywgX29wdGlvbnMyLCBvcHRpb25zKTtcbiAgICB9XG4gICAgY29uZmlndXJlKGNvbmZpZykge1xuICAgICAgaWYgKGNvbmZpZy5jb2RlYyAhPT0gXCJ3ZWJ2dHRcIikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb2RlYyBtdXN0IGJlICd3ZWJ2dHQnLlwiKTtcbiAgICAgIH1cbiAgICAgIF9fcHJpdmF0ZVNldCh0aGlzLCBfY29uZmlnLCBjb25maWcpO1xuICAgIH1cbiAgICBlbmNvZGUodGV4dCkge1xuICAgICAgaWYgKCFfX3ByaXZhdGVHZXQodGhpcywgX2NvbmZpZykpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRW5jb2RlciBub3QgY29uZmlndXJlZC5cIik7XG4gICAgICB9XG4gICAgICB0ZXh0ID0gdGV4dC5yZXBsYWNlKFwiXFxyXFxuXCIsIFwiXFxuXCIpLnJlcGxhY2UoXCJcXHJcIiwgXCJcXG5cIik7XG4gICAgICBjdWVCbG9ja0hlYWRlclJlZ2V4Lmxhc3RJbmRleCA9IDA7XG4gICAgICBsZXQgbWF0Y2g7XG4gICAgICBpZiAoIV9fcHJpdmF0ZUdldCh0aGlzLCBfcHJlYW1ibGVTZWVuKSkge1xuICAgICAgICBpZiAoIXByZWFtYmxlU3RhcnRSZWdleC50ZXN0KHRleHQpKSB7XG4gICAgICAgICAgbGV0IGVycm9yID0gbmV3IEVycm9yKFwiV2ViVlRUIHByZWFtYmxlIGluY29ycmVjdC5cIik7XG4gICAgICAgICAgX19wcml2YXRlR2V0KHRoaXMsIF9vcHRpb25zMikuZXJyb3IoZXJyb3IpO1xuICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICB9XG4gICAgICAgIG1hdGNoID0gY3VlQmxvY2tIZWFkZXJSZWdleC5leGVjKHRleHQpO1xuICAgICAgICBsZXQgcHJlYW1ibGUgPSB0ZXh0LnNsaWNlKDAsIG1hdGNoPy5pbmRleCA/PyB0ZXh0Lmxlbmd0aCkudHJpbUVuZCgpO1xuICAgICAgICBpZiAoIXByZWFtYmxlKSB7XG4gICAgICAgICAgbGV0IGVycm9yID0gbmV3IEVycm9yKFwiTm8gV2ViVlRUIHByZWFtYmxlIHByb3ZpZGVkLlwiKTtcbiAgICAgICAgICBfX3ByaXZhdGVHZXQodGhpcywgX29wdGlvbnMyKS5lcnJvcihlcnJvcik7XG4gICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgIH1cbiAgICAgICAgX19wcml2YXRlU2V0KHRoaXMsIF9wcmVhbWJsZUJ5dGVzLCB0ZXh0RW5jb2Rlci5lbmNvZGUocHJlYW1ibGUpKTtcbiAgICAgICAgX19wcml2YXRlU2V0KHRoaXMsIF9wcmVhbWJsZVNlZW4sIHRydWUpO1xuICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICB0ZXh0ID0gdGV4dC5zbGljZShtYXRjaC5pbmRleCk7XG4gICAgICAgICAgY3VlQmxvY2tIZWFkZXJSZWdleC5sYXN0SW5kZXggPSAwO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB3aGlsZSAobWF0Y2ggPSBjdWVCbG9ja0hlYWRlclJlZ2V4LmV4ZWModGV4dCkpIHtcbiAgICAgICAgbGV0IG5vdGVzID0gdGV4dC5zbGljZSgwLCBtYXRjaC5pbmRleCk7XG4gICAgICAgIGxldCBjdWVJZGVudGlmaWVyID0gbWF0Y2hbMV0gfHwgXCJcIjtcbiAgICAgICAgbGV0IG1hdGNoRW5kID0gbWF0Y2guaW5kZXggKyBtYXRjaFswXS5sZW5ndGg7XG4gICAgICAgIGxldCBib2R5U3RhcnQgPSB0ZXh0LmluZGV4T2YoXCJcXG5cIiwgbWF0Y2hFbmQpICsgMTtcbiAgICAgICAgbGV0IGN1ZVNldHRpbmdzID0gdGV4dC5zbGljZShtYXRjaEVuZCwgYm9keVN0YXJ0KS50cmltKCk7XG4gICAgICAgIGxldCBib2R5RW5kID0gdGV4dC5pbmRleE9mKFwiXFxuXFxuXCIsIG1hdGNoRW5kKTtcbiAgICAgICAgaWYgKGJvZHlFbmQgPT09IC0xKVxuICAgICAgICAgIGJvZHlFbmQgPSB0ZXh0Lmxlbmd0aDtcbiAgICAgICAgbGV0IHN0YXJ0VGltZSA9IF9fcHJpdmF0ZU1ldGhvZCh0aGlzLCBfcGFyc2VUaW1lc3RhbXAsIHBhcnNlVGltZXN0YW1wX2ZuKS5jYWxsKHRoaXMsIG1hdGNoWzJdKTtcbiAgICAgICAgbGV0IGVuZFRpbWUgPSBfX3ByaXZhdGVNZXRob2QodGhpcywgX3BhcnNlVGltZXN0YW1wLCBwYXJzZVRpbWVzdGFtcF9mbikuY2FsbCh0aGlzLCBtYXRjaFszXSk7XG4gICAgICAgIGxldCBkdXJhdGlvbiA9IGVuZFRpbWUgLSBzdGFydFRpbWU7XG4gICAgICAgIGxldCBib2R5ID0gdGV4dC5zbGljZShib2R5U3RhcnQsIGJvZHlFbmQpO1xuICAgICAgICBsZXQgYWRkaXRpb25zID0gYCR7Y3VlU2V0dGluZ3N9XG4ke2N1ZUlkZW50aWZpZXJ9XG4ke25vdGVzfWA7XG4gICAgICAgIGlubGluZVRpbWVzdGFtcFJlZ2V4Lmxhc3RJbmRleCA9IDA7XG4gICAgICAgIGJvZHkgPSBib2R5LnJlcGxhY2UoaW5saW5lVGltZXN0YW1wUmVnZXgsIChtYXRjaDIpID0+IHtcbiAgICAgICAgICBsZXQgdGltZSA9IF9fcHJpdmF0ZU1ldGhvZCh0aGlzLCBfcGFyc2VUaW1lc3RhbXAsIHBhcnNlVGltZXN0YW1wX2ZuKS5jYWxsKHRoaXMsIG1hdGNoMi5zbGljZSgxLCAtMSkpO1xuICAgICAgICAgIGxldCBvZmZzZXRUaW1lID0gdGltZSAtIHN0YXJ0VGltZTtcbiAgICAgICAgICByZXR1cm4gYDwke19fcHJpdmF0ZU1ldGhvZCh0aGlzLCBfZm9ybWF0VGltZXN0YW1wLCBmb3JtYXRUaW1lc3RhbXBfZm4pLmNhbGwodGhpcywgb2Zmc2V0VGltZSl9PmA7XG4gICAgICAgIH0pO1xuICAgICAgICB0ZXh0ID0gdGV4dC5zbGljZShib2R5RW5kKS50cmltU3RhcnQoKTtcbiAgICAgICAgY3VlQmxvY2tIZWFkZXJSZWdleC5sYXN0SW5kZXggPSAwO1xuICAgICAgICBsZXQgY2h1bmsgPSB7XG4gICAgICAgICAgYm9keTogdGV4dEVuY29kZXIuZW5jb2RlKGJvZHkpLFxuICAgICAgICAgIGFkZGl0aW9uczogYWRkaXRpb25zLnRyaW0oKSA9PT0gXCJcIiA/IHZvaWQgMCA6IHRleHRFbmNvZGVyLmVuY29kZShhZGRpdGlvbnMpLFxuICAgICAgICAgIHRpbWVzdGFtcDogc3RhcnRUaW1lICogMWUzLFxuICAgICAgICAgIGR1cmF0aW9uOiBkdXJhdGlvbiAqIDFlM1xuICAgICAgICB9O1xuICAgICAgICBsZXQgbWV0YSA9IHt9O1xuICAgICAgICBpZiAoIV9fcHJpdmF0ZUdldCh0aGlzLCBfcHJlYW1ibGVFbWl0dGVkKSkge1xuICAgICAgICAgIG1ldGEuZGVjb2RlckNvbmZpZyA9IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBfX3ByaXZhdGVHZXQodGhpcywgX3ByZWFtYmxlQnl0ZXMpXG4gICAgICAgICAgfTtcbiAgICAgICAgICBfX3ByaXZhdGVTZXQodGhpcywgX3ByZWFtYmxlRW1pdHRlZCwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgX19wcml2YXRlR2V0KHRoaXMsIF9vcHRpb25zMikub3V0cHV0KGNodW5rLCBtZXRhKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG4gIF9vcHRpb25zMiA9IG5ldyBXZWFrTWFwKCk7XG4gIF9jb25maWcgPSBuZXcgV2Vha01hcCgpO1xuICBfcHJlYW1ibGVTZWVuID0gbmV3IFdlYWtNYXAoKTtcbiAgX3ByZWFtYmxlQnl0ZXMgPSBuZXcgV2Vha01hcCgpO1xuICBfcHJlYW1ibGVFbWl0dGVkID0gbmV3IFdlYWtNYXAoKTtcbiAgX3BhcnNlVGltZXN0YW1wID0gbmV3IFdlYWtTZXQoKTtcbiAgcGFyc2VUaW1lc3RhbXBfZm4gPSBmdW5jdGlvbihzdHJpbmcpIHtcbiAgICBsZXQgbWF0Y2ggPSB0aW1lc3RhbXBSZWdleC5leGVjKHN0cmluZyk7XG4gICAgaWYgKCFtYXRjaClcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkV4cGVjdGVkIG1hdGNoLlwiKTtcbiAgICByZXR1cm4gNjAgKiA2MCAqIDFlMyAqIE51bWJlcihtYXRjaFsxXSB8fCBcIjBcIikgKyA2MCAqIDFlMyAqIE51bWJlcihtYXRjaFsyXSkgKyAxZTMgKiBOdW1iZXIobWF0Y2hbM10pICsgTnVtYmVyKG1hdGNoWzRdKTtcbiAgfTtcbiAgX2Zvcm1hdFRpbWVzdGFtcCA9IG5ldyBXZWFrU2V0KCk7XG4gIGZvcm1hdFRpbWVzdGFtcF9mbiA9IGZ1bmN0aW9uKHRpbWVzdGFtcCkge1xuICAgIGxldCBob3VycyA9IE1hdGguZmxvb3IodGltZXN0YW1wIC8gKDYwICogNjAgKiAxZTMpKTtcbiAgICBsZXQgbWludXRlcyA9IE1hdGguZmxvb3IodGltZXN0YW1wICUgKDYwICogNjAgKiAxZTMpIC8gKDYwICogMWUzKSk7XG4gICAgbGV0IHNlY29uZHMgPSBNYXRoLmZsb29yKHRpbWVzdGFtcCAlICg2MCAqIDFlMykgLyAxZTMpO1xuICAgIGxldCBtaWxsaXNlY29uZHMgPSB0aW1lc3RhbXAgJSAxZTM7XG4gICAgcmV0dXJuIGhvdXJzLnRvU3RyaW5nKCkucGFkU3RhcnQoMiwgXCIwXCIpICsgXCI6XCIgKyBtaW51dGVzLnRvU3RyaW5nKCkucGFkU3RhcnQoMiwgXCIwXCIpICsgXCI6XCIgKyBzZWNvbmRzLnRvU3RyaW5nKCkucGFkU3RhcnQoMiwgXCIwXCIpICsgXCIuXCIgKyBtaWxsaXNlY29uZHMudG9TdHJpbmcoKS5wYWRTdGFydCgzLCBcIjBcIik7XG4gIH07XG4gIHJldHVybiBfX3RvQ29tbW9uSlMoc3JjX2V4cG9ydHMpO1xufSkoKTtcbmlmICh0eXBlb2YgbW9kdWxlID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBtb2R1bGUuZXhwb3J0cyA9PT0gXCJvYmplY3RcIikgT2JqZWN0LmFzc2lnbihtb2R1bGUuZXhwb3J0cywgV2ViTU11eGVyKVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRpZiAoIShtb2R1bGVJZCBpbiBfX3dlYnBhY2tfbW9kdWxlc19fKSkge1xuXHRcdGRlbGV0ZSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRcdHZhciBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIG1vZHVsZUlkICsgXCInXCIpO1xuXHRcdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0XHR0aHJvdyBlO1xuXHR9XG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiaW1wb3J0IHsgTWFuZGVsYnJvdENhbnZhcyB9IGZyb20gJy4vTWFuZGVsYnJvdENhbnZhcyc7XG5pbXBvcnQgeyBNb3ZpZU1ha2VySW50ZXJvcCB9IGZyb20gJy4vTW92aWVNYWtlckludGVyb3AnO1xuaW1wb3J0IHsgSW50ZXJwb2xhdGlvbkludGVyb3AgfSBmcm9tICcuL0ludGVycG9sYXRpb25JbnRlcm9wJztcblxuZGVjbGFyZSBnbG9iYWwge1xuICAgIGludGVyZmFjZSBXaW5kb3cge1xuICAgICAgICBjYW52YXNJbnRlcm9wOiBhbnk7XG4gICAgICAgIG1vdmllTWFrZXJJbnRlcm9wOiBhbnk7XG4gICAgICAgIGludGVycG9sYXRpb25JbnRlcm9wOiBhbnk7XG4gICAgfVxufVxuXG53aW5kb3cuY2FudmFzSW50ZXJvcCA9IG5ldyBNYW5kZWxicm90Q2FudmFzKCk7XG53aW5kb3cubW92aWVNYWtlckludGVyb3AgPSBuZXcgTW92aWVNYWtlckludGVyb3AoKTtcbndpbmRvdy5pbnRlcnBvbGF0aW9uSW50ZXJvcCA9IG5ldyBJbnRlcnBvbGF0aW9uSW50ZXJvcCgpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9