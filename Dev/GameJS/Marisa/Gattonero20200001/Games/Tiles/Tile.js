/*
	タイル
*/

/// TileMode_e
//
var<int> TileMode_e_SPACE  = @(AUTO); // 空間
var<int> TileMode_e_LADDER = @(AUTO); // 梯子
var<int> TileMode_e_CLOUD  = @(AUTO); // 上に乗れる雲
var<int> TileMode_e_WALL   = @(AUTO); // 壁

/@(ASTR)

/// Tile_t
{
	<int> Kind // タイルの種類
	<TileMode_e> TileMode // タイルの振る舞い
	<Action double double> Draw // 描画
}

@(ASTR)/

/*
	描画
*/
function <void> DrawTile(<Tile_t> tile, <double> dx, <double> dy)
{
	return tile.Draw(tile, dx, dy);
}
