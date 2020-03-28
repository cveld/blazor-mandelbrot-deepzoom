//	PaletteDialog
//
//    Copyright 2013 Steve Bryson and Kevin Martin
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
import java.awt.Component;
import java.awt.Dimension;
import java.awt.GridBagConstraints;
import java.awt.GridBagLayout;
import java.awt.Insets;
import java.awt.event.*;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.text.DecimalFormat;
import java.text.NumberFormat;

import javax.swing.BorderFactory;
import javax.swing.JButton;
import javax.swing.JColorChooser;
import javax.swing.JDialog;
import javax.swing.JFormattedTextField;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JMenuBar;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.JSlider;
import javax.swing.JComboBox;
import javax.swing.event.*;

interface PaletteIO
{
	void SavePalette(String str);
	String LoadPalette();
}

class ColourButton extends JButton implements ActionListener
{
	static final long serialVersionUID = 0;//get rid of warning
	Color mColour;
	JFrame mFrame;
	
	public ColourButton(String aName, Color col,JFrame aFrame)
	{
		super(aName);
		mColour = col;
		mFrame = aFrame;
	    setBorder(BorderFactory.createMatteBorder(5, 5, 5, 5, mColour));
	    addActionListener(this);
	}
	@Override
	public void actionPerformed(ActionEvent arg0)
	{
		Color c = JColorChooser.showDialog(mFrame, "Pick a Color"
                , mColour);	
		if (c!=null)
			mColour = c;
		
	    setBorder(BorderFactory.createMatteBorder(5, 5, 5, 5, mColour));
	}

	public Color GetColour()
	{
		return mColour;
	}
	public void SetColour(int r, int g, int b)
	{
		mColour = new Color(r,g,b);
	    setBorder(BorderFactory.createMatteBorder(5, 5, 5, 5, mColour));
	}
	public void SetColour(Color aColour)
	{
		mColour = aColour;
	    setBorder(BorderFactory.createMatteBorder(5, 5, 5, 5, mColour));
	}
}


public class PaletteDialog implements IPaletteDialog, ChangeListener, PaletteLibraryLoader
{
    public static final int NMIXERS = 6;

    JDialog mDialog;
    JFormattedTextField sFreqScale[];
    JSlider sFreq[];
    JLabel freqLabel[];
    JSlider sAmp[];
    JLabel ampLabel[];
    JSlider sPhase[];
    JLabel phaseLabel[];
    JSlider sOffset[];
    JLabel offsetLabel[];
    JSlider sShape[];
    JLabel shapeLabel[];
    
    JSlider globalPhaseSlider;
    JLabel globalPhaseLabel;
    
    JSlider cMapPhaseSlider;
    JLabel cMapPhaseLabel;
    
    JSlider mixerSlider[];
    JLabel mixerLabel[];
    
    JComboBox<String> cmapNumber;
    JComboBox<String> hslTypeMenu;
    JComboBox<?>[] colorComponentTypeMenu;
    
    int hslComponentType[][];
    int hslBaseType[];
    int prevHslBaseType[];

    //JFormattedTextField mDecay[];
    JButton mCancel_button;
    JButton mOK_button;
    boolean mOK;
    SFTPalette mPalette;
    ColourButton mEnd_colour;
    String mInitial_state;
    Component mComponent;
    JFrame mFrame;
    PaletteIO mPalette_io;
    boolean paletteLoaded = false;
    double sliderScale = 1000;
    
    PaletteDisplay pDisplay;

