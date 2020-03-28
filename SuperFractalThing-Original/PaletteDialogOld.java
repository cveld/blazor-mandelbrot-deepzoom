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
import java.awt.event.ActionEvent;
//import java.awt.event.ActionListener;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.text.DecimalFormat;
import java.text.NumberFormat;

//import javax.swing.BorderFactory;
import javax.swing.JButton;
//import javax.swing.JColorChooser;
import javax.swing.JDialog;
import javax.swing.JFormattedTextField;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JMenuBar;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
/*
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

*/
public class PaletteDialogOld implements IPaletteDialog
{
JDialog mDialog;
JFormattedTextField md_di[][];
JFormattedTextField mDecay[];
JButton mCancel_button;
JButton mOK_button;
boolean mOK;
SFTPaletteOld mPalette;
ColourButton mStart_colour;
ColourButton mEnd_colour;
String mInitial_state;
Component mComponent;
JFrame mFrame;
PaletteIO mPalette_io;

static int NUM_BANDS = 6;

JFormattedTextField mBand_start[];
JFormattedTextField mBand_length[];
JFormattedTextField mBand_period[];
ColourButton mBand_modulate[];
ColourButton mBand_offset[];

	public PaletteDialogOld(JFrame aFrame, Component aComponent, IPaletteChangeNotify aNotify, PaletteIO aPalette_io)
	{
		mPalette = new SFTPaletteOld(aNotify);
		mComponent = aComponent;
		mFrame = aFrame;
		mPalette_io = aPalette_io;
		
		mDialog = new JDialog(aFrame, "Edit Palette", false);
		md_di = new JFormattedTextField[3][2];
		mDecay = new JFormattedTextField[3];
		
		mBand_start = new JFormattedTextField[NUM_BANDS];
		mBand_length = new JFormattedTextField[NUM_BANDS];
		mBand_period = new JFormattedTextField[NUM_BANDS];
		mBand_modulate = new ColourButton[NUM_BANDS];
		mBand_offset= new ColourButton[NUM_BANDS];
		
		JPanel p = new JPanel();
        JLabel label;
        mDialog.setSize(new Dimension(550,500));
        p.setPreferredSize(new Dimension(540,500));

        mDialog.setContentPane(p);
  
        
        p.setLayout(new GridBagLayout());
        GridBagConstraints gbc = new GridBagConstraints();

        NumberFormat format = new DecimalFormat();
        format.setMaximumFractionDigits(7);
   
        gbc.ipady = 20;
        gbc.gridy=0;
        gbc.gridx=0;
        gbc.gridwidth=1;
        gbc.fill = GridBagConstraints.HORIZONTAL;
 //       JButton col = new JButton("Start Colour");
 //       col.setBorder(BorderFactory.createMatteBorder(5, 5, 5, 5, Color.orange));
        mStart_colour = new ColourButton("Start Colour", Color.black, aFrame);
        p.add(mStart_colour,gbc);       
        //col.addActionListener(this);       	
        gbc.gridx+=2;
        mEnd_colour = new ColourButton("M.Set Colour", Color.black, aFrame);
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
        gbc.gridwidth=1;
        gbc.fill = GridBagConstraints.HORIZONTAL;
        label=new JLabel("", null, JLabel.RIGHT);
        p.add(label,gbc);       
 
        gbc.gridx=1;
        gbc.gridwidth=1;
        gbc.fill = GridBagConstraints.HORIZONTAL;
        label=new JLabel("Gradient Start", null, JLabel.CENTER);
        p.add(label,gbc);       

        gbc.gridx=2;
        gbc.gridwidth=1;
        gbc.fill = GridBagConstraints.HORIZONTAL;
        label=new JLabel("Final Gradient", null, JLabel.CENTER);
        p.add(label,gbc);
        
        gbc.gridx=3;
        gbc.gridwidth=1;
        gbc.fill = GridBagConstraints.HORIZONTAL;
        label=new JLabel("Half Life", null, JLabel.CENTER);
        p.add(label,gbc);       

        
        String[] labels ={"Red", "Green","Blue"};
        
        gbc.gridy++;
        int i;
        for (i=0; i<3; i++)
        {
	        gbc.gridx=0;
	        gbc.gridwidth=1;
	        gbc.fill = GridBagConstraints.HORIZONTAL;
	        label=new JLabel(labels[i], null, JLabel.RIGHT);
	        p.add(label,gbc);       
	 
	        gbc.gridx=1;
	        gbc.fill = GridBagConstraints.HORIZONTAL;
	        md_di[i][0] = new JFormattedTextField(format);
	        md_di[i][0].setPreferredSize(new Dimension(100,20));
	        md_di[i][0].setValue(1024);
	        p.add(md_di[i][0], gbc);       

	        gbc.gridx=2;
	        gbc.fill = GridBagConstraints.HORIZONTAL;
	        md_di[i][1] = new JFormattedTextField(format);
	        md_di[i][1].setPreferredSize(new Dimension(100,20));
	        md_di[i][1].setValue(1024);
	        p.add(md_di[i][1], gbc);   
	        	        
	        gbc.gridx=3;
	        gbc.fill = GridBagConstraints.HORIZONTAL;
	        mDecay[i] = new JFormattedTextField(format);
	        mDecay[i].setPreferredSize(new Dimension(100,20));
	        mDecay[i].setValue(1024);
	        p.add(mDecay[i], gbc); 
	        
	        gbc.gridy+=1;
        } 
  
        gbc.gridx=0;
        gbc.ipady=10;
        gbc.gridwidth=3;
        gbc.fill = GridBagConstraints.HORIZONTAL;
        label=new JLabel("", null, JLabel.LEFT);
        p.add(label,gbc);       
        gbc.ipady=0;
        gbc.gridy++;
        
        gbc.gridx=0;
        gbc.ipady=10;
        gbc.gridwidth=3;
        gbc.fill = GridBagConstraints.HORIZONTAL;
        label=new JLabel("Colour Bands", null, JLabel.LEFT);
        p.add(label,gbc);       
        gbc.ipady=0;
 
     
        gbc.gridy++;
        gbc.gridx=0;
        gbc.gridwidth=1;
        gbc.fill = GridBagConstraints.HORIZONTAL;
        label=new JLabel("Start", null, JLabel.CENTER);
        p.add(label,gbc);       
 
        gbc.gridx=1;
        gbc.gridwidth=1;
        gbc.fill = GridBagConstraints.HORIZONTAL;
        label=new JLabel("Length", null, JLabel.CENTER);
        p.add(label,gbc);       

        gbc.gridx=2;
        gbc.gridwidth=1;
        gbc.fill = GridBagConstraints.HORIZONTAL;
        label=new JLabel("Period", null, JLabel.CENTER);
        p.add(label,gbc);
        
        gbc.gridx=3;
        gbc.gridwidth=1;
        gbc.fill = GridBagConstraints.HORIZONTAL;
        label=new JLabel("Modulate", null, JLabel.CENTER);
        p.add(label,gbc);       
        
        gbc.gridx=4;
        gbc.gridwidth=1;
        gbc.fill = GridBagConstraints.HORIZONTAL;
        label=new JLabel("Offset", null, JLabel.CENTER);
        p.add(label,gbc);       
  
        
        for (i=0; i<NUM_BANDS; i++)
        {
	        gbc.gridy++;
	        //Band boxes
	        gbc.gridx=0;
	        gbc.fill = GridBagConstraints.HORIZONTAL;
	        mBand_start[i] = new JFormattedTextField(format);
	        mBand_start[i].setPreferredSize(new Dimension(100,20));
	        mBand_start[i].setValue(1024);
	        p.add(mBand_start[i], gbc);       
	
	        gbc.gridx++;
	               gbc.fill = GridBagConstraints.HORIZONTAL;
	        mBand_length[i] = new JFormattedTextField(format);
	        mBand_length[i].setPreferredSize(new Dimension(100,20));
	        mBand_length[i].setValue(1024);
	        p.add(mBand_length[i], gbc);   
	        	        
	        gbc.gridx++;
	        gbc.fill = GridBagConstraints.HORIZONTAL;
	        mBand_period[i] = new JFormattedTextField(format);
	        mBand_period[i].setPreferredSize(new Dimension(100,20));
	        mBand_period[i].setValue(1024);
	        p.add(mBand_period[i], gbc); 
	        
	        //band colours
	        gbc.gridx++;
	        mBand_modulate[i] = new ColourButton("", Color.black, aFrame);
	        p.add(mBand_modulate[i],gbc);       
	        //col.addActionListener(this);       	
	        gbc.gridx++;
	        mBand_offset[i] = new ColourButton("", Color.black, aFrame);
	        p.add(mBand_offset[i],gbc);       
        }
        
        gbc.ipady = 0;
        gbc.insets = new Insets(30,0,0,0);  //top padding
        gbc.anchor = GridBagConstraints.PAGE_END; //bottom of space
        gbc.gridx=0;
        gbc.gridy++;
        gbc.fill = GridBagConstraints.HORIZONTAL;
        gbc.gridwidth=1;
        mCancel_button = new JButton("Refresh");
        p.add(mCancel_button,gbc);
        mCancel_button.addActionListener(this);       

 
        gbc.gridx++;
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
        gbc.fill = GridBagConstraints.HORIZONTAL;
        gbc.gridwidth=1;
        mCancel_button = new JButton("Cancel");
        p.add(mCancel_button,gbc);
        mCancel_button.addActionListener(this);       
       
        
        gbc.gridx++;
        gbc.fill = GridBagConstraints.HORIZONTAL;
        gbc.gridwidth=1;
        mOK_button = new JButton("   OK   ");
        p.add(mOK_button,gbc);
        mOK_button.addActionListener(this);       	

	}
	
