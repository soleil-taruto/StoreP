using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Charlotte.Commons;
using Charlotte.Utilities;

namespace Charlotte.Tests
{
	/// <summary>
	/// StringSpliceSequencer.cs テスト
	/// </summary>
	public class Test0008
	{
		public void Test01()
		{
			for (int testcnt = 0; testcnt < 10000; testcnt++)
			{
				Test01_a();
			}
			Console.WriteLine("OK!");
		}

		private void Test01_a()
		{
			string[] words = new string[]
			{
				"Sio",
				"Miso",
				"Syoyu",
				"Hakata",
				"Sapporo",
				"Tonkotsu",
			};

			string src = string.Join("", Enumerable.Range(0, SCommon.CRandom.GetInt(100)).Select(dummy => SCommon.CRandom.ChooseOne(words)));
			string word1 = SCommon.CRandom.ChooseOne(words);
			string word2 = SCommon.CRandom.ChooseOne(words);

			string ans1 = src.Replace(word1, word2);
			string ans2;

			{
				StringSpliceSequencer sss = new StringSpliceSequencer(src);
				int index = 0;

				for (; ; )
				{
					index = src.IndexOf(word1, index);

					if (index == -1)
						break;

					sss.Splice(index, word1.Length, word2);
					index += word1.Length;
				}
				ans2 = sss.GetString();
			}

			if (ans1 != ans2) // ? 不一致
				throw null;
		}

		public void Test02()
		{
			for (int testcnt = 0; testcnt < 10000; testcnt++)
			{
				Test02_a();
			}
			Console.WriteLine("OK!");
		}

		private void Test02_a()
		{
			char[] SRC_CHARS = SCommon.HALF.ToArray();
			string src = new string(Enumerable
				.Range(0, SCommon.CRandom.GetInt(100))
				.Select(dummy => SCommon.CRandom.ChooseOne(SRC_CHARS))
				.ToArray());

			string ans1 = src;
			string ans2;

			int index1 = 0;
			int index2 = 0;

			StringSpliceSequencer sss = new StringSpliceSequencer(src);

			for (; ; )
			{
				int span = SCommon.CRandom.GetInt(30);

				index1 += span;
				index2 += span;

				int removeLength = SCommon.CRandom.GetInt(30);

				if (ans1.Length < index1 + removeLength)
					break;

				string newPart = new string(Enumerable
					.Range(0, SCommon.CRandom.GetInt(30))
					.Select(dummy => SCommon.CRandom.ChooseOne(SRC_CHARS))
					.ToArray());

				ans1 = ans1.Substring(0, index1) + newPart + ans1.Substring(index1 + removeLength);
				sss.Splice(index2, removeLength, newPart);

				index1 += newPart.Length;
				index2 += removeLength;
			}
			ans2 = sss.GetString();

			if (ans1 != ans2) // ? 不一致
				throw null;
		}
	}
}
