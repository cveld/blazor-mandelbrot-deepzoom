using Mandelbrot;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.PixelFormats;
using System;
using System.Collections.Generic;
using System.Text;

namespace MandelbrotTest
{
    class ImageBuilder : IImageBuilder
    {
        public IMandelbrotImage Build(int width, int height)
        {
            return new ImageWrapper(width, height);
        }
    }
}
