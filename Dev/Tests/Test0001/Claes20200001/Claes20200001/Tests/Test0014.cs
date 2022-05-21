﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Charlotte.Commons;
using System.IO;

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

		public void Test02()
		{
			Test02_a(new string[] { "123", "ABC", "abc" });
			Test02_a(new string[] { "123456", "ABCDEF", "abcdef" });
			Test02_a(new string[] { "123456789", "ABCDEFGHI", "abcdefghi" });
			Test02_a(new string[] { @"

123456789
123456789
123456789
123456789
123456789
123456789
123456789
123456789
123456789

", @"

ABCDEFGHI
ABCDEFGHI
ABCDEFGHI
ABCDEFGHI
ABCDEFGHI
ABCDEFGHI
ABCDEFGHI
ABCDEFGHI
ABCDEFGHI

", @"

abcdefghi
abcdefghi
abcdefghi
abcdefghi
abcdefghi
abcdefghi
abcdefghi
abcdefghi
abcdefghi

"
			});
			Test02_a(new string[] { @"

123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789
123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789
123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789
123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789
123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789
123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789
123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789
123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789
123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789

", @"

ABCDEFGHI ABCDEFGHI ABCDEFGHI ABCDEFGHI ABCDEFGHI ABCDEFGHI ABCDEFGHI ABCDEFGHI ABCDEFGHI
ABCDEFGHI ABCDEFGHI ABCDEFGHI ABCDEFGHI ABCDEFGHI ABCDEFGHI ABCDEFGHI ABCDEFGHI ABCDEFGHI
ABCDEFGHI ABCDEFGHI ABCDEFGHI ABCDEFGHI ABCDEFGHI ABCDEFGHI ABCDEFGHI ABCDEFGHI ABCDEFGHI
ABCDEFGHI ABCDEFGHI ABCDEFGHI ABCDEFGHI ABCDEFGHI ABCDEFGHI ABCDEFGHI ABCDEFGHI ABCDEFGHI
ABCDEFGHI ABCDEFGHI ABCDEFGHI ABCDEFGHI ABCDEFGHI ABCDEFGHI ABCDEFGHI ABCDEFGHI ABCDEFGHI
ABCDEFGHI ABCDEFGHI ABCDEFGHI ABCDEFGHI ABCDEFGHI ABCDEFGHI ABCDEFGHI ABCDEFGHI ABCDEFGHI
ABCDEFGHI ABCDEFGHI ABCDEFGHI ABCDEFGHI ABCDEFGHI ABCDEFGHI ABCDEFGHI ABCDEFGHI ABCDEFGHI
ABCDEFGHI ABCDEFGHI ABCDEFGHI ABCDEFGHI ABCDEFGHI ABCDEFGHI ABCDEFGHI ABCDEFGHI ABCDEFGHI
ABCDEFGHI ABCDEFGHI ABCDEFGHI ABCDEFGHI ABCDEFGHI ABCDEFGHI ABCDEFGHI ABCDEFGHI ABCDEFGHI

", @"

abcdefghi abcdefghi abcdefghi abcdefghi abcdefghi abcdefghi abcdefghi abcdefghi abcdefghi
abcdefghi abcdefghi abcdefghi abcdefghi abcdefghi abcdefghi abcdefghi abcdefghi abcdefghi
abcdefghi abcdefghi abcdefghi abcdefghi abcdefghi abcdefghi abcdefghi abcdefghi abcdefghi
abcdefghi abcdefghi abcdefghi abcdefghi abcdefghi abcdefghi abcdefghi abcdefghi abcdefghi
abcdefghi abcdefghi abcdefghi abcdefghi abcdefghi abcdefghi abcdefghi abcdefghi abcdefghi
abcdefghi abcdefghi abcdefghi abcdefghi abcdefghi abcdefghi abcdefghi abcdefghi abcdefghi
abcdefghi abcdefghi abcdefghi abcdefghi abcdefghi abcdefghi abcdefghi abcdefghi abcdefghi
abcdefghi abcdefghi abcdefghi abcdefghi abcdefghi abcdefghi abcdefghi abcdefghi abcdefghi
abcdefghi abcdefghi abcdefghi abcdefghi abcdefghi abcdefghi abcdefghi abcdefghi abcdefghi

"
			});
		}

		private void Test02_a(string[] src)
		{
			string enc = SCommon.Serializer.I.Join(src);

			int s1 = src.Select(v => v.Length).Sum();
			int s2 = enc.Length;

			Console.WriteLine((double)s2 / s1);
		}

		public void Test03()
		{
			Console.WriteLine(double.IsNaN(double.NaN)); // True
			Console.WriteLine(double.IsNaN(double.PositiveInfinity)); // False
			Console.WriteLine(double.IsNaN(double.NegativeInfinity)); // False

			Console.WriteLine(double.IsInfinity(double.NaN)); // False
			Console.WriteLine(double.IsInfinity(double.PositiveInfinity)); // True
			Console.WriteLine(double.IsInfinity(double.NegativeInfinity)); // True

			Console.WriteLine(double.IsPositiveInfinity(double.NaN)); // False
			Console.WriteLine(double.IsPositiveInfinity(double.PositiveInfinity)); // True
			Console.WriteLine(double.IsPositiveInfinity(double.NegativeInfinity)); // False

			Console.WriteLine(double.IsNegativeInfinity(double.NaN)); // False
			Console.WriteLine(double.IsNegativeInfinity(double.PositiveInfinity)); // False
			Console.WriteLine(double.IsNegativeInfinity(double.NegativeInfinity)); // True

			// ----

			try
			{
				SCommon.ToInt(double.NaN);
			}
			catch (Exception ex)
			{
				Console.WriteLine(ex.Message);
			}

			try
			{
				SCommon.ToInt(double.PositiveInfinity);
			}
			catch (Exception ex)
			{
				Console.WriteLine(ex.Message);
			}

			try
			{
				SCommon.ToInt(double.NegativeInfinity);
			}
			catch (Exception ex)
			{
				Console.WriteLine(ex.Message);
			}
		}

		public void Test04()
		{
			using (StreamWriter writer = new StreamWriter(Common.NextOutputPath() + ".txt", false, Encoding.Unicode))
			{
				foreach (char chr in SCommon.GetJChars().ToArray().DistinctOrderBy((a, b) => (int)a - (int)b))
				{
					writer.WriteLine(((int)chr).ToString("x4") + " " + chr);
				}
			}
		}

		public void Test05()
		{
			Test05_a(100);
			Test05_a(300);
			Test05_a(1000);
			Test05_a(3000);
			Test05_a(10000);
			Test05_a(30000);
			Test05_a(100000);
			Test05_a(300000);
			Test05_a(1000000);
			Test05_a(3000000);
		}

		private void Test05_a(int scale)
		{
			HashSet<string> hs = SCommon.CreateSet();

			for (int count = 1; count <= scale; count++)
				hs.Add("" + count);

			for (int step = 1; step <= 10; step++)
			{
				HashSet<string> hs2 = SCommon.CreateSet();

				foreach (string h in hs)
				{
					string h2 = "" + h.GetHashCode();

					if (!hs2.Contains(h2))
						hs2.Add(h2);
				}
				hs = hs2;
			}
			Console.WriteLine(((double)hs.Count / scale).ToString("F6") + " " + scale + " ==> " + hs.Count);
		}

		public void Test06()
		{
			using (CsvFileWriter writer = new CsvFileWriter(Common.NextOutputPath() + ".csv"))
			{
				Test06_a(writer, 100);
				Test06_a(writer, 300);
				Test06_a(writer, 1000);
				Test06_a(writer, 3000);
				Test06_a(writer, 10000);
				Test06_a(writer, 30000);
				Test06_a(writer, 100000);
				Test06_a(writer, 300000);
				Test06_a(writer, 1000000);
				Test06_a(writer, 3000000);
			}
		}

		private void Test06_a(CsvFileWriter writer, int scale)
		{
			Console.WriteLine(scale); // cout

			HashSet<string> hs = SCommon.CreateSet();

			for (int count = 1; count <= scale; count++)
				hs.Add("" + count);

			for (int step = 1; step <= 30; step++)
			{
				Console.WriteLine(scale + ", " + step); // cout

				{
					HashSet<string> hs2 = SCommon.CreateSet();

					foreach (string h in hs)
					{
						string h2 = "" + ((uint)h.GetHashCode() % scale);

						if (!hs2.Contains(h2))
							hs2.Add(h2);
					}
					hs = hs2;
				}

				writer.WriteCell(((double)hs.Count() / scale).ToString("F9"));
			}
			writer.EndRow();
		}

		public void Test07()
		{
			foreach (int a in new int[] { 10, 30, 100 })
			{
				foreach (int b in new int[] { 10, 30, 100 })
				{
					foreach (int c in new int[] { 10, 30, 100 })
					{
						foreach (int d in new int[] { 10, 30, 100 })
						{
							Console.WriteLine(a + ", " + b + ", " + c + ", " + d); // cout

							for (int testcnt = 0; testcnt < 100; testcnt++)
							{
								Test07_a(a, b, c, d);
							}
						}
					}
				}
			}

			Console.WriteLine("OK!"); // cout
		}

		private void Test07_a(int loNum, int roNum, int beNum, int valScale)
		{
			string[] lo = Enumerable.Range(1, loNum).Select(dummy => SCommon.CRandom.GetInt(valScale) + "_1").ToArray();
			string[] ro = Enumerable.Range(1, roNum).Select(dummy => SCommon.CRandom.GetInt(valScale) + "_2").ToArray();
			string[] be = Enumerable.Range(1, beNum).Select(dummy => SCommon.CRandom.GetInt(valScale) + "_B").ToArray();

			Array.Sort(lo, SCommon.Comp);
			Array.Sort(ro, SCommon.Comp);
			Array.Sort(be, SCommon.Comp);

			string[] list1 = lo.Concat(be).ToArray();
			string[] list2 = ro.Concat(be).ToArray();

			SCommon.CRandom.Shuffle(list1);
			SCommon.CRandom.Shuffle(list2);

			List<string> only1 = new List<string>();
			List<string> both1 = new List<string>();
			List<string> both2 = new List<string>();
			List<string> only2 = new List<string>();

			SCommon.Merge(list1, list2, SCommon.Comp, v => only1.Add(v), v => both1.Add(v), v => both2.Add(v), v => only2.Add(v));

			if (SCommon.Comp(only1, lo, SCommon.Comp) != 0) // ? 不一致
				throw null; // bug !

			if (SCommon.Comp(both1, be, SCommon.Comp) != 0) // ? 不一致
				throw null; // bug !

			if (SCommon.Comp(both2, be, SCommon.Comp) != 0) // ? 不一致
				throw null; // bug !

			if (SCommon.Comp(only2, ro, SCommon.Comp) != 0) // ? 不一致
				throw null; // bug !
		}
	}
}