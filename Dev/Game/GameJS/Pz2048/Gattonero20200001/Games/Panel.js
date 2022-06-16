/*
	パネル
*/

/@(ASTR)

/// Panel_t
{
	<int> Exponent // 0 ～ (P_数字パネル.length - 1)
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
	1フレームに於ける行動と描画を行う。
*/
function <void> DrawPanel(<Panel_t> panel, <double> draw_x, <double> draw_y)
{
	Draw(P_数字パネル[panel.Exponent], draw_x, draw_y, 1.0, 0.0, 1.0);
}
