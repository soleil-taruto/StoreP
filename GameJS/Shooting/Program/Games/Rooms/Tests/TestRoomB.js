/*
	�e�X�g�E���[�� (���T���v���Ƃ��ăL�[�v)
*/

var @@_�w�iTable =
[
	P_�w�i_����,
	P_�w�i_����,
	P_�w�i_����g�C��,
	P_�w�i_�w�Z�L��,
	P_�w�i_�X�ߎ�A,
	P_�w�i_�X�ߎ�B,
	P_�w�i_�Z��,
	P_�w�i_�̈��,
	P_�w�i_����,
];

var @@_�w�iList = P_�w�i_����;

var @@_���ԑ� = 0; // 0�`3: { ����, �[��, ��(�_��), ��(����) }

function* TestRoomB()
{
	EnterRoom();

	for (; ; )
	{
		// �����ŗL�̏�����������

		if (GetMouseDown() == -1)
		{
			if (GetMouseX() < Screen_W / 2)
			{
				var i = @@_�w�iTable.indexOf(@@_�w�iList);
				i = (i + 1) % @@_�w�iTable.length;
				@@_�w�iList = @@_�w�iTable[i];
			}
			else
			{
				@@_���ԑ� = (@@_���ԑ� + 1) % 4;
			}
		}

		// �����ŗL�̏��������܂�

		StartDrawRoom();

		// �����ŗL�̕`�悱������

		Draw(@@_�w�iList[@@_���ԑ�], Screen_W / 2, Screen_H / 2, 1, 0, 1);

		SetColor("#ffffff");
		SetPrint(50, 60, 0);
		SetFSize(16);
		PrintLine("TestRoom2 -- Click Left -> Move, Right -> Time");

		// �����ŗL�̕`�悱���܂�

		EndDrawRoom();

		yield 1;
	}
	LeaveRoom();
}
