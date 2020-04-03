using BigDecimalContracts;
using java.math;
using System;
using System.Collections.Generic;
using System.Text;

namespace BigDecimalIKVM
{
    public class MathContextFactory : IMathContextFactory
    {
        public IMathContext BigDecimal128()
        {
            return new MathContextImplementation(MathContext.DECIMAL128);
        }

        public IMathContext Build(int precision)
        {
            return new MathContextImplementation(precision);
        }
    }
}
