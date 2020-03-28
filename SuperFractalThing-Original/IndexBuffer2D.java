//	IndexBuffer2D
//	Stores the results of a Mandelbrot set calculation, and builds the final texture
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
import java.awt.image.BufferedImage;


interface IPalette
{
	public int GetColour(int aIndex);
	public int GetAverageColour(int i0, int i1, int i2, int i3);
	public int GetAverageColour(int i0, int i1, int i2, int i3,int i4, int i5, int i6, int i7, int i8);
}

enum SuperSampleType
{
	SUPER_SAMPLE_NONE,
	SUPER_SAMPLE_2X,
	SUPER_SAMPLE_4X,	
	SUPER_SAMPLE_4X_9,		
	SUPER_SAMPLE_9X		
}

public class IndexBuffer2D
{
	public IndexBuffer2D( int aWidth, int aHeight)
	{
		mBuffer=new int[aWidth * aHeight];
		mWidth = aWidth;
		mHeight = aHeight;
		mStride = aWidth;
	}
	
	public IndexBuffer2D( int aBuffer[], int aWidth, int aHeight, int aStride, int aOffset)
	{
		mBuffer=aBuffer;
		mWidth = aWidth;
		mHeight = aHeight;
		mStride = aStride;
		mOffset = aOffset;
	}	
	
	public void Set(int x, int y, int aValue)
	{
		mBuffer[mOffset+x+y*mStride]=aValue;
	}
	public int GetValue(int x, int y)
	{
		return mBuffer[mOffset+x+y*mStride];
	}
	public int GetOffsetY()
	{
		return mOffset/mStride;
	}
	public int GetValueSafe(int x, int y)
	{
		if (x<0)
			x=0;
		if (x>=mWidth)
			x = mWidth-1;
		
		if (y<0)
			y=0;
		if (y>=mHeight)
			y = mHeight-1;
		return mBuffer[mOffset+x+y*mStride];
	}
	
	public void Clear(int pValue)
	{
		int x,y;
		for (y=0; y<mHeight; y++)
			for (x=0; x<mWidth; x++)
				Set( x,y, pValue );
	}
	
	public IndexBuffer2D SubBuffer( int x1, int y1, int x2, int y2 )
	{
		return new IndexBuffer2D(mBuffer, x2-x1,y2-y1, mStride, y1*mStride+x1+mOffset);
	}
	
	public int GetWidth()
	{
		return mWidth;
	}
	public int GetHeight()
	{
		return mHeight;
	}
	float GetAspectRatio()
	{
		return (float)mWidth/mHeight;
	}	
	
	BufferedImage MakeTexture( IPalette aPalette, SuperSampleType aSuper_sample)
	{
		BufferedImage image=null;
		int x,y,i,j,k,l,m,n,o,p,q, w,h,y2;

		try
		{
			switch (aSuper_sample)
			{
			case SUPER_SAMPLE_NONE:
				image = new BufferedImage(mWidth, mHeight, BufferedImage.TYPE_INT_ARGB);
			
				for (y=0,y2=mHeight-1; y<mHeight; y++,y2--)
					for (x=0; x<mWidth; x++)
					{
						i=GetValue(x,y);
			       		image.setRGB(x, y2,aPalette.GetColour(i));	
			       	 				
					}
				break;
			case SUPER_SAMPLE_2X:
				w = mWidth-1;
				h = mHeight/2;
				image = new BufferedImage(w, h, BufferedImage.TYPE_INT_ARGB);
				
				for (y=0,y2=h-1; y<h; y++,y2--)
					for (x=0; x<w; x++)
					{
						i=GetValue(x,y);
						j=GetValue(x,y+1);
						k=GetValue(x,y+h+1);
						l=GetValue(x+1,y+h+1);
			       		image.setRGB(x, y2,aPalette.GetAverageColour(i,j,k,l));					
					}
				break;
			case SUPER_SAMPLE_4X:
				w = mWidth/2;
				h = mHeight/2;
				image = new BufferedImage(w, h, BufferedImage.TYPE_INT_ARGB);
				
				for (y=0,y2=mHeight-2; y<mHeight; y+=2,y2-=2)
					for (x=0; x<mWidth; x+=2)
					{
						i=GetValue(x,y);
						j=GetValue(x,y+1);
						k=GetValue(x+1,y+1);
						l=GetValue(x+1,y);
			       		image.setRGB(x/2, y2/2,aPalette.GetAverageColour(i,j,k,l));					
					}
				break;
			case SUPER_SAMPLE_4X_9:
				w = mWidth/2;
				h = mHeight/2;
				image = new BufferedImage(w, h, BufferedImage.TYPE_INT_ARGB);
				
				for (y=0,y2=mHeight-3; y<mHeight-1; y+=2,y2-=2)
					for (x=0; x<mWidth-1; x+=2)
					{
						i=GetValue(x,y);
						j=GetValue(x,y+1);
						k=GetValue(x+1,y+1);
						l=GetValue(x+1,y);
						m=GetValue(x+2,y);
						n=GetValue(x+2,y+1);
						o=GetValue(x+2,y+2);
						p=GetValue(x+1,y+2);
						q=GetValue(x,y+2);
			       		image.setRGB(x/2, y2/2,aPalette.GetAverageColour(i,j,k,l,m,n,o,p,q));					
					}
				break;
			case SUPER_SAMPLE_9X:
				w = mWidth/3;
				h = mHeight/3;
				image = new BufferedImage(w, h, BufferedImage.TYPE_INT_ARGB);
				
				for (y=0,y2=mHeight-2; y<mHeight; y+=3,y2-=3)
					for (x=0; x<mWidth; x+=3)
					{
						i=GetValue(x,y);
						j=GetValue(x,y+1);
						k=GetValue(x+1,y+1);
						l=GetValue(x+1,y);
						m=GetValue(x+2,y);
						n=GetValue(x+2,y+1);
						o=GetValue(x+2,y+2);
						p=GetValue(x+1,y+2);
						q=GetValue(x,y+2);
			       		image.setRGB(x/3, y2/3,aPalette.GetAverageColour(i,j,k,l,m,n,o,p,q));					
					}
				break;
			}
		}
		catch (OutOfMemoryError e)
		{
			return null;
		}
		return image;
	}
	
	int mWidth;
	int mHeight;
	int mStride;
	int mOffset;
	int mBuffer[];
}
