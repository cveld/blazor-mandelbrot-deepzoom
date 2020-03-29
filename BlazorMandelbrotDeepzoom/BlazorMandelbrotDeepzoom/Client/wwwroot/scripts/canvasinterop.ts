declare namespace BlazorExtensions {
    class Canvas2d {
        static getContext(canvas: { id }): CanvasRenderingContext2D;
    }
}
// canvas: HTMLCanvasElement
function drawPixels(id: number, x: number, y: number, xw: number, yw: number, pixels: Uint8Array) {
    let ctx = BlazorExtensions.Canvas2d.getContext({        
            id : id
        });

    const imageData = ctx.createImageData(xw, yw);
    
    // Iterate through every pixel
    for (let i = 0; i < imageData.data.length; i += 4) {
        // Modify pixel data
        imageData.data[i + 0] = pixels[i];      // R value
        imageData.data[i + 1] = pixels[i + 1];  // G value
        imageData.data[i + 2] = pixels[i + 2];  // B value
        imageData.data[i + 3] = pixels[i + 3];  // A value
    }

    // Draw image data to the canvas
    ctx.putImageData(imageData, x, y);
}