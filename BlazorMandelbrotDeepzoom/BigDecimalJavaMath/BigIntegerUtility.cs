using System;
using System.Collections.Generic;
using System.Numerics;
using System.Text;


namespace Mandelbrot
{
    static public class BigIntegerUtility
    {
        /**
 * This mask is used to obtain the value of an int as if it were unsigned.
 */
        static long LONG_MASK = 0xffffffffL;

        public static int intLen(this BigInteger bi)
        {
            // inefficient; but hopefully sufficient
            return (bi.ToByteArray().Length + 3) / 4;
        }

        public static int bitLength(this BigInteger bi)
        {
            return bi.ToByteArray().Length * 8;
        }

        // not clear why java's BigDecimal has access to java's BigInteger's compareMagnitude
        public static int compareMagnitude(this BigInteger bi, BigInteger otherbi)
        {
            return BigInteger.Abs(bi).CompareTo(BigInteger.Abs(otherbi));
        }

        


        // copied from
        // https://github.com/openjdk/jdk/blob/6bab0f539fba8fb441697846347597b4a0ade428/src/java.base/share/classes/java/math/MutableBigInteger.java
        /**
     * Compare this against half of a MutableBigInteger object (Needed for
     * remainder tests).
     * Assumes no leading unnecessary zeros, which holds for results
     * from divide().
     */
        // Returns 0, -1 or 1
        static int CompareHalf(this BigInteger _this, BigInteger b)
        {            
            int blen = intLen(b); // intLen
            int len = intLen(_this);  // intLen is a private member of MutableBigInteger
            if (len <= 0)
                return blen <= 0 ? 0 : -1;
            if (len > blen)
                return 1;
            if (len < blen - 1)
                return -1;
            uint[] bval = null; // b.value;
            int bstart = 0;
            uint carry = 0;
            // Only 2 cases left:len == blen or len == blen - 1
            if (len != blen)
            { // len == blen - 1
                if (bval[bstart] == 1)
                {
                    ++bstart;
                    carry = 0x80000000;
                }
                else
                    return -1;
            }
            // compare values with right-shifted values of b,
            // carrying shifted-out bits across words
            int[] val = null; //  _this.value;
            var offset = 0; // added
            for (int i = offset, j = bstart; i < len + offset;)
            {
                uint bv = bval[j++];
                long hb = ((bv >> 1) + carry) & LONG_MASK;
                long v = val[i++] & LONG_MASK;
                if (v != hb)
                    return v < hb ? -1 : 1;
                carry = (bv & 1) << 31; // carray will be either 0x80000000 or 0
            }
            return carry == 0 ? 0 : -1;
        }
    }
}
