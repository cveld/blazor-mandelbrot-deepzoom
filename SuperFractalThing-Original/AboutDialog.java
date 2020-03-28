//
// AboutDialog
// Simple dialog box
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
import java.awt.Component;
import java.awt.Desktop;
import java.awt.Dimension;
import java.awt.GridBagConstraints;
import java.awt.GridBagLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;

import javax.swing.JButton;
import javax.swing.JDialog;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.SwingConstants;


public class AboutDialog implements ActionListener
{
JDialog mDialog;
URI mUri;

	public AboutDialog(JFrame aFrame, Component aComponent)
	{
		
		mDialog = new JDialog(aFrame, "SuperFractalThing Java", true);

        JPanel p = new JPanel();
        JLabel label;
        mDialog.setSize(new Dimension(400,500));
        p.setPreferredSize(new Dimension(400,500));

        mDialog.setContentPane(p);
  
        mDialog.setLocationRelativeTo(aComponent);
       
        p.setLayout(new GridBagLayout());
        GridBagConstraints gbc = new GridBagConstraints();
        
        gbc.gridx=0;
        gbc.gridy=0;
        gbc.gridwidth=1;
        gbc.fill = GridBagConstraints.HORIZONTAL;
        label=new JLabel("<html>Abitrary(ish) precision Mandelbrot set rendering in Java.", null, JLabel.LEFT);
        label.setPreferredSize(new Dimension(250,40));
        p.add(label,gbc);   
        
        gbc.gridx=0;
        gbc.gridy++;
        gbc.gridwidth=1;
        gbc.fill = GridBagConstraints.HORIZONTAL;
        label=new JLabel("Version 0.8.3", null, JLabel.LEFT);
        label.setPreferredSize(new Dimension(250,40));
        p.add(label,gbc);   
 
        gbc.gridx=0;
        gbc.gridy++;
        gbc.gridwidth=1;
        gbc.fill = GridBagConstraints.HORIZONTAL;
        label=new JLabel("(c) Kevin Martin", null, JLabel.LEFT);
        label.setPreferredSize(new Dimension(250,40));
        p.add(label,gbc);
        
 /*      gbc.gridx=0;
        gbc.gridy++;
        gbc.gridwidth=1;
        gbc.fill = GridBagConstraints.HORIZONTAL;
        label=new JLabel("Palette Editor by Steve Bryson", null, JLabel.LEFT);
        label.setPreferredSize(new Dimension(250,40));
        p.add(label,gbc);
*/
        gbc.gridx=0;
        gbc.gridy++;
        gbc.gridwidth=1;
        gbc.fill = GridBagConstraints.HORIZONTAL;
        label=new JLabel("<HTML>For info on how SuperFractalThing works:", null, JLabel.LEFT);
        label.setPreferredSize(new Dimension(250,20));
        p.add(label,gbc);
        
        gbc.gridy++;
		try {
//			mUri = new URI("http://www.science.eclipse.co.uk/SFT_Maths.html");
			mUri = new URI("http://www.superfractalthing.co.nf/sft_maths.pdf");
		} catch (URISyntaxException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return;
		}
        JButton button = new JButton();
        button.setText("<HTML><FONT color=\"#000099\"><U>SuperFractalThing maths</U></FONT>"
            + "</HTML>");
        button.setActionCommand("math");
        button.setHorizontalAlignment(SwingConstants.LEFT);
        button.setBorderPainted(false);
        button.setOpaque(false);
        button.setBackground(Color.WHITE);
        button.setToolTipText(mUri.toString());
        button.addActionListener(this);
        button.setPreferredSize(new Dimension(250,40));
        p.add(button,gbc);
        
        gbc.gridx=0;
        gbc.gridy++;
        gbc.gridwidth=1;
        gbc.fill = GridBagConstraints.HORIZONTAL;
        label=new JLabel("Email:", null, JLabel.LEFT);
        label.setPreferredSize(new Dimension(250,20));
        p.add(label,gbc);
        
        gbc.gridy++;
        button = new JButton();
        button.setPreferredSize(new Dimension(250,40));
        button.setActionCommand("email");
        button.setText("<HTML><FONT color=\"#000099\"><U>superfractalthing@gmail.com</U></FONT>"
            + "</HTML>");          
        
        button.setHorizontalAlignment(SwingConstants.LEFT);
        button.setBorderPainted(false);
        button.setOpaque(false);
        button.setBackground(Color.WHITE);
        button.addActionListener(this);
        p.add(button,gbc);

        
        gbc.gridx=0;
        gbc.gridy++;
        gbc.gridwidth=1;
        gbc.fill = GridBagConstraints.HORIZONTAL;
        label=new JLabel("<HTML>This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details. The source code can be obtained from:", null, JLabel.LEFT);
        label.setPreferredSize(new Dimension(300,120));
        p.add(label,gbc);   

        gbc.gridy++;
        button = new JButton();
        button.setActionCommand("sourceforge");
        button.setPreferredSize(new Dimension(250,40));
        button.setText("<HTML><FONT color=\"#000099\"><U>sourceforge.net</U></FONT></HTML>");
        button.setHorizontalAlignment(SwingConstants.LEFT);
        button.setBorderPainted(false);
        button.setOpaque(false);
        button.setBackground(Color.WHITE);
        button.addActionListener(this);
        p.add(button,gbc);
         
        gbc.gridy++;
        gbc.gridy++;
        button = new JButton();
        button.setText("OK");
        button.addActionListener(this);
        p.add(button,gbc);	
        
	}

	public void Run()
	{	
		mDialog.setVisible(true);
	}

	@Override
	public void actionPerformed(ActionEvent arg0)
	{
		// TODO Auto-generated method stub
		if (arg0.getActionCommand()=="math")
		{
			try {
				Desktop.getDesktop().browse(mUri);
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}	
		}
		if (arg0.getActionCommand()=="sourceforge")
		{
			URI uri;
			try {
				uri = new URI("http://sourceforge.net/projects/suprfractalthng/");
			} catch (URISyntaxException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				return;
			}
	 		try {
				Desktop.getDesktop().browse(uri);
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}	
		}
		else if (arg0.getActionCommand()=="email")
		{
			try {
				URI uriMailTo = new URI("mailto", "superfractalthing@gmail.com", null);
				Desktop.getDesktop().mail(uriMailTo);
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (URISyntaxException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}				
		}
		else if (arg0.getActionCommand()=="OK")
		{
			mDialog.setVisible(false);
		}
	}
}
