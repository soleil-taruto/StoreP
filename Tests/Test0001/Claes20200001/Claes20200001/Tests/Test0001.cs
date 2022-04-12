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
		/// <summary>
		/// フェルマーの小定理
		/// p == 素数
		/// a == 0 以上 p 未満の整数
		/// のとき
		/// (a ^ p) % p == a となる。
		/// </summary>
		public void Test01()
		{
			for (int p = 2; p < 2000; p++) // rough limit
			{
				if (IsPrime(p))
				{
					Console.WriteLine("p: " + p); // cout

					for (int a = 0; a < p; a++)
					{
						int v = 1;

						for (int c = 0; c < p; c++)
						{
							v *= a;
							v %= p;
						}

						// (a ^ p) % p == a となるはず！

						if (v != a)
							throw null;
					}
				}
			}
		}

		private static bool IsPrime(int v)
		{
			for (int c = 2; c < v; c++)
			{
				if (v % c == 0)
				{
					return false;
				}
			}
			return true;
		}

		/// <summary>
		/// 正規分布の曲線
		/// </summary>
		public void Test02()
		{
			double[] map = new double[] { 1.0 };

			for (int c = 0; c < 3000; c++) // rough limit
			{
				double[] next = new double[map.Length + 1];

				for (int i = 0; i < map.Length; i++)
				{
					next[i + 0] += map[i] * 0.5;
					next[i + 1] += map[i] * 0.5;
				}
				map = next;

				// 両端の小さい値を除去
				while (map[0] < SCommon.MICRO) map = map.Skip(1).ToArray();
				while (map[map.Length - 1] < SCommon.MICRO) map = map.Take(map.Length - 1).ToArray();
			}

			using (CsvFileWriter writer = new CsvFileWriter(Common.NextOutputPath() + ".csv"))
			{
				foreach (double v in map)
				{
					writer.WriteCell(v.ToString("F9"));
					writer.EndRow();
				}
			}
		}

		/// <summary>
		/// 正規分布の曲線
		/// </summary>
		public void Test03()
		{
			const int SPAN = 50;
			int[] map = new int[SPAN * 2 + 1];

			for (int c = 0; c < 1000000; c++) // rough limit
			{
				if (c % 10000 == 0) Console.WriteLine(c); // cout

				int v = SPAN;

				for (int i = 0; i < SPAN; i++)
					v += SCommon.CRandom.GetInt(2) * 2 - 1;

				map[v]++;
			}

			// 両端の小さい値を除去
			// 注意：SPAN-によってインデックスが偶数または奇数の位置が 0 になる。
			map = map.Where(v => v != 0).ToArray();

			using (CsvFileWriter writer = new CsvFileWriter(Common.NextOutputPath() + ".csv"))
			{
				foreach (double v in map)
				{
					writer.WriteCell(v.ToString("F9"));
					writer.EndRow();
				}
			}
		}
	}
}
