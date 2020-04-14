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

            var mSize = bigDecimalFactory.FromDouble(3.0);
            var mPos = bigDecimalFactory.FromDouble(-0.75); //, mathContextFactory.BigDecimal128());
            var mPosi = bigDecimalFactory.FromDouble(0); //, mathContextFactory.BigDecimal128());


            var result = mandelbrot.DoCalculation(SuperSampleType.SUPER_SAMPLE_NONE, mSize, mPos, mPosi);
            var palette = new SFTPaletteOld();
            var color0 = palette.GetColour(0);
            var color1 = palette.GetColour(1);
            var subarray = Utilities.SubArray(result.mBuffer, 20000, 100);
            var image2 = result.MakeTexture(new BufferedImageBuilder(), palette, SuperSampleType.SUPER_SAMPLE_NONE) as BufferedImage;
            var image = result.MakeTexture(new ImageBuilder(), palette, SuperSampleType.SUPER_SAMPLE_NONE) as ImageWrapper;
            FileStream outputStream = new FileStream(@$"C:\Temp\{outfile}.png", FileMode.Create);
            image.image.SaveAsPng(outputStream);
            outputStream.Flush();


            var x = 140;
            var y = 224;
            var size = 34;
            var canvas = new Canvas
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

            result = mandelbrot.DoCalculation(SuperSampleType.SUPER_SAMPLE_NONE, canvas.mSize, canvas.mPos, canvas.mPosi);
            image = result.MakeTexture(new ImageBuilder(), palette, SuperSampleType.SUPER_SAMPLE_NONE) as ImageWrapper;
            outputStream = new FileStream(@$"C:\Temp\{outfile}2.png", FileMode.Create);
            image.image.SaveAsPng(outputStream);
            outputStream.Flush();
        }
    }
}
