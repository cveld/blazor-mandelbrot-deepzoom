using System;
using System.Collections.Generic;
using System.Text;
using System.Numerics;
using Mandelbrot;

namespace BigDecimalsJava {
    /*
     * Copyright (c) 1996, 2011, Oracle and/or its affiliates. All rights reserved.
     * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
     *
     * This code is free software; you can redistribute it and/or modify it
     * under the terms of the GNU General Public License version 2 only, as
     * published by the Free Software Foundation.  Oracle designates this
     * particular file as subject to the "Classpath" exception as provided
     * by Oracle in the LICENSE file that accompanied this code.
     *
     * This code is distributed in the hope that it will be useful, but WITHOUT
     * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
     * FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License
     * version 2 for more details (a copy is included in the LICENSE file that
     * accompanied this code).
     *
     * You should have received a copy of the GNU General Public License version
     * 2 along with this work; if not, write to the Free Software Foundation,
     * Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110-1301 USA.
     *
     * Please contact Oracle, 500 Oracle Parkway, Redwood Shores, CA 94065 USA
     * or visit www.oracle.com if you need additional information or have any
     * questions.
     */

    /*
     * Portions Copyright IBM Corporation, 2001. All Rights Reserved.
     */

    /**
     * Immutable, arbitrary-precision signed decimal numbers.  A
     * {@code BigDecimal} consists of an arbitrary precision integer
     * <i>unscaled value</i> and a 32-bit integer <i>scale</i>.  If Zero
     * or positive, the scale is the number of digits to the right of the
     * decimal point.  If negative, the unscaled value of the number is
     * multiplied by ten to the power of the negation of the scale.  The
     * value of the number represented by the {@code BigDecimal} is
     * therefore <tt>(unscaledValue &times; 10<sup>-scale</sup>)</tt>.
     *
     * <p>The {@code BigDecimal} class provides operations for
     * arithmetic, scale manipulation, rounding, comparison, hashing, and
     * format conversion.  The {@link #ToString} method provides a
     * canonical representation of a {@code BigDecimal}.
     *
     * <p>The {@code BigDecimal} class gives its user complete control
     * over rounding behavior.  If no rounding mode is specified and the
     * exact result cannot be represented, an exception is thrown;
     * otherwise, calculations can be carried out to a chosen precision
     * and rounding mode by supplying an appropriate {@link MathContext}
     * object to the operation.  In either case, eight <em>rounding
     * modes</em> are provided for the control of rounding.  Using the
     * integer fields in this class (such as {@link #ROUND_HALF_UP}) to
     * represent rounding mode is largely obsolete; the enumeration values
     * of the {@code RoundingModeEnum} {@code enum}, (such as {@link
     * RoundingModeEnum#HALF_UP}) should be used instead.
     *
     * <p>When a {@code MathContext} object is supplied with a precision
     * setting of 0 (for example, {@link MathContext#UNLIMITED}),
     * arithmetic operations are exact, as are the arithmetic methods
     * which take no {@code MathContext} object.  (This is the only
     * behavior that was supported in releases prior to 5.)  As a
     * corollary of computing the exact result, the rounding mode setting
     * of a {@code MathContext} object with a precision setting of 0 is
     * not used and thus irrelevant.  In the case of divide, the exact
     * quotient could have an infinitely long decimal expansion; for
     * example, 1 divided by 3.  If the quotient has a nonterminating
     * decimal expansion and the operation is specified to return an exact
     * result, an {@code ArithmeticException} is thrown.  Otherwise, the
     * exact result of the division is returned, as done for other
     * operations.
     *
     * <p>When the precision setting is not 0, the rules of
     * {@code BigDecimal} arithmetic are broadly compatible with selected
     * modes of operation of the arithmetic defined in ANSI X3.274-1996
     * and ANSI X3.274-1996/AM 1-2000 (section 7.4).  Unlike those
     * standards, {@code BigDecimal} includes many rounding modes, which
     * were mandatory for division in {@code BigDecimal} releases prior
     * to 5.  Any conflicts between these ANSI standards and the
     * {@code BigDecimal} specification are resolved in favor of
     * {@code BigDecimal}.
     *
     * <p>Since the same numerical value can have different
     * representations (with different scales), the rules of arithmetic
     * and rounding must specify both the numerical result and the scale
     * used in the result's representation.
     *
     *
     * <p>In general the rounding modes and precision setting determine
     * how operations return results with a limited number of digits when
     * the exact result has more digits (perhaps infinitely many in the
     * case of division) than the number of digits returned.
     *
     * First, the
     * total number of digits to return is specified by the
     * {@code MathContext}'s {@code precision} setting; this determines
     * the result's <i>precision</i>.  The digit count starts from the
     * leftmost nonZero digit of the exact result.  The rounding mode
     * determines how any discarded trailing digits affect the returned
     * result.
     *
     * <p>For all arithmetic operators , the operation is carried out as
     * though an exact intermediate result were first calculated and then
     * rounded to the number of digits specified by the precision setting
     * (if necessary), using the selected rounding mode.  If the exact
     * result is not returned, some digit positions of the exact result
     * are discarded.  When rounding increases the magnitude of the
     * returned result, it is possible for a new digit position to be
     * created by a carry propagating to a leading {@literal "9"} digit.
     * For example, rounding the value 999.9 to three digits rounding up
     * would be numerically equal to one thousand, represented as
     * 100&times;10<sup>1</sup>.  In such cases, the new {@literal "1"} is
     * the leading digit position of the returned result.
     *
     * <p>Besides a logical exact result, each arithmetic operation has a
     * preferred scale for representing a result.  The preferred
     * scale for each operation is listed in the table below.
     *
     * <table border>
     * <caption><b>Preferred Scales for Results of Arithmetic Operations
     * </b></caption>
     * <tr><th>Operation</th><th>Preferred Scale of Result</th></tr>
     * <tr><td>Add</td><td>Max(addend.Scale, augend.Scale)</td>
     * <tr><td>Subtract</td><td>Max(minuend.Scale, subtrahend.Scale)</td>
     * <tr><td>Multiply</td><td>multiplier.Scale + multiplicand.Scale</td>
     * <tr><td>Divide</td><td>dividend.Scale - divisor.Scale</td>
     * </table>
     *
     * These scales are the ones used by the methods which return exact
     * arithmetic results; except that an exact divide may have to use a
     * larger scale since the exact result may have more digits.  For
     * example, {@code 1/32} is {@code 0.03125}.
     *
     * <p>Before rounding, the scale of the logical exact intermediate
     * result is the preferred scale for that operation.  If the exact
     * numerical result cannot be represented in {@code precision}
     * digits, rounding selects the set of digits to return and the scale
     * of the result is reduced from the scale of the intermediate result
     * to the least scale which can represent the {@code precision}
     * digits actually returned.  If the exact result can be represented
     * with at most {@code precision} digits, the representation
     * of the result with the scale closest to the preferred scale is
     * returned.  In particular, an exactly representable quotient may be
     * represented in fewer than {@code precision} digits by removing
     * trailing Zeros and decreasing the scale.  For example, rounding to
     * three digits using the {@linkplain RoundingModeEnum#FLOOR floor}
     * rounding mode, <br>
     *
     * {@code 19/100 = 0.19   // integer=19,  scale=2} <br>
     *
     * but<br>
     *
     * {@code 21/110 = 0.190  // integer=190, scale=3} <br>
     *
     * <p>Note that for add, subtract, and multiply, the reduction in
     * scale will equal the number of digit positions of the exact result
     * which are discarded. If the rounding causes a carry propagation to
     * create a new high-order digit position, an additional digit of the
     * result is discarded than when no new digit position is created.
     *
     * <p>Other methods may have slightly different rounding semantics.
     * For example, the result of the {@code pow} method using the
     * {@linkplain #pow(int, MathContext) specified algorithm} can
     * occasionally differ from the rounded mathematical result by more
     * than one unit in the last place, one <i>{@linkplain #ulp() ulp}</i>.
     *
     * <p>Two types of operations are provided for manipulating the scale
     * of a {@code BigDecimal}: scaling/rounding operations and decimal
     * point motion operations.  Scaling/rounding operations ({@link
     * #setScale setScale} and {@link #round round}) return a
     * {@code BigDecimal} whose value is approximately (or exactly) equal
     * to that of the operand, but whose scale or precision is the
     * specified value; that is, they increase or decrease the precision
     * of the stored number with minimal effect on its value.  Decimal
     * point motion operations ({@link #movePointLeft movePointLeft} and
     * {@link #movePointRight movePointRight}) return a
     * {@code BigDecimal} created from the operand by moving the decimal
     * point a specified distance in the specified direction.
     *
     * <p>For the sake of brevity and clarity, pseudo-code is used
     * throughout the descriptions of {@code BigDecimal} methods.  The
     * pseudo-code expression {@code (i + j)} is shorthand for "a
     * {@code BigDecimal} whose value is that of the {@code BigDecimal}
     * {@code i} added to that of the {@code BigDecimal}
     * {@code j}." The pseudo-code expression {@code (i == j)} is
     * shorthand for "{@code true} if and only if the
     * {@code BigDecimal} {@code i} represents the same value as the
     * {@code BigDecimal} {@code j}." Other pseudo-code expressions
     * are interpreted similarly.  Square brackets are used to represent
     * the particular {@code BigInteger} and scale pair defining a
     * {@code BigDecimal} value; for example [19, 2] is the
     * {@code BigDecimal} numerically equal to 0.19 having a scale of 2.
     *
     * <p>Note: care should be exercised if {@code BigDecimal} objects
     * are used as keys in a {@link java.util.SortedMap SortedMap} or
     * elements in a {@link java.util.SortedSet SortedSet} since
     * {@code BigDecimal}'s <i>natural ordering</i> is <i>inconsistent
     * with equals</i>.  See {@link Comparable}, {@link
     * java.util.SortedMap} or {@link java.util.SortedSet} for more
     * information.
     *
     * <p>All methods and constructors for this class throw
     * {@code NullPointerException} when passed a {@code null} object
     * reference for any input parameter.
     *
     * @see     BigInteger
     * @see     MathContext
     * @see     RoundingModeEnum
     * @see     java.util.SortedMap
     * @see     java.util.SortedSet
     * @author  Josh Bloch
     * @author  Mike Cowlishaw
     * @author  Joseph D. Darcy
     */
    public class BigDecimal : IComparable<BigDecimal> {
        /**
         * The unscaled value of this BigDecimal, as returned by {@link
         * #unscaledValue}.
         *
         * @serial
         * @see #unscaledValue
         */
        private BigInteger? intVal;

        /**
         * The scale of this BigDecimal, as returned by {@link #scale}.
         *
         * @serial
         * @see #scale
         */
        private int scale;  // Note: this may have any value, so
                            // calculations must be done in longs
        /**
         * The number of decimal digits in this BigDecimal, or 0 if the
         * number of digits are not known (lookaside information).  If
         * nonZero, the value is guaranteed correct.  Use the Precision
         * method to obtain and set the value if it might be 0.  This
         * field is mutable until set nonZero.
         *
         * @since  1.5
         */
        private int precision;

        /**
         * Used to store the canonical string representation, if computed.
         */
        private String stringCache;

        /**
         * Sentinel value for {@link #intCompact} indicating the
         * significand information is only available from {@code intVal}.
         */
        static long INFLATED = long.MinValue;

        /**
         * If the absolute value of the significand of this BigDecimal is
         * less than or equal to {@code long.MaxValue}, the value can be
         * compactly stored in this field and used in computations.
         */
        private long intCompact;

        // All 18-digit base ten strings fit into a long; not all 19-digit
        // strings will
        private static int Max_COMPACT_DIGITS = 18;

        private static int Max_BIGINT_BITS = 62;

        /* Appease the serialization gods */
        private static long serialVersionUID = 6108874887143696463L;

        /*
         * part of the java implementation. To be ported to c# 
    private static ThreadLocal<StringBuilderHelper>

        threadLocalStringBuilderHelper = new ThreadLocal<StringBuilderHelper>() {
            @Override
            protected StringBuilderHelper initialValue()
    {
        return new StringBuilderHelper();
    }
        };
        */

        // Cache of common small BigDecimal values.
        private static BigDecimal[] ZeroThroughTen = {
        new BigDecimal(BigInteger.Zero,         0,  0, 1),
        new BigDecimal(BigInteger.One,          1,  0, 1),
        new BigDecimal(new BigInteger(2),   2,  0, 1),
        new BigDecimal(new BigInteger(3),   3,  0, 1),
        new BigDecimal(new BigInteger(4),   4,  0, 1),
        new BigDecimal(new BigInteger(5),   5,  0, 1),
        new BigDecimal(new BigInteger(6),   6,  0, 1),
        new BigDecimal(new BigInteger(7),   7,  0, 1),
        new BigDecimal(new BigInteger(8),   8,  0, 1),
        new BigDecimal(new BigInteger(9),   9,  0, 1),
        new BigDecimal(new BigInteger(10),          10, 0, 2),
    };

        // Cache of Zero scaled by 0 - 15
        private static BigDecimal[] Zero_SCALED_BY = {
        ZeroThroughTen[0],
        new BigDecimal(BigInteger.Zero, 0, 1, 1),
        new BigDecimal(BigInteger.Zero, 0, 2, 1),
        new BigDecimal(BigInteger.Zero, 0, 3, 1),
        new BigDecimal(BigInteger.Zero, 0, 4, 1),
        new BigDecimal(BigInteger.Zero, 0, 5, 1),
        new BigDecimal(BigInteger.Zero, 0, 6, 1),
        new BigDecimal(BigInteger.Zero, 0, 7, 1),
        new BigDecimal(BigInteger.Zero, 0, 8, 1),
        new BigDecimal(BigInteger.Zero, 0, 9, 1),
        new BigDecimal(BigInteger.Zero, 0, 10, 1),
        new BigDecimal(BigInteger.Zero, 0, 11, 1),
        new BigDecimal(BigInteger.Zero, 0, 12, 1),
        new BigDecimal(BigInteger.Zero, 0, 13, 1),
        new BigDecimal(BigInteger.Zero, 0, 14, 1),
        new BigDecimal(BigInteger.Zero, 0, 15, 1),
    };

        // Half of long.MIN_VALUE & long.MaxValue.
        private static long HALF_long_MaxValue = long.MaxValue / 2;
        private static long HALF_long_MIN_VALUE = long.MinValue / 2;

        // Constants
        /**
         * The value 0, with a scale of 0.
         *
         * @since  1.5
         */
        public static BigDecimal Zero =
                ZeroThroughTen[0];

        /**
         * The value 1, with a scale of 0.
         *
         * @since  1.5
         */
        public static BigDecimal ONE =
            ZeroThroughTen[1];

        /**
         * The value 10, with a scale of 0.
         *
         * @since  1.5
         */
        public static BigDecimal TEN =
            ZeroThroughTen[10];

        // Constructors

        /**
         * Trusted package private constructor.
         * Trusted simply means if val is INFLATED, intVal could not be null and
         * if intVal is null, val could not be INFLATED.
         */
        BigDecimal(BigInteger? intVal, long val, int scale, int prec)
        {
            this.scale = scale;
            this.precision = prec;
            this.intCompact = val;
            this.intVal = intVal;
        }

