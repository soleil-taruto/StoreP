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

		enemy.Crash = CreateCrash_Circle(enemy.X, enemy.Y, BLOCK_RAD);
	}

	// ====
	// �`�悱������
	// ====

	var<Image> picture;

	if (enemy.Kind == 1)
	{
		picture = P_Circle_Soft;
	}
	else if (enemy.Kind == 2)
	{
		picture = P_Circle_Norm;
	}
	else if (enemy.Kind == 3)
	{
		picture = P_Circle_Hard;
	}
	else
	{
		error();
	}

	Draw(picture, enemy.X, enemy.Y, 1.0, 0.0, 1.0);
}

function <void> @@_Dead(<Enemy_t> enemy)
{
	// TODO
}
