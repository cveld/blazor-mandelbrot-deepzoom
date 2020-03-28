//	SFTPalette
//	Converts iteration counts into colours
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

import java.awt.Color;

/*
interface IPaletteChangeNotify
{
	void PaletteChanged();
}
*/
class SFTPaletteVeryOld implements IPalette
{

	@Override
	public int GetColour(int i)
	{
		return 0xff000000+i + ((i*7 & 255)<<8) + ((i*31 & 255)<<16);
	}
	public int GetAverageColour(int i0, int i1, int i2, int i3)
	{
		return 0;
	}
	public int GetAverageColour(int i0, int i1, int i2, int i3,int i4, int i5, int i6, int i7, int i8)
	{
		return 0;
	}
}


class PaletteBand
{
	int mFirst;
	int mWidth;
	int mPeriod;
	int mRed_inc;
	int	mGrn_inc;
	int mBlu_inc;
	int mRed_scale_int;
	int mGrn_scale_int;
	int mBlu_scale_int;
	float mRed_scale;
	float mGrn_scale;
	float mBlu_scale;
	
	public PaletteBand(int aFirst, int aWidth, int aPeriod, int aRed_inc, int aGrn_inc, int aBlu_inc, int aRed_scale, int aGrn_scale, int aBlu_scale)
	{
		mFirst=aFirst;
		mWidth=aWidth;
		mPeriod=aPeriod;
		mRed_inc=aRed_inc;
		mGrn_inc=aGrn_inc;
		mBlu_inc=aBlu_inc;
		mRed_scale_int=aRed_scale;
		mGrn_scale_int=aGrn_scale;
		mBlu_scale_int=aBlu_scale;

		UpdateScale();
	}
	
	void UpdateScale()
	{
		mRed_scale = mRed_scale_int*1.0f/255.0f * (255-mRed_inc)/255.0f;
		mGrn_scale = mGrn_scale_int*1.0f/255.0f * (255-mGrn_inc)/255.0f;
		mBlu_scale = mBlu_scale_int*1.0f/255.0f * (255-mBlu_inc)/255.0f;

	}
	
	void Apply(int[] aColour, int i)
	{
		if (mWidth==0)
			return;
		
		i -= mFirst;
		if (mPeriod!=0)
			i = i % mPeriod;

		if (i>0 && i<mWidth)
		{
			aColour[0] *= mRed_scale;
			aColour[1] *= mGrn_scale;
			aColour[2] *= mBlu_scale;
			
			aColour[0] += mRed_inc;
			aColour[1] += mGrn_inc;
			aColour[2] += mBlu_inc;
		}
	}
	
	public int[] Get()
	{
		int [] res = new int[9];
		
		res[0] = mFirst;
		res[1] = mWidth;
		res[2] = mPeriod;
		
		res[3] = mRed_inc;
		res[4] = mGrn_inc;
		res[5] = mBlu_inc;

		res[6] = mRed_scale_int;
		res[7] = mGrn_scale_int;
		res[8] = mBlu_scale_int;
	
		return res;
	}
	public int[] Set(int[] aBand)
	{
		int [] res = new int[9];
		
		mFirst=aBand[0];
		mWidth=aBand[1];
		mPeriod=aBand[2];
		
		mRed_inc=aBand[3];
		mGrn_inc=aBand[4];
		mBlu_inc=aBand[5];

		mRed_scale_int = aBand[6];
		mGrn_scale_int = aBand[7];
		mBlu_scale_int = aBand[8];
		
		UpdateScale();
	
		return res;
	}
	
	public String ToString()
	{
		String str="";
		str+= mFirst;
		str+=",";
		str+= mWidth;
		str+=",";
		str+= mPeriod;
		str+=",";
		str+= mRed_inc;
		str+=",";
		str+=	mGrn_inc;
		str+=",";
		str+= mBlu_inc;
		str+=",";
		str+= mRed_scale_int;
		str+=",";
		str+= mGrn_scale_int;
		str+=",";
		str+= mBlu_scale_int;		
		str+="\n";
		return str;
	}
	public void ParseString(String aString)
	{
		String numbers[] = aString.split(",");
		
		mFirst = Integer.parseInt(numbers[0]);
		mWidth = Integer.parseInt(numbers[1]);
		mPeriod = Integer.parseInt(numbers[2]);
		mRed_inc = Integer.parseInt(numbers[3]);
		mGrn_inc = Integer.parseInt(numbers[4]);
		mBlu_inc = Integer.parseInt(numbers[5]);
		mRed_scale_int = Integer.parseInt(numbers[6]);
		mGrn_scale_int = Integer.parseInt(numbers[7]);
		mBlu_scale_int = Integer.parseInt(numbers[8]);

		UpdateScale();
	}
}


public class SFTPaletteOld implements IPalette
{
	public static int NUM_BANDS=6;
	int mPalette[];
	IPaletteChangeNotify mNotify;
	int mEnd_colour;
	
	float mDr_di1;
	float mDg_di1;
	float mDb_di1;

	float mDr_di2;
	float mDg_di2;
	float mDb_di2;
	
