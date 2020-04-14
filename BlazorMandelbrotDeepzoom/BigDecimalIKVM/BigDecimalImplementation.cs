using BigDecimalContracts;
using java.math;
using System;
using System.Collections.Generic;
using System.Text;

namespace BigDecimalIKVM
{
    public struct BigDecimalImplementation : IBigDecimal
    {        
        public readonly BigDecimal bigDecimal;
        

        public BigDecimalImplementation(double d)
        {
            bigDecimal = new BigDecimal(d);
        }

        public BigDecimalImplementation(BigDecimal bigDecimal)
        {
            this.bigDecimal = bigDecimal;
        }

        public BigDecimalImplementation(string s)
        {
            bigDecimal = new BigDecimal(s);
        }

        public BigDecimalImplementation(double d, MathContext mc)
        {
            this.bigDecimal = new BigDecimal(d, mc);
        }

        public IBigDecimal Add(IBigDecimal bd)
        {
            return new BigDecimalImplementation(this.bigDecimal.add((bd as BigDecimalImplementation?).Value.bigDecimal));
        }

        public IBigDecimal Add(IBigDecimal bd, IMathContext mathContext)
        {
            return new BigDecimalImplementation(this.bigDecimal.add((bd as BigDecimalImplementation?).Value.bigDecimal, (mathContext as MathContextImplementation).mathContext));

        }

        public int CompareTo(IBigDecimal bd)
        {
            return this.bigDecimal.compareTo((bd as BigDecimalImplementation?).Value.bigDecimal);
        }

        public double DoubleValue()
        {
            return this.bigDecimal.doubleValue();
        }

        public int JavaPrecision()
        {
            return this.bigDecimal.precision();            
        }

        public int JavaScale()
        {
            return this.bigDecimal.scale();
        }

        public IBigDecimal MovePointLeft(int i)
        {
            return new BigDecimalImplementation(this.bigDecimal.movePointLeft(i));
        }

        public IBigDecimal MovePointRight(int i)
        {
            return new BigDecimalImplementation(this.bigDecimal.movePointRight(i));
        }

        public IBigDecimal Mul(IBigDecimal bd)
        {
            return new BigDecimalImplementation(this.bigDecimal.multiply((bd as BigDecimalImplementation?).Value.bigDecimal));
        }

        public IBigDecimal Mul(IBigDecimal bd, IMathContext mathContext)
        {
            return new BigDecimalImplementation(this.bigDecimal.multiply((bd as BigDecimalImplementation?).Value.bigDecimal, (mathContext as MathContextImplementation).mathContext));
        }

        public IBigDecimal SetJavaScale(int scale, BigDecimalRoundingEnum bigDecimalRoundingEnum)
        {
            // BigDecimal.ROUND_HALF_DOWN
            switch (bigDecimalRoundingEnum)
            {
                case BigDecimalRoundingEnum.HALF_UP:
                    return new BigDecimalImplementation(this.bigDecimal.setScale(scale, RoundingMode.HALF_UP));
                case BigDecimalRoundingEnum.ROUND_HALF_DOWN:
                    return new BigDecimalImplementation(this.bigDecimal.setScale(scale, BigDecimal.ROUND_HALF_DOWN));
            }
            throw new ArgumentOutOfRangeException(nameof(bigDecimalRoundingEnum));
        }

        public IBigDecimal StripTrailingZeros()
        {
            return new BigDecimalImplementation(this.bigDecimal.stripTrailingZeros());
        }

        public IBigDecimal Sub(IBigDecimal bd)
        {
            return new BigDecimalImplementation(this.bigDecimal.subtract((bd as BigDecimalImplementation?).Value.bigDecimal));
        }

        public IBigDecimal Sub(IBigDecimal bd, IMathContext mathContext)
        {
            return new BigDecimalImplementation(this.bigDecimal.subtract((bd as BigDecimalImplementation?).Value.bigDecimal, (mathContext as MathContextImplementation).mathContext));
        }
    }
}
