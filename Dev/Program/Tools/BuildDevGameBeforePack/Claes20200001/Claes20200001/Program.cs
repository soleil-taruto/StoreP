using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.IO;
using System.Drawing;
using System.Drawing.Imaging;
using System.Windows.Forms;
using Charlotte.Commons;
using Charlotte.Tests;

namespace Charlotte
{
	class Program
	{
		static void Main(string[] args)
		{
			ProcMain.CUIMain(new Program().Main2);
		}

		private void Main2(ArgsReader ar)
		{
			if (ProcMain.DEBUG)
			{
				Main3();
			}
			else
			{
				Main4(ar);
			}
			Common.OpenOutputDirIfCreated();
		}

		private void Main3()
		{
			// -- choose one --

			Main4(new ArgsReader(new string[] { }));
			//new Test0001().Test01();
			//new Test0002().Test01();
			//new Test0003().Test01();

			// --

			Common.Pause();
		}

		private void Main4(ArgsReader ar)
		{
			try
			{
				Main5(ar);
			}
			catch (Exception ex)
			{
				ProcMain.WriteLog(ex);

				//MessageBox.Show("" + ex, ProcMain.APP_TITLE + " / エラー", MessageBoxButtons.OK, MessageBoxIcon.Error);

				Console.WriteLine("Press ENTER key. (エラーによりプログラムを終了します)");
				Console.ReadLine();
			}
		}

		private string[] DedokoroFiles;
		private string DedokoroText;

		private void Main5(ArgsReader ar)
		{
			if (!ar.ArgIs("BUILD-DEV-GAME-UNSAFE-MOD"))
				throw new Exception("Need BUILD-DEV-GAME-UNSAFE-MOD command-option");

			string outputDir = SCommon.MakeFullPath(ar.NextArg());
			string resourceDir = SCommon.MakeFullPath(ar.NextArg());

			ar.End();

			if (!Directory.Exists(outputDir))
				throw new Exception("no outputDir");

			if (!Directory.Exists(resourceDir))
				throw new Exception("no resourceDir");

			DedokoroFiles = Directory.GetFiles(resourceDir, "_source.txt", SearchOption.AllDirectories);
			DedokoroText = SCommon.LinesToText(GetDedokoroLines().ToArray()).Trim();

			foreach (string file in Directory.GetFiles(outputDir, "*.txt", SearchOption.AllDirectories))
			{
				Console.WriteLine("* " + file); // cout

				string text = File.ReadAllText(file, SCommon.ENCODING_SJIS);

				text = text.Replace("$source-of-resource$", DedokoroText);

				File.WriteAllText(file, text, SCommon.ENCODING_SJIS);
			}
		}

		private IEnumerable<string> GetDedokoroLines()
		{
			foreach (string file in DedokoroFiles)
			{
				Console.WriteLine("< " + file); // cout

				string[] lines = File.ReadAllLines(file, SCommon.ENCODING_SJIS);

				if (
					lines.Length < 2 ||
					string.IsNullOrEmpty(lines[0]) || // ? 空行
					string.IsNullOrEmpty(lines[1]) || // ? 空行
					!lines[1].StartsWith("http") // ? URLではない
					)
					throw new Exception("不正な出処ファイル");

				yield return lines[0];
				yield return lines[1];
				yield return "";
			}
		}
	}
}
