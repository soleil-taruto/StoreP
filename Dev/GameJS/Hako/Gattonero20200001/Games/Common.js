/*
	共通
*/

function <I2Point_t> ToTablePoint_XY(<double> x, <double> y)
{
	return ToTablePoint(CreateD2Point(x, y));
}

/*
	フィールド上の座標(ドット単位)からテーブル位置(テーブル・インデックス)を取得する。
*/
function <I2Point_t> ToTablePoint(<D2Point_t> pt)
{
	var<int> ix = ToFloor(pt.X / TILE_W);
	var<int> iy = ToFloor(pt.Y / TILE_H);

	var ret = CreateI2Point(ix, iy);

	return ret;
}
