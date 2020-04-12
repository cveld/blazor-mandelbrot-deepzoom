import { MandelbrotCanvas } from './MandelbrotCanvas';

declare global {
    interface Window { canvasInterop: any }
}

window.canvasInterop = new MandelbrotCanvas();