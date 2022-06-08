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
	}
}
