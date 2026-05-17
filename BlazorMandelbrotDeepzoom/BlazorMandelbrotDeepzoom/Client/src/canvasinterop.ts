import { MandelbrotCanvas } from './MandelbrotCanvas';
import { MovieMakerInterop } from './MovieMakerInterop';
import { InterpolationInterop } from './InterpolationInterop';

declare global {
    interface Window {
        canvasInterop: any;
        movieMakerInterop: any;
        interpolationInterop: any;
    }
}

window.canvasInterop = new MandelbrotCanvas();
window.movieMakerInterop = new MovieMakerInterop();
window.interpolationInterop = new InterpolationInterop();
