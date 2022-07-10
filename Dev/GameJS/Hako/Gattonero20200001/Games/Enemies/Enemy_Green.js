/*
	—Î“G
*/

function <Enemy_t> CreateEnemy_Green(<double> x, <double> y, <int> rotDirect, <double> initAngle)
{
	var<double> ROT_SPEED = Math.PI / 40.0;

	var ret =
	{
		Kind: Enemy_Kind_e_Green,
		X: x,
		Y: y,
		HP: 1,
		Crash: null,

		// ‚±‚±‚©‚çŒÅ—L

		<double> RotSpeed: ROT_SPEED * rotDirect,
		<double> Angle: initAngle,
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

		Draw(P_Enemy_G, enemy.X, enemy.Y, 1.0, 0.0, 1.0);

		yield 1;
	}
}

function <void> @@_Dead(<Enemy_t> enemy)
{
	EnemyCommon_Dead(enemy);
}
