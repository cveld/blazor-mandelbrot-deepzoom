using java.awt;
using Mandelbrot;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Formats;
using SixLabors.ImageSharp.Metadata;
using SixLabors.ImageSharp.PixelFormats;
using System;
using System.Collections.Generic;
using System.Text;

namespace MandelbrotTest
{
    public class ImageWrapper : IMandelbrotImage
    {
        public Image<Rgba32> image;
        public ImageWrapper(int width, int height)
        {
            image = new Image<Rgba32>(width, height);
        }

        public void SetRGB(int x, int y, uint packed)
        {
            image[x, y] = new Rgba32(packed);
        }
    }
}
