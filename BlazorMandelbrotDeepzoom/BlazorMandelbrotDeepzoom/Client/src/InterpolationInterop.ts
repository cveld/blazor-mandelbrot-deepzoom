export class InterpolationInterop {
    drawPixelsToCanvas(canvasId: string, base64: string, width: number, height: number): void {
        const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const imageData = ctx.createImageData(width, height);
        const binaryString = window.atob(base64);
        for (let i = 0; i < binaryString.length; i++) {
            imageData.data[i] = binaryString.charCodeAt(i);
        }
        ctx.putImageData(imageData, 0, 0);
    }
}
