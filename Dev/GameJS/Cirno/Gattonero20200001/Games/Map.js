/*
	マップ
*/

/@(ASTR)

/// MapCell_t
{
	// タイル
	//
	<Tile_t> Tile

	// 敵生成
	// 敵が居ない場合は null または null を返すこと。
	//
	<Func Enemy_t> F_CreateEnemy
}

/// Map_t
{
	// テーブルの幅 (横のセル数)
	// MAP_W_MIN～
	//
	var<int> W

	// テーブルの高さ (縦のセル数)
	// MAP_H_MIN～
	//
	var<int> H

	// マップセルのテーブル
	// 添字：[x][y]
	// サイズ：[this.W][this.H]
	//
	<MapCell_t[][]> Table
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

	mapIndex: 0 ～ (GetMapCount() - 1)
*/
function <void> LoadMap(<int> mapIndex)
{
	Map = {};

	var<string[]> lines = MAPS[mapIndex];

	{
		var<int> h = lines.length;

		if (h < MAP_H_MIN || IMAX < h)
		{
			error();
		}

		var<int> w = lines[0].length;

		if (w < MAP_W_MIN || IMAX < w)
		{
			error()
		}

		for (var<int> y = 0; y < h; y++)
		{
			if (@@_LineToChars(lines[y]).length != w)
			{
				error();
			}
		}

		Map.W = w;
		Map.H = h;
	}

	Map.Table = [];

	for (var<int> x = 0; x < Map.W; x++)
	{
		Map.Table.push([]);

		for (var<int> y = 0; y < Map.H; y++)
		{
			Map.Table[x].push(@@_CharToMapCell(@@_LineToChars(lines[y])[x]));
		}
	}

	LoadEnemyOfMap();
}

// 敵ロード用_マップ座標(テーブル・インデックス)
//
var<int> @@_X = -1;
var<int> @@_Y = -1;

// 敵のロード
//
function <void> LoadEnemyOfMap()
{
	GetEnemies().length = 0; // clear

	for (var<int> x = 0; x < MAP_W; x++)
	for (var<int> y = 0; y < MAP_H; y++)
	{
		var<MapCell_t> cell = Map.Table[x][y];
		var<Func Enemy_t> f_createEnemy = cell.F_CreateEnemy;

		if (f_createEnemy != null)
		{
			@@_X = x;
			@@_Y = y;

			var<Enemy_t> enemy = f_createEnemy();

			@@_X = -1;
			@@_Y = -1;

			if (enemy != null)
			{
				GetEnemies().push(enemy);
			}
		}
	}
}

function <I2Point_t> GetStartPtOfMap()
{
	for (var<Enemy_t> enemy of GetEnemies())
	{
		if (enemy.Kind == Enemy_Kind_e_Start)
		{
			return ToTablePoint_XY(enemy.X, enemy.Y);
		}
	}
	error(); // スタート地点見つからじ。
}

function <string[]> @@_LineToChars(<stirng> line)
{
	var<string[]> dest = [];

	for (var<int> index = 0; index < line.length; index++)
	{
		if (index + 1 < line.length && (DECIMAL + ALPHA_UPPER + ALPHA_LOWER).indexOf(line[index]) != -1)
		{
			dest.push(line.substring(index, index + 2));
			index++;
		}
		else
		{
			dest.push(line.substring(index, index + 1));
		}
	}
	return dest;
}

function <MapCell_t> @@_CharToMapCell(<string> chr)
{
	// 敵の座標(テーブル・インデックス)
	//
	var<int> ix = @@_X;
	var<int> iy = @@_Y;

	// 敵の位置(ドット単位)
	//
	var<D2Point> pt = ToFieldPoint_XY(ix, iy);
	var<double> x = pt.X;
	var<double> y = pt.Y;

	if (chr == "壁") return @@_CreateMapCell(CreateTile_BDummy(), () => null); // ★サンプル
	if (chr == "敵") return @@_CreateMapCell(CreateTile_None(), () => CreateEnemy_BDummy(x, y, 10)); // ★サンプル
	if (chr == "始") return @@_CreateMapCell(CreateTile_None(), () => CreateEnemy_Start(x, y));
	if (chr == "終") return @@_CreateMapCell(CreateTile_None(), () => CreateEnemy_Goal(x, y));
	if (chr == "　") return @@_CreateMapCell(CreateTile_None(), () => null);
//	if (chr == "W1") return @@_CreateMapCell(CreateTile_B0001(), () => null); // ★サンプル
//	if (chr == "W2") return @@_CreateMapCell(CreateTile_B0002(), () => null); // ★サンプル
//	if (chr == "W3") return @@_CreateMapCell(CreateTile_B0003(), () => null); // ★サンプル
	if (chr == "■") return @@_CreateMapCell(CreateTile_Wall(P_Tiles[0]), () => null);
	if (chr == "W1") return @@_CreateMapCell(CreateTile_Wall(P_Tiles[1]), () => null);
	if (chr == "W2") return @@_CreateMapCell(CreateTile_Wall(P_Tiles[2]), () => null);
	if (chr == "W3") return @@_CreateMapCell(CreateTile_Wall(P_Tiles[3]), () => null);
//	if (chr == "E1") return @@_CreateMapCell(CreateTile_None(), () => CreateEnemy_B0001(x, y)); // ★サンプル
//	if (chr == "E2") return @@_CreateMapCell(CreateTile_None(), () => CreateEnemy_B0002(x, y)); // ★サンプル
//	if (chr == "E3") return @@_CreateMapCell(CreateTile_None(), () => CreateEnemy_B0003(x, y)); // ★サンプル

	error();
}

function <MapCell_t> @@_CreateMapCell(<Tile_t> tile, <Func Enemy_t> f_createEnemy)
{
	var ret =
	{
		Tile: tile,
		F_CreateEnemy: f_createEnemy,
	};

	return ret;
}

var<MapCell_t> DEFAULT_MAP_CELL =
{
	Tile: CreateTile_Wall(P_Tiles[0]),
	F_CreateEnemy: () => null,
};

function <MapCell_t> GetMapCell(<I2Point_t> pt)
{
	if (
		pt.X < 0 || Map.W <= pt.X ||
		pt.Y < 0 || Map.H <= pt.Y
		)
	{
		return DEFAULT_MAP_CELL;
	}

	return Map.Table[pt.X][pt.Y];
}
