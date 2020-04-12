using System;
using System.Collections.Generic;
using System.Text;

namespace Mandelbrot
{
    public interface IMandelbrotImage
    {
        void SetRGB(int x, int y, uint packed);
            
    }
}
