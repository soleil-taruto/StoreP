/*
	数学系
*/

/*
	ret: value を四捨五入した整数を返す。
*/
function <int> ToInt(<double> value)
{
	return Math.round(value);
}

/*
	value を minval, maxval の範囲に矯正する。
*/
function <Number> ToRange(<Number> value, <Number> minval, <Number> maxval)
{
	return Math.min(Math.max(value, minval), maxval);
}

/*
	ret: 0 ～ (modulo - 1) の整数をランダムに返す。
*/
function <double> GetRand(<int> modulo)
{
	return Math.floor(Math.random() * modulo);
}
