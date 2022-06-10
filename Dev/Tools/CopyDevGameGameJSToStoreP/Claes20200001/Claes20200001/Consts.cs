﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Charlotte
{
	public static class Consts
	{
		/// <summary>
		/// 入力ルートDIR
		/// </summary>
		public const string R_ROOT_DIR = @"C:\Dev";

		/// <summary>
		/// 出力ルートDIR
		/// </summary>
		public const string W_ROOT_DIR = @"C:\home\GitHub\StoreP\Dev";

		/// <summary>
		/// ソースDIRのローカル名
		/// </summary>
		public static readonly string[] SRC_LOCAL_DIRS = new string[]
		{
			"Elsa20200001", // Game
			"Claes20200001", // CUI
			"Silvia20200001", // GUI
			"Gattonero20200001", // GameJS
		};
	}
}
