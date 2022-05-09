using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Charlotte.Commons;

namespace Charlotte.Tests
{
	public class Test0010
	{
		public void Test01()
		{
			foreach (char chr in "すごーい")
			{
				Console.WriteLine(SCommon.MBC_HIRA.Contains(chr));
			}
			foreach (char chr in "スゴーイ")
			{
				Console.WriteLine(SCommon.MBC_KANA.Contains(chr));
			}
		}
	}
}
