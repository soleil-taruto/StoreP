/*
	Attack - BDummy ���T���v��
*/

function* <generatorForTask> CreateAttack_BDummy()
{
	for (; ; )
	{
		if (1 <= PlayerDamageFrame) // ��e�����瑦�I��
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

		if (1 <= PlayerInvincibleFrame) // ? ���G���Ԓ�
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
			PrintLine("Attack - BDummy �e�X�g");

			Draw(P_Player[2][0], PlayerX - Camera.X, PlayerY - Camera.Y, 1.0, 0.0, 1.0);
		}());

		yield 1;
	}
}
