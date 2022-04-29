/*
	�e�X�g�E���[�� (���T���v���Ƃ��ăL�[�v)
*/

function* TestRoom()
{
	EnterRoom();

	for (; ; )
	{
		// �����ŗL�̏�����������

		if (GetMouseDown() == -1)
		{
			NextRoom = TestRoom2(); // ���̕����̃W�F�l���[�^���Z�b�g����B
			break;
		}

		// �����ŗL�̏��������܂�

		StartDrawRoom();

		// �����ŗL�̕`�悱������

		Draw(P_�w�i_�Z��[0], Screen_W / 2, Screen_H / 2, 1, 0, 1);

		SetColor("#ffffff");
		SetPrint(50, 60, 0);
		SetFSize(16);
		PrintLine("TestRoom -- Click -> TestRoom2");

		// �����ŗL�̕`�悱���܂�

		EndDrawRoom();

		yield 1;
	}
	LeaveRoom();
}

function* TestRoom2()
{
	EnterRoom();

	for (; ; )
	{
		// �����ŗL�̏�����������

		if (GetMouseDown() == -1)
		{
			if (GetMouseX() < Screen_W / 2)
			{
				NextRoom = TestRoom(); // ���̕����̃W�F�l���[�^���Z�b�g����B
				break;
			}
			else
			{
				// �ċA�I_�����ړ�
				{
					LeaveRoom();
					yield* TestRoom3();
					EnterRoom();
				}
			}
		}

		// �����ŗL�̏��������܂�

		StartDrawRoom();

		// �����ŗL�̕`�悱������

		Draw(P_�w�i_�w�Z�L��[0], Screen_W / 2, Screen_H / 2, 1, 0, 1);

		SetColor("#ffffff");
		SetPrint(50, 60, 0);
		SetFSize(16);
		PrintLine("TestRoom2 -- Click Left -> TestRoom, Right -> TestRoom3");

		// �����ŗL�̕`�悱���܂�

		EndDrawRoom();

		yield 1;
	}
	LeaveRoom();
}

/*
	�ċA�I�ɓ����Ă��镔��
*/
function* TestRoom3()
{
	EnterRoom();

	for (; ; )
	{
		// �����ŗL�̏�����������

		if (GetMouseDown() == -1)
		{
			// �ċA�I�ɓ����Ă��镔���Ȃ̂� NextRoom �̃Z�b�g�͕s�v
			break;
		}

		// �����ŗL�̏��������܂�

		StartDrawRoom();

		// �����ŗL�̕`�悱������

		Draw(P_�w�i_�X�ߎ�A[0], Screen_W / 2, Screen_H / 2, 1, 0, 1);

		SetColor("#ffffff");
		SetPrint(50, 60, 0);
		SetFSize(16);
		PrintLine("TestRoom3 -- Click -> TestRoom2");

		// �����ŗL�̕`�悱���܂�

		EndDrawRoom();

		yield 1;
	}
	LeaveRoom();
}
