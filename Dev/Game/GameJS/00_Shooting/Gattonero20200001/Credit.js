/*
	�N���W�b�g
*/

function* <generatorForTask> CreditMain()
{
	FreezeInput();

	for (; ; )
	{
		if (GetMouseDown() == -1 || GetInput_A() == 1)
		{
			break;
		}

		SetColor("#a0b0c0");
		PrintRect(0, 0, Screen_W, Screen_H);

		SetColor("#000000");
		SetPrint(50, 80, 80);
		SetFSize(24);

		PrintLine("���f�� (�����R�[�h���E�h�̗�)");

		var<string[]> credits = [ @(CRDT) ];

		if (credits.length == 0)
		{
			credits = [ "none", "" ];
		}

		for (var<int> index = 0; index < credits.length; index += 2)
		{
			PrintLine(credits[index] + "�@" + credits[index + 1]);
		}

		SetPrint(Screen_W - 400, Screen_H - 20, 0);
		SetFSize(20);
		PrintLine("��ʂ��N���b�N����ƃ^�C�g���ɖ߂�܂�");

		yield 1;
	}
	FreezeInput();
}
