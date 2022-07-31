/*
	Attack - Ladder
*/

function* <generatorForTask> CreateAttack_Ladder()
{
	var<int> SHOOTING_FRAME_MAX = 15;

	var<int> shootingFrame = 0; // 0 == ����, 1�` == �ˌ����[�V���� (�J�E���g�_�E������)

	PlayerX = ToTileCenterX(PlayerX); // ��q�̒����Ɋ񂹂�B

	for (var<int> frame = 0; ; frame++)
	{
		if (GetInput_8() <= 0 && 1 <= GetInput_A()) // ? ��{�^���𗣂��āA�W�����v�{�^������
		{
			if (1 <= GetInput_2()) // ? ���{�^������ -> �W�����v���Ȃ��B
			{
				PlayerJumpFrame = 0;
				PlayerJumpCount = 0;

				PlayerYSpeed = 0.0;
			}
			else // ? ���{�^���𗣂��Ă��� -> �W�����v����B
			{
				PlayerJumpFrame = 1;
				PlayerJumpCount = 1;

				PlayerYSpeed = PLAYER_JUMP_SPEED;
			}

			// �X���C�f�B���O�����Ȃ����߂ɑ؋��Ԃɂ���B
			// -- ���͗P�\���l�����āA�傫���l��ݒ肷��B
			PlayerAirborneFrame = ToFix(IMAX / 2);

			break;
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
		//
		if (shootingFrame == 0) // �ˌ����[�V�������͈ړ��o���Ȃ��B
		{
			var<double> SPEED = 2.5;
			var<double> ACCEL_RATE = 0.5;

			var<boolean> moved = false;

			if (1 <= GetInput_8())
			{
				PlayerY -= Math.min(SPEED, GetInput_8() * ACCEL_RATE);
				moved = true;
			}
			if (1 <= GetInput_2())
			{
				PlayerY += Math.min(SPEED, GetInput_2() * ACCEL_RATE);
				moved = true;
			}

			if (moved)
			{
				// none
			}
		}

		var<boolean> shot = false;

		if (GetInput_B() == 1)
		{
			PlayerShoot();
			shot = true;
		}

		if (shot)
		{
			shootingFrame = SHOOTING_FRAME_MAX;
		}
		else
		{
			shootingFrame = CountDown(shootingFrame);
		}

//		AttackProcPlayer_Move();
//		AttackProcPlayer_Fall();
//		AttackProcPlayer_Side();
		AttackProcPlayer_Ceiling();

		if (AttackProcPlayer_Ground())
		{
			PlayerJumpFrame = 0;
			PlayerJumpCount = 0;

			PlayerYSpeed = 0.0;

			break;
		}

		// ? ��q�̉��ɏo���B
		if (
			!IsPtLadder_XY(PlayerX, PlayerY + TILE_H * 0) &&
			!IsPtLadder_XY(PlayerX, PlayerY + TILE_H * 1)
			)
		{
			PlayerJumpFrame = 0;
			PlayerJumpCount = 0;

			PlayerYSpeed = 0.0;

			break;
		}

		var<Image> picture;

		if (1 <= shootingFrame)
		{
			picture = PlayerFacingLeft ? P_PlayerMirrorClimbAttack : P_PlayerClimbAttack;
		}
		else
		{
			if (IsPtLadder_XY(PlayerX, PlayerY))
			{
				picture = P_PlayerClimb[ToFix(PlayerY / 20) % 2];
			}
			else
			{
				picture = P_PlayerClimbTop;
			}
		}

		PlayerCrash = CreateCrash_Rect(CreateD4Rect_XYWH(PlayerX, PlayerY, 20.0, 30.0));

		AddTask(PlayerDrawTasks, function* <generatorForTask> ()
		{
			Draw(picture, PlayerX - Camera.X, PlayerY - Camera.Y, 1.0, 0.0, 1.0);
		}());

		yield 1;
	}
}
