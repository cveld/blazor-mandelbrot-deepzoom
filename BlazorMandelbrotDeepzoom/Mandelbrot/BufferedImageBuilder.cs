using System;
using System.Collections.Generic;
using System.Text;

namespace Mandelbrot
{
    public class BufferedImageBuilder : IImageBuilder
    {
        public IMandelbrotImage Build(int width, int height)
        {
            return new BufferedImage(width, height);
        }
    }
}
