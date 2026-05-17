import { Muxer, ArrayBufferTarget } from 'webm-muxer';

export class MovieMakerInterop {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private width: number;
    private height: number;
    private frames: Uint8Array[] = [];

    init(canvasId: string, width: number, height: number): void {
        this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d');
        this.width = width;
        this.height = height;
        this.frames = [];
    }

    reset(): void {
        this.frames = [];
        if (this.ctx)
            this.ctx.clearRect(0, 0, this.width, this.height);
    }

    async addFrameFromUrl(url: string, frameIndex: number): Promise<void> {
        const response = await fetch(url);
        const buffer = await response.arrayBuffer();
        const pixels = new Uint8Array(buffer);
        this.frames[frameIndex] = pixels;
        this.drawPixels(pixels);
    }

    private drawPixels(pixels: Uint8Array): void {
        const imageData = this.ctx.createImageData(this.width, this.height);
        imageData.data.set(pixels);
        this.ctx.putImageData(imageData, 0, 0);
    }

    async renderAndDownload(fps: number): Promise<string> {
        const target = new ArrayBufferTarget();
        const muxer = new Muxer({
            target,
            video: {
                codec: 'V_VP9',
                width: this.width,
                height: this.height,
                frameRate: fps,
            }
        });

        const encoder = new VideoEncoder({
            output: (chunk, meta) => muxer.addVideoChunk(chunk, meta),
            error: (e) => console.error('VideoEncoder error:', e),
        });

        encoder.configure({
            codec: 'vp09.00.10.08',
            width: this.width,
            height: this.height,
            bitrate: 40_000_000,
            framerate: fps,
        });

        const frameDurationMicros = Math.round(1_000_000 / fps);

        for (let i = 0; i < this.frames.length; i++) {
            const frame = new VideoFrame(this.frames[i], {
                format: 'RGBA',
                codedWidth: this.width,
                codedHeight: this.height,
                timestamp: i * frameDurationMicros,
                duration: frameDurationMicros,
            });
            encoder.encode(frame, { keyFrame: i % (fps * 2) === 0 });
            frame.close();
        }

        await encoder.flush();
        encoder.close();
        muxer.finalize();

        const blob = new Blob([target.buffer], { type: 'video/webm' });
        return URL.createObjectURL(blob);
    }
}
