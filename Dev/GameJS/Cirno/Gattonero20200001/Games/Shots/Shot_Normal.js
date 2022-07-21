/*
	é©íe - Normal(í èÌíe)
*/

function <Shot_t> CreateShot_Normal(<doule> x, <double> y, <boolean> facingLeft)
{
	var<double> speed = 10.0;

	if (facingLeft)
	{
		speed *= -1.0;
	}

	var ret =
	{
		Kind: Shot_Kind_e_Normal,
		X: x,
		Y: y,
		AttackPoint: 1,
		Crash: null,

		// Ç±Ç±Ç©ÇÁå≈óL

		<double> Speed: speed,
	};

	ret.Draw = @@_Draw(ret);
	ret.Dead = @@_Dead;

	return ret;
}

function* <generatorForTask> @@_Draw(<Shot_t> shot)
{
	var<double> SHOT_R = 5.0;

	for (; ; )
	{
		shot.X += shot.Speed;

		if (IsOutOfCamera(CreateD2Point(shot.X, shot.Y), 0.0))
		{
			break;
		}

		if (GetMapCell(ToTablePoint_XY(shot.X, shot.Y)).Tile.WallFlag)
		{
			KillShot(shot);
			break;
		}

		shot.Crash = CreateCrash_Circle(shot.X, shot.Y, SHOT_R);

		SetColor(I3ColorToString(CreateI3Color(0, 255, 128)));
		PrintCircle(shot.X - Camera.X, shot.Y - Camera.Y, SHOT_R);

		yield 1;
	}
}

function <void> @@_Dead(<Shot_t> shot)
{
	ShotCommon_Dead(shot);
}
