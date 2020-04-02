using BigDecimalsDParker;
using System;
using System.Collections.Generic;
using System.Text;

namespace Mandelbrot.BigDecimalsDParker
{
    public class BigDecimalFactory : IBigDecimalFactory
    {
        public IBigDecimal FromDouble(double d)
        {
            return new BigDecimal(d);
        }

        public IBigDecimal FromInt(int i)
        {
            return new BigDecimal(i);
        }

        public IBigDecimal FromString(string s)
        {
            return new BigDecimal(s);
        }
    }
}
