/*
	�{�[��(���e)
*/

/@(ASTR)

/// Ball_t
{
	<double> X // X-�ʒu
	<double> Y // Y-�ʒu

	<double> XAdd // X-���x
	<double> YAdd // Y-���x

	<Crash_t> Crash; // �����蔻��
}

@(ASTR)/

function <Ball_t> CreateBall(<doule> x, <double> y, <double> xAdd, <double> yAdd)
{
	var ret =
	{
		X: x,
		Y: y,

		XAdd: xAdd,
		YAdd: yAdd,
	};

	return ret;
}

/*
	�s���ƕ`��
	���ׂ����ƁF
	-- �ړ�
	-- �����蔻��ݒu
	-- �`��
	�߂�l�F
	-- ? ����
*/
function <boolean> DrawBall(<Ball_t> ball)
{
	ball.X += ball.XAdd;
	ball.Y += ball.YAdd;

	ball.Crash = CreateCrash_Circle(ball.X, ball.Y, 15.0);

	Draw(P_Ball, ball.X, ball.Y, 1.0, 0.0, 1.0);

	if (Screen_H < ball.Y) // ? �ڒn�����B-> ����
	{
		// TODO

		return false;
	}
	return true;
}
