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
			SCommon.OpenOutputDirIfCreated();
		}

		private void Main3()
		{
			// -- choose one --

			Main4(new ArgsReader(new string[] { @"C:\Dev\GameJS\HPStore" }));
			//new Test0001().Test01();
			//new Test0002().Test01();
			//new Test0003().Test01();

			// --

			SCommon.Pause();
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

				//Console.WriteLine("Press ENTER key. (エラーによりプログラムを終了します)");
				//Console.ReadLine();
			}
		}

		private string SrcRootDir;
		private string DestRootDir;

		private void Main5(ArgsReader ar)
		{
			this.SrcRootDir = SCommon.MakeFullPath(ar.NextArg());
			this.DestRootDir = SCommon.GetOutputDir();

			if (!Directory.Exists(this.SrcRootDir))
				throw new Exception("no SrcRootDir");

			if (!Directory.Exists(this.DestRootDir))
				throw new Exception("no DestRootDir");

			string[] rDirs = Directory.GetDirectories(this.SrcRootDir);

			foreach (string rDir in rDirs)
			{
				string rOutDir = Path.Combine(rDir, "out");
				string wDir = Path.Combine(this.DestRootDir, Path.GetFileName(rDir));

				Console.WriteLine("< " + rOutDir);
				Console.WriteLine("> " + wDir);

				SCommon.CopyDir(rOutDir, wDir);

				Console.WriteLine("done");
			}
			Console.WriteLine("OK!");
		}
	}
}
