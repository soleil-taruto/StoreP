/*
	�ݒ�
*/

function* <generatorForTask> SettingMain()
{
	ClearMouseDown();

	for (; ; )
	{
		if (GetMouseDown() == -1)
		{
			break;
		}

		SetColor("#a0b0c0");
		PrintRect(0, 0, Screen_W, Screen_H);

		SetColor("#000000");

		// TODO
		// TODO
		// TODO

		SetPrint(Screen_W - 400, Screen_H - 20, 0);
		SetFSize(20);
		PrintLine("��ʂ��N���b�N����ƃ^�C�g���ɖ߂�܂�");

		yield 1;
	}
	ClearMouseDown();
}
