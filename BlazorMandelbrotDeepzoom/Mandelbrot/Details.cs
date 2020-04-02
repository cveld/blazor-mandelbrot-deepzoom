// Details.java
//
// Contains all the details of a reference point that can be used to generate a Mandelbrot set image 
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



using BigDecimalContracts;
using Mandelbrot;
using System;

public class Details : Approximation {

	
	double mX0;
	double mX0i;
	double[] mX;
	double[] mXi;
	double[] mDistance_to_edge_sqr; // how close centre value is to r=2 circle
	
	int mIteration_limit;
	int mNum_iterations;
	double mActual_width;
	double mActual_width_with_exponent_scale;
	double mAspect_ratio;
	int mSize_extra_exponent;
	
	float mScreen_offset_x;
	float mScreen_offset_y;
	
	IMathContext mMath_context;
	IBigDecimal mFull_x_after_approx;
	IBigDecimal mFull_y_after_approx;
	
	IBigDecimal mFull_x_screen_centre;
	IBigDecimal mFull_y_screen_centre;
	
	Approximation mOriginal_approx;
	
	bool mIs_a_repeater;
	bool mFailed_repeater;
	Details mFailed_repeater_details;
	int mRepeater_centre_colour;
	int mRepeater_centre_colour2;
	
	double mAccuracy;
	bool mDo_repeaters;
	
	float mRepeater_fail_x;
	float mRepeater_fail_y;
	bool mRepeater_fail_point;
	float mSecondary_radius;
	
	static int sDetails_counter;
	private readonly IBigDecimalFactory bigDecimalFactory;

	public float GetScreenOffsetX()
	{
		return mScreen_offset_x;
	}
	public float GetScreenOffsetY()
	{
		return mScreen_offset_y;
	}
	public double GetReal(int i)
	{
		return mX[i];
	}
	public double GetImaginary(int i)
	{
		return mXi[i];
	}	
	
	public double GetActualWidth()
	{
		return mActual_width;
	}
	public double GetActualWidthWithExponentScale()
	{
		return mActual_width_with_exponent_scale;
	}
	public double GetX0()
	{
		return mX0;
	}
	public double GetX0i()
	{
		return mX0i;
	}
	public double GetDistanceToEdgeSqr(int e)
	{
		//ASSERT(e < mNum_iterations-mIterations_n && e>=0);
		return mDistance_to_edge_sqr[e];
	}
	public int GetTotalIterations()
	{
		return mNum_iterations;
	}
	public int GetIterationLimit()
	{
		return mIteration_limit;
	}
	public int GetSizeExtraExponent()
	{
		return mSize_extra_exponent;
	}
	public void SetAccuracy( double aAccuracy )
	{
		mAccuracy = aAccuracy;
	}
	public void SetAspectRatio( float aAspect )
	{
		mAspect_ratio = aAspect;
	}
	public double GetAccuracy()
	{
		return mAccuracy;
	}
	public void SetDoRepeaters(bool aValue)
	{
		mDo_repeaters=aValue;
	}
	public bool GetIsARepeater()
	{
		return false;
	}
	public bool GetIsFailedRepeater()
	{
		return mFailed_repeater;
	}
	public Details GetFailedRepeaterDetails()
	{
		return mFailed_repeater_details;
	}
	public void SetFailedRepeaterDetails(Details aDetails)
	{
		mFailed_repeater_details = aDetails;
	}
	void SetRepeaterFailPoint(float x, float y)
	{
		mRepeater_fail_x=x;
		mRepeater_fail_y=y;
		mRepeater_fail_point = true;
	}
	public bool GetRepeaterFailPoint(float[] point)
	{
		if (mRepeater_fail_point)
		{
			point[0]=mRepeater_fail_x;
			point[1]=mRepeater_fail_y;
			return true;
		}
		return false;
	}

	public float GetSecondaryRadius()
	{
		return mSecondary_radius;
	}
	public void SetSecondaryRadius(float r)
	{
		mSecondary_radius = r;
	}	
	public void SetMathContext(IMathContext mc)
	{
		mMath_context = mc;
	}
	
