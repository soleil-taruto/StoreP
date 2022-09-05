/*
	Attack ����
*/

// �v���C���[����Z�b�g
// -- ���̕ӂ���Ƃ��Ηǂ��񂶂�Ȃ����I��
//
// AttackProcPlayer_Move();  -- �ړ�
// AttackProcPlayer_Fall();
//
// AttackProcPlayer_Side();     -- ����
// AttackProcPlayer_Ceiling();  -- �]�V
// AttackProcPlayer_Ground();   -- �ڒn
//
// AttackProcPlayer_Status();
// AttackProcPlayer_Atari();
//
// AddTask(PlayerDrawTasks, �v���C���[�`��^�X�N );
//

// ========================
// ==== �v���C���[���� ====
// ========================

/*
	�ړ�
*/
function <void> AttackProcPlayer_Move()
{
	var<double> speed;

	/*
	if (1 <= GetInput_B()) // ? �ᑬ�ړ�
	{
		speed = PLAYER_SLOW_SPEED;
	}
	else
	{
		speed = PLAYER_SPEED;
	}
	*/
	speed = PLAYER_SPEED;

	if (1 <= GetInput_4())
	{
		PlayerX -= speed;
	}
	if (1 <= GetInput_6())
	{
		PlayerX += speed;
	}
}

/*
	Fall
*/
function <void> AttackProcPlayer_Fall()
{
	if (1 <= PlayerJumpFrame) // ? �W�����v��(������)
	{
		if (GetInput_A() <= 0) // ? �W�����v�𒆒f�E�I�������B
		{
			PlayerJumpFrame = 0;

			if (PlayerYSpeed < 0.0)
			{
				PlayerYSpeed /= 2.0;
			}
		}
	}

	// �d�͂ɂ�����
	PlayerYSpeed += PLAYER_GRAVITY;

	// ���R�����̍ō����x�𒴂��Ȃ��悤�ɋ���
	PlayerYSpeed = Math.min(PlayerYSpeed, PLAYER_FALL_SPEED_MAX);

	// ���R����
	PlayerY += PlayerYSpeed;
}

// ====================================
// ==== �v���C���[����E�ڒn�n���� ====
// ====================================

function <boolean> AttackCheckPlayer_IsSide()
{
	return AttackProcPlayer_GetSide() != 0;
}

function <int> AttackCheckPlayer_GetSide()
{
	return AttackCheckPlayer_GetSide_Mode(7);
}

function <int> AttackCheckPlayer_GetSideSub()
{
	return AttackCheckPlayer_GetSide_Mode(2);
}

/*
	mode:
		1 == ���i�̂�
		2 == ���i�̂�
		3 == ���i�Ɖ��i
		4 == ��i�̂�
		5 == ��i�Ɖ��i
		6 == ��i�ƒ��i
		7 == �S��
	ret:
		0 == �ڒn���Ă��Ȃ��B
		1 == �����ɐڒn���Ă���B
		2 == �E���ɐڒn���Ă���B
		3 == ���E�����ڒn���Ă���B
*/
function <int> AttackCheckPlayer_GetSide_Mode(<int> mode)
{
	var<boolean> touchSide_L =
		((mode & 4) != 0) && IsPtWall_XY(PlayerX - PLAYER_���ʔ���Pt_X, PlayerY - PLAYER_���ʔ���Pt_YT ) ||
		((mode & 2) != 0) && IsPtWall_XY(PlayerX - PLAYER_���ʔ���Pt_X, PlayerY                        ) ||
		((mode & 1) != 0) && IsPtWall_XY(PlayerX - PLAYER_���ʔ���Pt_X, PlayerY + PLAYER_���ʔ���Pt_YB );

	var<boolean> touchSide_R =
		((mode & 4) != 0) && IsPtWall_XY(PlayerX + PLAYER_���ʔ���Pt_X, PlayerY - PLAYER_���ʔ���Pt_YT ) ||
		((mode & 2) != 0) && IsPtWall_XY(PlayerX + PLAYER_���ʔ���Pt_X, PlayerY                        ) ||
		((mode & 1) != 0) && IsPtWall_XY(PlayerX + PLAYER_���ʔ���Pt_X, PlayerY + PLAYER_���ʔ���Pt_YB );

	return (touchSide_L ? 1 : 0) | (touchSide_R ? 2 : 0);
}

