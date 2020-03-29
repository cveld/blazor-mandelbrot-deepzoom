//
// ExportDialog
// The export dialog for saving out png images.
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
import java.awt.Component;
import java.awt.Dimension;
import java.awt.GridBagConstraints;
import java.awt.GridBagLayout;
import java.awt.Insets;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.text.DecimalFormat;

import javax.swing.JButton;
import javax.swing.JComboBox;
import javax.swing.JDialog;
import javax.swing.JFormattedTextField;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;


public class ExportDialog implements ActionListener
{
JDialog mDialog;
JFormattedTextField mWidth_box;
JFormattedTextField mHeight_box;
JComboBox<String> mSuper_sample;
JButton mCancel_button;
JButton mOK_button;
boolean mOK;
Component mComponent;

	int GetWidth()
	{
		int x = Integer.parseInt(mWidth_box.getText());
		return x;
	}
	
	int GetHeight()
	{
		int x = Integer.parseInt(mHeight_box.getText());
		return x;
	}
	
	SuperSampleType GetSuperSample()
	{
		switch (mSuper_sample.getSelectedIndex())
		{
		case 0:
			return SuperSampleType.SUPER_SAMPLE_NONE;
		case 1:
			return SuperSampleType.SUPER_SAMPLE_2X;
		case 2:
			return SuperSampleType.SUPER_SAMPLE_4X;
		case 3:
			return SuperSampleType.SUPER_SAMPLE_4X_9;
		case 4:
			return SuperSampleType.SUPER_SAMPLE_9X;
		}
		return SuperSampleType.SUPER_SAMPLE_2X;
	}
	
	public ExportDialog(JFrame aFrame, Component aComponent)
	{
		mDialog = new JDialog(aFrame, "Export PNG image", true);
		mComponent = aComponent;
		
        JPanel p = new JPanel();
        JLabel label;
        mDialog.setSize(new Dimension(300,260));
        p.setPreferredSize(new Dimension(300,260));

        mDialog.setContentPane(p);
  
        mDialog.setLocationRelativeTo(aComponent);
       
        p.setLayout(new GridBagLayout());
        GridBagConstraints gbc = new GridBagConstraints();

        gbc.ipady = 5;
        
        gbc.gridx=0;
        gbc.gridy=0;
        gbc.gridwidth=2;
        
        gbc.gridx=0;
        gbc.gridy=0;
        gbc.gridwidth=1;
        gbc.fill = GridBagConstraints.HORIZONTAL;
        label=new JLabel("Width pixels", null, JLabel.RIGHT);
        p.add(label,gbc);       
 
        gbc.gridx=1;
        gbc.gridy=0;
        gbc.fill = GridBagConstraints.HORIZONTAL;
        DecimalFormat iformat = new DecimalFormat("#################");
        mWidth_box = new JFormattedTextField(iformat);
        mWidth_box.setPreferredSize(new Dimension(100,20));
        mWidth_box.setValue(1024);
        p.add(mWidth_box, gbc);       

        gbc.gridx=0;
        gbc.gridy=1;
        gbc.gridwidth=1;
        gbc.fill = GridBagConstraints.HORIZONTAL;
        label=new JLabel("Height pixels", null, JLabel.RIGHT);
        p.add(label,gbc);       
 
        gbc.gridx=1;
        gbc.fill = GridBagConstraints.HORIZONTAL;
        mHeight_box = new JFormattedTextField(iformat);
        mHeight_box.setPreferredSize(new Dimension(100,20));
        mHeight_box.setValue(768);
        p.add(mHeight_box, gbc);       
  
        gbc.gridx=0;
        gbc.gridy=2;
        gbc.gridwidth=1;
        gbc.fill = GridBagConstraints.HORIZONTAL;
        label=new JLabel("Super Sample", null, JLabel.RIGHT);
        p.add(label,gbc);       
        
        gbc.gridx=1;
        String options[] = {"None","x2","x4","x4 9 sample","x9"};
        mSuper_sample = new JComboBox<String>(options);
        mSuper_sample.setSelectedIndex(4);
        p.add(mSuper_sample,gbc);
        
        gbc.gridx=0;
        gbc.gridy++;
        gbc.gridwidth=2;
        gbc.ipady=50;
        gbc.fill = GridBagConstraints.HORIZONTAL;
        String str = "System Memory ";
        str+=java.lang.Runtime.getRuntime().maxMemory()/(1024.0*1024.0);
        str+="MB";
        label = new JLabel(str, null, JLabel.CENTER);
        p.add(label,gbc);
    
        gbc.ipady = 0;
        gbc.insets = new Insets(30,0,0,0);  //top padding
        gbc.anchor = GridBagConstraints.PAGE_END; //bottom of space
        gbc.gridx=0;
        gbc.gridy++;
        gbc.fill = GridBagConstraints.HORIZONTAL;
        gbc.gridwidth=1;
        mCancel_button = new JButton("Cancel");
        p.add(mCancel_button,gbc);
        mCancel_button.addActionListener(this);       

        gbc.gridx=1;
        //gbc.gridy=6;
        gbc.fill = GridBagConstraints.HORIZONTAL;
        gbc.gridwidth=1;
        mOK_button = new JButton("OK");
        p.add(mOK_button,gbc);
        mOK_button.addActionListener(this);       	

        
	}
	
	public boolean Run()
	{	
        mDialog.setLocationRelativeTo(mComponent);
		mDialog.setVisible(true);
		return mOK;
	}

	@Override
	public void actionPerformed(ActionEvent event)
	{
		String command = event.getActionCommand();
		if (command=="OK")
		{
			mOK=true;
			mDialog.setVisible(false);
		}
		else if (command=="Cancel")
		{
			mOK=false;
			mDialog.setVisible(false);
			
		}
		
	}
}
