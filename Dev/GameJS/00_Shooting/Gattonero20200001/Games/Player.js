/*
	�v���C���[���
*/

/*
	�v���C���[�̈ʒu
*/
var<double> PlayerX = FIELD_L + FIELD_W / 2;
var<double> PlayerY = FIELD_T + FIELD_H / 2;

/*
	���t���[���̓����蔻��, null == �����蔻�薳��
*/
var<Crash_t> PlayerCrash = null;

/*
	�v���C���[�ēo��t���[��
	0 == ����
	1�` == �ēo�ꒆ
*/
var<int> PlayerRebornFrame = 0;

/*
	�ēo�ꒆ�̕`��ʒu
*/
var<double> @@_Reborn_X = -1.0;
var<double> @@_Reborn_Y = -1.0;

/*
	�v���C���[���G���ԃt���[��
	0 == ����
	1�` == ���G���Ԓ�
*/
var<int> PlayerInvincibleFrame = 0;

/*
	�U�����x��
	1 �` PLAYER_ATTACK_LV_MAX
*/
var<int> PlayerAttackLv = 1;

/*
	�c�@
	0 �`
*/
var<int> PlayerZankiNum = 3;

function <void> ResetPlayer()
{
	PlayerX = FIELD_L + FIELD_W / 2;
	PlayerY = FIELD_T + FIELD_H / 2;
	PlayerCrash = null;
	PlayerRebornFrame = 0;
	@@_Reborn_X = -1.0;
	@@_Reborn_Y = -1.0;
	PlayerInvincibleFrame = 0;
	PlayerAttackLv = 1;
	PlayerZankiNum = 3;
}

/*
	�s��
	�������ׂ����ƁF
	-- �s��
	-- �����蔻��̐ݒu
*/
function <void> ActPlayer()
{
	// �ړ�
	{
		var<double> speed;

		if (1 <= GetInput_A()) // ? �ᑬ�ړ�
		{
			speed = 2.5;
		}
		else // ? �����ړ�
		{
			speed = 5.0;
		}

		if (1 <= GetInput_4())
		{
			PlayerX -= speed;
		}
		if (1 <= GetInput_6())
		{
			PlayerX += speed;
		}
		if (1 <= GetInput_8())
		{
			PlayerY -= speed;
		}
		if (1 <= GetInput_2())
		{
			PlayerY += speed;
		}

		PlayerX = ToRange(PlayerX, FIELD_L, FIELD_R);
		PlayerY = ToRange(PlayerY, FIELD_T, FIELD_B);
	}

rebornBlock:
	if (1 <= PlayerRebornFrame) // ? �ēo�ꒆ
	{
		if (PLAYER_REBORN_FRAME_MAX < ++PlayerRebornFrame)
		{
			PlayerRebornFrame = 0;
			PlayerInvincibleFrame = 1;
			break rebornBlock;
		}
		var<int> frame = PlayerRebornFrame; // �l�� == 2 �` PLAYER_REBORN_FRAME_MAX
		var<double> rate = RateAToB(2, PLAYER_REBORN_FRAME_MAX, PlayerRebornFrame);

		if (frame == 2) // ? ����
		{
			@@_Reborn_X = FIELD_L + FIELD_W / 2;
			@@_Reborn_Y = FIELD_B + 100.0;
		}

		@@_Reborn_X = Approach(@@_Reborn_X, PlayerX, 1.0 - rate * rate * rate);
		@@_Reborn_Y = Approach(@@_Reborn_Y, PlayerY, 1.0 - rate * rate * rate);
	}

	// �U��
	//
	if (PlayerRebornFrame == 0) // ? not �ēo�ꒆ
	{
		if (1 <= GetInput_B() && ProcFrame % 4 == 0)
		{
			switch (PlayerAttackLv)
			{
			case 1:
				GetShots().push(CreateShot_Normal(PlayerX, PlayerY, Math.PI * 1.5, 20.0));
				break;

			case 2:
				GetShots().push(CreateShot_Normal(PlayerX - 10 , PlayerY, Math.PI * 1.5, 20.0));
				GetShots().push(CreateShot_Normal(PlayerX + 10 , PlayerY, Math.PI * 1.5, 20.0));
				break;

			case 3:
				GetShots().push(CreateShot_Normal(PlayerX - 20 , PlayerY, Math.PI * 1.5, 20.0));
				GetShots().push(CreateShot_Normal(PlayerX      , PlayerY, Math.PI * 1.5, 20.0));
				GetShots().push(CreateShot_Normal(PlayerX + 20 , PlayerY, Math.PI * 1.5, 20.0));
				break;

			default:
				error();
			}

			SE(S_PlayerShoot);
		}
	}

	// �����蔻����Z�b�g����B
	// -- �ēo�ꒆ�E���G���Ԓ��� null (�����蔻�薳��) ���Z�b�g���邱�ƁB

	PlayerCrash = null; // reset

	if (1 <= PlayerRebornFrame) // ? �ēo�ꒆ
	{
		// noop
	}
	else if (1 <= PlayerInvincibleFrame) // ? ���G���Ԓ�
	{
		// noop
	}
	else
	{
		PlayerCrash = CreateCrash_Point(PlayerX, PlayerY);
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

	if (
		1 <= PlayerDamageFrame ||
		1 <= PlayerInvincibleFrame
		)
	{
		plA = 0.5;
	}

	if (1 <= PlayerRebornFrame)
	{
		var<double> rate = PlayerRebornFrame / PLAYER_REBORN_FRAME_MAX;
		var<double> remRate = 1.0 - rate;

		Draw(P_Player, @@_Reborn_X, @@_Reborn_Y, 0.5, remRate * remRate * 30.0, 1.0);
	}
	else
	{
		Draw(P_Player, PlayerX, PlayerY, plA, 0.0, 1.0);
	}
}
