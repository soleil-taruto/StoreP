/*
	�v���C���[���
*/

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
	�v���C���[�̐��������̑��x
*/
var<double> PlayerYSpeed = 0.0;

/*
	�v���C���[�����������Ă��邩
*/
var<boolean> PlayerFacingLeft = false;

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
	�v���C���[�E�W�����v�E�J�E���^
	0 == ����
	1�` == �W�����v�����
*/
var<int> PlayerJumpCount = 0;

/*
	�v���C���[�E�W�����v�E�t���[��
	0 == ����
	1�` == �W�����v��
*/
var<int> PlayerJumpFrame = 0;

/*
	�v���C���[�؋�t���[��
	0 == ����
	1�` == �؋�
*/
var<int> PlayerAirborneFrame = 0;

/*
	�v���C���[���Ⴊ�݃t���[��
	0 == ����
	1�` == ���Ⴊ�ݒ�
*/
var<int> PlayerShagamiFrame = 0;

var<boolean> @@_JumpLock = false;
var<boolean> @@_MoveSlow = false;

function <void> ResetPlayer()
{
	PlayerX = Screen_W / 2.0;
	PlayerY = Screen_H / 2.0;
	PlayerDamageFrame = 0;
	PlayerInvincibleFrame = 0;
	PlayerYSpeed = 0.0;
	PlayerFacingLeft = false;
	PlayerCrash = null;
	PlayerMoveFrame = 0;
	PlayerJumpCount = 0;
	PlayerJumpFrame = 0;
	PlayerAirborneFrame = IMAX / 2; // �Q�[���J�n����ɋ󒆂ŃW�����v�ł��Ȃ��悤��
	PlayerShagamiFrame = 0;
	@@_JumpLock = false;
	@@_MoveSlow = false;
}

/*
	�s���ƕ`��
	�������ׂ����ƁF
	-- �s��
	-- �����蔻��̐ݒu
	-- �`��
*/
function <void> DrawPlayer()
{
	// �ړ�
	{
		var<boolean> move = false;
		var<boolean> slow = false;
		var<int> jump = 0;
		var<boolean> shagami = false;

		if (1 <= GetInput_2())
		{
			shagami = true;
		}
		if (1 <= GetInput_4())
		{
			PlayerFacingLeft = true;
			move = true;
		}
		if (1 <= GetInput_6())
		{
			PlayerFacingLeft = false;
			move = true;
		}

		if (1 <= GetInput_B())
		{
			slow = true;
		}
		if (1 <= GetInput_A())
		{
			jump = GetInput_A();
		}

		if (move)
		{
			PlayerMoveFrame++;
			shagami = false;
		}
		else
		{
			PlayerMoveFrame = 0;
		}

		@@_MoveSlow = move && slow;

		if (jump == 0)
		{
			@@_JumpLock = false;
		}

		if (1 <= PlayerJumpFrame) // ? �W�����v��
		{
			var<int> JUMP_FRAME_MAX = 13;

			if (1 <= jump && PlayerJumpFrame < JUMP_FRAME_MAX)
			{
				PlayerJumpFrame++;
			}
			else
			{
				PlayerJumpFrame = 0;
			}
		}
		else // ? �ڒn�� || �؋�
		{
			// ���O���� == ���n�O�̐��t���[���ԂɃW�����v�{�^���������n�߂Ă��W�����v�ł���悤�ɂ���B
			// ���͗P�\ == ����(�n�ʂ��痣�ꂽ)����̐��t���[���ԂɃW�����v�{�^���������n�߂Ă��W�����v�ł���悤�ɂ���B

			var<int> ���O���͎��� = 10;
			var<int> ���͗P�\���� = 5;

			if (1 <= jump && jump < ���O���͎��� && PlayerAirborneFrame < ���͗P�\���� && PlayerJumpCount == 0 && !@@_JumpLock)
			{
				PlayerJumpCount = 1;
				PlayerJumpFrame = 1;
				@@_JumpLock = true;
			}
		}

		if (PlayerJumpFrame == 1) // ? �W�����v�J�n
		{
			SE(S_Jump);
		}

		if (1 <= PlayerAirborneFrame)
		{
			shagami = false;
		}

		if (shagami)
		{
			PlayerShagamiFrame++;
		}
		else
		{
			PlayerShagamiFrame = 0;
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
			double rate = RateAToB(2, PLAYER_DAMAGE_FRAME_MAX, frame);

			// �_���[�W���̏���
			{
				// TODO ???
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
			double rate = RateAToB(2, PLAYER_INVINCIBLE_FRAME_MAX, frame);

			// �_���[�W���̏���
			{
				// none
			}
		}

		if (1 <= PlayerMoveFrame) // ? �ړ���
		{
			var<double> speed = 0.0;

			if (@@_MoveSlow)
			{
				speed = PlayerMoveFrame * 0.2;
				speed = Math.min(speed, PLAYER_SLOW_SPEED);
			}
			else
			{
				speed = PLAYER_SPEED;
			}
			speed *= PlayerFacingLeft ? -1.0 : 1.0;

			PlayerX += speed;
		}
		else
		{
			PlayerX = ToInt(PlayerX);
		}

		if (1 <= PlayerJumpFrame)
		{
			PlayerYSpeed = PLAYER_JUMP_SPEED;
		}
		else
		{
			PlayerYSpeed += PLAYER_GRAVITY;
		}

		PlayerYSpeed = Math.min(PlayerYSpeed, PLAYER_FALL_SPEED_MAX);

		PlayerY += PlayerYSpeed;
	}

	// �ʒu����
	{
		var<boolean> touchSide_L =
			GetMapCell(ToTablePoint_XY(PlayerX - PLAYER_���ʔ���Pt_X, PlayerY - PLAYER_���ʔ���Pt_Y )).WallFlag ||
			GetMapCell(ToTablePoint_XY(PlayerX - PLAYER_���ʔ���Pt_X, PlayerY                       )).WallFlag ||
			GetMapCell(ToTablePoint_XY(PlayerX - PLAYER_���ʔ���Pt_X, PlayerY + PLAYER_���ʔ���Pt_Y )).WallFlag;

		var<boolean> touchSide_R =
			GetMapCell(ToTablePoint_XY(PlayerX + PLAYER_���ʔ���Pt_X, PlayerY - PLAYER_���ʔ���Pt_Y )).WallFlag ||
			GetMapCell(ToTablePoint_XY(PlayerX + PLAYER_���ʔ���Pt_X, PlayerY                       )).WallFlag ||
			GetMapCell(ToTablePoint_XY(PlayerX + PLAYER_���ʔ���Pt_X, PlayerY + PLAYER_���ʔ���Pt_Y )).WallFlag;

		if (touchSide_L && touchSide_R) // -> �ǔ����h�~�̂��ߍă`�F�b�N
		{
			touchSide_L = GetMapCell(ToTablePoint_XY(PlayerX - PLAYER_���ʔ���Pt_X, PlayerY)).WallFlag;
			touchSide_R = GetMapCell(ToTablePoint_XY(PlayerX + PLAYER_���ʔ���Pt_X, PlayerY)).WallFlag;
		}

		if (touchSide_L && touchSide_R)
		{
			// noop
		}
		else if (touchSide_L)
		{
			PlayerX = ToTileCenterX(PlayerX - PLAYER_���ʔ���Pt_X) + TILE_W / 2.0 + PLAYER_���ʔ���Pt_X;
		}
		else if (touchSide_R)
		{
			PlayerX = ToTileCenterX(PlayerX + PLAYER_���ʔ���Pt_X) - TILE_W / 2.0 - PLAYER_���ʔ���Pt_X;
		}

		var<boolean> touchCeiling_L = GetMapCell(ToTablePoint_XY(PlayerX - PLAYER_�]�V����Pt_X , PlayerY - PLAYER_�]�V����Pt_Y)).WallFlag;
		var<boolean> touchCeiling_M = GetMapCell(ToTablePoint_XY(PlayerX                       , PlayerY - PLAYER_�]�V����Pt_Y)).WallFlag;
		var<boolean> touchCeiling_R = GetMapCell(ToTablePoint_XY(PlayerX + PLAYER_�]�V����Pt_X , PlayerY - PLAYER_�]�V����Pt_Y)).WallFlag;

		if ((touchCeiling_L && touchCeiling_R) || touchCeiling_M)
		{
			if (PlayerYSpeed < 0.0)
			{
				// �v���C���[�ƓV��̔����W��
				//
//				var<double> K = 1.0;
				var<double> K = 0.0;

				PlayerY = ToTileCenterY(PlayerY - PLAYER_�]�V����Pt_Y) + TILE_H / 2 + PLAYER_�]�V����Pt_Y;
				PlayerYSpeed = Math.abs(PlayerYSpeed) * K;
				PlayerJumpFrame = 0;
			}
		}
		else if (touchCeiling_L)
		{
			PlayerX = ToTileCenterX(PlayerX - PLAYER_�]�V����Pt_X) + TILE_W / 2.0 + PLAYER_�]�V����Pt_X;
		}
		else if (touchCeiling_R)
		{
			PlayerX = ToTileCenterX(PlayerX + PLAYER_�]�V����Pt_X) - TILE_W / 2.0 - PLAYER_�]�V����Pt_X;
		}

		var<boolean> touchGround =
			GetMapCell(ToTablePoint_XY(PlayerX - PLAYER_�ڒn����Pt_X, PlayerY + PLAYER_�ڒn����Pt_Y)).WallFlag ||
			GetMapCell(ToTablePoint_XY(PlayerX + PLAYER_�ڒn����Pt_X, PlayerY + PLAYER_�ڒn����Pt_Y)).WallFlag;

		// memo: @ 2022.7.11
		// �㏸��(�W�����v��)�ɐڒn���肪�������邱�Ƃ�����B
		// �ڒn���͏d�͂ɂ�� PlayerYSpeed ���v���X�ɐU���B
		// -> �ڒn�ɂ��ʒu���̒����� PlayerYSpeed ���v���X�ɐG��Ă���ꍇ�̂ݍs���B

		if (touchGround && 0.0 < PlayerYSpeed)
		{
			PlayerY = ToTileCenterY(PlayerY + PLAYER_�ڒn����Pt_Y) - TILE_H / 2.0 - PLAYER_�ڒn����Pt_Y;
			PlayerYSpeed = 0.0;
			PlayerJumpCount = 0;
			PlayerAirborneFrame = 0;
		}
		else
		{
			PlayerAirborneFrame++;
		}
	}

	var<double> ATARI_MGN = 2.0;

	PlayerCrash = CreateCrash_Rect(CreateD4Rect_XYWH(
		PlayerX,
		PlayerY,
		TILE_W - ATARI_MGN,
		TILE_H - ATARI_MGN
		));

	Draw(P_Player, PlayerX, PlayerY, 1.0, 0.0, 1.0);
}
