using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Drawing;
using Charlotte.Commons;
using System.IO;

namespace Charlotte.Tests
{
	public class Test0001
	{
		public void Test01()
		{
			Common.ToThrowPrint(() => SCommon.CRandom.GetInt(0));
			Common.ToThrowPrint(() => SCommon.CRandom.GetLong(0));
		}

		public void Test02()
		{
			for (int testcnt = 0; testcnt < 1000; testcnt++)
			{
				double value = (double)SCommon.CRandom.GetUInt() / uint.MaxValue;

				Console.WriteLine(value.ToString("F20"));
			}
		}

		public void Test03()
		{
			if (SCommon.GetJChars().Length == SCommon.GetJCharCodes().Count())
			{
				Console.WriteLine("JCharsLen-OK!");
			}
			else
			{
				throw null; // 想定外
			}
		}

		public void Test04()
		{
			using (CsvFileWriter writer = new CsvFileWriter(Common.NextOutputPath() + ".csv"))
			{
				for (int n = 1; n <= 5; n++)
				{
					int[] counts = new int[30];

					for (int testcnt = 0; testcnt < 1000000; testcnt++)
					{
						double v = 1.0;

						for (int c = 0; c < n; c++)
						{
							double r = (double)SCommon.CRandom.GetUInt() / uint.MaxValue;
							v = Math.Min(v, r);
						}
						counts[(int)(v * counts.Length)]++;
					}
					writer.WriteRow(counts.Select(v => "" + v).ToArray());
				}
			}
		}

		/// <summary>
		/// SCommon.GetJChars()の文字でファイルが作成可能かチェック
		/// -- 作成可能である。@ 2022.6.13
		/// </summary>
		public void Test05()
		{
			const string TEST_DIR = @"C:\temp";

			SCommon.DeletePath(TEST_DIR);
			SCommon.CreateDir(TEST_DIR);

			string homeDir = Directory.GetCurrentDirectory();
			Directory.SetCurrentDirectory(TEST_DIR);

			foreach (char chr in SCommon.GetJChars())
			{
				Console.WriteLine("[" + chr + "] " + (int)chr);

				string localName = new string(new char[] { chr });
				string file = TEST_DIR + "\\" + localName;

				if (File.Exists(localName)) throw null;
				if (File.Exists(file)) throw null;

				File.WriteAllBytes(localName, SCommon.EMPTY_BYTES);

				if (!File.Exists(localName)) throw null;
				if (!File.Exists(file)) throw null;

				SCommon.DeletePath(localName);

				if (File.Exists(localName)) throw null;
				if (File.Exists(file)) throw null;

				File.WriteAllBytes(file, SCommon.EMPTY_BYTES);

				if (!File.Exists(localName)) throw null;
				if (!File.Exists(file)) throw null;

				SCommon.DeletePath(file);

				if (File.Exists(localName)) throw null;
				if (File.Exists(file)) throw null;
			}
			Directory.SetCurrentDirectory(homeDir);
		}
	}
}
