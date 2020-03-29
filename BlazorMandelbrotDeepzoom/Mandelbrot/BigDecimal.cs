// copied from https://github.com/dparker1/BigDecimal
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Numerics;

namespace BigDecimals
{
    public class BigDecimal : IComparable<BigDecimal>, ICloneable
    {
        private static readonly BigInteger TEN = new BigInteger(10);
        private static readonly BigInteger ONE = new BigInteger(1);
        private static readonly BigInteger ZERO = new BigInteger(0);
        private BigInteger Value { get; set; }
        private int Precision { get; set; }
        private int MaxPrecision { get; set; }

        public BigDecimal(BigDecimal v, int precision, int maxPrecision)
        {
            Value = v.Value;
            Precision = precision;
            MaxPrecision = maxPrecision;
        }

        public BigDecimal(BigDecimal v, int precision) : this(v, precision, 100) { }

        public BigDecimal(BigDecimal v) : this(v, 0) { }

        public BigDecimal(BigInteger v, int precision, int maxPrecision)
        {
            Value = v;
            Precision = precision;
            MaxPrecision = maxPrecision;
        }

        public BigDecimal(BigInteger v) : this(v, 0) { }

        public BigDecimal(BigInteger v, int precision) : this(v, precision, 100) { }

        public BigDecimal(int v) : this(new BigInteger(v), 0) { }

        public BigDecimal(int v, int precision) : this(new BigInteger(v), precision) { }

        public BigDecimal(int v, int precision, int maxPrecision) : this(new BigInteger(v), precision, maxPrecision) { }

        public BigDecimal(string s) : this(s, 100) { }

        public BigDecimal(string s, int maxPrecision)
        {
            int dec;
            if ((dec = s.IndexOf('.')) >= 0)
            {
                s = s.Remove(dec, 1);
            }
            else
            {
                dec = s.Length;
            }
            this.Value = BigInteger.Parse(s);
            this.Precision = s.Length - dec;
            this.MaxPrecision = 100;
        }

        public static implicit operator BigDecimal(BigInteger v)
        {
            return new BigDecimal(v);
        }

        public static implicit operator BigDecimal(int v)
        {
            return new BigDecimal(v);
        }

        public static BigDecimal operator +(BigDecimal left, BigDecimal right)
        {
            return Add(left, right, Math.Min(left.MaxPrecision, right.MaxPrecision));
        }

        private static BigDecimal Add(BigDecimal left, BigDecimal right, int maxPrecision)
        {
            BigInteger newVal = BigInteger.Pow(TEN, right.Precision) * left.Value + BigInteger.Pow(TEN, left.Precision) * right.Value;
            BigDecimal result = new BigDecimal(newVal, left.Precision + right.Precision, maxPrecision);
            result.Clean();
            return result;
        }

        public static BigDecimal operator -(BigDecimal left, BigDecimal right)
        {
            return Sub(left, right, Math.Min(left.MaxPrecision, right.MaxPrecision));
        }

        private static BigDecimal Sub(BigDecimal left, BigDecimal right, int maxPrecision)
        {
            BigInteger newVal = BigInteger.Pow(TEN, right.Precision) * left.Value - BigInteger.Pow(TEN, left.Precision) * right.Value;
            BigDecimal result = new BigDecimal(newVal, left.Precision + right.Precision, maxPrecision);
            result.Clean();
            return result;
        }

        public static BigDecimal operator *(BigDecimal left, BigDecimal right)
        {
            return Mul(left, right, Math.Min(left.MaxPrecision, right.MaxPrecision));
        }

        private static BigDecimal Mul(BigDecimal left, BigDecimal right, int maxPrecision)
        {
            BigDecimal result = new BigDecimal(left.Value * right.Value, left.Precision + right.Precision, maxPrecision);
            result.Clean();
            return result;
        }

        public static BigDecimal operator /(BigDecimal left, BigDecimal right)
        {
            return Div(left, right, Math.Min(left.MaxPrecision, right.MaxPrecision));
        }

        private static BigDecimal Div(BigDecimal left, BigDecimal right, int maxPrecision)
        {
            BigDecimal result = new BigDecimal(new BigInteger(0), left.Precision - right.Precision, maxPrecision);
            BigInteger leftVal = left.Value, rightVal = right.Value, division;
            while (result.Precision < result.MaxPrecision && leftVal != ZERO)
            {
                if (leftVal < rightVal)
                {
                    leftVal *= TEN;
                    result.Precision++;
                }
                division = leftVal / rightVal;
                result.Value = (result.Value * TEN) + division;
                leftVal -= division * rightVal;

            }
            result.Clean();
            return result;
        }

