using System;
using System.Collections.Generic;
using System.Text;

namespace Mandelbrot
{
    public interface IBigDecimalFactory
    {
        IBigDecimal FromDouble(double d);
        IBigDecimal FromInt(int i);
        IBigDecimal FromString(string s);
        
    }
}
