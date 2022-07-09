/*
	“G - E0006
*/

function <Enemy_t> CreateEnemy_E0006(<double> x, <double> y, <int> hp)
{
	var ret =
	{
		Kind: Enemy_Kind_e_E0006,
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
	while (enemy.Y < FIELD_H && enemy.Y < PlayerY)
	{
		enemy.Y += 5.0;

		yield @@_DrawYield(enemy);
	}

	var<double> xAdd = 6.0;

	if (PlayerX < enemy.X)
	{
		xAdd *= -1;
	}

	while (0.0 < enemy.X && enemy.X < FIELD_W)
	{
		enemy.X += xAdd;

		yield @@_DrawYield(enemy);
	}
}

function <int> @@_DrawYield(<Enemy_t> enemy)
{
	EnemyCommon_Draw(enemy);
	return 1;
}

function <void> @@_Dead(<Enemy_t> enemy)
{
	EnemyCommon_AddScore(600);
	EnemyCommon_Dead(enemy);
}
