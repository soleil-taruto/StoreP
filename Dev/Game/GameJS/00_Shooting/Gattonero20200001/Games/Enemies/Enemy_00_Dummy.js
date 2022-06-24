/*
	ìG - É{Å[Éã
*/

function <Enemy_t> CreateEnemy_00_Dummy(<double> x, <double> y, <int> hp)
{
	var ret =
	{
		Kind: Enemy_Kind_e_00_DUMMY,
		X: x,
		Y: y,
		HP: hp,
		Crash: null,

		// Ç±Ç±Ç©ÇÁå≈óL

		<double> Dummy_01: 1.0,
		<double> Dummy_02: 2.0,
		<double> Dummy_03: 3.0,
	};

	ret.Draw = @@_Draw(ret);
	ret.Dead = @@_Dead;

	return ret;
}

function* <generatorForTask> @@_Draw(<Enemy_t> enemy)
{
	for (; ; )
	{
		enemy.Crash = CreateCrash_Rect(CreateD4Rect_XYWH(enemy.X, enemy.Y, 50.0, 50.0));

		Draw(P_Dummy, enemy.X, enemy.Y, 1.0, 0.0, 1.0);

		yield 1;
	}
}

function <void> @@_Dead(<Enemy_t> enemy)
{
	EnemyCommon_Dead(enemy);
}
