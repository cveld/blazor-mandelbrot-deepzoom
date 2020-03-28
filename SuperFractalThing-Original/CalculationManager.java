// CalculationManager
//
// Manages the calcualation of a Mandelbrot set image
//
//
//    Copyright 2013 Kevin Martin
//
//    This file is part of SuperFractalThing.
//
//    SuperFractalThing is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, either version 3 of the License, or
//    any later version.
//
//    SuperFractalThing is distributed in the hope that it will be useful,
//    but WITHOUT ANY WARRANTY; without even the implied warranty of
//    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//    GNU General Public License for more details.
//
//    You should have received a copy of the GNU General Public License
//    along with SuperFractalThing.  If not, see <http://www.gnu.org/licenses/>.
//   	
import java.math.BigDecimal;
import java.math.MathContext;
import java.util.concurrent.atomic.AtomicInteger;


interface IStats
{
	void Init( int x );
	void AddValue( int x );
	int GetNewLimit();
	int GetProgress();
}

//
// Stats keeps track of statistics for the image, for auto iteration increasing
//
class Stats implements IStats
{

	public void Init( int aLimit )
	{
		mLimit=aLimit;
		mStart = mLimit-16*256;
		mCount = new AtomicInteger();
		mNum_in_set = new AtomicInteger();
		mCounts = new AtomicInteger[16];
		for (int i=0; i<16;i++)
			mCounts[i]=new AtomicInteger(0);
	}

