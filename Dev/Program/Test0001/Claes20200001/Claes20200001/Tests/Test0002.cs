using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Charlotte.Utilities;

namespace Charlotte.Tests
{
	public class Test0002
	{
		public void Test01()
		{
			for (ulong n = 1; n < ulong.MaxValue; n = n * 2 + 1)
			{
				if (MillerRabin.IsPrime(n))
				{
					Console.WriteLine(n.ToString("x16") + " " + n);
				}
			}
		}
	}
}