	public PaletteDialog (JFrame aFrame, Component aComponent, IPaletteChangeNotify aNotify, PaletteIO aPalette_io)
	{
		mPalette = new SFTPalette(aNotify);
		mComponent = aComponent;
		mFrame = aFrame;
		mPalette_io = aPalette_io;
		
		mDialog = new JDialog(aFrame, "Edit Palette", false);
		
		pDisplay = new PaletteDisplay(mPalette, mFrame, mComponent);
        
        String[] cComponent = {"Hue", "Saturation", "Luminance"};
        
		colorComponentTypeMenu = new JComboBox[3];
        sFreqScale = new JFormattedTextField[3];
        sFreq = new JSlider[3];
        freqLabel = new JLabel[3];
        sAmp = new JSlider[3];
        ampLabel = new JLabel[3];
        sPhase = new JSlider[3];
        phaseLabel = new JLabel[3];
        sOffset = new JSlider[3];
        offsetLabel = new JLabel[3];
        sShape = new JSlider[3];
        shapeLabel = new JLabel[3];
        
        mixerSlider = new JSlider[NMIXERS];
        mixerLabel = new JLabel[NMIXERS];
        
        hslComponentType = new int[NMIXERS][3];
        hslBaseType = new int[NMIXERS];
        prevHslBaseType = new int[NMIXERS];
        
		JPanel p = new JPanel();
        JLabel label;
        mDialog.setSize(new Dimension(550,1000));
        p.setPreferredSize(new Dimension(540,1000));

        mDialog.setContentPane(p);
  
        
        p.setLayout(new GridBagLayout());
        GridBagConstraints gbc = new GridBagConstraints();

        NumberFormat format = new DecimalFormat();
        format.setMaximumFractionDigits(7);
   
        gbc.ipady = 0;
        gbc.gridy=0;
        gbc.gridwidth=1;
        gbc.anchor = GridBagConstraints.PAGE_START; //top of space
        gbc.fill = GridBagConstraints.HORIZONTAL;
        gbc.gridx=2;
        mEnd_colour = new ColourButton("M.Set Colour", Color.black, aFrame);
        mEnd_colour.addChangeListener(this);
        p.add(mEnd_colour,gbc);       
        
        gbc.ipady = 5;
        
        gbc.gridx+=2;
        gbc.fill = GridBagConstraints.HORIZONTAL;
        gbc.gridwidth=1;
        JButton help = new JButton("Help");
        p.add(help,gbc);
        help.addActionListener(this);
        
        gbc.gridy++;
        
        gbc.gridx=0;
        gbc.fill = GridBagConstraints.HORIZONTAL;
        gbc.gridwidth = 2;
        String[] options = {"Colormap 1", "Colormap 2", "Colormap 3", "Colormap 4", "Colormap 5", "Colormap 6"};
        cmapNumber = new JComboBox<String>(options);
        cmapNumber.setPreferredSize(new Dimension(100,20));
        cmapNumber.setSelectedIndex(0);
        cmapNumber.addActionListener(this);
        p.add(cmapNumber, gbc);
        
        gbc.gridx=2;
        gbc.fill = GridBagConstraints.HORIZONTAL;
        gbc.gridwidth = 2;
        String[] typeOptions = SFTPalette.typeNames;
        hslTypeMenu = new JComboBox<String>(typeOptions);
        hslTypeMenu.setPreferredSize(new Dimension(100,20));
        hslTypeMenu.setSelectedIndex(0);
        hslTypeMenu.addActionListener(this);
        p.add(hslTypeMenu, gbc);

        gbc.gridy++;
                
        gbc.gridx=0;
        gbc.gridwidth=3;
        gbc.fill = GridBagConstraints.HORIZONTAL;
        label=new JLabel("Phase", null, JLabel.LEFT);
        p.add(label,gbc);
        
        gbc.gridx=1;
        gbc.fill = GridBagConstraints.HORIZONTAL;
        gbc.gridwidth = 3;
        cMapPhaseSlider = new JSlider(JSlider.HORIZONTAL, 0, (int) sliderScale, 0);
        cMapPhaseSlider.setValue(0);
        cMapPhaseSlider.addChangeListener(this);
        p.add(cMapPhaseSlider, gbc);
        
        gbc.gridx=4;
        gbc.gridwidth=1;
        gbc.fill = GridBagConstraints.HORIZONTAL;
        cMapPhaseLabel=new JLabel("0", null, JLabel.LEFT);
        p.add(cMapPhaseLabel,gbc);
        
        String[] componentTypeOptions = new String[SFTPalette.UNDEFINED];
        for (int i=0; i<SFTPalette.UNDEFINED; i++)
        	componentTypeOptions[i] = SFTPalette.typeNames[i];
        for (int i=0; i<3; i++)
        {
            gbc.gridy++;
            gbc.ipady = 5;
            gbc.gridx=0;
            gbc.gridwidth=1;
            gbc.fill = GridBagConstraints.HORIZONTAL;
            label=new JLabel(cComponent[i], null, JLabel.LEFT);
            p.add(label,gbc);
            gbc.ipady=0;

            gbc.gridx=1;
            gbc.gridwidth=1;
            gbc.fill = GridBagConstraints.HORIZONTAL;
            label=new JLabel("Frequency Scale", null, JLabel.CENTER);
            p.add(label,gbc);

	        gbc.gridx=2;
            gbc.gridwidth=1;
	        gbc.fill = GridBagConstraints.HORIZONTAL;
	        sFreqScale[i] = new JFormattedTextField(format);
	        sFreqScale[i].setPreferredSize(new Dimension(80,20));
	        sFreqScale[i].setValue(1);
	        p.add(sFreqScale[i], gbc);
            
            gbc.gridx=3;
            gbc.fill = GridBagConstraints.HORIZONTAL;
            gbc.gridwidth = 2;
            colorComponentTypeMenu[i] = new JComboBox<String>(componentTypeOptions);
            colorComponentTypeMenu[i].setPreferredSize(new Dimension(100,20));
            colorComponentTypeMenu[i].setSelectedIndex(0);
            colorComponentTypeMenu[i].addActionListener(this);
            p.add(colorComponentTypeMenu[i], gbc);

            gbc.gridy++;
            gbc.gridx=0;
            gbc.gridwidth=1;
            gbc.fill = GridBagConstraints.HORIZONTAL;
            label=new JLabel("Frequency", null, JLabel.RIGHT);
            p.add(label,gbc);
            
	        gbc.gridx=1;
	        gbc.fill = GridBagConstraints.HORIZONTAL;
            gbc.gridwidth = 3;
	        sFreq[i] = new JSlider(JSlider.HORIZONTAL, 1, (int) sliderScale, 5);
	        sFreq[i].setValue(5);
            sFreq[i].addChangeListener(this);
	        p.add(sFreq[i], gbc);
            
            gbc.gridx=4;
            gbc.gridwidth=1;
            gbc.fill = GridBagConstraints.HORIZONTAL;
            freqLabel[i]=new JLabel("5", null, JLabel.LEFT);
            p.add(freqLabel[i],gbc);
           
            gbc.gridy++;
            gbc.gridx=0;
            gbc.gridwidth=1;
            gbc.fill = GridBagConstraints.HORIZONTAL;
            label=new JLabel("Amplitude", null, JLabel.RIGHT);
            p.add(label,gbc);
            
	        gbc.gridx=1;
	        gbc.fill = GridBagConstraints.HORIZONTAL;
            gbc.gridwidth = 3;
	        sAmp[i] = new JSlider(JSlider.HORIZONTAL, 0, (int) sliderScale, 5);
	        sAmp[i].setValue(5);
            sAmp[i].addChangeListener(this);
	        p.add(sAmp[i], gbc);
            
            gbc.gridx=4;
            gbc.gridwidth=1;
            gbc.fill = GridBagConstraints.HORIZONTAL;
            ampLabel[i]=new JLabel("5", null, JLabel.LEFT);
            p.add(ampLabel[i],gbc);
            
            gbc.gridy++;
            gbc.gridx=0;
            gbc.gridwidth=1;
            gbc.fill = GridBagConstraints.HORIZONTAL;
            label=new JLabel("Phase", null, JLabel.RIGHT);
            p.add(label,gbc);
            
	        gbc.gridx=1;
	        gbc.fill = GridBagConstraints.HORIZONTAL;
            gbc.gridwidth = 3;
	        sPhase[i] = new JSlider(JSlider.HORIZONTAL, 0, (int) sliderScale, 5);
	        sPhase[i].setValue(5);
            sPhase[i].addChangeListener(this);
	        p.add(sPhase[i], gbc);
            
            gbc.gridx=4;
            gbc.gridwidth=1;
            gbc.fill = GridBagConstraints.HORIZONTAL;
            phaseLabel[i]=new JLabel("5", null, JLabel.LEFT);
            p.add(phaseLabel[i],gbc);
            
            gbc.gridy++;
            gbc.gridx=0;
            gbc.gridwidth=1;
            gbc.fill = GridBagConstraints.HORIZONTAL;
            label=new JLabel("Offset", null, JLabel.RIGHT);
            p.add(label,gbc);
            
	        gbc.gridx=1;
	        gbc.fill = GridBagConstraints.HORIZONTAL;
            gbc.gridwidth = 3;
	        sOffset[i] = new JSlider(JSlider.HORIZONTAL, 0, (int) sliderScale, 5);
	        sOffset[i].setValue(5);
            sOffset[i].addChangeListener(this);
	        p.add(sOffset[i], gbc);
            
            gbc.gridx=4;
            gbc.gridwidth=1;
            gbc.fill = GridBagConstraints.HORIZONTAL;
            offsetLabel[i]=new JLabel("5", null, JLabel.LEFT);
            p.add(offsetLabel[i],gbc);
            
            gbc.gridy++;
            gbc.gridx=0;
            gbc.gridwidth=1;
            gbc.fill = GridBagConstraints.HORIZONTAL;
            label=new JLabel("Shape", null, JLabel.RIGHT);
            p.add(label,gbc);
            
	        gbc.gridx=1;
	        gbc.fill = GridBagConstraints.HORIZONTAL;
            gbc.gridwidth = 3;
	        sShape[i] = new JSlider(JSlider.HORIZONTAL, 0, (int) sliderScale, 50);
	        sShape[i].setValue(50);
            sShape[i].addChangeListener(this);
	        p.add(sShape[i], gbc);
            
            gbc.gridx=4;
            gbc.gridwidth=1;
            gbc.fill = GridBagConstraints.HORIZONTAL;
            shapeLabel[i]=new JLabel("0", null, JLabel.LEFT);
            p.add(shapeLabel[i],gbc);
        }
  

        
        gbc.ipady=0;
        gbc.gridy++;

        gbc.gridx=0;
        gbc.gridwidth=3;
        gbc.fill = GridBagConstraints.HORIZONTAL;
        label=new JLabel("", null, JLabel.LEFT);
        p.add(label,gbc);
        gbc.ipady=0;
        gbc.gridy++;
        
        gbc.gridx=0;
        gbc.gridwidth=3;
        gbc.fill = GridBagConstraints.HORIZONTAL;
        label=new JLabel("Mix", null, JLabel.LEFT);
        p.add(label,gbc);
        gbc.ipady=0;
        
        gbc.gridy++;

        gbc.gridx=0;
        gbc.gridwidth=3;
        gbc.fill = GridBagConstraints.HORIZONTAL;
        label=new JLabel("", null, JLabel.LEFT);
        p.add(label,gbc);
        gbc.ipady=0;
        gbc.gridy++;
        gbc.gridy++;
        
        gbc.gridx=0;
        gbc.gridwidth=3;
        gbc.fill = GridBagConstraints.HORIZONTAL;
        label=new JLabel("Global Phase", null, JLabel.LEFT);
        p.add(label,gbc);
        
        gbc.gridx=1;
        gbc.fill = GridBagConstraints.HORIZONTAL;
        gbc.gridwidth = 3;
        globalPhaseSlider = new JSlider(JSlider.HORIZONTAL, 0, (int) sliderScale, 0);
        globalPhaseSlider.setValue(0);
        globalPhaseSlider.addChangeListener(this);
        p.add(globalPhaseSlider, gbc);
        
        gbc.gridx=4;
        gbc.gridwidth=1;
        gbc.fill = GridBagConstraints.HORIZONTAL;
        globalPhaseLabel=new JLabel("0", null, JLabel.LEFT);
        p.add(globalPhaseLabel,gbc);
        
        for (int i=0; i<NMIXERS; i++) {
            gbc.gridy++;
            gbc.gridx=0;
            gbc.gridwidth=1;
            gbc.fill = GridBagConstraints.HORIZONTAL;
            label=new JLabel("Colormap " + (i+1), null, JLabel.RIGHT);
            p.add(label,gbc);
            
            gbc.gridx=1;
            gbc.fill = GridBagConstraints.HORIZONTAL;
            gbc.gridwidth = 3;
            mixerSlider[i] = new JSlider(JSlider.HORIZONTAL, 0, (int) sliderScale, 0);
            mixerSlider[i].setValue(0);
            mixerSlider[i].addChangeListener(this);
            p.add(mixerSlider[i], gbc);
            
            gbc.gridx=4;
            gbc.gridwidth=1;
            gbc.fill = GridBagConstraints.HORIZONTAL;
            mixerLabel[i]=new JLabel("0", null, JLabel.LEFT);
            p.add(mixerLabel[i],gbc);
        }
        
        gbc.ipady = 0;
        gbc.insets = new Insets(30,0,0,0);  //top padding
        gbc.anchor = GridBagConstraints.PAGE_END; //bottom of space
        gbc.gridx=0;
        gbc.gridy++;
        gbc.fill = GridBagConstraints.HORIZONTAL;
        gbc.gridwidth=1;
        mCancel_button = new JButton("Load");
        p.add(mCancel_button,gbc);
        mCancel_button.addActionListener(this);  
        
        gbc.gridx++;
        gbc.fill = GridBagConstraints.HORIZONTAL;
        gbc.gridwidth=1;
        mCancel_button = new JButton("Save");
        p.add(mCancel_button,gbc);
        mCancel_button.addActionListener(this); 
        
        gbc.gridx++;
        gbc.gridx++;
        gbc.fill = GridBagConstraints.HORIZONTAL;
        gbc.gridwidth=1;
        mOK_button = new JButton("   Close   ");
        p.add(mOK_button,gbc);
        mOK_button.addActionListener(this);       	

	}
	
