/*
	�^�C��
*/

/@(ASTR)

/// Tile_t
{
	<Tile_Kind_e> Kind // �^�C���̎��

	<boolean> WallFlag // �ǂ�

	<Action D2Point_t> Draw // �`��
}

@(ASTR)/

/*
	�`��
*/
function <void> DrawTile(<Tile_t> tile, <D2Point_t> drawPt)
{
	return tile.Draw(tile, drawPt);
}
