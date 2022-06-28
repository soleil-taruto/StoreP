/*
	�ݒ�
*/

function* <generatorForTask> SettingMain()
{
	var<int> selectIndex = 0;

	FreezeInput();

gameLoop:
	for (; ; )
	{
		SetColor("#a0b0c0");
		PrintRect(0, 0, Screen_W, Screen_H);

		SetColor("#000000");
		SetPrint(30, 50, 24);
		SetFSize(20);
		PrintLine("�ݒ�");

		selectIndex = DrawSimpleMenu(
			selectIndex,
			30,
			100,
			70,
			[
				"�Q�[���p�b�h�̂`�{�^���̊��蓖��",
				"�Q�[���p�b�h�̂a�{�^���̊��蓖��",
				"�߂�",
			]);

		if (DSM_Desided)
		switch (selectIndex)
		{
		case 0:
			yield* @@_PadSetting("�`", index => PadInputIndex_A = index);
			break;

		case 1:
			yield* @@_PadSetting("�a", index => PadInputIndex_B = index);
			break;

		case 2:
			break gameLoop;
		}
		yield 1;
	}
	FreezeInput();
}

function* <generatorForTask> @@_PadSetting(<string> name, <Action int> a_setBtn)
{
	yield* @@_WaitToReleaseButton();
	FreezeInput();

	for (; ; )
	{
		if (GetMouseDown() == -1 || GetKeyInput(32) == 1)
		{
			break;
		}

		var<int> index = @@_GetPressButtonIndex();

		if (index != -1)
		{
			a_setBtn(index);
			break;
		}

		SetColor("#a0b0c0");
		PrintRect(0, 0, Screen_W, Screen_H);

		SetColor("#000000");
		SetPrint(30, 50, 24);
		SetFSize(20);
		PrintLine("�Q�[���p�b�h��" + name + "�{�^���ݒ�");
		PrintLine("���蓖�Ă�{�^���������ĉ������B");
		PrintLine("�L�����Z������ɂ̓X�y�[�X�L�[�܂��͉�ʂ��N���b�N���ĉ������B");

		yield 1;
	}
	yield* @@_WaitToReleaseButton();
	FreezeInput();
}

function* <generatorForTask> @@_WaitToReleaseButton()
{
	while (@@_GetPressButtonIndex() != -1)
	{
		yield 1;
	}
}

function <int> @@_GetPressButtonIndex()
{
	for (var<int> index = 0; index < 100; index++)
	{
		if (1 <= GetPadInput(index))
		{
			return index;
		}
	}
	return -1;
}
