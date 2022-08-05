/*
	ƒQ[ƒ€EƒƒCƒ“
*/

function* <generatorForTask> GameMain(<int> mapIndex)
{
	for (; ; )
	{
		if (GetInput_A() == 1)
		{
			break;
		}

		SetColor("#808080");
		PrintRect(0.0, 0.0, Screen_W, Screen_H);

		yield 1;
	}
}
