/*
	“G - E0005
*/

function <Enemy_t> CreateEnemy_E0005(<double> x, <double> y, <int> hp)
{
	var ret =
	{
		Kind: Enemy_Kind_e_E0005,
		X: x,
		Y: y,
		HP: hp,
		Crash: null,

		// ‚±‚±‚©‚çŒÅ—L

		<double> YAdd: 2.0,
	};

	ret.Draw = @@_Draw(ret);
	ret.Dead = @@_Dead;

	return ret;
}

function* <generatorForTask> @@_Draw(<Enemy_t> enemy)
{
	for (; ; )
	{
		var<boolean> underOfPlayer = PlayerY < enemy.Y;

		if (underOfPlayer)
		{
			enemy.YAdd -= 0.1;
			enemy.YAdd = Math.max(enemy.YAdd, 2.0);
		}
		else
		{
			enemy.YAdd += 0.1;
		}

		enemy.Y += enemy.YAdd;

		if (FIELD_B + 50.0 < enemy.Y)
		{
			break;
		}

		enemy.Crash = CreateCrash_Circle(enemy.X, enemy.Y, 50.0);

		Draw(P_Enemy0005, enemy.X, enemy.Y, 1.0, 0.0, 1.0);

		yield 1;
	}
}

function <void> @@_Dead(<Enemy_t> enemy)
{
	EnemyCommon_Dead(enemy);
}
