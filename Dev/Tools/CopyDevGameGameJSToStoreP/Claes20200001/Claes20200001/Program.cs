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
			catch (Exception e)
			{
				ProcMain.WriteLog(e);

				Console.WriteLine("Press ENTER key. (エラー終了)");
				Console.ReadLine();
			}
		}

		private void Main5(ArgsReader ar)
		{
			if (!Directory.Exists(Consts.R_DIR_01))
				throw new Exception("no R_DIR_01");

			if (!Directory.Exists(Consts.R_DIR_02))
				throw new Exception("no R_DIR_02");

			if (!Directory.Exists(Consts.W_DIR_01))
				throw new Exception("no W_DIR_01");

			if (!Directory.Exists(Consts.W_DIR_02))
				throw new Exception("no W_DIR_02");

			Console.WriteLine("start...");

			DoCopyMain(Consts.R_DIR_01, Consts.W_DIR_01, Consts.SRC_LOCAL_DIR_01);
			DoCopyMain(Consts.R_DIR_02, Consts.W_DIR_02, Consts.SRC_LOCAL_DIR_02);

			Console.WriteLine("done!");
		}

		private void DoCopyMain(string rRootDir, string wRootDir, string srcLocalDir)
		{
			SCommon.DeletePath(wRootDir);
			SCommon.CreateDir(wRootDir);

			string[] projects = Directory.GetDirectories(rRootDir).Select(dir => Path.GetFileName(dir)).ToArray();

			foreach (string project in projects)
			{
				string rDir = Path.Combine(rRootDir, project, srcLocalDir);
				string wDir = Path.Combine(wRootDir, project, srcLocalDir);

				ProcMain.WriteLog("< " + rDir);
				ProcMain.WriteLog("> " + wDir);

				if (!Directory.Exists(rDir))
					throw new Exception("no rDir: " + rDir);

				SCommon.CopyDir(rDir, wDir);

				ProcMain.WriteLog("done");
			}
		}
	}
}
