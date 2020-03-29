// canvas: HTMLCanvasElement
function drawPixels(id, x, y, xw, yw, pixels) {
    var ctx = BlazorExtensions.Canvas2d.getContext({
        id: id
    });
    var imageData = ctx.createImageData(xw, yw);
    // Iterate through every pixel
    for (var i = 0; i < imageData.data.length; i += 4) {
        // Modify pixel data
        imageData.data[i + 0] = pixels[i]; // R value
        imageData.data[i + 1] = pixels[i + 1]; // G value
        imageData.data[i + 2] = pixels[i + 2]; // B value
        imageData.data[i + 3] = pixels[i + 3]; // A value
    }
    // Draw image data to the canvas
    ctx.putImageData(imageData, x, y);
}
//# sourceMappingURL=canvasinterop.js.map