	public IPalette GetPalette()
	{
		return mPalette;
	}
	   
	public void MakePaletteLibrary(JMenuBar aMenuBar)
	{
		new PaletteLibrary(aMenuBar, this);	
	}

/*
    public void stateChanged(ChangeEvent e) {
        JSlider source = (JSlider)e.getSource();
        if (!source.getValueIsAdjusting()) {
            System.out.format("Slider state change!%n");
            if (paletteLoaded == true)
                SetPaletteValues();
        }
    }
*/
    public void stateChanged(ChangeEvent e) {
        //JSlider source = (JSlider)e.getSource();
        if (paletteLoaded == true) {
//        	System.out.format("stateChanged%n");    		
            setCurrentColormap();
            SetPaletteValues();
            pDisplay.repaint();
        }
    }
	
	public boolean Run()
	{	
	    mDialog.setLocationRelativeTo(mComponent);
		mInitial_state = mPalette.ToString();
		GetPaletteValues();
		mDialog.setVisible(true);
		pDisplay.show();
		return mOK;
	}

	@Override
	public void actionPerformed(ActionEvent event)
	{
		Object source = event.getSource();
		String command = event.getActionCommand();
        int currentCmap = cmapNumber.getSelectedIndex();
        
        if (source == cmapNumber) {
            mPalette.getCmapType(hslBaseType, hslComponentType);
            hslTypeMenu.setSelectedIndex(hslBaseType[currentCmap]);
            for (int i=0; i<3; i++)
                colorComponentTypeMenu[i].setSelectedIndex(hslComponentType[currentCmap][i]);
            prevHslBaseType[currentCmap] = hslBaseType[currentCmap];
        }
        if (source == hslTypeMenu) {
//            System.out.format("HSL menu, command %d%n", hslTypeMenu.getSelectedIndex());
            hslBaseType[currentCmap] = hslTypeMenu.getSelectedIndex();
            for (int i=0; i<3; i++)
                hslComponentType[currentCmap][i] = hslTypeMenu.getSelectedIndex();
            
            mPalette.setCmapType(currentCmap, hslBaseType[currentCmap]);
//        	System.out.format("changed cmap type%n");    		
            if (!mPalette.getChanged(currentCmap)) {
        		GetPaletteValues();
            }
        }
        for (int i=0; i<3; i++) {
        	if (source == colorComponentTypeMenu[i]) {
        		//            System.out.format("cmap %d Hue menu, command %d%n", currentCmap, colorComponentTypeMenu[0].getSelectedIndex());
        		hslComponentType[currentCmap][i] = colorComponentTypeMenu[i].getSelectedIndex();
        		mPalette.setCmapType(currentCmap, i, hslComponentType[currentCmap][i]);
//    			System.out.format("changed component %d cmap type%n", i);    		
    			if (!mPalette.getChanged(currentCmap)) 
    				GetPaletteValues();
        		if (hslComponentType[currentCmap][i] != hslBaseType[currentCmap]) {
        			hslBaseType[currentCmap] = SFTPalette.UNDEFINED;
        			mPalette.setCmapType(currentCmap, hslBaseType[currentCmap]);
        		}
        	}
        }
        
		if (command=="   Close   ")
		{
			mOK=true;
			mDialog.setVisible(false);
			SetPaletteValues();
		}
		else if (command=="Help")
		{
			JOptionPane.showMessageDialog(mComponent,
					"The palette controls how the color channels change with the iteration count.\n"+
							"The colors update in real time, and you can see the effect of moving a slider in the Mandelbrot window.\n"+
							"You can define up to six periodic colormaps of iteration count to color.  These colormaps are combined via the mixer at the bottom.\n"+
							"Each colormap is defined in terms of its Hue, Saturation and Luminance (HSL) components.\n"+
							"Each HSL component of each colormap has one of 6 shapes:\n" +
							"- sinusoid, Gaussian, ramp, two-sided-ramp, exponential ramp, exponential two-sided-ramp and stripe.\n"+
							"The shape is chosen via the menus.\n"+
							"The menu on the upper right sets all three HSL comonents to the same shape.\n"+
							"Each shape is controlled via 5 parameters.  The menu on the upper left controls which colormap is being controlled by the sliders:\n"+
							"- Frequency: how often the shape repeats.  The frequency scale sets the scale of the frequency slider\n"+
							"--- Smaller frequency scales are useful when you are deeply zoomed in near the boundary of the Mandelbrot set.\n"+
							"- Amplitude: the strength of the shape\n"+
							"- Phase: offset in the period where the repeating shape is defined\n"+
							"- Offset: The color component value of the zero point of the shape\n"+
							"- Shape: A parameter the acts differently on the different shapes:\n"+
							"--- Sine: shape skews the sine curve so the maximum and minimum are moved towards the center of the period.\n"+
							"--- Gaussian, two-sided-ramp, exponential two-sided-ramp and stripe: shape controls the width of the ramp. Negative values invert the shape\n"+
							"--- Ramp and exponential ramp: shape controls the length of the ramp. Negative values move the ramp in the opposite direction\n"+
							"The colormap phase slider at the top controls the phase of all three HSL components for the current colormap.\n"+
							"The global phase slider above the mixer controls the phase of all HSL components of all colormaps.\n"+
							"\n"+
							"Roughly, if f(x) is the shape, where x is (the iteration count mod 10,000) divided by 10,000,\n"+
							"colormap HSL component = offset + (1-offset)*amplitude*f(x + phase).\n"+
							"Here phase = global phase + colormap phase + component phase.\n"+
							"",
								"Palette Help",					
								JOptionPane.PLAIN_MESSAGE);
	
		}
		else if (command=="Load")
		{
			String str = mPalette_io.LoadPalette();
			if (str!=null)
			{
				mPalette.ParseString(str);
				paletteLoaded = true;
						
		        setCurrentColormap();
				GetPaletteValues();
		        mPalette.setMixRange();
				SetPaletteValues();
		        pDisplay.repaint();			
			}
		}
		else if (command=="Save")
		{
			String str = mPalette.ToString();

			mPalette_io.SavePalette(str);
		}		
        SetPaletteValues();
        setCurrentColormap();
		GetPaletteValues();
	}
	
