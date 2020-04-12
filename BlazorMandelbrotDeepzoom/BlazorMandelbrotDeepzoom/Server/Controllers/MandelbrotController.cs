using BigDecimalDParker;
using BlazorMandelbrotDeepzoom.Shared;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BlazorMandelbrotDeepzoom.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MandelbrotController : ControllerBase
    {
        int width = 400;
        int height = 400;
        [HttpGet]
        public byte[] Get()
        {
            var bigDecimalFactory = new BigDecimalFactory();
            var mathContextFactory = new MathContextFactory();
            Mandelbrot.Mandelbrot mandelbrot;
            mandelbrot = new Mandelbrot.Mandelbrot(width, height, bigDecimalFactory, mathContextFactory);
            var result = mandelbrot.DoCalculation(SuperSampleType.SUPER_SAMPLE_NONE);
            var imageBuilder = new ImageBuilder();
            var palette = new SFTPaletteOld();            
            var image = result.MakeTexture(imageBuilder, palette, SuperSampleType.SUPER_SAMPLE_NONE) as MandelbrotImage;
            return image.image;
        }
    }
}
