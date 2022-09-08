using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;
using Charlotte.Commons;

namespace Charlotte
{
	public class DelayCommitManager
	{
		// -- CommitCount

		private int CommitCountDate;
		private int CommitCount;

		private string CommitCountFile
		{
			get
			{
				return Path.Combine(ProcMain.SelfDir, "CommitCount.dat");
			}
		}

		private void LoadCommitCount()
		{
			try
			{
				if (!File.Exists(this.CommitCountFile))
					throw new Exception();

				string[] lines = File.ReadAllLines(this.CommitCountFile, Encoding.UTF8);
				int c = 0;

				this.CommitCountDate = int.Parse(lines[c++]);
				this.CommitCount = int.Parse(lines[c++]);
			}
			catch // 読み込めない。-> デフォルト値で初期化
			{
				this.CommitCountDate = (int)(SCommon.SimpleDateTime.Now().ToTimeStamp() / 1000000);
				this.CommitCount = 0;
			}
		}

		private void SaveCommitCount()
		{
			List<string> lines = new List<string>();

			lines.Add("" + this.CommitCountDate);
			lines.Add("" + this.CommitCount);

			File.WriteAllLines(this.CommitCountFile, lines, Encoding.UTF8);
		}

		// --

		public int GetTodayCommitCount()
		{
			int today = (int)(SCommon.SimpleDateTime.Now().ToTimeStamp() / 1000000);

			this.LoadCommitCount();

			if (today != this.CommitCountDate)
				this.CommitCount = 0;

			return this.CommitCount;
		}

		public void IncrementCommitCount()
		{
			int today = (int)(SCommon.SimpleDateTime.Now().ToTimeStamp() / 1000000);

			this.LoadCommitCount();

			if (today != this.CommitCountDate)
			{
				this.CommitCountDate = today;
				this.CommitCount = 0;
			}
			this.CommitCount++;
			this.SaveCommitCount();
		}

		// ====

		private const string STORED_DIR_NAME_PREFIX = "Stored-";

		private string[] GetStoredDirs()
		{
			return Directory
				.GetDirectories(ProcMain.SelfDir, STORED_DIR_NAME_PREFIX + "*")
				.OrderBy(SCommon.Comp)
				.ToArray();
		}

		public int GetStoredCount()
		{
			return this.GetStoredDirs().Length;
		}

		public void Store(string dir)
		{
			dir = SCommon.MakeFullPath(dir);

			if (!Directory.Exists(dir))
				throw new ArgumentException("no dir");

			if (!Directory.Exists(Path.Combine(dir, Consts.DOT_GIT)))
				throw new Exception("no .git");

			if (!File.Exists(Path.Combine(dir, Consts.DOT_GIT_ATTRIBUTES)))
				throw new Exception("no .gitattributes");

			string storeDir = CreateStoreDir();

			SCommon.CreateDir(storeDir);

			foreach (string subDir in Directory.GetDirectories(dir))
			{
				if (SCommon.EqualsIgnoreCase(Path.GetFileName(subDir), Consts.DOT_GIT))
					continue;

				Directory.Move(subDir, Path.Combine(storeDir, Path.GetFileName(subDir)));
			}
			foreach (string file in Directory.GetFiles(dir))
			{
				if (SCommon.EqualsIgnoreCase(Path.GetFileName(file), Consts.DOT_GIT_ATTRIBUTES))
					continue;

				File.Move(file, Path.Combine(storeDir, Path.GetFileName(file)));
			}
		}

		private string CreateStoreDir()
		{
			long timeStamp = SCommon.SimpleDateTime.Now().ToTimeStamp();

			for (; ; timeStamp++)
			{
				string storeDir = Path.Combine(ProcMain.SelfDir, STORED_DIR_NAME_PREFIX + timeStamp);

				if (!Directory.Exists(storeDir))
				{
					return storeDir;
				}
			}
		}

		public void Restore(string dir)
		{
			dir = SCommon.MakeFullPath(dir);

			if (!Directory.Exists(dir))
				throw new ArgumentException("no dir");

			if (!Directory.Exists(Path.Combine(dir, Consts.DOT_GIT)))
				throw new Exception("no .git");

			if (!File.Exists(Path.Combine(dir, Consts.DOT_GIT_ATTRIBUTES)))
				throw new Exception("no .gitattributes");

			string[] storedDirs = this.GetStoredDirs();

			if (storedDirs.Length != 0)
				throw new Exception("no storedDirs");

			string storedDir = storedDirs[0];

			if (!Directory.Exists(storedDir))
				throw new Exception("no storedDir");

			foreach (string subDir in Directory.GetDirectories(dir))
			{
				if (SCommon.EqualsIgnoreCase(Path.GetFileName(subDir), Consts.DOT_GIT))
					continue;

				SCommon.DeletePath(subDir);
			}
			foreach (string file in Directory.GetFiles(dir))
			{
				if (SCommon.EqualsIgnoreCase(Path.GetFileName(file), Consts.DOT_GIT_ATTRIBUTES))
					continue;

				SCommon.DeletePath(file);
			}
			foreach (string subDir in Directory.GetDirectories(storedDir))
			{
				if (SCommon.EqualsIgnoreCase(Path.GetFileName(subDir), Consts.DOT_GIT))
					throw new Exception("Bad DOT_GIT");

				Directory.Move(subDir, Path.Combine(dir, Path.GetFileName(subDir)));
			}
			foreach (string file in Directory.GetFiles(storedDir))
			{
				if (SCommon.EqualsIgnoreCase(Path.GetFileName(file), Consts.DOT_GIT_ATTRIBUTES))
					throw new Exception("Bad DOT_GIT_ATTRIBUTES");

				File.Move(file, Path.Combine(dir, Path.GetFileName(file)));
			}
			SCommon.DeletePath(storedDir);
		}
	}
}
