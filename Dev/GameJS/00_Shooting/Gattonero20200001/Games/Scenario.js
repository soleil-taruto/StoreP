/*
	�V�i���I
*/

function* <generatorForTask> ScenarioTask()
{
	// ���T���v�� -- �v�폜
	{
		for (; ; )
		{
			if (GetRand1() < 0.2)
			{
				GetEnemies().push(CreateEnemy_BDummy(GetRand1() * FIELD_W, 0.0, 10));
			}

			yield* Repeat(1, 20); // 20�t���[���҂B-- �E�F�C�g�͂��̗l�ɋL�q����B
		}
	}
}
