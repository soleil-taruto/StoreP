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

var<int> @@_Busy = 0; // 0 == ��, 1 == ������, 2 == �R���{��

function <void> BubbleRelation_���e�ɂ�锚��(<Enemy_t[]> enemies, <Enemy_t> baseEnemy, <Enemy_t> ���e��_enemy)
{
	var<boolean> comboMode = false;

	enemies = CloneArray(enemies);

	AddEffect(function* ()
	{
		while (@@_Busy == 2)
		{
			yield 1;
		}
		@@_Busy = true;

		for (var<Enemy_t> enemy of enemies)
		{
			enemy.@@_Reached = 0;
		}

		baseEnemy.@@_Reached = 1;

		@@_A_Reached(baseEnemy);

		for (var<boolean> extended = true; extended; )
		{
			extended = false;

			for (var<Enemy_t> enemy of enemies)
			{
				if (enemy.@@_Reached == 1)
				{
					enemy.@@_Reached = 2;
					@@_Extend(enemies, enemy, baseEnemy.Color);
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

		if (3 <= count)
		{
			for (var<int> w = 0; w < 30; w++) // �E�F�C�g
			{
				yield 1;
			}

			if (!@@_Combo) // ? �R���{�������ł͂Ȃ� -> ���j����B
			{
				for (var<Enemy_t> enemy of enemies)
				{
					if (enemy.@@_Reached == 2)
					{
						KillEnemy(enemy);

						/*
						for (var<int> w = 0; w < 5; w++) // �E�F�C�g
						{
							yield 1;
						}
						*/
						yield 1;
					}
				}
			}
		}

		@@_Busy = false;
		@@_Combo = false;
	}());
}

function <void> @@_Extend(<Enemy_t[]> enemies, <Enemy_t> baseEnemy, <BallColor_e> targetColor)
{
	for (var<Enemy_t> enemy of enemies)
	{
		if (
			enemy.@@_Reached == 0 &&
			enemy.Color == targetColor &&
			Math.abs(enemy.X - baseEnemy.X) < @@_EXPLODE_R &&
			Math.abs(enemy.Y - baseEnemy.Y) < @@_EXPLODE_R &&
			GetDistance(enemy.X - baseEnemy.X, enemy.Y - baseEnemy.Y) < @@_EXPLODE_R
			)
		{
			enemy.@@_Reached = 1;

			@@_A_Reached(enemy);
		}
	}
}

function <void> @@_A_Reached(<Enemy_t> enemy)
{
	AddEffect(function* ()
	{
		for (var<Scene_t> scene of CreateScene(20))
		{
			Draw(
				P_Balls[enemy.Color],
				enemy.X,
				enemy.Y,
				1.0 * scene.RemRate,
				0.0,
				2.0 + 3.0 * scene.Rate,
				);

			yield 1;
		}
	}());
}
