using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Charlotte.GameCommons;
using Charlotte.Commons;

namespace Charlotte.Games.Attacks.Tests
{
	public class Attack_B0001 : Attack
	{
		public override bool IsInvincibleMode()
		{
			return false;
		}

		protected override IEnumerable<bool> E_Draw()
		{
			for (; ; )
			{
				if (
					DDInput.A.GetInput() == 1 ||
					DDInput.B.GetInput() == 1
					)
					break;

				AttackCommon.ProcPlayer_移動();
				AttackCommon.ProcPlayer_Fall();

				AttackCommon.ProcPlayer_側面();
				AttackCommon.ProcPlayer_脳天();
				AttackCommon.ProcPlayer_接地();

				DDGround.EL.Add(() =>
				{
					DDPrint.SetDebug(
						(int)Game.I.Player.X - DDGround.ICamera.X - 20,
						(int)Game.I.Player.Y - DDGround.ICamera.Y - 50
						);
					DDPrint.SetBorder(new I3Color(0, 0, 192));
					DDPrint.Print("Attack_B0001 テスト");
					DDPrint.Reset();

					return false;
				});

				DDDraw.SetTaskList(Game.I.Player.Draw_EL);
				DDDraw.DrawCenter(
					Ground.I.Picture.Cirno_01,
					Game.I.Player.X - DDGround.ICamera.X,
					Game.I.Player.Y - DDGround.ICamera.Y
					);
				DDDraw.Reset();

				yield return true;
			}
		}
	}
}
