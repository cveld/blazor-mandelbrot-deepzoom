using BigDecimalContracts;
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

        public IBigDecimal FromDouble(double d, IMathContext mc)
        {
            return new BigDecimalImplementation(d, (mc as MathContextImplementation).mathContext);
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
