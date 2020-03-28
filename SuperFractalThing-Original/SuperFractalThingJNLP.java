
//	SuperFractalThingJNLP
//	Super class of SuperFractalThing that adds JNLP file access
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
import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;

import javax.jnlp.FileContents;
import javax.jnlp.FileOpenService;
import javax.jnlp.FileSaveService;
import javax.jnlp.ServiceManager;
import javax.jnlp.UnavailableServiceException;
import javax.swing.JFrame;


public class SuperFractalThingJNLP extends SuperFractalThing
{
	private static final long serialVersionUID = 1;//get rid of warning

	public SuperFractalThingJNLP()
	{
		// TODO Auto-generated constructor stub
	}
	public static void main(String[] args)
	{
		System.out.println("JNLP");
		
		mFrame = new JFrame("SuperFractalThing");
		mFrame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

		SuperFractalThing ap = new SuperFractalThingJNLP();
		ap.init();
	    ap.start();

    
	    mFrame.add("Center", ap);
	    mFrame.pack();
	    mFrame.setVisible(true);
	}
	
	@Override
	void OpenFile()
	{
		FileOpenService fos; 
	
	    try
	    { 
	        fos = (FileOpenService)ServiceManager.lookup("javax.jnlp.FileOpenService"); 
	    }
	    catch (UnavailableServiceException e)
	    { 
	    	super.OpenFile();
		    return;
	    }
	    
	    if (fos != null)
	    { 
	        try
	        { 
	            // ask user to select a file through this service 
	            FileContents fc = fos.openFileDialog(null, null); 
	            // ask user to select multiple files through this service 
	            //FileContents[] fcs = fos.openMultiFileDialog(null, null); 
	            
	            InputStream is = fc.getInputStream();
	            BufferedReader br = new BufferedReader( new InputStreamReader(is));		
	            LoadTheFile(br);
	        }
	        catch (Exception e)
	        { 
	            e.printStackTrace(); 
	        } 
	    }        
    } 	
	
	@Override
	void SaveFile(String str)
	{
		FileSaveService fss; 
	    try
	    { 
	        fss = (FileSaveService)ServiceManager.lookup("javax.jnlp.FileSaveService"); 
	    }
	    catch (UnavailableServiceException e)
	    { 
	        fss = null; 
	    } 
	    
	    if (fss!=null)
	    {
			
			ByteArrayInputStream bis;
			try
			{
				bis = new ByteArrayInputStream(str.getBytes("UTF-8"));
			}
			catch (UnsupportedEncodingException e)
			{
				// TODO Auto-generated catch block
				e.printStackTrace();
				return;
			}
			
			String[] exts={"txt"};
	  
			try {
				fss.saveFileDialog(null,exts,bis,"sft_save.txt");
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
	    }
	    else
	    {
	    	super.SaveFile(str);
	    }
	}

	@Override
	void SaveByteArrayOutputStream(ByteArrayOutputStream bos)
	{
		FileSaveService fss; 
	    try { 
	        fss = (FileSaveService)ServiceManager.lookup("javax.jnlp.FileSaveService"); 
	    } catch (UnavailableServiceException e) { 
	        fss = null; 
	    } 
	    
	    if (fss!=null)
	    {
		    ByteArrayInputStream bis = new ByteArrayInputStream(bos.toByteArray());
		    String[] exts={"png"};
			try {
				fss.saveFileDialog(null,exts,bis,"sft_exp.png");
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}	    	
	    }
	    else
	    {
	    	super.SaveByteArrayOutputStream(bos);
	    }
	}
	
	@Override
	public void SavePalette(String str)
	{
		ByteArrayInputStream bis;
		FileSaveService fss; 
	    try
	    { 
	        fss = (FileSaveService)ServiceManager.lookup("javax.jnlp.FileSaveService"); 
			bis = new ByteArrayInputStream(str.getBytes("UTF-8"));
	    	String[] exts={"txt"};
			fss.saveFileDialog(null,exts,bis,"sft_save.txt");
			return;
	    }
	    catch (UnavailableServiceException e)
	    { 
	    } 
	    catch (IOException e)
	    {	
	   
	    }
	    
	    super.SavePalette(str);
	}
	
	@Override
	public String LoadPalette()
	{
		FileOpenService fos; 

	    try
	    { 
	        fos = (FileOpenService)ServiceManager.lookup("javax.jnlp.FileOpenService"); 
	    }
	    catch (UnavailableServiceException e)
	    { 
		    return super.LoadPalette();        
	    } 

	    if (fos != null)
	    { 
	        try
	        { 
	            // ask user to select a file through this service 
	            FileContents fc = fos.openFileDialog(null, null); 
	            // ask user to select multiple files through this service 
	            //FileContents[] fcs = fos.openMultiFileDialog(null, null); 
	            
	            InputStream is = fc.getInputStream();
	            BufferedReader br = new BufferedReader( new InputStreamReader(is));		
				char arr[]=new char[2048];
				br.read(arr, 0,2048);
				String str = String.copyValueOf(arr);
				return str;
	        }
	        catch (Exception e)
	        { 
	            e.printStackTrace(); 
	        } 
	    } 
	    return null;
	}
}
