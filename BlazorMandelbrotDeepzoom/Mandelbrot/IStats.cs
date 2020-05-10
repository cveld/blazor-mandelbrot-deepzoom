using System;
using System.Collections.Generic;
using System.Text;

namespace Mandelbrot
{
    interface IStats  
	{
		void Init(int x);
		void AddValue(int x);
		int GetNewLimit();
		int GetProgress();
	}
}
