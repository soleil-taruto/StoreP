﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Charlotte.Commons;
using Charlotte.GameCommons;

namespace Charlotte.Games.Shots
{
	public static class ShotCommon
	{
		public static void Killed(Shot shot)
		{
			DDGround.EL.Add(SCommon.Supplier(Effects.小爆発(shot.X, shot.Y)));
		}
	}
}
