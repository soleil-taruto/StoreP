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
	�ēo��t���[���E�ő�l
*/
var<int> PLAYER_BORN_FRAME_MAX = 30;

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
	�s���ƕ`��
	�������ׂ����ƁF
	-- �s��
	-- �����蔻��̐ݒu
	-- �`��
*/
function <void> DrawPlayer()
{
	if (1 <= PlayerBornFrame) // ? �ēo�ꒆ
	{
		var<double> rate = PlayerBornFrame / PLAYER_BORN_FRAME_MAX;
		var<double> remRate = 1.0 - rate;

		if (PlayerBornFrame == 1) // ? ����
		{
			@@_Born_X = FIELD_L + FIELD_W / 2;
			@@_Born_Y = FIELD_B + 100.0;
		}

		@@_Born_X = Approach(@@_Born_X, PlayerX, remRate);
		@@_Born_Y = Approach(@@_Born_Y, PlayerY, remRate);

		PlayerCrash = null; // �����蔻�薳���B

		Draw(P_Player, @@_Born_X, @@_Born_Y, 1.0, remRate * remRate * 10.0, 1.0);

		if (PlayerBornFrame < PLAYER_BORN_FRAME_MAX)
		{
			PlayerBornFrame++;
		}
		else
		{
			PlayerBornFrame = 0;
		}
		return;
	}

	// �ړ�
	{
		var<double> SPEED;

		if (1 <= GetInput_A()) // ? �ᑬ�ړ�
		{
			SPEED = 1.0;
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

	if (1 <= GetInput_B() && ProcFrame % 4 == 0) // �U��
	{
		GetShots().push(CreateShot_Normal(PlayerX, PlayerY, Math.PI * 1.5, 20.0));
	}

	PlayerCrash = CreateCrash_Point(PlayerX, PlayerY);

	Draw(P_Player, PlayerX, PlayerY, 1.0, 0.0, 1.0);
}
