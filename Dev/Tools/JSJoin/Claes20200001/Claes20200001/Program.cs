﻿using System;
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
using Charlotte.JSSources;

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

			Main4(new ArgsReader(new string[] { @"C:\Dev\GameJS\Test0001\Program", @"C:\Dev\GameJS\Test0001\res", @"C:\Dev\GameJS\Test0001\out" }));
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
				using (WorkingDir wd = new WorkingDir())
				{
					Main5(ar, wd);
				}
			}
			catch (Exception ex)
			{
				ProcMain.WriteLog(ex);

				//MessageBox.Show("" + ex, ProcMain.APP_TITLE + " / エラー", MessageBoxButtons.OK, MessageBoxIcon.Error);

				//Console.WriteLine("Press ENTER key. (エラーによりプログラムを終了します)");
				//Console.ReadLine();
			}
		}

		private JSSourceFile[] SourceFiles;
		private JSResourceFile[] ResourceFiles;

		private void Main5(ArgsReader ar, WorkingDir wd)
		{
			bool releaseMode = ar.ArgIs("/R");
			string sourceDir = SCommon.MakeFullPath(ar.NextArg());
			string resourceDir = SCommon.MakeFullPath(ar.NextArg());
			string outputDir = SCommon.MakeFullPath(ar.NextArg());

			ar.End();

			if (!Directory.Exists(sourceDir))
				throw new Exception("no sourceDir");

			if (!Directory.Exists(resourceDir))
				throw new Exception("no resourceDir");

			if (File.Exists(outputDir))
				throw new Exception("outputDir is not directory");

			// 出力先クリア
			//
			SCommon.DeletePath(outputDir);
			SCommon.CreateDir(outputDir);

			// 全ソースファイル取得
			{
				string[] files = Directory.GetFiles(sourceDir, "*", SearchOption.AllDirectories)
					.Where(file => !file.Contains("\\_")) // ? '_' で始まるローカル名を含まない。
					.Where(file => Common.ExtIs(file, ".js"))
					.ToArray();

				this.SourceFiles = files.Select(file => new JSSourceFile(file, wd)).ToArray();
			}

			// 全リソースファイル取得
			{
				string[] files = Directory.GetFiles(resourceDir, "*", SearchOption.AllDirectories)
					.Where(file => !file.Contains("\\_")) // ? '_' で始まるローカル名を含まない。
					.ToArray();

				this.ResourceFiles = files.Select(file => new JSResourceFile(file)).ToArray();
			}

			foreach (JSSourceFile sourceFile in this.SourceFiles)
			{
				Console.WriteLine("< " + sourceFile.OriginalFilePath);

				sourceFile.RemoveComments();
				sourceFile.SolveLiteralStrings();
				sourceFile.CollectContents();
			}
		}
	}
}
