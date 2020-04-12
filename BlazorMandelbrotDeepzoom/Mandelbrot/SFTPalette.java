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
import java.awt.Graphics2D;
import java.awt.image.BufferedImage;

interface IPaletteChangeNotify
{
	void PaletteChanged();
}


public class SFTPalette implements IPalette
{
	int mPalette[];
	IPaletteChangeNotify mNotify;
    
    public static final int NMIXERS = 6;
    public static final int SINE = 0;
    public static final int GAUSSIAN = 1;
    public static final int LINEAR_RAMP = 2;
    public static final int LINEAR_BI_RAMP = 3;
    public static final int EXP_RAMP = 4;
    public static final int EXP_BI_RAMP = 5;
    public static final int STRIPE = 6;
    public static final int UNDEFINED = 7;
    public static final String[] typeNames = {"Sine", "Gaussian", "Linear Ramp", 
    	"Linear Bi-Ramp", "Exp Ramp", "Exp Bi-Ramp", "Stripe", "Undefined"};
	int mEnd_colour;
	public static int indexClamp = 0xffff;
    
	int mColour[];
    double minMixColor[] = {-1, -1, -1};
    double maxMixColor[] = {1e99, 1e99, 1e99};
    double colorMapMixArray[][];
    
    public static double globalPhase = 0;
    public static double[] cMapPhase = new double[NMIXERS];
    
    SFTColormap[] cm = new SFTColormap[NMIXERS];
    double[] mixerValues = new double[NMIXERS];
    static int currentColormap = 0;
    
	public SFTPalette(IPaletteChangeNotify aNotify)
	{
		mNotify = aNotify;
		
		mPalette = new int[indexClamp];
		      
		mColour = new int[3];
        
        for (int i=0; i<NMIXERS; i++) {
        	cMapPhase[i] = 0;
        	mixerValues[i] = 0;
            cm[i] = new SFTColormap(i);
        }
        colorMapMixArray = new double[3][1000];
        mixerValues[0] = 1;
               
        setColorRanges();
    }
	
	@Override
	public int GetColour(int i)
	{
        double co[] = new double[3];
        
		if (i==0)
			return mEnd_colour;
		
		i %= indexClamp;
		if (i > indexClamp)
			System.out.format("GetColour i = %d%n", i);
		
		if (mPalette[i]!=0)
			return mPalette[i];
        
        co = mixColor(i, true, true);
    	
        for (int ci=0; ci<3; ci++)
        {
        	if (co[ci] > 1 || co[ci] < 0)
        		System.out.format("co[%d] out of bounds: %f%n", ci, co[ci]);
            mColour[ci] = ((int) (co[ci]*255)) & 255;
        }
        
		mPalette[i] = 0xff000000+mColour[2] + ((mColour[1])<<8) + (mColour[0]<<16);
		return mPalette[i];
	}
    
	public double[] mixColor(int i, boolean scale, boolean clip)
	{
        double co[] = new double[3];
        
        double fco[][] = new double[NMIXERS][3];
        
        for (int m=0; m<NMIXERS; m++) {
            co = cm[m].getColor(i);
            for (int ci=0; ci<3; ci++)
                fco[m][ci] = co[ci];
        }
        
        for (int m=0; m<NMIXERS; m++) {
            fco[m] = hsl2rgb(fco[m], false);
        }
        
        for (int ci=0; ci<3; ci++)
            co[ci] = 0;
        for (int m=0; m<NMIXERS; m++) {
            for (int ci=0; ci<3; ci++)
                co[ci] += mixerValues[m]*fco[m][ci];
        }

        if (scale)
        	if (maxMixColor[0] > 1 || maxMixColor[1] > 1 || maxMixColor[2] > 1) {
//        		System.out.format("maxMixColor: %g, %g, %g%n", maxMixColor[0], maxMixColor[1], maxMixColor[2]);
//        		System.out.format("co in: %g, %g, %g%n", co[0], co[1], co[2]);
        		for (int ci=0; ci<3; ci++) 
        			co[ci] /= maxMixColor[ci];
//        		if (co[0] > 1 || co[1] > 1 || co[2] > 1) {
//        			System.out.format("maxMixColor: %g, %g, %g%n", maxMixColor[0], maxMixColor[1], maxMixColor[2]);
//        			System.out.format("co scaled: %g, %g, %g%n", co[0], co[1], co[2]);
//        		}
        	}
        
        if (clip)
        	for (int ci=0; ci<3; ci++) {
        		if (co[ci] < 0)
        			co[ci] = 0;
        		else if (co[ci] > 1)
        			co[ci] = 1;
        	}

		return co;
	}
    
