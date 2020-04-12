using System;
using System.Collections.Generic;
using System.Text;
using Mandelbrot;

namespace BlazorMandelbrotDeepzoom.Shared
{
    public class ImageBuilder : IImageBuilder
    {
        public IMandelbrotImage Build(int width, int height)
        {
            return new MandelbrotImage(width, height);
        }
    }
}
