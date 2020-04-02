using BigDecimalContracts;
using System;
using System.Collections.Generic;
using System.Text;

namespace BigDecimalIKVM
{
    public class MathContextFactory : IMathContextFactory
    {
        public IMathContext Build(int precision)
        {
            return new MathContextImplementation(precision);
        }
    }
}
