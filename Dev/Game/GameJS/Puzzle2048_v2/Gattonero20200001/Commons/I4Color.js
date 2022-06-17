/*
	I4Color_t 型
*/

/@(ASTR)

// アルファ値を含む色を表す。
// 各色は 0 ～ 255 を想定する。
// R を -1 にすることによって無効な色を示す。

/// I4Color_t
{
	<double> R // -1 == 無効
	<double> G
	<double> B
}

@(ASTR)/

function <I4Color_t> CreateI4Color(<int> r, <int> g, <int> b, <int> a)
{
	var ret =
	{
		R: r,
		G: g,
		B: b,
		A: a,
	};

	return ret;
}

function <D4Color_t> I4ColorToD4Color(<I4Color_t> src)
{
	return CreateD3Color(
		src.R / 255.0,
		src.G / 255.0,
		src.B / 255.0,
		src.A / 255.0
		);
}

function <I4Color_t> I4ColorToI3Color(<I4Color_t> src)
{
	return CreateI3Color(
		src.R,
		src.G,
		src.B
		);
}
