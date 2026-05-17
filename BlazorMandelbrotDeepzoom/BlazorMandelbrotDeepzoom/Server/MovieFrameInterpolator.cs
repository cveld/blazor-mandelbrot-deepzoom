using System;
using BigDecimalContracts;
using BigDecimalsDParker;

namespace BlazorMandelbrotDeepzoom.Server
{
    public static class MovieFrameInterpolator
    {
        public static (IBigDecimal pos, IBigDecimal posi) InterpolatePosition(
            int frame,
            int totalFrames,
            IBigDecimal startPos,
            IBigDecimal startPosi,
            string startSizeStr,
            IBigDecimal endPos,
            IBigDecimal endPosi,
            string endSizeStr,
            IBigDecimalFactory factory)
        {
            if (totalFrames <= 1 || frame <= 0)
                return (startPos, startPosi);

            if (frame >= totalFrames - 1)
                return (endPos, endPosi);

            IBigDecimal startSize = factory.FromString(startSizeStr);
            IBigDecimal endSize = factory.FromString(endSizeStr.ToString());

            double s = double.Parse(startSizeStr, System.Globalization.CultureInfo.InvariantCulture);
            double e = double.Parse(endSizeStr, System.Globalization.CultureInfo.InvariantCulture);

            double t = (double)frame / (totalFrames - 1);
            double currentSizeD = s * Math.Pow(e / s, t);

            IBigDecimal currentSize = factory.FromString(currentSizeD.ToString("R", System.Globalization.CultureInfo.InvariantCulture));

            // weight = (startSize - currentSize) / (startSize - endSize)
            var numerator = startSize.Sub(currentSize);
            var denominator = startSize.Sub(endSize);
            var weight = numerator.Div(denominator);

            var deltaX = endPos.Sub(startPos).Mul(weight);
            var pos = startPos.Add(deltaX);

            var deltaY = endPosi.Sub(startPosi).Mul(weight);
            var posi = startPosi.Add(deltaY);

            return (pos, posi);
        }
    }
}
