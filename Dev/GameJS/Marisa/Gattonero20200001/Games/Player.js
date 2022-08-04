/*
	�v���C���[���
*/

/*
	�v���C���[�̗�
	-1 == ���S
	0 == (�s�g�p�E�\��)
	1�` == �c��̗�
*/
var<int> PlayerHP = PLAYER_HP_MAX;

/*
	�v���C���[�̈ʒu
*/
var<double> PlayerX = 0.0;
var<double> PlayerY = 0.0;

/*
	�v���C���[�E�_���[�W�E�t���[��
	0 == ����
	1�` == �_���[�W��
*/
var<int> PlayerDamageFrame = 0;

/*
	�v���C���[���G���ԃt���[��
	0 == ����
	1�` == ���G���Ԓ�
*/
var<int> PlayerInvincibleFrame = 0;

/*
	�v���C���[�������Ă������(8����_�e���L�[����)
*/
var<int> PlayerFaceDirection = 2;

/*
	���t���[���̓����蔻��, null == �����蔻�薳��
*/
var<Crash_t> PlayerCrash = null;

/*
	�v���C���[�ړ��t���[��
	0 == ����
	1�` == �ړ���
*/
var<int> PlayerMoveFrame = 0;

/*
	�v���C���[�U���t���[��
	0 == ����
	1�` == �U����
*/
var<int> PlayerAttackFrame = 0;

function <void> ResetPlayer()
{
	PlayerHP = PLAYER_HP_MAX;
	PlayerX = Screen_W / 2.0;
	PlayerY = Screen_H / 2.0;
	PlayerDamageFrame = 0;
	PlayerInvincibleFrame = 0;
	PlayerFaceDirection = 2;
	PlayerCrash = null;
	PlayerMoveFrame = 0;
	PlayerAttackFrame = 0;
}

