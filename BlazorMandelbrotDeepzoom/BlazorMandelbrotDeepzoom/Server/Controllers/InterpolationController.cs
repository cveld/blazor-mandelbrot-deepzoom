using BigDecimalDParker;
using BlazorMandelbrotDeepzoom.Shared;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Globalization;

namespace BlazorMandelbrotDeepzoom.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class InterpolationController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get(
            [FromQuery] string startReal,
            [FromQuery] string startImaginary,
            [FromQuery] string startSize,
            [FromQuery] string endReal,
            [FromQuery] string endImaginary,
            [FromQuery] string endSize,
            [FromQuery] int frames = 10,
            [FromQuery] int startIterationLimit = 1024,
            [FromQuery] int endIterationLimit = 1024)
        {
            if (string.IsNullOrWhiteSpace(startReal) || string.IsNullOrWhiteSpace(endReal))
                return BadRequest("startReal and endReal are required.");

            var factory = new BigDecimalFactory();
            var startPos = factory.FromString(startReal);
            var startPosi = factory.FromString(startImaginary ?? "0");
            var endPos = factory.FromString(endReal);
            var endPosi = factory.FromString(endImaginary ?? "0");

            double startSizeD = double.Parse(startSize, CultureInfo.InvariantCulture);
            double endSizeD = double.Parse(endSize, CultureInfo.InvariantCulture);
            double logStart = Math.Log(startSizeD);
            double logEnd = Math.Log(endSizeD);

            int totalFrames = Math.Max(1, frames);
            var result = new List<InterpolationFrameDTO>();

            for (int i = 0; i < totalFrames; i++)
            {
                var (pos, posi) = MovieFrameInterpolator.InterpolatePosition(
                    i, totalFrames,
                    startPos, startPosi, startSize,
                    endPos, endPosi, endSize,
                    factory);

                var size = factory.FromDouble(Math.Exp(logStart + (totalFrames > 1 ? (double)i / (totalFrames - 1) : 0.0) * (logEnd - logStart)));

                double t = totalFrames > 1 ? (double)i / (totalFrames - 1) : 0.0;
                int iterationLimit = (int)Math.Round(startIterationLimit + t * (endIterationLimit - startIterationLimit));

                result.Add(new InterpolationFrameDTO
                {
                    Frame = i,
                    Real = pos.ToString(),
                    Imaginary = posi.ToString(),
                    Size = size.ToString(),
                    IterationLimit = iterationLimit
                });
            }

            return Ok(result);
        }
    }
}
