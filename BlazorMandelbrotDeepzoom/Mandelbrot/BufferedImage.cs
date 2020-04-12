using System;
using System.Collections.Generic;
using System.Text;

namespace Mandelbrot
{
    public class BufferedImage : IMandelbrotImage
    {
        public uint[] pixels;
        public int Width { get; }
        public int Height { get; }
        public BufferedImage(int w, int h)
        {
            Width = w;
            Height = h;
            pixels = new uint[w * h * 4];
        }

        public void SetRGB(int x, int y, uint color) {
            int index = (x + y * Width) * 4;
            pixels[index] = (uint)(color & 0xFF); // R
            pixels[index + 1] = (uint)(color << 8 & 0xFF); // G
            pixels[index + 2] = (uint)(color << 16 & 0xFF); // B
            pixels[index + 3] = 255; // A
        }
    }
}
