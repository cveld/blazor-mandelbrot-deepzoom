namespace BigDecimalsJava
{
    /*
     * Copyright (c) 2003, 2007, Oracle and/or its affiliates. All rights reserved.
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
     * Portions Copyright IBM Corporation, 1997, 2001. All Rights Reserved.
     */




    using System;
    using System.IO;
    /**
    * Immutable objects which encapsulate the context settings which
    * describe certain rules for numerical operators, such as those
    * implemented by the {@link BigDecimal} class.
    *
    * <p>The base-independent settings are:
    * <ol>
    * <li>{@code precision}:
    * the number of digits to be used for an operation; results are
    * rounded to this precision
    *
    * <li>{@code RoundingModeEnum}:
    * a {@link RoundingModeEnum} object which specifies the algorithm to be
    * used for rounding.
    * </ol>
    *
    * @see     BigDecimal
    * @see     RoundingModeEnum
    * @author  Mike Cowlishaw
    * @author  Joseph D. Darcy
    * @since 1.5
*/
    [Serializable]
    public sealed class MathContext
    {

        /* ----- Constants ----- */

        // defaults for constructors
        private static readonly int DEFAULT_DIGITS = 9;
        private static readonly RoundingModeEnum DEFAULT_RoundingModeEnum = RoundingModeEnum.HALF_UP;
        // Smallest values for digits (Maximum is Integer.MaxValue)
        private static readonly int MIN_DIGITS = 0;

        // Serialization version
        private static readonly long serialVersionUID = 5579720004786848255L;

        /* ----- Public Properties ----- */
        /**
         *  A {@code MathContext} object whose settings have the values
         *  required for unlimited precision arithmetic.
         *  The values of the settings are:
         *  <code>
         *  precision=0 RoundingModeEnum=HALF_UP
         *  </code>
         */
        public static readonly MathContext UNLIMITED =
                new MathContext(0, RoundingModeEnum.HALF_UP);

        /**
         *  A {@code MathContext} object with a precision setting
         *  matching the IEEE 754R Decimal32 format, 7 digits, and a
         *  rounding mode of {@link RoundingModeEnum#HALF_EVEN HALF_EVEN}, the
         *  IEEE 754R default.
         */
        public static readonly MathContext DECIMAL32 =
                new MathContext(7, RoundingModeEnum.HALF_EVEN);

        /**
         *  A {@code MathContext} object with a precision setting
         *  matching the IEEE 754R Decimal64 format, 16 digits, and a
         *  rounding mode of {@link RoundingModeEnum#HALF_EVEN HALF_EVEN}, the
         *  IEEE 754R default.
         */
        public static readonly MathContext DECIMAL64 =
                new MathContext(16, RoundingModeEnum.HALF_EVEN);

        /**
         *  A {@code MathContext} object with a precision setting
         *  matching the IEEE 754R Decimal128 format, 34 digits, and a
         *  rounding mode of {@link RoundingModeEnum#HALF_EVEN HALF_EVEN}, the
         *  IEEE 754R default.
         */
        public static readonly MathContext DECIMAL128 =
                new MathContext(34, RoundingModeEnum.HALF_EVEN);

        /* ----- Shared Properties ----- */
        /**
         * The number of digits to be used for an operation.  A value of 0
         * indicates that unlimited precision (as many digits as are
         * required) will be used.  Note that leading zeros (in the
         * coefficient of a number) are never significant.
         *
         * <p>{@code precision} will always be non-negative.
         *
         * @serial
         */
        public readonly int precision;

        /**
         * The rounding algorithm to be used for an operation.
         *
         * @see RoundingModeEnum
         * @serial
         */
        public readonly RoundingModeEnum roundingModeEnum;

        public object RoundingMode { get; internal set; }

        /* ----- Constructors ----- */

        /**
         * Constructs a new {@code MathContext} with the specified
         * precision and the {@link RoundingModeEnum#HALF_UP HALF_UP} rounding
         * mode.
         *
         * @param setPrecision The non-negative {@code int} precision setting.
         * @throws IllegalArgumentException if the {@code setPrecision} parameter is less
         *         than zero.
         */
        public MathContext(int setPrecision) : this(setPrecision, DEFAULT_RoundingModeEnum)
        {

            return;
        }

        /**
         * Constructs a new {@code MathContext} with a specified
         * precision and rounding mode.
         *
         * @param setPrecision The non-negative {@code int} precision setting.
         * @param setRoundingModeEnum The rounding mode to use.
         * @throws IllegalArgumentException if the {@code setPrecision} parameter is less
         *         than zero.
         * @throws NullPointerException if the rounding mode argument is {@code null}
         */
        public MathContext(int setPrecision,
                           RoundingModeEnum setRoundingModeEnum)
        {
            if (setPrecision < MIN_DIGITS)
                throw new ArgumentException("Digits < 0");

            precision = setPrecision;
            roundingModeEnum = setRoundingModeEnum;
            return;
        }

        /**
         * Constructs a new {@code MathContext} from a string.
         *
         * The string must be in the same format as that produced by the
         * {@link #toString} method.
         *
         * <p>An {@code IllegalArgumentException} is thrown if the precision
         * section of the string is out of range ({@code < 0}) or the string is
         * not in the format created by the {@link #toString} method.
         *
         * @param val The string to be parsed
         * @throws IllegalArgumentException if the precision section is out of range
         * or of incorrect format
         * @throws NullPointerException if the argument is {@code null}
         */
        public MathContext(String val)
        {
            bool bad = false;
            int setPrecision;
            if (val == null)
                throw new NullReferenceException("null String");
            try
            { // any error here is a string format problem
                if (!val.StartsWith("precision=")) throw new ArgumentException(nameof(val));
                int fence = val.IndexOf(' ');    // could be -1
                int off = 10;                     // where value starts
                setPrecision = int.Parse(val.Substring(10, fence));

                if (!val.Substring(fence + 1).StartsWith("RoundingMode="))
                    throw new ArgumentException(nameof(val));
                off = fence + 1 + 13;
                String str = val.Substring(off, val.Length);
                roundingModeEnum = (RoundingModeEnum)Enum.Parse(typeof(RoundingModeEnum), str);
            }
            catch (ArgumentException re)
            {
                throw;
            }

            if (setPrecision < MIN_DIGITS)
                throw new ArgumentException("Digits < 0");
            // the other parameters cannot be invalid if we got here
            precision = setPrecision;
        }

        /**
         * Returns the {@code precision} setting.
         * This value is always non-negative.
         *
         * @return an {@code int} which is the value of the {@code precision}
         *         setting
         */
        public int getPrecision()
        {
            return precision;
        }

        /**
         * Returns the RoundingModeEnum setting.
         * This will be one of
         * {@link  RoundingModeEnum#CEILING},
         * {@link  RoundingModeEnum#DOWN},
         * {@link  RoundingModeEnum#FLOOR},
         * {@link  RoundingModeEnum#HALF_DOWN},
         * {@link  RoundingModeEnum#HALF_EVEN},
         * {@link  RoundingModeEnum#HALF_UP},
         * {@link  RoundingModeEnum#UNNECESSARY}, or
         * {@link  RoundingModeEnum#UP}.
         *
         * @return a {@code RoundingModeEnum} object which is the value of the
         *         {@code RoundingModeEnum} setting
         */

        public RoundingModeEnum getRoundingModeEnum()
        {
            return roundingModeEnum;
        }

        /**
         * Compares this {@code MathContext} with the specified
         * {@code Object} for equality.
         *
         * @param  x {@code Object} to which this {@code MathContext} is to
         *         be compared.
         * @return {@code true} if and only if the specified {@code Object} is
         *         a {@code MathContext} object which has exactly the same
         *         settings as this object
         */
        public bool equals(Object x)
        {
            MathContext mc;
            if (!(x is MathContext))
                return false;
            mc = (MathContext)x;
            return mc.precision == this.precision
                && mc.roundingModeEnum == this.roundingModeEnum; // no need for .equals()
        }

        /**
         * Returns the hash code for this {@code MathContext}.
         *
         * @return hash code for this {@code MathContext}
         */
        public int hashCode()
        {
            return this.precision + roundingModeEnum.GetHashCode() * 59;
        }

        /**
         * Returns the string representation of this {@code MathContext}.
         * The {@code String} returned represents the settings of the
         * {@code MathContext} object as two space-delimited words
         * (separated by a single space character, <code>'&#92;u0020'</code>,
         * and with no leading or trailing white space), as follows:
         * <ol>
         * <li>
         * The string {@code "precision="}, immediately followed
         * by the value of the precision setting as a numeric string as if
         * generated by the {@link Integer#toString(int) Integer.toString}
         * method.
         *
         * <li>
         * The string {@code "RoundingModeEnum="}, immediately
         * followed by the value of the {@code RoundingModeEnum} setting as a
         * word.  This word will be the same as the name of the
         * corresponding public constant in the {@link RoundingModeEnum}
         * enum.
         * </ol>
         * <p>
         * For example:
         * <pre>
         * precision=9 RoundingModeEnum=HALF_UP
         * </pre>
         *
         * Additional words may be Appended to the result of
         * {@code toString} in the future if more properties are added to
         * this class.
         *
         * @return a {@code String} representing the context settings
         */
        public String toString()
        {
            return "precision=" + precision + " " +
                   "RoundingModeEnum=" + roundingModeEnum.ToString();
        }

        // Private methods

        /**
         * Reconstitute the {@code MathContext} instance from a stream (that is,
         * deserialize it).
         *
         * @param s the stream being read.
         */
        /*
       private void readObject(Stream s)
               {
           s.defaultReadObject();     // read in all fields
                                      // validate possibly bad fields
           if (precision < MIN_DIGITS)
           {
               String message = "MathContext: invalid digits in stream";
               throw new java.io.StreamCorruptedException(message);
           }
           if (RoundingModeEnum == null)
           {
               String message = "MathContext: null RoundingModeEnum in stream";
               throw new java.io.StreamCorruptedException(message);
           }
       }
           */

    }
}