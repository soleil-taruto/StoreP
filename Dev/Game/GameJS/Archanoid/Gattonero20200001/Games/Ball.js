/*
	ボール(自弾)
*/

/@(ASTR)

/// Ball_t
{
	<double> X // X-位置
	<double> Y // Y-位置

	<double> XAdd // X-速度
	<double> YAdd // Y-速度

	<Crash_t> Crash; // 当たり判定
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
	行動と描画
	やるべきこと：
	-- 移動
	-- 当たり判定設置
	-- 描画
	戻り値：
	-- ? 生存
*/
function <boolean> DrawBall(<Ball_t> ball)
{
	ball.X += ball.XAdd;
	ball.Y += ball.YAdd;

	ball.Crash = CreateCrash_Circle(ball.X, ball.Y, 15.0);

	Draw(P_Ball, ball.X, ball.Y, 1.0, 0.0, 1.0);

	if (Screen_H < ball.Y) // ? 接地した。-> 消滅
	{
		// TODO

		return false;
	}
	return true;
}
