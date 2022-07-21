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
	var<boolean> touchSide_L =
		GetMapCell(ToTablePoint_XY(PlayerX - PLAYER_���ʔ���Pt_X, PlayerY - PLAYER_���ʔ���Pt_YT )).Tile.WallFlag ||
		GetMapCell(ToTablePoint_XY(PlayerX - PLAYER_���ʔ���Pt_X, PlayerY                        )).Tile.WallFlag ||
		GetMapCell(ToTablePoint_XY(PlayerX - PLAYER_���ʔ���Pt_X, PlayerY + PLAYER_���ʔ���Pt_YB )).Tile.WallFlag;

	var<boolean> touchSide_R =
		GetMapCell(ToTablePoint_XY(PlayerX + PLAYER_���ʔ���Pt_X, PlayerY - PLAYER_���ʔ���Pt_YT )).Tile.WallFlag ||
		GetMapCell(ToTablePoint_XY(PlayerX + PLAYER_���ʔ���Pt_X, PlayerY                        )).Tile.WallFlag ||
		GetMapCell(ToTablePoint_XY(PlayerX + PLAYER_���ʔ���Pt_X, PlayerY + PLAYER_���ʔ���Pt_YB )).Tile.WallFlag;

	return (touchSide_L ? 1 : 0) | (touchSide_R ? 2 : 0);
}

function <int> AttackCheckPlayer_GetSideSub()
{
	var<boolean> touchSide_L = GetMapCell(ToTablePoint_XY(PlayerX - PLAYER_���ʔ���Pt_X, PlayerY)).Tile.WallFlag;
	var<boolean> touchSide_R = GetMapCell(ToTablePoint_XY(PlayerX + PLAYER_���ʔ���Pt_X, PlayerY)).Tile.WallFlag;

	return (touchSide_L ? 1 : 0) | (touchSide_R ? 2 : 0);
}

function <int> AttackCheckPlayer_GetCeiling()
{
	var<boolean> touchCeiling_L = GetMapCell(ToTablePoint_XY(PlayerX - PLAYER_�]�V����Pt_X , PlayerY - PLAYER_�]�V����Pt_Y)).Tile.WallFlag;
	var<boolean> touchCeiling_M = GetMapCell(ToTablePoint_XY(PlayerX                       , PlayerY - PLAYER_�]�V����Pt_Y)).Tile.WallFlag;
	var<boolean> touchCeiling_R = GetMapCell(ToTablePoint_XY(PlayerX + PLAYER_�]�V����Pt_X , PlayerY - PLAYER_�]�V����Pt_Y)).Tile.WallFlag;
}

function <int> AttackCheckPlayer_GetGround()
{
	var<boolean> touchGround =
		GetMapCell(ToTablePoint_XY(PlayerX - PLAYER_�ڒn����Pt_X, PlayerY + PLAYER_�ڒn����Pt_Y)).Tile.WallFlag ||
		GetMapCell(ToTablePoint_XY(PlayerX + PLAYER_�ڒn����Pt_X, PlayerY + PLAYER_�ڒn����Pt_Y)).Tile.WallFlag;

	return touchGround;
}

// ====================================
// ==== �v���C���[����E�ڒn�n���� ====
// ====================================

function <void> AttackProcPlayer_Side()
{
	var<int> flag = AttackCheckPlayer_GetSide();

	if (flag == 3) // ���E���� -> �ǔ����h�~�̂��ߍă`�F�b�N
	{
		flag = AttackCheckPlayer_GetSideSub();
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

function <void> AttackProcPlayer_Ceiling()
{
	var<boolean> ret = AttackCheckPlayer_GetCeiling();

	if (ret)
	{
		PlayerY = ToTileCenterY(PlayerY - PLAYER_�]�V����Pt_Y) + TILE_H / 2 + PLAYER_�]�V����Pt_Y;
		PlayerYSpeed = Math.Max(0.0, PlayerYSpeed);
	}
	return ret;
}

function <void> AttackProcPlayer_Ground()
{
	var<boolean> ret = AttackCheckPlayer_GetGround();

	if (ret)
	{
		PlayerY = ToTileCenterY(PlayerY + PLAYER_�ڒn����Pt_Y) - TILE_H / 2.0 - PLAYER_�ڒn����Pt_Y;
		PlayerYSpeed = Math.Min(0.0, PlayerYSpeed);
	}
	return ret;
}

// =====================================
// ==== �v���C���[����n (�����܂�) ====
// =====================================
