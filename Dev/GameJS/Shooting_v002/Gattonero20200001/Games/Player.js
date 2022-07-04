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
	�ēo��t���[��
	-- �ēo����J�n����ɂ� 1 ���Z�b�g���邱�ƁB
	0 == ����
	1 �` PLAYER_BORN_FRAME_MAX == �ēo�ꒆ
*/
var<int> PlayerBornFrame = 0;

/*
	�ēo�ꒆ�̕`��ʒu
*/
var<double> @@_Born_X;
var<double> @@_Born_Y;

/*
	���G��ԃt���[��
	-- ���G��Ԃ��J�n����ɂ� 1 ���Z�b�g���邱�ƁB
	0 == ����
	1 �` PLAYER_INVINCIBLE_FRAME_MAX == ���G��Ԓ�
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
		var<double> SPEED;

		if (1 <= GetInput_A()) // ? �ᑬ�ړ�
		{
			SPEED = 2.5;
		}
		else // ? �����ړ�
		{
			SPEED = 5.0;
		}

		if (1 <= GetInput_2())
		{
			PlayerY += SPEED;
		}
		if (1 <= GetInput_4())
		{
			PlayerX -= SPEED;
		}
		if (1 <= GetInput_6())
		{
			PlayerX += SPEED;
		}
		if (1 <= GetInput_8())
		{
			PlayerY -= SPEED;
		}

		PlayerX = ToRange(PlayerX, FIELD_L, FIELD_R);
		PlayerY = ToRange(PlayerY, FIELD_T, FIELD_B);
	}

	// �ēo�ꒆ�́A�ړ��͉\�A�U���͕s�Ƃ���B

	if (1 <= PlayerBornFrame) // ? �ēo�ꒆ
	{
		var<double> rate = PlayerBornFrame / PLAYER_BORN_FRAME_MAX;
		var<double> remRate = 1.0 - rate;

		if (PlayerBornFrame == 1) // ? ����
		{
			@@_Born_X = FIELD_L + FIELD_W / 2;
			@@_Born_Y = FIELD_B + 100.0;
		}

		@@_Born_X = Approach(@@_Born_X, PlayerX, 1.0 - rate * rate * rate);
		@@_Born_Y = Approach(@@_Born_Y, PlayerY, 1.0 - rate * rate * rate);

		PlayerCrash = null; // �����蔻�薳���B

		Draw(P_Player, @@_Born_X, @@_Born_Y, 0.5, remRate * remRate * 30.0, 1.0);

		// �ēo��t���[���E�C���N�������g
		//
		if (PlayerBornFrame < PLAYER_BORN_FRAME_MAX)
		{
			PlayerBornFrame++;
		}
		else // ? �ēo��_�I��
		{
			PlayerBornFrame = 0;
			PlayerInvincibleFrame = 1;
		}
		return;
	}

	if (1 <= GetInput_B() && ProcFrame % 4 == 0) // �U��
	{
		switch (PlayerAttackLv)
		{
		case 1:
			GetShots().push(CreateShot_Normal(PlayerX, PlayerY, Math.PI * 1.5, 20.0));
			break;

		case 2:
			GetShots().push(CreateShot_Normal(PlayerX - 10, PlayerY, Math.PI * 1.5, 20.0));
			GetShots().push(CreateShot_Normal(PlayerX + 10, PlayerY, Math.PI * 1.5, 20.0));
			break;

		case 3:
			GetShots().push(CreateShot_Normal(PlayerX - 20, PlayerY, Math.PI * 1.5, 20.0));
			GetShots().push(CreateShot_Normal(PlayerX,      PlayerY, Math.PI * 1.5, 20.0));
			GetShots().push(CreateShot_Normal(PlayerX + 20, PlayerY, Math.PI * 1.5, 20.0));
			break;

		default:
			error();
		}
	}

	if (1 <= PlayerInvincibleFrame) // ? ���G���
	{
		PlayerCrash = null; // �����蔻�薳���B

		Draw(P_Player, PlayerX, PlayerY, 0.5, 0.0, 1.0);

		// ���G��ԃt���[���E�C���N�������g
		//
		if (PlayerInvincibleFrame < PLAYER_INVINCIBLE_FRAME_MAX)
		{
			PlayerInvincibleFrame++;
		}
		else // ? ���G���_�I��
		{
			PlayerInvincibleFrame = 0;
		}
	}
	else // �ʏ�
	{
		PlayerCrash = CreateCrash_Point(PlayerX, PlayerY);

		Draw(P_Player, PlayerX, PlayerY, 1.0, 0.0, 1.0);
	}
}
