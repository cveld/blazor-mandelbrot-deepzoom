using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace BlazorMandelbrotDeepzoom.Server
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var mandelbrot = new Mandelbrot.Mandelbrot(400, 400);
            mandelbrot.DoCalculation(400, 400, SuperSampleType.SUPER_SAMPLE_NONE);
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
