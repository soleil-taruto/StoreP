/*
	ê¬ìG
*/

function <Enemy_t> CreateEnemy_Blue(<double> x, <double> y, <int> initDirectX, <int> initDirectY)
{
	var<double> SPEED = 3.0;

	if (initDirectX * initDirectY != 0) // ? éŒÇﬂà⁄ìÆ
	{
		SPEED = 2.0;
	}

	var ret =
	{
		Kind: Enemy_Kind_e_Blue,
		X: x,
		Y: y,
		HP: 1,
		Crash: null,

		// Ç±Ç±Ç©ÇÁå≈óL

		<double> XSpeed: SPEED * initDirectX,
		<double> YSpeed: SPEED * initDirectY,
	};

	ret.Draw = @@_Draw(ret);
	ret.Dead = @@_Dead;

	return ret;
}

function* <generatorForTask> @@_Draw(<Enemy_t> enemy)
{
	for (; ; )
	{
		enemy.X += enemy.XSpeed;
		enemy.Y += enemy.YSpeed;

		if (GetMapCell(ToTablePoint_XY(enemy.X - TILE_W / 2.0, enemy.Y)).WallFlag)
		{
			enemy.XSpeed = Math.abs(enemy.XSpeed);
		}
		if (GetMapCell(ToTablePoint_XY(enemy.X + TILE_W / 2.0, enemy.Y)).WallFlag)
		{
			enemy.XSpeed = Math.abs(enemy.XSpeed) * -1.0;
		}
		if (GetMapCell(ToTablePoint_XY(enemy.X, enemy.Y - TILE_H / 2.0)).WallFlag)
		{
			enemy.YSpeed = Math.abs(enemy.YSpeed);
		}
		if (GetMapCell(ToTablePoint_XY(enemy.X, enemy.Y + TILE_H / 2.0)).WallFlag)
		{
			enemy.YSpeed = Math.abs(enemy.YSpeed) * -1.0;
		}

		enemy.Crash = CreateCrash_Rect(CreateD4Rect_XYWH(enemy.X, enemy.Y, TILE_W, TILE_H));

		Draw(P_Enemy_B, enemy.X, enemy.Y, 1.0, 0.0, 1.0);

		yield 1;
	}
}

function <void> @@_Dead(<Enemy_t> enemy)
{
	EnemyCommon_Dead(enemy);
}
