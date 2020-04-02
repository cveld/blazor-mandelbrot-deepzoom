using BigDecimalsDParker;
using System;

namespace MandelbrotTest
{
    class Program
    {
        static void Main(string[] args)
        {            
            var mandelbrot = new Mandelbrot.Mandelbrot(400, 400);
            var result = mandelbrot.DoCalculation(400, 400, SuperSampleType.SUPER_SAMPLE_NONE);
            var palette = new SFTPaletteOld();
            var image = result.MakeTexture(palette, SuperSampleType.SUPER_SAMPLE_NONE);
            Console.WriteLine("Hello World!");
        }
    }
}
