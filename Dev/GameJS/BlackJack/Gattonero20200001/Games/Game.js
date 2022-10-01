/*
	ÉQÅ[ÉÄÅEÉÅÉCÉì
*/

function* <generatorForTask> GameMain()
{
	FreezeInput();
	ClearAllActor();

	var<Actor_t[]> trumps = [];

	AddActor(trumps[0] = CreateActor_Trump(200, -300, Suit_e_HEART, 6, false));
	AddActor(trumps[1] = CreateActor_Trump(400, -300, Suit_e_HEART, 7, false));
	AddActor(trumps[2] = CreateActor_Trump(600, -300, Suit_e_HEART, 8, false));
	AddActor(trumps[3] = CreateActor_Trump(800, -300, Suit_e_HEART, 9, false));

	for (var<Actor_t> trump of trumps)
	{
		SetTrumpDest(trump, trump.X, 300);
	}

	for (; ; )
	{
		ClearScreen();

		ExecuteAllActor();

		yield 1;
	}
	FreezeInput();
}
