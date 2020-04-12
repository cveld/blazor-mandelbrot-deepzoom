using BigDecimalDParker;
using Mandelbrot;
using SixLabors.ImageSharp;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace MandelbrotTest
{
    public class DParkerImplementation
    {
        static public void Run()
        {
            var bigDecimalFactory = new BigDecimalFactory();
            var mathContextFactory = new MathContextFactory();
            var mandelbrot = new Mandelbrot.Mandelbrot(400, 400, bigDecimalFactory, mathContextFactory);
            var result = mandelbrot.DoCalculation(SuperSampleType.SUPER_SAMPLE_NONE);
            var palette = new SFTPaletteOld();
            var color0 = palette.GetColour(0);
            var color1 = palette.GetColour(1);
            var subarray = Utilities.SubArray(result.mBuffer, 20000, 100);
            var image2 = result.MakeTexture(new BufferedImageBuilder(), palette, SuperSampleType.SUPER_SAMPLE_NONE) as BufferedImage;
            var image = result.MakeTexture(new ImageBuilder(), palette, SuperSampleType.SUPER_SAMPLE_NONE) as ImageWrapper;
            FileStream outputStream = new FileStream(@"C:\Temp\dparker-output.png", FileMode.Create);
            image.image.SaveAsPng(outputStream);
            outputStream.Flush();
        }
    }
}
