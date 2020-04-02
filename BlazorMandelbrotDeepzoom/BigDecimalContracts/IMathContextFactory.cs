using System;
using System.Collections.Generic;
using System.Text;

namespace BigDecimalContracts
{
    public interface IMathContextFactory
    {
        IMathContext Build(int precision);
    }
}
