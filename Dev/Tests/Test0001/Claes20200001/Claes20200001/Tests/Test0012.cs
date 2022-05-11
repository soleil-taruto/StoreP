using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;
using Charlotte.Commons;

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

		public void Test03()
		{
			Test03_a(1);
			Test03_a(3);
			Test03_a(10);
			Test03_a(30);
			Test03_a(100);
			Test03_a(300);
			Test03_a(1000);
			Test03_a(3000);
			Test03_a(10000);
			Test03_a(30000);
			Test03_a(100000);
			Test03_a(300000);
			Test03_a(1000000);
		}

		private void Test03_a(int count)
		{
			if (count < 1 || 1000000 < count) // rough limit
				throw null;

			int l = 0;
			int r = count;

			while (l + 1 < r)
			{
				int m = (l + r) / 2;

				int c = m;
				int ans = 0;

				for (int d = 1; d <= c; d++)
				{
					ans += c / d;
				}

				if (ans < count)
					l = m;
				else
					r = m;
			}

			{
				int c = r;

				Console.WriteLine(count + " -> " + c);
			}
		}
	}
}
