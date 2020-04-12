//	SuperFractalThing
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
import javax.swing.JApplet;
import javax.swing.JFrame;
import javax.swing.JPanel;
//import javax.swing.JTextField;
import javax.swing.JButton;
import javax.swing.JFormattedTextField;
import javax.swing.JLabel;
import javax.swing.JMenuBar;
import javax.swing.JMenu;
import javax.swing.JMenuItem;
import javax.swing.JFileChooser;
import javax.swing.JOptionPane;
import javax.swing.JProgressBar;
import javax.swing.filechooser.FileNameExtensionFilter;
import javax.swing.text.InternationalFormatter;
import javax.swing.text.NumberFormatter;

import java.awt.event.ActionListener;
import java.awt.event.ActionEvent;
import java.awt.image.*;
import java.awt.*;
import java.io.BufferedWriter;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.FileWriter;

import javax.imageio.ImageIO;

import java.io.BufferedReader;
import java.io.IOException;
import java.math.BigDecimal;
import java.text.DecimalFormatSymbols;
import java.text.FieldPosition;
import java.text.NumberFormat;
import java.text.Format;
import java.text.DecimalFormat;
import java.text.AttributedCharacterIterator;
import java.text.ParsePosition;

interface IPaletteDialog extends ActionListener
{
	public boolean Run();
	public IPalette GetPalette();
	public void MakePaletteLibrary(JMenuBar aMenuBar);
}


public class SuperFractalThing  extends JApplet implements SFTGui, ActionListener, LibraryLoader, PaletteIO
{

	/**
	 * 
	 */
	private static final long serialVersionUID = 0;//get rid of warning
	static SftComponent mComp;
	static JFormattedTextField mSize_box;
	static JFormattedTextField mPos_x_box;
	static JFormattedTextField mPos_y_box;
	static JFormattedTextField mIterations_box;
	static BigDecimal mPos_x;
	static BigDecimal mPos_y;
	static BigDecimal mSize;
	JLabel mSize_label;
	JProgressBar mProgress_bar;
	JButton mCancel_button;
	JLabel mIterations_label;
	PositionLibrary mLibrary;
	PaletteLibrary pLibrary;
	JLabel mTime_label;
	JMenuBar mMenu_bar;
	ExportDialog mDialog;
	IPaletteDialog mPalette_dialog;
	OptionsDialog mOptions_dialog;
	IPalette mPalette;
	UndoBuffer mUndo_buffer;
	JMenuItem mRedo_item;
	JMenuItem mUndo_item;
	
	static JFrame mFrame;
	/**
	 * @param args
	 */

	public static void main(String[] args)
	{
		
		mFrame = new JFrame("SuperFractalThing");
		mFrame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

		SuperFractalThing ap = new SuperFractalThing();
		ap.init();
	    ap.start();

    
	    mFrame.add("Center", ap);
	    mFrame.pack();
	    mFrame.setVisible(true);

 
 	}

	public void start()
	{
	   // init();
	    

		mUndo_buffer = new UndoBuffer();
	    initComponents();	
		mPalette_dialog.Run();
	    
 	}
	
	public void SetProgress(int aProgress, int pMax)
	{
		mProgress_bar.setMaximum(pMax);
		mProgress_bar.setValue(aProgress);
	}

    public void AddToUndoBuffer()
    {
    	BigDecimal coords[] = GetCoords();
		mUndo_buffer.Push(coords[0],coords[1],GetTheSize(),GetIterations());
		if (mUndo_item!=null)
			mUndo_item.setEnabled(mUndo_buffer.CanUndo());
		if (mRedo_item!=null)
			mRedo_item.setEnabled(mUndo_buffer.CanRedo());
    }
    
    public void OutOfMemory()
    {
		JOptionPane.showMessageDialog(mFrame,
			    "Out of Memory!\n",
			    "Error",
			    JOptionPane.WARNING_MESSAGE);
    }   
    
	public void SetCalculationTime(long aTime_ms)
	{
		String text;
		if (aTime_ms>=0)
			text = "  Last calculation time: " + Double.toString((double)aTime_ms / 1000 )+" seconds";
		else
			text="";
		mTime_label.setText(text);
	}
	
