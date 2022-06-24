/*
	Ž©’e - Dummy
*/

function <Shot_t> CreateShot_Dummy(<doule> x, <double> y, <double> xAdd, <double> yAdd)
{
	var ret =
	{
		Kind: Shot_Kind_e_DUMMY,
		X: x,
		Y: y,
		AttackPoint: 1,
		Crash: null,

		// ‚±‚±‚©‚çŒÅ—L

		<double> XAdd: xAdd,
		<double> YAdd: yAdd,
	};

	ret.Draw = @@_Draw(ret);
	ret.Dead = @@_Dead;

	return ret;
}

function* <generatorForTask> @@_Draw(<Shot_t> shot)
{
	for (; ; )
	{
		shot.X += shot.XAdd;
		shot.Y += shot.YAdd;

		shot.Crash = CreateCrash_Circle(shot.X, shot.Y, 25.0);

		Draw(P_Balls[shot.Color], shot.X, shot.Y, 1.0, ProcFrame / 20.0, 1.0);

		yield 1;
	}
}

function <void> @@_Dead(<Shot_t> shot)
{
	ShotCommon_Dead(shot);
}
