using System;
using System.Collections.Generic;
using System.Text;
using Mandelbrot;

namespace BlazorMandelbrotDeepzoom.Shared
{
    public class MandelbrotImage : IMandelbrotImage
    {
        private readonly int w;
        private readonly int h;
        public byte[] image;

        public MandelbrotImage(int w, int h)
        {
            image = new byte[w * h * 4];
            this.w = w;
            this.h = h;
        }
        public void SetRGB(int x, int y, uint packed)
        {
            var index = (x + y * w) * 4;
            image[index] = (byte)(packed & 0xFF);
            image[index + 1] = (byte)((packed >> 8) & 0xFF);
            image[index + 2] = (byte)((packed >> 16) & 0xFF);
            image[index + 3] = (byte)(packed >> 24);
        }
    }
}
