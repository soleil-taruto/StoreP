/*
	ƒ^ƒCƒ‹ - Water
*/

var<int> TileKind_Water = @(AUTO);

function <Tile_t> CreateTile_Water()
{
	var ret =
	{
		Kind: TileKind_Water,
		TileMode: TileMode_e_WATER,

		// ‚±‚±‚©‚çŒÅ—L
	};

	ret.Draw = @@_Draw;

	return ret;
}

function <void> @@_Draw(<Tile_t> tile, <double> dx, <double> dy)
{
	Draw(P_Tile_Water, dx, dy, 1.0, 0.0, 1.0);
}
