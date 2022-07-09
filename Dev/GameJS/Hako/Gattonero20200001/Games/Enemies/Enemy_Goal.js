/*
	“G - ƒS[ƒ‹
*/

function <Enemy_t> CreateEnemy_Goal(<double> x, <double> y)
{
	var ret =
	{
		Kind: Enemy_Kind_e_Goal,
		X: x,
		Y: y,
		HP: 0,
		Crash: null,

		// ‚±‚±‚©‚çŒÅ—L
	};

	ret.Draw = @@_Draw(ret);
	ret.Dead = @@_Dead;

	return ret;
}

function* <generatorForTask> @@_Draw(<Enemy_t> enemy)
{
	for (var<int> frame = 0; ; frame++)
	{
		enemy.Crash = CreateCrash_Rect(CreateD4Rect_XYWH(enemy.X, enemy.Y, 40.0, 40.0));

		Draw(P_Goal, enemy.X, enemy.Y, 1.0, 0.1 * frame, 1.0);

		yield 1;
	}
}

function <void> @@_Dead(<Enemy_t> enemy)
{
	EnemyCommon_Dead(enemy);
}