	void setCurrentColormap()
	{
        int currentCmap = cmapNumber.getSelectedIndex();
		mPalette.setCurrentColormap(currentCmap);
	}
	
	void setCmapType()
	{
		mPalette.setCmapType(hslBaseType, hslComponentType);
	}
	
	void getCmapType()
	{
		mPalette.getCmapType(hslBaseType, hslComponentType);
	}
	
	void GetPaletteValues()
	{
		double[] p = new double[NMIXERS];
		double[][] s = new double[3][6];
		Color cols[] = new Color[2];
        int currentCmap = cmapNumber.getSelectedIndex();
		double cMapPhase = SFTPalette.getCMapPhase(currentCmap);
		double globalPhase = SFTPalette.getGlobalPhase();
		
		mPalette.GetGradientValues(p, s, cols);
//      System.out.format("GetPaletteValues: globalPhase = %f, cMapPhase = %f%n", globalPhase, cMapPhase);
        
		mEnd_colour.SetColour(cols[1]);
		
		for (int i=0; i<3; i++)
		{
//			System.out.format("set component %d values: %n", i);
//			for (int j=0; j<6; j++)
//				System.out.format(" %f", s[i][j]);
//			System.out.format("%n");
			
			sFreqScale[i].setValue(s[i][0]);
			sFreq[i].setValue((int) (s[i][1]*sliderScale));
			sAmp[i].setValue((int) (s[i][2]*sliderScale));
			sPhase[i].setValue((int) (s[i][3]*sliderScale/(2f*Math.PI)));
			sOffset[i].setValue((int) (s[i][4]*sliderScale));
			sShape[i].setValue((int) (s[i][5]*sliderScale));
		}
        
		cMapPhaseSlider.setValue((int) (cMapPhase*sliderScale/(2f*Math.PI)));
		globalPhaseSlider.setValue((int) (globalPhase*sliderScale/(2f*Math.PI)));

		for (int i=0; i<NMIXERS; i++) {
			mixerSlider[i].setValue((int) (((p[i]+1)/2)*sliderScale));
        }
        
        mPalette.getCmapType(hslBaseType, hslComponentType);
//        System.out.format("GetPaletteValues: currentCmap = %d, hslBaseType = %d, prevHslBaseType = %d%n", currentCmap, hslBaseType[currentCmap], prevHslBaseType[currentCmap]);
//		for (int i=0; i<3; i++)
//	        System.out.format("component %d type = %d%n", i, hslComponentType[currentCmap][i]);
        if (hslBaseType[currentCmap] != prevHslBaseType[currentCmap]) {
//            System.out.format("setting menus%n");

        	hslTypeMenu.setSelectedIndex(hslBaseType[currentCmap]);
//        	if (hslBaseType[currentCmap] != SFTPalette.UNDEFINED)
        		for (int i=0; i<3; i++)
        			colorComponentTypeMenu[i].setSelectedIndex(hslComponentType[currentCmap][i]);
            prevHslBaseType[currentCmap] = hslBaseType[currentCmap];
        } else {
        	if (hslBaseType[currentCmap] == SFTPalette.UNDEFINED)
        		for (int i=0; i<3; i++)
        			colorComponentTypeMenu[i].setSelectedIndex(hslComponentType[currentCmap][i]);
        }
        
        paletteLoaded = true;
        pDisplay.repaint();
	}
    
