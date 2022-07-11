/*
	エンディング
*/

function* <generatorForTask> Ending()
{
	SetCurtain();
	FreezeInput();

	for (var<int> frame = 0; ; frame++)
	{
		if (60 < frame && GetInput_A() == 1)
		{
			break;
		}

		SetColor("#404080");
		PrintRect(0.0, 0.0, Screen_W, Screen_H);

		SetColor("#ffffff");
		SetPrint(20, 300, 200);
		SetFSize(120);
		PrintLine("エンディング");

		yield 1;
	}

	SetCurtain_FD(30, -1.0);

	for (var<Scene_t> scene of CreateScene(40))
	{
		SetColor("#404080");
		PrintRect(0.0, 0.0, Screen_W, Screen_H);

		yield 1;
	}

	FreezeInput();
}
