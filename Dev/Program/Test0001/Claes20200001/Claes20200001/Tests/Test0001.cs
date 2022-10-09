using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Drawing;
using Charlotte.Commons;

namespace Charlotte.Tests
{
	public class Test0001
	{
		public void Test01()
		{
			Func<int> s = SCommon.Supplier(Test01_a());

			for (int i = 0; i < 46; i++)
			{
				Console.WriteLine(s());
			}
		}

		private IEnumerable<int> Test01_a()
		{
			int a = 1;
			int b = 0;

			for (; ; )
			{
				yield return a += b;
				yield return b += a;
			}
		}
	}
}
