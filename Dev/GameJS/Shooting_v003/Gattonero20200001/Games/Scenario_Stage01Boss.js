/*
	�V�i���I - �X�e�[�W 01 �{�X
*/

function* <generatorForTask> Scenario_Stage01Boss()
{
	Play(M_Stage01Boss);

	yield* Wait(30);

	GetEnemies().push(CreateEnemy_Boss01(FIELD_L + FIELD_W / 2, -100.0, 300));

	for (; ; ) // �{�X�����ʂ܂ő҂B
	{
		if (!GetEnemies().some(v => IsEnemyBoss(v)))
		{
			break;
		}
		yield 1;
	}

	yield* Wait(90);
}
