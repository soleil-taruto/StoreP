/*
	�V�i���I
*/

function* <generatorForTask> ScenarioTask()
{
	for (; ; )
	{
		if (GetRand1() < 0.2)
		{
			GetEnemies().push(CreateEnemy_BDummy(GetRand3(FIELD_L, FIELD_R), 0.0, 10));
		}

		yield* Repeat(1, 20); // 20�t���[���҂B-- �E�F�C�g�͂��̗l�ɋL�q����B
	}
}
