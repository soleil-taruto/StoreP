/*
	“G - E0001
*/

function <Enemy_t> CreateEnemy_E0001(<double> x, <double> y, <int> hp)
{
	var ret =
	{
		X: x,
		Y: y,
		HP: hp,
		Crash: null,

		// ‚±‚±‚©‚çŒÅ—L

		<int> Kind: @(FPID),

		<double> XAdd: 0.0,
	};

	ret.Draw = @@_Draw(ret);
	ret.Damaged = @@_Damaged;
	ret.Dead = @@_Dead;

	return ret;
}

function <boolean> IsEnemy_E0001(<Enemy_t> enemy)
{
	return enemy.Kind == @(FPID);
}

function* <generatorForTask> @@_Draw(<Enemy_t> enemy)
{
	for (; ; )
	{
		{
			var<double> X_ADD_ADD = 0.1;

			if (FIELD_L + FIELD_W / 2 < enemy.X)
			{
				enemy.XAdd -= X_ADD_ADD;
			}
			else
			{
				enemy.XAdd += X_ADD_ADD;
			}
		}

		enemy.X += enemy.XAdd;
		enemy.Y += 3.0;

		if (FIELD_B + 50.0 < enemy.Y)
		{
			break;
		}

		EnemyCommon_Draw(enemy);

		yield 1;
	}
}

function <void> @@_Damaged(<Enemy_t> enemy, <int> damagePoint)
{
	EnemyCommon_Damaged(enemy, damagePoint);
}

function <void> @@_Dead(<Enemy_t> enemy)
{
	EnemyCommon_AddScore(100);
	EnemyCommon_Dead(enemy);
}
