/*
	�V�i���I
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

		yield* Repeat(1, 20); // 20�t���[���҂B-- �E�F�C�g�͂��̗l�ɋL�q����B
	}
	*/

	for (; ; )
	{
		if (GetRand1() < 0.02)
//		if (GetRand1() < 0.09) // �����Q�[
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
	BackgroundPhase = 0;

	yield* Scenario_Stage01();

	BackgroundPhase++;

	yield* Scenario_Stage02();

	BackgroundPhase++;

	yield* Scenario_Stage03();

	// ====
	// Ending
	// ====

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
