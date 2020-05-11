using System;
using System.Collections.Generic;
using System.Text;

namespace BlazorMandelbrotDeepzoom.Shared
{
    public class MandelbrotImageDTO
    {
        public byte[] Image { get; set; }
        public int NewIterationLimit { get; set; }
    }
}
