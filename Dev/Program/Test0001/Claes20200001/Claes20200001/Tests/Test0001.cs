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
		private static class XorShift32
		{
			private static uint X = 1;

			public static void Reset()
			{
				X = 1;
			}

			public static uint Next()
			{
				X ^= X << 13;
				X ^= X >> 17;
				X ^= X << 5;

				return X;
			}
		}

		public void Test01()
		{
			XorShift32.Reset();

			int count = 0;
			DateTime stTm = DateTime.Now;

			for (int testcnt = 0; testcnt < 100000000; testcnt++)
			{
				double x = (double)XorShift32.Next();
				double y = (double)XorShift32.Next();

				if (Math.Sqrt(x) < y)
				{
					count++;
				}
			}
			DateTime edTm = DateTime.Now;

			Console.WriteLine(count);
			Console.WriteLine((edTm - stTm).TotalSeconds.ToString("F3"));
		}

		public void Test02()
		{
			XorShift32.Reset();

			int count = 0;
			DateTime stTm = DateTime.Now;

			for (int testcnt = 0; testcnt < 100000000; testcnt++)
			{
				double x = (double)XorShift32.Next();
				double y = (double)XorShift32.Next();

				if (x < y * y)
				{
					count++;
				}
			}
			DateTime edTm = DateTime.Now;

			Console.WriteLine(count);
			Console.WriteLine((edTm - stTm).TotalSeconds.ToString("F3"));
		}

		public void Test03()
		{
			XorShift32.Reset();

			int count = 0;
			DateTime stTm = DateTime.Now;

			for (int testcnt = 0; testcnt < 100000000; testcnt++)
			{
				double x = (double)(XorShift32.Next() % 1000000);
				double y = (double)(XorShift32.Next() % 1000000);
				double z = (double)(XorShift32.Next() % 1000000);

				if (Math.Sqrt(x * x + y * y) < z)
				{
					count++;
				}
			}
			DateTime edTm = DateTime.Now;

			Console.WriteLine(count);
			Console.WriteLine((edTm - stTm).TotalSeconds.ToString("F3"));
		}

		public void Test04()
		{
			XorShift32.Reset();

			int count = 0;
			DateTime stTm = DateTime.Now;

			for (int testcnt = 0; testcnt < 100000000; testcnt++)
			{
				double x = (double)(XorShift32.Next() % 1000000);
				double y = (double)(XorShift32.Next() % 1000000);
				double z = (double)(XorShift32.Next() % 1000000);

				if (x * x + y * y < z * z)
				{
					count++;
				}
			}
			DateTime edTm = DateTime.Now;

			Console.WriteLine(count);
			Console.WriteLine((edTm - stTm).TotalSeconds.ToString("F3"));
		}

		// 結果メモ @ 2022.7.24
		//
		// だいたいの処理時間
		// -- Test01 -- 2.02
		// -- Test02 -- 2.20
		// -- Test03 -- 3.78
		// -- Test04 -- 3.93
		//
		// 平方根の方が速い模様...mjk
	}
}
