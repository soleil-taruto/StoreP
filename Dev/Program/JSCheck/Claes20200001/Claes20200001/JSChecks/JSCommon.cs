using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Charlotte.Commons;
using Charlotte.Utilities;

namespace Charlotte.JSChecks
{
	public static class JSCommon
	{
		public static bool IsJSWordChar(char chr)
		{
			return
				('0' <= chr && chr <= '9') ||
				('A' <= chr && chr <= 'Z') ||
				('a' <= chr && chr <= 'z') ||
				chr == '$' ||
				chr == '_' ||
				IsJChar(chr);
		}

		private static BitList JChars = null;

		public static bool IsJChar(char chr)
		{
			if (JChars == null)
				JChars = P_GetJChars();

			return JChars[(long)chr];
		}

		private static BitList P_GetJChars()
		{
			BitList dest = new BitList();

			foreach (char chr in SCommon.GetJChars())
				dest[(long)chr] = true;

			return dest;
		}
	}
}
