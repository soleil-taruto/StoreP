using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Charlotte.Utilities;
using Charlotte.Commons;

namespace Charlotte.Tests
{
	/// <summary>
	/// StringSpliceSequencer.cs テスト
	/// </summary>
	public class Test0009
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
	}
}
