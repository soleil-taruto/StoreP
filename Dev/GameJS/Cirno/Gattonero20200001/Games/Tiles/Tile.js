/*
	�^�C��
*/

/@(ASTR)

/// Tile_t
{
	<Tile_Kind_e> Kind // �^�C���̎��

	<boolean> WallFlag // �ǂ�

	<Action double double> Draw // �`��
}

@(ASTR)/

/*
	�`��
*/
function <void> DrawTile(<Tile_t> tile, <double> dx, <double> dy)
{
	return tile.Draw(tile, dx, dy);
}
