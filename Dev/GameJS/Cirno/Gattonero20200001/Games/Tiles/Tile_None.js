/*
	タイル - 空間
*/

function <Tile_t> CreateTile_None()
{
	var ret =
	{
		Kind: Tile_Kind_e_None,

		WallFlag: false,

		// ここから固有
	};

	ret.Draw = @@_Draw;

	return ret;
}

function <void> @@_Draw(<Tile_t> tile, <double> dx, <double> dy)
{
	// noop
}
