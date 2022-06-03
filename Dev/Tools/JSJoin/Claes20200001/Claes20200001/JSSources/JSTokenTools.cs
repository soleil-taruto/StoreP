using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Charlotte.Commons;
using Charlotte.Utilities;

namespace Charlotte.JSSources
{
	public class JSTokenTools
	{
		private static JSTokenTools _i = null;

		public static JSTokenTools I
		{
			get
			{
				if (_i == null)
					_i = new JSTokenTools();

				return _i;
			}
		}

		private static readonly string SYMBOL_CHRS = "()[]{}=:;";

		private BitList SymbolChrs;
		private BitList FirstChrs;
		private BitList TrailChrs;

		private JSTokenTools()
		{
			this.SymbolChrs = new BitList();

			foreach (char chr in SYMBOL_CHRS)
				this.SymbolChrs[(int)chr] = true;

			this.FirstChrs = new BitList();
			this.TrailChrs = new BitList();

			foreach (char chr in SCommon.GetJChars()
				+ SCommon.ALPHA
				+ SCommon.alpha
				+ "$_"
				)
			{
				this.FirstChrs[(int)chr] = true;
				this.TrailChrs[(int)chr] = true;
			}

			foreach (char chr in SCommon.DECIMAL)
				this.TrailChrs[(int)chr] = true;
		}

		public IEnumerable<JSToken> Tokenize(string text)
		{
			for (int index = 0; index < text.Length; )
			{
				char chr = text[index];

				if (this.SymbolChrs[(int)chr])
				{
					yield return new JSToken()
					{
						Kind = JSToken.Kind_e.SYMBOL,
						Text = new string(new char[] { chr }),
						Index = index,
					};

					index++;
					continue;
				}
				if (this.FirstChrs[(int)chr])
				{
					int p;

					for (p = index + 1; p < text.Length; p++)
						if (!this.TrailChrs[(int)text[p]])
							break;

					// Image_t[][] などの "[]" を含める。
					//
					while (
						p + 1 < text.Length &&
						text[p + 0] == '[' &&
						text[p + 1] == ']'
						)
						p += 2;

					yield return new JSToken()
					{
						Kind = JSToken.Kind_e.WORD,
						Text = text.Substring(index, p - index),
						Index = index,
					};

					index = p;
					continue;
				}
				index++;
			}
		}
	}
}
