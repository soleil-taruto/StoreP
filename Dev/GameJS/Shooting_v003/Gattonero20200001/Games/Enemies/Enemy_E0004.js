/*
	�G - E0004
*/

function <Enemy_t> CreateEnemy_E0004(<double> x, <double> y, <int> hp)
{
	var<double> xg = 1.2;

	if (PlayerX < x)
	{
		xg *= -1;
	}

	var ret =
	{
		Kind: @(SRCN),
		X: x,
		Y: y,
		HP: hp,
		Crash: null,

		// ��������ŗL

		<double> XAdd: 0.0,
		<double> XAddAdd: xg,
	};

	ret.Draw = @@_Draw(ret);
	ret.Damaged = @@_Damaged;
	ret.Dead = @@_Dead;

	return ret;
}

function <boolean> IsEnemy_E0004(<Enemy_t> enemy)
{
	return enemy.Kind == @(SRCN);
}

function* <generatorForTask> @@_Draw(<Enemy_t> enemy)
{
	for (; ; )
	{
		var<boolean> underOfPlayer = PlayerY < enemy.Y;

		enemy.XAdd += enemy.XAddAdd * (underOfPlayer ? -1 : 1);
		enemy.X += enemy.XAdd;

		if (enemy.X < FIELD_L)
		{
			enemy.XAdd = Math.abs(enemy.XAdd);
		}
		if (FIELD_R < enemy.X)
		{
			enemy.XAdd = Math.abs(enemy.XAdd) * -1;
		}

		enemy.Y += 5.5;

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
	EnemyCommon_AddScore(400);
	EnemyCommon_Dead(enemy);
}
