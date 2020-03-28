//	UndoBuffer
//	Remember what the user has done, so it can be undone.
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
import java.math.BigDecimal;
import java.util.Vector;

class UndoItem
{
	UndoItem(BigDecimal aX, BigDecimal aY, BigDecimal aSize,int aIterations)
	{
		mX=aX;
		mY=aY;
		mSize=aSize;
		mIterations=aIterations;
	}
	BigDecimal mX;
	BigDecimal mY;
	BigDecimal mSize;
	int mIterations;
}

public class UndoBuffer
{
Vector<UndoItem> mStack;
int mIndex;

	UndoBuffer()
	{
		mStack = new Vector<UndoItem>();
		mIndex = -1;
	}
	
	void Push(BigDecimal x, BigDecimal y, BigDecimal size,int iterations)
	{
		while (mStack.size() > mIndex+1)
		{
			mStack.remove(mStack.size()-1);
		}
		UndoItem item = new UndoItem(x,y,size,iterations);
		mStack.add(item);
		mIndex++;
	}
	
	void Undo()
	{
		if (mIndex>=1)
			mIndex--;		
	}
	void Redo()
	{
		if (mIndex < mStack.size()-1)
			mIndex++;
	}
	
	boolean CanUndo()
	{
		return mIndex>=1;
	}
	
	boolean CanRedo()
	{
		return mIndex<mStack.size()-1;
	}
	
	BigDecimal GetX()
	{
		return mStack.get(mIndex).mX;
	}
	BigDecimal GetY()
	{
		return mStack.get(mIndex).mY;
	}
	BigDecimal GetSize()
	{
		return mStack.get(mIndex).mSize;
	}
	int GetIterations()
	{
		return mStack.get(mIndex).mIterations;
	}	
}
