/*
	�^�C��
*/

/// TileMode_e
//
var<int> TileMode_e_SPACE  = @(AUTO); // ���
var<int> TileMode_e_LADDER = @(AUTO); // ��q
var<int> TileMode_e_CLOUD  = @(AUTO); // ��ɏ���_
var<int> TileMode_e_WALL   = @(AUTO); // ��

/@(ASTR)

/// Tile_t
{
	<int> Kind // �^�C���̎��
	<TileMode_e> TileMode // �^�C���̐U�镑��
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
