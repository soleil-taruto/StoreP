/*
	シナリオ
*/

function* <generatorForTask> ScenarioTask()
{
	// -- choose one --

//	yield* @@_Test01();
//	yield* @@_Test02();
	yield* @@_Test03();
//	yield* @@_Main();

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
//		if (GetRand1() < 0.09) // 無理ゲー
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

function* <generatorForTask> @@_Test02()
{
	var<Audio[]> musics =
	[
		M_Stage01,
		M_Stage01Boss,
		M_Stage02,
		M_Stage02Boss,
		M_Stage03,
		M_Stage03Boss,
		M_Ending,
	];

	for (; ; )
	{
		Play(musics[BackgroundPhase]);

		yield* Wait(60 * 30);

		BackgroundPhase++;
		BackgroundPhase %= 7;
	}
}

function* <generatorForTask> @@_Test03()
{
	BackgroundPhase = 1;

	Play(M_Stage01Boss);

	GetEnemies().push(CreateEnemy_Boss01(FIELD_L + FIELD_W / 2, -100.0, 300));

	for (; ; )
	{
		yield 1;
	}
}

function* <generatorForTask> @@_Main()
{
	// ■■■■■■■■■■
	// ■　ステージ　１　■
	// ■■■■■■■■■■

	Play(M_Stage01);

	yield* Wait(60);

	for (var<int> c = 0; c < 10; c++)
	{
		GetEnemies().push(CreateEnemy_E0001(600, FIELD_T - 25, 5));

		yield* Wait(20);
	}

	yield* Wait(60);

	for (var<int> c = 0; c < 10; c++)
	{
		GetEnemies().push(CreateEnemy_E0002(GetRand3(50, 650), FIELD_T - 25, 5));

		yield* Wait(20);
	}

	yield* Wait(60);

	GetEnemies().push(EnemyCommon_ToItemer(
		CreateEnemy_E0006(GetRand3(50, 650), FIELD_T - 25, 5),
		Enemy_Item_Kind_e_PowerUp
		));

	yield* Wait(60);

	GetEnemies().push(EnemyCommon_ToItemer(
		CreateEnemy_E0007(GetRand3(50, 650), FIELD_T - 25, 5),
		Enemy_Item_Kind_e_PowerUp
		));

	yield* Wait(60);

	for (var<int> c = 0; c < 10; c++)
	{
		GetEnemies().push(EnemyCommon_ToShooter(
			CreateEnemy_E0003(GetRand3(50, 650), FIELD_T - 25, 5)
			));

		yield* Wait(20);
	}

	yield* Wait(180);

	// ■■■■■■■■■■■■■
	// ■　ステージ　１　ボス　■
	// ■■■■■■■■■■■■■

	Play(M_Stage01Boss);
	BackgroundPhase++;

	yield* Wait(30);

	GetEnemies().push(CreateEnemy_Boss01(FIELD_L + FIELD_W / 2, -100.0, 300));

	for (; ; ) // ボスが死ぬまで待つ。
	{
		if (!GetEnemies().some(v => IsEnemyBoss(v)))
		{
			break;
		}
		yield 1;
	}

	yield* Wait(90);

	// ■■■■■■■■■■
	// ■　ステージ　２　■
	// ■■■■■■■■■■

	Play(M_Stage02);
	BackgroundPhase++;

	yield* Wait(60);

	for (var<int> c = 0; c < 10; c++)
	{
		GetEnemies().push(CreateEnemy_E0004(GetRand3(50, 650), FIELD_T - 25, 5));

		yield* Wait(20);
	}

	yield* Wait(60);

	for (var<int> c = 0; c < 10; c++)
	{
		GetEnemies().push(CreateEnemy_E0005(GetRand3(50, 650), FIELD_T - 25, 5));

		yield* Wait(20);
	}

	yield* Wait(60);

	GetEnemies().push(EnemyCommon_ToItemer(
		CreateEnemy_E0008(GetRand3(50, 650), FIELD_T - 25, 5),
		Enemy_Item_Kind_e_ZankiUp
		));

	yield* Wait(60);

	GetEnemies().push(EnemyCommon_ToItemer(
		CreateEnemy_E0001(GetRand3(50, 650), FIELD_T - 25, 5),
		Enemy_Item_Kind_e_ZankiUp
		));

	yield* Wait(60);

	for (var<int> c = 0; c < 10; c++)
	{
		GetEnemies().push(EnemyCommon_ToShooter(
			CreateEnemy_E0006(GetRand3(50, 650), FIELD_T - 25, 5)
			));

		yield* Wait(20);
	}

	yield* Wait(180);

	// ■■■■■■■■■■■■■
	// ■　ステージ　２　ボス　■
	// ■■■■■■■■■■■■■

	Play(M_Stage02Boss);
	BackgroundPhase++;

	yield* Wait(30);

	GetEnemies().push(CreateEnemy_Boss02(FIELD_L + FIELD_W / 2, -100.0, 300));

	for (; ; ) // ボスが死ぬまで待つ。
	{
		if (!GetEnemies().some(v => IsEnemyBoss(v)))
		{
			break;
		}
		yield 1;
	}

	yield* Wait(90);

	// ■■■■■■■■■■
	// ■　ステージ　３　■
	// ■■■■■■■■■■

	Play(M_Stage03);
	BackgroundPhase++;

	yield* Wait(60);

	for (var<int> c = 0; c < 10; c++)
	{
		GetEnemies().push(CreateEnemy_E0004(GetRand3(50, 650), FIELD_T - 25, 5));

		yield* Wait(20);
	}

	yield* Wait(60);

	for (var<int> c = 0; c < 10; c++)
	{
		GetEnemies().push(CreateEnemy_E0007(GetRand3(50, 650), FIELD_T - 25, 5));

		yield* Wait(20);
	}

	yield* Wait(60);

	GetEnemies().push(EnemyCommon_ToItemer(
		CreateEnemy_E0002(GetRand3(50, 650), FIELD_T - 25, 5),
		Enemy_Item_Kind_e_ZankiUp
		));

	yield* Wait(60);

	GetEnemies().push(EnemyCommon_ToItemer(
		CreateEnemy_E0003(GetRand3(50, 650), FIELD_T - 25, 5),
		Enemy_Item_Kind_e_ZankiUp
		));

	yield* Wait(60);

	for (var<int> c = 0; c < 10; c++)
	{
		GetEnemies().push(EnemyCommon_ToShooter(
			CreateEnemy_E0008(GetRand3(50, 650), FIELD_T - 25, 5)
			));

		yield* Wait(20);
	}

	yield* Wait(180);

	// ■■■■■■■■■■■■■
	// ■　ステージ　３　ボス　■
	// ■■■■■■■■■■■■■

	Play(M_Stage03Boss);
	BackgroundPhase++;

	yield* Wait(30);

	GetEnemies().push(CreateEnemy_Boss02(FIELD_L + FIELD_W / 2, -100.0, 300));

	for (; ; ) // ボスが死ぬまで待つ。
	{
		if (!GetEnemies().some(v => IsEnemyBoss(v)))
		{
			break;
		}
		yield 1;
	}

	yield* Wait(90);

	// ■■■■■■■■■■
	// ■　エンディング　■
	// ■■■■■■■■■■

	Play(M_Ending);
	BackgroundPhase++;

	yield* Wait(180);

	for (; ; )
	{
		if (GetInput_A() == 1)
		{
			break;
		}
		yield 1;
	}
}
