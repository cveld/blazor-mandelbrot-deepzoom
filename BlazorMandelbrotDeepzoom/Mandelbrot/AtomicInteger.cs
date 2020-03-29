using System;
using System.Collections.Generic;
using System.Text;

namespace Mandelbrot
{
    public class AtomicInteger
    {
        public AtomicInteger()
        {
        }
        public AtomicInteger(int n)
        {
            value = n;
        }

        private int value = 0;
        public int get()
        {
            return value;
        }

        public float floatValue()
        {
            return (float)value;
        }

        public double doubleValue()
        {
            return (double)value;
        }
        public int getAndIncrement()
        {
            return value++;
        }
        public int incrementAndGet()
        {
            return ++value;
        }

        public int decrementAndGet()
        {
            return --value;
        }
    }
}
