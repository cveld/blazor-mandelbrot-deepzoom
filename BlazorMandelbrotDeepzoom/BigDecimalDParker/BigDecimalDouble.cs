using BigDecimalContracts;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Text;

namespace BigDecimalsDParker
{
    public partial class BigDecimal : IBigDecimal
    {
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
        
        public double DoubleValue()
        {
            //if (scale == 0 && intCompact != INFLATED)
            //    return (double)intCompact;
            // Somewhat inefficient, but guaranteed to work.
            return Double.Parse(this.ToString(), CultureInfo.InvariantCulture);
        }

        public IBigDecimal MovePointLeft(int n)
        {
            return new BigDecimal(Value, Precision + 1, MaxPrecision);
            // double factor = Math.Pow(10.0, (double)-n);
            // return this * new BigDecimal(factor);
        }
        public IBigDecimal MovePointRight(int n)
        {
            return new BigDecimal(Value, Precision - 1, MaxPrecision);

            // double factor = Math.Pow(10.0, (double)n);
            // return this * new BigDecimal(factor);
        }
       

        public IBigDecimal Mul(IBigDecimal bd)
        {
            return Mul(this, bd as BigDecimal, Math.Min(this.MaxPrecision, (bd as BigDecimal).MaxPrecision));
        }

        public BigDecimal(double d) : this(d.ToString(System.Globalization.CultureInfo.InvariantCulture))
        {           
        }
    }
}