	public void actionPerformed(ActionEvent event)
	{
		String command = event.getActionCommand();
		
		if (command=="Cancel")
		{
			mComp.Cancel();
		}
		if (command=="Open")
		{
			OpenFile();
		}
		else if (command=="Save")
		{
			String str;
			BigDecimal half = new BigDecimal(0.5);
			BigDecimal half_size =  GetTheSize().multiply(half);
			//size*=0.5f;
			
			str="s="+half_size.toString()+"\n";
			str+="r="+mPos_x_box.getText()+"\n";
			str+="i="+mPos_y_box.getText()+"\n";
			str+="iteration_limit="+mIterations_box.getValue()+"\n";

			
			SaveFile(str);
			

		}
		else if (command=="Reset")
		{
			mPos_x_box.setValue(new BigDecimal(-0.75));
			mPos_y_box.setValue(new BigDecimal(0.0));
			mSize_box.setValue(new BigDecimal(3.0));
			mIterations_box.setValue(new Integer(1024));
			mSize = new BigDecimal(3.0);
			AddToUndoBuffer();
			mComp.Refresh();
			mComp.repaint();						
		}
		else if (command=="Export PNG")
		{
			
			//ExportDialog dialog = new ExportDialog(mFrame, mComp);
			boolean res = mDialog.Run();
			if (!res)
				return;
			
			if (mDialog.GetWidth()>50000 || mDialog.GetHeight()>50000 || mDialog.GetWidth()<32 || mDialog.GetHeight()<32)
			{
				JOptionPane.showMessageDialog(mFrame,
					    "Invalid Image Size",
					    "Error",
					    JOptionPane.WARNING_MESSAGE);
				return;
		
			}
			try
			{
				mComp.ExportCalculation(mDialog.GetWidth(), mDialog.GetHeight(), mDialog.GetSuperSample());
			} catch (OutOfMemoryError e) {
				// TODO Auto-generated catch block
				JOptionPane.showMessageDialog(mFrame,
					    "Out of Memory!\n Try using a 64 bit browser.",
					    "Error",
					    JOptionPane.WARNING_MESSAGE);
				EndProcessing();
				return;
			};
			
/*			ByteArrayOutputStream bos = new ByteArrayOutputStream();
			try {
				ImageIO.write(mComp.GetImage(),"PNG",bos);
			} catch (IOException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
				return;
			}

			FileSaveService fss; 
		    try { 
		        fss = (FileSaveService)ServiceManager.lookup("javax.jnlp.FileSaveService"); 
		    } catch (UnavailableServiceException e) { 
		        fss = null; 
		        return;
		    } 
		    
		    ByteArrayInputStream bis = new ByteArrayInputStream(bos.toByteArray());
		    String[] exts={"png"};
			try {
				fss.saveFileDialog(null,exts,bis,"sft_exp.png");
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
*/		}
		else if (command=="Refresh")
		{
			mComp.Refresh();
			mComp.repaint();			
		}		    
		else if (command=="About")
		{
			//JOptionPane.showMessageDialog(mFrame, "Abitrary(ish) precision Mandelbrot set rendering in Java.\n\nVersion 0.1\n\n(c) Kevin Martin","SuperFractalThing Java",JOptionPane.PLAIN_MESSAGE);
			AboutDialog ad = new AboutDialog(mFrame,mComp);
			ad.Run();
		}
		else if (command=="Palette")
		{
			mPalette_dialog.Run();
		}
		else if (command=="Options")
		{
			mOptions_dialog.Run();
			mComp.SetSuperSampleType(mOptions_dialog.GetSuperSampleType());
			mComp.SetNumThreads(mOptions_dialog.GetNumThreads());
		}
		else if (command == "Undo")
		{
			if (mUndo_buffer.CanUndo())
			{
				mUndo_buffer.Undo();
				mPos_x_box.setValue(mUndo_buffer.GetX());
				mPos_y_box.setValue(mUndo_buffer.GetY());
				mSize_box.setValue(mUndo_buffer.GetSize());
				mIterations_box.setValue(mUndo_buffer.GetIterations());
				mComp.Refresh();
				mComp.repaint();			
				mUndo_item.setEnabled(mUndo_buffer.CanUndo());
				mRedo_item.setEnabled(mUndo_buffer.CanRedo());
			}
		}
		else if (command == "Redo")
		{
			if (mUndo_buffer.CanRedo())
			{
				mUndo_buffer.Redo();
				mPos_x_box.setValue(mUndo_buffer.GetX());
				mPos_y_box.setValue(mUndo_buffer.GetY());
				mSize_box.setValue(mUndo_buffer.GetSize());
				mIterations_box.setValue(mUndo_buffer.GetIterations());
				mComp.Refresh();
				mComp.repaint();			
				mUndo_item.setEnabled(mUndo_buffer.CanUndo());
				mRedo_item.setEnabled(mUndo_buffer.CanRedo());
			}
		}
	}
	
