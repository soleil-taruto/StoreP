/*
	シナリオ - ステージ 01
*/

function* <generatorForTask> Scenario_Stage01()
{
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

	// ====
	// BOSS
	// ====

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
}
