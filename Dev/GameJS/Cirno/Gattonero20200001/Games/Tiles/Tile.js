/*
	タイル
*/

/@(ASTR)

/// Tile_t
{
	<Tile_Kind_e> Kind // タイルの種類

	<boolean> WallFlag // 壁か

	<Action D2Point_t> Draw // 描画
}

@(ASTR)/

/*
	描画
*/
function <void> DrawTile(<Tile_t> tile, <D2Point_t> drawPt)
{
	return tile.Draw(tile, drawPt);
}
