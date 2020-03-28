//
//	FindBestReferencePoint
//	Samples various points in the image to be calculated to try to find a good reference point
//	This code was partially created by trial and error, so there may not be a huge amount of logic to it.
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

import java.util.Iterator;
import java.util.Map;
import java.util.Set;
import java.util.TreeMap;



	class FBRPEntry
	{
		public FBRPEntry()
		{
			count=(0);
			total_p=(0);
			total_q=(0);
			d=(1000000.0f);
		}
		
		public int count;
		float total_p;
		float total_q;
		float non_averaged_p;
		float non_averaged_q;
		float d;

	}
	
public class FindBestreferencePoint
{
TreeMap<Integer,FBRPEntry> mMap;
Details mDetails;
int mMax_count_depth;
int mNum_above_accuracy_limit;
int mArray[][];

int mSteps_p;
int mSteps_q;
float mP_start;
float mQ_start;
float mP_step;
float mQ_step;

Map.Entry<Integer,FBRPEntry> mMax_count;

	public FindBestreferencePoint(Details aDetails)
	{
		mDetails = aDetails;
		mNum_above_accuracy_limit=0;
		mArray = new int[20][20];
		mMap = new TreeMap<Integer,FBRPEntry>();
	}
	
	void GetTopAverage(int aCount, float pq[] )
	{
/*		std::map<int, FBRPEntry>::reverse_iterator itr;
		int c=0;
		p=0;
		q=0;
		for (itr = mMap.rbegin(); itr != mMap.rend() && c<aCount; itr++)
		{
			p+= itr->second.total_p;
			q+= itr->second.total_q;
			c+= itr->second.count;
		}
		
		p/= c;
		q/= c;
*/		
	}


	static float DistanceSquare(float x1,float y1, float x2, float y2)
	{
		return (x2-x1)*(x2-x1)+(y2-y1)*(y2-y1);
	}

