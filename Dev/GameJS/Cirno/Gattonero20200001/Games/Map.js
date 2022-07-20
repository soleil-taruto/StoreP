/*
	�}�b�v
*/

/@(ASTR)

/// MapCell_t
{
	// �^�C��
	//
	<Tile_t> Tile

	// �G����
	// �G�����Ȃ��ꍇ�� null �܂��� null ��Ԃ����ƁB
	//
	<Func Enemy_t> F_CreateEnemy
}

/// Map_t
{
	// �e�[�u���̕� (���̃Z����)
	// MAP_W_MIN�`
	//
	var<int> W

	// �e�[�u���̍��� (�c�̃Z����)
	// MAP_H_MIN�`
	//
	var<int> H

	// �}�b�v�Z���̃e�[�u��
	// �Y���F[x][y]
	// �T�C�Y�F[this.W][this.H]
	//
	<MapCell_t[][]> Table
}

@(ASTR)/

/*
	�}�b�v�̐����擾����B
*/
function <int> GetMapCount()
{
	return MAPS.length;
}

/*
	�ǂݍ��܂ꂽ�}�b�v
*/
var<Map_t> Map = null;

/*
	�}�b�v��ǂݍ���

	mapIndex: 0 �` (GetMapCount() - 1)
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

// �G���[�h�p_�}�b�v���W(�e�[�u���E�C���f�b�N�X)
//
var<int> @@_X = -1;
var<int> @@_Y = -1;

// �G�̃��[�h
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
	error(); // �X�^�[�g�n�_�����炶�B
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
	// �G�̍��W(�e�[�u���E�C���f�b�N�X)
	//
	var<int> ix = @@_X;
	var<int> iy = @@_Y;

	// �G�̈ʒu(�h�b�g�P��)
	//
	var<D2Point> pt = ToFieldPoint_XY(ix, iy);
	var<double> x = pt.X;
	var<double> y = pt.Y;

	if (chr == "��") return @@_CreateMapCell(CreateTile_BDummy(), () => null); // ���T���v��
	if (chr == "�G") return @@_CreateMapCell(CreateTile_None(), () => CreateEnemy_BDummy(x, y, 10)); // ���T���v��
	if (chr == "�n") return @@_CreateMapCell(CreateTile_None(), () => CreateEnemy_Start(x, y));
	if (chr == "�I") return @@_CreateMapCell(CreateTile_None(), () => CreateEnemy_Goal(x, y));
	if (chr == "�@") return @@_CreateMapCell(CreateTile_None(), () => null);
//	if (chr == "W1") return @@_CreateMapCell(CreateTile_B0001(), () => null); // ���T���v��
//	if (chr == "W2") return @@_CreateMapCell(CreateTile_B0002(), () => null); // ���T���v��
//	if (chr == "W3") return @@_CreateMapCell(CreateTile_B0003(), () => null); // ���T���v��
	if (chr == "��") return @@_CreateMapCell(CreateTile_Wall(P_Tiles[0]), () => null);
	if (chr == "W1") return @@_CreateMapCell(CreateTile_Wall(P_Tiles[1]), () => null);
	if (chr == "W2") return @@_CreateMapCell(CreateTile_Wall(P_Tiles[2]), () => null);
	if (chr == "W3") return @@_CreateMapCell(CreateTile_Wall(P_Tiles[3]), () => null);
//	if (chr == "E1") return @@_CreateMapCell(CreateTile_None(), () => CreateEnemy_B0001(x, y)); // ���T���v��
//	if (chr == "E2") return @@_CreateMapCell(CreateTile_None(), () => CreateEnemy_B0002(x, y)); // ���T���v��
//	if (chr == "E3") return @@_CreateMapCell(CreateTile_None(), () => CreateEnemy_B0003(x, y)); // ���T���v��

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
