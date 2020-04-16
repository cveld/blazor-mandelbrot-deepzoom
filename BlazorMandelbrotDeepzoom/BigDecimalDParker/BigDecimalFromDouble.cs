using System;
using System.Collections.Generic;
using System.Text;

namespace Mandelbrot.BigDecimalsDParker
{
    public partial class BigDecimal
    {
        public BigDecimal(double val)
        {
            if (Double.IsInfinity(val) || Double.IsNaN(val))
                throw new FormatException("Infinite or NaN");

            // Translate the double into sign, exponent and significand, according
            // to the formulae in JLS, Section 20.10.22.
            long valBits = BitConverter.DoubleToInt64Bits(val);
            int sign = ((valBits >> 63) == 0 ? 1 : -1);
            int exponent = (int)((valBits >> 52) & 0x7ffL);
            long significand = (exponent == 0 ? (valBits & ((1L << 52) - 1)) << 1
                                : (valBits & ((1L << 52) - 1)) | (1L << 52));
            exponent -= 1075;
            // At this point, val == sign * significand * 2**exponent.

            /*
             * Special case zero to supress nonterminating normalization
             * and bogus scale calculation.
             */
            if (significand == 0)
            {
                Value = BigInteger.Zero;
                // intCompact = 0;
                Precision = 1;
                return;
            }

            // Normalize
            while ((significand & 1) == 0)
            {    //  i.e., significand is even
                significand >>= 1;
                exponent++;
            }

            // Calculate intVal and scale
            long s = sign * significand;
            BigInteger b;
            if (exponent < 0)
            {
                b = BigInteger.Pow(new BigInteger(5), -exponent) * s;
                scale = -exponent;
            }
            else if (exponent > 0)
            {
                b = BigInteger.Pow(new BigInteger(2), exponent) * s;
            }
            else
            {
                b = new BigInteger(s);
            }
            // intCompact = compactValFor(b);
            Value = b; // (intCompact != INFLATED) ? null : b;

            // c# Precision gets assigned the java scale value (number of digits behind the point)
            Precision = scale;
        } // method
    }
}
