/*
	�}�b�v
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

	// �ǃt���O
	//
	<boolean> WallFlag
}

/// Map_t
{
	// �X�^�[�g���W
	// ��ʈʒu�E�h�b�g�P��
	//
	<D2Point_t> StartPt;

	// �}�b�v�Z���̃e�[�u��
	// �Y���F[x][y]
	// �T�C�Y�F[MAP_X_NUM][MAP_Y_NUM]
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
	�}�b�v��ǂݍ���

	index: 0 �` (GetMapCount() - 1)
*/
function <void> LoadMap(<int> index)
{
	// TODO
	// TODO
	// TODO
}
