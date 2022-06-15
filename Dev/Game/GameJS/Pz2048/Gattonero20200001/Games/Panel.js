/*
	パネル
*/

/@(ASTR)

/// Panel_t
{
	<int> Exponent // 0 ～ (P_数字パネル.length - 1)

	// 位置(ドット単位)
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
	1フレームに於ける行動と描画を行う。
*/
function <void> DrawPanel(<Panel_t> panel)
{
	Draw(P_数字パネル[panel.Exponent], panel.X, panel.Y, 1.0, 0.0, 1.0);
}
