//	Options Dialog
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
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.text.NumberFormat;

import javax.swing.JButton;
import javax.swing.JDialog;
import javax.swing.JFormattedTextField;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JComboBox;


public class OptionsDialog implements ActionListener
{
	JDialog mDialog;
	Component mComponent;
	JFrame mFrame;
	JButton mCancel_button;
	JButton mOK_button;
	boolean mOK;
	JFormattedTextField mNum_threads;
	JComboBox<String> mSuper_sample;
	int mSave_ss;
	int mSave_thr;
	
	public OptionsDialog(JFrame aFrame, Component aComponent)
	{
		mComponent = aComponent;
		mFrame = aFrame;
		mOK = false;
		
		mDialog = new JDialog(aFrame, "SuperFractalThing Options", true);
	
		JPanel p = new JPanel();
        JLabel label;
        mDialog.setSize(new Dimension(250,150));
        p.setPreferredSize(new Dimension(250,150));

        mDialog.setContentPane(p);
  
        mDialog.setLocationRelativeTo(aComponent);
       
        p.setLayout(new GridBagLayout());
        GridBagConstraints gbc = new GridBagConstraints();
	
        gbc.gridy=0;
        gbc.gridx=0;
        gbc.gridwidth=1;
        gbc.ipady=10;
        gbc.fill = GridBagConstraints.HORIZONTAL;
        label=new JLabel("Number of threads", null, JLabel.RIGHT);
        p.add(label,gbc);       
 
        gbc.gridx=1;
        gbc.fill = GridBagConstraints.HORIZONTAL;
        mNum_threads = new JFormattedTextField(NumberFormat.getInstance());
        mNum_threads.setPreferredSize(new Dimension(100,20));
        mNum_threads.setValue(Runtime.getRuntime().availableProcessors());
        p.add(mNum_threads, gbc);       
        
        gbc.gridy++;
        gbc.gridx=0;
        gbc.gridwidth=1;
        gbc.fill = GridBagConstraints.HORIZONTAL;
        label=new JLabel("Super Sample", null, JLabel.RIGHT);
        p.add(label,gbc);       
 
        gbc.gridx=1;
        gbc.fill = GridBagConstraints.HORIZONTAL;
        String[] options = {"None", "x2","x4","x4 9 sample","x9"};
        mSuper_sample = new JComboBox<String>(options);
        mSuper_sample.setPreferredSize(new Dimension(150,20));
        mSuper_sample.setSelectedIndex(0);
        p.add(mSuper_sample, gbc);       
  
        gbc.ipady=0;
        gbc.gridy++;
        gbc.gridx=0;
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
		
		
	public int GetNumThreads()
	{
		String str=mNum_threads.getValue().toString();
		return Integer.parseInt(str);
	}
	
	public SuperSampleType GetSuperSampleType()
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
		default:
			return SuperSampleType.SUPER_SAMPLE_NONE;
		}
	}
	public void SetSuperSampleType(SuperSampleType aType)
	{
		switch (aType)
		{
		case SUPER_SAMPLE_NONE:
			mSuper_sample.setSelectedIndex(0);
			break;
		case SUPER_SAMPLE_2X:
			mSuper_sample.setSelectedIndex(1);
			break;
		case SUPER_SAMPLE_4X:
			mSuper_sample.setSelectedIndex(2);
			break;
		case SUPER_SAMPLE_4X_9:
			mSuper_sample.setSelectedIndex(3);
			break;
		case SUPER_SAMPLE_9X:
			mSuper_sample.setSelectedIndex(4);
			break;
		}
	}
	public boolean Run()
	{	
        mDialog.setLocationRelativeTo(mComponent);
		mSave_ss = mSuper_sample.getSelectedIndex();
		mSave_thr = GetNumThreads();
		
		mDialog.setVisible(true);
		return true;
	}


	@Override
	public void actionPerformed(ActionEvent event)
	{
		// TODO Auto-generated method stub
		String command = event.getActionCommand();
		if (command=="   OK   ")
		{
			mOK=true;
			mDialog.setVisible(false);
		}
		else if (command=="Cancel")
		{
			mOK=false;
			mDialog.setVisible(false);
			mSuper_sample.setSelectedItem(mSuper_sample);
			mNum_threads.setValue(new Integer(mSave_thr));
		}		
	}
	
}
