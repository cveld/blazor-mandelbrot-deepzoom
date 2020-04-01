using BigDecimalsDParker;
using System;

namespace MandelbrotTest
{
    class Program
    {
        static void Main(string[] args)
        {
            var dec = new BigDecimal(0.75);
            var dec2 = new BigDecimal(-0.75);
            var s = dec.ToString();
            var s1 = dec2.ToString();
            var mandelbrot = new Mandelbrot.Mandelbrot(400, 400);
            var result = mandelbrot.DoCalculation(400, 400, SuperSampleType.SUPER_SAMPLE_NONE);
            var image= result.MakeTexture()
            Console.WriteLine("Hello World!");
        }
    }
}