	void OpenFile()
	{
   	 	JFileChooser chooser = new JFileChooser();
		 
	    FileNameExtensionFilter filter = new FileNameExtensionFilter("SuperFractalThingFile",  "txt");
	    chooser.setFileFilter(filter);
	    int returnVal = chooser.showOpenDialog(this);
	    if(returnVal == JFileChooser.APPROVE_OPTION)
	    {
	       System.out.println("You chose to open this file: " +
	            chooser.getSelectedFile().getName());
	       
	       File f = chooser.getSelectedFile();
	       
	       LoadTheFile(f);
	       
	    } 
	    return;
	}
	
	void SaveFile(String str)
	{
   	 	JFileChooser chooser = new JFileChooser();
		 
	    FileNameExtensionFilter filter = new FileNameExtensionFilter("SuperFractalThingFile",  "txt");
	    chooser.setFileFilter(filter);
	    int returnVal = chooser.showSaveDialog(this);
	    if(returnVal == JFileChooser.APPROVE_OPTION)
	    {
	       System.out.println("You chose to open this file: " +
	            chooser.getSelectedFile().getName());
	       
	       File f = chooser.getSelectedFile();
	       
	       BufferedWriter file;
			try {
				file = new BufferedWriter(new FileWriter(f));
				file.write(str);
				file.close();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			};
	    } 
	}

