using System;
using System.Collections.Generic;
using System.Text;

namespace Mandelbrot
{
    public interface IBigDecimal
    {
        int CompareTo(IBigDecimal d);
        IBigDecimal MovePointLeft(int i);
        IBigDecimal MovePointRight(int i);
        double DoubleValue();
        IBigDecimal Mul(IBigDecimal bd);
        IBigDecimal Add(IBigDecimal bd);
        IBigDecimal Sub(IBigDecimal bd);
        int JavaScale();
        int JavaPrecision();
    }
}