    public void setColorRanges() {
        for (int p=0; p<3; p++) {
            minMixColor[p] = 1e99;
            maxMixColor[p] = -1;
        }
        
        for (int i=0; i<colorMapMixArray[0].length; i++) {
            for (int p=0; p<3; p++) {
                if (colorMapMixArray[p][i] < minMixColor[p])
                    minMixColor[p] = colorMapMixArray[p][i];
                else if (colorMapMixArray[p][i] > maxMixColor[p])
                    maxMixColor[p] = colorMapMixArray[p][i];
            }
        }
//    	System.out.format("maxMixColor: %g, %g, %g%n", maxMixColor[0], maxMixColor[1], maxMixColor[2]);
    	if (mNotify != null)
    		mNotify.PaletteChanged();
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
    
    public BufferedImage drawCMap(int cMap, int h, int w, double period) {
        double co[] = new double[3];
        int ico[] = new int[3];
    	if (cMap == -1)
    		for (int p=0; p<3; p++) 
    			colorMapMixArray[p] = new double[w+1];
        

        BufferedImage pImage = new BufferedImage(w, h, BufferedImage.TYPE_INT_ARGB);
		Graphics2D g2d = pImage.createGraphics();
		if (cMap == -1) {
			for (int i=0; i<=w; i++) {
				int ii = (int) (SFTComponentmap.colorFrequency*period*((double)i/w));

				co =  mixColor(ii, false, false);
				for (int p=0; p<3; p++)
					colorMapMixArray[p][i] = co[p];
			}
			
			setColorRanges();
		}
		for (int i=0; i<=w; i++) {
			int ii = (int) (SFTComponentmap.colorFrequency*period*((double)i/w));

			if (cMap == -1) {
				g2d.setColor(new Color(GetColour(ii)));
			}
			else if (cMap < NMIXERS) {
				if (Math.abs(mixerValues[cMap]) > 0) {
					co = cm[cMap].getColor(ii);
					co = hsl2rgb(co, false);
					for (int ci=0; ci<3; ci++)
						ico[ci] = ((int) (Math.abs(mixerValues[cMap])*co[ci]*255)) & 255;
					g2d.setColor(new Color(0xff000000+ico[2] + ((ico[1])<<8) + (ico[0]<<16)));
				} else {
					g2d.setColor(Color.black);
				}
			}
			g2d.drawLine(i, 0, i, h);
		}
        g2d.drawImage(pImage,0,0,null);
		g2d.dispose();
//    	System.out.format("done drawCMap%n");

		return pImage;
    }
    
    public void setMixRange() {
        double co[] = new double[3];
    	double[][] f = getCmapFrequencies();
    	double[][] a = getCmapAmplitudes();
    	double maxFreq = 1e8;
    	for (int i=0; i<NMIXERS; i++)
    		for (int j=0; j<3; j++)
    			if (f[i][j] < maxFreq & f[i][j] > 0 & a[i][j] > 0)
    				maxFreq = f[i][j];
    	
    	double period = 2/maxFreq;
    	
		for (int i=0; i<=PaletteDisplay.getScaledWidth(); i++) {
			int ii = (int) (SFTComponentmap.colorFrequency*period*((double)i/PaletteDisplay.getScaledWidth()));

			co =  mixColor(ii, false, false);
			for (int p=0; p<3; p++)
				colorMapMixArray[p][i] = co[p];
		}	
		setColorRanges();
	}

    public double[][] getCmapFrequencies() {
    	double[][] f = new double[NMIXERS][3];
    	
    	for (int i=0; i<NMIXERS; i++)
    		if (mixerValues[i] > 0)
    			f[i] = cm[i].getFrequencies();
    	return f;
    }
    
    public double[][] getCmapAmplitudes() {
    	double[][] a = new double[NMIXERS][3];
    	
    	for (int i=0; i<NMIXERS; i++)
    		if (mixerValues[i] > 0)
    			a[i] = cm[i].getAmplitudes();
    	return a;
    }
    
    public void GetGradientValues(double m[], double pSine[][], Color aColours[])
	{
        cm[currentColormap].getValues(pSine);
        for (int i=0; i<NMIXERS; i++)
            m[i] = mixerValues[i];
		aColours[1] = new Color( (mEnd_colour>>16)&255, (mEnd_colour>>8)&255, (mEnd_colour>>0)&255);
	}

	public void SetGradientValues(double m[], double pSine[][], Color aEnd)
	{
        cm[currentColormap].setValues(pSine);
        for (int i=0; i<NMIXERS; i++)
            mixerValues[i] = m[i];
//        setColorRanges();
		mPalette = new int[indexClamp];
		mEnd_colour = aEnd.getRGB() | 0xff000000;

		mNotify.PaletteChanged();
	}
    
	public static double getGlobalPhase() {
		return globalPhase;
	}
	
	public static double getCMapPhase(int mapNumber) {
		return cMapPhase[mapNumber];
	}
	
	public boolean getChanged(int mapNumber) {
		return cm[mapNumber].getChanged();
	}
	
	public static void setGlobalPhase(double aGlobalPhase) {
		globalPhase = aGlobalPhase;
	}
	
	public static void setCMapPhase(double aCMapPhase) {
		cMapPhase[currentColormap] = aCMapPhase;
	}
	
	void setCurrentColormap(int colormap)
	{
        currentColormap = colormap;
	}
    
	void setCmapType(int mixer, int hslBaseType)
	{
        cm[mixer].setGlobalType(hslBaseType);
	}
    
	void setCmapType(int mixer, int component, int hslComponentType)
	{
        cm[mixer].setComponentType(component, hslComponentType);
	}
    
	void setCmapType(int hslBaseType[], int hslComponentType[][])
	{
        for (int m=0; m<NMIXERS; m++) {
//            System.out.format("setCmapType mixer %d%n", m);
            cm[m].setGlobalType(hslBaseType[m]);
            for (int i=0; i<3; i++) {
//                System.out.format("setCmapType mixer %d component %d%n", m, i);
                cm[m].setComponentType(i, hslComponentType[m][i]);
            }
        }
	}
    
	void getCmapType(int hslBaseType[], int hslComponentType[][])
	{
        for (int m=0; m<NMIXERS; m++) {
            hslBaseType[m] = cm[m].cmapType;
            for (int i=0; i<3; i++)
                hslComponentType[m][i] = cm[m].getComponentType(i);
        }
	}
    
    public double[]  rgb2hsl( double[] rgb, boolean debug)
    {
        
        //int huezone = 0;
        //double rr, gg, bb;
        double hp = 0;
        double h, s, l;
        double r = rgb[0];
        double g = rgb[1];
        double b = rgb[2];
        
        double cMax = Math.max(Math.max(r, g), Math.max(g, b));
        double cMin = Math.min(Math.min(r, g), Math.min(g, b));
        double chroma = cMax - cMin;
        
        if (chroma == 0) {
            hp = -1;
        } else if (cMax == r) {
            hp = (g - b)/chroma % 6f;
        } else if (cMax == g) {
            hp = (b - r)/chroma + 2f;
        } else if (cMax == b) {
            hp = (r - g)/chroma + 4f;
        }
        h = hp*60f;
        l = (cMax + cMin)/2f;
        if (chroma == 0)
            s = 0;
        else {
            s = chroma/(1f - Math.abs(2f*l - 1f));
        }
        if (h < 0)
            h = h + 360;
        
        return new double[] { h, s, l };
    }
    
   
    public double[] hsl2rgb( double[] hsl, boolean debug )
    {
        double r = 0;
        double g = 0;
        double b = 0;
        double h = hsl[0];
        double s = hsl[1];
        double l = hsl[2];
        
        double chroma = (1 - Math.abs(2*l - 1))*s;
        double hp = h/60f;
        double x = chroma*(1 - Math.abs(hp % 2f - 1));
        if (debug == true) {
            System.out.format("chroma = %f, hp = %f, x = %f%n", chroma, hp, x);
        }

        if (hp == -1) {
            r = 0; g = 0; b = 0;
        } else if (hp < 1 && hp >= 0) {
            r = chroma; g = x; b = 0;
        } else if (hp < 2) {
            r = x; g = chroma; b = 0;
        } else if (hp < 3) {
            r = 0; g = chroma; b = x;
        } else if (hp < 4) {
            r = 0; g = x; b = chroma;
        } else if (hp < 5) {
            r = x; g = 0; b = chroma;
        } else if (hp <= 6) {
            r =chroma; g = 0; b = x;
        }
        double m = l - chroma/2f;
        r = r + m;
        g = g + m;
        b = b + m;
        
        return new double[] { r, g, b };
    }
    
	public String ToString()
	{
		String str="sft_palette\n";
        for (int i=0; i<NMIXERS; i++) {
            str += mixerValues[i];
			str += ",";
        }
		str += "\n";
        str += globalPhase;
		str += "\n";
        for (int i=0; i<NMIXERS; i++) {
        	str += cMapPhase[i];
        	if (i<NMIXERS-1)
        		str += ",";
        }
		str += "\n";
        for (int i=0; i<NMIXERS; i++)
        	str += cm[i].valueString();
		return str;
	}
	
	public void ParseString(String aString)
	{
//        System.out.format("%s%n", aString);
		String[] lines = aString.split("\n");
	
		if (!lines[0].contentEquals("sft_palette"))
			return;
		
		String[] numbers = lines[1].split(",");
        for (int i=0; i<NMIXERS; i++) {
            mixerValues[i] = Float.parseFloat(numbers[i]);
        }
        globalPhase = Float.parseFloat(lines[2]);
		numbers = lines[3].split(",");
        for (int i=0; i<NMIXERS; i++) {
        	cMapPhase[i] = Float.parseFloat(numbers[i]);
        }
        for (int i=0; i<NMIXERS; i++) {
        	int starti = 4+4*i;
        	String cString[] = new String[4];
        	for (int j=0; j<4; j++)
        		cString[j] = lines[starti+j];
        	cm[i].parseValueString(cString);
        }        
 		mPalette = new int[indexClamp];
		mNotify.PaletteChanged();
	}
}

class SFTColormap
{
    public static final int HUE = 0;
    public static final int SATURATION = 1;
    public static final int LUMINANCE = 2;
    public int cmapType = SFTPalette.SINE;
    public int mapNumber = -1;
    boolean changed = false;
    
