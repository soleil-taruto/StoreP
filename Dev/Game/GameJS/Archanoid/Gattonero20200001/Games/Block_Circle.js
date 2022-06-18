/*
	�u���b�N - �~�`�u���b�N
*/

function <Block_t> CreateBlock_Circle(<double> x, <double> y, <int> hp, <int> kind)
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
	// �����蔻��_�ݒu
	{
		var<double> BLOCK_RAD = 30;

		block.Crash = CreateCrash_Circle(block.X, block.Y, BLOCK_RAD);
	}

	// ====
	// �`�悱������
	// ====

	var<Image> picture;

	if (block.Kind == 1)
	{
		picture = P_Circle_Soft;
	}
	else if (block.Kind == 2)
	{
		picture = P_Circle_Norm;
	}
	else if (block.Kind == 3)
	{
		picture = P_Circle_Hard;
	}
	else
	{
		error();
	}

	Draw(picture, block.X, block.Y, 1.0, 0.0, 1.0);
}
