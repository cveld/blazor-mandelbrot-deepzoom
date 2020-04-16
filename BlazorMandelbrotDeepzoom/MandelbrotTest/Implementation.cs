using BigDecimalContracts;
using BlazorMandelbrotDeepzoom.Client.Models;
using BlazorMandelbrotDeepzoom.Client.Pages;
using Mandelbrot;
using SixLabors.ImageSharp;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace MandelbrotTest
{
    public class Implementation
    {
        public static void Run(IBigDecimalFactory bigDecimalFactory, IMathContextFactory mathContextFactory, string outfile)
        {
            var mandelbrot = new Mandelbrot.Mandelbrot(400, 400, bigDecimalFactory, mathContextFactory);

            ImageWrapper image;
            FileStream outputStream;
            IndexBuffer2D result;
            var palette = new SFTPaletteOld();

            /*
            IBigDecimal mSize = bigDecimalFactory.FromDouble(3.0);
            IBigDecimal mPos = bigDecimalFactory.FromDouble(-0.75); //, mathContextFactory.BigDecimal128());
            IBigDecimal mPosi = bigDecimalFactory.FromDouble(0); //, mathContextFactory.BigDecimal128());
            int iterationlimit = 1024;
                       
            var result = mandelbrot.DoCalculation(SuperSampleType.SUPER_SAMPLE_NONE, mSize, mPos, mPosi, iterationlimit);
            
            var subarray = Utilities.SubArray(result.mBuffer, 20000, 100);
            var image2 = result.MakeTexture(new BufferedImageBuilder(), palette, SuperSampleType.SUPER_SAMPLE_NONE) as BufferedImage;
            var image = result.MakeTexture(new ImageBuilder(), palette, SuperSampleType.SUPER_SAMPLE_NONE) as ImageWrapper;
            FileStream outputStream = new FileStream(@$"C:\Temp\{outfile}.png", FileMode.Create);
            image.image.SaveAsPng(outputStream);
            outputStream.Flush();

            var x = 140;
            var y = 224;
            var size = 34;
            var canvas = new Canvas(bigDecimalFactory, mathContextFactory)
            {
                mPos = mPos,
                mPosi = mPosi,
                mSize = mSize
            };
            canvas.SetCoords(new Rect
            {
                startX = 140,
                startY = 224,
                w = 34
            });

            result = mandelbrot.DoCalculation(SuperSampleType.SUPER_SAMPLE_NONE, canvas.mSize, canvas.mPos, canvas.mPosi, iterationlimit);
            image = result.MakeTexture(new ImageBuilder(), palette, SuperSampleType.SUPER_SAMPLE_NONE) as ImageWrapper;
            outputStream = new FileStream(@$"C:\Temp\{outfile}2.png", FileMode.Create);
            image.image.SaveAsPng(outputStream);
            outputStream.Flush();

    */

            result = mandelbrot.DoCalculation(SuperSampleType.SUPER_SAMPLE_NONE, "5.34744E-27", "-1.26399640515890781812918478966086061", "0.38328365760316690687368376596728907", 1792);
            image = result.MakeTexture(new ImageBuilder(), palette, SuperSampleType.SUPER_SAMPLE_NONE) as ImageWrapper;
            outputStream = new FileStream(@$"C:\Temp\{outfile}3.png", FileMode.Create);
            image.image.SaveAsPng(outputStream);
            outputStream.Flush();
        }
    }
}