    SFTComponentmap[] HSLComponents = new SFTComponentmap[3];
    
    public SFTColormap(int aMapNumber) {
    	mapNumber = aMapNumber;
        setGlobalType(SFTPalette.SINE);
    }
    
    public double[] getColor(int i) {
        double[] co = new double[3];
        
        for (int ci=0; ci<3; ci++) {
            co[ci] = HSLComponents[ci].getColor(i, mapNumber);
            while (co[ci] > 1)
                co[ci] = co[ci] - 1;
        }
        co[HUE] = co[HUE]*360;
        
        return co;
    }
    
    public void getValues(double v[][]) {
//    	System.out.format("SFTColormap.getValues for map %d, chaged = %b%n", mapNumber, changed);    		
        for (int i=0; i<3; i++) {
        	if (!changed)
        		HSLComponents[i].setDefaults();
            HSLComponents[i].getValues(v[i]);
//        	System.out.format("component %d values:", i);    		
//        	for (int j=0; j<6; j++)
//            	System.out.format(" %f", v[i][j]);    		
//        	System.out.format("%n");        
        }
    }
    
    public void setValues(double v[][]) {
//    	System.out.format("SFTColormap.setValues for map %d, chaged = %b%n", mapNumber, changed);    
    	
        for (int i=0; i<3; i++) {
        	double[] d = HSLComponents[i].getDefaults();
        	for (int c=0; c<5; c++) {
        		if (d[c] != v[i][c])
        			changed = true;
        	}
        }
        if (changed)
        	for (int i=0; i<3; i++) {
        		HSLComponents[i].setValues(v[i]);
//        		System.out.format("component %d values:", i);    		
//        		for (int j=0; j<6; j++)
//        			System.out.format(" %f", v[i][j]);    		
//        		System.out.format("%n");  
        	}
    }
    
