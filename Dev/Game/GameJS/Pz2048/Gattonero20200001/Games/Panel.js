/*
	�p�l��
*/

/@(ASTR)

/// Panel_t
{
	<int> Exponent // 0 �` (P_�����p�l��.length - 1)
}

@(ASTR)/

function <Panel_t> CreatePanel(<int> exponent)
{
	var ret =
	{
		Exponent: exponent,
	};

	return ret;
}

/*
	1�t���[���ɉ�����s���ƕ`����s���B
*/
function <void> DrawPanel(<Panel_t> panel, <double> draw_x, <double> draw_y)
{
	Draw(P_�����p�l��[panel.Exponent], draw_x, draw_y, 1.0, 0.0, 1.0);
}