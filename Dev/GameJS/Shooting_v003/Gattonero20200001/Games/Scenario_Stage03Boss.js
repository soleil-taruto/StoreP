/*
	�V�i���I - �X�e�[�W 03 �{�X
*/

function* <generatorForTask> Scenario_Stage03Boss()
{
	Play(M_Stage03Boss);

	yield* Wait(30);

	GetEnemies().push(CreateEnemy_Boss03(FIELD_L + FIELD_W / 2, -100.0, 300));

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
