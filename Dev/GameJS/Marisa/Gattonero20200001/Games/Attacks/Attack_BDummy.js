/*
	Attack - BDummy ★サンプル
*/

function* <generatorForTask> CreateAttack_BDummy()
{
	for (; ; )
	{
		if (1 <= PlayerDamageFrame) // 被弾したら即終了
		{
			break;
		}

		if (
			GetInput_A() == 1 ||
			GetInput_B() == 1
			)
		{
			break;
		}

		AttackProcPlayer_Move();
		AttackProcPlayer_WallProc();
		AttackProcPlayer_Status();

		if (1 <= PlayerInvincibleFrame) // ? 無敵時間中
		{
			// noop
		}
		else
		{
			AttackProcPlayer_Atari();
		}

		AddTask(PlayerDrawTasks, function* <generatorForTask> ()
		{
			SetPrint(PlayerX - Camera.X - 90, PlayerY - Camera.Y - 40, 0);
			SetColor("#ff00ff");
			SetFSize(16);
			PrintLine("Attack - BDummy テスト");

			Draw(P_Player[2][0], PlayerX - Camera.X, PlayerY - Camera.Y, 1.0, 0.0, 1.0);
		}());

		yield 1;
	}
}