	public Details(IBigDecimalFactory bigDecimalFactory) : base(bigDecimalFactory)
	{
		this.bigDecimalFactory = bigDecimalFactory;
	}
	
	//
	// Clone a Details class
	//
	public Details(Details aDetails) : base(aDetails)
	{
		this.bigDecimalFactory = aDetails.bigDecimalFactory;
		mX0 =aDetails.mX0;
		mX0i=aDetails.mX0i;
		
		mFull_x_after_approx=aDetails.mFull_x_after_approx;
		mFull_y_after_approx=aDetails.mFull_y_after_approx;
		mFull_x_screen_centre=aDetails.mFull_x_screen_centre;
		mFull_y_screen_centre=aDetails.mFull_y_screen_centre;
		
		mIteration_limit = aDetails.mIteration_limit;
		mNum_iterations = aDetails.mNum_iterations;
		mActual_width = aDetails.mActual_width;
		mActual_width_with_exponent_scale= aDetails.mActual_width_with_exponent_scale;
		mAspect_ratio = aDetails.mAspect_ratio;
		mSize_extra_exponent = aDetails.mSize_extra_exponent;
		
		mScreen_offset_x = aDetails.mScreen_offset_x;
		mScreen_offset_y = aDetails.mScreen_offset_y;
		
		mIs_a_repeater = aDetails.mIs_a_repeater;
		mFailed_repeater = aDetails.mFailed_repeater;
		
		mAccuracy = aDetails.mAccuracy;;
		mDo_repeaters = aDetails.mDo_repeaters;
		
		mX = new double[mIteration_limit-mIterations_n];
		mXi = new double[mIteration_limit-mIterations_n];;
		mDistance_to_edge_sqr = new double[mIteration_limit-mIterations_n];;
		
		for (int i=0; i<mIteration_limit-mIterations_n; i++)
		{
			mX[i] = aDetails.mX[i];
			mXi[i] = aDetails.mXi[i];
			mDistance_to_edge_sqr[i] = aDetails.mDistance_to_edge_sqr[i];
		}
		
		mOriginal_approx=null;
		if (aDetails.mOriginal_approx!=null)
			mOriginal_approx = new Approximation(aDetails.mOriginal_approx);
		
		mFailed_repeater_details = null;
		mRepeater_fail_point = false;
		
		mMath_context = aDetails.mMath_context;
		mSecondary_radius = aDetails.mSecondary_radius;		
	}
	
	//
	// Find point for which DELTA_n is zero
	// This is a repeating point, or repeater, as DELTA_i = DELTA_(n+i) for all i
	//
	void FindScreenCoords(float[] screen, double dx, double dxi)
	{
	double sx,sy,f,fi,fsq,tsx,tsy,tfsq,rsx=0,rsy=0;
	bool hit;
		
		// get initial approx
		sx = (A*dx +Ai*dxi)/(A*A+Ai*Ai);
		sy = (A*dxi-Ai*dx)/(A*A+Ai*Ai);
		
		double sxsq,sysq,sxcu,sycu,den,deni,num,numi;
		int i;
		double factor = 1.0f;
		for (i=0; i<1000; i++)
		{
			sxsq = sx*sx-sy*sy;
			sysq = 2*sx*sy;
			
			sxcu = sx*sxsq - sy*sysq;
			sycu = sx*sysq + sy*sxsq;
			
			// calculate the error for the current guess
			f = A*sx-Ai*sy + B*sxsq - Bi*sysq + C*sxcu - Ci*sycu - dx;
			fi = Ai*sx+A*sy + Bi*sxsq + B*sysq + Ci*sxcu + C*sycu -dxi;
			
			fsq = f*f+fi*fi;
			
			num = f;
			numi = fi;
			
			// calulate differential of the error
			den =  A + 2*B*sx - 2*Bi*sy + 3*C*sxsq - 3*Ci*sysq;
			deni = Ai + 2*Bi*sx + 2*B*sy + 3*Ci*sxsq + 3*C*sysq;
			
			// want num * den^ / (den den^)
			num = num * den + numi * deni;
			numi = -num * deni + numi * den;
			
			den = den*den + deni*deni;
			
			factor = 8.0;
			hit = false;
			do
			{
				tsx = sx-num/den * factor;
				tsy = sy-numi/den * factor;
				
				sxsq = tsx*tsx-tsy*tsy;
				sysq = 2*tsx*tsy;
				
				sxcu = tsx*sxsq - tsy*sysq;
				sycu = tsx*sysq + tsy*sxsq;
				
				f = A*tsx-Ai*tsy + B*sxsq - Bi*sysq + C*sxcu - Ci*sycu - dx;
				fi = Ai*tsx+A*tsy + Bi*sxsq + B*sysq + Ci*sxcu + C*sycu -dxi;
				
				tfsq = f*f+fi*fi;
				
				if (tfsq < fsq || factor <= 0.000001f)
				{
					rsx = tsx;
					rsy = tsy;
					fsq = tfsq;
					hit=true;
				}
				if (hit/* && factor <=1.0*/) // seems to work better if it just exits on first one
					break;
					
				factor *= 0.5;
			
			} while (true);
			
			sx=rsx;
			sy=rsy;
		}
		//f and fi should now be the error.
		screen[0] = (float)sx;	
		screen[1] = (float)sy;
		
	}

