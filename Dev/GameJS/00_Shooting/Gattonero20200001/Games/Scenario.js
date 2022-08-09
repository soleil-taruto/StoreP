/*
	ƒVƒiƒŠƒI
*/

function* <generatorForTask> CreateScenarioTask()
{
	if (DEBUG)
	{
		// -- choose one --

//		yield* @@_Test01();
//		yield* @@_Test02();
//		yield* @@_Test03();
		yield* @@_Main();

		// --
	}
	else
	{
		yield* @@_Main();
	}
}

function* <generatorForTask> @@_Test01()
{
	for (; ; )
	{
		// none

		yield 1;
	}
}

function* <generatorForTask> @@_Main()
{
	for (; ; )
	{
		if (GetRand1() < 0.01)
		{
			GetEnemies().push(CreateEnemy_BDummy(GetRand1() * Screen_W, -30.0));
		}

		yield 1;
	}
}