        public static BigDecimal Sqrt(BigDecimal x, int maxPrecision)
        {
            if (x.Value > 0)
            {
                string s_b = x.ToString();
                int decimalIndex = s_b.IndexOf('.');
                BigDecimal result = new BigDecimal(0, -(int)Math.Ceiling(decimalIndex / 2.0), maxPrecision);
                if (decimalIndex % 2 == 1)
                {
                    s_b = "0" + s_b;
                    s_b = s_b.Remove(decimalIndex + 1, 1);
                }
                else
                {
                    s_b = s_b.Remove(decimalIndex, 1);
                }
                if ((s_b.Length - decimalIndex) % 2 == Convert.ToInt32(s_b[0] != '0'))
                {
                    s_b = s_b + "0";
                }

                Queue<int> digitPairs = new Queue<int>();
                for (int i = 0; i < s_b.Length; i += 2)
                {
                    digitPairs.Enqueue(int.Parse(s_b.Substring(i, 2)));
                }
                BigInteger remainder = 0, currentValue = 0;
                while (digitPairs.Count >= 0 && result.Precision <= maxPrecision)
                {
                    if (remainder == 0 && digitPairs.Count == 0)
                    {
                        break;
                    }
                    if (digitPairs.Count > 0)
                    {
                        currentValue = remainder * 100 + digitPairs.Dequeue();
                    }
                    else
                    {
                        currentValue = remainder * 100;
                    }

                    BigInteger y_base = 20 * result.Value, y = 0;
                    int x_max = 0;
                    do
                    {
                        x_max++;
                        y = x_max * (y_base + x_max);
                    } while (y <= currentValue);
                    x_max--;
                    y = x_max * (y_base + x_max);
                    remainder = currentValue - y;
                    result.Value = result.Value * 10 + x_max;
                    result.Precision++;

                }
                return result;
            }
            else if (x.Value == 0)
            {
                return new BigDecimal(ZERO, 0, maxPrecision);
            }
            throw new ArgumentException("Argument to square root is negative.");

        }

        public static BigDecimal Sqrt(BigDecimal x)
        {
            return Sqrt(x, x.MaxPrecision);
        }

        private static BigDecimal PowRecur(BigDecimal b, int e, int maxPrecision)
        {
            BigDecimal result;
            if (e == 0)
            {
                return new BigDecimal(ONE, maxPrecision);
            }
            if (e == 1)
            {
                return new BigDecimal(b, b.Precision, maxPrecision);
            }
            if (e == 2)
            {
                result = Mul(b, b, maxPrecision);
                return result;
            }
            if (e % 2 == 1)
            {
                result = Mul(b, Pow(b, e - 1, maxPrecision + b.Precision), maxPrecision + b.Precision);
                return result;
            }
            else
            {
                result = Pow(b, e / 2, maxPrecision + b.Precision);
                result = Mul(result, result, maxPrecision + b.Precision);
                return result;
            }
        }

        public static BigDecimal Pow(BigDecimal b, int e, int maxPrecision)
        {
            BigDecimal result = PowRecur(b, e, maxPrecision);
            result.Clean(b.Precision);
            return result;
        }

        public static BigDecimal Pow(BigDecimal b, int e)
        {
            BigDecimal result = PowRecur(b, e, b.MaxPrecision);
            result.Clean();
            return result;
        }

        public static BigDecimal Ln(BigDecimal x)
        {
            return Ln(x, x.MaxPrecision);
        }

