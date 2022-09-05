﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.IO;
using Charlotte.Commons;

namespace Charlotte.CSSolutions
{
	public class CSSolution
	{
		private string SolutionFile;
		private string SolutionDir;
		private string ProjectName;
		private string ProjectDir;
		private string ProjectFile;
		private string BinDir;
		private string ObjDir;
		private string SuoFile;
		private string OutputExeFile;

		public CSSolution(string solutionFile)
		{
			solutionFile = SCommon.MakeFullPath(solutionFile);

			if (!File.Exists(solutionFile))
				throw new Exception("no solutionFile");

			this.SolutionFile = solutionFile;
			this.SolutionDir = Path.GetDirectoryName(solutionFile);
			this.ProjectName = Path.GetFileNameWithoutExtension(solutionFile);

			if (!Regex.IsMatch(this.ProjectName, "[_0-9A-Za-z]{1,100}")) // rough limit
				throw new Exception("Bad ProjectName");

			this.ProjectDir = Path.Combine(this.SolutionDir, this.ProjectName);
			this.ProjectFile = Path.Combine(this.ProjectDir, this.ProjectName) + ".csproj";

			if (!File.Exists(this.ProjectFile))
				throw new Exception("no ProjectFile");

			this.BinDir = Path.Combine(this.ProjectDir, "bin");
			this.ObjDir = Path.Combine(this.ProjectDir, "obj");
			this.SuoFile = Path.Combine(this.SolutionDir, this.ProjectName) + ".suo";
			this.OutputExeFile = Path.Combine(this.BinDir, "Release", this.ProjectName) + ".exe";
		}

		/// <summary>
		/// bin ディレクトリを返す。
		/// </summary>
		/// <returns>bin ディレクトリ</returns>
		public string GetBinDir()
		{
			return this.BinDir;
		}

		/// <summary>
		/// 出力 exe ファイルを返す。
		/// </summary>
		/// <returns>出力 exe ファイル</returns>
		public string GetOutputExeFile()
		{
			return this.OutputExeFile;
		}

		/// <summary>
		/// クリーンアップ
		/// </summary>
		public void Clean()
		{
			SCommon.DeletePath(this.BinDir);
			SCommon.DeletePath(this.ObjDir);
			SCommon.DeletePath(this.SuoFile);
		}

		/// <summary>
		/// ビルド
		/// </summary>
		public void Build()
		{
			using (WorkingDir wd = new WorkingDir())
			{
				Console.WriteLine("MSBuild.1");

				SCommon.Batch(
					new string[]
					{
						@"CALL C:\Factory\SetEnv.bat",
						"cx " + Path.GetFileName(this.SolutionFile),
						// 2019
						//@"CALL ""C:\Program Files (x86)\Microsoft Visual Studio\2019\Community\Common7\Tools\VsDevCmd.bat""",
						// 2010
						//@"CALL ""C:\Program Files (x86)\Microsoft Visual Studio 10.0\VC\vcvarsall.bat""",
						//"MSBuild /property:configuration=Release " + Path.GetFileName(this.SolutionFile),
					},
					this.SolutionDir
					);

				Console.WriteLine("MSBuild.2");
			}
		}

		/// <summary>
		/// リビルド
		/// </summary>
		public void Rebuild()
		{
			this.Clean();
			this.Build();
		}

		/// <summary>
		/// 難読化する。
		/// 注意：ソースファイルを書き換える！
		/// </summary>
		public void Confuse(Action a_beforeRemoveUnnecessaryInformations, CSRenameVarsFilter rvf)
		{
			CSFile[] csFiles = Directory.GetFiles(this.ProjectDir, "*.cs", SearchOption.AllDirectories)
				.Where(v => !SCommon.ContainsIgnoreCase(v.Substring(this.ProjectDir.Length), "\\Properties\\"))
				.Select(v => new CSFile(v))
				.ToArray();

			// 念のためソートしておく -- 不幸な並びになった時の何らかの偏りを懸念
			Array.Sort(csFiles, (a, b) => SCommon.CompIgnoreCase(a.GetFile(), b.GetFile()));

			string beforeWarpableMemberLine = "// " + CSCommon.CreateNewIdent() + " -- BWML";
			string dummyMyProjectRootNamespace = "9_" + CSCommon.CreateNewIdent() + "_DMPRN"; // 置き換えられないように数字で始める。

			foreach (CSFile csFile in csFiles)
			{
				Console.WriteLine("file.1: " + csFile.GetFile());

				csFile.SolveNamespace();
				csFile.RemoveComments();
				csFile.RemovePreprocessorDirectives();
				csFile.SolveAccessModifiers();
				csFile.FormatCloseOrEmptyClass();
				csFile.SolveLiteralStrings(beforeWarpableMemberLine);
			}
			//foreach (CSFile csFile in csFiles.Shuffle()) // del -- 不幸な並びになった時の何らかの偏りを懸念
			foreach (CSFile csFile in csFiles)
			{
				Console.WriteLine("file.2: " + csFile.GetFile());

				csFile.WarpLiteralStrings(
					beforeWarpableMemberLine,
					csFiles.Where(v => v != csFile && !v.GetClassOrStructName().Contains('<')).ToArray(), // 自分自身とジェネリック型を除外
					dummyMyProjectRootNamespace
					);
			}
			foreach (CSFile csFile in csFiles)
			{
				Console.WriteLine("file.3: " + csFile.GetFile());

				csFile.AddDummyMember();
				csFile.RenameEx(rvf.Filter, rvf.Is予約語クラス名);
				csFile.ShuffleMemberOrder();

				// ダミー名前空間の解決
				{
					string text = File.ReadAllText(csFile.GetFile(), Encoding.UTF8);
					text = text.Replace(dummyMyProjectRootNamespace, CSConsts.MY_PROJECT_ROOT_NAMESPACE);
					File.WriteAllText(csFile.GetFile(), text, Encoding.UTF8);
				}
			}

			CSProjectFile projFile = new CSProjectFile(this.ProjectFile);

			projFile.ShuffleCompileOrder();

			// ----

			a_beforeRemoveUnnecessaryInformations();

			// ----

			foreach (CSFile csFile in csFiles)
			{
				Console.WriteLine("file.4: " + csFile.GetFile());

				csFile.RemoveUnnecessaryInformations();
			}

			projFile.RenameCompiles(rvf.CreateNameNew);
			projFile.RemoveUnnecessaryInformations();
		}
	}
}