	// Find the distance from x,y to the circle r=2, assuming x,y is very close to the circle
	// dte = (4-x*x-y*y)
	// Want 2 - sqrt( x*x+y*y )
	//	= 2 - sqrt(4-dte)
	//  = 2-2*sqrt( 1-dte/4)
	//	~ 2-2*(1-dte/8-dte^2/64)
	// = dte/4 + dte^2/32
	double CalculateSmallEdgeDistance(IBigDecimal x, IBigDecimal y, IBigDecimal four )
	{
		IBigDecimal p,q,dte;
		
		// p = x.Multiply(x, mMath_context);
		p = x.Mul(x);
		// q = y.multiply(y, mMath_context);
		q = y.Mul(y);
		// dte = four.subtract(p, mMath_context);
		dte = four.Sub(p);
		dte = dte.Sub(q);
		double delta = dte.DoubleValue();
		double dist = delta/4 + delta*delta/32;
		
/*		BigDecimal test,test2;
		test = new BigDecimal( 2, mMath_context );
		test2 = test.add(x,mMath_context);
*/		
		return dist * Math.Abs(dist);
	}
	
	//
	// Create the data for a reference point.
	// Cubic refers to the use of cubic version of the approximation equation
	//
	public void FillInCubic( IBigDecimal pX, IBigDecimal pY, int aIteration_limit, double aActual_width, float aSize_extra_exponent, float aScreen_offset_x, float aScreen_offset_y )
	{
		mActual_width = aActual_width;
		mIteration_limit = aIteration_limit;
		mActual_width_with_exponent_scale = mActual_width * Math.Pow(10, -aSize_extra_exponent);
		mSize_extra_exponent = (int)aSize_extra_exponent;
		
		mScreen_offset_x = aScreen_offset_x;
		mScreen_offset_y = aScreen_offset_y;
		
		mIs_a_repeater=false;
		mFailed_repeater=false;
		
		A=aActual_width;
		Ai=0;
		B=0;
		Bi=0;
		C=0;
		Ci=0;

		double A2;
		double Ai2;
		double B2;
		double Bi2;
		double C2;
		double Ci2;

		double asq,asqi,csq;
		double x2;
		double xd,yd;
		
		float accuracy = (float) (0.0000001f * mAccuracy);
		
		if (mFull_x_screen_centre != null)
		{
			mFull_x_screen_centre = pX;
			mFull_y_screen_centre = pY;
		}
		else
		{
			mFull_x_screen_centre = pX;
			mFull_y_screen_centre = pY;
		}
		
//		FixedInf<4> x(pX->NumWords()),y(pX->NumWords()),p(pX->NumWords()),q(pX->NumWords()),c(pX->NumWords()),ci(pX->NumWords());
		IBigDecimal x,y,p,q,c,ci;
		int count = 1;
		
		c = bigDecimalFactory.FromDouble( aScreen_offset_x * mActual_width );
		ci = bigDecimalFactory.FromDouble( aScreen_offset_y * mActual_width );
		
		if (aSize_extra_exponent!=0)
		{
			//double factor = Math.Pow(10.0, (double)-aSize_extra_exponent);
			//c = c * new BigDecimal(factor.ToString());
			//ci = ci * new BigDecimal(factor.ToString());
			c = c.MovePointLeft((int)aSize_extra_exponent);
			ci = ci.MovePointLeft((int)aSize_extra_exponent);
		}
		c = c.Add(pX);
		ci = ci.Add(pY);

		
		x=c;
		y=ci;
		
		xd=x.DoubleValue();
		yd=y.DoubleValue();

		mX0 = xd;
		mX0i = yd;
		
		double asq_limit = 2-Math.Sqrt(mX0*mX0+mX0i*mX0i);
		asq_limit=asq_limit*asq_limit;
		asq_limit*=0.99;
		if (mAspect_ratio<1)
		{
			asq_limit *= mAspect_ratio*mAspect_ratio;
		}
			
		// for iteration 0, x=c;
		// delta0 = dc
		int extra_exponent = (int)aSize_extra_exponent;
		
		double width = aActual_width;

		asq = A*A+Ai*Ai;
		
		if (asq>asq_limit)
		{
		}
		else
		{
			do
			{
				
				//First calculate approximation
				asq = A*A-Ai*Ai;
				asqi = 2*A*Ai;
				
				x2 = xd*C - yd*Ci;
				Ci2 = xd*Ci + yd*C;
				C2 = x2;
				C2 += A*B-Ai*Bi;
				Ci2 += A*Bi + Ai*B;
				C2*=2;
				Ci2*=2;

				x2 = xd*A - yd*Ai;
				Ai2 = xd*Ai + yd*A;
				A2 = x2;
				A2=2*A2+width;
				Ai2*=2;
				
				x2 = xd*B - yd*Bi;
				Bi2 = xd*Bi + yd*B;
				B2 = x2;
				B2*=2;
				Bi2*=2;
				
				B2+=asq;
				Bi2+=asqi;
				
				
				double accuracy_munge_rcp = (Math.Abs(A2) + Math.Abs(Ai2));
				double accuracy_munge = 1/accuracy_munge_rcp;
				double n1,n2;
				n1=A2*accuracy_munge;
				n2=Ai2*accuracy_munge;
				asq = n1*n1+n2*n2;
				
				if (asq*accuracy_munge_rcp*accuracy_munge_rcp>asq_limit)
				{
					//deviation is too big
					break;
				}
				
				n1=C2*accuracy_munge;
				n2=Ci2*accuracy_munge;
				csq = n1*n1+n2*n2;

				//Is the ABC approximation accurate enough
				if (csq >=accuracy*accuracy*asq && csq!=0)
				{
					// too inaccuate - bail
					if (extra_exponent!=0)
					{
						// The initial size was scaled up.
						// Now we adjust the ABC coefficients to compensate for the scale.
						// This will affect the accuracy test, and may allow us to continue
						do
						{
							extra_exponent--;
							A*=0.1f;
							Ai*=0.1f;
							B*=0.01f;
							Bi*=0.01f;
							C*=0.001f;
							Ci*=0.001f;
							A2*=0.1f;
							Ai2*=0.1f;
							B2*=0.01f;
							Bi2*=0.01f;
							C2*=0.001f;
							Ci2*=0.001f;
							csq *= 0.0001f;
							
							width *= 0.1f;
						} while (extra_exponent!=0 && (csq >=accuracy*accuracy*asq) && csq!=0.0);
						
						if (csq >=accuracy*accuracy*asq && csq!=0.0)
							break;
						
					}
					else
						break;
				}
				
				A=A2;
				Ai=Ai2;
				B=B2;
				Bi=Bi2;
				C=C2;
				Ci=Ci2;


				//Now do next Mandelbrot calculation
				//This does an unnecessary multiply
				p = x.Mul(x);
				q = y.Mul(y);

				p = p.Sub(q);
				p = p.Add(c);

				q = x.Mul(y);
				q = q.Add(q);
				q = q.Add(ci);
				
				x=p;
				y=q;
				
				xd=x.DoubleValue();
				yd=y.DoubleValue();

				count++;
				if (count>=mIteration_limit-1)
				{
					break;
				}
			} while (true);
		}
		
		//We have made the ABC values.
		//Now make the arrays of X
		mIterations_n = count;
		mDxn = 0;
		mDxni = 0;

		if (count < mIteration_limit-1)
		{
			asq = A*A+Ai*Ai;
			double xsq = xd*xd+yd*yd;
			if (xsq < 1.5f*asq && count>30 /*&& mDo_repeaters*/)
			{
				//we have a potential repeater
				//This point returns to xd,yd
				//A nearby point w returns to zero
				//w has screen coords sw
				// A*sw + B*sw*sw + C*sw*sw*sw =  -(xd,yd)
				float screen_x, screen_y;
				float[] screen = new float[2];
				FindScreenCoords(screen, -xd, -yd );
				screen_x = screen[0];
				screen_y = screen[1];
				
				if (screen_x*screen_x + screen_y*screen_y < 2)
				{
					// The approximation was stopped because X_n got close to zero.
					// I call the actual point (Y) where Y_n is exactly zero a repeater point. 
/*					if (false)
					{
						// use repeater method
						// Java version of SuperFractalThing doesn't do this
						FillInCubicForRepeater(pX,pY,aIteration_limit,aActual_width,aSize_extra_exponent,screen_x, screen_y, count);
						return;
					}
					else
*/					{
						// use normal method
						if (true)
						{
							//this is duplicate of stuff below
							mFull_x_after_approx = x;
							mFull_y_after_approx = y;
							mX = new double[aIteration_limit-count];//(double*)malloc(sizeof(double) * (aIteration_limit-count));
							mXi = new double[aIteration_limit-count];//(double*)malloc(sizeof(double) * (aIteration_limit-count));
							mDistance_to_edge_sqr = new double[aIteration_limit-count];//(double*)malloc(sizeof(double) * (aIteration_limit-count));
							
							//Move approximation to repeater position
							ReFillInCubic(aIteration_limit,aActual_width,aSize_extra_exponent,screen_x+aScreen_offset_x, screen_y+aScreen_offset_y);
									
							//Test repeater point to see if it will work ok
							if (TestRepeaterPoint( aIteration_limit, aActual_width, aSize_extra_exponent, screen_x+aScreen_offset_x, screen_y+aScreen_offset_y ))
							{
								//Not done in java version
								/*
								FindScreenCoords(screen, -GetReal(0), -GetImaginary(0) );
								screen_x = screen[0];
								screen_y = screen[1];
								
								screen_x+=mScreen_offset_x;
								screen_y+=mScreen_offset_y;
								FillInCubicForRepeater(pX,pY,aIteration_limit,aActual_width,aSize_extra_exponent,screen_x, screen_y, count);
								*/
							
							}
							else
							{
								//use normal method
							}
							return;
						}
					}
				}
			}
			
		}
		
		mFull_x_after_approx = x;
		mFull_y_after_approx = y;

		
		//mX = (double*)malloc(sizeof(double) * (aIteration_limit-count));
		//mXi = (double*)malloc(sizeof(double) * (aIteration_limit-count));
		mX = new double[aIteration_limit-count];
		mXi = new double[aIteration_limit-count];
		
		mDistance_to_edge_sqr = new double[aIteration_limit-count];
		
		int i=0;
		
		mX[i] = xd;
		mXi[i] = yd;
		
		IBigDecimal four = bigDecimalFactory.FromInt(4);
		mDistance_to_edge_sqr[i] = 2.0 - Math.Sqrt( mX[i]*mX[i] + mXi[i]*mXi[i] );
		mDistance_to_edge_sqr[i] = mDistance_to_edge_sqr[i]*Math.Abs(mDistance_to_edge_sqr[i]);
		if (mDistance_to_edge_sqr[i]<1e-7)
			mDistance_to_edge_sqr[i] = CalculateSmallEdgeDistance(x,y,four);
		
		
		do
		{
			i++;
			//Now do next mand calculation
			p = x.Mul(x);
			q = y.Mul(y);

			p = p.Sub(q);
			p = p.Add(c);

			q = x.Mul(y);
			q = q.Add(q);
			q = q.Add(ci);
			
			x=p;
			y=q;
			
			count++;
			if (count>=mIteration_limit)
			{
				break;
			}
			mX[i]=x.DoubleValue();
			mXi[i]=y.DoubleValue();
			
			mDistance_to_edge_sqr[i] = 2.00 - Math.Sqrt( mX[i]*mX[i] + mXi[i]*mXi[i] );
			mDistance_to_edge_sqr[i] = mDistance_to_edge_sqr[i]*Math.Abs(mDistance_to_edge_sqr[i]);
			if (mDistance_to_edge_sqr[i]<1e-7)
				mDistance_to_edge_sqr[i] = CalculateSmallEdgeDistance(x,y,four);
			
		} while (mDistance_to_edge_sqr[i]>0);

		mNum_iterations = count;
		
		

	}


