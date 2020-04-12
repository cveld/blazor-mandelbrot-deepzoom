import { base64ToArrayBuffer } from "./Utility";

declare namespace BlazorExtensions {
    class Canvas2d {
        static getContext(canvas: { id }): CanvasRenderingContext2D;
    }
}
declare class DotNet {
    static invokeMethodAsync(...args: any[]);
}

export class MandelbrotCanvas {
    ctx: CanvasRenderingContext2D;
    mandelbrot: ImageData;
    rect: { startX?, startY?, w?, h?} = {};
    drag = false;
    dotnetobjref;
   
    drawPixels(x: number, y: number, xw: number, yw: number, pixelsbase64: string): void {
        //const pixels = new Uint8Array(atob(pixelsbase64).split("").map(function (c) {
        //    return c.charCodeAt(0);
        //}));

        const pixels = base64ToArrayBuffer(pixelsbase64);

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

    init(id: number, dotnetobjref) {
        this.dotnetobjref = dotnetobjref;
        this.ctx = BlazorExtensions.Canvas2d.getContext({
            id: id
        });
        this.ctx.canvas.addEventListener('mousedown', (e) => this.mouseDown(e), false);
        this.ctx.canvas.addEventListener('mouseup', (e) => this.mouseUp(e), false);
        this.ctx.canvas.addEventListener('mousemove', (e) => this.mouseMove(e), false);

    }

    mouseDown(e: MouseEvent) {
        const element = e.target as HTMLElement;
        this.rect.startX = e.pageX - element.offsetLeft;
        this.rect.startY = e.pageY - element.offsetTop;
        this.drag = true;
    }

    mouseUp(e: MouseEvent) {
        this.drag = false;
        // this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.draw();
        this.dotnetobjref.invokeMethod('Dragged', this.rect, this.drag);
    }
    mouseMove(e: MouseEvent) {
        const element = e.target as HTMLElement;
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