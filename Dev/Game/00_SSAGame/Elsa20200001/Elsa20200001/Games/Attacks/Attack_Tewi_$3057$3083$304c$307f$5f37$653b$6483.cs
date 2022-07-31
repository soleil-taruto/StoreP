﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Charlotte.Commons;
using Charlotte.GameCommons;
using Charlotte.Games.Shots;

namespace Charlotte.Games.Attacks
{
	public class Attack_Tewi_しゃがみ強攻撃 : Attack
	{
		protected override IEnumerable<bool> E_Draw()
		{
			int zureX = 0;
			int zureY = -16;

			for (int frame = 0; ; frame++)
			{
				//int FRAME_PER_KOMA = 1;
				//int FRAME_PER_KOMA = 2;
				int FRAME_PER_KOMA = 3;

				int koma = frame / FRAME_PER_KOMA;

				if (Ground.I.Picture2.Tewi_しゃがみ強攻撃.Length <= koma)
					break;

				if (frame == 5 * FRAME_PER_KOMA)
				{
					Game.I.Player.X += 54 * (Game.I.Player.FacingLeft ? -1.0 : 1.0);
					zureX = 16;
				}

				double x = Game.I.Player.X + zureX * (Game.I.Player.FacingLeft ? -1.0 : 1.0);
				double y = Game.I.Player.Y + zureY;
				double xZoom = Game.I.Player.FacingLeft ? -1.0 : 1.0;
				bool facingLeft = Game.I.Player.FacingLeft;

				if (frame == 6 * FRAME_PER_KOMA)
				{
					Game.I.Shots.Add(new Shot_OneTime(
						30,
						DDCrashUtils.Rect(D4Rect.XYWH(
							Game.I.Player.X + 10.0 * (Game.I.Player.FacingLeft ? -1.0 : 1.0),
							Game.I.Player.Y,
							200.0,
							120.0
							))
						));
				}

				AttackCommon.ProcPlayer_Status();

				double plA = 1.0;

				if (1 <= Game.I.Player.InvincibleFrame)
				{
					plA = 0.5;
				}
				else
				{
					AttackCommon.ProcPlayer_当たり判定();
				}

				DDDraw.SetTaskList(Game.I.Player.Draw_EL);
				DDDraw.SetAlpha(plA);
				DDDraw.DrawBegin(
					Ground.I.Picture2.Tewi_しゃがみ強攻撃[koma],
					x - DDGround.ICamera.X,
					y - DDGround.ICamera.Y
				);
				DDDraw.DrawZoom_X(xZoom);
				DDDraw.DrawEnd();
				DDDraw.Reset();

				yield return true;
			}
		}
	}
}
