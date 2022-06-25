/*
	é©íe - Normal(í èÌíe)
*/

function <Shot_t> CreateShot_Normal(<doule> x, <double> y, <double> angle, <double> speed)
{
	var ret =
	{
		Kind: Shot_Kind_e_Normal,
		X: x,
		Y: y,
		AttackPoint: 1,
		Crash: null,

		// Ç±Ç±Ç©ÇÁå≈óL

		<double> Angle: angle,
		<double> Speed: speed,
	};

	ret.Draw = @@_Draw(ret);
	ret.Dead = @@_Dead;

	return ret;
}

function* <generatorForTask> @@_Draw(<Shot_t> shot)
{
	for (; ; )
	{
		D2Point_t speed = AngleToPoint(shot.Angle, shot.Speed);

		shot.X += speed.XAdd;
		shot.Y += speed.YAdd;

		shot.Crash = CreateCrash_Circle(shot.X, shot.Y, 10.0);

		Draw(P_Shot0001, shot.X, shot.Y, 1.0, shot.Angle, 1.0);

		yield 1;
	}
}

function <void> @@_Dead(<Shot_t> shot)
{
	ShotCommon_Dead(shot);
}
