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
using Charlotte.Utilities;

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

			Main4(new ArgsReader(new string[] { "/C", @"C:\home\GitHub\StoreP" }));
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
			catch (Exception e)
			{
				ProcMain.WriteLog(e);

				Console.WriteLine("Press ENTER key. (エラーによりプログラムを終了しました)");
				Console.ReadLine();
			}
		}

		private void Main5(ArgsReader ar)
		{
			if (ar.ArgIs("/C"))
			{
				Commit(ar.NextArg());
			}
			else
			{
				throw new Exception("不明なコマンド引数");
			}
		}

		private void Commit(string dir)
		{
			dir = SCommon.MakeFullPath(dir);

			if (!Directory.Exists(dir))
				throw new Exception("no dir: " + dir);

			if (!Directory.Exists(Path.Combine(dir, ".git")))
				throw new Exception("no .git: " + dir);

			if (!File.Exists(Path.Combine(dir, ".gitattributes")))
				throw new Exception("no .gitattributes: " + dir);

			string commitComment = GetCommitComment();

			SCommon.Batch(
				new string[]
				{
					GitCommandUtils.GetGitProgram() + " add *",
					GitCommandUtils.GetGitProgram() + " commit -m \"" + commitComment + "\"",
				},
				dir
				);
		}

		private static string GetCommitComment()
		{
			return "ss";
			//return "ss-" + SCommon.SimpleDateTime.Now().ToTimeStamp().ToString();
		}
	}
}
