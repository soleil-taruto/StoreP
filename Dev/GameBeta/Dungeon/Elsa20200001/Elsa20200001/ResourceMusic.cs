﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Charlotte.GameCommons;

namespace Charlotte
{
	public class ResourceMusic
	{
		public DDMusic Dummy = new DDMusic(@"dat\General\muon.wav"); // ★サンプルとしてキープ

		// 例：ループ有り
		//public DDMusic AAA = new DDMusic(@"dat\AAA.mp3").SetLoopByStLength(123456, 789123); // ★サンプルとしてキープ

		public DDMusic Title = new DDMusic(@"dat\ユーフルカ\Voyage_loop.ogg").SetLoopByStLength(655565, 4860197);

		public DDMusic Field_01 = new DDMusic(@"dat\ユーフルカ\The-sacred-place_loop.ogg");

		public ResourceMusic()
		{
			//this.Dummy.Volume = 0.1; // 非推奨 // ★サンプルとしてキープ
		}
	}
}
