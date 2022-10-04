using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;
using Charlotte.Commons;

namespace Charlotte.Tests
{
	public class Test0011
	{
		public void Test01()
		{
			List<string> lines = new List<string>();

			foreach (char chr in Enumerable.Range(0, 65536))
			{
				string str = new string(new char[] { chr });
				string strL = str.ToLower();
				string strU = str.ToUpper();

				if (str != strL || str != strU)
				{
					Console.WriteLine(string.Join(", "
						, ((int)chr).ToString("x4")
						, ((int)strL[0]).ToString("x4")
						, ((int)strU[0]).ToString("x4")
						));

					lines.Add("[" + str + "] -> [" + strL + "] , [" + strU + "]");
				}
			}

			File.WriteAllLines(SCommon.NextOutputPath() + ".txt", lines, Encoding.UTF8);
		}
	}
}
