/*
	�G - �����`�u���b�N
*/

function <Enemy_t> CreateEnemy_SquareBlock(<double> x, <double> y, <int> hp, <Enemy_Block_Kind_e> b_kind)
{
	var ret =
	{
		Kind: Enemy_Kind_e_SQUARE,
		X: x,
		Y: y,
		HP: hp,
		Crash: null,

		// ��������ŗL

		<Enemy_Block_Kind_e> B_Kind: b_kind,
	};

	ret.Draw = @@_Draw(ret);
	ret.Dead = @@_Dead;

	return ret;
}

function* <generatorForTask> @@_Draw(<Enemy_t> enemy)
{
	for (; ; )
	{
		enemy.Y += ProcFrame % 2;

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

		if (enemy.B_Kind == Enemy_Block_Kind_e_SOFT)
		{
			picture = P_Square_Soft;
		}
		else if (enemy.B_Kind == Enemy_Block_Kind_e_NORM)
		{
			picture = P_Square_Norm;
		}
		else if (enemy.B_Kind == Enemy_Block_Kind_e_HARD)
		{
			picture = P_Square_Hard;
		}
		else
		{
			error();
		}

		Draw(picture, enemy.X, enemy.Y, 1.0, 0.0, 1.0);

		var<string> text = "" + enemy.HP;

		SetColor(I3ColorToString(CreateI3Color(255, 255, 255)));
		SetPrint(enemy.X - 6 * text.length, enemy.Y + 8, 0);
		SetFSize(20);
		PrintLine(text);

		yield 1;
	}
}

function <void> @@_Dead(<Enemy_t> enemy)
{
	EnemyCommon_Dead(enemy);
}
