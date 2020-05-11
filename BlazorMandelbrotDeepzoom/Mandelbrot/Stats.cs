using System;
using System.Collections.Generic;
using System.Text;

namespace Mandelbrot
{
	//
	// Stats keeps track of statistics for the image, for auto iteration increasing
	//
	class Stats : IStats
	{

		public void Init(int aLimit)
		{
			mLimit = aLimit;
			mStart = mLimit - 16 * 256;
			mCount = new AtomicInteger();
			mNum_in_set = new AtomicInteger();
			mCounts = new AtomicInteger[16];
			for (int i = 0; i < 16; i++)
				mCounts[i] = new AtomicInteger(0);
		}

		public void AddValue(int x)
		{
			mCount.getAndIncrement();
			if (x == 0)
			{
				mNum_in_set.getAndIncrement();
				return;
			}
			if (x >= mStart && x < mLimit)
			{
				int r = (x - mStart) >> 8;
				mCounts[r].incrementAndGet();
			}
		}
		public int GetNewLimit()
		{
			//int num_out_of_set = mCount.get() - mNum_in_set.get();
			//float fraction1 = (mCounts[15].floatValue()) / num_out_of_set;
			//float fraction2 = (mCounts[14].floatValue()) / num_out_of_set;

			if (mCounts[15].get() > mNum_in_set.get() || 2000 * mCounts[15].get() > mCount.get() || (mCounts[15].get() > 50 && mCounts[15].get() > mCounts[14].get() * 0.5f))
			{
				float ratio = mCounts[15].floatValue() / mCounts[14].floatValue();
				float old_ratio = mCounts[14].floatValue() / mCounts[13].floatValue();

				if (old_ratio < ratio)
				{
					//we have a long tale
					//old_ratio^y = ratio;
					float y = (float)(Math.Log(ratio) / Math.Log(old_ratio));

					ratio = (float)Math.Pow(ratio, y);
					ratio = (float)Math.Pow(ratio, y);
					ratio = (float)Math.Pow(ratio, y);
				}
				// ratio^x = (mCount.floatValue()/1000.0f)/mCounts[15].floatValue();
				float x = (float)(Math.Log((mCount.doubleValue() / 4000.0) / mCounts[15].doubleValue()) / Math.Log(ratio));

				if (x < 1)
					x = 1;

				int extra = (int)(x * 256);
				if (extra > 5000 && extra > mLimit / 2)
					extra = Math.Min(5000, mLimit / 2);
				return mLimit + extra;
			}
			return mLimit;
		}

		public int GetProgress()
		{
			return mCount.get();
		}
		int mLimit;
		int mStart;
		AtomicInteger mNum_in_set;
		AtomicInteger mCount;
		AtomicInteger[] mCounts;
	}
}