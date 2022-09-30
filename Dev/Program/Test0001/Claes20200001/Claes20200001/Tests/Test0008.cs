using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;
using Charlotte.Commons;

namespace Charlotte.Tests
{
	public class Test0008
	{
		private const string TARGET_DIR_01 = @"C:\temp\20220918_DevBin";
		private const string TARGET_DIR_02 = @"C:\Chest\20220919_DevBin";

		public void Test01()
		{
			if (!Directory.Exists(TARGET_DIR_01))
				throw null;

			if (!Directory.Exists(TARGET_DIR_02))
				throw null;

			string[] dirs_01 = Directory.GetDirectories(TARGET_DIR_01, "*", SearchOption.AllDirectories);
			string[] dirs_02 = Directory.GetDirectories(TARGET_DIR_02, "*", SearchOption.AllDirectories);
			string[] files_01 = Directory.GetFiles(TARGET_DIR_01, "*", SearchOption.AllDirectories);
			string[] files_02 = Directory.GetFiles(TARGET_DIR_02, "*", SearchOption.AllDirectories);

			PathsFilter(dirs_01, TARGET_DIR_01);
			PathsFilter(dirs_02, TARGET_DIR_02);
			PathsFilter(files_01, TARGET_DIR_01);
			PathsFilter(files_02, TARGET_DIR_02);

			if (SCommon.Comp(dirs_01, dirs_02, SCommon.Comp) != 0) // ? ディレクトリ一覧の不一致
				throw null;

			if (SCommon.Comp(files_01, files_02, SCommon.Comp) != 0) // ? ファイル一覧の不一致
				throw null;

			foreach (string file in files_01)
			{
				string file_01 = Path.Combine(TARGET_DIR_01, file);
				string file_02 = Path.Combine(TARGET_DIR_02, file);

				byte[] fileData_01 = File.ReadAllBytes(file_01);
				byte[] fileData_02 = File.ReadAllBytes(file_02);

				if (SCommon.Comp(fileData_01, fileData_02) != 0) // ? ファイル不一致
				{
					Console.WriteLine(file); // cout

					if (fileData_01.Length != fileData_02.Length) // ? ファイルの長さ不一致
						throw null;

					CheckDiff(fileData_01, fileData_02);
				}
			}
		}

		private void PathsFilter(string[] paths, string rootDirOfPaths)
		{
			for (int index = 0; index < paths.Length; index++)
			{
				paths[index] = SCommon.ChangeRoot(paths[index], rootDirOfPaths);
			}
			Array.Sort(paths, SCommon.Comp);
		}

		private byte[] PART_A_01 = SCommon.Hex.ToBytes("e587bae69da5");
		private byte[] PART_A_02 = SCommon.Hex.ToBytes("e381a7e3818d");
		private byte[] PART_B_01 = SCommon.Hex.ToBytes("8f6f9788");
		private byte[] PART_B_02 = SCommon.Hex.ToBytes("82c582ab");

		private void CheckDiff(byte[] fileData_01, byte[] fileData_02)
		{
			for (int index = 0; index < fileData_01.Length; )
			{
				if (fileData_01[index] != fileData_02[index])
				{
					if (
						IsPartMatch(fileData_01, index, PART_A_01) &&
						IsPartMatch(fileData_02, index, PART_A_02)
						)
					{
						Console.WriteLine("FIND-A");

						index += PART_A_01.Length;
						continue;
					}

					if (
						IsPartMatch(fileData_01, index, PART_B_01) &&
						IsPartMatch(fileData_02, index, PART_B_02)
						)
					{
						Console.WriteLine("FIND-B");

						index += PART_B_01.Length;
						continue;
					}

					throw null;
				}
				index++;
			}
		}

		private bool IsPartMatch(byte[] fileData, int offset, byte[] expectPtn)
		{
			for (int index = 0; index < expectPtn.Length; index++)
				if (fileData[offset + index] != expectPtn[index])
					return false;

			return true;
		}
	}
}