	public boolean Run()
	{	
	    mDialog.setLocationRelativeTo(mComponent);
		GetPaletteValues();	
		mInitial_state = mPalette.ToString();
		mDialog.setVisible(true);
		return mOK;
	}

	@Override
	public void actionPerformed(ActionEvent event)
	{
		String command = event.getActionCommand();
		if (command=="   OK   ")
		{
			mOK=true;
			mDialog.setVisible(false);
			SetPaletteValues();
		}
		else if (command=="Cancel")
		{
			mOK=false;
			mDialog.setVisible(false);
			mPalette.ParseString(mInitial_state);
		}
		else if (command=="Refresh")
		{
			SetPaletteValues();
		}
		else if (command=="Help")
		{
			JOptionPane.showMessageDialog(mComponent, "Use the gradient values to control how the colour channels change with the iteration count.\n"+
					"Use the colour bands to create bands of modified colour to high light structure in highly chaotic regions.",
								"Palette Help",					
								JOptionPane.PLAIN_MESSAGE);
	
		}
		else if (command=="Load")
		{
			String str = mPalette_io.LoadPalette();
			if (str!=null)
			{
				mPalette.ParseString(str);
				
				GetPaletteValues();
			
			}
		}
		else if (command=="Save")
		{
			String str = mPalette.ToString();

			mPalette_io.SavePalette(str);
		}		
	}
	
