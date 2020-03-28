//
// Approximation
// Contains a ABC peturbation theroy approximation
// See equation (2) in sft_maths.pdf
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

public class Approximation {

	
	//number of iterations this approximation takes us up to (n)
	int mIterations_n;
	
	//offset from centre of screen in screen space
	float mScreen_offset_from_centre_x;
	float mScreen_offset_from_centre_y;
	
	//x offset from screen centre to approximation centre at iteration n
	double mDxn;
	double mDxni;
	
	int gCount_with_perturbation;
	
	//constants to calculate x offset from approximation centre to P at iteration n
	//using screen offset from approximation centre to P
	//(P is an arbitrary point)
	double A;
	double Ai;
	double B;
	double Bi;
	double C;
	double Ci;
		
	public Approximation()
	{

	}
	
	int GetApproxIterations()
	{
		return mIterations_n;
	}

	float GetCentreScreenSpaceX()
	{
		return mScreen_offset_from_centre_x;
	}
	float GetCentreScreenSpaceY()
	{
		return mScreen_offset_from_centre_y;
	}
	void SetScreenOffsetFromCentre( float x, float y)
	{
		mScreen_offset_from_centre_x = x;
		mScreen_offset_from_centre_y = y;
	}
	
	//
	// Clone an Approximation
	//
	public Approximation(Approximation aApprox)
	{
		mIterations_n=aApprox.mIterations_n;
		
		A=aApprox.A;
		Ai=aApprox.Ai;
		B=aApprox.B;
		Bi=aApprox.Bi;
		C=aApprox.C;
		Ci=aApprox.Ci;
				
		mScreen_offset_from_centre_x=aApprox.mScreen_offset_from_centre_x;
		mScreen_offset_from_centre_y=aApprox.mScreen_offset_from_centre_y;
		
		mDxn=aApprox.mDxn;
		mDxni=aApprox.mDxni;
		

	}
	
