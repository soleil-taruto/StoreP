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
			Common.ToThrowPrint(() => SCommon.CRandom.GetInt(0));
			Common.ToThrowPrint(() => SCommon.CRandom.GetLong(0));
		}

		public void Test02()
		{
			for (int testcnt = 0; testcnt < 1000; testcnt++)
			{
				double value = (double)SCommon.CRandom.GetUInt() / uint.MaxValue;

				Console.WriteLine(value.ToString("F20"));
			}
		}
	}
}
