using System;
using System.Collections.Generic;
using System.Text;

namespace Mandelbrot
{
    public interface IImageBuilder
    {
        IMandelbrotImage Build(int width, int height);
    }
}
