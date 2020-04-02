using BigDecimalContracts;
using BigDecimalsDParker;
using System;
using System.Collections.Generic;
using System.Text;

namespace BigDecimalDParker
{
    public class MathContextFactory : IMathContextFactory
    {
        public IMathContext Build(int precision)
        {
            return new MathContext(precision);
        }
    }
}
