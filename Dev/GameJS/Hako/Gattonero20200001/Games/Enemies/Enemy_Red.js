/*
	Â“G
*/

function <Enemy_t> CreateEnemy_Red(<double> x, <double> y, <int> initDirectX, <int> initDirectY)
{
	var ret =
	{
		Kind: Enemy_Kind_e_Red,
		X: x,
		Y: y,
		HP: 1,
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
		enemy.Crash = CreateCrash_Rect(CreateD4Rect_XYWH(enemy.X, enemy.Y, 50.0, 50.0));

		Draw(P_Enemy_R, enemy.X, enemy.Y, 1.0, 0.0, 1.0);

		yield 1;
	}
}

function <void> @@_Dead(<Enemy_t> enemy)
{
	EnemyCommon_Dead(enemy);
}