	void SetPaletteValues()
	{
		double[] p = new double[NMIXERS];
		double[][] s = new double[3][6];
		
		for (int i=0; i<3; i++)
		{
			s[i][0] = (double) Float.parseFloat(sFreqScale[i].getText().replace(",",""));
			s[i][1] = (double) (((Number)(sFreq[i].getValue())).floatValue())/sliderScale;
			s[i][2] = (double) (((Number)(sAmp[i].getValue())).floatValue())/sliderScale;
			s[i][3] = (double) 2f*Math.PI*(((Number)(sPhase[i].getValue())).floatValue())/sliderScale;
			s[i][4] = (double) (((Number)(sOffset[i].getValue())).floatValue())/sliderScale;
			s[i][5] = (double) (((Number)(sShape[i].getValue())).floatValue())/sliderScale;
            
            freqLabel[i].setText(""+round(sFreq[i].getValue()*Float.parseFloat(sFreqScale[i].getText().replace(",",""))/sliderScale, 2));
            ampLabel[i].setText(""+round(sAmp[i].getValue()/sliderScale, 6));
            phaseLabel[i].setText(""+round(2f*sPhase[i].getValue()/sliderScale, 2)+"\u03c0");
            offsetLabel[i].setText(""+round(sOffset[i].getValue()/sliderScale, 2));
            shapeLabel[i].setText(""+round(2*(sShape[i].getValue()/sliderScale - 0.5), 2));
		}
        
		double globalPhase = (double) 2f*Math.PI*(((Number)(globalPhaseSlider.getValue())).floatValue())/sliderScale;
		globalPhaseLabel.setText(""+round(2f*globalPhaseSlider.getValue()/sliderScale, 2)+"\u03c0");
        
		double cMapPhase = (double) 2f*Math.PI*(((Number)(cMapPhaseSlider.getValue())).floatValue())/sliderScale;
		cMapPhaseLabel.setText(""+round(2f*cMapPhaseSlider.getValue()/sliderScale, 2)+"\u03c0");
		
        for (int i=0; i<NMIXERS; i++) {
			p[i] = (double) 2*((((Number)(mixerSlider[i].getValue())).floatValue())/sliderScale - 0.5);
			if (Math.abs(p[i]) < 0.005)
				p[i] = 0;
            mixerLabel[i].setText(""+round(p[i], 2));
        }
        
        SFTPalette.setGlobalPhase(globalPhase);
        SFTPalette.setCMapPhase(cMapPhase);
		mPalette.SetGradientValues(p, s, mEnd_colour.GetColour());
	}
                                  
    double round(double x, int nDecimals) {
        double decFac = Math.pow(10d,(double)nDecimals+1);
        return Math.round(x*decFac)/decFac;
    }

	public void LoadTheFile(File f)
	{
		try
		{
			FileReader fr = new FileReader(f);
			BufferedReader br = new BufferedReader(fr);
			LoadTheFile(br);
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public void LoadTheFile(BufferedReader br)
	{
		String str;
		
		char arr[]=new char[2048];

		try {
			br.read(arr, 0,2048);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return;
		}
		str = String.copyValueOf(arr);
		
		mPalette.ParseString(str);
		paletteLoaded = true;
				
        setCurrentColormap();
		GetPaletteValues();
        mPalette.setMixRange();
		SetPaletteValues();
        pDisplay.repaint();
	}
}