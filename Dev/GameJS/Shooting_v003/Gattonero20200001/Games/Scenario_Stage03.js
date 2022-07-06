/*
	シナリオ - ステージ 03
*/

function* <generatorForTask> Scenario_Stage03()
{
	Play(M_Stage03);

	yield* Wait(60);

	for (var<int> c = 0; c < 10; c++)
	{
		GetEnemies().push(CreateEnemy_E0004(600, FIELD_T - 25, 5));

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
		CreateEnemy_E0003(GetRand3(50, 650), FIELD_T - 25, 5),
		Enemy_Item_Kind_e_ZankiUp
		));

	yield* Wait(60);

	GetEnemies().push(EnemyCommon_ToItemer(
		CreateEnemy_E0004(GetRand3(50, 650), FIELD_T - 25, 5),
		Enemy_Item_Kind_e_PowerUp
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
}
