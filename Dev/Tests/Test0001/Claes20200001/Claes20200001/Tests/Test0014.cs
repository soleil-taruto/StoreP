using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Charlotte.Commons;

namespace Charlotte.Tests
{
	public class Test0014
	{
		public void Test01()
		{
			Test01_a(1);
			Test01_a(2);
			Test01_a(3);
			Test01_a(5);
			Test01_a(10);

			Console.WriteLine("OK!");
		}

		private void Test01_a(int lenlmt)
		{
			// SCommon.CreateSet テスト
			{
				HashSet<string> hs = SCommon.CreateSet();
				List<string> list = new List<string>();

				for (int testcnt = 1; testcnt <= 10000; testcnt++)
				{
					string str = new string(Enumerable
						.Range(0, SCommon.CRandom.GetInt(lenlmt))
						.Select(dummy => SCommon.CRandom.ChooseOne(SCommon.ASCII.ToArray()))
						.ToArray());

					hs.Add(str);

					if (!list.Any(v => v == str))
						list.Add(str);

					if (testcnt % 1000 == 0)
					{
						string[] t1 = hs.ToArray();
						string[] t2 = list.ToArray();

						Console.WriteLine("CS " + lenlmt + ", " + testcnt + " --> " + t1.Length + ", " + t2.Length); // cout

						Array.Sort(t1, SCommon.Comp);
						Array.Sort(t2, SCommon.Comp);

						if (SCommon.Comp(t1, t2, SCommon.Comp) != 0) // ? 不一致
							throw null; // bug !!!
					}
				}
			}

			// SCommon.CreateSetIgnoreCase テスト
			{
				HashSet<string> hs = SCommon.CreateSetIgnoreCase();
				List<string> list = new List<string>();

				for (int testcnt = 1; testcnt <= 10000; testcnt++)
				{
					string str = new string(Enumerable
						.Range(0, SCommon.CRandom.GetInt(lenlmt))
						.Select(dummy => SCommon.CRandom.ChooseOne(SCommon.ASCII.ToArray()))
						.ToArray());

					hs.Add(str);

					if (!list.Any(v => v.ToLower() == str.ToLower()))
						list.Add(str);

					if (testcnt % 1000 == 0)
					{
						string[] t1 = hs.ToArray();
						string[] t2 = list.ToArray();

						Console.WriteLine("IC " + lenlmt + ", " + testcnt + " --> " + t1.Length + ", " + t2.Length); // cout

						Array.Sort(t1, SCommon.Comp);
						Array.Sort(t2, SCommon.Comp);

						if (SCommon.Comp(t1, t2, SCommon.Comp) != 0) // ? 不一致
							throw null; // bug !!!
					}
				}
			}
		}
	}
}