	//Initially the centre of the screen is used as the reference point
	//However this is likely to be a bad reference point, so we need to move to another reference point
	//We don't have to create everything from scratch, we can use the old reference point to help calculate the new one.
	public void ReFillInCubic( int aIteration_limit, double aActual_width, float aSize_extra_exponent, float aScreen_offset_x, float aScreen_offset_y )
	{
		int count;

		if (mFailed_repeater && mFailed_repeater_details==null)
		{
			mFailed_repeater_details = new Details(this);
		}
			
		IBigDecimal pX = mFull_x_screen_centre;
		IBigDecimal pY = mFull_y_screen_centre;

		mScreen_offset_x = aScreen_offset_x;
		mScreen_offset_y = aScreen_offset_y;

		IBigDecimal x,y,p,q,c,ci;
		double[] delta = new double[2];
		
		if (mOriginal_approx!=null)	
			mOriginal_approx.CalculateApproximation( aScreen_offset_x, aScreen_offset_y, delta );
		else
			CalculateApproximation( aScreen_offset_x, aScreen_offset_y, delta );

		x = mFull_x_after_approx.Add(bigDecimalFactory.FromDouble(delta[0]));
		y = mFull_y_after_approx.Add(bigDecimalFactory.FromDouble(delta[1]));

		
		if (mOriginal_approx==null)
		{
			mOriginal_approx = new Approximation(this);
		}
		
		Translate( mOriginal_approx, aScreen_offset_x,aScreen_offset_y );

		int i=0;
		count = GetApproxIterations();
		
		
		mX[i] = x.DoubleValue();
		mXi[i] = y.DoubleValue();

		IBigDecimal four = bigDecimalFactory.FromInt(4);
			
		mDistance_to_edge_sqr[i] = 2.0 - Math.Sqrt( mX[i]*mX[i] + mXi[i]*mXi[i] );
		mDistance_to_edge_sqr[i] = mDistance_to_edge_sqr[i]*Math.Abs(mDistance_to_edge_sqr[i]);
		if (mDistance_to_edge_sqr[i]<1e-7)
			mDistance_to_edge_sqr[i] = CalculateSmallEdgeDistance(x,y,four);

		if (aSize_extra_exponent!=0)
		{
			p = bigDecimalFactory.FromDouble(aScreen_offset_x*mActual_width);   //aScreen_offset_x * mActual_width;
			c=p.MovePointLeft((int)aSize_extra_exponent);
			c = c.Add(pX);
			
			p= bigDecimalFactory.FromDouble(aScreen_offset_y * mActual_width);
			ci=p.MovePointLeft((int)aSize_extra_exponent);
			ci = ci.Add(pY);
			
		}
		else
		{
			c = pX;
			ci = pY;
			c = c.Add(bigDecimalFactory.FromDouble(aScreen_offset_x * mActual_width));
			ci = ci.Add(bigDecimalFactory.FromDouble(aScreen_offset_y * mActual_width));
		}

		mX0 = c.DoubleValue();
		mX0i = ci.DoubleValue();

		do
		{
			i++;
			//Now do next Mandelbrot calculation
			p = x.Mul(x);
			q = y.Mul(y);
			p = p.Sub(q);
			p = p.Add(c);

			q = x.Mul(y);
			q = q.Add(q);
			q = q.Add(ci);
			
			x=p;
			y=q;
			
			count++;
			if (count>=mIteration_limit)
			{
				break;
			}
			mX[i]=x.DoubleValue();
			mXi[i]=y.DoubleValue();
			
			mDistance_to_edge_sqr[i] = 2.0 - Math.Sqrt( mX[i]*mX[i] + mXi[i]*mXi[i] );
			mDistance_to_edge_sqr[i] = mDistance_to_edge_sqr[i]*Math.Abs(mDistance_to_edge_sqr[i]);
			if (mDistance_to_edge_sqr[i]<1e-7)
				mDistance_to_edge_sqr[i] = CalculateSmallEdgeDistance(x,y,four);

		} while (mDistance_to_edge_sqr[i]>0);

		mNum_iterations = count;
	}
	