    public double[] getFrequencies() {
    	double[] v = new double[3];
    	
        for (int i=0; i<3; i++) 
            v[i] = HSLComponents[i].sFreq * HSLComponents[i].sFreqScale;
        
        return v;
    }
    
    public double[] getAmplitudes() {
    	double[] v = new double[3];
    	
        for (int i=0; i<3; i++) 
            v[i] = HSLComponents[i].sAmp;
        
        return v;
    }
    
    public boolean getChanged() {
    	return changed;
    }
    
    public void setGlobalType(int globalType) {
//        System.out.format("setGlobalType, globalType = %d%n", globalType);
        
        if (cmapType != globalType)
            cmapType = globalType;
        if (cmapType != SFTPalette.UNDEFINED)
            for (int i=0; i<3; i++) {
                setComponentType(i, globalType);
            }
//        System.out.format("Global type is now %s%n", SFTPalette.typeNames[cmapType]);
    }
    
    public void setComponentType(int component, int componentType) {
        if (HSLComponents[component] == null || HSLComponents[component].cmapType != componentType) {
            if (HSLComponents[component] != null)
                HSLComponents[component] = null;
            switch (componentType) {
                case SFTPalette.SINE:
                    HSLComponents[component] = new sineSFTComponentmap();
                    break;
                case SFTPalette.GAUSSIAN:
                    HSLComponents[component] = new gaussianSFTComponentmap();
                    break;
                case SFTPalette.LINEAR_RAMP:
                    HSLComponents[component] = new linearRampSFTComponentmap();
                    break;
                case SFTPalette.LINEAR_BI_RAMP:
                    HSLComponents[component] = new linearBiRampSFTComponentmap();
                    break;
                case SFTPalette.EXP_RAMP:
                    HSLComponents[component] = new expRampSFTComponentmap();
                    break;
                case SFTPalette.EXP_BI_RAMP:
                    HSLComponents[component] = new expBiRampSFTComponentmap();
                    break;
                case SFTPalette.STRIPE:
                    HSLComponents[component] = new stripeSFTComponentmap();
                    break;
            }
        }
//        System.out.format("Component %d is now %s%n", component, HSLComponents[component].type());
    }
    
