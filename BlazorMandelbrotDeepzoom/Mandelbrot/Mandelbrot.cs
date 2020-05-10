using BigDecimalContracts;
using System;

namespace Mandelbrot
{
    public class Mandelbrot
    {
        uint[] generated;
        public int Width { get; }
        public int Height { get; }
        public Mandelbrot(int xw, int yw, IBigDecimalFactory bigDecimalFactory, IMathContextFactory mathContextFactory)
        {
            Width = xw;
            Height = yw;
			this.bigDecimalFactory = bigDecimalFactory;
			this.mathContextFactory = mathContextFactory;
			generated = new uint[xw * yw * 4];
        }        

		IBigDecimal mSize;
		IBigDecimal mPos, mPosi;
		//int mMax_iterations;
		CalculationManager mCalculation;
		IndexBuffer2D buffer;
		private readonly IBigDecimalFactory bigDecimalFactory;
		private readonly IMathContextFactory mathContextFactory;

		public int GetNewIterationLimit(int iterationlimit)
        {
			if (mCalculation == null)
            {
				return iterationlimit;
            }
			return Math.Max(iterationlimit, mCalculation.GetNewLimit());
		}

		public IndexBuffer2D DoCalculation(SuperSampleType superSampleType)
		{
			var mSize = bigDecimalFactory.FromDouble(3.0);
			var mPos = bigDecimalFactory.FromDouble(-0.75, mathContextFactory.BigDecimal128());
			var mPosi = bigDecimalFactory.FromDouble(0, mathContextFactory.BigDecimal128());
			var mMax_iterations = 1024;
			return DoCalculation(superSampleType, mSize, mPos, mPosi, mMax_iterations);
		}

		public IndexBuffer2D DoCalculation(SuperSampleType aSuper_sample, string mSize, string mPos, string mPosi, int mMax_iterations)
		{
			return DoCalculation(aSuper_sample, bigDecimalFactory.FromString(mSize), bigDecimalFactory.FromString(mPos), bigDecimalFactory.FromString(mPosi), mMax_iterations);
		}

		public IndexBuffer2D DoCalculation(SuperSampleType aSuper_sample, IBigDecimal mSize, IBigDecimal mPos, IBigDecimal mPosi, int mMax_iterations)
		{
			int mResolution_x = Width;
			int mResolution_y = Height;

			IBigDecimal[] coords = new IBigDecimal[2];

			//mGui.StartProcessing();
			//mStart_time = System.currentTimeMillis();
			//mGui.SetCalculationTime(-1);
			//coords = mGui.GetCoords();			
			int scale = mSize.JavaScale();
			int precision = mSize.JavaPrecision();
			int expo = 0;
			precision = scale - precision + 8;

			if (precision < 7)
			{
				precision = 7;
			}

			//IndexBuffer2D buffer = null;

			buffer = new IndexBuffer2D(Width, Height);
			//switch (aSuper_sample)
			//{
			//	case SUPER_SAMPLE_NONE:
			//		buffer = new IndexBuffer2D(aResolution_x, aResolution_y);
			//		break;
			//	case SUPER_SAMPLE_2X:
			//		buffer = new IndexBuffer2D(aResolution_x + 1, aResolution_y * 2 + 1);
			//		break;
			//	case SUPER_SAMPLE_4X:
			//		buffer = new IndexBuffer2D(aResolution_x * 2, aResolution_y * 2);
			//		break;
			//	case SUPER_SAMPLE_4X_9:
			//		buffer = new IndexBuffer2D(aResolution_x * 2 + 1, aResolution_y * 2 + 1);
			//		break;
			//	case SUPER_SAMPLE_9X:
			//		buffer = new IndexBuffer2D(aResolution_x * 3, aResolution_y * 3);
			//		break;
			// }

			CalculationManager calc = new CalculationManager(bigDecimalFactory);
			mCalculation = calc;

			double size;
			IBigDecimal bd280 = bigDecimalFactory.FromDouble(1e-280);
			if (mSize.CompareTo(bd280) < 0)
			{
				IBigDecimal mod_size = mSize;
				while (mod_size.CompareTo(bd280) < 0)
				{
					mod_size = mod_size.MovePointRight(1);
					expo += 1;
				}
				size = mod_size.DoubleValue();

			}
			else
			{
				size = mSize.DoubleValue();
			}

			calc.SetCoordinates(mPos, mPosi, (size / 2 * mResolution_x) / mResolution_y, expo, mathContextFactory.Build(precision));
			calc.SetBuffer(buffer, aSuper_sample);
			calc.SetIterationLimit(mMax_iterations);
			calc.SetAccuracy(1);
			calc.ThreadedCalculation(1);

			//if (mTimer == null)
			//{
			//	mTimer = new Timer(100, this);
			//	mTimer.setInitialDelay(100);
			//}
			//mTimer.start();
			calc.run();

			return buffer;
		}
	}
}