	float mDecay_r;
	float mDecay_g;
	float mDecay_b;
	
	int mStart_red;
	int mStart_grn;
	int mStart_blu;
	
	int mColour[];
	PaletteBand mBands[];
	
	public SFTPaletteOld(IPaletteChangeNotify aNotify)
	{
		mNotify = aNotify;
		
		mPalette = new int[0x10000];
		
		mDr_di1 = 0.1230459405F;
		mDg_di1 = 0.0039432465F;
		mDb_di1 = 0.0274356756F;
		
		mDr_di2 = 0.0730459405F;
		mDg_di2 = 0.0079432465F;
		mDb_di2 = 0.0224356756F;
		
		mDecay_r = 5000;
		mDecay_g = 10000;
		mDecay_b = 20000;
		
		mEnd_colour = 0xff000000;
		
		mColour = new int[3];
		
		mBands = new PaletteBand[NUM_BANDS];
		mBands[0]=  new PaletteBand(5000, 256, 5000, 0,0,0,  208,255,255);
		mBands[1]=  new PaletteBand(3000, 256, 4444, 28,0,0,  255,191,191);
		mBands[2]=  new PaletteBand(7000, 512, 7777, 0,0,0,  255, 255, 224);
		mBands[3]=  new PaletteBand(8500, 256, 9532, 0,0,0,  221, 221, 255);
		mBands[4]=  new PaletteBand(0, 0, 0, 0,0,0,  255, 255, 255);
		mBands[5]=  new PaletteBand(0, 0, 0, 0,0,0,  255, 255, 255);
	}
	
	@Override
	public int GetColour(int i)
	{
		if (i==0)
			return mEnd_colour;
		
		i &= 0xffff;
		if (mPalette[i]!=0)
			return mPalette[i];
		
		//int red = (int)(256*(i*(0.1230459405F + (0.05*(Math.exp(-i/5000.0)-1)) )));// + Math.sin(i*0.033)));
		//int blu = (int)(256*(i*(0.0039432465F - (0.004*(Math.exp(-i/10000.0)-1)) )));// + Math.sin(i*0.007)));
		//int grn = (int)(256*(i*(0.0274356756F + (0.005*(Math.exp(-i/20000.0)-1)) )));// + Math.sin(i*0.0073)));
		
		int red = mStart_red + (int)(256*(i*(mDr_di1 + (1-Math.exp(-i/mDecay_r))*(mDr_di2-mDr_di1) )));// + Math.sin(i*0.033)));
		int blu = mStart_blu + (int)(256*(i*(mDg_di1 + (1-Math.exp(-i/mDecay_g))*(mDg_di2-mDg_di1) )));// + Math.sin(i*0.007)));
		int grn = mStart_grn + (int)(256*(i*(mDb_di1 + (1-Math.exp(-i/mDecay_b))*(mDb_di2-mDb_di1) )));// + Math.sin(i*0.0073)));

		mColour[0] = red & 255;
		mColour[1] = grn & 255;
		mColour[2] = blu & 255;
		
		
		
/*		red *= 1-Math.pow(Math.sin(6.28*i/10000), 1000);
		
		double fraction = 0.5*Math.pow(Math.sin(6.28*i/11000), 1000);
		red = (int)(fraction * 255 + (1-fraction)*red);
		grn *= 1-fraction;
		blu *= 1-fraction;
*/		
		for (int j=0; j< mBands.length; j++)
		{
			mBands[j].Apply(mColour, i);
		}

		mPalette[i] = 0xff000000+mColour[2] + ((mColour[1])<<8) + (mColour[0]<<16);
		return mPalette[i];
	}

	
	public int GetAverageColour(int i0, int i1, int i2, int i3)
	{
		int c1,c2,c3,c4,c;
		
		c1 = GetColour(i0);
		c2 = GetColour(i1);
		c3 = GetColour(i2);
		c4 = GetColour(i3);
		
		c = ((c1&0xff)+(c2&0xff)+(c3&0xff)+(c4&0xff)+2)>>2;
		c += (((c1&0xff00)+(c2&0xff00)+(c3&0xff00)+(c4&0xff00)+2)>>2) & 0xff00;
		c += (((c1&0xff0000)+(c2&0xff0000)+(c3&0xff0000)+(c4&0xff0000)+2)>>2) & 0xff0000;
		c += 0xff000000;
		return c;
	}
	public int GetAverageColour(int i0, int i1, int i2, int i3,int i4, int i5, int i6, int i7, int i8)
	{
		int c1,c2,c3,c4,c5,c6,c7,c8,c9,c;
		
		c1 = GetColour(i0);
		c2 = GetColour(i1);
		c3 = GetColour(i2);
		c4 = GetColour(i3);
		c5 = GetColour(i4);
		c6 = GetColour(i5);
		c7 = GetColour(i6);
		c8 = GetColour(i7);
		c9 = GetColour(i8);
		
		c = ((c1&0xff)+(c2&0xff)+(c3&0xff)+(c4&0xff)+(c5&0xff)+(c6&0xff)+(c7&0xff)+(c8&0xff)+(c9&0xff)+4)/9;
		c += (((c1&0xff00)+(c2&0xff00)+(c3&0xff00)+(c4&0xff00)+(c5&0xff00)+(c6&0xff00)+(c7&0xff00)+(c8&0xff00)+(c9&0xff00)+4)/9) & 0xff00;
		c += (((c1&0xff0000)+(c2&0xff0000)+(c3&0xff0000)+(c4&0xff0000)+(c5&0xff0000)+(c6&0xff0000)+(c7&0xff0000)+(c8&0xff0000)+(c9&0xff0000)+4)/9) & 0xff0000;
		c += 0xff000000;
		return c;
	}
	public void GetGradientValues(float pGradient[][], Color aColours[])
	{
		pGradient[0][0]=mDr_di1;
		pGradient[0][1]=mDr_di2;
		pGradient[0][2]=mDecay_r;

		pGradient[1][0]=mDg_di1;
		pGradient[1][1]=mDg_di2;
		pGradient[1][2]=mDecay_g;
	
		pGradient[2][0]=mDb_di1;
		pGradient[2][1]=mDb_di2;
		pGradient[2][2]=mDecay_b;
		
		aColours[0] = new Color( mStart_red, mStart_grn, mStart_blu);
		aColours[1] = new Color( (mEnd_colour>>16)&255, (mEnd_colour>>8)&255, (mEnd_colour>>0)&255);

	}

