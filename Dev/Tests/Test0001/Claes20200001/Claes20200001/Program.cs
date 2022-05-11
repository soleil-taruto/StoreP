﻿using System;
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
				Main4();
			}
			Common.OpenOutputDirIfCreated();
		}

		private void Main3()
		{
			Main4();
			Common.Pause();
		}

		private void Main4()
		{
			try
			{
				Main5();
			}
			catch (Exception ex)
			{
				ProcMain.WriteLog(ex);
			}
		}

		private void Main5()
		{
			// -- choose one --

			//new Test0001().Test01();
			//new Test0001().Test02();
			//new Test0001().Test03();
			//new Test0001().Test04();
			//new Test0002().Test01();
			//new Test0003().Test01(); // AESCipher
			//new Test0004().Test01(); // RingCipher
			//new Test0004().Test02(); // RingCipher
			//new Test0005().Test01(); // FileCipher
			//new Test0006().Test01(); // HTTPClient
			//new Test0007().Test01(); // HTTPServer
			//new Test0008().Test01();
			//new Test0009().Test01(); // JapaneseDate
			//new Test0009().Test02(); // JapaneseDate
			//new Test0009().Test03(); // JapaneseDate
			//new Test0009().Test04(); // JapaneseDate
			//new Test0009().Test05(); // JapaneseDate
			//new Test0010().Test01();
			//new Test0010().Test02();
			//new Test0010().Test03();
			//new Test0011().Test01(); // Vectorダウンロード数
			//new Test0012().Test01();
			//new Test0012().Test02();
			new Test0012().Test03();

			// --
		}
	}
}
