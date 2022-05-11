using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;

namespace Charlotte.Tests
{
	public class Test0012
	{
		public void Test01()
		{
			Search("");
		}

		private void Search(string s)
		{
			if (9 <= s.Length)
			{
				Console.WriteLine(s);
				return;
			}

			for (int n = 1; n <= 9; n++)
			{
				string sn = "" + n;
				if (!s.Contains(sn))
				{
					s += sn;
					int ns = int.Parse(s);
					if (ns % s.Length == 0)
					{
						Search(s);
					}
					s = s.Substring(0, s.Length - 1);
				}
			}
		}

		public void Test02()
		{
			int lastAns = 0;

			for (int c = 0; c <= 100; c++)
			{
				int ans = 0;

				for (int d = 1; d <= c; d++)
				{
					ans += c / d;
				}
				Console.WriteLine(c + " -> " + ans + " +" + (ans - lastAns));
				lastAns = ans;
			}
		}
	}
}