    public int getComponentType(int component) {
        return HSLComponents[component].cmapType;
    }

    public String valueString() {
		String str="";
		str += cmapType;
		str += "\n";
        for (int i=0; i<3; i++)
            str += HSLComponents[i].valueString();
        return str;
    }
    
    public void parseValueString(String s[]) {
    	cmapType = Integer.parseInt(s[0]);
    	setGlobalType(cmapType);
        for (int i=0; i<3; i++) {
    		String[] numbers = s[i+1].split(",");
            setComponentType(i, Integer.parseInt(numbers[0]));        
        }
        for (int i=0; i<3; i++) {
            HSLComponents[i].parseValueString(s[i+1]);
        }
       changed = true;
    }
    
}

class SFTComponentmap
{
	public double sFreqScale;
	public double sFreq;
	public double sAmp;
	public double sPhase;
	public double sOffset;
	public double sShape;
    public int cmapType = -1;
    public static double colorFrequency = (double) SFTPalette.indexClamp;

    public SFTComponentmap() {}
    public double getColor(int i, int mapNumber) {
        return 0;
    }
    
    public String type() {
        return SFTPalette.typeNames[cmapType];
    }
    
    public void getValues(double v[]) {
    	v[0] = sFreqScale;
    	v[1] = sFreq;
    	v[2] = sAmp;
    	v[3] = sPhase;
    	v[4] = sOffset;
    	v[5] = sShape;
    }
    
    public void setDefaults() {
    	setValues(getDefaults());
    }
    
    public double[] getDefaults() {
    	double[] v = new double[5];
    	return v;
    }
    
