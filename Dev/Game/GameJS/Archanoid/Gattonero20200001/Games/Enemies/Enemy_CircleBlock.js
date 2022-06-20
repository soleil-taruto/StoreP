/*
	敵 - 円形ブロック
*/

/// Enemy_CircleBlock_Kind_e
//
var<int> Enemy_CircleBlock_Kind_e_SOFT = @(AUTO);
var<int> Enemy_CircleBlock_Kind_e_NORM = @(AUTO);
var<int> Enemy_CircleBlock_Kind_e_HARD = @(AUTO);

function <Enemy_t> CreateEnemy_CircleBlock(<double> x, <double> y, <int> hp, <Enemy_CircleBlock_Kind_e> kind)
{
	var ret =
	{
		X: x,
		Y: y,
		HP: hp,
		Crash: null,
		Name: "CIRCLE",

		// ここから固有

		<Enemy_CircleBlock_Kind_e> Kind: kind,
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
			var<double> BLOCK_RAD = 30;

			enemy.Crash = CreateCrash_Circle(enemy.X, enemy.Y, BLOCK_RAD);
		}

		// ====
		// 描画ここから
		// ====

		var<Image> picture;

		if (enemy.Kind == Enemy_CircleBlock_Kind_e_SOFT)
		{
			picture = P_Circle_Soft;
		}
		else if (enemy.Kind == Enemy_CircleBlock_Kind_e_NORM)
		{
			picture = P_Circle_Norm;
		}
		else if (enemy.Kind == Enemy_CircleBlock_Kind_e_HARD)
		{
			picture = P_Circle_Hard;
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