	Details Calculate()
	{
		float pq[] = new float[2];
		float p=0,q=0;
		int i;
		boolean clear=false;
		int pass;
		float repeater_fail_distance=0;
		
		if (mDetails.GetTotalIterations() > mDetails.GetIterationLimit()-200 && !mDetails.GetIsFailedRepeater())
			return mDetails;


		boolean failed_repeater_bodge=mDetails.GetIsFailedRepeater();
		boolean skip_zoom_bodge = false;

		Details centre_check_details = null;
		
		float initial_p=mDetails.GetScreenOffsetX();
		float initial_q=mDetails.GetScreenOffsetY();

		if (mDetails.GetRepeaterFailPoint(pq))
		{
			p = pq[0];
			q = pq[1];
			mDetails.ReFillInCubic(mDetails.GetIterationLimit(), mDetails.GetActualWidth(), mDetails.GetSizeExtraExponent(), p, q );
			failed_repeater_bodge=false;
			
			repeater_fail_distance = (p-initial_p)*(p-initial_p)+(q-initial_q)*(q-initial_q);
		}
		if (mDetails.GetIsFailedRepeater())
		{
			if (repeater_fail_distance < 0.006f)
				repeater_fail_distance = 0.006f;
		}
				
		
		float range = 0.2f*10;
		int initial;
		
		float old_max_p = 0;
		float old_max_q = 0;
		
		DoAPass( 0,0, 1.6f,1.6f, 9 );
		
		//std::map<int, FBRPEntry>::reverse_iterator top,top2,top3;
		Map.Entry<Integer,FBRPEntry> top,top2,top3;
		
		
		for (pass=0; pass<100; pass++)
		{
			Set<Map.Entry<Integer,FBRPEntry>> set = mMap.entrySet();
			Iterator<Map.Entry<Integer,FBRPEntry>> itr = set.iterator();
			top = itr.next();
			if (itr.hasNext())
				top2 = itr.next();
			else
				top2 = top;
			
/*			if (itr.hasNext())
				top_extra = itr.next();
			else
				top_extra = top;
*/		
			top3 = mMax_count;

			
			p = (top.getValue()).total_p/(top.getValue()).count;
			q = (top.getValue()).total_q/(top.getValue()).count;

			// stop us going back to repeater
			if ( mDetails.GetIsFailedRepeater() )
			{
	/*			while ((top.getValue()).count == 1 &&
					(p-initial_p)*(p-initial_p)+(q-initial_q)*(q-initial_q) < 1.6f*1.6f*0.125f/100.0f)
				{
					top++;
					p = (top.getValue()).total_p/(top.getValue()).count;
					q = (top.getValue()).total_q/(top.getValue()).count;
				}
	*/		}
			/*else*/ if ((top.getValue()).count==1 && (top2.getValue()).count==1 &&
					 (Math.abs( (top.getValue()).total_p - (top2.getValue()).total_p ) > range/9 * 1.5f ||
					  Math.abs( (top.getValue()).total_q - (top2.getValue()).total_q ) > range/9 * 1.5f ) &&
						 ((mMax_count.getValue()).count<10 || (mMax_count.getValue()).count<mMax_count_depth*2))		//Added 30/10/2010
			{
				int x,y,max_i=-1, max_x=0,max_y=0;
				float repeater_x = (initial_p - mP_start)/mP_step;
				float repeater_y = (initial_q - mQ_start)/mQ_step;
				
				for (y=0; y<mSteps_p-1; y++)
					for (x=0; x<mSteps_q-1; x++)
					{
						i = mArray[y][x]+mArray[y][x+1]+mArray[y+1][x+1]+mArray[y+1][x];
						i -= Math.max( Math.max(mArray[y][x],mArray[y][x+1]), Math.max(mArray[y+1][x+1],mArray[y+1][x]) );
						
						if (mDetails.GetIsFailedRepeater() && repeater_x >=x && repeater_x <= x+1 && repeater_y >= y && repeater_y <= y+1)
							i-=900;
						if (i>max_i)
						{
							max_x = x;
							max_y = y;
							max_i = i;
						}
					}
				
				int min_i =  mMap.lastKey();
				float np, nq;
				np = (mP_start + mP_step * (max_x+0)) * (mArray[max_y][max_x]-min_i);
				nq = (mQ_start + mQ_step * (max_y+0)) * (mArray[max_y][max_x]-min_i);
				np += (mP_start + mP_step * (max_x+1)) * (mArray[max_y][max_x+1]-min_i);
				nq += (mQ_start + mQ_step * (max_y+0)) * (mArray[max_y][max_x+1]-min_i);
				np += (mP_start + mP_step * (max_x+1)) * (mArray[max_y+1][max_x+1]-min_i);
				nq += (mQ_start + mQ_step * (max_y+1)) * (mArray[max_y+1][max_x+1]-min_i);
				np += (mP_start + mP_step * (max_x+0)) * (mArray[max_y+1][max_x+0]-min_i);
				nq += (mQ_start + mQ_step * (max_y+1)) * (mArray[max_y+1][max_x+0]-min_i);
				
				np/=(mArray[max_y][max_x]+mArray[max_y][max_x+1]+mArray[max_y+1][max_x+1]+mArray[max_y+1][max_x]-4*min_i);
				nq/=(mArray[max_y][max_x]+mArray[max_y][max_x+1]+mArray[max_y+1][max_x+1]+mArray[max_y+1][max_x]-4*min_i);
				//p = mP_start + mP_step * (max_x+0.5);
				//q = mQ_start + mQ_step * (max_y+0.5);
				
				repeater_fail_distance =Math.min(repeater_fail_distance, range*0.25f);
				if (repeater_fail_distance==0 || DistanceSquare( np,nq, initial_p, initial_q ) > repeater_fail_distance *0.25f)
				{

					p=np;
					q=nq;
					
					float old_range=range;
					range *= 0.5f;
					
					if (range <= 1/50.0f)
						break;
					
					if (pass==0 && (Math.abs(p)>0.3 || Math.abs(q)>0.3) && !mDetails.GetIsFailedRepeater())
					{
						centre_check_details = new Details(mDetails);
					}
					
					int test=mDetails.CalculateIterations(mDetails, p-mDetails.GetScreenOffsetX(), q-mDetails.GetScreenOffsetY() );
					if (test>mDetails.GetTotalIterations() || test==0 ||	failed_repeater_bodge)
						mDetails.ReFillInCubicWithRepeaterCheck(mDetails.GetIterationLimit(), mDetails.GetActualWidth(), mDetails.GetSizeExtraExponent(), p, q );
					else 
					{
						//31.10.2010 make sure we don't drift away from main point
						if (Math.abs(mDetails.GetScreenOffsetX() - p) > range/2)
							range = Math.abs(mDetails.GetScreenOffsetX() - p) * 2.1f;
						if (Math.abs(mDetails.GetScreenOffsetY() - q) > range/2)
							range = Math.abs(mDetails.GetScreenOffsetY() - q) * 2.1f;
						
						if (range > old_range*0.98f)
							range=  old_range*0.98f;	//make sure we don't get stuck
						
					}

					failed_repeater_bodge=false;
					
					old_max_p = p;
					old_max_q = q;
					Clear();
					DoAPass(p,q, range,range,10);
					
					continue;
				}
			}

			if (mDetails.GetIsFailedRepeater() && (top.getValue()).count == 1 && 
				Math.abs((top.getValue()).total_p - initial_p) < mP_step/2 &&
				Math.abs((top.getValue()).total_q - initial_q) < mQ_step/2)
			{
				top = top2;
				if ((top3.getValue()).count > (top2.getValue()).count*2 && -top3.getKey() > mDetails.GetTotalIterations())
				{
					top = top3;
				}
				else while (itr.hasNext() &&
								mDetails.GetIsFailedRepeater() && (top.getValue()).count == 1 && 
								Math.abs((top.getValue()).total_p - initial_p) < mP_step*0.6f &&
								Math.abs((top.getValue()).total_q - initial_q) < mQ_step*0.6f)
				{
					top=itr.next();
				}
					
			}
			else if ((top2.getValue()).count > (top.getValue()).count*5 ||
					((top.getValue()).count ==1 && failed_repeater_bodge && (top.getValue()).count > (top.getValue()).count) ||
						((top2.getValue()).count >= 3*(top.getValue()).count && (top3.getValue()).count >= 3*(top.getValue()).count))
			{
				top = top2;
				
			}
			else if ((top3.getValue()).count > (top2.getValue()).count*5 && (-top3.getKey() > mDetails.GetTotalIterations() || (top3.getValue()).count > mMax_count_depth*2))
			{
				top = top3;
			}
			
			p = (top.getValue()).total_p/(top.getValue()).count;
			q = (top.getValue()).total_q/(top.getValue()).count;
			
			
			if (pass==0 && (Math.abs(p)>0.3 || Math.abs(q)>0.3) && !mDetails.GetIsFailedRepeater())
			{
				centre_check_details = new Details(mDetails);
			}

			if ((top.getKey() >= mDetails.GetTotalIterations() +  1 || failed_repeater_bodge) ||
				((top.getValue()).count > 10 && (top.getKey() > mDetails.GetTotalIterations()-100 || top==top3)))
			{
				
				if ((top.getValue()).count==1 ||failed_repeater_bodge && (p)*(p)+ (q)*(q)<range*range*0.5f/100.0f)
				{
					initial = -1;
				}
				else 
				{
					initial = mDetails.GetTotalIterations();
					int test=mDetails.CalculateIterations(mDetails, p-mDetails.GetScreenOffsetX(), q-mDetails.GetScreenOffsetY() );
					//if (test>initial || !test)													// pre change 20/10/2010
					if ((test>initial || test==0) && ((top.getValue()).count<=10 || test == - top.getKey()))	// change 20/10/2010
						mDetails.ReFillInCubic(mDetails.GetIterationLimit(), mDetails.GetActualWidth(), mDetails.GetSizeExtraExponent(), p, q );
					else
						initial=-1;

				}
				
				if ((initial >= mDetails.GetTotalIterations()) || initial == -1)
				{
					//average didn't work - try a specific point
					p = (top.getValue()).non_averaged_p;
					q = (top.getValue()).non_averaged_q;				
					mDetails.ReFillInCubicWithRepeaterCheck(mDetails.GetIterationLimit(), mDetails.GetActualWidth(), mDetails.GetSizeExtraExponent(), p, q );
				}
				failed_repeater_bodge=false;
				clear = true;
				
				if (((top.getValue()).count<=10 && mNum_above_accuracy_limit<=10) && !skip_zoom_bodge && mDetails.GetTotalIterations()>=initial)
				{
					//zoom in on point with max iterations
				}
				else
				{
					//some accuracy problems - only zoom in a bit.
					//adjust centre so test area doesn't move much, but we don't lose important edges
					float delta = 0.05f * range/2;
					
					if (p>old_max_p)
						p = old_max_p + delta;
					else
						p = old_max_p - delta;

					if (q>old_max_q)
						q = old_max_q + delta;
					else
						q = old_max_q - delta;
					
					range *= 0.95f;				// Just zoom in a bit
					skip_zoom_bodge = true;
				}
			}
			else
			{
				int test;
				if ((Math.abs((top.getValue()).non_averaged_p-mDetails.GetScreenOffsetX()) > range/8 ||
						Math.abs((top.getValue()).non_averaged_q-mDetails.GetScreenOffsetY()) > range/8) &&
						(top.getValue()).count >= 3 /*&&
						!mDetails->GetIsFailedRepeater()*/)
				{
					test = mDetails.CalculateIterations(mDetails, 1/1000.0f, 1/1000.0f );
					if (-top.getKey() > test+500)
					{
						p = (top.getValue()).non_averaged_p;
						q = (top.getValue()).non_averaged_q;				
						mDetails.ReFillInCubicWithRepeaterCheck(mDetails.GetIterationLimit(), mDetails.GetActualWidth(), mDetails.GetSizeExtraExponent(), p, q );
					}
				}
				
				// no significant improvement.
				// centre on highest and shrink
				
				clear = true;
			}
			

			// Iteratively reduce the test area

			if ((top.getValue()).count<=10 && mNum_above_accuracy_limit<=10 && !skip_zoom_bodge)
			{
				if (!(range > 1/50.0f && mDetails.GetTotalIterations() < mDetails.GetIterationLimit()-100) && !failed_repeater_bodge)
					break;
				
				range /= 3.0f;			
			}
			else 
			{
				if (mDetails.GetTotalIterations() >= mDetails.GetIterationLimit()-100 && !failed_repeater_bodge)
					break;
				
				if ((top.getValue()).count>40)
				{
					skip_zoom_bodge = true;
				}
				else
				{
					skip_zoom_bodge=false;
				}
			}
			
			if (clear)
			{
				clear=false;
				Clear();
			}
			if (Math.abs(old_max_p-p)*2>range)
				range = Math.abs(old_max_p-p)*2.1f;
			if (Math.abs(old_max_q-q)*2>range)
				range = Math.abs(old_max_q-q)*2.1f;
			
			old_max_p = p;
			old_max_q = q;
			DoAPass(p,q, range,range,10);

		}
		
		float fail_x,fail_y;
		Details normal_details = mDetails;
		if (mDetails.GetFailedRepeaterDetails()!=null && mDetails.GetRepeaterFailPoint(pq))
		{
			fail_x = pq[0];
			fail_y = pq[1];
			float rep_x = mDetails.GetFailedRepeaterDetails().GetScreenOffsetX();
			float rep_y = mDetails.GetFailedRepeaterDetails().GetScreenOffsetY();
			//int fail_iterations = mDetails.CalculateIterations(mDetails, fail_x-mDetails.GetScreenOffsetX(), fail_y-mDetails.GetScreenOffsetY() );
			int repeater_interations = mDetails.CalculateIterations(mDetails, rep_x-mDetails.GetScreenOffsetX(), rep_y-mDetails.GetScreenOffsetY() );
			int near_repeater_interations = mDetails.CalculateIterations(mDetails, rep_x+0.02f-mDetails.GetScreenOffsetX(), rep_y-mDetails.GetScreenOffsetY() );
			int test;
			
			if (repeater_interations == near_repeater_interations)
			{
				//The centre will be redrawn by create blob
				//Makes sure the point is representitive
				p = rep_x;
				q = rep_y;
				range = (float)Math.sqrt((rep_x-fail_x)*(rep_x-fail_x)+(rep_y-fail_y)*(rep_y-fail_y));
				
				int steps = 10;

				mDetails = mDetails.GetFailedRepeaterDetails();
				for (pass=0; pass<4; pass++)
				{
					Clear();
					DoAPass( p,q,range, range, steps );
					
					Set<Map.Entry<Integer,FBRPEntry>> set = mMap.entrySet();
					Iterator<Map.Entry<Integer,FBRPEntry>> itr = set.iterator();
					top = itr.next();
					top3 = mMax_count;
					set = null;
					
					if ((top3.getValue()).count > 5*(top.getValue()).count)
						top = top3;
				
					p = (top.getValue()).non_averaged_p;
					q = (top.getValue()).non_averaged_q;
					
					if ((top.getValue()).count>=4)
					{
						test = normal_details.CalculateIterations(normal_details,p-normal_details.GetScreenOffsetX(), q-normal_details.GetScreenOffsetY() ); 
						if (test != repeater_interations)
							break;
						
						mDetails.ReFillInCubic(mDetails.GetIterationLimit(), mDetails.GetActualWidth(), mDetails.GetSizeExtraExponent(), p,q );
					}
					steps = 9;
					range/=2.9f;
				}
			}
			else
			{
				// The centre will not be redrawn
				float dist_sq = (p-rep_x)*(p-rep_x) + (q-rep_y)*(q-rep_y);
				repeater_fail_distance = (rep_x-fail_x)*(rep_x-fail_x)+(rep_y-fail_y)*(rep_y-fail_y);
				if (dist_sq > repeater_fail_distance * 9)
				{
					//The reference point is far from the repeater
					// Make sure we don't have high counts near the repeater
					p=fail_x;
					q=fail_y;
					
					range = (float)Math.sqrt(repeater_fail_distance)*2/1.5f;
					int steps = 10;

					for (pass=0; pass<4; pass++)
					{
						Clear();
						DoAPass( p,q,range, range, steps );
						
						Set<Map.Entry<Integer,FBRPEntry>> set = mMap.entrySet();
						Iterator<Map.Entry<Integer,FBRPEntry>> itr = set.iterator();
						top = itr.next();
						top2 = itr.next();
						top3 = mMax_count;
						set = null;
						

						if ((top3.getValue()).count >= 4*(top.getValue()).count && (mMax_count.getValue()).count>=mMax_count_depth*0.67777)
							top = top3;
						
						p = (top.getValue()).non_averaged_p;
						q = (top.getValue()).non_averaged_q;
						
						if ((top.getValue()).count>=10)
						{						
							mDetails.ReFillInCubic(mDetails.GetIterationLimit(), mDetails.GetActualWidth(), mDetails.GetSizeExtraExponent(), p,q );
						}
						steps = 9;
						range/=2.9f;
					}
						
				}
			}

			mDetails = normal_details;
			
	/*		float new_x = mDetails->GetFailedRepeaterDetails()->GetScreenOffsetX();
			float new_y = mDetails->GetFailedRepeaterDetails()->GetScreenOffsetY();
			
			int new_interations = mDetails->CalculateIterations(mDetails, new_x-mDetails->GetScreenOffsetX(), new_y-mDetails->GetScreenOffsetY() );
			
			if (new_interations==repeater_interations)
			{
				return mDetails;
			}
	*/
		}
		
		if (centre_check_details!=null)
		{
			if (Math.abs(p)>0.3f || Math.abs(q)>0.3f)
			{				
				p=0; q=0;
				range = 0.6f;
				
				//mDetails = centre_check_details;
				
				for (pass=0; pass<50; pass++)
				{
					skip_zoom_bodge = false;
					Clear();
					DoAPass(p,q, range,range,10);
					
					Set<Map.Entry<Integer,FBRPEntry>> set = mMap.entrySet();
					Iterator<Map.Entry<Integer,FBRPEntry>> itr = set.iterator();
					top = itr.next();
					if (itr.hasNext())
						top2 = itr.next();
					else
						top2 = top;
					
					top3 = mMax_count;
					set = null;
					
					
					if ((top.getValue()).count==1 && (top2.getValue()).count==1 &&
						(Math.abs( (top.getValue()).total_p - (top2.getValue()).total_p ) > range/9 * 1.5f ||
						 Math.abs( (top.getValue()).total_q - (top2.getValue()).total_q ) > range/9 * 1.5f ) &&
						(top3.getValue().count<10 || - top3.getKey() < centre_check_details.GetTotalIterations()))
					{
						int x,y,max_i=-1, max_x=0,max_y=0;
						float repeater_x = (initial_p - mP_start)/mP_step;
						float repeater_y = (initial_q - mQ_start)/mQ_step;
						
						for (y=0; y<mSteps_p-1; y++)
							for (x=0; x<mSteps_q-1; x++)
							{
								i = mArray[y][x]+mArray[y][x+1]+mArray[y+1][x+1]+mArray[y+1][x];
								i -= Math.max( Math.max(mArray[y][x],mArray[y][x+1]), Math.max(mArray[y+1][x+1],mArray[y+1][x]) );
								
								if (repeater_x >=x && repeater_x <= x+1 && repeater_y >= y && repeater_y <= y+1)
									i-=1000;
								if (i>max_i)
								{
									max_x = x;
									max_y = y;
									max_i = i;
								}
							}
						
						int min_i = mMap.lastKey();
						p = (mP_start + mP_step * (max_x+0)) * (mArray[max_y][max_x]-min_i);
						q = (mQ_start + mQ_step * (max_y+0)) * (mArray[max_y][max_x]-min_i);
						p += (mP_start + mP_step * (max_x+1)) * (mArray[max_y][max_x+1]-min_i);
						q += (mQ_start + mQ_step * (max_y+0)) * (mArray[max_y][max_x+1]-min_i);
						p += (mP_start + mP_step * (max_x+1)) * (mArray[max_y+1][max_x+1]-min_i);
						q += (mQ_start + mQ_step * (max_y+1)) * (mArray[max_y+1][max_x+1]-min_i);
						p += (mP_start + mP_step * (max_x+0)) * (mArray[max_y+1][max_x+0]-min_i);
						q += (mQ_start + mQ_step * (max_y+1)) * (mArray[max_y+1][max_x+0]-min_i);
						
						p/=(mArray[max_y][max_x]+mArray[max_y][max_x+1]+mArray[max_y+1][max_x+1]+mArray[max_y+1][max_x]-4*min_i);
						q/=(mArray[max_y][max_x]+mArray[max_y][max_x+1]+mArray[max_y+1][max_x+1]+mArray[max_y+1][max_x]-4*min_i);
						//p = mP_start + mP_step * (max_x+0.5);
						//q = mQ_start + mQ_step * (max_y+0.5);
						range *= 0.5f;
						
						if (range <= 1/50.0f)
							break;
						
						//if (pass==0 && (Math.abs(p)>0.3 || Math.abs(q)>0.3) && !mDetails->GetIsFailedRepeater())
						//{
						//	centre_check_details = new CDetails(mDetails);
						//}
						
						int test=mDetails.CalculateIterations(mDetails, p-mDetails.GetScreenOffsetX(), q-mDetails.GetScreenOffsetY() );
						if (test>mDetails.GetTotalIterations() || test==0 ||	failed_repeater_bodge)
							mDetails.ReFillInCubicWithRepeaterCheck(mDetails.GetIterationLimit(), mDetails.GetActualWidth(), mDetails.GetSizeExtraExponent(), p, q );
						
						failed_repeater_bodge=false;
						
						old_max_p = p;
						old_max_q = q;
						Clear();
						DoAPass(p,q, range,range,10);
						
						continue;
					}
					
					if ((top2.getValue()).count > (top.getValue()).count*5 ||
						((top.getValue()).count ==1 && failed_repeater_bodge && (top2.getValue()).count > (top.getValue()).count) ||
						((top2.getValue()).count >= 3*(top.getValue()).count && (top3.getValue()).count >= 3*(top.getValue()).count))
					{
						top = top2;
						
					}
					else if ((top3.getValue()).count > (top2.getValue()).count*5 && - top3.getKey() > centre_check_details.GetTotalIterations() && (mMax_count.getValue()).count>=mMax_count_depth*0.67777f)
					{
						top = top3;
					}
					
					p = (top.getValue()).total_p/(top.getValue()).count;
					q = (top.getValue()).total_q/(top.getValue()).count;
					
					if ((- top.getKey() >= centre_check_details.GetTotalIterations() +  1 ||
						((top.getValue()).count > 10 && - top.getKey() > centre_check_details.GetTotalIterations()-100)))
					{
						if ((top.getValue()).count >= 5 && mDetails != centre_check_details)
						{
							mDetails = centre_check_details;
							skip_zoom_bodge = true;
						}
						
						if (mDetails == centre_check_details)
						{
							if ((top.getValue()).count==1)
							{
								initial = -1;
							}
							else 
							{
								initial = mDetails.GetTotalIterations();
								int test=mDetails.CalculateIterations(mDetails, p-mDetails.GetScreenOffsetX(), q-mDetails.GetScreenOffsetY() );
								if (test>initial || test==0)
								{
									mDetails.ReFillInCubic(mDetails.GetIterationLimit(), mDetails.GetActualWidth(), mDetails.GetSizeExtraExponent(), p, q );
								}
								else
									initial=-1;
								
							}
							
							if ((initial >= mDetails.GetTotalIterations()) || initial == -1)
							{
								//average didn't work - try a specific point
								p = (top.getValue()).non_averaged_p;
								q = (top.getValue()).non_averaged_q;				
								{
									mDetails.ReFillInCubicWithRepeaterCheck(mDetails.GetIterationLimit(), mDetails.GetActualWidth(), mDetails.GetSizeExtraExponent(), p, q );
								}
							}
						}
						
					}
					else
					{
						break;
					}
						
					if (!(range > 1/50.0f && mDetails.GetTotalIterations() < mDetails.GetIterationLimit()-100))
						break;
						
					if (mNum_above_accuracy_limit<10 && !skip_zoom_bodge)
						range /= 3.0f;			
					else
						range *= 0.95;
			
				}
			}
		}
			
		return mDetails;	
	}


