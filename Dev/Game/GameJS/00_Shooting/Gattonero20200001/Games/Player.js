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
	�s���ƕ`��
	�������ׂ����ƁF
	-- �s��
	-- �����蔻��̐ݒu
	-- �`��
*/
function <void> DrawPlayer()
{
	// ���T���v�� -- �v�폜
	{
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

		if (1 <= GetInput_B() && ProcFrame % 10 == 0) // �U��
		{
			GetShots().push(CreateShot_BDummy(PlayerX, PlayerY, 0.0, -10.0));
		}

		PlayerCrash = CreateCrash_Circle(PlayerX, PlayerY, MICRO);

		Draw(P_Dummy, PlayerX, PlayerY, 1.0, Math.PI / 4, 1.0);
	}
}