	void FillInCubicForRepeater( IBigDecimal pX, IBigDecimal pY, int aIteration_limit, double aActual_width, float aSize_extra_exponent, float aScreen_offset_x, float aScreen_offset_y, int pCount )
	{
		//Not used in java version
	}
	
	//Sometimes the repeater point is not representative of the whole image.
	//Check to make sure its ok by sampling points
	//If there is a point far away that has more iterations than a point very close to the repeater, then 'fail' the repeater
	bool TestRepeaterPoint(int aIteration_limit, double aActual_width, float aSize_extra_exponent, float aPoint_x, float aPoint_y )
	{
	
		float[] xs={0,0.707f,1,0.707f,0,-0.707f,-1,-0.707f, 0.3826f,-0.3826f,-0.3826f};
		float[] ys={1,0.707f,0,-0.707f,-1,-0.707f,0,0.707f, 0.9238f,0.9238f,-0.9238f};
		float[] rs={0.04f,0.08f,0.12f,0.2f, 0.3f, 0.4f,0.5f,0.6f,0.7f,0.8f};
		int i, target,target2,a,r;

		double[] error = new double[2];
		
		//if (!mDo_repeaters)
		//	return false;
		
		CalculateApproximation(aPoint_x-mScreen_offset_x,aPoint_y-mScreen_offset_y, error );
		
		{
			double x,xi,temp,tempi;
			double[] dx = new double[2];
			
			//Get an approximation a 'distance' away from the repeater
			CalculateApproximation(aPoint_x-mScreen_offset_x+0.5,aPoint_y-mScreen_offset_y, dx );
			
			//Do another iteration to get to the 'zero' iteration
			x = GetReal(0);
			xi = GetImaginary(0);
			temp = 2*(x*dx[0] - xi*dx[1]);
			tempi = 2*(x*dx[1] + xi*dx[0]);
			
			double delta = (aPoint_x-mScreen_offset_x+0.5) * GetActualWidthWithExponentScale();
			double deltai = (aPoint_y-mScreen_offset_y) * GetActualWidthWithExponentScale();
	
			temp += delta;
			tempi += deltai;
			
			temp += (dx[0]*dx[0] - dx[1]*dx[1]);
			tempi += 2*dx[0]*dx[1];
	
			//Now compare the offset with the error in getting back to zero at the repeater point
			double error2 = (Math.Abs(mX[0])+Math.Abs(mXi[0]))/(Math.Abs(temp)+Math.Abs(tempi));
			
			//Not sure what this number means, chosen coz it works
			if (error2>1E14)
			{
				mFailed_repeater=true;
				return false;
			}
		}
		
		
		target = CalculateIterations( this, (float)(aPoint_x+0.005-mScreen_offset_x),(float)(aPoint_y+0.005-mScreen_offset_y) );
		target2 = CalculateIterations( this, (float)(aPoint_x+0.005-mScreen_offset_x),(float)(aPoint_y-mScreen_offset_y) );
		if (target>target2)
			target=target2;
		int max=0, max_a=0,max_r=0, inner_max=0;
		int max_pless=0;
		int j;
		
		if (target>100)
		{
			float x=0,y=0;
			for (r=0; r<rs.Length; r++)
			{
				for (a=0; a<xs.Length; a++)
				{
					x = xs[a]*rs[r];
					y = ys[a]*rs[r];
					if (x<1 && x>-1 && y<1 && y>=-1)
					{
						i = CalculateIterations( this, x,y );
	
						j=i-gCount_with_perturbation;
						//j is how many iterations on its own
						if (j>max_pless)
							max_pless=j;
						
						if (j>2000)
						{
							//j is a measure of how well thetest point matches the ref point.
							//Calculation went wrong with j~3000
							//Ok with j~1000 (mosaic)
							mFailed_repeater=true;
							SetRepeaterFailPoint(x+mScreen_offset_x,y+mScreen_offset_y);
							return false;
						}
						
						if (i!=0 || i>target+100)
						{
							//ReFillIn(aIteration_limit,aActual_width,aSize_extra_exponent,xs[a]*rs[r],ys[a]*rs[r]);
							mFailed_repeater=true;
							SetRepeaterFailPoint(x+mScreen_offset_x,y+mScreen_offset_y);
							return false;
						}
						if (i>max)
						{
							max=i;
							max_a = a;
							max_r = r;
						}
					}
				}
				if (r==0)
				{
					inner_max = max;
				}
				else
				{
					if (max > inner_max + 500)
					{
						mFailed_repeater=true;
						SetRepeaterFailPoint(x+mScreen_offset_x,y+mScreen_offset_y);
						return false;
					}
					
				}
	
			}		
		
			if (max>target-100 && max_r!=0)
			{
				float[] offsets_x = {0.04f,-0.04f, 0.04f,-0.04f,0.02f,-0.02f,0   ,0};
				float[] offsets_y = {0.04f, 0.04f,-0.04f,-0.04f,0   ,0    ,0.02f,-0.02f};
				
				for (j=0; j<offsets_x.Length;j++)
				{
					x = xs[max_a]*rs[max_r]+offsets_x[j];
					y = ys[max_a]*rs[max_r]+offsets_y[j];
					if (x<1 && x>-1 && y<1 && y>=-1)
					{
						i = CalculateIterations( this, x,y );
						if (i!=0 || i>target+100)
						{
							//ReFillIn(aIteration_limit,aActual_width,aSize_extra_exponent,x,y);
							mFailed_repeater=true;
							SetRepeaterFailPoint(x+mScreen_offset_x,y+mScreen_offset_y);
							return false;
						}
					}
				}				
			}
			else if (max_r==0 || max_r==1)
			{
				//added for promising zoom candidate t=226 23/10/2010
				//x=0.015;
				//y=0.022;
				//added for promising zoom candidate t=225_17 31/10/2010
				x=0.01f;
				y=0.015f;
				i = CalculateIterations( this, x,y );
				if (i!=0 || i>target+100)
				{
					//ReFillIn(aIteration_limit,aActual_width,aSize_extra_exponent,x,y);
					mFailed_repeater=true;
					SetRepeaterFailPoint(x+mScreen_offset_x,y+mScreen_offset_y);
					return false;
				}
				
			}
		}
		
		return true;
	}
	
	
	
	public bool ReFillInCubicWithRepeaterCheck( int aIteration_limit, double aActual_width, int aSize_extra_exponent, float aScreen_offset_x, float aScreen_offset_y )
	{
		ReFillInCubic(aIteration_limit, aActual_width, aSize_extra_exponent, aScreen_offset_x, aScreen_offset_y );
		
		if (mFailed_repeater)
			return false;//Already got a failed repeater point
		
	/*	double xd = mX[0];
		double yd = mXi[0];
		
		double asq = A*A+Ai*Ai;
		double xsq = xd*xd+yd*yd;

		if (xsq < 1.5f*asq && GetTotalIterations()>30 && mDo_repeaters)
		{
			double screen_x, screen_y;
			FindScreenCoords(&screen_x, &screen_y, -xd, -yd );
			if (screen_x*screen_x + screen_y*screen_y < 2)
			{
				ReFillInCubic(aIteration_limit,aActual_width,aSize_extra_exponent,screen_x+aScreen_offset_x, screen_y+aScreen_offset_y);
				return TRUE;
			}
		}
	*/
		return false;
	}
}