        /**
         * Translates a character array representation of a
         * {@code BigDecimal} into a {@code BigDecimal}, accepting the
         * same sequence of characters as the {@link #BigDecimal(String)}
         * constructor, while allowing a sub-array to be specified.
         *
         * <p>Note that if the sequence of characters is already available
         * within a character array, using this constructor is faster than
         * converting the {@code char} array to string and using the
         * {@code BigDecimal(String)} constructor .
         *
         * @param  in {@code char} array that is the source of characters.
         * @param  offset first character in the array to inspect.
         * @param  len number of characters to consider.
         * @throws FormatException if {@code in} is not a valid
         *         representation of a {@code BigDecimal} or the defined subarray
         *         is not wholly within {@code in}.
         * @since  1.5
         */
        public BigDecimal(char[] incoming, int offset, int len)
        {
            // protect against huge Length.
            if (offset + len > incoming.Length || offset < 0)
                throw new FormatException();
            // This is the primary string to BigDecimal constructor; all
            // incoming strings end up here; it uses explicit (inline)
            // parsing for speed and generates at most one intermediate
            // (temporary) object (a char[] array) for non-compact case.

            // Use locals for all fields values until completion
            int prec = 0;                 // record precision value
            int scl = 0;                  // record scale value
            long? rs = 0;                  // the compact value in long
            BigInteger? rb = null;         // the inflated value in BigInteger

            // use array bounds checking to handle too-long, len == 0,
            // bad offset, etc.
            try
            {
                // handle the sign
                bool isneg = false;          // assume positive
                if (incoming[offset] == '-') {
                    isneg = true;               // leading minus means negative
                    offset++;
                    len--;
                } else if (incoming[offset] == '+') { // leading + allowed
                    offset++;
                    len--;
                }

                // should now be at numeric part of the significand
                bool dot = false;             // true when there is a '.'
                int cfirst = offset;             // record start of integer
                long exp = 0;                    // exponent
                char c;                          // current character

                bool isCompact = (len <= Max_COMPACT_DIGITS);
                // integer significand array & idx is the index to it. The array
                // is ONLY used when we can't use a compact representation.
                char[] coeff = isCompact ? null : new char[len];
                int idx = 0;

                for (; len > 0; offset++, len--)
                {
                    c = incoming[offset];
                    // have digit

                    if ((c >= '0' && c <= '9') || char.IsDigit(c))
                    {
                        // First compact case, we need not to preserve the character
                        // and we can just compute the value in place.
                        if (isCompact)
                        {
                            int digit = (int)char.GetNumericValue(c);
                            if (digit == 0)
                            {
                                if (prec == 0)
                                    prec = 1;
                                else if (rs != 0)
                                {
                                    rs *= 10;
                                    ++prec;
                                } // else digit is a redundant leading Zero
                            }
                            else
                            {
                                if (prec != 1 || rs != 0)
                                    ++prec; // prec unchanged if preceded by 0s
                                rs = rs * 10 + digit;
                            }
                        }
                        else
                        { // the unscaled value is likely a BigInteger object.
                            if (c == '0' || char.GetNumericValue(c) == 0)
                            {
                                if (prec == 0)
                                {
                                    coeff[idx] = c;
                                    prec = 1;
                                }
                                else if (idx != 0)
                                {
                                    coeff[idx++] = c;
                                    ++prec;
                                } // else c must be a redundant leading Zero
                            }
                            else
                            {
                                if (prec != 1 || idx != 0)
                                    ++prec; // prec unchanged if preceded by 0s
                                coeff[idx++] = c;
                            }
                        }
                        if (dot)
                            ++scl;
                        continue;
                    }
                    // have dot
                    if (c == '.')
                    {
                        // have dot
                        if (dot)         // two dots
                            throw new FormatException();
                        dot = true;
                        continue;
                    }
                    // exponent expected
                    if ((c != 'e') && (c != 'E'))
                        throw new FormatException();
                    offset++;
                    c = incoming[offset];
                    len--;
                    bool negexp = (c == '-');
                    // optional sign
                    if (negexp || c == '+')
                    {
                        offset++;
                        c = incoming[offset];
                        len--;
                    }
                    if (len <= 0)    // no exponent digits
                        throw new FormatException();
                    // skip leading Zeros in the exponent
                    while (len > 10 && char.GetNumericValue(c) == 0)
                    {
                        offset++;
                        c = incoming[offset];
                        len--;
                    }
                    if (len > 10)  // too many nonZero exponent digits
                        throw new FormatException();
                    // c now holds first digit of exponent
                    for (; ; len--)
                    {
                        int v;
                        if (c >= '0' && c <= '9')
                        {
                            v = c - '0';
                        }
                        else
                        {
                            v = (int)char.GetNumericValue(c);
                            if (v < 0)            // not a digit
                                throw new FormatException();
                        }
                        exp = exp * 10 + v;
                        if (len == 1)
                            break;               // that was character
                        offset++;
                        c = incoming[offset];
                    }
                    if (negexp)                  // apply sign
                        exp = -exp;
                    // Next test is required for backwards compatibility
                    if ((int)exp != exp)         // overflow
                        throw new FormatException();
                    break;                       // [saves a test]
                }
                // here when no characters left
                if (prec == 0)              // no digits found
                    throw new FormatException();

                // Adjust scale if exp is not Zero.
                if (exp != 0)
                {                  // had significant exponent
                                   // Can't call checkScale which relies on proper fields value
                    long adjustedScale = scl - exp;
                    if (adjustedScale > int.MaxValue ||
                        adjustedScale < int.MinValue)
                        throw new FormatException("Scale out of range.");
                    scl = (int)adjustedScale;
                }

                // Remove leading Zeros from precision (digits count)
                if (isCompact)
                {
                    rs = isneg ? -rs : rs;
                }
                else
                {
                    char[] quick;
                    if (!isneg)
                    {
                        quick = (coeff.Length != prec) ?
                            ArraysCopyOf(coeff, prec) : coeff;
                    }
                    else
                    {
                        quick = new char[prec + 1];
                        quick[0] = '-';
                        Array.Copy(coeff, 0, quick, 1, prec);
                    }
                    rb = BigInteger.Parse(quick.ToString());
                    rs = rb.HasValue ? compactValFor(rb.Value) : null as long?;
                }
            }
            catch (IndexOutOfRangeException e)
            {
                throw new FormatException();
            }

            this.scale = scl;
            this.precision = prec;
            this.intCompact = rs.Value;
            this.intVal = (rs != INFLATED) ? null : rb;
        }

        // naive implementation of java Arrays.copyOf
        char[] ArraysCopyOf(char[] incoming, int Length)
        {
            var result = new char[Length];
            for (int i = 0; i < Length; i++)
            {
                result[i] = (i >= incoming.Length) ? '\0' : incoming[i];
            }
            return result;
        }

        /**
         * Translates a character array representation of a
         * {@code BigDecimal} into a {@code BigDecimal}, accepting the
         * same sequence of characters as the {@link #BigDecimal(String)}
         * constructor, while allowing a sub-array to be specified and
         * with rounding according to the context settings.
         *
         * <p>Note that if the sequence of characters is already available
         * within a character array, using this constructor is faster than
         * converting the {@code char} array to string and using the
         * {@code BigDecimal(String)} constructor .
         *
         * @param  in {@code char} array that is the source of characters.
         * @param  offset first character in the array to inspect.
         * @param  len number of characters to consider..
         * @param  mc the context to use.
         * @throws ArithmeticException if the result is inexact but the
         *         rounding mode is {@code UNNECESSARY}.
         * @throws FormatException if {@code in} is not a valid
         *         representation of a {@code BigDecimal} or the defined subarray
         *         is not wholly within {@code in}.
         * @since  1.5
         */
        public BigDecimal(char[] incoming, int offset, int len, MathContext mc) : this(incoming, offset, len)
        {
            if (mc.precision > 0)
            {
                roundThis(mc);
            }
        }

        /**
         * Translates a character array representation of a
         * {@code BigDecimal} into a {@code BigDecimal}, accepting the
         * same sequence of characters as the {@link #BigDecimal(String)}
         * constructor.
         *
         * <p>Note that if the sequence of characters is already available
         * as a character array, using this constructor is faster than
         * converting the {@code char} array to string and using the
         * {@code BigDecimal(String)} constructor .
         *
         * @param in {@code char} array that is the source of characters.
         * @throws FormatException if {@code in} is not a valid
         *         representation of a {@code BigDecimal}.
         * @since  1.5
         */
        public BigDecimal(char[] incoming) : this(incoming, 0, incoming.Length)
        {

        }

        /**
         * Translates a character array representation of a
         * {@code BigDecimal} into a {@code BigDecimal}, accepting the
         * same sequence of characters as the {@link #BigDecimal(String)}
         * constructor and with rounding according to the context
         * settings.
         *
         * <p>Note that if the sequence of characters is already available
         * as a character array, using this constructor is faster than
         * converting the {@code char} array to string and using the
         * {@code BigDecimal(String)} constructor .
         *
         * @param  in {@code char} array that is the source of characters.
         * @param  mc the context to use.
         * @throws ArithmeticException if the result is inexact but the
         *         rounding mode is {@code UNNECESSARY}.
         * @throws FormatException if {@code in} is not a valid
         *         representation of a {@code BigDecimal}.
         * @since  1.5
         */
        public BigDecimal(char[] incoming, MathContext mc) : this(incoming, 0, incoming.Length, mc)
        {

        }

        /**
         * Translates the string representation of a {@code BigDecimal}
         * into a {@code BigDecimal}.  The string representation consists
         * of an optional sign, {@code '+'} (<tt> '&#92;u002B'</tt>) or
         * {@code '-'} (<tt>'&#92;u002D'</tt>), followed by a sequence of
         * Zero or more decimal digits ("the integer"), optionally
         * followed by a fraction, optionally followed by an exponent.
         *
         * <p>The fraction consists of a decimal point followed by Zero
         * or more decimal digits.  The string must contain at least one
         * digit in either the integer or the fraction.  The number formed
         * by the sign, the integer and the fraction is referred to as the
         * <i>significand</i>.
         *
         * <p>The exponent consists of the character {@code 'e'}
         * (<tt>'&#92;u0065'</tt>) or {@code 'E'} (<tt>'&#92;u0045'</tt>)
         * followed by one or more decimal digits.  The value of the
         * exponent must lie between -{@link Integer#MaxValue} ({@link
         * Integer#MIN_VALUE}+1) and {@link Integer#MaxValue}, inclusive.
         *
         * <p>More formally, the strings this constructor accepts are
         * described by the following grammar:
         * <blockquote>
         * <dl>
         * <dt><i>BigDecimalString:</i>
         * <dd><i>Sign<sub>opt</sub> Significand Exponent<sub>opt</sub></i>
         * <p>
         * <dt><i>Sign:</i>
         * <dd>{@code +}
         * <dd>{@code -}
         * <p>
         * <dt><i>Significand:</i>
         * <dd><i>IntegerPart</i> {@code .} <i>FractionPart<sub>opt</sub></i>
         * <dd>{@code .} <i>FractionPart</i>
         * <dd><i>IntegerPart</i>
         * <p>
         * <dt><i>IntegerPart:</i>
         * <dd><i>Digits</i>
         * <p>
         * <dt><i>FractionPart:</i>
         * <dd><i>Digits</i>
         * <p>
         * <dt><i>Exponent:</i>
         * <dd><i>ExponentIndicator SignedInteger</i>
         * <p>
         * <dt><i>ExponentIndicator:</i>
         * <dd>{@code e}
         * <dd>{@code E}
         * <p>
         * <dt><i>SignedInteger:</i>
         * <dd><i>Sign<sub>opt</sub> Digits</i>
         * <p>
         * <dt><i>Digits:</i>
         * <dd><i>Digit</i>
         * <dd><i>Digits Digit</i>
         * <p>
         * <dt><i>Digit:</i>
         * <dd>any character for which {@link Character#isDigit}
         * returns {@code true}, including 0, 1, 2 ...
         * </dl>
         * </blockquote>
         *
         * <p>The scale of the returned {@code BigDecimal} will be the
         * number of digits in the fraction, or Zero if the string
         * contains no decimal point, subject to adjustment for any
         * exponent; if the string contains an exponent, the exponent is
         * subtracted from the scale.  The value of the resulting scale
         * must lie between {@code Integer.MIN_VALUE} and
         * {@code int.MaxValue}, inclusive.
         *
         * <p>The character-to-digit mapping is provided by {@link
         * java.lang.Character#digit} set to convert to radix 10.  The
         * String may not contain any extraneous characters (whitespace,
         * for example).
         *
         * <p><b>Examples:</b><br>
         * The value of the returned {@code BigDecimal} is equal to
         * <i>significand</i> &times; 10<sup>&nbsp;<i>exponent</i></sup>.
         * For each string on the left, the resulting representation
         * [{@code BigInteger}, {@code scale}] is shown on the right.
         * <pre>
         * "0"            [0,0]
         * "0.00"         [0,2]
         * "123"          [123,0]
         * "-123"         [-123,0]
         * "1.23E3"       [123,-1]
         * "1.23E+3"      [123,-1]
         * "12.3E+7"      [123,-6]
         * "12.0"         [120,1]
         * "12.3"         [123,1]
         * "0.00123"      [123,5]
         * "-1.23E-12"    [-123,14]
         * "1234.5E-4"    [12345,5]
         * "0E+7"         [0,-7]
         * "-0"           [0,0]
         * </pre>
         *
         * <p>Note: For values other than {@code float} and
         * {@code double} NaN and &plusmn;Infinity, this constructor is
         * compatible with the values returned by {@link Float#ToString}
         * and {@link Double#ToString}.  This is generally the preferred
         * way to convert a {@code float} or {@code double} into a
         * BigDecimal, as it doesn't suffer from the unpredictability of
         * the {@link #BigDecimal(double)} constructor.
         *
         * @param val String representation of {@code BigDecimal}.
         *
         * @throws FormatException if {@code val} is not a valid
         *         representation of a {@code BigDecimal}.
         */
        public BigDecimal(String val) : this(val.ToCharArray(), 0, val.Length)
        {

        }

