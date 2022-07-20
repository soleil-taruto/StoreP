/*
	ƒ^ƒCƒ‹ - •Ç
*/

function <Tile_t> CreateTile_Wall(<Image> picture)
{
	var ret =
	{
		Kind: Tile_Kind_e_Wall,

		WallFlag: true,

		// ‚±‚±‚©‚çŒÅ—L

		Picture: picture,
	};

	ret.Draw = @@_Draw;

	return ret;
}

function <void> @@_Draw(<Tile_t> tile, <D2Point_t> drawPt)
{
	Draw(tile.Picture, drawPt.X, drawPt.Y, 1.0. 0.0, 1.0);
}
