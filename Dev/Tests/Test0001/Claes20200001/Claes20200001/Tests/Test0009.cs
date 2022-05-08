using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;
using Charlotte.Commons;
using Charlotte.Utilities;

namespace Charlotte.Tests
{
	public class Test0009
	{
		/// <summary>
		/// 1/1/1 ～ 9999/12/31
		/// 存在する日付
		/// </summary>
		public void Test01()
		{
			string file = Common.NextOutputPath() + ".txt";

			using (StreamWriter writer = new StreamWriter(file, false, Encoding.UTF8))
			{
				for (int y = 1; y <= 9999; y++)
				{
					for (int m = 1; m <= 12; m++)
					{
						int dNum = GetDayOfMonth(y, m);

						for (int d = 1; d <= dNum; d++)
						{
							SimpleEraDate eraDate = new SimpleEraDate(y * 10000 + m * 100 + d);

							writer.WriteLine(string.Format("{0:D4}/{1:D2}/{2:D2} ⇒ {3}"
								, y
								, m
								, d
								, P_HanDigToZenDig(eraDate.ToString())));
						}
					}
				}
			}
		}

		/// <summary>
		/// 0/0/0 ～ 9999/12/31
		/// </summary>
		public void Test02()
		{
			string file = Common.NextOutputPath() + ".txt";

			using (StreamWriter writer = new StreamWriter(file, false, Encoding.UTF8))
			{
				for (int y = 0; y <= 9999; y++)
				{
					for (int m = 0; m <= 12; m++)
					{
						for (int d = 0; d <= 31; d++)
						{
							SimpleEraDate eraDate = new SimpleEraDate(y * 10000 + m * 100 + d);

							writer.WriteLine(string.Format("{0:D4}/{1:D2}/{2:D2} ⇒ {3}"
								, y
								, m
								, d
								, P_HanDigToZenDig(eraDate.ToString())));
						}
					}
				}
			}
		}

		/// <summary>
		/// 0/0/0 ～ 9999/99/99
		/// </summary>
		public void Test03()
		{
			string file = Common.NextOutputPath() + ".txt";

			using (StreamWriter writer = new StreamWriter(file, false, Encoding.UTF8))
			{
				for (int ymd = 0; ymd < 100000000; ymd += SCommon.CRandom.GetRange(1, 100))
				{
					SimpleEraDate eraDate = new SimpleEraDate(ymd);

					int y = ymd / 10000;
					int m = (ymd / 100) % 100;
					int d = ymd % 100;

					writer.WriteLine(string.Format("{0:D4}/{1:D2}/{2:D2} ⇒ {3}"
						, y
						, m
						, d
						, P_HanDigToZenDig(eraDate.ToString())));
				}
			}
		}

		private int GetDayOfMonth(int y, int m)
		{
			int d = new int[] { 31, -1, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 }[m - 1];

			if (d == -1)
			{
				bool leapYear = y % 4 == 0 && (y % 100 != 0 || y % 400 == 0);

				if (leapYear)
					d = 29;
				else
					d = 28;
			}
			return d;
		}

		private static string P_HanDigToZenDig(string str)
		{
			for (int num = 0; num <= 9; num++)
			{
				str = str.Replace(SCommon.DECIMAL[num], SCommon.MBC_DECIMAL[num]);
			}
			return str;
		}
	}
}