	//
	// Calculate the A,B and C coefficents
	//
	public  void InitialiseCubic( Approximation aParent, float aScreen_offset_from_centre_x, float aScreen_offset_from_centre_y, float aScreen_width, Details aDetails )
	{
		mScreen_offset_from_centre_x = aScreen_offset_from_centre_x;
		mScreen_offset_from_centre_y = aScreen_offset_from_centre_y;
		
		double screen_dx = 	mScreen_offset_from_centre_x - aParent.GetCentreScreenSpaceX();
		double screen_dy = 	mScreen_offset_from_centre_y - aParent.GetCentreScreenSpaceY();

		double dsq = screen_dx*screen_dx-screen_dy*screen_dy;
		double dsqi = 2*screen_dx*screen_dy;
	
		double dcu = screen_dx*dsq-screen_dy*dsqi;
		double dcui = screen_dx*dsqi + screen_dy*dsq;
	
		double accuracy = 0.0000001f*aDetails.GetAccuracy();
		double scale = 2 / aScreen_width;

		accuracy *= 100;
		//accuracy /= 10000;
		
		accuracy *= scale*scale;
		
		//newA = A + 2*B*screen_delta + 3*C*screen_delta^2
		//newB = B + 3*C*screen_delta
		//newC = C
		A = aParent.A + 2*(aParent.B * screen_dx - aParent.Bi*screen_dy) + 3 * (aParent.C * dsq - aParent.Ci*dsqi);
		Ai = aParent.Ai + 2*(aParent.B * screen_dy + aParent.Bi*screen_dx) + 3 * (aParent.C * dsqi + aParent.Ci * dsq);

		B = aParent.B + 3 * (aParent.C * screen_dx - aParent.Ci * screen_dy );
		Bi = aParent.Bi + 3 * (aParent.C * screen_dy + aParent.Ci * screen_dx );
		
		C = aParent.C;
		Ci = aParent.Ci;
		
		mDxn = aParent.A * screen_dx - aParent.Ai * screen_dy;
		mDxni = aParent.A * screen_dy + aParent.Ai * screen_dx;

		mDxn += aParent.B * dsq - aParent.Bi * dsqi;
		mDxni += aParent.B * dsqi + aParent.Bi * dsq;

		mDxn += aParent.C * dcu - aParent.Ci * dcui;
		mDxni += aParent.C * dcui + aParent.Ci * dcu;
		
		// transform to centre
		mDxn += aParent.mDxn;
		mDxni += aParent.mDxni;
		mIterations_n = aParent.mIterations_n;
		
		// now expand onwards using the centre details
		//new_DELTA = 2*x*DELTA + delta + DELTA^2
		
		// new_A = 2*x*A
		// new_B = 2*x*B + A*A
		// new_C = 2*x*C + 2*A*B
		
		double delta = aScreen_offset_from_centre_x * aDetails.GetActualWidthWithExponentScale();
		double deltai = aScreen_offset_from_centre_y * aDetails.GetActualWidthWithExponentScale();
		
		double tA=A;
		double tAi=Ai;
		double tB=B;
		double tBi=Bi;
		double tC=C;
		double tCi=Ci;
		
		double dx = mDxn;
		double dxi = mDxni;
		double x,xi,temp,tempi;
		double local_x, local_xi;
		double asq,bsq,csq;
		int extra=0;
		
		int offset = aParent.GetApproxIterations()-aDetails.GetApproxIterations();
		
		while (true)
		{
			if (extra+offset>=aDetails.GetTotalIterations()-aDetails.GetApproxIterations()-1)
			{
				// run out of screen centre refence x values.
				//Bang();
				break;
			}
			//get centre xn
			x = aDetails.GetReal(extra+offset);
			xi = aDetails.GetImaginary(extra+offset);
			
			local_x = x+dx;
			local_xi = xi+dxi;
			
			//update A,B,C
			//using local xn
			temp = 2*(local_x*tC - local_xi*tCi);
			tCi = 2*(local_x*tCi + local_xi*tC);
			tC = temp;
			
			tC += 2*(A*B - Ai*Bi);
			tCi += 2*(A*Bi + Ai*B);
			
			temp = 2*(local_x*tB - local_xi*tBi);
			tBi = 2*(local_x*tBi + local_xi*tB);
			tB = temp;
			
			tB += A*A - Ai*Ai;
			tBi += 2*A*Ai;

			temp = 2*(local_x*tA - local_xi*tAi);
			tAi = 2*(local_x*tAi + local_xi*tA);
			tA = temp+aDetails.GetActualWidthWithExponentScale();
			
			asq = tA*tA+tAi*tAi;
			bsq = tB*tB+tBi*tBi;
			//csq = (tC*tC+tCi*tCi);

			
			//Assume screen distance of about 1.
			//Will this approx take us over the edge?
			//This is an important test when zoom is less than 1E1.
			if (asq+bsq> aDetails.GetDistanceToEdgeSqr(extra+offset))
			{
				break;
			}
				
			
			double accuracy_munge_rcp = (Math.abs(tA) + Math.abs(tAi));
			double accuracy_munge = 1/accuracy_munge_rcp;
			double n1,n2;
			n1=tA*accuracy_munge;
			n2=tAi*accuracy_munge;
			asq = n1*n1+n2*n2;

			n1=tC*accuracy_munge;
			n2=tCi*accuracy_munge;
			csq = n1*n1+n2*n2;
			
			
			if (csq >accuracy*accuracy*asq)
			{
				// too inaccuate - bail
				break;
			}

			//approx is ok, update stored values
			A=tA;
			Ai=tAi;
			B=tB;
			Bi=tBi;
			C=tC;
			Ci=tCi;
			
			// update dx
			temp = 2*(x*dx - xi*dxi);
			tempi = 2*(x*dxi + xi*dx);

			temp += delta;
			tempi += deltai;
			
			temp += (dx*dx - dxi*dxi);
			tempi += 2*dx*dxi;
			
			dx = temp;
			dxi = tempi;
			
			//update count
			extra++;
		
			mIterations_n = aParent.mIterations_n+extra;
			mDxn = dx;
			mDxni = dxi;
		}
	}
	
	//
	//Use the A,B and C coefficients to get the first DELTA.
	//
	void CalculateApproximation( double aSdx, double aSdxi,  double rDx[] )
	{
		double sxsq,sxsqi;
		double sxcu,sxcui;
		
		rDx[0] = A*aSdx - Ai*aSdxi;
		rDx[1] = A*aSdxi + Ai*aSdx;
		
		sxsq = aSdx*aSdx - aSdxi*aSdxi;
		sxsqi = 2*aSdx*aSdxi;
		
		rDx[0] += B*sxsq - Bi*sxsqi;
		rDx[1] += B*sxsqi + Bi*sxsq;
	
		sxcu = aSdx*sxsq - aSdxi*sxsqi;
		sxcui = aSdx*sxsqi +  aSdxi*sxsq;
		
		rDx[0] += C*sxcu - Ci*sxcui;
		rDx[1] += C*sxcui + Ci*sxcu;
	
		rDx[0] += mDxn;
		rDx[1] += mDxni;
	}
	
