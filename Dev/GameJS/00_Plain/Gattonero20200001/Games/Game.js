/*
	ƒQ[ƒ€EƒƒCƒ“
*/

function* <generatorForTask> GameMain()
{
	FreezeInput();
	ClearAllActor();

	var<Actor_t> card = CreateActor_Trump(Screen_W / 2.0, Screen_H / 2.0, 1, 1, false);
	var<boolean> reversed = false;

	AddActor(card);

	for (; ; )
	{
		ClearScreen();

		if (GetInput_Pause() == 1)
		{
			break;
		}

		if (GetMouseDown() == -1)
		{
			reversed = !reversed;
			SetTrumpReversed(card, reversed);
		}

		ExecuteAllActor();

		yield 1;
	}
	FreezeInput();
}