/*
	�s��
	�������ׂ����ƁF
	-- �s��
	-- �����蔻��̐ݒu
*/
function <void> ActPlayer()
{
	// reset
	{
		PlayerCrash = null;
	}

	if (DEBUG && GetKeyInput(84) == 1) // ? T ���� -> �U���e�X�g
	{
		PlayerAttack = Supplier(CreateAttack_BDummy());
		return; // HACK: ���̃t���[���̂ݓ����蔻�薳����� -- 1�t���[���Ȃ̂Ŋŉ߂���B�l�q�� @ 2022.7.31
	}

	// ����
	{
		var<boolean> damageOrUID = 1 <= PlayerDamageFrame || UserInputDisabled;
		var<boolean> dir2 = false;
		var<boolean> dir4 = false;
		var<boolean> dir6 = false;
		var<boolean> dir8 = false;
		var<boolean> slow = false;
		var<boolean> attack = false;

		if (!damageOrUID && 1 <= GetInput_2())
		{
			dir2 = true;
		}
		if (!damageOrUID && 1 <= GetInput_4())
		{
			dir4 = true;
		}
		if (!damageOrUID && 1 <= GetInput_6())
		{
			dir6 = true;
		}
		if (!damageOrUID && 1 <= GetInput_8())
		{
			dir8 = true;
		}
		if (!damageOrUID && 1 <= GetInput_B())
		{
			slow = true;
		}
		if (!damageOrUID && 1 <= GetInput_A())
		{
			attack = true;
		}

		var<int> dir; // �ړ����� { 1 �` 4, 6 �` 9 } == 8����_�e���L�[����, 5 == �ړ����Ă��Ȃ��B

		if (dir2 && dir4)
		{
			dir = 1;
		}
		else if (dir2 && dir6)
		{
			dir = 3;
		}
		else if (dir4 && dir8)
		{
			dir = 7;
		}
		else if (dir6 && dir8)
		{
			dir = 9;
		}
		else if (dir2)
		{
			dir = 2;
		}
		else if (dir4)
		{
			dir = 4;
		}
		else if (dir6)
		{
			dir = 6;
		}
		else if (dir8)
		{
			dir = 8;
		}
		else
		{
			dir = 5;
		}

		var<double> speed = PLAYER_SPEED;

		if (slow)
		{
			speed = PLAYER_SLOW_SPEED;
		}

		var<double> nanameSpeed = speed / Math.SQRT2;

		switch (dir)
		{
		case 4: PlayerX -= speed; break;
		case 6: PlayerX += speed; break;
		case 8: PlayerY -= speed; break;
		case 2: PlayerY += speed; break;

		case 1:
			PlayerX -= nanameSpeed;
			PlayerY += nanameSpeed;
			break;

		case 3:
			PlayerX += nanameSpeed;
			PlayerY += nanameSpeed;
			break;

		case 7:
			PlayerX -= nanameSpeed;
			PlayerY -= nanameSpeed;
			break;

		case 9:
			PlayerX += nanameSpeed;
			PlayerY -= nanameSpeed;
			break;

		case 5:
			break;

		default:
			error(); // never
		}

		if (dir != 5 && !slow && !attack)
		{
			PlayerFaceDirection = dir;
		}

		if (dir != 5)
		{
			PlayerMoveFrame++;
		}
		else
		{
			PlayerMoveFrame = 0;
		}

		if (PlayerMoveFrame == 0) // �����~�܂�������W�𐮐��ɋ���
		{
			PlayerX = ToInt(PlayerX);
			PlayerY = ToInt(PlayerY);
		}

		if (attack)
		{
			PlayerAttackFrame++;
		}
		else
		{
			PlayerAttackFrame = 0;
		}
	}

damageBlock:
	if (1 <= PlayerDamageFrame) // ? �_���[�W��
	{
		if (PLAYER_DAMAGE_FRAME_MAX < ++PlayerDamageFrame)
		{
			PlayerDamageFrame = 0;
			PlayerInvincibleFrame = 1;
			break damageBlock;
		}
		var<int> frame = PlayerDamageFrame; // �l�� == 2 �` PLAYER_DAMAGE_FRAME_MAX
		var<double> rate = RateAToB(2, PLAYER_DAMAGE_FRAME_MAX, frame);

		// �_���[�W���̏���
		{
			if (frame == 2) // ����̂�
			{
				SE(S_Damaged);
			}

			D2Point_t speed = GetXYSpeed(PlayerFaceDirection, 5.0) * -1.0;

			for (var<int> c = 0; c < 5; c++)
			{
				if (IsPtWall_XY(PlayerX, PlayerY)) // ? ���s�\�ȏꏊ�ł͂Ȃ� -> ����ȏ�q�b�g�o�b�N�����Ȃ��B
				{
					break;
				}

				PlayerX += speed.X;
				PlayerY += speed.Y;
			}
		}
	}

invincibleBlock:
	if (1 <= PlayerInvincibleFrame) // ? ���G���Ԓ�
	{
		if (PLAYER_INVINCIBLE_FRAME_MAX < ++PlayerInvincibleFrame)
		{
			PlayerInvincibleFrame = 0;
			break invincibleBlock;
		}
		var<int> frame = PlayerInvincibleFrame; // �l�� == 2 �` PLAYER_INVINCIBLE_FRAME_MAX
		var<double> rate = RateAToB(2, PLAYER_INVINCIBLE_FRAME_MAX, frame);

		// ���K���Ԓ��̏���
		{
			// none
		}
	}

	// �ړ� -> ���͂Ɠ����ɍs���Ă���B

	// �ʒu����
	{
		var<double> ATARI_R = 10.0; // �ǂƂ̓����蔻��E���a

		var<double> NANAME_ATARI_SPAN = ATARI_R / Math.SQRT2;
		var<double> SHIFT_SPAN = 0.333;
		var<int> SHIFT_MAX = 100;

		var<boolean> touch_4 = IsPtWall_XY(PlayerX - ATARI_R , PlayerY           );
		var<boolean> touch_6 = IsPtWall_XY(PlayerX + ATARI_R , PlayerY           );
		var<boolean> touch_8 = IsPtWall_XY(PlayerX           , PlayerY - ATARI_R );
		var<boolean> touch_2 = IsPtWall_XY(PlayerX           , PlayerY + ATARI_R );

		var<boolean> touch_1 = IsPtWall_XY(PlayerX - NANAME_ATARI_SPAN, PlayerY + NANAME_ATARI_SPAN);
		var<boolean> touch_3 = IsPtWall_XY(PlayerX + NANAME_ATARI_SPAN, PlayerY + NANAME_ATARI_SPAN);
		var<boolean> touch_7 = IsPtWall_XY(PlayerX - NANAME_ATARI_SPAN, PlayerY - NANAME_ATARI_SPAN);
		var<boolean> touch_9 = IsPtWall_XY(PlayerX + NANAME_ATARI_SPAN, PlayerY - NANAME_ATARI_SPAN);

		if (
			touch_4 ||
			touch_6 ||
			touch_8 ||
			touch_2 ||

			touch_1 ||
			touch_3 ||
			touch_7 ||
			touch_9
			)
		{
			PlayerX = ToInt(PlayerX);
			PlayerY = ToInt(PlayerY);

			for (var<int> sftCnt = 0; sftCnt < SHIFT_MAX; sftCnt++)
			{
				touch_4 = IsPtWall_XY(PlayerX - ATARI_R , PlayerY           );
				touch_6 = IsPtWall_XY(PlayerX + ATARI_R , PlayerY           );
				touch_8 = IsPtWall_XY(PlayerX           , PlayerY - ATARI_R );
				touch_2 = IsPtWall_XY(PlayerX           , PlayerY + ATARI_R );

				if (
					touch_4 ||
					touch_6 ||
					touch_8 ||
					touch_2
					)
				{
					// noop
				}
				else
				{
					break;
				}

				if (touch_4)
				{
					PlayerX += SHFIT_SPAN;
				}
				if (touch_6)
				{
					PlayerX -= SHFIT_SPAN;
				}
				if (touch_8)
				{
					PlayerY += SHFIT_SPAN;
				}
				if (touch_2)
				{
					PlayerY -= SHFIT_SPAN;
				}
			}

			for (var<int> sftCnt = 0; sftCnt < SHIFT_MAX; sftCnt++)
			{
				touch_1 = IsPtWall_XY(PlayerX - NANAME_ATARI_SPAN, PlayerY + NANAME_ATARI_SPAN);
				touch_3 = IsPtWall_XY(PlayerX + NANAME_ATARI_SPAN, PlayerY + NANAME_ATARI_SPAN);
				touch_7 = IsPtWall_XY(PlayerX - NANAME_ATARI_SPAN, PlayerY - NANAME_ATARI_SPAN);
				touch_9 = IsPtWall_XY(PlayerX + NANAME_ATARI_SPAN, PlayerY - NANAME_ATARI_SPAN);

				if (
					touch_1 ||
					touch_3 ||
					touch_7 ||
					touch_9
					)
				{
					// noop
				}
				else
				{
					break;
				}

				// �ǂ��甲���o�������Ȃ̂� NANAME_SHIFT_SPAN �͎g��Ȃ���I

				if (touch_1)
				{
					PlayerX += SHFIT_SPAN;
					PlayerY -= SHFIT_SPAN;
				}
				if (touch_3)
				{
					PlayerX -= SHFIT_SPAN;
					PlayerY -= SHFIT_SPAN;
				}
				if (touch_7)
				{
					PlayerX += SHFIT_SPAN;
					PlayerY += SHFIT_SPAN;
				}
				if (touch_9)
				{
					PlayerX -= SHFIT_SPAN;
					PlayerY += SHFIT_SPAN;
				}
			}

			PlayerX = ToInt(PlayerX);
			PlayerY = ToInt(PlayerY);
		}
	}

	// �U��
	{
		if (1 <= PlayerAttackFrame && ProcFrame % 4 == 0)
		{
			GetShots().push(CreateShot_Normal(PlayerX, PlayerY, PlayerFaceDirection));

			SE(S_Shoot);
		}
	}

	// �����蔻����Z�b�g����B
	// -- �_���[�W���E���G���Ԓ��� null (�����蔻�薳��) ���Z�b�g���邱�ƁB

	PlayerCrash = null; // reset

	if (1 <= PlayerDamageFrame) // ? �_���[�W��
	{
		// noop
	}
	else if (1 <= PlayerInvincibleFrame) // ? ���G���Ԓ�
	{
		// noop
	}
	else
	{
		PlayerCrash = CreateCrash_Circle(PlayerX, PlayerY, 10.0);
	}
}

/*
	�`��
	�������ׂ����ƁF
	-- �`��
*/
function <void> DrawPlayer()
{
	var<double> plA = 1.0;
	var<Picture_t> picture = P_Dummy;

	if (
		1 <= PlayerDamageFrame ||
		1 <= PlayerInvincibleFrame
		)
	{
		plA = 0.5;
	}

	var<int> koma = 0;

	if (1 <= PlayerMoveFrame)
	{
		koma = ToFix(PlayerDamageFrame / 5) % 4;
	}

	var<Picture_t> picture = P_Player[PlayerFaceDirection][koma];

	Draw(picture, PlayerX - Camera.X, PlayerY - Camera.Y, plA, 0.0, 1.0);
}
