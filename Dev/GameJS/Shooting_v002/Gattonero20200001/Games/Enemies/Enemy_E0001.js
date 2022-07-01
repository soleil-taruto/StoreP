/*
	“G - E0001
*/

function <Enemy_t> CreateEnemy_E0001(<double> x, <double> y, <int> hp)
{
	var ret =
	{
		Kind: Enemy_Kind_e_E0001,
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
	for (; ; )
	{
		enemy.Y += 3.0;

		if (FIELD_B + 50.0 < enemy.Y)
		{
			break;
		}

		enemy.Crash = CreateCrash_Circle(enemy.X, enemy.Y, 50.0);

		Draw(P_Enemy0001, enemy.X, enemy.Y, 1.0, 0.0, 1.0);

		yield 1;
	}
}

function <void> @@_Dead(<Enemy_t> enemy)
{
	EnemyCommon_Dead(enemy);
}