	public void SetGradientValues(float pGradient[][], Color aStart, Color aEnd)
	{

		mDr_di1=pGradient[0][0];
		mDr_di2=pGradient[0][1];
		mDecay_r=pGradient[0][2];

		mDg_di1=pGradient[1][0];
		mDg_di2=pGradient[1][1];
		mDecay_g=pGradient[1][2];
	
		mDb_di1=pGradient[2][0];
		mDb_di2=pGradient[2][1];
		mDecay_b=pGradient[2][2];
		
		
		mPalette = new int[0x10000];
		
		mEnd_colour = aEnd.getRGB() | 0xff000000;
		mStart_red = aStart.getRed();
		mStart_grn = aStart.getGreen();
		mStart_blu = aStart.getBlue();
		
		mNotify.PaletteChanged();
	}
	
	public int[] GetBand(int index)
	{
		return mBands[index].Get();
	}
	
	public int[] SetBand(int index, int aBand[])
	{		
		return mBands[index].Set(aBand);
	}
	
	public String ToString()
	{
		String str="sft_palette\n";
		str += mDr_di1;
		str += ",";
		str += mDr_di2;
		str += ",";
		str += mDecay_r;
		str += "\n";

		str += mDg_di1;
		str += ",";
		str += mDg_di2;
		str += ",";
		str += mDecay_g;
		str += "\n";

		str += mDb_di1;
		str += ",";
		str += mDb_di2;
		str += ",";
		str += mDecay_b;
		str += "\n";

		str += mStart_red;
		str += ",";
		str += mStart_grn;
		str += ",";
		str += mStart_blu;
		str += "\n";
		
		str += (mEnd_colour>>16) & 255;
		str += ",";
		str +=  (mEnd_colour>>8) & 255;
		str += ",";
		str +=  (mEnd_colour>>0) & 255;
		str += "\n";


		for (int i=0; i<NUM_BANDS; i++)
		{
			String s = mBands[i].ToString();
			str += s;
		}
		return str;
	}
	
	public void ParseString(String aString)
	{
		String[] lines = aString.split("\n");
	
		if (!lines[0].contentEquals("sft_palette"))
			return;
		
		String[] numbers = lines[1].split(",");
		mDr_di1 = Float.parseFloat(numbers[0]);	
		mDr_di2 = Float.parseFloat(numbers[1]);	
		mDecay_r = Float.parseFloat(numbers[2]);	

		numbers = lines[2].split(",");
		mDg_di1 = Float.parseFloat(numbers[0]);	
		mDg_di2 = Float.parseFloat(numbers[1]);	
		mDecay_g = Float.parseFloat(numbers[2]);	
		
		numbers = lines[3].split(",");
		mDb_di1 = Float.parseFloat(numbers[0]);	
		mDb_di2 = Float.parseFloat(numbers[1]);	
		mDecay_b = Float.parseFloat(numbers[2]);	

		numbers = lines[4].split(",");
		mStart_red = Integer.parseInt(numbers[0]);	
		mStart_grn = Integer.parseInt(numbers[1]);	
		mStart_blu = Integer.parseInt(numbers[2]);	
	
		numbers = lines[5].split(",");
		int r = Integer.parseInt(numbers[0]);	
		int g = Integer.parseInt(numbers[1]);	
		int b = Integer.parseInt(numbers[2]);	
		
		mEnd_colour  =(r<<16)+(g<<8)+b + 0xff000000;

		for (int i=0; i<NUM_BANDS; i++)
		{
			mBands[i].ParseString( lines[6+i]);
		}
		
		mPalette = new int[0x10000];
		mNotify.PaletteChanged();
	}
}
