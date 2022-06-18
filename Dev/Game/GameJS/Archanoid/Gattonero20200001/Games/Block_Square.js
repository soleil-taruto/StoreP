/*
	ブロック - 正方形ブロック
*/

function <Block_t> CreateBlock_Square(<double> x, <double> y, <int> hp, <int> kind)
{
	var ret =
	{
		X: x,
		Y: y,
		HP: hp,
		Kind: kind,
		Crash: null,
	};

	ret.Draw = @@_Draw(ret);

	return ret;
}

function* <generatorForTask> @@_Draw(<Block_t> block)
{
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
