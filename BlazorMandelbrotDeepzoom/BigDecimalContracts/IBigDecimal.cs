using BigDecimalContracts;
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
        IBigDecimal Add(IBigDecimal bd); 
        IBigDecimal Add(IBigDecimal bd, IMathContext mathContext); 
        IBigDecimal Mul(IBigDecimal bd);
        IBigDecimal Mul(IBigDecimal bd, IMathContext mathContext);
        IBigDecimal Sub(IBigDecimal bd);
        IBigDecimal Sub(IBigDecimal bd, IMathContext mathContext);
        int JavaScale();
        int JavaPrecision();
    }
}