        public static BigDecimal Ln(BigDecimal x, int maxPrecision)
        {
            maxPrecision++;
            BigDecimal result = new BigDecimal(0, 0, maxPrecision);
            BigDecimal inter = new BigDecimal(0, 0, maxPrecision);
            BigDecimal bound = new BigDecimal(1, maxPrecision, maxPrecision);
            BigDecimal power = Div((x - ONE), (x + ONE), maxPrecision);
            BigDecimal n = new BigDecimal(0, 0, maxPrecision);
            int nInt = 0, oldWhole = 0;
            do
            {
                inter = 2 * (1 / (2 * n + 1)) * Pow(power, 2 * nInt + 1);
                n += 1;
                nInt += 1;
                result += inter;
                int whole = result.ToString().Split('.')[0].Length;
                if (whole > 0 && whole != oldWhole)
                {
                    result = new BigDecimal(result, result.Precision, result.MaxPrecision + (whole - oldWhole));
                    bound = new BigDecimal(1, maxPrecision + whole, maxPrecision + (whole - oldWhole));
                    power = Div((x - ONE), (x + ONE), maxPrecision + (whole - oldWhole));
                    n = new BigDecimal(n, n.Precision, maxPrecision + (whole - oldWhole));
                    oldWhole = whole;
                }
            } while (inter > bound);

            result.MaxPrecision -= (oldWhole + 1);
            result.Clean();
            return result;
        }

        public static BigDecimal Exp(BigDecimal x)
        {
            return Exp(x, x.MaxPrecision);
        }

        public static BigDecimal Exp(BigDecimal x, int maxPrecision)
        {
            maxPrecision++;
            BigDecimal result = new BigDecimal(1, 0, maxPrecision);
            BigDecimal denom = new BigDecimal(1, 0, maxPrecision);
            BigDecimal numer = new BigDecimal(x, x.Precision, maxPrecision);
            BigDecimal inter = new BigDecimal(0, 0, maxPrecision);
            BigDecimal bound = new BigDecimal(1, maxPrecision, maxPrecision);
            int nInt = 2, oldWhole = 0, whole = 0;
            do
            {
                inter = Div(numer, denom, maxPrecision + (whole - oldWhole));
                denom = Mul(denom, nInt, maxPrecision);
                numer = Mul(numer, x, maxPrecision);
                result += inter;
                nInt++;
                whole = result.ToString().Split('.')[0].Length;
                if (whole > 0 && whole != oldWhole)
                {
                    result = new BigDecimal(result, result.Precision, result.MaxPrecision + (whole - oldWhole));
                    bound = new BigDecimal(1, maxPrecision + whole, maxPrecision + (whole - oldWhole));
                    denom = new BigDecimal(denom, denom.Precision, maxPrecision + (whole - oldWhole));
                    numer = new BigDecimal(numer, numer.Precision, maxPrecision + (whole - oldWhole));
                    oldWhole = whole;
                }
            } while (inter > bound);

            result.MaxPrecision -= oldWhole;
            result.Clean();
            return result;
        }

        public void Clean(int offset)
        {
            while (Precision > 0 && Value % TEN == 0)
            {
                Value /= TEN;
                Precision--;
            }
            while (Precision > (MaxPrecision - offset))
            {
                Value /= TEN;
                Precision--;
            }
        }

        public void Clean()
        {
            Clean(0);
        }

        public override string ToString()
        {
            string s = Value.ToString();
            while (Precision > s.Length)
            {
                s = "0" + s;
            }
            return s.Insert(s.Length - Precision, ".");
        }

        public override int GetHashCode()
        {
            return base.GetHashCode();
        }

        public override bool Equals(object obj)
        {
            if (obj is BigDecimal)
            {
                return this.CompareTo((BigDecimal)obj) == 0;
            }
            throw new ArgumentException("Object is not BigDecimal");
        }

        public int CompareTo(BigDecimal other)
        {
            int precisionDifference = this.Precision - other.Precision;
            BigInteger thisV = this.Value, otherV = other.Value;
            while (precisionDifference > 0)
            {
                otherV *= TEN;
                precisionDifference--;
            }
            while (precisionDifference < 0)
            {
                thisV *= TEN;
                precisionDifference++;
            }
            if (thisV > otherV)
            {
                return 1;
            }
            else if (thisV < otherV)
            {
                return -1;
            }
            return 0;
        }

        public static bool operator >(BigDecimal left, BigDecimal right)
        {
            return left.CompareTo(right) > 0;
        }

        public static bool operator <(BigDecimal left, BigDecimal right)
        {
            return left.CompareTo(right) < 0;
        }

        public static bool operator ==(BigDecimal left, BigDecimal right)
        {
            return left.CompareTo(right) == 0;
        }

        public static bool operator !=(BigDecimal left, BigDecimal right)
        {
            return !(left == right);
        }

