/*
	敵 - 正方形ブロック
*/

/*
	生成

	(x, y): 位置
	hp: 体力
	-- 1～
	kind: 種類
	-- 1 == SOFT
	-- 2 == NORM
	-- 3 == HARD
*/
function <Enemy_t> CreateEnemy_SquareBlock(<double> x, <double> y, <int> hp, <int> kind)
{
	var ret =
	{
		X: x,
		Y: y,
		HP: hp,
		Crash: null,

		// ここから固有

		<int> Kind: kind,
	};

	ret.Draw = @@_Draw(ret);
	ret.Dead = @@_Dead;

	return ret;
}

function* <generatorForTask> @@_Draw(<Enemy_t> enemy)
{
	enemy.Y++;

	// 当たり判定_設置
	{
		var<double> BLOCK_W = 60;
		var<double> BLOCK_H = 60;

		block.Crash = CreateCrash_Rect(CreateD4Rect(block.X - BLOCK_W / 2, block.Y - BLOCK_H / 2, BLOCK_W, BLOCK_H));
	}

	// ====
	// 描画ここから
	// ====

	var<Image> picture;

	if (block.Kind == 1)
	{
		picture = P_Square_Soft;
	}
	else if (block.Kind == 2)
	{
		picture = P_Square_Norm;
	}
	else if (block.Kind == 3)
	{
		picture = P_Square_Hard;
	}
	else
	{
		error();
	}

	Draw(picture, block.X, block.Y, 1.0, 0.0, 1.0);
}

function <void> @@_Dead(<Enemy_t> enemy)
{
	// TODO
}
