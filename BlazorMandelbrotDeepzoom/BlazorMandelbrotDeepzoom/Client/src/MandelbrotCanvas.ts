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
    xw: number;
    yw: number;
    rect: { startX?, startY?, w?} = {};
    drag = false;
    dotnetobjref;

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
    async fetchAndDraw(mPos: string, mPosi: string, mSize: string, iterationlimit: number): Promise<void> {        
        const result = await fetch(`Mandelbrot?pos=${mPos}&posi=${mPosi}&size=${mSize}&iterationlimit=${iterationlimit}`);
        const payload: {
            image: string;
            newIterationLimit: number;
        } = await result.json();
        this.drawPixelsString(payload.image);        
        this.dotnetobjref.invokeMethod('NewIterationLimit', payload.newIterationLimit);        
    }

    drawPixelsString(pixelsbase64: string): void {
        //const pixels = new Uint8Array(atob(pixelsbase64).split("").map(function (c) {
        //    return c.charCodeAt(0);
        //}));
        const pixels = base64ToArrayBuffer(pixelsbase64);
        this.drawPixelsUint8Array(pixels);      
        // Draw image data to the canvas        
    }

    drawPixelsUint8Array(pixels: Uint8Array): void {
        for (let i = 0; i < pixels.length; i++) {
            this.mandelbrot.data[i] = pixels[i];
        }        
        this.draw();
    }

    getImageFromServer(url: string) {
        fetch(url).then(response => {
            response.arrayBuffer().then(arrayBuffer => {
                this.drawPixelsUint8Array(new Uint8Array(arrayBuffer));
            });
        });
    }

    init(id: number, dotnetobjref, xw, yw) {
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
            this.ctx.strokeRect(
                this.rect.startX - this.rect.w,
                this.rect.startY - this.rect.w * this.yw / this.xw,
                2 * this.rect.w, 2 * this.rect.w * this.yw / this.xw);
        }
    }

    destroy() {
        this.ctx.canvas.removeEventListener('mousedown', this.mouseDown);
        this.ctx.canvas.removeEventListener('mouseup', this.mouseDown);
        this.ctx.canvas.removeEventListener('mousemove', this.mouseDown);
    }
}