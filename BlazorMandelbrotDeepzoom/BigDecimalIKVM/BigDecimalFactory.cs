using Mandelbrot;
using System;
using System.Collections.Generic;
using System.Text;

namespace BigDecimalIKVM
{
    public class BigDecimalFactory : IBigDecimalFactory
    {
        public IBigDecimal FromDouble(double d)
        {
            return new BigDecimalImplementation(d);
        }

        public IBigDecimal FromInt(int i)
        {
            return new BigDecimalImplementation(i);
        }

        public IBigDecimal FromString(string s)
        {
            return new BigDecimalImplementation(s);
        }
    }
}
