using BigDecimalContracts;
using BigDecimalsDParker;
using System;
using System.Collections.Generic;
using System.Text;

namespace BigDecimalDParker
{
    public class MathContextFactory : IMathContextFactory
    {
        public IMathContext BigDecimal128()
        {
            return new MathContext(128);
        }

        public IMathContext Build(int precision)
        {
            return new MathContext(precision);
        }
    }
}
