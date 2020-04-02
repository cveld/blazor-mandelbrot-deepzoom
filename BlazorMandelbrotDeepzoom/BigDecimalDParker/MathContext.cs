using BigDecimalContracts;
using System;
using System.Collections.Generic;
using System.Text;

namespace BigDecimalsDParker
{
    public class MathContext : IMathContext
    {
        int precision;
        public MathContext(int precision)
        {
            this.precision = precision;
        }
    }
}
