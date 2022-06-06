/*
	�G�e
*/

/@(ASTR)

/// Tama_t
{
	<double> X
	<double> Y
	<generatorForTask> Each
}

@(ASTR)/

function <Tama_t> CreateTama(<double> x, <double> y)
{
	var ret =
	{
		X: x,
		Y: y,
	};

	ret.Each = @@_Each(ret);

	return ret;
}

/*
	ret: ? ����
*/
function <boolean> Tama_Each(<Tama_t> tama)
{
	return tama.Each.next().value;
}

function* <generatorForTask> @@_Each(<Tama_t> tama)
{
	var speed = MakeXYSpeed(tama.X, tama.Y, Player_X, Player_Y, 3.0);
	var speedX = speed.X;
	var speedY = speed.Y;

	for (; ; )
	{
		tama.X += speedX;
		tama.Y += speedY;

		var MARGIN = 30.0;

		// ��ʊO�ɏo���̂őޏ�
		if (
			tama.X < -MARGIN || GetField_W() + MARGIN < tama.X ||
			tama.Y < -MARGIN || GetField_H() + MARGIN < tama.Y
			)
		{
			break;
		}

		// �`��
		Draw(P_Tama_0001, GetField_L() + tama.X, GetField_T() + tama.Y, 1.0, 0.0, 1.0);

		// �`�� test
//		SetColor("#00ffff");
//		PrintRectCenter(GetField_L() + tama.X, GetField_T() + tama.Y, 20, 20);

		yield 1;
	}
}

/*
	�G�e���X�g
*/
var<Tama_t[]> Tamas = [];
