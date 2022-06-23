/*
	��������
*/

/*
	Enemy_t �ǉ��t�B�[���h
	{
		<boolean> @@_Reached // 0: �����B, 1: ���B, 2: ���B && �`�F�b�N�ς�
	}
*/

var<double> @@_EXPLODE_R = 45.0;

function* <generatorForTask> BubbleRelation_���e�ɂ�锚��(<Enemy_t[]> enemies, <Enemy_t> baseEnemy)
{
	// ���b�Z�[�W�\��
	{
		SetColor("#ffffff60");
		PrintRect(0, 300, Screen_W, 200);
		SetColor("#000000");
		SetPrint(30, 430, 0);
		SetFSize(80);
		PrintLine("CHECK-RELATION!");
	}

	for (var<Enemy_t> enemy of enemies)
	{
		enemy.@@_Reached = 0;
	}

	baseEnemy.@@_Reached = 1;

	@@_DoReached(baseEnemy);

	for (var<boolean> extended = true; extended; )
	{
		extended = false;

		for (var<Enemy_t> enemy of enemies)
		{
			if (enemy.@@_Reached == 1)
			{
				enemy.@@_Reached = 2;
				@@_Extend(enemies, enemy);
				extended = true;
				yield 1;
			}
		}
	}

	var<int> count = 0;

	for (var<Enemy_t> enemy of enemies)
	{
		if (enemy.@@_Reached == 2)
		{
			count++;
		}
	}

	/*
	for (var<int> w = 0; w < 10; w++) // �E�F�C�g
	{
		yield 1;
	}
	*/

	if (3 <= count)
	{
		for (var<Enemy_t> enemy of enemies)
		{
			if (enemy.@@_Reached == 2)
			{
				KillEnemy(enemy);
			}
		}
	}
}

function <void> @@_Extend(<Enemy_t[]> enemies, <Enemy_t> baseEnemy)
{
	for (var<Enemy_t> enemy of enemies)
	{
		if (
			enemy.@@_Reached == 0 &&
			enemy.Color == baseEnemy.Color && // �����F�̂ݓ`������B
			Math.abs(enemy.X - baseEnemy.X) < @@_EXPLODE_R &&
			Math.abs(enemy.Y - baseEnemy.Y) < @@_EXPLODE_R &&
			GetDistance(enemy.X - baseEnemy.X, enemy.Y - baseEnemy.Y) < @@_EXPLODE_R
			)
		{
			enemy.@@_Reached = 1;

			@@_DoReached(enemy);
		}
	}
}

function <void> @@_DoReached(<Enemy_t> enemy)
{
	Draw(
		P_Balls[enemy.Color],
		enemy.X,
		enemy.Y,
		0.5,
		0.0,
		3.0
		);
}
