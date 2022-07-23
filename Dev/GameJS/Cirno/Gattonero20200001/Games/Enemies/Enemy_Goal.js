/*
	敵 - スタート地点
*/

var<int> EnemyKind_Goal = @(AUTO);

function <Enemy_t> CreateEnemy_Goal(<double> x, <double> y, <int> hp)
{
	var ret =
	{
		Kind: EnemyKind_Goal,
		X: x,
		Y: y,
		HP: hp,
		Crash: null,

		// ここから固有
	};

	ret.Draw = @@_Draw(ret);
	ret.Damaged = @@_Damaged;
	ret.Dead = @@_Dead;

	return ret;
}

function* <generatorForTask> @@_Draw(<Enemy_t> enemy)
{
	for (; ; )
	{
		var<double> ZURE_X = 0.0;
		var<double> ZURE_Y = -10.0;

		enemy.Crash = CreateCrash_Circle(enemy.X + ZURE_X, enemy.Y + ZURE_Y, 40.0);

		Draw(P_Goal, enemy.X + ZURE_X, enemy.Y + ZURE_Y, 1.0, 0.0, 1.0);

		yield 1;
	}
}

function <void> @@_Damaged(<Enemy_t> enemy, <int> damagePoint)
{
	// none
}

function <void> @@_Dead(<Enemy_t> enemy)
{
	// none
}