	void DoAPass(float aP, float aQ, float aWidth, float aHeight, int aNum_rows)
	{
		float p,q;
		float pstep = aWidth/(aNum_rows-1);
		float qstep = aHeight/(aNum_rows-1);
		
		float pstart = aP-0.5f*aWidth;
		float pend = aP+0.5f*aWidth+pstep*0.5f;
		
		float qstart = aQ-0.5f*aHeight;
		float qend = aQ+0.5f*aHeight+qstep*0.5f;
		int i,x,y;
		float d;
		
		mSteps_p=aNum_rows;
		mSteps_q=aNum_rows;
		mP_start=pstart;
		mQ_start=qstart;
		mP_step=pstep;
		mQ_step=qstep;
		
		//std::map<int, FBRPEntry>::reverse_iterator itr;
		
		FBRPEntry entry;
		//FBRPPrintf("//////////////////////////\n");
		
		for (q= qstart,y=0; q<qend; q+=qstep,y++)
		{
			for (p=pstart,x=0; p<pend; p+=pstep,x++)
			{
				i=mDetails.CalculateIterations(mDetails, p-mDetails.GetScreenOffsetX(), q-mDetails.GetScreenOffsetY() );

				//FBRPPrintf("%10d",i);
				if (i==0)
					i=0x7fffffff;
				
				mArray[y][x] = i;
				
				if (i>mDetails.GetTotalIterations()+200)
					mNum_above_accuracy_limit++;
				
				entry = mMap.get(-i);
				if (entry==null)
				{
					entry = new FBRPEntry();//&mMap[i];
					mMap.put(-i, entry);
				}
				entry.count++;
				entry.total_p+=p;
				entry.total_q+=q;
				d = (p)*(p)+(q)*(q);
				if (d < entry.d)
				{
					entry.non_averaged_p = p;
					entry.non_averaged_q = q;
					entry.d = d;
					
				}
				
			}
			//FBRPPrintf("\n");
		}


		//Now find max count
		int max_count=0;
		int depth=0;
/*		for (itr = mMap.rbegin(),depth=0; itr != mMap.rend(); depth+=itr->second.count,itr++)
		{
			if (itr->second.count > max_count)
			{
				mMax_count = itr;
				max_count = itr->second.count;
				mMax_count_depth = depth;
			}
		}
*/
		Set<Map.Entry<Integer,FBRPEntry>> set = mMap.entrySet();
		Iterator<Map.Entry<Integer,FBRPEntry>> itr = set.iterator();
		while (itr.hasNext())
		{
			Map.Entry<Integer,FBRPEntry> me = itr.next();
			FBRPEntry fbrpent =  me.getValue();
			if (fbrpent.count>max_count)
			{
				mMax_count = me;
				max_count = fbrpent.count;
				mMax_count_depth = depth;
			}
			depth += fbrpent.count;
		}
		
//		FBRPPrintf("//////////////////////////\n");
//		for (i=0, itr = mMap.rbegin(); i<25 && itr != mMap.rend(); itr++, i++)
//		{
//			FBRPPrintf("i=%d c=%d p=%f,q=%f\n",itr->first, itr->second.count, itr->second.total_p, itr->second.total_q);
//		}
	}


	void Clear()
	{
		mMap = new TreeMap<Integer,FBRPEntry>();
					   
		mNum_above_accuracy_limit=0;
	}	
	
	
}
