/*
	�G - �~�`�u���b�N
*/

/*
	����

	(x, y): �ʒu
	hp: �̗�
	-- 1�`
	kind: ���
	-- 1 == SOFT
	-- 2 == NORM
	-- 3 == HARD
*/
function <Enemy_t> CreateEnemy_CircleBlock(<double> x, <double> y, <int> hp, <int> kind)
{
	var ret =
	{
		X: x,
		Y: y,
		HP: hp,
		Crash: null,

		// ��������ŗL

		<int> Kind: kind,
	};

	ret.Draw = @@_Draw(ret);
	ret.Dead = @@_Dead;

	return ret;
}

function* <generatorForTask> @@_Draw(<Enemy_t> enemy)
{
	enemy.Y++;

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

function <void> @@_Dead(<Enemy_t> enemy)
{
	// TODO
}