	public IPalette GetPalette()
	{
		return mPalette;
	}
	
	public void MakePaletteLibrary(JMenuBar aMenuBar)
	{
		//Not implemented
	}
	
	void GetPaletteValues()
	{
		float[][] p = new float[3][3];
		Color cols[] = new Color[2];
		
		mPalette.GetGradientValues(p, cols);
		
		for (int i=0; i<3; i++)
		{
			md_di[i][0].setValue(p[i][0]);
			md_di[i][1].setValue(p[i][1]);
			mDecay[i].setValue(p[i][2]);	
		}
		
		mStart_colour.SetColour(cols[0]);
		mEnd_colour.SetColour(cols[1]);
		
		for (int i=0; i<NUM_BANDS; i++)
		{
			int[] x = mPalette.GetBand(i);
			
			mBand_start[i].setValue(x[0]);
			mBand_length[i].setValue(x[1]);
			mBand_period[i].setValue(x[2]);
			
			mBand_modulate[i].SetColour(x[6],x[7],x[8]);
			mBand_offset[i].SetColour(x[3],x[4],x[5]);
		}
	}
	void SetPaletteValues()
	{
		float[][] p = new float[3][3];
		
		for (int i=0; i<3; i++)
		{
			p[i][0] = ((Number) md_di[i][0].getValue()).floatValue();
			p[i][1] = ((Number) md_di[i][1].getValue()).floatValue();
			p[i][2] = ((Number)(mDecay[i].getValue())).floatValue();	
		}
		
		int[] band = new int[9];
		
		for (int i=0; i<NUM_BANDS; i++)
		{
			band[0] = ((Number) mBand_start[i].getValue()).intValue();
			band[1] = ((Number) mBand_length[i].getValue()).intValue();
			band[2] = ((Number) mBand_period[i].getValue()).intValue();
			
			band[3] = mBand_offset[i].GetColour().getRed();
			band[4] = mBand_offset[i].GetColour().getGreen();
			band[5] = mBand_offset[i].GetColour().getBlue();
	
			band[6] = mBand_modulate[i].GetColour().getRed();
			band[7] = mBand_modulate[i].GetColour().getGreen();
			band[8] = mBand_modulate[i].GetColour().getBlue();
			
			mPalette.SetBand(i,band);
		}
		mPalette.SetGradientValues(p, mStart_colour.GetColour(), mEnd_colour.GetColour());
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
		
		char arr[]=new char[1024];

		try {
			br.read(arr, 0,1024);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return;
		}
		str = String.copyValueOf(arr);
		
		mPalette.ParseString(str);
		
		GetPaletteValues();
	}
}