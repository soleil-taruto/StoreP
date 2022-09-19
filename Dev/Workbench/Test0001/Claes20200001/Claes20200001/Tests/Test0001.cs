using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Drawing;
using Charlotte.Commons;
using Charlotte.Utilities;

namespace Charlotte.Tests
{
	public class Test0001
	{
		public void Test01()
		{
			NPBitList founds = new NPBitList();
			long farthest = 0;
			long unfound = 0;

			founds[0] = true;

			for (long n = 2; n < 1000; n++)
			//for (long n = 2; n < 3000; n++)
			//for (long n = 2; n < 10000; n++)
			{
				if (MillerRabin.IsPrime((ulong)n))
				{
					NPBitList newFounds = new NPBitList();

					for (long i = -farthest; i <= farthest; i++)
					{
						if (founds[i])
						{
							newFounds[i] = true;
							newFounds[i + n] = true;
							newFounds[i - n] = true;
						}
					}
					founds = newFounds;
					farthest += n;

					while (founds[unfound])
						unfound++;

					Console.WriteLine(n + " --> farthest = " + farthest + " , unfound = " + unfound + " , (farthest - unfound) = " + (farthest - unfound));
				}
			}
		}
	}
}