	public void ExportImage(BufferedImage aImage)
	{
		ByteArrayOutputStream bos = new ByteArrayOutputStream();
		try {
			ImageIO.write(aImage,"PNG",bos);
		} catch (IOException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
			return;
		}

		SaveByteArrayOutputStream(bos);
	}
	
	
	void SaveByteArrayOutputStream(ByteArrayOutputStream bos)
	{	
	    JFileChooser chooser = new JFileChooser();
		 
	    FileNameExtensionFilter filter = new FileNameExtensionFilter("PNG",  "png");
	    chooser.setFileFilter(filter);
	    int returnVal = chooser.showSaveDialog(this);
	    if(returnVal == JFileChooser.APPROVE_OPTION)
	    {
	       
	       File f = chooser.getSelectedFile();
	       
	       FileOutputStream fs;
			try {
				fs = new FileOutputStream(f);
		       fs.write(bos.toByteArray());
		       fs.close();
			} catch (FileNotFoundException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
	    }
	    return;		
	}

	public void SetHoverIndex(int index)
	{
		String str = Integer.toString(index);
		mIterations_label.setText(str);
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
    	try
    	{
			String line1 = br.readLine();
			String line2 = br.readLine();
			String line3 = br.readLine();
			String line4 = br.readLine();
			
			
			if (line1.startsWith("s=") && line2.startsWith("r=") && line3.startsWith("i=") && line4.startsWith("iteration_limit="))
			{
				//double size = Double.parseDouble(line1.substring(2));
				//mSize_box.setText(Double.toString(size*2));
				BigDecimal size = new BigDecimal(line1.substring(2));
				size = size.add(size);
				mSize_box.setText(size.toString());
				mPos_x_box.setText(line2.substring(2));
				mPos_y_box.setText(line3.substring(2));
				mIterations_box.setValue(Integer.parseInt(line4.substring(16)));
				mComp.repaint();
				AddToUndoBuffer();
				mComp.DoCalculation();
				mComp.repaint();
				
			}
		

		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
    
	public void SetCoords( BigDecimal aSize, BigDecimal x, BigDecimal y, int iterations)
	{
		mSize_box.setValue(aSize);
		mPos_x_box.setValue(x);
		mPos_y_box.setValue(y);
		mIterations_box.setValue(iterations);
	}
	
	public BigDecimal GetTheSize()
	{
		return new BigDecimal(mSize_box.getText());
	}
	public int GetIterations()
	{
		return ((Number) mIterations_box.getValue()).intValue();
	}
	public void SetIterations(int aValue)
	{
		mIterations_box.setValue(aValue);
	}
	public BigDecimal[] GetCoords()
	{
		BigDecimal[] x=new BigDecimal[2];
		x[0]=new BigDecimal(mPos_x_box.getText());
		x[1]=new BigDecimal(mPos_y_box.getText());
		return x;
	}
    public void initComponents()
    {     
        //setLayout(new BorderLayout());
        JPanel p = new JPanel();
        p.setLayout(new GridBagLayout());
        GridBagConstraints gbc = new GridBagConstraints();
        gbc.gridx=0;
        gbc.gridy=0;
        gbc.gridwidth=8;
        //p.setLayout(new BoxLayout(p, BoxLayout.Y_AXIS));
        mComp = new SftComponent(this);
        
        p.add(mComp,gbc);

        p.addMouseListener(mComp);
        p.addMouseMotionListener(mComp);
        add("North", p);
        
        gbc.gridy+=1;
        gbc.gridwidth=7;
        gbc.fill = GridBagConstraints.HORIZONTAL;
        mProgress_bar = new JProgressBar(0, 1024*768);
        mProgress_bar.setSize(new Dimension(896,20));
        mProgress_bar.setPreferredSize(new Dimension(896,20));
        p.add(mProgress_bar,gbc);
        mProgress_bar.setVisible(false);
        
        gbc.gridx=7;
        gbc.fill = GridBagConstraints.HORIZONTAL;
        gbc.gridwidth=1;
        mCancel_button = new JButton("Cancel");
        p.add(mCancel_button,gbc);
        mCancel_button.setVisible(false);
        mCancel_button.addActionListener(this);
        
        gbc.ipady=(mProgress_bar.getHeight()-mCancel_button.getHeight())/2;
        gbc.gridx=0;
        gbc.gridy+=1;
        gbc.gridwidth=1;
        gbc.fill = GridBagConstraints.HORIZONTAL;
        mSize_label=new JLabel("Horizontal size", null, JLabel.LEFT);
        p.add(mSize_label,gbc);
       
        InternationalFormatter f2 = new InternationalFormatter();
        f2.setFormat(new BigDecimalFormat());
        f2.setAllowsInvalid(false);
 
        InternationalFormatter size_format = new InternationalFormatter();
        size_format.setFormat(new BigDecimalFormat());
        size_format.setAllowsInvalid(false);

        gbc.gridx=1;
        gbc.gridwidth=2; 
        gbc.fill = GridBagConstraints.HORIZONTAL;
        //DecimalFormat format = new DecimalFormat("#.#####E0");
        mSize = new BigDecimal(1.5);
        mSize_box = new JFormattedTextField(size_format);
        mSize_box.setPreferredSize(new Dimension(400,20));
        //mSize_box.setAlignmentY(1);
        p.add(mSize_box, gbc);
 
        gbc.gridx=6;
        gbc.gridwidth=2;
        gbc.fill = GridBagConstraints.HORIZONTAL;
        mIterations_label = new JLabel("Iterations:", null, JLabel.CENTER);
        p.add(mIterations_label,gbc);
        
        gbc.ipady=0;
        gbc.gridx=0;
        gbc.gridy+=1;
        gbc.gridwidth=1;
        gbc.fill = GridBagConstraints.HORIZONTAL;
        p.add(new JLabel("Real position", null, JLabel.LEFT),gbc);
        
        gbc.gridx=1;
        gbc.gridwidth=7;
       
        //f2.setMaximumFractionDigits(1000);
        mPos_x = new BigDecimal(-0.5);
        mPos_x_box = new JFormattedTextField(f2);
        mPos_x_box.setPreferredSize(new Dimension(200,20));
        //mPos_x_box.setAlignmentY(1);
        p.add(mPos_x_box, gbc);
        
        gbc.gridx=0;
        gbc.gridy+=1;
        gbc.gridwidth=1;
        gbc.fill = GridBagConstraints.HORIZONTAL;
        p.add(new JLabel("Imaginary position", null, JLabel.LEFT),gbc);

        gbc.gridx=1;
        gbc.gridwidth=7;
        mPos_y = new BigDecimal(0);
        mPos_y_box = new JFormattedTextField(f2);
        mPos_y_box.setPreferredSize(new Dimension(200,20));
        //mPos_y_box.setAlignmentY(1);
        p.add(mPos_y_box, gbc);   
 
        
        gbc.gridx=0;
        gbc.gridy+=1;
        gbc.gridwidth=1;
        gbc.fill = GridBagConstraints.HORIZONTAL;
        p.add(new JLabel("Iteration Limit", null, JLabel.LEFT),gbc);

        gbc.gridx=1;
        gbc.gridwidth=4;
        NumberFormat iformat = NumberFormat.getInstance();// new DecimalFormat("#################");
        mIterations_box = new JFormattedTextField(iformat);
        mIterations_box.setPreferredSize(new Dimension(400,20));
        p.add(mIterations_box, gbc);   
        
        gbc.gridx=5;
        gbc.gridwidth=2;
        gbc.fill = GridBagConstraints.HORIZONTAL;
        mTime_label =new JLabel("", null, JLabel.CENTER);
        p.add(mTime_label, gbc);   


		mDialog = new ExportDialog(mFrame, mComp);
		mPalette_dialog = new PaletteDialogOld(mFrame, mComp, mComp, this);
		//mPalette_dialog = new PaletteDialog(mFrame, mComp, mComp, this);
		mPalette = mPalette_dialog.GetPalette();
		mComp.SetPalette(mPalette);
		mOptions_dialog = new OptionsDialog(mFrame, mComp);
		mOptions_dialog.SetSuperSampleType(SuperSampleType.SUPER_SAMPLE_2X);
		mComp.SetSuperSampleType(mOptions_dialog.GetSuperSampleType());
		mComp.CreateImage();
        
 	   //Menu bar
	    JMenuBar menuBar = new JMenuBar();
	    JMenu menu = new JMenu("SuperFractalThing");
	    JMenu navigate = new JMenu("Controls");
 
	    JMenuItem menuItem = new JMenuItem("Refresh");
        menuItem.addActionListener(this);
        navigate.add(menuItem);
 
	    menuItem = new JMenuItem("Undo");
        menuItem.addActionListener(this);
        navigate.add(menuItem);
        mUndo_item = menuItem;
        mUndo_item.setEnabled(false);
       
	    menuItem = new JMenuItem("Redo");
        menuItem.addActionListener(this);
        navigate.add(menuItem);
        mRedo_item = menuItem;
        mRedo_item.setEnabled(false);
        
        menuItem = new JMenuItem("Reset");
        menuItem.addActionListener(this);
        navigate.add(menuItem);
        
        
        menuItem = new JMenuItem("Open");
        menuItem.addActionListener(this);
        menu.add(menuItem);
        
        menuItem = new JMenuItem("Save");
        menuItem.addActionListener(this);
        menu.add(menuItem);

        menuItem = new JMenuItem("Export PNG");
        menuItem.addActionListener(this);
        menu.add(menuItem);

        menuItem = new JMenuItem("Palette");
        menuItem.addActionListener(this);
        menu.add(menuItem);

        menuItem = new JMenuItem("Options");
        menuItem.addActionListener(this);
        menu.add(menuItem);


        menuItem = new JMenuItem("About");
        menuItem.addActionListener(this);
        menu.add(menuItem);
      
        menuBar.add(menu);
        menuBar.add(navigate);
        
       	mLibrary = new PositionLibrary(menuBar, this);
       	mPalette_dialog.MakePaletteLibrary(menuBar);
       	//pLibrary = new PaletteLibrary(menuBar, mPalette_dialog);

       	setJMenuBar(menuBar);
	    mMenu_bar = menuBar;
	    

		mComp.SetSuperSampleType(mOptions_dialog.GetSuperSampleType());
		mComp.SetNumThreads(mOptions_dialog.GetNumThreads());

    }
    
    public void StartProcessing()
    {
    	mMenu_bar.getComponent(0).setEnabled(false);
    	mMenu_bar.getComponent(1).setEnabled(false);
       	mMenu_bar.getComponent(2).setEnabled(false);
           	SetProgress(0,1024);
    	mProgress_bar.setVisible(true);
    	mCancel_button.setVisible(true);
        mSize_label.setVisible(false);
        mIterations_label.setVisible(false);
        mSize_box.setVisible(false);
    }
    
    public void EndProcessing()
    {
    	mMenu_bar.getComponent(0).setEnabled(true);
    	mMenu_bar.getComponent(1).setEnabled(true);
    	mMenu_bar.getComponent(2).setEnabled(true);
    	mProgress_bar.setVisible(false);
    	mCancel_button.setVisible(false);
    	mSize_label.setVisible(true);
        mIterations_label.setVisible(true);
        mSize_box.setVisible(true);    	
   }

	@Override
	public void SavePalette(String str)
	{
   	 	JFileChooser chooser = new JFileChooser();
		 
	    FileNameExtensionFilter filter = new FileNameExtensionFilter("SuperFractalThingFile",  "txt");
	    chooser.setFileFilter(filter);
	    int returnVal = chooser.showSaveDialog(mComp);
	    if(returnVal == JFileChooser.APPROVE_OPTION)
	    {
	       System.out.println("You chose to open this file: " +
	            chooser.getSelectedFile().getName());
	       
	       File f = chooser.getSelectedFile();
	       
	       BufferedWriter file;
			try {
				file = new BufferedWriter(new FileWriter(f));
				file.write(str);
				file.close();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				return;
			};
	    } 
	    return;
	}

	@Override
	public String LoadPalette()
	{
   	 	JFileChooser chooser = new JFileChooser();
		 
	    FileNameExtensionFilter filter = new FileNameExtensionFilter("SuperFractalThingFile",  "txt");
	    chooser.setFileFilter(filter);
	    int returnVal = chooser.showOpenDialog(mComp);
	    if(returnVal == JFileChooser.APPROVE_OPTION)
	    {
	       System.out.println("You chose to open this file: " +
	            chooser.getSelectedFile().getName());
	       
	       File f = chooser.getSelectedFile();
	       
			try
			{
				FileReader fr = new FileReader(f);
				BufferedReader br = new BufferedReader(fr);
				char arr[]=new char[2048];
				br.read(arr, 0,2048);
				String str = String.copyValueOf(arr);
				br.close();
				return str;
				
			}
			catch (FileNotFoundException e)
			{
				// TODO Auto-generated catch block
				e.printStackTrace();
				return null;
			}
			catch (IOException e)
			{
				return null;			
			}

		}  
	    return null;
	}


}


class BigDecimalFormatter extends NumberFormatter
{
	private static final long serialVersionUID = 0;

	BigDecimalFormatter()
	{
		//setAllowsInvalid(false);
	}
	
	public Object stringToValue(String text) //throws ParseException
	{
		if("".equals(text.trim()))
		{
		return null;
		}
		char ds = getDefaultLocaleDecimalSeparator();

 
		try
		{
			String val = text;
			if(ds != '.')
			{
				val = val.replace(".", "").replace(ds, '.');
			}
			return new BigDecimal(val);
		} catch(NumberFormatException e)
		{
			return null;
		}
	}
	
	public String valueToString(Object value) //throws ParseException
	{
		if (value!=null)
			return value.toString();
		else
			return null;
	}
	 
	private char getDefaultLocaleDecimalSeparator()
	{
		DecimalFormatSymbols symbols = new DecimalFormat("0").getDecimalFormatSymbols();
		char ds = symbols.getDecimalSeparator();
		return ds;
	}

}


class BigDecimalFormat extends Format
{
	private static final long serialVersionUID = 0;//get rid of warning
	BigDecimal mOld_value;
	String mOld_string;

	String Format(Object number)
	{
		BigDecimal x=(BigDecimal)number;
		return x.toString();
	}
	
	public AttributedCharacterIterator formatToCharacterIterator(Object obj)
	{
		return null;
	}

	public Object 	parseObject(String source)
	{
		mOld_string = null;
		try
		{
			BigDecimal x= new BigDecimal(source);
			mOld_value = x;
			if (source.endsWith(".") || source.contentEquals("-0") || source.contains("E") || source.contains("e"))
				mOld_string = source;
			return x;
		}
		catch (NumberFormatException e)
		{
			if (source.length()==0)
			{
				mOld_value=null;
				mOld_string=null;
				return null;
			}
			if (source.equals("-") || source.endsWith("E") || source.endsWith("e") || source.endsWith("-"))
			{
				mOld_string = source;
				mOld_value = new BigDecimal(0);
				return mOld_value;
			}
			return mOld_value;
		}
	}

	@Override
	public StringBuffer format(Object arg0, StringBuffer arg1,
			FieldPosition arg2)
	{
		if (mOld_string!=null && mOld_value.equals(arg0))
		{
			arg1.append(mOld_string);
			return arg1;
		}
		
		BigDecimal x=(BigDecimal)arg0;
		String str = x.toString();
		arg1.append(str);
		return arg1;
	}

	@Override
	public Object parseObject(String arg0, ParsePosition arg1)
	{
		return parseObject(arg0);
	}
}
