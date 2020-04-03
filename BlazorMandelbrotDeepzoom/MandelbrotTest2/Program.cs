using BigDecimalIKVM;
using java.math;
using System;

namespace MandelbrotTest2
{
    class Program
    {
        public static T[] SubArray<T>(T[] data, int index, int length)
        {
            T[] result = new T[length];
            Array.Copy(data, index, result, 0, length);
            return result;
        }

        static void Main(string[] args)
        {
            var bigDecimalFactory = new BigDecimalFactory();
            var mathContextFactory = new MathContextFactory();
            var mandelbrot = new Mandelbrot.Mandelbrot(400, 400, bigDecimalFactory, mathContextFactory);
            var result = mandelbrot.DoCalculation(400, 400, SuperSampleType.SUPER_SAMPLE_NONE);
            var palette = new SFTPaletteOld();
            var subarray = SubArray(result.mBuffer, 20000, 100);
            var image = result.MakeTexture(palette, SuperSampleType.SUPER_SAMPLE_NONE);
            Console.WriteLine("Hello World!");
        }
    }
}
