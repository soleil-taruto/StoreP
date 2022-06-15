/*
	�p�l��
*/

/@(ASTR)

/// Panel_t
{
	<int> Exponent // 0 �` (P_�����p�l��.length - 1)

	// �ʒu(�h�b�g�P��)
	<double> X
	<double> Y
}

@(ASTR)/

function <Panel_t> CreatePanel(<int> exponent, <double> x, <double> y)
{
	var ret =
	{
		Exponent: exponent,

		X: x,
		Y: y,
	};

	return ret;
}

function <void> MovePanel(<Panel_t> panel, <double> x, <double> y)
{
	panel.X = x;
	panel.Y = y;
}

/*
	1�t���[���ɉ�����s���ƕ`����s���B
*/
function <void> DrawPanel(<Panel_t> panel)
{
	Draw(P_�����p�l��[panel.Exponent], panel.X, panel.Y, 1.0, 0.0, 1.0);
}
