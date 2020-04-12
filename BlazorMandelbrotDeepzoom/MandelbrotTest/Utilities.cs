using System;
using System.Collections.Generic;
using System.Text;

namespace MandelbrotTest
{
    public class Utilities
    {
        public static T[] SubArray<T>(T[] data, int index, int length)
        {
            T[] result = new T[length];
            Array.Copy(data, index, result, 0, length);
            return result;
        }
    }
}