    public void setValues(double v[]) {
    	sFreqScale = v[0];
    	sFreq = v[1];
    	sAmp = v[2];
    	sPhase = v[3];
    	sOffset = v[4];
    	sShape = v[5];
    }
    
    public String valueString() {
		String str="";
		str += cmapType;
		str += ",";
		str += sFreqScale;
		str += ",";
		str += sFreq;
		str += ",";
		str += sAmp;
		str += ",";
		str += sPhase;
		str += ",";
		str += sOffset;
		str += ",";
		str += sShape;
		str += "\n";
		
		return str;
    }
    
    public void parseValueString(String s) {
		String[] numbers = s.split(",");
    	cmapType = Integer.parseInt(numbers[0]);
    	sFreqScale = Float.parseFloat(numbers[1]);
    	sFreq = Float.parseFloat(numbers[2]);
    	sAmp = Float.parseFloat(numbers[3]);
    	sPhase = Float.parseFloat(numbers[4]);
    	sOffset = Float.parseFloat(numbers[5]);
    	sShape = Float.parseFloat(numbers[6]);
    }
}

class sineSFTComponentmap extends SFTComponentmap
{

    public sineSFTComponentmap() {
    	setDefaults();
        cmapType = SFTPalette.SINE;
    }
    
    public double[] getDefaults() {
        double[] v = {1000d, .5d, 1d, 0d, 0d, 0.5d};
        return v;
    }
    
    public double getColor(int i, int mapNumber) {
        double co;
        double fullPhase;
        
        fullPhase = sPhase + SFTPalette.getCMapPhase(mapNumber) + SFTPalette.getGlobalPhase();
        fullPhase = fullPhase % (2*Math.PI);
//		System.out.format("sFreq = %f, sFreqScale = %f%n", sFreq, sFreqScale);    		
//		System.out.format("component %d, map %d: sFreqScale = %f%n", i, mapNumber, sFreqScale);    		
        if (sFreqScale > 0) {
            double x = i/colorFrequency;
//			System.out.format("i = %d, x = %f%n", i, x);    		
            if (x > 1) {
//        		System.out.format("x = %f, i = %d, colorFrequency = %f%n", x, i, colorFrequency);    		
//            	Thread.dumpStack();
            }
            x = computeShape(2*Math.PI*(x*sFreq*sFreqScale)+fullPhase, sShape);
//            x = 2*Math.PI*x*sFreq*sFreqScale;
//			System.out.format("shape x = %f%n", x);    		
            co = sOffset + (1-sOffset)*sAmp*(1 + Math.sin(x))/2;
        } else {
            co = sOffset + (1-sOffset)*sAmp;
        }
    
        return co;
    }
    
    public double computeShape(double x, double x1) {
        double pi = Math.PI;
        x = x % (2*pi);
        x1 = x1*pi;
        
        if (x1 == 0)
        	return x;
        else if (x >= 0 && x < x1)
            return x*pi/(2*x1);
        else if (x >= x1 && x < pi)
            return pi*(x - x1)/(2*(pi - x1)) + pi/2;
        else if (x >= pi && x < 2*pi - x1)
            return pi*(x + x1 - 2*pi)/(2*(pi - x1)) + 3*pi/2;
        else
            return pi*(x + x1 - 2*pi)/(2*x1) + 3*pi/2;
    }
}

class linearRampSFTComponentmap extends SFTComponentmap
{
    public linearRampSFTComponentmap() {
    	setDefaults();
        cmapType = SFTPalette.LINEAR_RAMP;
    }
    
    public double[] getDefaults() {
        double[] v = {1000d, .5d, 1d, 0d, 0d, 0.9d};
        return v;
    }
        
