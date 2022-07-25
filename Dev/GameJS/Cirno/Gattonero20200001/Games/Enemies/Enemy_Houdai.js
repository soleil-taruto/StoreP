/*
	“G - Houdai
*/

var<int> EnemyKind_Houdai = @(AUTO);

function <Enemy_t> CreateEnemy_Houdai(<double> x, <double> y)
{
	var ret =
	{
		Kind: EnemyKind_Houdai,
		X: x,
		Y: y,
		HP: 1,
		AttackPoint: 1,
		HitDie: false,
		Crash: null,

		// ‚±‚±‚©‚çŒÅ—L

		<int> GroundDir: -1, // Ú’n–Ê, ‚Ç‚Ì•ûŒü‚ÉÚ’n–Ê‚ª‚ ‚é‚© (2468-•û®)
	};

	ret.Draw = @@_Draw(ret);
	ret.Damaged = @@_Damaged;
	ret.Dead = @@_Dead;

	return ret;
}

function* <generatorForTask> @@_Draw(<Enemy_t> enemy)
{
	{
		var<I2Point_t> pt = ToTablePoint_XY(enemy.X, enemy.Y);
		var<int> dir;

		if (GetMapCell_XY(pt.X - 1, pt.Y).Tile.WallFlag)
		{
			dir = 4;
		}
		else if (GetMapCell_XY(pt.X + 1, pt.Y).Tile.WallFlag)
		{
			dir = 6;
		}
		else if (GetMapCell_XY(pt.X, pt.Y - 1).Tile.WallFlag)
		{
			dir = 8;
		}
		else if (GetMapCell_XY(pt.X, pt.Y + 1).Tile.WallFlag)
		{
			dir = 2;
		}
		else
		{
			error();
		}

		enemy.GroundDir = dir;
	}

	AddEffectWhile(() => enemy.HP != -1, @@_AttackTask(enemy));

	for (; ; )
	{
		enemy.Crash = CreateCrash_Rect(CreateD4Rect_XYWH(enemy.X, enemy.Y, 50.0, 50.0));

		var<double> rot;

		switch (enemy.GroundDir)
		{
		case 2: rot = (Math.PI / 2.0) * 0.0; break;
		case 4: rot = (Math.PI / 2.0) * 1.0; break;
		case 8: rot = (Math.PI / 2.0) * 2.0; break;
		case 6: rot = (Math.PI / 2.0) * 3.0; break;

		default:
			error(); // never
		}

		Draw(P_Enemy_Houdai, enemy.X - Camera.X, enemy.Y - Camera.Y, 1.0, rot, 1.0);

		yield 1;
	}
}

function* <generatorForTask> @@_AttackTask(<Enemy_t> enemy)
{
	for (; ; )
	{
		for (var<int> waitFrm of [ 90, 30, 30, 30 ])
		{
			yield* Wait(waitFrm);

			@@_Shoot(enemy);
		}
	}
}

function <void> @@_Shoot(<Enemy_t> enemy)
{
	var<double> rot;

	switch (enemy.GroundDir)
	{
	case 2: rot = (Math.PI / 2.0) * 3.0; break;
	case 4: rot = (Math.PI / 2.0) * 0.0; break;
	case 8: rot = (Math.PI / 2.0) * 1.0; break;
	case 6: rot = (Math.PI / 2.0) * 2.0; break;

	default:
		error(); // never
	}

	var<double> SPEED = 7.0;

	GetEnemies().push(CreateEnemy_Tama_AngleSpeed(enemy.X, enemy.Y, rot - Math.PI / 4.0 , SPEED));
	GetEnemies().push(CreateEnemy_Tama_AngleSpeed(enemy.X, enemy.Y, rot                 , SPEED));
	GetEnemies().push(CreateEnemy_Tama_AngleSpeed(enemy.X, enemy.Y, rot + Math.PI / 4.0 , SPEED));
}

function <void> @@_Damaged(<Enemy_t> enemy, <int> damagePoint)
{
	EnemyCommon_Damaged(enemy, damagePoint);
}

function <void> @@_Dead(<Enemy_t> enemy)
{
	EnemyCommon_Dead(enemy);
}
