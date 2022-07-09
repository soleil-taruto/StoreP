/*
	�G - E0005
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

		// ��������ŗL

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

		if (FIELD_H + 50.0 < enemy.Y)
		{
			break;
		}

		EnemyCommon_Draw(enemy);

		yield 1;
	}
}

function <void> @@_Dead(<Enemy_t> enemy)
{
	EnemyCommon_AddScore(500);
	EnemyCommon_Dead(enemy);
}
