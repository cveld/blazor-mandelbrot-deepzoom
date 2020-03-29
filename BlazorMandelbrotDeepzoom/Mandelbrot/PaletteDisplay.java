import java.awt.*;
import java.awt.image.*;
import java.awt.Color;
import java.awt.Component;
import java.awt.Graphics;
import java.awt.Graphics2D;

import javax.swing.*;

class PaletteDisplay extends JPanel{
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	SFTPalette mPalette;
    Component mComponent;
    JDialog pFrame;
    public static int pdWidth = 700;
    public static int pdScaledWidth = 700;
    public static int pdHeight = 420;

	public PaletteDisplay(SFTPalette aPalette, JFrame aFrame, Component aComponent) {
		mPalette = aPalette; 
		mComponent = aComponent;
		
		pFrame = new JDialog(aFrame, "Palette Display", null);
		pFrame.add(this);
		pFrame.setSize(pdWidth, pdHeight);
	}
	
	public void show() {
		pFrame.setLocationRelativeTo(mComponent);
		pFrame.setVisible(true);
	}
	
	public static int getScaledWidth() {
		return pdScaledWidth;
	}
	
	public void paint(Graphics g) {
    	int h = 50;
    	int dh = 10;
    	int w = pdWidth;
    	double period = 0;
    	double periodRange = 0;
    	
    	int wHeight = pFrame.getHeight();
    	int wWidth = pFrame.getWidth();
    	double hScale = ((double) wHeight - 40)/pdHeight;
    	w = (int) (pdWidth*((double) wWidth)/800);
    	pdScaledWidth = w;
//		System.out.format("window size = %d, %d%n", wSize.width, wSize.height);    		

    	BufferedImage pImage;

    	Graphics2D g2 = (Graphics2D) g;
        
    	super.paintComponent(g);
    	
        g2.setColor(Color.black);
        g2.setFont(new Font( "SansSerif", Font.PLAIN, 18 ));
        
        double[][] f = mPalette.getCmapFrequencies();
        double[][] a = mPalette.getCmapAmplitudes();
        double maxFreq = 1e8;
        for (int i=0; i<SFTPalette.NMIXERS; i++)
        	for (int j=0; j<3; j++)
        		if (f[i][j] < maxFreq & f[i][j] > 0 & a[i][j] > 0)
        			maxFreq = f[i][j];
        period = 1/maxFreq;
        periodRange = 2*period;
//		System.out.format("periodRange = %f%n", periodRange);    		
        
        pImage = mPalette.drawCMap(-1, (int)(hScale*h), w, periodRange);
        g2.drawString("Mix", 25, (int)(hScale*35));
        g2.drawImage(pImage,100,0,null);
        
        for (int i=0; i<SFTPalette.NMIXERS; i++) {
            pImage = mPalette.drawCMap(i, (int)(hScale*h), w, periodRange);
            g2.drawString("CMap " + (i+1), 20, (int)(hScale*(35 + (i+1)*(h + dh))));
            g2.drawImage(pImage,100,(int)(hScale*((i+1)*(h + dh))),null);
        	
        }
    	
        g2.setColor (Color.gray);

    }
}