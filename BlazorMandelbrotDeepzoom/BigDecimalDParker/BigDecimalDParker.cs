// copied from https://github.com/dparker1/BigDecimal
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Numerics;
using Mandelbrot;
using BigDecimalContracts;

namespace BigDecimalsDParker
{
    public partial class BigDecimal : IBigDecimal, IComparable<IBigDecimal>, ICloneable
    {
        // java BigDecimal uses other definitions:
        // scale is the number of digits behind the dot
        // precision is the number of digits

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

        public int JavaScale()
        {
            
            // the java definition of Scale is equal to c#'s Precision
            // the java definition of Precision is equal the length of the BigInteger (almost)
            return Precision;
        }
        public int JavaPrecision()
        {

            return Value >= 0 ? Value.ToString().Length : Value.ToString().Length - 1;
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
            this.MaxPrecision = 100;
            if (s.ToLower().Contains('e'))
            {
                HandleE(s.ToLower());
                return;
            }
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
            
        }

        public void HandleE(string s)
        {
            var idx = s.IndexOf('e');
            var potentialdot = s.Substring(idx - 1);
            var dotidx = s.IndexOf('.');
            var number = dotidx != -1 ? potentialdot.Remove(dotidx, 1) : potentialdot;            
            
            var bi = BigInteger.Parse(s.Substring(0, idx));
            var precision = dotidx != -1 ? idx - dotidx : 0;
            if (s[idx+1] == '-')
            {
                // 1E1 -> 10 -> 10 precision 0
                // 1E-1 -> 0.1 -> 1 precision 1
                // 3.24E-4 -> 0.000324 -> 324 precision 6
                precision += int.Parse(s.Substring(idx + 2));
                this.Value = bi;
            }
            else
            {
                var e = int.Parse(s.Substring(idx + 1));
                precision -= e;
                this.Value = bi * BigInteger.Pow(10, e);
            }

            this.Precision = precision;
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
        public IBigDecimal Add(IBigDecimal bd)
        {
            return this + (bd as BigDecimal);
        }

        private static BigDecimal Add(BigDecimal left, BigDecimal right, int maxPrecision)
        {
            BigInteger newVal = BigInteger.Pow(TEN, right.Precision) * left.Value + BigInteger.Pow(TEN, left.Precision) * right.Value;
            BigDecimal result = new BigDecimal(newVal, left.Precision + right.Precision, maxPrecision);
            result.Clean();
            return result;
        }

        public IBigDecimal Sub(IBigDecimal bd)
        {
            return this - (bd as BigDecimal);
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

        private IBigDecimal Mul(int i)
        {            
            return this.Mul(new BigDecimal(i));
        }
        private static BigDecimal Mul(BigDecimal ileft, BigDecimal iright, int maxPrecision)
        {
            var left = ileft;
            var right = iright;
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
                inter = new BigDecimal(2).Mul(BigDecimal.ONE / ((n.Mul(2) as BigDecimal) + new BigDecimal(1))).Mul(Pow(power, 2 * nInt + 1)) as BigDecimal;
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
            if (Precision == 0)
            {
                return Value.ToString();
            }
            string s = Value.Sign == -1 ? (-Value).ToString() : Value.ToString();
            while (Precision > s.Length - 1)
            {
                s = "0" + s;
            }

            return (Value.Sign == -1 ? "-" : String.Empty) + s.Insert(s.Length - Precision, ".");
        }

        public override int GetHashCode()
        {
            return base.GetHashCode();
        }

        public override bool Equals(object obj)
        {
            if (obj is BigDecimal)
            {
                return this.CompareTo(obj as IBigDecimal) == 0;
            }
            throw new ArgumentException("Object is not BigDecimal");
        }

        public int CompareTo(IBigDecimal other)
        {
            int precisionDifference = this.Precision - (other as BigDecimal).Precision;
            BigInteger thisV = this.Value, otherV = (other as BigDecimal).Value;
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
            if ((object)left == null && (object)right == null)
            {
                return true;
            }
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

        public IBigDecimal Add(IBigDecimal bd, IMathContext mathContext)
        {
            throw new NotImplementedException();
        }

        public IBigDecimal Mul(IBigDecimal bd, IMathContext mathContext)
        {
            throw new NotImplementedException();
        }

        public IBigDecimal Sub(IBigDecimal bd, IMathContext mathContext)
        {
            throw new NotImplementedException();
        }
    } // class
} // namespace