/*
	敵 - 正方形ブロック
*/

/// Enemy_SquareBlock_Kind_e
//
var<int> Enemy_SquareBlock_Kind_e_SOFT = @(AUTO);
var<int> Enemy_SquareBlock_Kind_e_NORM = @(AUTO);
var<int> Enemy_SquareBlock_Kind_e_HARD = @(AUTO);

function <Enemy_t> CreateEnemy_SquareBlock(<double> x, <double> y, <int> hp, <Enemy_SquareBlock_Kind_e> kind)
{
	var ret =
	{
		X: x,
		Y: y,
		HP: hp,
		Crash: null,

		// ここから固有

		<Enemy_SquareBlock_Kind_e> Kind: kind,
	};

	ret.Draw = @@_Draw(ret);
	ret.Dead = @@_Dead;

	return ret;
}

function* <generatorForTask> @@_Draw(<Enemy_t> enemy)
{
	for (; ; )
	{
		enemy.Y++;

		// 当たり判定_設置
		{
			var<double> BLOCK_W = 60;
			var<double> BLOCK_H = 60;

			enemy.Crash = CreateCrash_Rect(CreateD4Rect(enemy.X - BLOCK_W / 2, enemy.Y - BLOCK_H / 2, BLOCK_W, BLOCK_H));
		}

		// ====
		// 描画ここから
		// ====

		var<Image> picture;

		if (enemy.Kind == Enemy_SquareBlock_Kind_e_SOFT)
		{
			picture = P_Square_Soft;
		}
		else if (enemy.Kind == Enemy_SquareBlock_Kind_e_NORM)
		{
			picture = P_Square_Norm;
		}
		else if (enemy.Kind == Enemy_SquareBlock_Kind_e_HARD)
		{
			picture = P_Square_Hard;
		}
		else
		{
			error();
		}

		Draw(picture, enemy.X, enemy.Y, 1.0, 0.0, 1.0);

		yield 1;
	}
}

function <void> @@_Dead(<Enemy_t> enemy)
{
	// TODO
}
