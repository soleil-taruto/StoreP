using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;
using Charlotte.Commons;

namespace Charlotte.Tests
{
	public class Test0013
	{
		public void Test01()
		{
			using (StreamWriter writer = new StreamWriter(SCommon.NextOutputPath() + ".log", false, Encoding.UTF8))
			{
				Action<object> bk_writeLog = ProcMain.WriteLog;
				ProcMain.WriteLog = message => writer.WriteLine(message);
				try
				{
					Test01_a();
				}
				finally
				{
					ProcMain.WriteLog = bk_writeLog;
				}
			}
		}

		private void Test01_a()
		{
#if true
			char[] allChrs = Enumerable.Range(0, 65536).Select(v => (char)v).ToArray();
#else
			char[] allChrs = SCommon.GetJCharCodes()
				.Select(v => new byte[] { (byte)(v >> 8), (byte)(v & 0xff) })
				//.Where(v => SCommon.Comp(v, SCommon.ENCODING_SJIS.GetBytes(SCommon.ENCODING_SJIS.GetString(v))) == 0)
				.Select(v => SCommon.ENCODING_SJIS.GetString(v)[0])
				.ToArray();
#endif

			char[][] chrLChrPairs = allChrs.Select(v => new char[] { v, char.ToLower(v) }).Where(v => v[0] != v[1]).ToArray();
			char[][] uChrChrPairs = allChrs.Select(v => new char[] { char.ToUpper(v), v }).Where(v => v[0] != v[1]).ToArray();

			List<char[]> chrLChrPairOnly = new List<char[]>();
			List<char[]> chrLChrPairBoth = new List<char[]>();
			List<char[]> uChrChrPairBoth = new List<char[]>();
			List<char[]> uChrChrPairOnly = new List<char[]>();

			SCommon.Merge(
				chrLChrPairs,
				uChrChrPairs,
				(a, b) => SCommon.Comp(a, b, (aa, bb) => (int)aa - (int)bb),
				chrLChrPairOnly,
				chrLChrPairBoth,
				uChrChrPairBoth,
				uChrChrPairOnly
				);

			foreach (char[] pair in chrLChrPairOnly)
				ProcMain.WriteLog("chrLChrPairOnly: [" + pair[0] + "], [" + pair[1] + "]");

			foreach (char[] pair in uChrChrPairOnly)
				ProcMain.WriteLog("uChrChrPairOnly: [" + pair[0] + "], [" + pair[1] + "]");

			string WORK_DIR = @"C:\temp\Test0013_WorkDir";

			foreach (char[] pair in chrLChrPairBoth)
			{
				string path1 = Path.Combine(WORK_DIR, new string(new char[] { pair[0] }));
				string path2 = Path.Combine(WORK_DIR, new string(new char[] { pair[1] }));

				ProcMain.WriteLog("*1 " + path1);
				ProcMain.WriteLog("*2 " + path2);

				// ----

				SCommon.DeletePath(WORK_DIR);
				SCommon.CreateDir(WORK_DIR);

				if (File.Exists(path2)) // 2bs
					throw null;

				File.WriteAllBytes(path1, SCommon.EMPTY_BYTES);

				if (!File.Exists(path2))
					throw null;

				// ----

				SCommon.DeletePath(WORK_DIR);
				SCommon.CreateDir(WORK_DIR);

				if (File.Exists(path1)) // 2bs
					throw null;

				File.WriteAllBytes(path2, SCommon.EMPTY_BYTES);

				if (!File.Exists(path1))
					throw null;

				// ----
			}
			ProcMain.WriteLog("OK!");
		}
	}
}
