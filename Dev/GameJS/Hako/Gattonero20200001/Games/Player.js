/*
	�v���C���[���
*/

/*
	�v���C���[�̈ʒu
*/
var<double> PlayerX = FIELD_L + FIELD_W / 2;
var<double> PlayerY = FIELD_T + FIELD_H / 2;

/*
	�v���C���[�̑��x
*/
var<double> PlayerXSpeed = 0.0;
var<double> PlayerYSpeed = 0.0;

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

var<boolean> @@_JumpLock = false;

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
		var<int> plMove = 0;

		if (1 <= GetInput_4())
		{
			plMove = -1;
		}
		if (1 <= GetInput_6())
		{
			plMove = 1;
		}

		var<int> slow = 0;
		var<int> jump = 0;

		if (1 <= GetInput_B())
		{
			slow = GetInput_B();
		}
		if (1 <= GetInput_A())
		{
			jump = GetInput_A();
		}

		if (plMove != 0)
		{
			PlayerMoveFrame++;
		}
		else
		{
			PlayerMoveFrame = 0;
		}

		var<boolean> moveSlow = 1 <= PlayerMoveFrame && 1 <= slow;

		if (1 <= PlayerJumpFrame) // ? �W�����v��
		{
			var<int> JUMP_FRAME_MAX = 22;

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
				PlyaerJumpCount = 1;
				PlyaerJumpFrame = 1;
				@@_JumpLock = true;
			}
		}

		if (PlayerJumpFrame == 1) // ? �W�����v�J�n
		{
			// TODO: SE
		}

		if (1 <= PlayerMoveFrame) // ? �ړ���
		{
			var<double> speed = 0.0;

			if (moveSlow)
			{
				speed = PlayerMoveFrame * 0.2;
				speed = Math.min(speed, 3.0);
			}
			else
			{
				speed = 7.0;
			}
			speed *= plMove;

			PlayerXSpeed = Approach(PlayerXSpeed, speed, 0.333);
		}
		else
		{
			PlayerXSpeed /= 2.0;
		}

		PlayerX += PlayerXSpeed;

		var<double> �d�͉����x = 0.5;
		var<double> �����ō����x = 7.0;
		var<double> �W�����v�ɂ��㏸���x = -7.0;

		if (1 <= PlayerJumpFrame)
		{
			PlayerYSpeed = �W�����v�ɂ��㏸���x;
		}
		else
		{
			PlayerYSpeed += �d�͉����x;
		}
		PlayerYSpeed = Math.min(PlayerYSpeed, �����ō����x);

		PlayerY += PlayerYSpeed;
	}

	// �ʒu����
	{
		Do_���@�ʒu����();

		if (Is_���@�ʒu����_Touch_Ground())
		{
			PlayerJumpCount = 0;
			PlayerAirborneFrame = 0;
			PlayerYSpeed = Math.min(0.0, PlayerYSpeed);
		}
		else
		{
			PlayerAirborneFrame++;

			if (Is_���@�ʒu����_Touch_Roof())
			{
				PlayerJumpFrame = 0;
//				PlayerYSpeed = = Math.max(PlayerYSpeed, 0.0); // �����W�� 0
				PlayerYSpeed = = Math.abs(PlayerYSpeed);      // �����W�� 1
			}
		}
	}

	// �U���͖����B
	/*
	if (1 <= GetInput_B() && ProcFrame % 10 == 0) // �U��
	{
		GetShots().push(CreateShot_BDummy(PlayerX, PlayerY, 0.0, -10.0));
	}
	*/

	PlayerCrash = CreateCrash_Circle(PlayerX, PlayerY, MICRO);

	Draw(P_Dummy, PlayerX, PlayerY, 1.0, Math.PI / 4, 1.0);
}
