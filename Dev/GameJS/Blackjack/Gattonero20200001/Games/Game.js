/*
	�Q�[���E���C��
*/

function* <generatorForTask> GameMain()
{
	FreezeInput();
	ClearAllActor();

	for (; ; )
	{
		if (GetInput_A() == 1)
		{
			break;
		}

		SetColor("#000000");
		PrintRect(0.0, 0.0, Screen_W, Screen_H);

		SetColor("#00ff00");
		SetPrint(20, 40, 0);
		SetFSize(20);
		PrintLine("�`�{�^���������ƏI��...");

		ExecuteAllActor();

		yield 1;
	}
	FreezeInput();
}
