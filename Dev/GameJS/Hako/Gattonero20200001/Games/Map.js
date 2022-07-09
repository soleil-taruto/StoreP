/*
	�}�b�v
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

	// �ǃt���O
	//
	<boolean> WallFlag
}

/// Map_t
{
	// �X�^�[�g���W
	// ���Y�Z���̒��S���W
	// (��ʈʒu�E�h�b�g�P��)
	//
	<D2Point_t> StartPt;

	// �}�b�v�Z���̃e�[�u��
	// �Y���F[x][y]
	// �T�C�Y�F[MAP_W][MAP_H]
	// (�e�[�u�����W)
	//
	<MapCell_t[][]> Table;
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

	// MapCell_t �� Type �ȊO�̃t�B�[���h��ݒ肷��B
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

	// �G�̃��[�h
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
	if (chr == "��") return MapCellType_e_Wall;
	if (chr == "�@") return MapCellType_e_None;
	if (chr == "�n") return MapCellType_e_Start;
	if (chr == "�I") return MapCellType_e_Goal;
	if (chr == "�G") return MapCellType_e_Enemy_BDummy;

	error();
}
