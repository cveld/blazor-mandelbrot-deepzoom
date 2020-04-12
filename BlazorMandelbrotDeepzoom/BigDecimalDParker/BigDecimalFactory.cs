using BigDecimalContracts;
using BigDecimalsDParker;
using System;
using System.Collections.Generic;
using System.Text;

namespace BigDecimalDParker
{
    public class BigDecimalFactory : IBigDecimalFactory
    {
        public IBigDecimal FromDouble(double d)
        {
            return new BigDecimal(d);
        }

        public IBigDecimal FromDouble(double d, IMathContext mc)
        {
            return new BigDecimal(d, mc);
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