    public double getColor(int i, int mapNumber) {
        double co = 0;
        double fullPhase;
        
        fullPhase = sPhase + SFTPalette.getCMapPhase(mapNumber) + SFTPalette.getGlobalPhase();
        fullPhase = fullPhase/(2*Math.PI);
        if (sFreqScale > 0) {
            double x = i/colorFrequency;
            double dx = (x*sFreq*sFreqScale+fullPhase)%1;
            double rShape = 2*sShape - 1;
        	if (rShape == 0)
        		rShape = 0.01;
            
            if (rShape >= 0 && dx < rShape)
                co = sAmp*(1-dx/rShape);
            else if (rShape < 0 && dx > 1 - Math.abs(rShape)) {
                double ars = Math.abs(rShape);
                co = sAmp*(1 - 1/ars + dx/ars);
            }
            else
                co = 0;
            co = sOffset + (1-sOffset)*co;
        } else {
            co = sOffset + (1-sOffset)*sAmp;
        }
        
        return co;
    }
}

class linearBiRampSFTComponentmap extends SFTComponentmap
{
    public linearBiRampSFTComponentmap() {
    	setDefaults();
        cmapType = SFTPalette.LINEAR_BI_RAMP;
    }
    
    public double[] getDefaults() {
        double[] v = {1000d, .5d, 1d, 0d, 0d, 0.9d};
        return v;
    }
        
    public double getColor(int i, int mapNumber) {
        double co = 0;
        double fullPhase;
        
        fullPhase = sPhase + SFTPalette.getCMapPhase(mapNumber) + SFTPalette.getGlobalPhase();
        fullPhase = fullPhase/(2*Math.PI);
        if (sFreqScale > 0) {
            double x = i/colorFrequency;
            double dx = (x*sFreq*sFreqScale+fullPhase)%1;
            double rShape = (2*sShape - 1)/2;
        	if (rShape == 0)
        		rShape = 0.01;
            double gt = 0;
            
    		double ars = Math.abs(rShape);
        	if (dx < ars)
        		gt = 1-dx/ars;
        	else if (dx > 1 - ars) {
        		gt = 1 - 1/ars + dx/ars;
        	}
        	if (rShape >= 0)
        	    co = sAmp*gt;
        	else if (rShape < 0 ) 
        	    co = sAmp*(1-gt);
        	
            co = sOffset + (1-sOffset)*co;
        } else {
            co = sOffset + (1-sOffset)*sAmp;
        }
        
        return co;
    }
}

class expRampSFTComponentmap extends SFTComponentmap
{
    public expRampSFTComponentmap() {
    	setDefaults();
        cmapType = SFTPalette.EXP_RAMP;
    }
    
    public double[] getDefaults() {
        double[] v = {1000d, .5d, 1d, 0d, 0d, 0.9d};
        return v;
    }
    
    public double getColor(int i, int mapNumber) {
        double co = 0;
        double fullPhase;
        
        fullPhase = sPhase + SFTPalette.getCMapPhase(mapNumber) + SFTPalette.getGlobalPhase();
        fullPhase = fullPhase/(2*Math.PI);
        if (sFreqScale > 0) {
            double x = i/colorFrequency;
            double dx = (x*sFreq*sFreqScale+fullPhase)%1;
            double rShape = 2*sShape - 1;
        	if (rShape == 0)
        		rShape = 0.01;
            
            if (rShape >= 0)
                co = sAmp*Math.exp(-dx/rShape);
            else if (rShape < 0 ) {
                double ars = Math.abs(rShape);
                co = sAmp*Math.exp(-(1-dx)/ars);
            }
            else
                co = 0;
            
            //                if (co > 1 || co < 0)
            //                    System.out.format("co = %f, dx = %f, sAmp = %f, rShape = %f%n", co, dx, sAmp, rShape);
            co = sOffset + (1-sOffset)*co;
        } else {
            co = sOffset + (1-sOffset)*sAmp;
        }
        
        return co;
    }
}

class expBiRampSFTComponentmap extends SFTComponentmap
{
    public expBiRampSFTComponentmap() {
    	setDefaults();
        cmapType = SFTPalette.EXP_BI_RAMP;
    }
    
    public double[] getDefaults() {
        double[] v = {1000d, .5d, 1d, 0d, 0d, 0.9d};
        return v;
    }
    
