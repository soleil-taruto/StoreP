/*
	シナリオ - ステージ 03 ボス
*/

function* <generatorForTask> Scenario_Stage03Boss()
{
	Play(M_Stage03Boss);

	yield* Wait(30);

	GetEnemies().push(CreateEnemy_Boss03(FIELD_L + FIELD_W / 2, -100.0, 300));

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
