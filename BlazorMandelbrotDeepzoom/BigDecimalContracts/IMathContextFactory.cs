using System;
using System.Collections.Generic;
using System.Text;

namespace BigDecimalContracts
{
    public interface IMathContextFactory
    {        
        IMathContext BigDecimal128();
        IMathContext Build(int precision);
    }
}
