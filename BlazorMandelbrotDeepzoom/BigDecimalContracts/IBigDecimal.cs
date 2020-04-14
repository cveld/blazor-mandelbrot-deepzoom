using BigDecimalContracts;
using System;
using System.Collections.Generic;
using System.Text;

namespace BigDecimalContracts
{
    public interface IBigDecimal
    {
        int CompareTo(IBigDecimal d);
        IBigDecimal MovePointLeft(int i);
        IBigDecimal MovePointRight(int i);
        double DoubleValue();
        IBigDecimal Add(IBigDecimal bd);
        IBigDecimal Add(IBigDecimal bd, IMathContext mathContext);
        IBigDecimal Mul(IBigDecimal bd);
        IBigDecimal Mul(IBigDecimal bd, IMathContext mathContext);
        IBigDecimal Sub(IBigDecimal bd);
        IBigDecimal Sub(IBigDecimal bd, IMathContext mathContext);
        // the java definition of Scale is equal to c#'s Precision; i.e. number of decimals
        int JavaScale();
        // the java definition of Precision is equal the length of the BigInteger (almost)
        int JavaPrecision();
        IBigDecimal SetJavaScale(int scale, BigDecimalRoundingEnum bigDecimalRoundingEnum);
        /// <summary>
        /// This method returns a numerically equal BigDecimal with any trailing zeros removed.
        /// </summary>
        /// <returns></returns>
        /// <example>600.0 returns 6*10e2</example>
        IBigDecimal StripTrailingZeros();
    }
}
