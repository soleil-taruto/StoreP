/*
	�G - �G�e
*/

function <Enemy_t> CreateEnemy_Tama(<double> x, <double> y, <double> xAdd, <double> yAdd)
{
	var ret =
	{
		Kind: Enemy_Kind_e_Tama,
		X: x,
		Y: y,
		HP: 0,
		Crash: null,

		// ��������ŗL

		<double> XAdd: xAdd,
		<double> YAdd: yAdd,
	};

	ret.Draw = @@_Draw(ret);
	ret.Damaged = @@_Damaged;
	ret.Dead = @@_Dead;

	return ret;
}

function* <generatorForTask> @@_Draw(<Enemy_t> enemy)
{
	for (var<int> frame = 0; ; frame++)
	{
		enemy.X += enemy.XAdd;
		enemy.Y += enemy.YAdd;

		if (IsOut(
			CreateD2Point(enemy.X, enemy.Y),
			CreateD4Rect(FIELD_L, FIELD_T, FIELD_W, FIELD_H),
			50.0
			))
		{
			break;
		}

		enemy.Crash = CreateCrash_Circle(enemy.X, enemy.Y, 16.0);

		Draw(P_Tama0001, enemy.X, enemy.Y, 1.0, frame / 13.0, 1.0);

		yield 1;
	}
}

function <void> @@_Damaged(<Enemy_t> enemy, <int> damagePoint)
{
	// noop
}

function <void> @@_Dead(<Enemy_t> enemy)
{
	EnemyCommon_Dead(enemy);
}
