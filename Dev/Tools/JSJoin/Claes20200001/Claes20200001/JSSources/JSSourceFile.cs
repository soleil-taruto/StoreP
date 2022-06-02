using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;
using Charlotte.Commons;

namespace Charlotte.JSSources
{
	public class JSSourceFile
	{
		public string FilePath;

		public JSSourceFile(string filePath)
		{
			this.FilePath = filePath;
		}

		public char[] Text;

		public void Load()
		{
			this.Text = File.ReadAllText(this.FilePath, SCommon.ENCODING_SJIS).ToArray();
		}

		public void RemoveComments()
		{
			for (int index = 0; index < this.Text.Length; )
			{
				char chr = this.Text[index];

				if (chr == '"') // ? リテラル文字列(ダブルクォート)
				{
					index = this.SkipLiteralString(index, '"');
					continue;
				}
				if (chr == '\'') // ? リテラル文字列(シングルクォート)
				{
					index = this.SkipLiteralString(index, '\'');
					continue;
				}
				if (chr == '/')
				{
					index++;
					chr = this.Text[index];

					if (chr == '*') // ? C系コメント開始
					{
						int p;

						for (p = index + 1; ; p++)
							if (this.Text[p] == '*' && this.Text[p + 1] == '/') // ? C系コメント終了
								break;

						this.EraseComment(index - 1, p + 2);
						index = p + 2;
						continue;
					}
					if (chr == '/') // ? C++系コメント開始
					{
						int p;

						for (p = index + 1; p < this.Text.Length; p++)
							if (this.Text[p] == '\n') // ? C++系コメント終了
								break;

						this.EraseComment(index - 1, p);
						index = p;
						continue;
					}
				}
				index++;
			}
		}

		private int SkipLiteralString(int index, char literalStringEndChr)
		{
			int p;

			for (p = index + 1; ; p++)
			{
				if (this.Text[p] == literalStringEndChr)
					break;

				// ここでは \xff \uffff \u{ffff} を考慮しなくて良い。
				//
				if (this.Text[p] == '\\') // ? エスケープ文字 -> スキップ
					p++;
			}
			return p + 1;
		}

		private void EraseComment(int start, int end)
		{
			StringBuilder buff = new StringBuilder();

			for (int index = start; index < end; index++)
			{
				char chr = this.Text[index];

				if (chr > ' ') // ? 空白系文字ではない。-> 空白にする。
					chr = ' ';

				this.Text[index] = chr;
			}
		}

		public void SolveLiteralStrings()
		{
			StringBuilder buff = new StringBuilder();
			bool insideLiteralString = false;
			char literalStringEndChr = '\0';

			for (int index = 0; index < this.Text.Length; index++)
			{
				char chr = this.Text[index];

				if (insideLiteralString)
				{
					if (chr == literalStringEndChr)
					{
						insideLiteralString = false;
						buff.Append('"');
					}
					else
					{
						if (chr == '\\')
						{
							index++;
							chr = this.Text[index];

							// '\b' など、使用しなさそうなエスケープシーケンスは無視する。

							if (chr == 't')
							{
								chr = '\t';
							}
							else if (chr == 'r')
							{
								chr = '\r';
							}
							else if (chr == 'n')
							{
								chr = '\n';
							}
							else if (chr == '"')
							{
								// noop
							}
							else if (chr == '\'')
							{
								// noop
							}
							else if (chr == '\\')
							{
								// noop
							}
							else if (chr == 'x') // \xff
							{
								chr = (char)Convert.ToUInt16(new string(new char[]
								{
									this.Text[index + 1],
									this.Text[index + 2],
								}));
								index += 2;
							}
							else if (chr == 'u' && this.Text[index + 1] == '{') // \u{ffff}
							{
								throw new Exception("対応していないエスケープシーケンス");
							}
							else if (chr == 'u') // \uffff
							{
								chr = (char)Convert.ToUInt16(new string(new char[]
								{
									this.Text[index + 1],
									this.Text[index + 2],
									this.Text[index + 3],
									this.Text[index + 4],
								}));
								index += 4;
							}
							else
							{
								throw new Exception("不明なエスケープシーケンス");
							}
						}
						buff.Append(string.Format("\\u{0:x4}", (int)chr));
					}
				}
				else
				{
					if (chr == '"')
					{
						insideLiteralString = true;
						literalStringEndChr = '"';
					}
					else if (chr == '\'')
					{
						insideLiteralString = true;
						literalStringEndChr = '\'';
						chr = '"';
					}
					buff.Append(chr);
				}
			}
			this.Text = buff.ToString().ToArray();
		}

		public List<JSContent> Contents;

		public void CollectContents()
		{
		}
	}
}