        public static bool operator >=(BigDecimal left, BigDecimal right)
        {
            return left.CompareTo(right) >= 0;
        }

        public static bool operator <=(BigDecimal left, BigDecimal right)
        {
            return left.CompareTo(right) <= 0;
        }

        public object Clone()
        {
            return new BigDecimal(this);
        }

        private int scale;
        /**
 * Translates a {@code double} into a {@code BigDecimal} which
 * is the exact decimal representation of the {@code double}'s
 * binary floating-point value.  The scale of the returned
 * {@code BigDecimal} is the smallest value such that
 * <tt>(10<sup>scale</sup> &times; val)</tt> is an integer.
 * <p>
 * <b>Notes:</b>
 * <ol>
 * <li>
 * The results of this constructor can be somewhat unpredictable.
 * One might assume that writing {@code new BigDecimal(0.1)} in
 * Java creates a {@code BigDecimal} which is exactly equal to
 * 0.1 (an unscaled value of 1, with a scale of 1), but it is
 * actually equal to
 * 0.1000000000000000055511151231257827021181583404541015625.
 * This is because 0.1 cannot be represented exactly as a
 * {@code double} (or, for that matter, as a binary fraction of
 * any finite length).  Thus, the value that is being passed
 * <i>in</i> to the constructor is not exactly equal to 0.1,
 * appearances notwithstanding.
 *
 * <li>
 * The {@code String} constructor, on the other hand, is
 * perfectly predictable: writing {@code new BigDecimal("0.1")}
 * creates a {@code BigDecimal} which is <i>exactly</i> equal to
 * 0.1, as one would expect.  Therefore, it is generally
 * recommended that the {@linkplain #BigDecimal(String)
 * <tt>String</tt> constructor} be used in preference to this one.
 *
 * <li>
 * When a {@code double} must be used as a source for a
 * {@code BigDecimal}, note that this constructor provides an
 * exact conversion; it does not give the same result as
 * converting the {@code double} to a {@code String} using the
 * {@link Double#toString(double)} method and then using the
 * {@link #BigDecimal(String)} constructor.  To get that result,
 * use the {@code static} {@link #valueOf(double)} method.
 * </ol>
 *
 * @param val {@code double} value to be converted to
 *        {@code BigDecimal}.
 * @throws NumberFormatException if {@code val} is infinite or NaN.
 */
        public BigDecimal(double val)
        {
            if (Double.IsInfinity(val) || Double.IsNaN(val))
                throw new FormatException("Infinite or NaN");

            // Translate the double into sign, exponent and significand, according
            // to the formulae in JLS, Section 20.10.22.
            long valBits = BitConverter.DoubleToInt64Bits(val);
            int sign = ((valBits >> 63) == 0 ? 1 : -1);
            int exponent = (int)((valBits >> 52) & 0x7ffL);
            long significand = (exponent == 0 ? (valBits & ((1L << 52) - 1)) << 1
                                : (valBits & ((1L << 52) - 1)) | (1L << 52));
            exponent -= 1075;
            // At this point, val == sign * significand * 2**exponent.

            /*
             * Special case zero to supress nonterminating normalization
             * and bogus scale calculation.
             */
            if (significand == 0)
            {
                Value = BigInteger.Zero;
                // intCompact = 0;
                Precision = 1;
                return;
            }

            // Normalize
            while ((significand & 1) == 0)
            {    //  i.e., significand is even
                significand >>= 1;
                exponent++;
            }

            // Calculate intVal and scale
            long s = sign * significand;
            BigInteger b;
            if (exponent < 0)
            {
                b = BigInteger.Pow(new BigInteger(5), -exponent) * s;
                scale = -exponent;
            }
            else if (exponent > 0)
            {
                b = BigInteger.Pow(new BigInteger(2), exponent) * s;
            }
            else
            {
                b = new BigInteger(s);
            }
            // intCompact = compactValFor(b);
            Value = b; // (intCompact != INFLATED) ? null : b;
        } // method
        public double doubleValue()
        {
            //if (scale == 0 && intCompact != INFLATED)
            //    return (double)intCompact;
            // Somewhat inefficient, but guaranteed to work.
            return Double.Parse(this.ToString());
        }

        public BigDecimal MovePointLeft(int n)
        {
            double factor = Math.Pow(10.0, (double)-n);
            return this * new BigDecimal(factor);
        }
    } // class
} // namespace