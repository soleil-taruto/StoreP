/*
	敵 - スタート地点
*/

function <Enemy_t> CreateEnemy_Start(<double> x, <double> y, <int> hp)
{
	var ret =
	{
		Kind: Enemy_Kind_e_Start,
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
		enemy.Crash = null; // 当たり判定無し

		// 描画無し

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
