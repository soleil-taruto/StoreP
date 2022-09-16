using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;
using Charlotte.Commons;

namespace Charlotte.Tests
{
	public class Test0008
	{
		public void Test01()
		{
			byte[] hash = SCommon.GetSHA512(writer =>
			{
				using (FileStream reader = new FileStream(@"C:\temp\Huge.bin", FileMode.Open, FileAccess.Read))
				{
					SCommon.ReadToEnd(reader.Read, writer);
				}
			});

			Console.WriteLine(SCommon.Hex.ToString(hash));
		}
	}
}
