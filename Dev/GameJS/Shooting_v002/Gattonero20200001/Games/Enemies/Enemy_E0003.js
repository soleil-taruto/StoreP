/*
	“G - E0003
*/

function <Enemy_t> CreateEnemy_E0003(<double> x, <double> y, <int> hp)
{
	var ret =
	{
		Kind: Enemy_Kind_e_E0003,
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
	while (enemy.Y < FIELD_B)
	{
		for (var<int> c = 0; c < 20; c++)
		{
			enemy.Y += 3.0;

			yield @@_DrawYield(enemy);
		}
		for (var<int> c = 0; c < 20; c++)
		{
			enemy.X += 5.0;

			yield @@_DrawYield(enemy);
		}
		for (var<int> c = 0; c < 20; c++)
		{
			enemy.Y += 3.0;

			yield @@_DrawYield(enemy);
		}
		for (var<int> c = 0; c < 20; c++)
		{
			enemy.X -= 5.0;

			yield @@_DrawYield(enemy);
		}
	}
}

function <int> @@_DrawYield(<Enemy_t> enemy)
{
	EnemyCommon_Draw(enemy);
	return 1;
}

function <void> @@_Dead(<Enemy_t> enemy)
{
	EnemyCommon_Dead(enemy);
}