	//
	// Calculate the iteration count for a point on the screen
	// aDetails provides the reference point.
	//
	int CalculateIterations(Details aDetails, float aScreen_delta_x, float aScreen_delta_y)
	{
		double _dx[]=new double[2];
	//#define double long double
		double dx,dxi;
		int extra;
		double x,xi,temp,tempi,dxsq,x2;
		double delta = (aScreen_delta_x) * aDetails.GetActualWidthWithExponentScale();
		double deltai = (aScreen_delta_y) * aDetails.GetActualWidthWithExponentScale();

		double c = aDetails.GetX0() + delta;
		double ci = aDetails.GetX0i() + deltai;

		float gAcc = 0.001f;

		int count;
		
		//return mIterations_n;

		//Use the A,B and C coefficients to get the first DELTA.
		CalculateApproximation( aScreen_delta_x-mScreen_offset_from_centre_x,
								aScreen_delta_y-mScreen_offset_from_centre_y,
								 _dx );


		dx = _dx[0];
		dxi = _dx[1];
		
		extra = mIterations_n - aDetails.GetApproxIterations();
		

		while (true)
		{
			dxsq = dx*dx + dxi*dxi;
			if (dxsq > gAcc*gAcc*100)
				break;

			if (extra >= aDetails.GetTotalIterations()- aDetails.GetApproxIterations()-1)
			{
				//Bang();
				break;
			}
			
			x = aDetails.GetReal(extra);
			xi = aDetails.GetImaginary(extra);

			if (dxsq > aDetails.GetDistanceToEdgeSqr(extra))
			{
				if (dxsq > 1E-10)
					break;
				
				//Actual length squared = (x+dx)^2 + (xi+dxi)^2
				//					= x^2+xi^2 + 2*xdx + 2*xi*dxi
				//					= M       + 2*xdx + 2*xi*dxi;
				//					= M ( 1 + (2*xdx + 2*xi*dxi)/M)
				// actual length = M^0.5 * ( 1 + (x*dx + xi*dxi)/M)
				// extra length = (x*dx + xi*dxi)/ M^0.5
				// extra length squared = (x*dx + xi*dxi)^2 / (x^2+xi^2)
				
				double M = x*x + xi*xi;
				double del = x*dx+xi*dxi;
				
				if ( del*Math.abs(del) > aDetails.GetDistanceToEdgeSqr(extra) * M)
					return aDetails.GetApproxIterations()+extra;
				
			}

			// update dx
			temp = 2*(x*dx - xi*dxi);
			tempi = 2*(x*dxi + xi*dx);

			temp += delta;
			tempi += deltai;
			
			temp += (dx*dx - dxi*dxi);
			tempi += 2*dx*dxi;
			
			dx = temp;
			dxi = tempi;

			extra++;
			
		}
		
		count = aDetails.GetApproxIterations()+extra;
		gCount_with_perturbation = count;
		
		dx += aDetails.GetReal(extra);
		dxi += aDetails.GetImaginary(extra);
		
		while (dx*dx+dxi*dxi < 4)
		{
			x2 = dx*dx-dxi*dxi  + c;
			dxi = 2*dx*dxi + ci;
			dx = x2;
			count++;
			if (count>=aDetails.GetIterationLimit())
			{
				//pStats->pixels_in_set++;
				return 0;
			}
		}
		
		return (count);	
	}

	
	void Translate(Approximation aOriginal, float aScreen_dx, float aScreen_dy)
	{
	float dsq = aScreen_dx*aScreen_dx-aScreen_dy*aScreen_dy;
	float dsqi = 2*aScreen_dx*aScreen_dy;

	float dcu = aScreen_dx*dsq-aScreen_dy*dsqi;
	float dcui = aScreen_dx*dsqi + aScreen_dy*dsq;

		A = aOriginal.A + 2*(aOriginal.B * aScreen_dx - aOriginal.Bi*aScreen_dy) + 3 * (aOriginal.C * dsq - aOriginal.Ci*dsqi);
		Ai = aOriginal.Ai + 2*(aOriginal.B * aScreen_dy + aOriginal.Bi*aScreen_dx) + 3 * (aOriginal.C * dsqi + aOriginal.Ci * dsq);

		B = aOriginal.B + 3 * (aOriginal.C * aScreen_dx - aOriginal.Ci * aScreen_dy );
		Bi = aOriginal.Bi + 3 * (aOriginal.C * aScreen_dy + aOriginal.Ci * aScreen_dx );
		
		C = aOriginal.C;
		Ci = aOriginal.Ci;


		mDxn = aOriginal.A * aScreen_dx - aOriginal.Ai * aScreen_dy;
		mDxni = aOriginal.A * aScreen_dy + aOriginal.Ai * aScreen_dx;

		mDxn += aOriginal.B * dsq - aOriginal.Bi * dsqi;
		mDxni += aOriginal.B * dsqi + aOriginal.Bi * dsq;

		mDxn += aOriginal.C * dcu - aOriginal.Ci * dcui;
		mDxni += aOriginal.C * dcui + aOriginal.Ci * dcu;
		
		// transform to centre
		mDxn += aOriginal.mDxn;
		mDxni += aOriginal.mDxni;
		
		mDxn=0;
		mDxni=0;
		
		mIterations_n = aOriginal.mIterations_n;
		
	}
	
}
