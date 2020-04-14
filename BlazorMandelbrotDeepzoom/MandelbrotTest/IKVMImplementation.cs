using BigDecimalIKVM;
using Mandelbrot;
using SixLabors.ImageSharp;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace MandelbrotTest
{
    public class IKVMImplementation
    {
        static public void Run()
        {
            var bigDecimalFactory = new BigDecimalFactory();
            var mathContextFactory = new MathContextFactory();
            Implementation.Run(bigDecimalFactory, mathContextFactory, @"ikvm-output");            
        }
    }
}
