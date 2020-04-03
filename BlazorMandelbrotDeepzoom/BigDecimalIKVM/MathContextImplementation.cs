using BigDecimalContracts;
using java.math;
using System;
using System.Collections.Generic;
using System.Text;

namespace BigDecimalIKVM
{
    class MathContextImplementation : IMathContext
    {
        public readonly MathContext mathContext;      

        public MathContextImplementation(int i)
        {
            this.mathContext = new MathContext(i);
        }
    }
}
