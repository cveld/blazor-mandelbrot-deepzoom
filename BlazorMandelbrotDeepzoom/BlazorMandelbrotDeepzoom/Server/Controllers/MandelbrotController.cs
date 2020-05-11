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
        public MandelbrotImageDTO Get(string pos, string posi, string size, int iterationlimit)
        {
            var bigDecimalFactory = new BigDecimalFactory();
            var mathContextFactory = new MathContextFactory();
            Mandelbrot.Mandelbrot mandelbrot;
            mandelbrot = new Mandelbrot.Mandelbrot(width, height, bigDecimalFactory, mathContextFactory);
            var mpos = bigDecimalFactory.FromString(pos);
            var mposi = bigDecimalFactory.FromString(posi);
            var msize = bigDecimalFactory.FromString(size);
            var result = mandelbrot.DoCalculation(SuperSampleType.SUPER_SAMPLE_NONE, msize, mpos, mposi, iterationlimit);
            var imageBuilder = new ImageBuilder();
            var palette = new SFTPaletteOld();            
            var image = result.MakeTexture(imageBuilder, palette, SuperSampleType.SUPER_SAMPLE_NONE) as MandelbrotImage;
            return new MandelbrotImageDTO
            {
                Image = image.image,
                NewIterationLimit = mandelbrot.GetNewIterationLimit(iterationlimit)
            };
        }
    }
}