function <boolean> AttackCheckPlayer_GetCeiling()
{
	var<boolean> touchCeiling_L = IsPtWall_XY(PlayerX - PLAYER_�]�V����Pt_X , PlayerY - PLAYER_�]�V����Pt_Y);
	var<boolean> touchCeiling_M = IsPtWall_XY(PlayerX                       , PlayerY - PLAYER_�]�V����Pt_Y);
	var<boolean> touchCeiling_R = IsPtWall_XY(PlayerX + PLAYER_�]�V����Pt_X , PlayerY - PLAYER_�]�V����Pt_Y);

	return (touchCeiling_L && touchCeiling_R) || touchCeiling_M;
}

function <boolean> AttackCheckPlayer_GetGround()
{
	var<boolean> touchGround =
		IsPtGround_XY(PlayerX - PLAYER_�ڒn����Pt_X, PlayerY + PLAYER_�ڒn����Pt_Y) ||
		IsPtGround_XY(PlayerX + PLAYER_�ڒn����Pt_X, PlayerY + PLAYER_�ڒn����Pt_Y);

	return touchGround;
}

// ====================================
// ==== �v���C���[����E�ڒn�n���� ====
// ====================================

function <boolean> AttackProcPlayer_Side()
{
	return AttackProcPlayer_Side_Mode(7);
}

/*
	mode:
		1 == ���i�̂�
		2 == ���i�̂�
		3 == ���i�Ɖ��i
		4 == ��i�̂�
		5 == ��i�Ɖ��i
		6 == ��i�ƒ��i
		7 == �S��
*/
function <boolean> AttackProcPlayer_Side_Mode(<int> mode)
{
	var<int> flag;

	if (mode == 7)
	{
		flag  = AttackCheckPlayer_GetSide();

		if (flag == 3) // ���E���� -> �ǔ����h�~�̂��ߍă`�F�b�N
		{
			flag = AttackCheckPlayer_GetSideSub();
		}
	}
	else
	{
		flag  = AttackCheckPlayer_GetSide_Mode(mode);
	}

	if (flag == 3) // ���E����
	{
		// noop
	}
	else if (flag == 1) // ������
	{
		PlayerX = ToTileCenterX(PlayerX - PLAYER_���ʔ���Pt_X) + TILE_W / 2.0 + PLAYER_���ʔ���Pt_X;
	}
	else if (flag == 2) // �E����
	{
		PlayerX = ToTileCenterX(PlayerX + PLAYER_���ʔ���Pt_X) - TILE_W / 2.0 - PLAYER_���ʔ���Pt_X;
	}
	else if (flag == 0) // �Ȃ�
	{
		// noop
	}
	else
	{
		error(); // never
	}
	return flag != 0;
}

function <boolean> AttackProcPlayer_Ceiling()
{
	var<boolean> ret = AttackCheckPlayer_GetCeiling();

	if (ret)
	{
		PlayerY = ToTileCenterY(PlayerY - PLAYER_�]�V����Pt_Y) + TILE_H / 2.0 + PLAYER_�]�V����Pt_Y;
		PlayerYSpeed = Math.max(0.0, PlayerYSpeed);
	}
	return ret;
}

function <boolean> AttackProcPlayer_Ground()
{
	var<boolean> ret = AttackCheckPlayer_GetGround();

	if (ret)
	{
		PlayerY = ToTileCenterY(PlayerY + PLAYER_�ڒn����Pt_Y) - TILE_H / 2.0 - PLAYER_�ڒn����Pt_Y;
		PlayerYSpeed = Math.min(0.0, PlayerYSpeed);
	}
	return ret;
}

// ================================
// ==== �v���C���[����E���̑� ====
// ================================

function <void> AttackProcPlayer_Status()
{
	if (1 <= PlayerDamageFrame && PLAYER_DAMAGE_FRAME_MAX < ++PlayerDamageFrame)
	{
		PlayerDamageFrame = 0;
		PlayerInvincibleFrame = 1;
	}
	if (1 <= PlayerInvincibleFrame && PLAYER_INVINCIBLE_FRAME_MAX < ++PlayerInvincibleFrame)
	{
		PlayerInvincibleFrame = 0;
	}
}

function <void> AttackProcPlayer_Atari()
{
	PlayerCrash = CreateCrash_Circle(
		PlayerX,
		PlayerY,
		10.0
		);
}

// =====================================
// ==== �v���C���[����n (�����܂�) ====
// =====================================