/*
	“G - E0002
*/

function <Enemy_t> CreateEnemy_E0002(<double> x, <double> y, <int> hp)
{
	var ret =
	{
		Kind: Enemy_Kind_e_E0002,
		X: x,
		Y: y,
		HP: hp,
		Crash: null,

		// ‚±‚±‚©‚çŒÅ—L
	};

	ret.Draw = @@_Draw(ret);
	ret.Dead = @@_Dead;

	return ret;
}

function* <generatorForTask> @@_Draw(<Enemy_t> enemy)
{
	while (enemy.Y < FIELD_B && enemy.Y < PlayerY)
	{
		enemy.Y += 4.0;

		yield @@_DrawYield(enemy);
	}
	while (FIELD_L < enemy.Y)
	{
		{
			var<double> X_ADD = 2.0;

			if (Math.abs(enemy.X - PlayerX) < X_ADD)
			{
				break;
			}

			if (enemy.X < PlayerX)
			{
				enemy.X += X_ADD;
			}
			else
			{
				enemy.X -= X_ADD;
			}
		}

		enemy.Y -= 4.0;

		yield @@_DrawYield(enemy);
	}
	while (enemy.Y < FIELD_B)
	{
		enemy.Y += 4.0;

		yield @@_DrawYield(enemy);
	}
}

function <int> @@_DrawYield(<Enemy_t> enemy)
{
	enemy.Crash = CreateCrash_Circle(enemy.X, enemy.Y, 50.0);

	Draw(P_Enemy0002, enemy.X, enemy.Y, 1.0, 0.0, 1.0);

	return 1;
}

function <void> @@_Dead(<Enemy_t> enemy)
{
	EnemyCommon_Dead(enemy);
}
