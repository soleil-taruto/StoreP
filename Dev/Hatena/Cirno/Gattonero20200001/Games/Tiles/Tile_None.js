/*
	タイル - 空間
*/

var<int> TileKind_None = @(AUTO);

function <Tile_t> CreateTile_None()
{
	var ret =
	{
		Kind: TileKind_None,
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
