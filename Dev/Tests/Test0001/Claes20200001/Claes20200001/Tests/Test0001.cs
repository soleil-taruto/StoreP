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
			Common.ToThrow(() => SCommon.CRandom.GetInt(0));
			Common.ToThrow(() => SCommon.CRandom.GetLong(0));
		}
	}
}
