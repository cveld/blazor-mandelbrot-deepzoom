using BigDecimals;
using System;
using System.Security.Cryptography.X509Certificates;

namespace Mandelbrot
{
    public class Mandelbrot
    {
        uint[] generated;
        public int Width { get; }
        public int Height { get; }
        public Mandelbrot(int xw, int yw)
        {
            Width = xw;
            Height = yw;
            generated = new uint[xw * yw * 4];
        }
        public uint[] Generate(BigDecimal xp, BigDecimal yp, BigDecimal scale)
        {
            var idx = 0;
            var random = new Random();
            for (int y = 0; y < Height; y++)
                for (int x = 0; x < Width; x++) {
                    generated[idx] = (uint)random.Next(255);
                    generated[idx + 1] = (uint)random.Next(255);
                    generated[idx + 2] = (uint)random.Next(255);
                    generated[idx + 3] = (uint)random.Next(255);
                    idx += 4;
                }

            return generated;
        }
    }
}