	public void AddValue( int x )
	{
		mCount.getAndIncrement();
		if (x==0)
		{
			mNum_in_set.getAndIncrement();
			return;
		}
		if (x>=mStart && x<mLimit)
		{
			int r = (x-mStart)>>8;
			mCounts[r].incrementAndGet();
		}
	}
	public int GetNewLimit()
	{
		//int num_out_of_set = mCount.get() - mNum_in_set.get();
		//float fraction1 = (mCounts[15].floatValue()) / num_out_of_set;
		//float fraction2 = (mCounts[14].floatValue()) / num_out_of_set;

		if (mCounts[15].get() > mNum_in_set.get() || 2000 * mCounts[15].get() > mCount.get() || (mCounts[15].get()>50 && mCounts[15].get() > mCounts[14].get()*0.5f))
		{
			float ratio = mCounts[15].floatValue() / mCounts[14].floatValue();
			float old_ratio = mCounts[14].floatValue() / mCounts[13].floatValue();
			
			if (old_ratio < ratio)
			{
				//we have a long tale
				//old_ratio^y = ratio;
				float y = (float)(Math.log(ratio)/Math.log(old_ratio));
				
				ratio = (float)Math.pow(ratio,y);
				ratio = (float)Math.pow(ratio,y);
				ratio = (float)Math.pow(ratio,y);
			}
			// ratio^x = (mCount.floatValue()/1000.0f)/mCounts[15].floatValue();
			 float x = (float)(Math.log((mCount.doubleValue()/4000.0)/mCounts[15].doubleValue())/Math.log(ratio));
			 
			 if (x<1)
				 x=1;
			 
			 int extra = (int)(x*256);
			 if (extra>5000 && extra > mLimit/2)
				 extra = Math.min(5000, mLimit/2);
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
	AtomicInteger mCounts[];
}

//
//Manages the calcualation of a Mandelbrot set image
//
public class CalculationManager implements Runnable
{
	IndexBuffer2D mBuffer;
	SuperSampleType mSuper_sample;
	int mAdjusted_height;
	Details mCentre_details;
	boolean mStop;
	IStats mStats;
	int mIteration_limit;
	boolean mClone;
	double mAccuracy;
	boolean mDo_repeaters;
	BigDecimal mCentre_x;
	BigDecimal mCentre_y;
	int mSize_extra_exponent;
	double mActual_width;
	MathContext mContext;
	AtomicInteger mSector;
	AtomicInteger mThread_count;
	int mSector_width;
	int mSector_height;
	int mSector_count;
	boolean mCancel;
	
	SuperSampleType GetSuperSampleType()
	{
		return mSuper_sample;
	}
	
	void UpdateStats(int aValue)
	{
		mStats.AddValue(aValue);
	}
	public int GetNewLimit()
	{
		return mStats.GetNewLimit();
	}
	public int GetProgress()
	{
		return mStats.GetProgress();
	}
	
	void SetAccuracy(int pIndex)
	{
		switch (pIndex)
		{
			case 0:
				mAccuracy=100;
				mDo_repeaters=true;
				break;
			case 1:
				mAccuracy=1;
				mDo_repeaters=false;//true;
				break;
			case 2:
				mAccuracy=0.1;
				mDo_repeaters=true;
				break;
			case 3:
				mAccuracy=0.01;
				mDo_repeaters=true;
				break;
		}
	}

	void SetCoordinates( BigDecimal aX, BigDecimal aY, double aSize, int aSize_extra_exponent, MathContext aContext )
	{
		mCentre_x = aX;
		mCentre_y = aY;
		mActual_width = aSize;
		mSize_extra_exponent=aSize_extra_exponent;
		mContext = aContext;
	}
	void SetBuffer( IndexBuffer2D aBuffer, SuperSampleType aSuper_sample )
	{
		mBuffer = aBuffer;
		mSuper_sample = aSuper_sample;
	}
	void SetIterationLimit(int aIteration_limit)
	{
		mIteration_limit=aIteration_limit;
	}

	void InitialiseCalculation()
	{
		mStats = new Stats();
		mStats.Init( mIteration_limit );
		
		mBuffer.Clear(2969);
				
		mCentre_details = new Details();
		
			
		mCentre_details.SetAccuracy( mAccuracy );
		mCentre_details.SetDoRepeaters( mDo_repeaters );
		mCentre_details.SetScreenOffsetFromCentre(0,0);
		mCentre_details.SetMathContext(mContext);
		mCentre_details.SetAspectRatio( mBuffer.GetAspectRatio() );

		mCentre_details.FillInCubic(mCentre_x, mCentre_y, mIteration_limit, mActual_width, mSize_extra_exponent, 0,0);

		if (mCentre_details.GetIsARepeater())
		{
		}
		else
		{
			FindBestreferencePoint fbrp = new FindBestreferencePoint(mCentre_details);
			mCentre_details = fbrp.Calculate();

			
			if (mCentre_details.GetIsFailedRepeater() && mCentre_details.GetFailedRepeaterDetails()!=null)
			{
				int centre_value = mCentre_details.CalculateIterations(mCentre_details, 
						mCentre_details.GetFailedRepeaterDetails().GetScreenOffsetX()-mCentre_details.GetScreenOffsetX(),
						mCentre_details.GetFailedRepeaterDetails().GetScreenOffsetY()-mCentre_details.GetScreenOffsetY());
				
				///If centre value is 0, then it has probably been calculated ok, and we can ignore repeater point.
				if (centre_value!=0)
				{
					float offset=0;
					int value;
					int count=0;
					Details rep = mCentre_details.GetFailedRepeaterDetails();
					//Move out from repeater point along +x until fbrp reference point seems to be working
					do
					{
						offset += 1/300.0f;
						value = rep.CalculateIterations(rep, 
								0+offset,
								0);		
						if (value!=0 && value < centre_value-10)
							count++;
					}
					while ( count <2 && !mStop && offset<1);
					
					//Spiral out from repeater point until fbrp reference point seems to be working
					for (float angle = 3.14f/5.0f; angle < 1.99f*3.14f; angle+=3.14f/5.0f)
					{
						do
						{
							float x = (float)Math.sin(angle)*offset;
							float y = (float)Math.cos(angle)*offset;
							value = rep.CalculateIterations(rep, 
									x,
									y);	
							
							if (value!=0 && value > centre_value-10)
							{
								offset += 1/300.0f;
								continue;
							}
							
							break;

						}
						while ( !mStop && offset<1);
					
					}

					rep.SetSecondaryRadius(offset);
				}
				else 
					mCentre_details.SetFailedRepeaterDetails(null);
			}
			else
				mCentre_details.SetFailedRepeaterDetails(null);
			
		}
	}

	//
	// Calculate a rectangular region.
	// This region is divided up into smaller regions, and SubCalculate calls itself recursively on each sub-region
	// When the regions a small (<=3x3 pixels), the pixel iteration values are calculated
	//
	void SubCalculate(float aScreen_width, Approximation pApprox, IndexBuffer2D pBuffer, Details aSecondary_details)
	{
	//float size;
	Approximation approx;
	IndexBuffer2D sub_buffer;
	int x[]= new int[3], y[]=new int[3];
	int xcount, ycount;
	int iy, ix;
	float centrex,centrey;
	int value;

		if (mCancel)
			return;
		
		//pApprox is the parent approximation
		//contains constants A,B,C which calc dx (ofsset from xn at p to xn at approximation centre)
		//A,B,C use screen offset from p to approximation centre
	
		float xdenom = 1.0f/pBuffer.GetWidth();
		//float ydenom = 1.0f/pBuffer->GetHeight();
		
		
		float corner_x = -aScreen_width/2;
		// actual_height = aActual_width *h/w;
		float corner_y = -aScreen_width/2 * pBuffer.GetHeight() *xdenom;
		
		corner_x += pApprox.GetCentreScreenSpaceX();
		corner_y += pApprox.GetCentreScreenSpaceY();
		if (pApprox==mCentre_details)
		{
			corner_x -= mCentre_details.GetScreenOffsetX();
			corner_y -= mCentre_details.GetScreenOffsetY();
		}

		float secondary_offset_x=0, secondary_offset_y=0, secondary_radius=0;
		if (aSecondary_details!=null)
		{
			secondary_offset_x = aSecondary_details.GetScreenOffsetX() - mCentre_details.GetScreenOffsetX() ;
			secondary_offset_y =  aSecondary_details.GetScreenOffsetY() - mCentre_details.GetScreenOffsetY();
			secondary_radius = aSecondary_details.GetSecondaryRadius();
			if (corner_x > secondary_offset_x + secondary_radius ||
				corner_x + aScreen_width < secondary_offset_x - secondary_radius ||
				corner_y > secondary_offset_y + secondary_radius ||
				//corner_y + aScreen_width *pBuffer.GetHeight() / pBuffer.GetWidth() < secondary_offset_y - secondary_radius)//This works, but rearrange to remove divide
				 aScreen_width *pBuffer.GetHeight() < (secondary_offset_y - secondary_radius - corner_y) * pBuffer.GetWidth())
			{
				aSecondary_details = null;
			}
		}
			
		if (pBuffer.GetWidth()<=3 && pBuffer.GetHeight()<=3)
		{
			float xdelta = aScreen_width / pBuffer.GetWidth();
			//float ydelta = aScreen_width * pBuffer->GetHeight()/pBuffer->GetWidth() / pBuffer->GetHeight();
			float ydelta = aScreen_width /pBuffer.GetWidth();
			corner_x += xdelta/2;
			corner_y += ydelta/2;
			
			for (iy=0; iy<pBuffer.GetHeight(); iy++)
				for (ix=0; ix<pBuffer.GetWidth(); ix++)
				{
					if (aSecondary_details!=null)
					{
						float fx = corner_x+xdelta*ix - secondary_offset_x;
						float fy = corner_y + ydelta * iy - secondary_offset_y;
						if (fx*fx+(fy*fy) < secondary_radius*secondary_radius)
						{
							value = aSecondary_details.CalculateIterations(aSecondary_details, fx,fy);
							UpdateStats(value);
							pBuffer.Set(ix,iy,value);
							continue;
						}
					}
					value = pApprox.CalculateIterations( mCentre_details, corner_x+xdelta*ix, corner_y + ydelta * iy );
					UpdateStats(value);
					pBuffer.Set(ix,iy,value);
					//pBuffer->Set(ix,iy, pBuffer->GetHeight()*5+ pBuffer->GetWidth()+1);
				}
				
			if (mSuper_sample == SuperSampleType.SUPER_SAMPLE_2X)
			{
				//Do the second set of particles, offset by half a pixel
				corner_x -= xdelta/2;
				corner_y -= ydelta/2;
				
				int offset_y = pBuffer.GetOffsetY();
				for (iy=0; iy<pBuffer.GetHeight() && iy + offset_y <mAdjusted_height-1; iy++)
					for (ix=0; ix<pBuffer.GetWidth(); ix++)
					{
						if (aSecondary_details!=null)
						{
							float fx = corner_x+xdelta*ix - secondary_offset_x;
							float fy = corner_y + ydelta * iy - secondary_offset_y;
							if (fx*fx+(fy*fy) < secondary_radius*secondary_radius)
							{
								value = aSecondary_details.CalculateIterations(aSecondary_details, fx, fy);
								UpdateStats(value);
								pBuffer.Set(ix,iy+mAdjusted_height,value);
								continue;
							}
						}
						value = pApprox.CalculateIterations( mCentre_details, corner_x+xdelta*ix, corner_y + ydelta * iy );
						UpdateStats(value);
						pBuffer.Set(ix,iy+mAdjusted_height,value);
						//pBuffer->Set(ix,iy, pBuffer->GetHeight()*5+ pBuffer->GetWidth()+1);
					}
			}
			return;
		}
		
		x[0]=0;
		y[0]=0;
		
		if (pBuffer.GetWidth()>1)
		{
			xcount = 2;
			x[1] = pBuffer.GetWidth()/2;
			x[2] = pBuffer.GetWidth();
		}
		else
		{
			xcount = 1;
			x[1] = pBuffer.GetWidth();
			
		}
		
		if (pBuffer.GetHeight()>1)
		{
			ycount = 2;
			y[1] = pBuffer.GetHeight()/2;
			y[2] = pBuffer.GetHeight();
		}
		else
		{
			ycount = 1;
			y[1] = pBuffer.GetHeight();
			
		}
		approx = new Approximation();
		
		for (iy=0; iy<ycount; iy++)
		{
			for (ix=0; ix<xcount; ix++)
			{
				sub_buffer = pBuffer.SubBuffer( x[ix],y[iy],x[ix+1],y[iy+1] );
				
				centrex = corner_x + aScreen_width * (x[ix]+x[ix+1])*0.5f*xdenom;
				centrey = corner_y + aScreen_width * (y[iy]+y[iy+1])*0.5f*xdenom;	//should be xdenom, ydenom cancels

				float new_screen_width;
				new_screen_width = (aScreen_width*(x[ix+1]-x[ix]))/pBuffer.GetWidth();
				approx.InitialiseCubic( pApprox, centrex,centrey,new_screen_width, mCentre_details );
				
				SubCalculate( new_screen_width, approx, sub_buffer, aSecondary_details);
			}
		}
	}

	boolean GetIsProcessing()
	{
		return mThread_count.get()!=0;
	}
	
	public void ThreadedCalculation(int aNum_threads)
	{
	
		mSector_width = 8;
		mSector_height = 6;
		mSector_count = mSector_width * mSector_height;
		mThread_count = new AtomicInteger(aNum_threads);
		mSector = new AtomicInteger(-1);
		
		new Thread(this).start();
	}
	
	//
	// The image is divided up into sectors.
	// Thread can claim responsibility for processing a sector
	// This routine calculates all the pixels in a sector.
	//
	public void CalculateSector(int pSector, int pWidth, int pHeight )
	{
	Approximation approx;
	IndexBuffer2D sub_buffer;
	int x0,x1,y0,y1;
	float screen_width = 2.0f;
	int adjusted_height = mBuffer.GetHeight();
		
		if (mSuper_sample==SuperSampleType.SUPER_SAMPLE_2X)
		{
			adjusted_height-=1;
			adjusted_height/=2;
			adjusted_height+=1;
		}
		mAdjusted_height = adjusted_height;
		
		x0 = (int)(mBuffer.GetWidth() * ((pSector % pWidth)/(float)pWidth));
		x1 = (int)(mBuffer.GetWidth() * (((pSector % pWidth)+1)/(float)pWidth));

		y0 = (int)(adjusted_height * ((pSector / pWidth)/(float)pHeight));
		y1 = (int)(adjusted_height * (((pSector / pWidth)+1)/(float)pHeight));

		
		sub_buffer = mBuffer.SubBuffer(x0,y0,x1,y1 );

		float xdenom = 1.0f/mBuffer.GetWidth();
		float corner_x = -screen_width/2;
		// actual_height = aActual_width *h/w;
		float corner_y = -screen_width/2 * adjusted_height *xdenom;
		
		//Corner_x,corner_y is bottom left of complete screen
		float centrex,centrey;
		
		corner_x += mCentre_details.GetCentreScreenSpaceX();
		corner_y += mCentre_details.GetCentreScreenSpaceY();

		corner_x -= mCentre_details.GetScreenOffsetX();
		corner_y -= mCentre_details.GetScreenOffsetY();
		

		if (mCentre_details.GetIsARepeater())
		{
/*			int ix,iy;
			int value;
			float xdelta = xdenom * 2;
			float ydelta = xdelta;

			corner_x += xdelta/2;
			corner_y += ydelta/2;

			corner_x += x0*xdelta;
			corner_y += y0*ydelta;
			
			
			for (iy=0; iy<sub_buffer.GetHeight(); iy++)
				for (ix=0; ix<sub_buffer.GetWidth(); ix++)
				{
					value = mCentre_details.CalculateIterationsRepeater( mCentre_details, corner_x+xdelta*ix, corner_y + ydelta * iy );
					UpdateStats(value);
					sub_buffer.Set(ix,iy,value);
					//pBuffer->Set(ix,iy, pBuffer->GetHeight()*5+ pBuffer->GetWidth()+1);
				}	
			
			if (mSuper_sample==SUPER_SAMPLE_2X)
			{
				corner_x -= xdelta/2;
				corner_y -= ydelta/2;
				int ylimit = sub_buffer.GetHeight();
				if (y1 == adjusted_height)
					ylimit-=1;
				for (iy=0; iy<ylimit; iy++)
					for (ix=0; ix<sub_buffer.GetWidth(); ix++)
					{
						value = mCentre_details.CalculateIterationsRepeater( mCentre_details, corner_x+xdelta*ix, corner_y + ydelta * iy );
						UpdateStats(value);
						sub_buffer.Set(ix,iy+mAdjusted_height,value);
						//pBuffer->Set(ix,iy, pBuffer->GetHeight()*5+ pBuffer->GetWidth()+1);
					}	
			}
*/		}
		else
		{
			//Calculate centre of sector
			centrex = corner_x + screen_width * (x0+x1)*0.5f*xdenom;
			centrey = corner_y + screen_width * (y0+y1)*0.5f*xdenom;	//should be xdenom, ydenom cancels

			float new_screen_width;
			new_screen_width = (screen_width*(x1-x0))/mBuffer.GetWidth();
			approx = new Approximation();
			approx.InitialiseCubic( mCentre_details, centrex,centrey,new_screen_width, mCentre_details );
			
			//////////////////////
			SubCalculate( new_screen_width, approx, sub_buffer, mCentre_details.GetFailedRepeaterDetails());
			/////////////////////
			
			Details frd = mCentre_details.GetFailedRepeaterDetails();
			if (frd!=null && !mStop)
			{
				int ix,iy;

				corner_x = -screen_width/2;
				// actual_height = aActual_width *h/w;
				corner_y = -screen_width/2 * adjusted_height *xdenom;
				
				//Corner_x,corner_y is bottom left of complete screen
				
				corner_x += frd.GetCentreScreenSpaceX();
				corner_y += frd.GetCentreScreenSpaceY();
				
				corner_x -= frd.GetScreenOffsetX();
				corner_y -= frd.GetScreenOffsetY();
				
				float xdelta = xdenom * 2;
				float ydelta = xdelta;

				corner_x += xdelta/2;
				corner_y += ydelta/2;

				ix = (int)(-corner_x/xdelta);
				iy =  (int)(-corner_y/ydelta);

				if (ix<x0)
					ix=x0;
				if (ix >=  x1)
					ix = x1-1;
				
				if (iy<y0)
					iy=y0;
				if (iy >= y1)
					iy = y1-1;

				
				if (mSuper_sample==SuperSampleType.SUPER_SAMPLE_2X)
				{
					corner_x -= xdelta/2;
					corner_y -= ydelta/2;
					sub_buffer =  mBuffer.SubBuffer( x0,y0+mAdjusted_height,x1,y1+mAdjusted_height-1 );
					//To do:
					//RecalulateBlob(frd,ix,iy,corner_x,corner_y,xdelta,ydelta,x0,x1,y0,y1,&sub_buffer);
				}
					
			}
		}
	}

	@Override
	public void run()
	{
		int s;
		do
		{
			s = mSector.getAndIncrement();
			if (s<0)
			{
				//One time initialisation
				InitialiseCalculation();
				int i;
				for (i=0; i<mThread_count.get(); i++)
				{
					new Thread(this).start();
				}
				return;//exit
			}
			
			if (s>=mSector_count)
				break;
			CalculateSector(s, mSector_width, mSector_height);
			
		} while (true && !mCancel);
		
		mThread_count.decrementAndGet();
	}

	void Cancel()
	{
		mCancel=true;
	}

}
