using BigDecimalIKVM;
using java.math;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Formats.Jpeg;
using SixLabors.ImageSharp.PixelFormats;
using SixLabors.ImageSharp.Processing;
using SixLabors.Primitives;
using System;
using System.IO;

namespace MandelbrotTest
{
    class Program
    {
        

        static void Main(string[] args)
        {
            DParkerImplementation.Run();
            //IKVMImplementation.Run();
        }       
    }
}
