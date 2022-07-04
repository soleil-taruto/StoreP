/*
	シナリオ
*/

function* <generatorForTask> ScenarioTask()
{
	// -- choose one --

//	yield* @@_Test01();
	yield* @@_Main();

	// --
}

function* <generatorForTask> @@_Test01()
{
	/*
	for (; ; )
	{
		if (GetRand1() < 0.2)
		{
			GetEnemies().push(CreateEnemy_BDummy(GetRand3(FIELD_L, FIELD_R), 0.0, 10));
		}

		yield* Repeat(1, 20); // 20フレーム待つ。-- ウェイトはこの様に記述する。
	}
	*/

	for (; ; )
	{
		if (GetRand1() < 0.02)
		{
			switch(GetRand(8))
			{
			case 0:
				GetEnemies().push(CreateEnemy_E0001(GetRand3(FIELD_L, FIELD_R), 0.0, 10));
				break;

			case 1:
				GetEnemies().push(CreateEnemy_E0002(GetRand3(FIELD_L, FIELD_R), 0.0, 10));
				break;

			case 2:
				GetEnemies().push(CreateEnemy_E0003(GetRand3(FIELD_L, FIELD_R), 0.0, 10));
				break;

			case 3:
				GetEnemies().push(CreateEnemy_E0004(GetRand3(FIELD_L, FIELD_R), 0.0, 10));
				break;

			case 4:
				GetEnemies().push(CreateEnemy_E0005(GetRand3(FIELD_L, FIELD_R), 0.0, 10));
				break;

			case 5:
				GetEnemies().push(CreateEnemy_E0006(GetRand3(FIELD_L, FIELD_R), 0.0, 10));
				break;

			case 6:
				GetEnemies().push(CreateEnemy_E0007(GetRand3(FIELD_L, FIELD_R), 0.0, 10));
				break;

			case 7:
				GetEnemies().push(CreateEnemy_E0008(GetRand3(FIELD_L, FIELD_R), 0.0, 10));
				break;
			}
		}

		yield 1;
	}
}

function* <generatorForTask> @@_Main()
{
	for (; ; )
	{
		yield* Wait(30);

		for (var<int> c = 0; c < 10; c++)
		{
			GetEnemies().push(CreateEnemy_E0001(600, FIELD_T - 25, 5));

			yield* Wait(20);
		}

		yield* Wait(30);

		for (var<int> c = 0; c < 10; c++)
		{
			GetEnemies().push(CreateEnemy_E0002(GetRand3(50, 650), FIELD_T - 25, 5));

			yield* Wait(20);
		}

		yield* Wait(90);

		GetEnemies().push(EnemyCommon_ToItemer(
			CreateEnemy_E0003(FIELD_L + FIELD_W / 2, FIELD_T - 25, 25),
			Enemy_Item_Kind_e_PowerUp
			));

		yield* Wait(120);

		for (var<int> c = 0; c < 10; c++)
		{
			GetEnemies().push(CreateEnemy_E0001(100, FIELD_T - 25, 5));

			yield* Wait(20);
		}

		yield* Wait(30);

		for (var<int> c = 0; c < 10; c++)
		{
			GetEnemies().push(CreateEnemy_E0002(GetRand3(50, 650), FIELD_T - 25, 5));

			yield* Wait(20);
		}

		yield* Wait(60);
	}
}