        /**
         * Translates the string representation of a {@code BigDecimal}
         * into a {@code BigDecimal}, accepting the same strings as the
         * {@link #BigDecimal(String)} constructor, with rounding
         * according to the context settings.
         *
         * @param  val string representation of a {@code BigDecimal}.
         * @param  mc the context to use.
         * @throws ArithmeticException if the result is inexact but the
         *         rounding mode is {@code UNNECESSARY}.
         * @throws FormatException if {@code val} is not a valid
         *         representation of a BigDecimal.
         * @since  1.5
         */
        public BigDecimal(String val, MathContext mc) : this(val.ToCharArray(), 0, val.Length)
        {
            if (mc.precision > 0)
                roundThis(mc);
        }

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
         * any finite Length).  Thus, the value that is being passed
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
         * {@link Double#ToString(double)} method and then using the
         * {@link #BigDecimal(String)} constructor.  To get that result,
         * use the {@code static} {@link #valueOf(double)} method.
         * </ol>
         *
         * @param val {@code double} value to be converted to
         *        {@code BigDecimal}.
         * @throws FormatException if {@code val} is infinite or NaN.
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
             * Special case Zero to supress nonterminating normalization
             * and bogus scale calculation.
             */
            if (significand == 0)
            {
                intVal = BigInteger.Zero;
                intCompact = 0;
                precision = 1;
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
                b = BigInteger.Pow(5, -exponent) * s;
                scale = -exponent;
            }
            else if (exponent > 0)
            {
                b = BigInteger.Pow(2, exponent) * s;
            }
            else
            {
                b = new BigInteger(s);
            }
            intCompact = compactValFor(b);
            intVal = (intCompact != INFLATED) ? (null as BigInteger?) : b;
        }

        /**
         * Translates a {@code double} into a {@code BigDecimal}, with
         * rounding according to the context settings.  The scale of the
         * {@code BigDecimal} is the smallest value such that
         * <tt>(10<sup>scale</sup> &times; val)</tt> is an integer.
         *
         * <p>The results of this constructor can be somewhat unpredictable
         * and its use is generally not recommended; see the notes under
         * the {@link #BigDecimal(double)} constructor.
         *
         * @param  val {@code double} value to be converted to
         *         {@code BigDecimal}.
         * @param  mc the context to use.
         * @throws ArithmeticException if the result is inexact but the
         *         RoundingModeEnum is UNNECESSARY.
         * @throws FormatException if {@code val} is infinite or NaN.
         * @since  1.5
         */
        public BigDecimal(double val, MathContext mc) : this(val)
        {
            if (mc.precision > 0)
                roundThis(mc);
        }

        /**
         * Translates a {@code BigInteger} into a {@code BigDecimal}.
         * The scale of the {@code BigDecimal} is Zero.
         *
         * @param val {@code BigInteger} value to be converted to
         *            {@code BigDecimal}.
         */
        public BigDecimal(BigInteger val)
        {
            intCompact = compactValFor(val);
            intVal = (intCompact != INFLATED) ? (null as BigInteger?) : val;
        }

        /**
         * Translates a {@code BigInteger} into a {@code BigDecimal}
         * rounding according to the context settings.  The scale of the
         * {@code BigDecimal} is Zero.
         *
         * @param val {@code BigInteger} value to be converted to
         *            {@code BigDecimal}.
         * @param  mc the context to use.
         * @throws ArithmeticException if the result is inexact but the
         *         rounding mode is {@code UNNECESSARY}.
         * @since  1.5
         */
        public BigDecimal(BigInteger val, MathContext mc) : this(val)
        {

            if (mc.precision > 0)
                roundThis(mc);
        }

        /**
         * Translates a {@code BigInteger} unscaled value and an
         * {@code int} scale into a {@code BigDecimal}.  The value of
         * the {@code BigDecimal} is
         * <tt>(unscaledVal &times; 10<sup>-scale</sup>)</tt>.
         *
         * @param unscaledVal unscaled value of the {@code BigDecimal}.
         * @param scale scale of the {@code BigDecimal}.
         */
        public BigDecimal(BigInteger unscaledVal, int scale) : this(unscaledVal)
        {
            // Negative scales are now allowed
            this.scale = scale;
        }

        /**
         * Translates a {@code BigInteger} unscaled value and an
         * {@code int} scale into a {@code BigDecimal}, with rounding
         * according to the context settings.  The value of the
         * {@code BigDecimal} is <tt>(unscaledVal &times;
         * 10<sup>-scale</sup>)</tt>, rounded according to the
         * {@code precision} and rounding mode settings.
         *
         * @param  unscaledVal unscaled value of the {@code BigDecimal}.
         * @param  scale scale of the {@code BigDecimal}.
         * @param  mc the context to use.
         * @throws ArithmeticException if the result is inexact but the
         *         rounding mode is {@code UNNECESSARY}.
         * @since  1.5
         */
        public BigDecimal(BigInteger unscaledVal, int scale, MathContext mc) : this(unscaledVal)
        {

            this.scale = scale;
            if (mc.precision > 0)
                roundThis(mc);
        }

        /**
         * Translates an {@code int} into a {@code BigDecimal}.  The
         * scale of the {@code BigDecimal} is Zero.
         *
         * @param val {@code int} value to be converted to
         *            {@code BigDecimal}.
         * @since  1.5
         */
        public BigDecimal(int val)
        {
            intCompact = val;
        }

        /**
         * Translates an {@code int} into a {@code BigDecimal}, with
         * rounding according to the context settings.  The scale of the
         * {@code BigDecimal}, before any rounding, is Zero.
         *
         * @param  val {@code int} value to be converted to {@code BigDecimal}.
         * @param  mc the context to use.
         * @throws ArithmeticException if the result is inexact but the
         *         rounding mode is {@code UNNECESSARY}.
         * @since  1.5
         */
        public BigDecimal(int val, MathContext mc)
        {
            intCompact = val;
            if (mc.precision > 0)
                roundThis(mc);
        }

        /**
         * Translates a {@code long} into a {@code BigDecimal}.  The
         * scale of the {@code BigDecimal} is Zero.
         *
         * @param val {@code long} value to be converted to {@code BigDecimal}.
         * @since  1.5
         */
        public BigDecimal(long val)
        {
            this.intCompact = val;
            this.intVal = (val == INFLATED) ? new BigInteger(val) : null as BigInteger?;
        }

        /**
         * Translates a {@code long} into a {@code BigDecimal}, with
         * rounding according to the context settings.  The scale of the
         * {@code BigDecimal}, before any rounding, is Zero.
         *
         * @param  val {@code long} value to be converted to {@code BigDecimal}.
         * @param  mc the context to use.
         * @throws ArithmeticException if the result is inexact but the
         *         rounding mode is {@code UNNECESSARY}.
         * @since  1.5
         */
        public BigDecimal(long val, MathContext mc) : this(val)
        {
            if (mc.precision > 0)
                roundThis(mc);
        }

        // Static Factory Methods

        /**
         * Translates a {@code long} unscaled value and an
         * {@code int} scale into a {@code BigDecimal}.  This
         * {@literal "static factory method"} is provided in preference to
         * a ({@code long}, {@code int}) constructor because it
         * allows for reuse of frequently used {@code BigDecimal} values..
         *
         * @param unscaledVal unscaled value of the {@code BigDecimal}.
         * @param scale scale of the {@code BigDecimal}.
         * @return a {@code BigDecimal} whose value is
         *         <tt>(unscaledVal &times; 10<sup>-scale</sup>)</tt>.
         */
        public static BigDecimal valueOf(long unscaledVal, int scale)
        {
            if (scale == 0)
                return valueOf(unscaledVal);
            else if (unscaledVal == 0)
            {
                if (scale > 0 && scale < Zero_SCALED_BY.Length)
                    return Zero_SCALED_BY[scale];
                else
                    return new BigDecimal(BigInteger.Zero, 0, scale, 1);
            }
            return new BigDecimal(unscaledVal == INFLATED ?
                                  new BigInteger(unscaledVal) : null as BigInteger?,
                                  unscaledVal, scale, 0);
        }

        /**
         * Translates a {@code long} value into a {@code BigDecimal}
         * with a scale of Zero.  This {@literal "static factory method"}
         * is provided in preference to a ({@code long}) constructor
         * because it allows for reuse of frequently used
         * {@code BigDecimal} values.
         *
         * @param val value of the {@code BigDecimal}.
         * @return a {@code BigDecimal} whose value is {@code val}.
         */
        public static BigDecimal valueOf(long val)
        {
            if (val >= 0 && val < ZeroThroughTen.Length)
                return ZeroThroughTen[(int)val];
            else if (val != INFLATED)
                return new BigDecimal(null, val, 0, 0);
            return new BigDecimal(new BigInteger(val), val, 0, 0);
        }

        /**
         * Translates a {@code double} into a {@code BigDecimal}, using
         * the {@code double}'s canonical string representation provided
         * by the {@link Double#ToString(double)} method.
         *
         * <p><b>Note:</b> This is generally the preferred way to convert
         * a {@code double} (or {@code float}) into a
         * {@code BigDecimal}, as the value returned is equal to that
         * resulting from constructing a {@code BigDecimal} from the
         * result of using {@link Double#ToString(double)}.
         *
         * @param  val {@code double} to convert to a {@code BigDecimal}.
         * @return a {@code BigDecimal} whose value is equal to or approximately
         *         equal to the value of {@code val}.
         * @throws FormatException if {@code val} is infinite or NaN.
         * @since  1.5
         */
        public static BigDecimal valueOf(double val)
        {
            // Reminder: a Zero double returns '0.0', so we cannot fastpath
            // to use the constant Zero.  This might be important enough to
            // justify a factory approach, a cache, or a few private
            // constants, later.
            return new BigDecimal(val.ToString());
        }

        // Arithmetic Operations
        /**
         * Returns a {@code BigDecimal} whose value is {@code (this +
         * augend)}, and whose scale is {@code Max(this.Scale,
         * augend.Scale)}.
         *
         * @param  augend value to be added to this {@code BigDecimal}.
         * @return {@code this + augend}
         */
        public BigDecimal add(BigDecimal augend)
        {
            long? xs = this.intCompact;
            long? ys = augend.intCompact;
            BigInteger? fst = (xs != INFLATED) ? null : this.intVal;
            BigInteger? snd = (ys != INFLATED) ? null : augend.intVal;
            int rscale = this.scale;

            long sdiff = (long)rscale - augend.scale;
            if (sdiff != 0)
            {
                if (sdiff < 0)
                {
                    int raise = checkScale(-sdiff);
                    rscale = augend.scale;
                    if (xs == INFLATED ||
                        (xs = longMultiplyPowerTen(xs.Value, raise)) == INFLATED)
                        fst = bigMultiplyPowerTen(raise);
                }
                else
                {
                    int raise = augend.checkScale(sdiff);
                    if (ys == INFLATED ||
                        (ys = longMultiplyPowerTen(ys.Value, raise)) == INFLATED)
                        snd = augend.bigMultiplyPowerTen(raise);
                }
            }
            if (xs != INFLATED && ys != INFLATED)
            {
                long longsum = xs.Value + ys.Value;
                // See "Hacker's Delight" section 2-12 for explanation of
                // the overflow test.
                if ((((longsum ^ xs) & (longsum ^ ys))) >= 0L) // not overflowed
                    return BigDecimal.valueOf(longsum, rscale);
            }
            if (fst == null)
                fst = new BigInteger(xs.Value);
            if (snd == null)
                snd = new BigInteger(ys.Value);
            BigInteger sum = fst.Value + snd.Value;
            return (fst.Value.Sign == snd.Value.Sign) ?
                new BigDecimal(sum, INFLATED, rscale, 0) :
                new BigDecimal(sum, rscale);
        }

        /**
         * Returns a {@code BigDecimal} whose value is {@code (this + augend)},
         * with rounding according to the context settings.
         *
         * If either number is Zero and the precision setting is nonZero then
         * the other number, rounded if necessary, is used as the result.
         *
         * @param  augend value to be added to this {@code BigDecimal}.
         * @param  mc the context to use.
         * @return {@code this + augend}, rounded as necessary.
         * @throws ArithmeticException if the result is inexact but the
         *         rounding mode is {@code UNNECESSARY}.
         * @since  1.5
         */
        public BigDecimal add(BigDecimal augend, MathContext mc)
        {
            if (mc.precision == 0)
                return add(augend);
            BigDecimal lhs = this;

            // Could optimize if values are compact
            this.inflate();
            augend.inflate();

            // If either number is Zero then the other number, rounded and
            // scaled if necessary, is used as the result.
            {
                bool lhsIsZero = lhs.signum() == 0;
                bool augendIsZero = augend.signum() == 0;

                if (lhsIsZero || augendIsZero)
                {
                    int preferredScale = Math.Max(lhs.Scale, augend.Scale);
                    BigDecimal result;

                    // Could use a factory for Zero instead of a new object
                    if (lhsIsZero && augendIsZero)
                        return new BigDecimal(BigInteger.Zero, 0, preferredScale, 0);

                    result = lhsIsZero ? doRound(augend, mc) : doRound(lhs, mc);

                    if (result.Scale == preferredScale)
                        return result;
                    else if (result.Scale > preferredScale)
                    {
                        BigDecimal scaledResult =
                            new BigDecimal(result.intVal, result.intCompact,
                                           result.scale, 0);
                        scaledResult.stripZerosToMatchScale(preferredScale);
                        return scaledResult;
                    }
                    else
                    { // result.scale < preferredScale
                        int precisionDiff = mc.precision - result.Precision;
                        int scaleDiff = preferredScale - result.Scale;

                        if (precisionDiff >= scaleDiff)
                            return result.setScale(preferredScale); // can achieve target scale
                        else
                            return result.setScale(result.Scale + precisionDiff);
                    }
                }
            }

            long padding = (long)lhs.scale - augend.scale;
            if (padding != 0)
            {        // scales differ; alignment needed
                BigDecimal[] arg = preAlign(lhs, augend, padding, mc);
                matchScale(arg);
                lhs = arg[0];
                augend = arg[1];
            }

            BigDecimal d = new BigDecimal(lhs.inflate() + augend.inflate(),
                                          lhs.scale);
            return doRound(d, mc);
        }

        /**
         * Returns an array of Length two, the sum of whose entries is
         * equal to the rounded sum of the {@code BigDecimal} arguments.
         *
         * <p>If the digit positions of the arguments have a sufficient
         * gap between them, the value smaller in magnitude can be
         * condensed into a {@literal "sticky bit"} and the end result will
         * round the same way <em>if</em> the precision of the readonly
         * result does not include the high order digit of the small
         * magnitude operand.
         *
         * <p>Note that while strictly speaking this is an optimization,
         * it makes a much wider range of additions practical.
         *
         * <p>This corresponds to a pre-shift operation in a fixed
         * precision floating-point adder; this method is complicated by
         * variable precision of the result as determined by the
         * MathContext.  A more nuanced operation could implement a
         * {@literal "right shift"} on the smaller magnitude operand so
         * that the number of digits of the smaller operand could be
         * reduced even though the significands partially overlapped.
         */
        private BigDecimal[] preAlign(BigDecimal lhs, BigDecimal augend,
                                      long padding, MathContext mc)
        {
            if (padding == 0)
            {
                throw new ArgumentOutOfRangeException(nameof(padding));
            }
            BigDecimal big;
            BigDecimal small;

            if (padding < 0)
            {     // lhs is big;   augend is small
                big = lhs;
                small = augend;
            }
            else
            {               // lhs is small; augend is big
                big = augend;
                small = lhs;
            }

            /*
             * This is the estimated scale of an ulp of the result; it
             * assumes that the result doesn't have a carry-out on a true
             * add (e.g. 999 + 1 => 1000) or any subtractive cancellation
             * on borrowing (e.g. 100 - 1.2 => 98.8)
             */
            long estResultUlpScale = (long)big.scale - big.Precision + mc.precision;

            /*
             * The low-order digit position of big is big.Scale.  This
             * is true regardless of whether big has a positive or
             * negative scale.  The high-order digit position of small is
             * small.scale - (small.Precision - 1).  To do the full
             * condensation, the digit positions of big and small must be
             * disjoint *and* the digit positions of small should not be
             * directly visible in the result.
             */
            long smallHighDigitPos = (long)small.scale - small.Precision + 1;
            if (smallHighDigitPos > big.scale + 2 &&         // big and small disjoint
                smallHighDigitPos > estResultUlpScale + 2)
            { // small digits not visible
                small = BigDecimal.valueOf(small.signum(),
                                           this.checkScale(Math.Max(big.scale, estResultUlpScale) + 3));
            }

            // Since addition is symmetric, preserving input order in
            // returned operands doesn't matter
            BigDecimal[] result = { big, small };
            return result;
        }

        /**
         * Returns a {@code BigDecimal} whose value is {@code (this -
         * subtrahend)}, and whose scale is {@code Max(this.Scale,
         * subtrahend.Scale)}.
         *
         * @param  subtrahend value to be subtracted from this {@code BigDecimal}.
         * @return {@code this - subtrahend}
         */
        public BigDecimal subtract(BigDecimal subtrahend)
        {
            return add(subtrahend.negate());
        }

        /**
         * Returns a {@code BigDecimal} whose value is {@code (this - subtrahend)},
         * with rounding according to the context settings.
         *
         * If {@code subtrahend} is Zero then this, rounded if necessary, is used as the
         * result.  If this is Zero then the result is {@code subtrahend.negate(mc)}.
         *
         * @param  subtrahend value to be subtracted from this {@code BigDecimal}.
         * @param  mc the context to use.
         * @return {@code this - subtrahend}, rounded as necessary.
         * @throws ArithmeticException if the result is inexact but the
         *         rounding mode is {@code UNNECESSARY}.
         * @since  1.5
         */
        public BigDecimal subtract(BigDecimal subtrahend, MathContext mc)
        {
            BigDecimal nsubtrahend = subtrahend.negate();
            if (mc.precision == 0)
                return add(nsubtrahend);
            // share the special rounding code in add()
            return add(nsubtrahend, mc);
        }

        /**
         * Returns a {@code BigDecimal} whose value is <tt>(this &times;
         * multiplicand)</tt>, and whose scale is {@code (this.Scale +
         * multiplicand.Scale)}.
         *
         * @param  multiplicand value to be multiplied by this {@code BigDecimal}.
         * @return {@code this * multiplicand}
         */
        public BigDecimal multiply(BigDecimal multiplicand)
        {
            long x = this.intCompact;
            long y = multiplicand.intCompact;
            int productScale = checkScale((long)scale + multiplicand.scale);

            // Might be able to do a more clever check incorporating the
            // inflated check into the overflow computation.
            if (x != INFLATED && y != INFLATED)
            {
                /*
                 * If the product is not an overflowed value, continue
                 * to use the compact representation.  if either of x or y
                 * is INFLATED, the product should also be regarded as
                 * an overflow. Before using the overflow test suggested in
                 * "Hacker's Delight" section 2-12, we perform quick checks
                 * using the precision information to see whether the overflow
                 * would occur since division is expensive on most CPUs.
                 */
                long product = x * y;
                long prec = this.Precision + multiplicand.Precision;
                if (prec < 19 || (prec < 21 && (y == 0 || product / y == x)))
                    return BigDecimal.valueOf(product, productScale);
                return new BigDecimal(new BigInteger(x) * y, INFLATED,
                                      productScale, 0);
            }
            BigInteger rb;
            if (x == INFLATED && y == INFLATED)
                rb = this.intVal.Value * multiplicand.intVal.Value;
            else if (x != INFLATED)
                rb = multiplicand.intVal.Value * x;
            else
                rb = this.intVal.Value * y;
            return new BigDecimal(rb, INFLATED, productScale, 0);
        }

        /**
         * Returns a {@code BigDecimal} whose value is <tt>(this &times;
         * multiplicand)</tt>, with rounding according to the context settings.
         *
         * @param  multiplicand value to be multiplied by this {@code BigDecimal}.
         * @param  mc the context to use.
         * @return {@code this * multiplicand}, rounded as necessary.
         * @throws ArithmeticException if the result is inexact but the
         *         rounding mode is {@code UNNECESSARY}.
         * @since  1.5
         */
        public BigDecimal multiply(BigDecimal multiplicand, MathContext mc)
        {
            if (mc.precision == 0)
                return multiply(multiplicand);
            return doRound(this.multiply(multiplicand), mc);
        }

        /**
         * Returns a {@code BigDecimal} whose value is {@code (this /
         * divisor)}, and whose scale is as specified.  If rounding must
         * be performed to generate a result with the specified scale, the
         * specified rounding mode is applied.
         *
         * <p>The new {@link #divide(BigDecimal, int, RoundingModeEnum)} method
         * should be used in preference to this legacy method.
         *
         * @param  divisor value by which this {@code BigDecimal} is to be divided.
         * @param  scale scale of the {@code BigDecimal} quotient to be returned.
         * @param  RoundingModeEnum rounding mode to apply.
         * @return {@code this / divisor}
         * @throws ArithmeticException if {@code divisor} is Zero,
         *         {@code RoundingModeEnum==ROUND_UNNECESSARY} and
         *         the specified scale is insufficient to represent the result
         *         of the division exactly.
         * @throws IllegalArgumentException if {@code RoundingModeEnum} does not
         *         represent a valid rounding mode.
         * @see    #ROUND_UP
         * @see    #ROUND_DOWN
         * @see    #ROUND_CEILING
         * @see    #ROUND_FLOOR
         * @see    #ROUND_HALF_UP
         * @see    #ROUND_HALF_DOWN
         * @see    #ROUND_HALF_EVEN
         * @see    #ROUND_UNNECESSARY
         */
        [Obsolete(message: "Not ported", error: true)]
        public BigDecimal divide(BigDecimal divisor, int scale, int RoundingModeEnum)
        {
            throw new NotImplementedException();
        }

        /**
         * Returns a {@code BigDecimal} whose value is {@code (this /
         * divisor)}, and whose scale is as specified.  If rounding must
         * be performed to generate a result with the specified scale, the
         * specified rounding mode is applied.
         *
         * @param  divisor value by which this {@code BigDecimal} is to be divided.
         * @param  scale scale of the {@code BigDecimal} quotient to be returned.
         * @param  RoundingModeEnum rounding mode to apply.
         * @return {@code this / divisor}
         * @throws ArithmeticException if {@code divisor} is Zero,
         *         {@code RoundingModeEnum==RoundingModeEnum.UNNECESSARY} and
         *         the specified scale is insufficient to represent the result
         *         of the division exactly.
         * @since 1.5
         */
        [Obsolete(message: "Not ported", error: true)]
        public BigDecimal divide(BigDecimal divisor, int scale, RoundingModeEnum RoundingModeEnum)
        {
            throw new NotImplementedException();
        }

        /**
         * Returns a {@code BigDecimal} whose value is {@code (this /
         * divisor)}, and whose scale is {@code this.Scale}.  If
         * rounding must be performed to generate a result with the given
         * scale, the specified rounding mode is applied.
         *
         * <p>The new {@link #divide(BigDecimal, RoundingModeEnum)} method
         * should be used in preference to this legacy method.
         *
         * @param  divisor value by which this {@code BigDecimal} is to be divided.
         * @param  RoundingModeEnum rounding mode to apply.
         * @return {@code this / divisor}
         * @throws ArithmeticException if {@code divisor==0}, or
         *         {@code RoundingModeEnum==ROUND_UNNECESSARY} and
         *         {@code this.Scale} is insufficient to represent the result
         *         of the division exactly.
         * @throws IllegalArgumentException if {@code RoundingModeEnum} does not
         *         represent a valid rounding mode.
         * @see    #ROUND_UP
         * @see    #ROUND_DOWN
         * @see    #ROUND_CEILING
         * @see    #ROUND_FLOOR
         * @see    #ROUND_HALF_UP
         * @see    #ROUND_HALF_DOWN
         * @see    #ROUND_HALF_EVEN
         * @see    #ROUND_UNNECESSARY
         */
        [Obsolete(message: "Not ported", error: true)]
        public BigDecimal divide(BigDecimal divisor, int RoundingModeEnum)
        {
            throw new NotImplementedException();
        }

        /**
         * Returns a {@code BigDecimal} whose value is {@code (this /
         * divisor)}, and whose scale is {@code this.Scale}.  If
         * rounding must be performed to generate a result with the given
         * scale, the specified rounding mode is applied.
         *
         * @param  divisor value by which this {@code BigDecimal} is to be divided.
         * @param  RoundingModeEnum rounding mode to apply.
         * @return {@code this / divisor}
         * @throws ArithmeticException if {@code divisor==0}, or
         *         {@code RoundingModeEnum==RoundingModeEnum.UNNECESSARY} and
         *         {@code this.Scale} is insufficient to represent the result
         *         of the division exactly.
         * @since 1.5
         */
        [Obsolete(message: "Not ported", error: true)]
        public BigDecimal divide(BigDecimal divisor, RoundingModeEnum RoundingModeEnum)
        {
            throw new NotImplementedException();
        }

        /**
         * Returns a {@code BigDecimal} whose value is {@code (this /
         * divisor)}, and whose preferred scale is {@code (this.Scale -
         * divisor.Scale)}; if the exact quotient cannot be
         * represented (because it has a non-terminating decimal
         * expansion) an {@code ArithmeticException} is thrown.
         *
         * @param  divisor value by which this {@code BigDecimal} is to be divided.
         * @throws ArithmeticException if the exact quotient does not have a
         *         terminating decimal expansion
         * @return {@code this / divisor}
         * @since 1.5
         * @author Joseph D. Darcy
         */
        [Obsolete(message: "Not ported", error: true)]
        public BigDecimal divide(BigDecimal divisor)
        {
            throw new NotImplementedException();
        }

        /**
         * Returns a {@code BigDecimal} whose value is {@code (this /
         * divisor)}, with rounding according to the context settings.
         *
         * @param  divisor value by which this {@code BigDecimal} is to be divided.
         * @param  mc the context to use.
         * @return {@code this / divisor}, rounded as necessary.
         * @throws ArithmeticException if the result is inexact but the
         *         rounding mode is {@code UNNECESSARY} or
         *         {@code mc.precision == 0} and the quotient has a
         *         non-terminating decimal expansion.
         * @since  1.5
         */
        [Obsolete(message: "Not ported", error: true)]
        public BigDecimal divide(BigDecimal divisor, MathContext mc)
        {
            throw new NotImplementedException();
        }

        /**
         * Returns a {@code BigDecimal} whose value is the integer part
         * of the quotient {@code (this / divisor)} rounded down.  The
         * preferred scale of the result is {@code (this.Scale -
         * divisor.Scale)}.
         *
         * @param  divisor value by which this {@code BigDecimal} is to be divided.
         * @return The integer part of {@code this / divisor}.
         * @throws ArithmeticException if {@code divisor==0}
         * @since  1.5
         */
        [Obsolete(message: "Not ported", error: true)]
        public BigDecimal divideToIntegralValue(BigDecimal divisor)
        {
            throw new NotImplementedException();
        }

        /**
         * Returns a {@code BigDecimal} whose value is the integer part
         * of {@code (this / divisor)}.  Since the integer part of the
         * exact quotient does not depend on the rounding mode, the
         * rounding mode does not affect the values returned by this
         * method.  The preferred scale of the result is
         * {@code (this.Scale - divisor.Scale)}.  An
         * {@code ArithmeticException} is thrown if the integer part of
         * the exact quotient needs more than {@code mc.precision}
         * digits.
         *
         * @param  divisor value by which this {@code BigDecimal} is to be divided.
         * @param  mc the context to use.
         * @return The integer part of {@code this / divisor}.
         * @throws ArithmeticException if {@code divisor==0}
         * @throws ArithmeticException if {@code mc.precision} {@literal >} 0 and the result
         *         requires a precision of more than {@code mc.precision} digits.
         * @since  1.5
         * @author Joseph D. Darcy
         */
        [Obsolete(message: "Not ported", error: true)]
        public BigDecimal divideToIntegralValue(BigDecimal divisor, MathContext mc)
        {
            throw new NotImplementedException();
        }

        /**
         * Returns a {@code BigDecimal} whose value is {@code (this % divisor)}.
         *
         * <p>The remainder is given by
         * {@code this.subtract(this.divideToIntegralValue(divisor).multiply(divisor))}.
         * Note that this is not the modulo operation (the result can be
         * negative).
         *
         * @param  divisor value by which this {@code BigDecimal} is to be divided.
         * @return {@code this % divisor}.
         * @throws ArithmeticException if {@code divisor==0}
         * @since  1.5
         */
        [Obsolete(message: "Not ported", error: true)]
        public BigDecimal remainder(BigDecimal divisor)
        {
            throw new NotImplementedException();
        }


        /**
         * Returns a {@code BigDecimal} whose value is {@code (this %
         * divisor)}, with rounding according to the context settings.
         * The {@code MathContext} settings affect the implicit divide
         * used to compute the remainder.  The remainder computation
         * itself is by definition exact.  Therefore, the remainder may
         * contain more than {@code mc.getPrecision} digits.
         *
         * <p>The remainder is given by
         * {@code this.subtract(this.divideToIntegralValue(divisor,
         * mc).multiply(divisor))}.  Note that this is not the modulo
         * operation (the result can be negative).
         *
         * @param  divisor value by which this {@code BigDecimal} is to be divided.
         * @param  mc the context to use.
         * @return {@code this % divisor}, rounded as necessary.
         * @throws ArithmeticException if {@code divisor==0}
         * @throws ArithmeticException if the result is inexact but the
         *         rounding mode is {@code UNNECESSARY}, or {@code mc.precision}
         *         {@literal >} 0 and the result of {@code this.divideToIntgralValue(divisor)} would
         *         require a precision of more than {@code mc.precision} digits.
         * @see    #divideToIntegralValue(java.math.BigDecimal, java.math.MathContext)
         * @since  1.5
         */
        [Obsolete(message: "Not ported", error: true)]
        public BigDecimal remainder(BigDecimal divisor, MathContext mc)
        {
            throw new NotImplementedException();
        }

        /**
         * Returns a two-element {@code BigDecimal} array containing the
         * result of {@code divideToIntegralValue} followed by the result of
         * {@code remainder} on the two operands.
         *
         * <p>Note that if both the integer quotient and remainder are
         * needed, this method is faster than using the
         * {@code divideToIntegralValue} and {@code remainder} methods
         * separately because the division need only be carried out once.
         *
         * @param  divisor value by which this {@code BigDecimal} is to be divided,
         *         and the remainder computed.
         * @return a two element {@code BigDecimal} array: the quotient
         *         (the result of {@code divideToIntegralValue}) is the initial element
         *         and the remainder is the element.
         * @throws ArithmeticException if {@code divisor==0}
         * @see    #divideToIntegralValue(java.math.BigDecimal, java.math.MathContext)
         * @see    #remainder(java.math.BigDecimal, java.math.MathContext)
         * @since  1.5
         */
        [Obsolete(message: "Not ported", error: true)]
        public BigDecimal[] divideAndRemainder(BigDecimal divisor)
        {
            throw new NotImplementedException();
        }

        /**
         * Returns a two-element {@code BigDecimal} array containing the
         * result of {@code divideToIntegralValue} followed by the result of
         * {@code remainder} on the two operands calculated with rounding
         * according to the context settings.
         *
         * <p>Note that if both the integer quotient and remainder are
         * needed, this method is faster than using the
         * {@code divideToIntegralValue} and {@code remainder} methods
         * separately because the division need only be carried out once.
         *
         * @param  divisor value by which this {@code BigDecimal} is to be divided,
         *         and the remainder computed.
         * @param  mc the context to use.
         * @return a two element {@code BigDecimal} array: the quotient
         *         (the result of {@code divideToIntegralValue}) is the
         *         initial element and the remainder is the element.
         * @throws ArithmeticException if {@code divisor==0}
         * @throws ArithmeticException if the result is inexact but the
         *         rounding mode is {@code UNNECESSARY}, or {@code mc.precision}
         *         {@literal >} 0 and the result of {@code this.divideToIntgralValue(divisor)} would
         *         require a precision of more than {@code mc.precision} digits.
         * @see    #divideToIntegralValue(java.math.BigDecimal, java.math.MathContext)
         * @see    #remainder(java.math.BigDecimal, java.math.MathContext)
         * @since  1.5
         */
        [Obsolete(message: "Not ported", error: true)]
        public BigDecimal[] divideAndRemainder(BigDecimal divisor, MathContext mc)
        {
            throw new NotImplementedException();
        }

        /**
         * Returns a {@code BigDecimal} whose value is
         * <tt>(this<sup>n</sup>)</tt>, The power is computed exactly, to
         * unlimited precision.
         *
         * <p>The parameter {@code n} must be in the range 0 through
         * 999999999, inclusive.  {@code Zero.pow(0)} returns {@link
         * #ONE}.
         *
         * Note that future releases may expand the allowable exponent
         * range of this method.
         *
         * @param  n power to raise this {@code BigDecimal} to.
         * @return <tt>this<sup>n</sup></tt>
         * @throws ArithmeticException if {@code n} is out of range.
         * @since  1.5
         */
        public BigDecimal pow(int n)
        {
            if (n < 0 || n > 999999999)
                throw new ArithmeticException("Invalid operation");
            // No need to calculate pow(n) if result will over/underflow.
            // Don't attempt to support "supernormal" numbers.
            int newScale = checkScale((long)scale * n);
            this.inflate();
            return new BigDecimal(BigInteger.Pow(intVal.Value, n), newScale);
        }


        /**
         * Returns a {@code BigDecimal} whose value is
         * <tt>(this<sup>n</sup>)</tt>.  The current implementation uses
         * the core algorithm defined in ANSI standard X3.274-1996 with
         * rounding according to the context settings.  In general, the
         * returned numerical value is within two ulps of the exact
         * numerical value for the chosen precision.  Note that future
         * releases may use a different algorithm with a decreased
         * allowable error bound and increased allowable exponent range.
         *
         * <p>The X3.274-1996 algorithm is:
         *
         * <ul>
         * <li> An {@code ArithmeticException} exception is thrown if
         *  <ul>
         *    <li>{@code abs(n) > 999999999}
         *    <li>{@code mc.precision == 0} and {@code n < 0}
         *    <li>{@code mc.precision > 0} and {@code n} has more than
         *    {@code mc.precision} decimal digits
         *  </ul>
         *
         * <li> if {@code n} is Zero, {@link #ONE} is returned even if
         * {@code this} is Zero, otherwise
         * <ul>
         *   <li> if {@code n} is positive, the result is calculated via
         *   the repeated squaring technique into a single accumulator.
         *   The individual multiplications with the accumulator use the
         *   same math context settings as in {@code mc} except for a
         *   precision increased to {@code mc.precision + eLength + 1}
         *   where {@code eLength} is the number of decimal digits in
         *   {@code n}.
         *
         *   <li> if {@code n} is negative, the result is calculated as if
         *   {@code n} were positive; this value is then divided into one
         *   using the working precision specified above.
         *
         *   <li> The value from either the positive or negative case
         *   is then rounded to the destination precision.
         *   </ul>
         * </ul>
         *
         * @param  n power to raise this {@code BigDecimal} to.
         * @param  mc the context to use.
         * @return <tt>this<sup>n</sup></tt> using the ANSI standard X3.274-1996
         *         algorithm
         * @throws ArithmeticException if the result is inexact but the
         *         rounding mode is {@code UNNECESSARY}, or {@code n} is out
         *         of range.
         * @since  1.5
         */
        public BigDecimal pow(int n, MathContext mc)
        {
            if (mc.precision == 0)
                return pow(n);
            if (n < -999999999 || n > 999999999)
                throw new ArithmeticException("Invalid operation");
            if (n == 0)
                return ONE;                      // x**0 == 1 in X3.274
            this.inflate();
            BigDecimal lhs = this;
            MathContext workmc = mc;           // working settings
            int mag = Math.Abs(n);               // magnitude of n
            if (mc.precision > 0)
            {

                int eLength = longDigitLength(mag); // Length of n in digits
                if (eLength > mc.precision)        // X3.274 rule
                    throw new ArithmeticException("Invalid operation");
                workmc = new MathContext(mc.precision + eLength + 1,
                                          mc.roundingModeEnum);
            }
            // ready to carry out power calculation...
            BigDecimal acc = ONE;           // accumulator
            bool seenbit = false;        // set once we've seen a 1-bit
            for (int i = 1; ; i++)
            {            // for each bit [top bit ignored]
                mag += mag;                 // shift left 1 bit
                if (mag < 0)
                {              // top bit is set
                    seenbit = true;         // OK, we're off
                    acc = acc.multiply(lhs, workmc); // acc=acc*x
                }
                if (i == 31)
                    break;                  // that was the last bit
                if (seenbit)
                    acc = acc.multiply(acc, workmc);   // acc=acc*acc [square]
                                                       // else (!seenbit) no point in squaring ONE
            }
            // if negative n, calculate the reciprocal using working precision
            if (n < 0)                          // [hence mc.precision>0]
                throw new NotImplementedException("Power to a fraction is not ported yet");
            // acc = ONE.divide(acc, workmc);
            // round to precision and strip Zeros
            return doRound(acc, mc);
        }

        /**
         * Returns a {@code BigDecimal} whose value is the absolute value
         * of this {@code BigDecimal}, and whose scale is
         * {@code this.Scale}.
         *
         * @return {@code abs(this)}
         */
        public BigDecimal abs()
        {
            return (signum() < 0 ? negate() : this);
        }

        /**
         * Returns a {@code BigDecimal} whose value is the absolute value
         * of this {@code BigDecimal}, with rounding according to the
         * context settings.
         *
         * @param mc the context to use.
         * @return {@code abs(this)}, rounded as necessary.
         * @throws ArithmeticException if the result is inexact but the
         *         rounding mode is {@code UNNECESSARY}.
         * @since 1.5
         */
        public BigDecimal abs(MathContext mc)
        {
            return (signum() < 0 ? negate(mc) : plus(mc));
        }

        /**
         * Returns a {@code BigDecimal} whose value is {@code (-this)},
         * and whose scale is {@code this.Scale}.
         *
         * @return {@code -this}.
         */
        public BigDecimal negate()
        {
            BigDecimal result;
            if (intCompact != INFLATED)
                result = BigDecimal.valueOf(-intCompact, scale);
            else
            {
                result = new BigDecimal(BigInteger.Negate(intVal.Value), scale);
                result.precision = precision;
            }
            return result;
        }

        /**
         * Returns a {@code BigDecimal} whose value is {@code (-this)},
         * with rounding according to the context settings.
         *
         * @param mc the context to use.
         * @return {@code -this}, rounded as necessary.
         * @throws ArithmeticException if the result is inexact but the
         *         rounding mode is {@code UNNECESSARY}.
         * @since  1.5
         */
        public BigDecimal negate(MathContext mc)
        {
            return negate().plus(mc);
        }

        /**
         * Returns a {@code BigDecimal} whose value is {@code (+this)}, and whose
         * scale is {@code this.Scale}.
         *
         * <p>This method, which simply returns this {@code BigDecimal}
         * is included for symmetry with the unary minus method {@link
         * #negate()}.
         *
         * @return {@code this}.
         * @see #negate()
         * @since  1.5
         */
        public BigDecimal plus()
        {
            return this;
        }

        /**
         * Returns a {@code BigDecimal} whose value is {@code (+this)},
         * with rounding according to the context settings.
         *
         * <p>The effect of this method is identical to that of the {@link
         * #round(MathContext)} method.
         *
         * @param mc the context to use.
         * @return {@code this}, rounded as necessary.  A Zero result will
         *         have a scale of 0.
         * @throws ArithmeticException if the result is inexact but the
         *         rounding mode is {@code UNNECESSARY}.
         * @see    #round(MathContext)
         * @since  1.5
         */
        public BigDecimal plus(MathContext mc)
        {
            if (mc.precision == 0)                 // no rounding please
                return this;
            return doRound(this, mc);
        }

        /**
         * Returns the signum function of this {@code BigDecimal}.
         *
         * @return -1, 0, or 1 as the value of this {@code BigDecimal}
         *         is negative, Zero, or positive.
         */
        public int signum()
        {
            return (intCompact != INFLATED) ?
                Math.Sign(intCompact) :
                intVal.Value.Sign;
        }

        /**
         * Returns the <i>scale</i> of this {@code BigDecimal}.  If Zero
         * or positive, the scale is the number of digits to the right of
         * the decimal point.  If negative, the unscaled value of the
         * number is multiplied by ten to the power of the negation of the
         * scale.  For example, a scale of {@code -3} means the unscaled
         * value is multiplied by 1000.
         *
         * @return the scale of this {@code BigDecimal}.
         */
        public int Scale
        {
            get
            {
                return scale;
            }
        }

        /**
         * Returns the <i>precision</i> of this {@code BigDecimal}.  (The
         * precision is the number of digits in the unscaled value.)
         *
         * <p>The precision of a Zero value is 1.
         *
         * @return the precision of this {@code BigDecimal}.
         * @since  1.5
         */
        public int Precision
        {
            get
            {
                int result = precision;
                if (result == 0)
                {
                    long s = intCompact;
                    if (s != INFLATED)
                        result = longDigitLength(s);
                    else
                        result = bigDigitLength(inflate());
                    precision = result;
                }
                return result;
            }
        }


        /**
         * Returns a {@code BigInteger} whose value is the <i>unscaled
         * value</i> of this {@code BigDecimal}.  (Computes <tt>(this *
         * 10<sup>this.Scale</sup>)</tt>.)
         *
         * @return the unscaled value of this {@code BigDecimal}.
         * @since  1.2
         */
        public BigInteger unscaledValue()
        {
            return this.inflate();
        }

        // Rounding Modes

        /**
         * Rounding mode to round away from Zero.  Always increments the
         * digit prior to a nonZero discarded fraction.  Note that this rounding
         * mode never decreases the magnitude of the calculated value.
         */
        public const int ROUND_UP = 0;

        /**
         * Rounding mode to round towards Zero.  Never increments the digit
         * prior to a discarded fraction (i.e., truncates).  Note that this
         * rounding mode never increases the magnitude of the calculated value.
         */
        public const int ROUND_DOWN = 1;

        /**
         * Rounding mode to round towards positive infinity.  If the
         * {@code BigDecimal} is positive, behaves as for
         * {@code ROUND_UP}; if negative, behaves as for
         * {@code ROUND_DOWN}.  Note that this rounding mode never
         * decreases the calculated value.
         */
        public const int ROUND_CEILING = 2;

        /**
         * Rounding mode to round towards negative infinity.  If the
         * {@code BigDecimal} is positive, behave as for
         * {@code ROUND_DOWN}; if negative, behave as for
         * {@code ROUND_UP}.  Note that this rounding mode never
         * increases the calculated value.
         */
        public const int ROUND_FLOOR = 3;

        /**
         * Rounding mode to round towards {@literal "nearest neighbor"}
         * unless both neighbors are equidistant, in which case round up.
         * Behaves as for {@code ROUND_UP} if the discarded fraction is
         * &ge; 0.5; otherwise, behaves as for {@code ROUND_DOWN}.  Note
         * that this is the rounding mode that most of us were taught in
         * grade school.
         */
        public const int ROUND_HALF_UP = 4;

        /**
         * Rounding mode to round towards {@literal "nearest neighbor"}
         * unless both neighbors are equidistant, in which case round
         * down.  Behaves as for {@code ROUND_UP} if the discarded
         * fraction is {@literal >} 0.5; otherwise, behaves as for
         * {@code ROUND_DOWN}.
         */
        public const int ROUND_HALF_DOWN = 5;

        /**
         * Rounding mode to round towards the {@literal "nearest neighbor"}
         * unless both neighbors are equidistant, in which case, round
         * towards the even neighbor.  Behaves as for
         * {@code ROUND_HALF_UP} if the digit to the left of the
         * discarded fraction is odd; behaves as for
         * {@code ROUND_HALF_DOWN} if it's even.  Note that this is the
         * rounding mode that minimizes cumulative error when applied
         * repeatedly over a sequence of calculations.
         */
        public const int ROUND_HALF_EVEN = 6;

        /**
         * Rounding mode to assert that the requested operation has an exact
         * result, hence no rounding is necessary.  If this rounding mode is
         * specified on an operation that yields an inexact result, an
         * {@code ArithmeticException} is thrown.
         */
        public const int ROUND_UNNECESSARY = 7;


        // Scaling/Rounding Operations

        /**
         * Returns a {@code BigDecimal} rounded according to the
         * {@code MathContext} settings.  If the precision setting is 0 then
         * no rounding takes place.
         *
         * <p>The effect of this method is identical to that of the
         * {@link #plus(MathContext)} method.
         *
         * @param mc the context to use.
         * @return a {@code BigDecimal} rounded according to the
         *         {@code MathContext} settings.
         * @throws ArithmeticException if the rounding mode is
         *         {@code UNNECESSARY} and the
         *         {@code BigDecimal}  operation would require rounding.
         * @see    #plus(MathContext)
         * @since  1.5
         */
        public BigDecimal round(MathContext mc)
        {
            return plus(mc);
        }

        /**
         * Returns a {@code BigDecimal} whose scale is the specified
         * value, and whose unscaled value is determined by multiplying or
         * dividing this {@code BigDecimal}'s unscaled value by the
         * appropriate power of ten to maintain its overall value.  If the
         * scale is reduced by the operation, the unscaled value must be
         * divided (rather than multiplied), and the value may be changed;
         * in this case, the specified rounding mode is applied to the
         * division.
         *
         * <p>Note that since BigDecimal objects are immutable, calls of
         * this method do <i>not</i> result in the original object being
         * modified, contrary to the usual convention of having methods
         * named <tt>set<i>X</i></tt> mutate field <i>{@code X}</i>.
         * Instead, {@code setScale} returns an object with the proper
         * scale; the returned object may or may not be newly allocated.
         *
         * @param  newScale scale of the {@code BigDecimal} value to be returned.
         * @param  RoundingModeEnum The rounding mode to apply.
         * @return a {@code BigDecimal} whose scale is the specified value,
         *         and whose unscaled value is determined by multiplying or
         *         dividing this {@code BigDecimal}'s unscaled value by the
         *         appropriate power of ten to maintain its overall value.
         * @throws ArithmeticException if {@code RoundingModeEnum==UNNECESSARY}
         *         and the specified scaling operation would require
         *         rounding.
         * @see    RoundingModeEnum
         * @since  1.5
         */
        public BigDecimal setScale(int newScale, RoundingMode RoundingMode)
        {
            return setScale(newScale, RoundingMode.oldMode);
        }

        /**
         * Returns a {@code BigDecimal} whose scale is the specified
         * value, and whose unscaled value is determined by multiplying or
         * dividing this {@code BigDecimal}'s unscaled value by the
         * appropriate power of ten to maintain its overall value.  If the
         * scale is reduced by the operation, the unscaled value must be
         * divided (rather than multiplied), and the value may be changed;
         * in this case, the specified rounding mode is applied to the
         * division.
         *
         * <p>Note that since BigDecimal objects are immutable, calls of
         * this method do <i>not</i> result in the original object being
         * modified, contrary to the usual convention of having methods
         * named <tt>set<i>X</i></tt> mutate field <i>{@code X}</i>.
         * Instead, {@code setScale} returns an object with the proper
         * scale; the returned object may or may not be newly allocated.
         *
         * <p>The new {@link #setScale(int, RoundingModeEnum)} method should
         * be used in preference to this legacy method.
         *
         * @param  newScale scale of the {@code BigDecimal} value to be returned.
         * @param  RoundingModeEnum The rounding mode to apply.
         * @return a {@code BigDecimal} whose scale is the specified value,
         *         and whose unscaled value is determined by multiplying or
         *         dividing this {@code BigDecimal}'s unscaled value by the
         *         appropriate power of ten to maintain its overall value.
         * @throws ArithmeticException if {@code RoundingModeEnum==ROUND_UNNECESSARY}
         *         and the specified scaling operation would require
         *         rounding.
         * @throws IllegalArgumentException if {@code RoundingModeEnum} does not
         *         represent a valid rounding mode.
         * @see    #ROUND_UP
         * @see    #ROUND_DOWN
         * @see    #ROUND_CEILING
         * @see    #ROUND_FLOOR
         * @see    #ROUND_HALF_UP
         * @see    #ROUND_HALF_DOWN
         * @see    #ROUND_HALF_EVEN
         * @see    #ROUND_UNNECESSARY
         */
        public BigDecimal setScale(int newScale, int roundingMode)
        {
            if (roundingMode < ROUND_UP || roundingMode > ROUND_UNNECESSARY)
                throw new ArgumentException("Invalid rounding mode");

            int oldScale = this.scale;
            if (newScale == oldScale)        // easy case
                return this;
            if (this.signum() == 0)            // Zero can have any scale
                return BigDecimal.valueOf(0, newScale);

            long rs = this.intCompact;
            if (newScale > oldScale)
            {
                int raise = checkScale((long)newScale - oldScale);
                BigInteger? rb = null;
                if (rs == INFLATED ||
                    (rs = longMultiplyPowerTen(rs, raise)) == INFLATED)
                    rb = bigMultiplyPowerTen(raise);
                return new BigDecimal(rb, rs, newScale,
                                      (precision > 0) ? precision + raise : 0);
            }
            else
            {
                // newScale < oldScale -- drop some digits
                // Can't predict the precision due to the effect of rounding.
                int drop = checkScale((long)oldScale - newScale);
                if (drop < long_TEN_POWERS_TABLE.Length)
                    return divideAndRound(rs, this.intVal,
                                          long_TEN_POWERS_TABLE[drop], null,
                                          newScale, roundingMode, newScale);
                else
                    return divideAndRound(rs, this.intVal,
                                          INFLATED, bigTenToThe(drop),
                                          newScale, roundingMode, newScale);
            }
        }

        static private BigDecimal divideAndRound(long rs, BigInteger? intVal, long v, object p, int newScale1, int roundingMode, int newScale2)
        {
            throw new NotImplementedException();
        }

        /**
         * Returns a {@code BigDecimal} whose scale is the specified
         * value, and whose value is numerically equal to this
         * {@code BigDecimal}'s.  Throws an {@code ArithmeticException}
         * if this is not possible.
         *
         * <p>This call is typically used to increase the scale, in which
         * case it is guaranteed that there exists a {@code BigDecimal}
         * of the specified scale and the correct value.  The call can
         * also be used to reduce the scale if the caller knows that the
         * {@code BigDecimal} has sufficiently many Zeros at the end of
         * its fractional part (i.e., factors of ten in its integer value)
         * to allow for the rescaling without changing its value.
         *
         * <p>This method returns the same result as the two-argument
         * versions of {@code setScale}, but saves the caller the trouble
         * of specifying a rounding mode in cases where it is irrelevant.
         *
         * <p>Note that since {@code BigDecimal} objects are immutable,
         * calls of this method do <i>not</i> result in the original
         * object being modified, contrary to the usual convention of
         * having methods named <tt>set<i>X</i></tt> mutate field
         * <i>{@code X}</i>.  Instead, {@code setScale} returns an
         * object with the proper scale; the returned object may or may
         * not be newly allocated.
         *
         * @param  newScale scale of the {@code BigDecimal} value to be returned.
         * @return a {@code BigDecimal} whose scale is the specified value, and
         *         whose unscaled value is determined by multiplying or dividing
         *         this {@code BigDecimal}'s unscaled value by the appropriate
         *         power of ten to maintain its overall value.
         * @throws ArithmeticException if the specified scaling operation would
         *         require rounding.
         * @see    #setScale(int, int)
         * @see    #setScale(int, RoundingModeEnum)
         */
        public BigDecimal setScale(int newScale)
        {
            return setScale(newScale, ROUND_UNNECESSARY);
        }

        // Decimal Point Motion Operations

        /**
         * Returns a {@code BigDecimal} which is equivalent to this one
         * with the decimal point moved {@code n} places to the left.  If
         * {@code n} is non-negative, the call merely adds {@code n} to
         * the scale.  If {@code n} is negative, the call is equivalent
         * to {@code movePointRight(-n)}.  The {@code BigDecimal}
         * returned by this call has value <tt>(this &times;
         * 10<sup>-n</sup>)</tt> and scale {@code Max(this.Scale+n,
         * 0)}.
         *
         * @param  n number of places to move the decimal point to the left.
         * @return a {@code BigDecimal} which is equivalent to this one with the
         *         decimal point moved {@code n} places to the left.
         * @throws ArithmeticException if scale overflows.
         */
        public BigDecimal movePointLeft(int n)
        {
            // Cannot use movePointRight(-n) in case of n==Integer.MIN_VALUE
            int newScale = checkScale((long)scale + n);
            BigDecimal num = new BigDecimal(intVal, intCompact, newScale, 0);
            return num.scale < 0 ? num.setScale(0, ROUND_UNNECESSARY) : num;
        }

        /**
         * Returns a {@code BigDecimal} which is equivalent to this one
         * with the decimal point moved {@code n} places to the right.
         * If {@code n} is non-negative, the call merely subtracts
         * {@code n} from the scale.  If {@code n} is negative, the call
         * is equivalent to {@code movePointLeft(-n)}.  The
         * {@code BigDecimal} returned by this call has value <tt>(this
         * &times; 10<sup>n</sup>)</tt> and scale {@code Max(this.Scale-n,
         * 0)}.
         *
         * @param  n number of places to move the decimal point to the right.
         * @return a {@code BigDecimal} which is equivalent to this one
         *         with the decimal point moved {@code n} places to the right.
         * @throws ArithmeticException if scale overflows.
         */
        public BigDecimal movePointRight(int n)
        {
            // Cannot use movePointLeft(-n) in case of n==Integer.MIN_VALUE
            int newScale = checkScale((long)scale - n);
            BigDecimal num = new BigDecimal(intVal, intCompact, newScale, 0);
            return num.scale < 0 ? num.setScale(0, ROUND_UNNECESSARY) : num;
        }

        /**
         * Returns a BigDecimal whose numerical value is equal to
         * ({@code this} * 10<sup>n</sup>).  The scale of
         * the result is {@code (this.Scale - n)}.
         *
         * @throws ArithmeticException if the scale would be
         *         outside the range of a 32-bit integer.
         *
         * @since 1.5
         */
        public BigDecimal scaleByPowerOfTen(int n)
        {
            return new BigDecimal(intVal, intCompact,
                                  checkScale((long)scale - n), precision);
        }

        /**
         * Returns a {@code BigDecimal} which is numerically equal to
         * this one but with any trailing Zeros removed from the
         * representation.  For example, stripping the trailing Zeros from
         * the {@code BigDecimal} value {@code 600.0}, which has
         * [{@code BigInteger}, {@code scale}] components equals to
         * [6000, 1], yields {@code 6E2} with [{@code BigInteger},
         * {@code scale}] components equals to [6, -2]
         *
         * @return a numerically equal {@code BigDecimal} with any
         * trailing Zeros removed.
         * @since 1.5
         */
        public BigDecimal stripTrailingZeros()
        {
            this.inflate();
            BigDecimal result = new BigDecimal(intVal.Value, scale);
            result.stripZerosToMatchScale(long.MinValue);
            return result;
        }

        // Comparison Operations

        /**
         * Compares this {@code BigDecimal} with the specified
         * {@code BigDecimal}.  Two {@code BigDecimal} objects that are
         * equal in value but have a different scale (like 2.0 and 2.00)
         * are considered equal by this method.  This method is provided
         * in preference to individual methods for each of the six bool
         * comparison operators ({@literal <}, ==,
         * {@literal >}, {@literal >=}, !=, {@literal <=}).  The
         * suggested idiom for performing these comparisons is:
         * {@code (x.compareTo(y)} &lt;<i>op</i>&gt; {@code 0)}, where
         * &lt;<i>op</i>&gt; is one of the six comparison operators.
         *
         * @param  val {@code BigDecimal} to which this {@code BigDecimal} is
         *         to be compared.
         * @return -1, 0, or 1 as this {@code BigDecimal} is numerically
         *          less than, equal to, or greater than {@code val}.
         */
        public int CompareTo(BigDecimal val)
        {
            // Quick path for equal scale and non-inflated case.
            if (Scale == val.Scale)
            {
                long xs = intCompact;
                long ys = val.intCompact;
                if (xs != INFLATED && ys != INFLATED)
                    return xs != ys ? ((xs > ys) ? 1 : -1) : 0;
            }
            int xsign = this.signum();
            int ysign = val.signum();
            if (xsign != ysign)
                return (xsign > ysign) ? 1 : -1;
            if (xsign == 0)
                return 0;
            int cmp = compareMagnitude(val);
            return (xsign > 0) ? cmp : -cmp;
        }

        /**
         * Version of compareTo that ignores sign.
         */
        private int compareMagnitude(BigDecimal val)
        {
            // Match scales, avoid unnecessary inflation
            long ys = val.intCompact;
            long xs = this.intCompact;
            if (xs == 0)
                return (ys == 0) ? 0 : -1;
            if (ys == 0)
                return 1;

            int sdiff = this.scale - val.scale;
            if (sdiff != 0)
            {
                // Avoid matching scales if the (adjusted) exponents differ
                int xae = this.Precision - this.scale;   // [-1]
                int yae = val.Precision - val.scale;     // [-1]
                if (xae < yae)
                    return -1;
                if (xae > yae)
                    return 1;
                BigInteger rb;
                if (sdiff < 0)
                {
                    if ((xs == INFLATED ||
                          (xs = longMultiplyPowerTen(xs, -sdiff)) == INFLATED) &&
                         ys == INFLATED)
                    {
                        rb = bigMultiplyPowerTen(-sdiff);
                        return rb.compareMagnitude(val.intVal.Value);
                    }
                }
                else
                { // sdiff > 0
                    if ((ys == INFLATED ||
                          (ys = longMultiplyPowerTen(ys, sdiff)) == INFLATED) &&
                         xs == INFLATED)
                    {
                        rb = val.bigMultiplyPowerTen(sdiff);
                        return this.intVal.Value.compareMagnitude(rb);
                    }
                }
            }
            if (xs != INFLATED)
                return (ys != INFLATED) ? longCompareMagnitude(xs, ys) : -1;
            else if (ys != INFLATED)
                return 1;
            else
                return this.intVal.Value.compareMagnitude(val.intVal.Value);
        }

        /**
         * Compares this {@code BigDecimal} with the specified
         * {@code Object} for equality.  Unlike {@link
         * #compareTo(BigDecimal) compareTo}, this method considers two
         * {@code BigDecimal} objects equal only if they are equal in
         * value and scale (thus 2.0 is not equal to 2.00 when compared by
         * this method).
         *
         * @param  x {@code Object} to which this {@code BigDecimal} is
         *         to be compared.
         * @return {@code true} if and only if the specified {@code Object} is a
         *         {@code BigDecimal} whose value and scale are equal to this
         *         {@code BigDecimal}'s.
         * @see    #compareTo(java.math.BigDecimal)
         * @see    #hashCode
         */
        public override bool Equals(object x)
        {
            if (!(x is BigDecimal))
                return false;
            BigDecimal xDec = (BigDecimal)x;
            if (x == this)
                return true;
            if (scale != xDec.scale)
                return false;
            long s = this.intCompact;
            long xs = xDec.intCompact;
            if (s != INFLATED)
            {
                if (xs == INFLATED)
                    xs = compactValFor(xDec.intVal.Value);
                return xs == s;
            }
            else if (xs != INFLATED)
                return xs == compactValFor(this.intVal.Value);

            return this.inflate() == xDec.inflate();
        }

        /**
         * Returns the minimum of this {@code BigDecimal} and
         * {@code val}.
         *
         * @param  val value with which the minimum is to be computed.
         * @return the {@code BigDecimal} whose value is the lesser of this
         *         {@code BigDecimal} and {@code val}.  If they are equal,
         *         as defined by the {@link #compareTo(BigDecimal) compareTo}
         *         method, {@code this} is returned.
         * @see    #compareTo(java.math.BigDecimal)
         */
        public BigDecimal min(BigDecimal val)
        {
            return (CompareTo(val) <= 0 ? this : val);
        }

        /**
         * Returns the Maximum of this {@code BigDecimal} and {@code val}.
         *
         * @param  val value with which the Maximum is to be computed.
         * @return the {@code BigDecimal} whose value is the greater of this
         *         {@code BigDecimal} and {@code val}.  If they are equal,
         *         as defined by the {@link #compareTo(BigDecimal) compareTo}
         *         method, {@code this} is returned.
         * @see    #compareTo(java.math.BigDecimal)
         */
        public BigDecimal Max(BigDecimal val)
        {
            return (CompareTo(val) >= 0 ? this : val);
        }

        // Hash Function

        /**
         * Returns the hash code for this {@code BigDecimal}.  Note that
         * two {@code BigDecimal} objects that are numerically equal but
         * differ in scale (like 2.0 and 2.00) will generally <i>not</i>
         * have the same hash code.
         *
         * @return hash code for this {@code BigDecimal}.
         * @see #equals(Object)
         */
        static long LONG_MASK = 0xffffffffL;
        public override int GetHashCode()
        {
            if (intCompact != INFLATED)
            {
                long val2 = (intCompact < 0) ? -intCompact : intCompact;
                int temp = (int)(((int)((ulong)val2 >> 32)) * 31 +
                                  (val2 & LONG_MASK));
                return 31 * ((intCompact < 0) ? -temp : temp) + scale;
            }
            else
                return 31 * intVal.GetHashCode() + scale;
        }

        // Format Converters

        /**
         * Returns the string representation of this {@code BigDecimal},
         * using scientific notation if an exponent is needed.
         *
         * <p>A standard canonical string form of the {@code BigDecimal}
         * is created as though by the following steps: first, the
         * absolute value of the unscaled value of the {@code BigDecimal}
         * is converted to a string in base ten using the characters
         * {@code '0'} through {@code '9'} with no leading Zeros (except
         * if its value is Zero, in which case a single {@code '0'}
         * character is used).
         *
         * <p>Next, an <i>adjusted exponent</i> is calculated; this is the
         * negated scale, plus the number of characters in the converted
         * unscaled value, less one.  That is,
         * {@code -scale+(uLength-1)}, where {@code uLength} is the
         * Length of the absolute value of the unscaled value in decimal
         * digits (its <i>precision</i>).
         *
         * <p>If the scale is greater than or equal to Zero and the
         * adjusted exponent is greater than or equal to {@code -6}, the
         * number will be converted to a character form without using
         * exponential notation.  In this case, if the scale is Zero then
         * no decimal point is added and if the scale is positive a
         * decimal point will be inserted with the scale specifying the
         * number of characters to the right of the decimal point.
         * {@code '0'} characters are added to the left of the converted
         * unscaled value as necessary.  If no character precedes the
         * decimal point after this insertion then a conventional
         * {@code '0'} character is prefixed.
         *
         * <p>Otherwise (that is, if the scale is negative, or the
         * adjusted exponent is less than {@code -6}), the number will be
         * converted to a character form using exponential notation.  In
         * this case, if the converted {@code BigInteger} has more than
         * one digit a decimal point is inserted after the first digit.
         * An exponent in character form is then suffixed to the converted
         * unscaled value (perhaps with inserted decimal point); this
         * comprises the letter {@code 'E'} followed immediately by the
         * adjusted exponent converted to a character form.  The latter is
         * in base ten, using the characters {@code '0'} through
         * {@code '9'} with no leading Zeros, and is always prefixed by a
         * sign character {@code '-'} (<tt>'&#92;u002D'</tt>) if the
         * adjusted exponent is negative, {@code '+'}
         * (<tt>'&#92;u002B'</tt>) otherwise).
         *
         * <p>readonlyly, the entire string is prefixed by a minus sign
         * character {@code '-'} (<tt>'&#92;u002D'</tt>) if the unscaled
         * value is less than Zero.  No sign character is prefixed if the
         * unscaled value is Zero or positive.
         *
         * <p><b>Examples:</b>
         * <p>For each representation [<i>unscaled value</i>, <i>scale</i>]
         * on the left, the resulting string is shown on the right.
         * <pre>
         * [123,0]      "123"
         * [-123,0]     "-123"
         * [123,-1]     "1.23E+3"
         * [123,-3]     "1.23E+5"
         * [123,1]      "12.3"
         * [123,5]      "0.00123"
         * [123,10]     "1.23E-8"
         * [-123,12]    "-1.23E-10"
         * </pre>
         *
         * <b>Notes:</b>
         * <ol>
         *
         * <li>There is a one-to-one mapping between the distinguishable
         * {@code BigDecimal} values and the result of this conversion.
         * That is, every distinguishable {@code BigDecimal} value
         * (unscaled value and scale) has a unique string representation
         * as a result of using {@code ToString}.  If that string
         * representation is converted back to a {@code BigDecimal} using
         * the {@link #BigDecimal(String)} constructor, then the original
         * value will be recovered.
         *
         * <li>The string produced for a given number is always the same;
         * it is not affected by locale.  This means that it can be used
         * as a canonical string representation for exchanging decimal
         * data, or as a key for a Hashtable, etc.  Locale-sensitive
         * number formatting and parsing is handled by the {@link
         * java.text.NumberFormat} class and its subclasses.
         *
         * <li>The {@link #toEngineeringString} method may be used for
         * presenting numbers with exponents in engineering notation, and the
         * {@link #setScale(int,RoundingModeEnum) setScale} method may be used for
         * rounding a {@code BigDecimal} so it has a known number of digits after
         * the decimal point.
         *
         * <li>The digit-to-character mapping provided by
         * {@code Character.forDigit} is used.
         *
         * </ol>
         *
         * @return string representation of this {@code BigDecimal}.
         * @see    Character#forDigit
         * @see    #BigDecimal(java.lang.String)
         */

        public override String ToString()
        {
            String sc = stringCache;
            if (sc == null)
                stringCache = sc = layoutChars(true);
            return sc;
        }

        /**
         * Returns a string representation of this {@code BigDecimal},
         * using engineering notation if an exponent is needed.
         *
         * <p>Returns a string that represents the {@code BigDecimal} as
         * described in the {@link #ToString()} method, except that if
         * exponential notation is used, the power of ten is adjusted to
         * be a multiple of three (engineering notation) such that the
         * integer part of nonZero values will be in the range 1 through
         * 999.  If exponential notation is used for Zero values, a
         * decimal point and one or two fractional Zero digits are used so
         * that the scale of the Zero value is preserved.  Note that
         * unlike the output of {@link #ToString()}, the output of this
         * method is <em>not</em> guaranteed to recover the same [integer,
         * scale] pair of this {@code BigDecimal} if the output string is
         * converting back to a {@code BigDecimal} using the {@linkplain
         * #BigDecimal(String) string constructor}.  The result of this method meets
         * the weaker constraint of always producing a numerically equal
         * result from applying the string constructor to the method's output.
         *
         * @return string representation of this {@code BigDecimal}, using
         *         engineering notation if an exponent is needed.
         * @since  1.5
         */
        public String toEngineeringString()
        {
            return layoutChars(false);
        }

        /**
         * Returns a string representation of this {@code BigDecimal}
         * without an exponent field.  For values with a positive scale,
         * the number of digits to the right of the decimal point is used
         * to indicate scale.  For values with a Zero or negative scale,
         * the resulting string is generated as if the value were
         * converted to a numerically equal value with Zero scale and as
         * if all the trailing Zeros of the Zero scale value were present
         * in the result.
         *
         * The entire string is prefixed by a minus sign character '-'
         * (<tt>'&#92;u002D'</tt>) if the unscaled value is less than
         * Zero. No sign character is prefixed if the unscaled value is
         * Zero or positive.
         *
         * Note that if the result of this method is passed to the
         * {@linkplain #BigDecimal(String) string constructor}, only the
         * numerical value of this {@code BigDecimal} will necessarily be
         * recovered; the representation of the new {@code BigDecimal}
         * may have a different scale.  In particular, if this
         * {@code BigDecimal} has a negative scale, the string resulting
         * from this method will have a scale of Zero when processed by
         * the string constructor.
         *
         * (This method behaves analogously to the {@code ToString}
         * method in 1.4 and earlier releases.)
         *
         * @return a string representation of this {@code BigDecimal}
         * without an exponent field.
         * @since 1.5
         * @see #ToString()
         * @see #toEngineeringString()
         */
        public String toPlainString()
        {
            BigDecimal bd = this;
            if (bd.scale < 0)
                bd = bd.setScale(0);
            bd.inflate();
            if (bd.scale == 0)      // No decimal point
                return bd.intVal.ToString();
            return bd.getValueString(bd.signum(), BigInteger.Abs(bd.intVal.Value).ToString(), bd.scale);
        }

        /* Returns a digit.digit string */
        private String getValueString(int signum, String intString, int scale)
        {
            /* Insert decimal point */
            StringBuilder buf;
            int insertionPoint = intString.Length - scale;
            if (insertionPoint == 0)
            {  /* Point goes right before intVal */
                return (signum < 0 ? "-0." : "0.") + intString;
            }
            else if (insertionPoint > 0)
            { /* Point goes inside intVal */
                buf = new StringBuilder(intString);
                buf.Insert(insertionPoint, '.');
                if (signum < 0)
                    buf.Insert(0, '-');
            }
            else
            { /* We must insert Zeros between point and intVal */
                buf = new StringBuilder(3 - insertionPoint + intString.Length);
                buf.Append(signum < 0 ? "-0." : "0.");
                for (int i = 0; i < -insertionPoint; i++)
                    buf.Append('0');
                buf.Append(intString);
            }
            return buf.ToString();
        }

        /**
         * Converts this {@code BigDecimal} to a {@code BigInteger}.
         * This conversion is analogous to the
         * <i>narrowing primitive conversion</i> from {@code double} to
         * {@code long} as defined in section 5.1.3 of
         * <cite>The Java&trade; Language Specification</cite>:
         * any fractional part of this
         * {@code BigDecimal} will be discarded.  Note that this
         * conversion can lose information about the precision of the
         * {@code BigDecimal} value.
         * <p>
         * To have an exception thrown if the conversion is inexact (in
         * other words if a nonZero fractional part is discarded), use the
         * {@link #toBigIntegerExact()} method.
         *
         * @return this {@code BigDecimal} converted to a {@code BigInteger}.
         */
        public BigInteger toBigInteger()
        {
            // force to an integer, quietly
            return this.setScale(0, ROUND_DOWN).inflate();
        }

        /**
         * Converts this {@code BigDecimal} to a {@code BigInteger},
         * checking for lost information.  An exception is thrown if this
         * {@code BigDecimal} has a nonZero fractional part.
         *
         * @return this {@code BigDecimal} converted to a {@code BigInteger}.
         * @throws ArithmeticException if {@code this} has a nonZero
         *         fractional part.
         * @since  1.5
         */
        public BigInteger toBigIntegerExact()
        {
            // round to an integer, with Exception if decimal part non-0
            return this.setScale(0, ROUND_UNNECESSARY).inflate();
        }

        /**
         * Converts this {@code BigDecimal} to a {@code long}.
         * This conversion is analogous to the
         * <i>narrowing primitive conversion</i> from {@code double} to
         * {@code short} as defined in section 5.1.3 of
         * <cite>The Java&trade; Language Specification</cite>:
         * any fractional part of this
         * {@code BigDecimal} will be discarded, and if the resulting
         * "{@code BigInteger}" is too big to fit in a
         * {@code long}, only the low-order 64 bits are returned.
         * Note that this conversion can lose information about the
         * overall magnitude and precision of this {@code BigDecimal} value as well
         * as return a result with the opposite sign.
         *
         * @return this {@code BigDecimal} converted to a {@code long}.
         */
        public long longValue()
        {
            return (intCompact != INFLATED && scale == 0) ?
                intCompact :
                (long)toBigInteger();
        }

        /**
         * Converts this {@code BigDecimal} to a {@code long}, checking
         * for lost information.  If this {@code BigDecimal} has a
         * nonZero fractional part or is out of the possible range for a
         * {@code long} result then an {@code ArithmeticException} is
         * thrown.
         *
         * @return this {@code BigDecimal} converted to a {@code long}.
         * @throws ArithmeticException if {@code this} has a nonZero
         *         fractional part, or will not fit in a {@code long}.
         * @since  1.5
         */
        public long longValueExact()
        {
            if (intCompact != INFLATED && scale == 0)
                return intCompact;
            // If more than 19 digits in integer part it cannot possibly fit
            if ((Precision - scale) > 19) // [OK for negative scale too]
                throw new ArithmeticException("Overflow");
            // Fastpath Zero and < 1.0 numbers (the latter can be very slow
            // to round if very small)
            if (this.signum() == 0)
                return 0;
            if ((this.Precision - this.scale) <= 0)
                throw new ArithmeticException("Rounding necessary");
            // round to an integer, with Exception if decimal part non-0
            BigDecimal num = this.setScale(0, ROUND_UNNECESSARY);
            if (num.Precision >= 19) // need to check carefully
                longOverflow.check(num);
            return (long)num.inflate();
        }

        private static class longOverflow
        {
            /** BigInteger equal to long.MIN_VALUE. */
            private static BigInteger longMIN = new BigInteger(long.MinValue);

            /** BigInteger equal to long.MaxValue. */
            private static BigInteger longMax = new BigInteger(long.MaxValue);

            public static void check(BigDecimal num)
            {
                num.inflate();
                if ((num.intVal.Value.CompareTo(longMIN) < 0) ||
                    (num.intVal.Value.CompareTo(longMax) > 0))
                    throw new ArithmeticException("Overflow");
            }
        }

        /**
         * Converts this {@code BigDecimal} to an {@code int}.
         * This conversion is analogous to the
         * <i>narrowing primitive conversion</i> from {@code double} to
         * {@code short} as defined in section 5.1.3 of
         * <cite>The Java&trade; Language Specification</cite>:
         * any fractional part of this
         * {@code BigDecimal} will be discarded, and if the resulting
         * "{@code BigInteger}" is too big to fit in an
         * {@code int}, only the low-order 32 bits are returned.
         * Note that this conversion can lose information about the
         * overall magnitude and precision of this {@code BigDecimal}
         * value as well as return a result with the opposite sign.
         *
         * @return this {@code BigDecimal} converted to an {@code int}.
         */
        public int intValue()
        {
            return (intCompact != INFLATED && scale == 0) ?
                (int)intCompact :
                (int)toBigInteger();
        }

        /**
         * Converts this {@code BigDecimal} to an {@code int}, checking
         * for lost information.  If this {@code BigDecimal} has a
         * nonZero fractional part or is out of the possible range for an
         * {@code int} result then an {@code ArithmeticException} is
         * thrown.
         *
         * @return this {@code BigDecimal} converted to an {@code int}.
         * @throws ArithmeticException if {@code this} has a nonZero
         *         fractional part, or will not fit in an {@code int}.
         * @since  1.5
         */
        public int intValueExact()
        {
            long num;
            num = this.longValueExact();     // will check decimal part
            if ((int)num != num)
                throw new Exception("Overflow");
            return (int)num;
        }

        /**
         * Converts this {@code BigDecimal} to a {@code short}, checking
         * for lost information.  If this {@code BigDecimal} has a
         * nonZero fractional part or is out of the possible range for a
         * {@code short} result then an {@code ArithmeticException} is
         * thrown.
         *
         * @return this {@code BigDecimal} converted to a {@code short}.
         * @throws ArithmeticException if {@code this} has a nonZero
         *         fractional part, or will not fit in a {@code short}.
         * @since  1.5
         */
        public short shortValueExact()
        {
            long num;
            num = this.longValueExact();     // will check decimal part
            if ((short)num != num)
                throw new ArithmeticException("Overflow");
            return (short)num;
        }

        /**
         * Converts this {@code BigDecimal} to a {@code byte}, checking
         * for lost information.  If this {@code BigDecimal} has a
         * nonZero fractional part or is out of the possible range for a
         * {@code byte} result then an {@code ArithmeticException} is
         * thrown.
         *
         * @return this {@code BigDecimal} converted to a {@code byte}.
         * @throws ArithmeticException if {@code this} has a nonZero
         *         fractional part, or will not fit in a {@code byte}.
         * @since  1.5
         */
        public byte byteValueExact()
        {
            long num;
            num = this.longValueExact();     // will check decimal part
            if ((byte)num != num)
                throw new ArithmeticException("Overflow");
            return (byte)num;
        }

        /**
         * Converts this {@code BigDecimal} to a {@code float}.
         * This conversion is similar to the
         * <i>narrowing primitive conversion</i> from {@code double} to
         * {@code float} as defined in section 5.1.3 of
         * <cite>The Java&trade; Language Specification</cite>:
         * if this {@code BigDecimal} has too great a
         * magnitude to represent as a {@code float}, it will be
         * converted to {@link Float#NEGATIVE_INFINITY} or {@link
         * Float#POSITIVE_INFINITY} as appropriate.  Note that even when
         * the return value is finite, this conversion can lose
         * information about the precision of the {@code BigDecimal}
         * value.
         *
         * @return this {@code BigDecimal} converted to a {@code float}.
         */
        public float floatValue()
        {
            if (scale == 0 && intCompact != INFLATED)
                return (float)intCompact;
            // Somewhat inefficient, but guaranteed to work.
            return float.Parse(this.ToString());
        }

        /**
         * Converts this {@code BigDecimal} to a {@code double}.
         * This conversion is similar to the
         * <i>narrowing primitive conversion</i> from {@code double} to
         * {@code float} as defined in section 5.1.3 of
         * <cite>The Java&trade; Language Specification</cite>:
         * if this {@code BigDecimal} has too great a
         * magnitude represent as a {@code double}, it will be
         * converted to {@link Double#NEGATIVE_INFINITY} or {@link
         * Double#POSITIVE_INFINITY} as appropriate.  Note that even when
         * the return value is finite, this conversion can lose
         * information about the precision of the {@code BigDecimal}
         * value.
         *
         * @return this {@code BigDecimal} converted to a {@code double}.
         */
        public double doubleValue()
        {
            if (scale == 0 && intCompact != INFLATED)
                return (double)intCompact;
            // Somewhat inefficient, but guaranteed to work.
            return Double.Parse(this.ToString());
        }

        /**
         * Returns the size of an ulp, a unit in the last place, of this
         * {@code BigDecimal}.  An ulp of a nonZero {@code BigDecimal}
         * value is the positive distance between this value and the
         * {@code BigDecimal} value next larger in magnitude with the
         * same number of digits.  An ulp of a Zero value is numerically
         * equal to 1 with the scale of {@code this}.  The result is
         * stored with the same scale as {@code this} so the result
         * for Zero and nonZero values is equal to {@code [1,
         * this.Scale]}.
         *
         * @return the size of an ulp of {@code this}
         * @since 1.5
         */
        public BigDecimal ulp()
        {
            return BigDecimal.valueOf(1, this.Scale);
        }


        // Private class to build a string representation for BigDecimal object.
        // "StringBuilderHelper" is constructed as a thread local variable so it is
        // thread safe. The StringBuilder field acts as a buffer to hold the temporary
        // representation of BigDecimal. The cmpCharArray holds all the characters for
        // the compact representation of BigDecimal (except for '-' sign' if it is
        // negative) if its intCompact field is not INFLATED. It is shared by all
        // calls to ToString() and its variants in that particular thread.
        class StringBuilderHelper
        {
            StringBuilder sb;    // Placeholder for BigDecimal string
            char[] cmpCharArray; // character array to place the intCompact

            public StringBuilderHelper()
            {
                sb = new StringBuilder();
                // All non negative longs can be made to fit into 19 character array.
                cmpCharArray = new char[19];
            }

            // Accessors.
            public StringBuilder getStringBuilder()
            {
                sb.Clear(); //.SetLength(0);
                return sb;
            }

            public char[] getCompactCharArray()
            {
                return cmpCharArray;
            }

            /**
             * Places characters representing the intCompact in {@code long} into
             * cmpCharArray and returns the offset to the array where the
             * representation starts.
             *
             * @param intCompact the number to put into the cmpCharArray.
             * @return offset to the array where the representation starts.
             * Note: intCompact must be greater or equal to Zero.
             */
            public int putIntCompact(long intCompact)
            {
                if (!(intCompact >= 0)) {
                    throw new ArgumentOutOfRangeException(nameof(intCompact));
                }

                long q;
                int r;
                // since we start from the least significant digit, charPos points to
                // the last character in cmpCharArray.
                int charPos = cmpCharArray.Length;

                // Get 2 digits/iteration using longs until quotient fits into an int
                while (intCompact > int.MaxValue)
                {
                    q = intCompact / 100;
                    r = (int)(intCompact - q * 100);
                    intCompact = q;
                    cmpCharArray[--charPos] = DIGIT_ONES[r];
                    cmpCharArray[--charPos] = DIGIT_TENS[r];
                }

                // Get 2 digits/iteration using ints when i2 >= 100
                int q2;
                int i2 = (int)intCompact;
                while (i2 >= 100)
                {
                    q2 = i2 / 100;
                    r = i2 - q2 * 100;
                    i2 = q2;
                    cmpCharArray[--charPos] = DIGIT_ONES[r];
                    cmpCharArray[--charPos] = DIGIT_TENS[r];
                }

                cmpCharArray[--charPos] = DIGIT_ONES[i2];
                if (i2 >= 10)
                    cmpCharArray[--charPos] = DIGIT_TENS[i2];

                return charPos;
            }

            static char[] DIGIT_TENS = {
            '0', '0', '0', '0', '0', '0', '0', '0', '0', '0',
            '1', '1', '1', '1', '1', '1', '1', '1', '1', '1',
            '2', '2', '2', '2', '2', '2', '2', '2', '2', '2',
            '3', '3', '3', '3', '3', '3', '3', '3', '3', '3',
            '4', '4', '4', '4', '4', '4', '4', '4', '4', '4',
            '5', '5', '5', '5', '5', '5', '5', '5', '5', '5',
            '6', '6', '6', '6', '6', '6', '6', '6', '6', '6',
            '7', '7', '7', '7', '7', '7', '7', '7', '7', '7',
            '8', '8', '8', '8', '8', '8', '8', '8', '8', '8',
            '9', '9', '9', '9', '9', '9', '9', '9', '9', '9',
        };

            static char[] DIGIT_ONES = {
            '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
            '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
            '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
            '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
            '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
            '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
            '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
            '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
            '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
            '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
        };
        }

        /**
         * Lay out this {@code BigDecimal} into a {@code char[]} array.
         * The Java 1.2 equivalent to this was called {@code getValueString}.
         *
         * @param  sci {@code true} for Scientific exponential notation;
         *          {@code false} for Engineering
         * @return string with canonical string representation of this
         *         {@code BigDecimal}
         */
        private String layoutChars(bool sci)
        {
            if (scale == 0)                      // Zero scale is trivial
                return (intCompact != INFLATED) ?
                    intCompact.ToString() :
                    intVal.ToString();

            StringBuilderHelper sbHelper = new StringBuilderHelper(); // threadLocalStringBuilderHelper.get();
            char[] coeff;
            int offset;  // offset is the starting index for coeff array
                         // Get the significand as an absolute value
            if (intCompact != INFLATED)
            {
                offset = sbHelper.putIntCompact(Math.Abs(intCompact));
                coeff = sbHelper.getCompactCharArray();
            }
            else
            {
                offset = 0;
                coeff = BigInteger.Abs(intVal.Value).ToString().ToCharArray();
            }

            // Construct a buffer, with sufficient capacity for all cases.
            // If E-notation is needed, Length will be: +1 if negative, +1
            // if '.' needed, +2 for "E+", + up to 10 for adjusted exponent.
            // Otherwise it could have +1 if negative, plus leading "0.00000"
            StringBuilder buf = sbHelper.getStringBuilder();
            if (signum() < 0)             // prefix '-' if negative
                buf.Append('-');
            int coeffLen = coeff.Length - offset;
            long adjusted = -(long)scale + (coeffLen - 1);
            if ((scale >= 0) && (adjusted >= -6))
            { // plain number
                int pad = scale - coeffLen;         // count of padding Zeros
                if (pad >= 0)
                {                     // 0.xxx form
                    buf.Append('0');
                    buf.Append('.');
                    for (; pad > 0; pad--)
                    {
                        buf.Append('0');
                    }
                    buf.Append(coeff, offset, coeffLen);
                }
                else
                {                         // xx.xx form
                    buf.Append(coeff, offset, -pad);
                    buf.Append('.');
                    buf.Append(coeff, -pad + offset, scale);
                }
            }
            else
            { // E-notation is needed
                if (sci)
                {                       // Scientific notation
                    buf.Append(coeff[offset]);   // first character
                    if (coeffLen > 1)
                    {          // more to come
                        buf.Append('.');
                        buf.Append(coeff, offset + 1, coeffLen - 1);
                    }
                }
                else
                {                         // Engineering notation
                    int sig = (int)(adjusted % 3);
                    if (sig < 0)
                        sig += 3;                // [adjusted was negative]
                    adjusted -= sig;             // now a multiple of 3
                    sig++;
                    if (signum() == 0)
                    {
                        switch (sig)
                        {
                            case 1:
                                buf.Append('0'); // exponent is a multiple of three
                                break;
                            case 2:
                                buf.Append("0.00");
                                adjusted += 3;
                                break;
                            case 3:
                                buf.Append("0.0");
                                adjusted += 3;
                                break;
                            default:
                                throw new Exception("Unexpected sig value " + sig);
                        }
                    }
                    else if (sig >= coeffLen)
                    {   // significand all in integer
                        buf.Append(coeff, offset, coeffLen);
                        // may need some Zeros, too
                        for (int i = sig - coeffLen; i > 0; i--)
                            buf.Append('0');
                    }
                    else
                    {                     // xx.xxE form
                        buf.Append(coeff, offset, sig);
                        buf.Append('.');
                        buf.Append(coeff, offset + sig, coeffLen - sig);
                    }
                }
                if (adjusted != 0)
                {             // [!sci could have made 0]
                    buf.Append('E');
                    if (adjusted > 0)            // force sign for positive
                        buf.Append('+');
                    buf.Append(adjusted);
                }
            }
            return buf.ToString();
        }

        /**
         * Return 10 to the power n, as a {@code BigInteger}.
         *
         * @param  n the power of ten to be returned (>=0)
         * @return a {@code BigInteger} with the value (10<sup>n</sup>)
         */
        private static BigInteger bigTenToThe(int n)
        {
            if (n < 0)
                return BigInteger.Zero;

            if (n < BIG_TEN_POWERS_TABLE_Max)
            {
                BigInteger[] pows = BIG_TEN_POWERS_TABLE;
                if (n < pows.Length)
                    return pows[n];
                else
                    return expandBigIntegerTenPowers(n);
            }
            // BigInteger.pow is slow, so make 10**n by constructing a
            // BigInteger from a character string (still not very fast)
            char[] tenpow = new char[n + 1];
            tenpow[0] = '1';
            for (int i = 1; i <= n; i++)
                tenpow[i] = '0';
            return BigInteger.Parse(tenpow.ToString());
        }

        static BigInteger BigIntegerTEN = new BigInteger(10);

        /**
         * Expand the BIG_TEN_POWERS_TABLE array to contain at least 10**n.
         *
         * @param n the power of ten to be returned (>=0)
         * @return a {@code BigDecimal} with the value (10<sup>n</sup>) and
         *         in the meantime, the BIG_TEN_POWERS_TABLE array gets
         *         expanded to the size greater than n.
         */
        private static BigInteger expandBigIntegerTenPowers(int n)
        {
            // part of the java implementation, to be ported to c#: synchronized(BigDecimal.class) {
            BigInteger[] pows = BIG_TEN_POWERS_TABLE;
            int curLen = pows.Length;
            // The following comparison and the above synchronized statement is
            // to prevent multiple threads from expanding the same array.
            if (curLen <= n) {
                int newLen = curLen << 1;
                while (newLen <= n) newLen <<= 1;
                // pows = Arrays.copyOf(pows, newLen);
                Array.Resize(ref pows, newLen);
                for (int i = curLen; i < newLen; i++)
                    pows[i] = pows[i - 1] * BigIntegerTEN;
                // Based on the following facts:
                // 1. pows is a private local variable;
                // 2. the following store is a volatile store.
                // the newly created array elements can be safely published.
                BIG_TEN_POWERS_TABLE = pows;
            }
            return pows[n];
        }


        private static long[] long_TEN_POWERS_TABLE = {
        1,                     // 0 / 10^0
        10,                    // 1 / 10^1
        100,                   // 2 / 10^2
        1000,                  // 3 / 10^3
        10000,                 // 4 / 10^4
        100000,                // 5 / 10^5
        1000000,               // 6 / 10^6
        10000000,              // 7 / 10^7
        100000000,             // 8 / 10^8
        1000000000,            // 9 / 10^9
        10000000000L,          // 10 / 10^10
        100000000000L,         // 11 / 10^11
        1000000000000L,        // 12 / 10^12
        10000000000000L,       // 13 / 10^13
        100000000000000L,      // 14 / 10^14
        1000000000000000L,     // 15 / 10^15
        10000000000000000L,    // 16 / 10^16
        100000000000000000L,   // 17 / 10^17
        1000000000000000000L   // 18 / 10^18
    };

        private static volatile BigInteger[] BIG_TEN_POWERS_TABLE = {BigInteger.One,
        new BigInteger(10),       new BigInteger(100),
        new BigInteger(1000),     new BigInteger(10000),
        new BigInteger(100000),   new BigInteger(1000000),
        new BigInteger(10000000), new BigInteger(100000000),
        new BigInteger(1000000000),
        new BigInteger(10000000000L),
        new BigInteger(100000000000L),
        new BigInteger(1000000000000L),
        new BigInteger(10000000000000L),
        new BigInteger(100000000000000L),
        new BigInteger(1000000000000000L),
        new BigInteger(10000000000000000L),
        new BigInteger(100000000000000000L),
        new BigInteger(1000000000000000000L)
    };

        private static int BIG_TEN_POWERS_TABLE_INITLEN =
            BIG_TEN_POWERS_TABLE.Length;
        private static int BIG_TEN_POWERS_TABLE_Max =
            16 * BIG_TEN_POWERS_TABLE_INITLEN;

        private static long[] THRESHOLDS_TABLE = {
        long.MaxValue,                     // 0
        long.MaxValue/10L,                 // 1
        long.MaxValue/100L,                // 2
        long.MaxValue/1000L,               // 3
        long.MaxValue/10000L,              // 4
        long.MaxValue/100000L,             // 5
        long.MaxValue/1000000L,            // 6
        long.MaxValue/10000000L,           // 7
        long.MaxValue/100000000L,          // 8
        long.MaxValue/1000000000L,         // 9
        long.MaxValue/10000000000L,        // 10
        long.MaxValue/100000000000L,       // 11
        long.MaxValue/1000000000000L,      // 12
        long.MaxValue/10000000000000L,     // 13
        long.MaxValue/100000000000000L,    // 14
        long.MaxValue/1000000000000000L,   // 15
        long.MaxValue/10000000000000000L,  // 16
        long.MaxValue/100000000000000000L, // 17
        long.MaxValue/1000000000000000000L // 18
    };

        /**
         * Compute val * 10 ^ n; return this product if it is
         * representable as a long, INFLATED otherwise.
         */
        private static long longMultiplyPowerTen(long val, int n)
        {
            if (val == 0 || n <= 0)
                return val;
            long[] tab = long_TEN_POWERS_TABLE;
            long[] bounds = THRESHOLDS_TABLE;
            if (n < tab.Length && n < bounds.Length)
            {
                long tenpower = tab[n];
                if (val == 1)
                    return tenpower;
                if (Math.Abs(val) <= bounds[n])
                    return val * tenpower;
            }
            return INFLATED;
        }

        /**
         * Compute this * 10 ^ n.
         * Needed mainly to allow special casing to trap Zero value
         */
        private BigInteger bigMultiplyPowerTen(int n)
        {
            if (n <= 0)
                return this.inflate();

            if (intCompact != INFLATED)
                return bigTenToThe(n) * intCompact;
            else
                return intVal.Value * bigTenToThe(n);
        }

        /**
         * Assign appropriate BigInteger to intVal field if intVal is
         * null, i.e. the compact representation is in use.
         */
        private BigInteger inflate()
        {
            if (intVal == null)
                intVal = new BigInteger(intCompact);
            return intVal.Value;
        }

        /**
         * Match the scales of two {@code BigDecimal}s to align their
         * least significant digits.
         *
         * <p>If the scales of val[0] and val[1] differ, rescale
         * (non-destructively) the lower-scaled {@code BigDecimal} so
         * they match.  That is, the lower-scaled reference will be
         * replaced by a reference to a new object with the same scale as
         * the other {@code BigDecimal}.
         *
         * @param  val array of two elements referring to the two
         *         {@code BigDecimal}s to be aligned.
         */
        private static void matchScale(BigDecimal[] val)
        {
            if (val[0].scale == val[1].scale)
            {
                return;
            }
            else if (val[0].scale < val[1].scale)
            {
                val[0] = val[0].setScale(val[1].scale, ROUND_UNNECESSARY);
            }
            else if (val[1].scale < val[0].scale)
            {
                val[1] = val[1].setScale(val[0].scale, ROUND_UNNECESSARY);
            }
        }




        /**
         * Returns the Length of the absolute value of a {@code long}, in decimal
         * digits.
         *
         * @param x the {@code long}
         * @return the Length of the unscaled value, in deciaml digits.
         */
        private static int longDigitLength(long x)
        {
            /*
             * As described in "Bit Twiddling Hacks" by Sean Anderson,
             * (http://graphics.stanford.edu/~seander/bithacks.html)
             * integer log 10 of x is within 1 of
             * (1233/4096)* (1 + integer log 2 of x).
             * The fraction 1233/4096 approximates log10(2). So we first
             * do a version of log2 (a variant of long class with
             * pre-checks and opposite directionality) and then scale and
             * check against powers table. This is a little simpler in
             * present context than the version in Hacker's Delight sec
             * 11-4.  Adding one to bit Length allows comparing downward
             * from the long_TEN_POWERS_TABLE that we need anyway.
             */
            if (x == INFLATED)
            {
                throw new ArgumentOutOfRangeException(nameof(x));
            }
            if (x < 0)
                x = -x;
            if (x < 10) // must screen for 0, might as well 10
                return 1;
            int n = 64; // not 63, to avoid needing to add 1 later
            int y = (int)((ulong)x >> 32);
            if (y == 0) { n -= 32; y = (int)x; }
            if ((ulong)y >> 16 == 0) { n -= 16; y <<= 16; }
            if ((ulong)y >> 24 == 0) { n -= 8; y <<= 8; }
            if ((ulong)y >> 28 == 0) { n -= 4; y <<= 4; }
            if ((ulong)y >> 30 == 0) { n -= 2; y <<= 2; }
            int r = (int)((ulong)(((y >> 31) + n) * 1233) >> 12);
            long[] tab = long_TEN_POWERS_TABLE;
            // if r >= Length, must have Max possible digits for long
            return (r >= tab.Length || x < tab[r]) ? r : r + 1;
        }

        /**
         * Returns the Length of the absolute value of a BigInteger, in
         * decimal digits.
         *
         * @param b the BigInteger
         * @return the Length of the unscaled value, in decimal digits
         */
        private static int bigDigitLength(BigInteger b)
        {
            /*
             * Same idea as the long version, but we need a better
             * approximation of log10(2). Using 646456993/2^31
             * is accurate up to Max possible reported bitLength.
             */
            if (b.Sign == 0)
                return 1;
            int r = (int)((((long)b.bitLength() + 1) * 646456993) >> 31);
            return b.compareMagnitude(bigTenToThe(r)) < 0 ? r : r + 1;
        }


        /**
         * Remove insignificant trailing Zeros from this
         * {@code BigDecimal} until the preferred scale is reached or no
         * more Zeros can be removed.  If the preferred scale is less than
         * Integer.MIN_VALUE, all the trailing Zeros will be removed.
         *
         * {@code BigInteger} assistance could help, here?
         *
         * <p>WARNING: This method should only be called on new objects as
         * it mutates the value fields.
         *
         * @return this {@code BigDecimal} with a scale possibly reduced
         * to be closed to the preferred scale.
         */
        private BigDecimal stripZerosToMatchScale(long preferredScale)
        {
            this.inflate();
            BigInteger[] qr;                // quotient-remainder pair
            while (intVal.Value.compareMagnitude(BigIntegerTEN) >= 0 &&
                    scale > preferredScale)
            {
                if (!intVal.Value.IsEven)
                    break;                  // odd number cannot end in 0

                // qr = intVal.Value.divideAndRemainder(BigIntegerTEN);
                var result = BigInteger.DivRem(intVal.Value, BigIntegerTEN, out var remainder);

                if (remainder.Sign != 0)
                    break;                  // non-0 remainder
                intVal = result;
                scale = checkScale((long)scale - 1);  // could Overflow
                if (precision > 0)          // adjust precision if known
                    precision--;
            }
            if (intVal != null)
                intCompact = compactValFor(intVal.Value);
            return this;
        }

        /**
         * Check a scale for Underflow or Overflow.  If this BigDecimal is
         * nonZero, throw an exception if the scale is outof range. If this
         * is Zero, saturate the scale to the extreme value of the right
         * sign if the scale is out of range.
         *
         * @param val The new scale.
         * @throws ArithmeticException (overflow or underflow) if the new
         *         scale is out of range.
         * @return validated scale as an int.
         */
        private int checkScale(long val)
        {
            int asInt = (int)val;
            if (asInt != val)
            {
                asInt = val > int.MaxValue ? int.MaxValue : int.MinValue;
                BigInteger b;
                if (intCompact != 0 &&
                    ((b = intVal.Value) == null || b.Sign != 0))
                    throw new ArithmeticException(asInt > 0 ? "Underflow" : "Overflow");
            }
            return asInt;
        }

        /**
         * Round an operand; used only if digits &gt; 0.  Does not change
         * {@code this}; if rounding is needed a new {@code BigDecimal}
         * is created and returned.
         *
         * @param mc the context to use.
         * @throws ArithmeticException if the result is inexact but the
         *         rounding mode is {@code UNNECESSARY}.
         */
        private BigDecimal roundOp(MathContext mc)
        {
            BigDecimal rounded = doRound(this, mc);
            return rounded;
        }

        /** Round this BigDecimal according to the MathContext settings;
         *  used only if precision {@literal >} 0.
         *
         * <p>WARNING: This method should only be called on new objects as
         * it mutates the value fields.
         *
         * @param mc the context to use.
         * @throws ArithmeticException if the rounding mode is
         *         {@code RoundingModeEnum.UNNECESSARY} and the
         *         {@code BigDecimal} operation would require rounding.
         */
        private void roundThis(MathContext mc)
        {
            BigDecimal rounded = doRound(this, mc);
            if (rounded == this)                 // wasn't rounded
                return;
            this.intVal = rounded.intVal;
            this.intCompact = rounded.intCompact;
            this.scale = rounded.scale;
            this.precision = rounded.precision;
        }

        /**
         * Returns a {@code BigDecimal} rounded according to the
         * MathContext settings; used only if {@code mc.precision > 0}.
         * Does not change {@code this}; if rounding is needed a new
         * {@code BigDecimal} is created and returned.
         *
         * @param mc the context to use.
         * @return a {@code BigDecimal} rounded according to the MathContext
         *         settings.  May return this, if no rounding needed.
         * @throws ArithmeticException if the rounding mode is
         *         {@code RoundingModeEnum.UNNECESSARY} and the
         *         result is inexact.
         */
        private static BigDecimal doRound(BigDecimal d, MathContext mc)
        {
            int mcp = mc.precision;
            int drop;
            // This might (rarely) iterate to cover the 999=>1000 case
            while ((drop = d.Precision - mcp) > 0)
            {
                int newScale = d.checkScale((long)d.scale - drop);
                int mode = (int)mc.RoundingMode; //.oldMode;
                if (drop < long_TEN_POWERS_TABLE.Length)
                    d = divideAndRound(d.intCompact, d.intVal,
                                       long_TEN_POWERS_TABLE[drop], null,
                                       newScale, mode, newScale);
                else
                    d = divideAndRound(d.intCompact, d.intVal,
                                       INFLATED, bigTenToThe(drop),
                                       newScale, mode, newScale);
            }
            return d;
        }

        /**
         * Returns the compact value for given {@code BigInteger}, or
         * INFLATED if too big. Relies on internal representation of
         * {@code BigInteger}.
         */
        private static long compactValFor(BigInteger b)
        {
            // in .NET world we don't have access to mag and signum internals of BigInteger
            // we simply return INFLATED
            return INFLATED;
        }

        private static int longCompareMagnitude(long x, long y)
        {
            if (x < 0)
                x = -x;
            if (y < 0)
                y = -y;
            return (x < y) ? -1 : ((x == y) ? 0 : 1);
        }

        private static int saturatelong(long s)
        {
            int i = (int)s;
            return (s == i) ? i : (s < 0 ? int.MinValue : int.MaxValue);
        }

        /*
         * Internal printing routine
         */
        private static void print(String name, BigDecimal bd)
        {
            Console.Error.WriteLine("{0]}:\tintCompact {1}\tintVal {2}\tscale {3}\tprecision {4}",
                              name,
                              bd.intCompact,
                              bd.intVal,
                              bd.scale,
                              bd.precision);
        }

        /**
         * Check internal invariants of this BigDecimal.  These invariants
         * include:
         *
         * <ul>
         *
         * <li>The object must be initialized; either intCompact must not be
         * INFLATED or intVal is non-null.  Both of these conditions may
         * be true.
         *
         * <li>If both intCompact and intVal and set, their values must be
         * consistent.
         *
         * <li>If precision is nonZero, it must have the right value.
         * </ul>
         *
         * Note: Since this is an audit method, we are not supposed to change the
         * state of this BigDecimal object.
         */
        private BigDecimal audit()
        {
            if (intCompact == INFLATED)
            {
                if (intVal == null)
                {
                    print("audit", this);
                    throw new Exception("null intVal");
                }
                // Check precision
                if (precision > 0 && precision != bigDigitLength(intVal.Value))
                {
                    print("audit", this);
                    throw new Exception("precision mismatch");
                }
            }
            else
            {
                if (intVal.HasValue)
                {
                    long val = (long)intVal.Value;
                    if (val != intCompact)
                    {
                        print("audit", this);
                        throw new Exception("Inconsistent state, intCompact=" +
                                                 intCompact + "\t intVal=" + val);
                    }
                }
                // Check precision
                if (precision > 0 && precision != longDigitLength(intCompact))
                {
                    print("audit", this);
                    throw new Exception("precision mismatch");
                }
            }
            return this;
        }

    }
}