﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Charlotte.GameCommons;

namespace Charlotte.GameTools
{
	/// <summary>
	/// このアプリ固有の設定
	/// </summary>
	public static class AppConfig
	{
		/// <summary>
		/// このゲームにおいて設定可能なボタンリストを返す。
		/// </summary>
		/// <returns>ボタンリスト</returns>
		public static SimpleMenu.ButtonInfo[] GetSimpleMenuButtonInfos()
		{
			SimpleMenu.ButtonInfo[] btnInfos = new SimpleMenu.ButtonInfo[]
			{
#if false // 例
				new SimpleMenu.ButtonInfo(DDInput.DIR_2, "下"),
				new SimpleMenu.ButtonInfo(DDInput.DIR_4, "左"),
				new SimpleMenu.ButtonInfo(DDInput.DIR_6, "右"),
				new SimpleMenu.ButtonInfo(DDInput.DIR_8, "上"),
				new SimpleMenu.ButtonInfo(DDInput.A, "Ａボタン"),
				new SimpleMenu.ButtonInfo(DDInput.B, "Ｂボタン"),
				new SimpleMenu.ButtonInfo(DDInput.C, "Ｃボタン"),
				//new SimpleMenu.ButtonInfo(DDInput.D, ""), // 使用しないボタン
				//new SimpleMenu.ButtonInfo(DDInput.E, ""), // 使用しないボタン
				//new SimpleMenu.ButtonInfo(DDInput.F, ""), // 使用しないボタン
				new SimpleMenu.ButtonInfo(DDInput.L, "Ｌボタン"),
				new SimpleMenu.ButtonInfo(DDInput.R, "Ｒボタン"),
				//new SimpleMenu.ButtonInfo(DDInput.PAUSE, ""), // 使用しないボタン
				//new SimpleMenu.ButtonInfo(DDInput.START, ""), // 使用しないボタン
#else
				// アプリ固有の設定 >

				new SimpleMenu.ButtonInfo(DDInput.DIR_8, "上"),
				new SimpleMenu.ButtonInfo(DDInput.DIR_2, "下"),
				new SimpleMenu.ButtonInfo(DDInput.DIR_4, "左"),
				new SimpleMenu.ButtonInfo(DDInput.DIR_6, "右"),
				new SimpleMenu.ButtonInfo(DDInput.A, "低速／決定"),
				new SimpleMenu.ButtonInfo(DDInput.B, "ショット／キャンセル"),
				new SimpleMenu.ButtonInfo(DDInput.C, "速度を下げる"),
				new SimpleMenu.ButtonInfo(DDInput.D, "速度を上げる"),
				new SimpleMenu.ButtonInfo(DDInput.E, "ボム"),
				//new SimpleMenu.ButtonInfo(DDInput.F, ""),
				new SimpleMenu.ButtonInfo(DDInput.L, "会話スキップ"),
				new SimpleMenu.ButtonInfo(DDInput.R, "当たり判定表示(チート)"),
				new SimpleMenu.ButtonInfo(DDInput.PAUSE, "ポーズボタン"),
				//new SimpleMenu.ButtonInfo(DDInput.START, ""),

				// < アプリ固有の設定
#endif
			};

			return btnInfos;
		}
	}
}
