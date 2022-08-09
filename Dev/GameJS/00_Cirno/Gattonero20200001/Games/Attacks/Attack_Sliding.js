/*
	Attack - Sliding
*/

function* <generatorForTask> CreateAttack_Sliding()
{
	AddEffect(Effect_Sliding(PlayerX, PlayerY + 20.0));

	for (var<int> frame = 0; ; frame++)
	{
		if (10 < frame) // ? �Œ᎝�����Ԍo��
		{
			if (AttackCheckPlayer_GetSide_Mode(4) != 3) // ? �����͗����オ���ꏊ�ł���B
			{
				if (GetInput_A() <= 0 || GetInput_2() <= 0) // ? ���E�W�����v�{�^�����Ȃ��Ƃ��ǂ��炩�𗣂��Ă���B
				{
					break;
				}
			}
		}

		if (AttackCheckPlayer_GetSide_Mode(2) != 0) // ? �ǂɓ������Ă���B
		{
			if (AttackCheckPlayer_GetSide_Mode(4) != 3) // ? �����͗����オ���ꏊ�ł���B
			{
				if (GetInput_A() == 1) // ? �W�����v�{�^�����������B
				{
					break;
				}
			}
		}

		if (1 <= GetInput_4())
		{
			PlayerFacingLeft = true;
		}
		if (1 <= GetInput_6())
		{
			PlayerFacingLeft = false;
		}

		// �ړ�
		{
			var<double> SPEED = 10.0;

			if (PlayerFacingLeft)
			{
				PlayerX -= SPEED;
			}
			else
			{
				PlayerX += SPEED;
			}
		}

//		AttackProcPlayer_Move(); // �s�v
		AttackProcPlayer_Fall();
		AttackProcPlayer_Side_Mode(2);
		AttackProcPlayer_Ceiling();

		if (!AttackProcPlayer_Ground())
		{
//			PlayerAirborneFrame = 1; // �R�̕��ɗ����Ă��܂�Ȃ��悤�ɑ؋��Ԃɂ���B
			PlayerAirborneFrame = ToFix(IMAX / 2); // �W�����v���Ă��܂�Ȃ��悤�ɏ\���傫�Ȓl���Z�b�g����B
			break;
		}

		AttackProcPlayer_Status();

		var<double> plA = 1.0;

		if (1 <= PlayerInvincibleFrame) // ? ���G���Ԓ�
		{
			plA = 0.5;
		}
		else
		{
			PlayerCrash = CreateCrash_Circle(
				PlayerX,
				PlayerY + 10.0,
				10.0
				);
		}

		AddTask(PlayerDrawTasks, function* <generatorForTask> ()
		{
			Draw(
				PlayerFacingLeft ? P_PlayerMirrorSliding : P_PlayerSliding,
				PlayerX - Camera.X,
				PlayerY - Camera.Y,
				plA,
				0.0,
				1.0
				);
		}());

		yield 1;
	}
}
