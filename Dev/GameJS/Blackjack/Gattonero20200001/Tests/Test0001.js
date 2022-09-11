/*
	ƒeƒXƒg-0001
*/

function* <generatorForTask> Test01()
{
	ClearAllActor();

	var<Actor_t> card = CreateActor_Trump(Screen_W / 2.0, Screen_H / 2.0, 1, 1, false);

	AddActor(card);

	for (; ; )
	{
		ClearScreen();

		SetTrumpReversed(card, ToFix(ProcFrame / 120) % 2 == 1);

		ExecuteAllActor();

		yield 1;
	}
}
