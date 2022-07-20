/*
	ƒ^ƒCƒ‹ - BDummy
*/

function <Tile_t> CreateTile_BDummy()
{
	var ret =
	{
		Kind: Tile_Kind_e_BDummy,

		WallFlag: true,

		// ‚±‚±‚©‚çŒÅ—L

		<double> Dummy_01: 1.0,
		<double> Dummy_02: 2.0,
		<double> Dummy_03: 3.0,
	};

	ret.Draw = @@_Draw;

	return ret;
}

function <void> @@_Draw(<Tile_t> tile, <D2Point_t> drawPt)
{
	Draw(P_Dummy, drawPt.X, drawPt.Y, 1.0, 0.0, 1.0);
}
