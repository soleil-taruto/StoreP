/*
	�V�i���I - �X�e�[�W 02 �{�X
*/

function* <generatorForTask> Scenario_Stage02Boss()
{
	Play(M_Stage02Boss);

	yield* Wait(30);

	GetEnemies().push(CreateEnemy_Boss02(FIELD_L + FIELD_W / 2, -100.0, 300));

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
