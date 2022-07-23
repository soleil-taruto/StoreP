/*
	���e - Normal(�ʏ�e)
*/

function <Shot_t> CreateShot_Normal(<doule> x, <double> y, <double> angle, <double> speed)
{
	var ret =
	{
		Kind: "@@",
		X: x,
		Y: y,
		AttackPoint: 1,
		Crash: null,

		// ��������ŗL

		<double> Angle: angle,
		<double> Speed: speed,
	};

	ret.Draw = @@_Draw(ret);
	ret.Dead = @@_Dead;

	return ret;
}

function <boolean> IsShot_Normal(<Enemy_t> enemy)
{
	return enemy.Kind == "@@";
}

function* <generatorForTask> @@_Draw(<Shot_t> shot)
{
	for (; ; )
	{
		var<D2Point_t> speed = AngleToPoint(shot.Angle, shot.Speed);

		shot.X += speed.X;
		shot.Y += speed.Y;

		if (IsOut(
			CreateD2Point(shot.X, shot.Y),
			CreateD4Rect(FIELD_L, FIELD_T, FIELD_W, FIELD_H),
			20.0
			))
		{
			break;
		}

		shot.Crash = CreateCrash_Circle(shot.X, shot.Y, 16.0);

		Draw(P_Shot0001, shot.X, shot.Y, 1.0, shot.Angle, 1.0);

		yield 1;
	}
}

function <void> @@_Dead(<Shot_t> shot)
{
	ShotCommon_Dead(shot);
}
