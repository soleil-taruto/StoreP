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
			char[] allChrs = SCommon.GetJCharCodes()
				.Select(v => new byte[] { (byte)(v >> 8), (byte)(v & 0xff) })
				//.Where(v => SCommon.Comp(v, SCommon.ENCODING_SJIS.GetBytes(SCommon.ENCODING_SJIS.GetString(v))) == 0)
				.Select(v => SCommon.ENCODING_SJIS.GetString(v)[0])
				.ToArray();

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
				Console.WriteLine("chrLChrPairOnly: [" + pair[0] + "], [" + pair[1] + "]");

			foreach (char[] pair in uChrChrPairOnly)
				Console.WriteLine("uChrChrPairOnly: [" + pair[0] + "], [" + pair[1] + "]");

			string WORK_DIR = @"C:\temp\Test0013_WorkDir";

			foreach (char[] pair in chrLChrPairBoth)
			{
				string path1 = Path.Combine(WORK_DIR, new string(new char[] { pair[0] }));
				string path2 = Path.Combine(WORK_DIR, new string(new char[] { pair[1] }));

				Console.WriteLine("*1 " + path1);
				Console.WriteLine("*2 " + path2);

				// ----

				SCommon.DeletePath(WORK_DIR);
				SCommon.CreateDir(WORK_DIR);

				File.WriteAllBytes(path1, SCommon.EMPTY_BYTES);

				if (!File.Exists(path2))
					throw null;

				// ----

				SCommon.DeletePath(WORK_DIR);
				SCommon.CreateDir(WORK_DIR);

				File.WriteAllBytes(path2, SCommon.EMPTY_BYTES);

				if (!File.Exists(path1))
					throw null;

				// ----
			}
			Console.WriteLine("OK!");
		}
	}
}