    public double getColor(int i, int mapNumber) {
        double co = 0;
        double fullPhase;
        
        fullPhase = sPhase + SFTPalette.getCMapPhase(mapNumber) + SFTPalette.getGlobalPhase();
        fullPhase = fullPhase/(2*Math.PI);
        if (sFreqScale > 0) {
            double x = i/colorFrequency;
            double dx = (x*sFreq*sFreqScale+fullPhase)%1;
            double rShape = (2*sShape - 1)/2;
            double gt = 0;
        	if (rShape == 0)
        		rShape = 0.01;
            
    		double ars = Math.abs(rShape);
        	if (dx <= 0.5)
        		gt = Math.exp(-dx/ars);
        	else if (dx > 0.5) {
        		gt = Math.exp(-(1-dx)/ars);
        	}
        	if (rShape >= 0)
        	    co = sAmp*gt;
        	else if (rShape < 0 ) 
        	    co = sAmp*(1-gt);
            
            
            //                if (co > 1 || co < 0)
            //                    System.out.format("co = %f, dx = %f, sAmp = %f, rShape = %f%n", co, dx, sAmp, rShape);
            co = sOffset + (1-sOffset)*co;
        } else {
            co = sOffset + (1-sOffset)*sAmp;
        }
        
        return co;
    }
}

class stripeSFTComponentmap extends SFTComponentmap
{
    public stripeSFTComponentmap() {
    	setDefaults();
        cmapType = SFTPalette.STRIPE;
    }
    
    public double[] getDefaults() {
        double[] v = {1000d, .5d, 1d, 0d, 0d, 0.55d};
        return v;
    }
    
    public double getColor(int i, int mapNumber) {
        double co = 0;
        double fullPhase;
        
        fullPhase = sPhase + SFTPalette.getCMapPhase(mapNumber) + SFTPalette.getGlobalPhase();
        fullPhase = fullPhase/(2*Math.PI);
        if (sFreqScale > 0) {
            double x = i/colorFrequency;
            double dx = (x*sFreq*sFreqScale+fullPhase)%1;
            double rShape = 2*sShape - 1;
        	if (rShape == 0)
        		rShape = 0.01;
            double ars = Math.abs(rShape);
            double adx = Math.abs(dx);
            
            if (rShape >= 0)
                if (adx < ars)
                    co = sAmp;
                else
                    co = 0;
            else if (rShape < 0 ) {
                if (adx > ars)
                    co = sAmp;
                else
                    co = 0;
            }
            else
                co = 0;
            
            //                if (co > 1 || co < 0)
            //                    System.out.format("co = %f, dx = %f, sAmp = %f, rShape = %f%n", co, dx, sAmp, rShape);
            co = sOffset + (1-sOffset)*co;
        } else {
            co = sOffset + (1-sOffset)*sAmp;
        }
        
        return co;
    }
}


class gaussianSFTComponentmap extends SFTComponentmap
{
    public gaussianSFTComponentmap() {
    	setDefaults();
        cmapType = SFTPalette.GAUSSIAN;
    }
    
    public double[] getDefaults() {
        double[] v = {1000d, .5d, 1d, 0d, 0d, 0.9d};
        return v;
    }
    
    public double getColor(int i, int mapNumber) {
        double co = 0;
        double fullPhase;
        
        fullPhase = sPhase + SFTPalette.getCMapPhase(mapNumber) + SFTPalette.getGlobalPhase();
        fullPhase = fullPhase/(2*Math.PI);
        if (sFreqScale > 0) {
            double x = i/colorFrequency;
            double dx = (x*sFreq*sFreqScale+fullPhase)%1;
            double rShape = 2*sShape - 1;
        	if (rShape == 0)
        		rShape = 0.01;
            double ars = 0.3*rShape*rShape;
            double adx = (dx - 0.5)*(dx - 0.5);
            double gt = Math.exp(-adx/ars);
            
            if (rShape >= 0)
                co = sAmp*gt;
            else if (rShape < 0 ) {
                co = sAmp*(1-gt);
            }
            else
                co = 0;
            
            //                if (co > 1 || co < 0)
            //                    System.out.format("co = %f, dx = %f, sAmp = %f, rShape = %f%n", co, dx, sAmp, rShape);
            co = sOffset + (1-sOffset)*co;
        } else {
            co = sOffset + (1-sOffset)*sAmp;
        }
        
        return co;
    }
}
