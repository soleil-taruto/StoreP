/*
	マップ
*/

/// MapCellType_e
//
var<int> MapCellType_e_Wall = @(AUTO);
var<int> MapCellType_e_None = @(AUTO);
var<int> MapCellType_e_Start = @(AUTO);
var<int> MapCellType_e_Goal = @(AUTO);
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
	// 当該セルの中心座標
	// (画面位置・ドット単位)
	//
	<D2Point_t> StartPt;

	// マップセルのテーブル
	// 添字：[x][y]
	// サイズ：[MAP_W][MAP_H]
	// (テーブル座標)
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
	読み込まれたマップ
*/
var<Map_t> Map = null;

/*
	マップを読み込む

	mapIndex: 0 〜 (GetMapCount() - 1)
*/
function <void> LoadMap(<int> mapIndex)
{
	var<string[]> lines = MAPS[mapIndex];

	if (lines.length != MAP_H)
	{
		error();
	}

	for (var<int> y = 0; y < MAP_H; y++)
	{
		if (lines[y].length != MAP_W)
		{
			error();
		}
	}

	Map = {};
	Map.Table = [];

	for (var<int> x = 0; x < MAP_W; x++)
	{
		Map.Table.push([]);

		for (var<int> y = 0; y < MAP_H; y++)
		{
			Map.Table[x].push(
			{
				Type: @@_CharToType(lines[y].substring(x, x + 1)),
			});
		}
	}

	// set StartPt
setStartPt:
	{
		for (var<int> x = 0; x < MAP_W; x++)
		for (var<int> y = 0; y < MAP_H; y++)
		{
			if (Map.Table[x][y].Type == MapCellType_e_Start)
			{
				Map.StartPt = CreateD2Point(
					FIELD_L + x * TILE_W + TILE_W / 2,
					FIELD_T + y * TILE_H + TILE_H / 2
					);

				break setStartPt;
			}
		}
		error();
	}

	// MapCell_t の Type 以外のフィールドを設定する。
	//
	for (var<int> x = 0; x < MAP_W; x++)
	for (var<int> y = 0; y < MAP_H; y++)
	{
		var<MapCell_t> cell = Map.Table[x][y];

		// reset
		{
			cell.WallFlag = false;
		}

		if (cell.Type == MapCellType_e_Wall)
		{
			cell.WallFlag = true;
		}
	}

	// 敵のロード
	//
	for (var<int> x = 0; x < MAP_W; x++)
	for (var<int> y = 0; y < MAP_H; y++)
	{
		var<MapCell_t> cell = Map.Table[x][y];

		switch (cell.Type)
		{
		case MapCellType_e_Enemy_BDummy:
			GetEnemies().push(CreateEnemy_BDummy(
				FIELD_L + x * TILE_W + TILE_W / 2,
				FIELD_T + y * TILE_H + TILE_H / 2,
				1
				));
			break;

		case MapCellType_e_Goal:
			GetEnemies().push(CreateEnemy_Goal(
				FIELD_L + x * TILE_W + TILE_W / 2,
				FIELD_T + y * TILE_H + TILE_H / 2
				));
			break;

		default:
			break;
		}
	}
}

function <MapCellType_e> @@_CharToType(<string> chr)
{
	if (chr == "■") return MapCellType_e_Wall;
	if (chr == "　") return MapCellType_e_None;
	if (chr == "始") return MapCellType_e_Start;
	if (chr == "終") return MapCellType_e_Goal;
	if (chr == "敵") return MapCellType_e_Enemy_BDummy;

	error();
}

var<MapCell_t> DEFAULT_MAP_CELL =
{
	Type: MapCellType_e_Wall,
	WallFlag: true,
};

function <MapCell_t> GetMapCell(<I2Point_t> pt)
{
	if (
		pt.X < 0 || MAP_W <= pt.X ||
		pt.Y < 0 || MAP_H <= pt.Y
		)
	{
		return DEFAULT_MAP_CELL;
	}

	return Map.Table[pt.X][pt.Y];
}
