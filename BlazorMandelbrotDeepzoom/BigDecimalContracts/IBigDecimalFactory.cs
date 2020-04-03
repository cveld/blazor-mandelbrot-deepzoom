using BigDecimalContracts;
using System;
using System.Collections.Generic;
using System.Text;

namespace Mandelbrot
{
    public interface IBigDecimalFactory
    {
        IBigDecimal FromDouble(double d);
        IBigDecimal FromDouble(double d, IMathContext mc);
        IBigDecimal FromInt(int i);
        IBigDecimal FromString(string s);
        
    }
}
