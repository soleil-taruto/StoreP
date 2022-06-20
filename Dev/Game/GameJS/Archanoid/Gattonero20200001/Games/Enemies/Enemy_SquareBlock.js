/*
	�G - �����`�u���b�N
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
function <Enemy_t> CreateEnemy_SquareBlock(<double> x, <double> y, <int> hp, <int> kind)
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
	for (; ; )
	{
		enemy.Y++;

		// �����蔻��_�ݒu
		{
			var<double> BLOCK_W = 60;
			var<double> BLOCK_H = 60;

			enemy.Crash = CreateCrash_Rect(CreateD4Rect(enemy.X - BLOCK_W / 2, enemy.Y - BLOCK_H / 2, BLOCK_W, BLOCK_H));
		}

		// ====
		// �`�悱������
		// ====

		var<Image> picture;

		if (enemy.Kind == 1)
		{
			picture = P_Square_Soft;
		}
		else if (enemy.Kind == 2)
		{
			picture = P_Square_Norm;
		}
		else if (enemy.Kind == 3)
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
