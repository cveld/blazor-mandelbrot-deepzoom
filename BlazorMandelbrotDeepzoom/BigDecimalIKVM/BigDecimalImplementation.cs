using java.math;
using Mandelbrot;
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

        public IBigDecimal Add(IBigDecimal bd)
        {
            return new BigDecimalImplementation(this.bigDecimal.add((bd as BigDecimalImplementation?).Value.bigDecimal));
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

        public IBigDecimal Sub(IBigDecimal bd)
        {
            return new BigDecimalImplementation(this.bigDecimal.subtract((bd as BigDecimalImplementation?).Value.bigDecimal));
        }
    }
}
