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
		AttackProcPlayer_Fall();

		AttackProcPlayer_Side();
		AttackProcPlayer_Ceiling();
		AttackProcPlayer_Ground();

		AttackProcPlayer_Status();

		var<double> plA = 1.0;

		if (1 <= PlayerInvincibleFrame) // ? ���G���Ԓ�
		{
			plA = 0.5;
		}
		else
		{
			AttackProcPlayer_Atari();
		}

		AddTask(PlayerDrawTasks, function* <generatorForTask> ()
		{
			SetPrint(PlayerX - Camera.X - 90, PlayerY - Camera.Y - 40, 0);
			SetColor("#ffffff");
			SetFSize(16);
			PrintLine("Attack - BDummy �e�X�g");

			Draw(P_PlayerStand, PlayerX - Camera.X, PlayerY - Camera.Y, plA, 0.0, 1.0);
		}());

		yield 1;
	}
}
