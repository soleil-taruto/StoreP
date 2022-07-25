﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Charlotte.Commons;
using Charlotte.GameCommons;

namespace Charlotte.Games.Shots
{
	public class Shot_Normal : Shot
	{
		public Shot_Normal(double x, double y, bool facingLeft, bool facingTop)
			: base(x, y, facingLeft, facingTop, 1, false)
		{ }

		protected override IEnumerable<bool> E_Draw()
		{
			for (; ; )
			{
				this.X += 8.0 * (this.FacingLeft ? -1 : 1);

				if (DDUtils.IsOutOfCamera(new D2Point(this.X, this.Y))) // カメラから出たら消滅する。
					break;

				if (Game.I.Map.GetCell(GameCommon.ToTablePoint(this.X, this.Y)).Tile.IsWall()) // 壁に当たったら自滅する。
				{
					this.Kill();
					break;
				}

				this.Crash = DDCrashUtils.Circle(new D2Point(this.X, this.Y), 5.0);

				DDDraw.SetBright(0.0, 1.0, 0.5);
				DDDraw.DrawBegin(Ground.I.Picture.WhiteCircle, this.X - DDGround.ICamera.X, this.Y - DDGround.ICamera.Y);
				DDDraw.DrawSetSize(10.0, 10.0);
				DDDraw.DrawEnd();
				DDDraw.Reset();

				yield return true;
			}
		}
	}
}
