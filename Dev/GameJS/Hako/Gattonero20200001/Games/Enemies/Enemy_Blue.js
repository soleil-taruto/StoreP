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

		var<boolean> b2 = false;
		var<boolean> b4 = false;
		var<boolean> b6 = false;
		var<boolean> b8 = false;

		var<double> ARM = TILE_W / 2.0 - 0.001;

		if (@@_IsWall(GetMapCell(ToTablePoint_XY(enemy.X - ARM, enemy.Y))))
		{
			b4 = true;
		}
		if (@@_IsWall(GetMapCell(ToTablePoint_XY(enemy.X + ARM, enemy.Y))))
		{
			b6 = true;
		}
		if (@@_IsWall(GetMapCell(ToTablePoint_XY(enemy.X, enemy.Y - ARM))))
		{
			b8 = true;
		}
		if (@@_IsWall(GetMapCell(ToTablePoint_XY(enemy.X, enemy.Y + ARM))))
		{
			b2 = true;
		}

		if (!(b2 || b4 || b6 || b8))
		{
			if (@@_IsWall(GetMapCell(ToTablePoint_XY(enemy.X - ARM, enemy.Y - ARM))))
			{
				b4 = true;
				b8 = true;
			}
			if (@@_IsWall(GetMapCell(ToTablePoint_XY(enemy.X + ARM, enemy.Y - ARM))))
			{
				b6 = true;
				b8 = true;
			}
			if (@@_IsWall(GetMapCell(ToTablePoint_XY(enemy.X - ARM, enemy.Y + ARM))))
			{
				b2 = true;
				b4 = true;
			}
			if (@@_IsWall(GetMapCell(ToTablePoint_XY(enemy.X + ARM, enemy.Y + ARM))))
			{
				b2 = true;
				b6 = true;
			}
		}

		if (b4)
		{
			enemy.XSpeed = Math.abs(enemy.XSpeed);
			enemy.X = @@_BounceX(enemy.X);
		}
		if (b6)
		{
			enemy.XSpeed = Math.abs(enemy.XSpeed) * -1.0;
			enemy.X = @@_BounceX(enemy.X);
		}
		if (b8)
		{
			enemy.YSpeed = Math.abs(enemy.YSpeed);
			enemy.Y = @@_BounceY(enemy.Y);
		}
		if (b2)
		{
			enemy.YSpeed = Math.abs(enemy.YSpeed) * -1.0;
			enemy.Y = @@_BounceY(enemy.Y);
		}

		enemy.Crash = CreateCrash_Rect(CreateD4Rect_XYWH(enemy.X, enemy.Y, TILE_W, TILE_H));

		Draw(P_Enemy_B, enemy.X, enemy.Y, 1.0, 0.0, 1.0);

		yield 1;
	}
}

function <boolean> @@_IsWall(<MapCell_t> cell)
{
	return cell.WallFlag || cell.NarrowFlag;
}

function <double> @@_BounceX(<double> x)
{
	return ToTileCenterX(x) * 2.0 - x;
}

function <double> @@_BounceY(<double> y)
{
	return ToTileCenterY(y) * 2.0 - y;
}

function <void> @@_Dead(<Enemy_t> enemy)
{
	EnemyCommon_Dead(enemy);
}
