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
				.Where(v => SCommon.Comp(v, SCommon.ENCODING_SJIS.GetBytes(SCommon.ENCODING_SJIS.GetString(v))) == 0)
				.Select(v => SCommon.ENCODING_SJIS.GetString(v)[0])
				.ToArray();

			char[][] chrLChrPairs = allChrs.Select(v => new char[] { v, char.ToLower(v) }).Where(v => v[0] != v[1]).ToArray();
			char[][] uChrChrPairs = allChrs.Select(v => new char[] { char.ToUpper(v), v }).Where(v => v[0] != v[1]).ToArray();

			Array.Sort(chrLChrPairs, (a, b) => (int)a[0] - (int)b[0]);
			Array.Sort(uChrChrPairs, (a, b) => (int)a[0] - (int)b[0]);

			File.WriteAllLines(@"C:\temp\1.txt", chrLChrPairs.Select(v => v[0] + ", " + v[1]), Encoding.UTF8);
			File.WriteAllLines(@"C:\temp\2.txt", uChrChrPairs.Select(v => v[0] + ", " + v[1]), Encoding.UTF8);

			if (SCommon.Comp(chrLChrPairs, uChrChrPairs, (a, b) => SCommon.Comp(a, b, (aa, bb) => (int)aa - (int)bb)) != 0)
				throw null;
		}
	}
}
