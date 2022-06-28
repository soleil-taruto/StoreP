/*
	マップ
*/

/// MapCellType_e
//
var<int> MapCellType_e_Wall = @(AUTO);
var<int> MapCellType_e_None = @(AUTO);
var<int> MapCellType_e_Start = @(AUTO);
var<int> MapCellType_e_Enemy_Goal = @(AUTO);
var<int> MapCellType_e_Enemy_BDummy = @(AUTO);

/@(ASTR)

/// MapCell_t
{
	<MapCellType_e> Type

	// 壁フラグ
	//
	<boolean> WallFlag
}

/// Map_t
{
	// スタート座標
	// 画面位置・ドット単位
	//
	<D2Point_t> StartPt;

	// マップセルのテーブル
	// 添字：[x][y]
	// サイズ：[MAP_X_NUM][MAP_Y_NUM]
	//
	<MapCell_t[][]> Table;
}

@(ASTR)/

/*
	マップの数を取得する。
*/
function <int> GetMapCount()
{
	return MAPS.length;
}

/*
	マップを読み込む

	index: 0 ～ (GetMapCount() - 1)
*/
function <void> LoadMap(<int> index)
{
	// TODO
	// TODO
	// TODO
}
