/*
	�^�C�� - ���
*/

function <Tile_t> CreateTile_None()
{
	var ret =
	{
		Kind: Tile_Kind_e_None,

		WallFlag: false,

		// ��������ŗL
	};

	ret.Draw = @@_Draw;

	return ret;
}

function <void> @@_Draw(<Tile_t> tile, <D2Point_t> drawPt)
{
	// noop
}
