/*
	�摜
*/

function <Picture_t> @@_Load(<string> url)
{
	return LoadPicture(url);
}

// ��������e��摜

// �v���t�B�N�X
// P_ ... �摜

var<Picture_t> P_Dummy = @@_Load(RESOURCE_General__Dummy_png);
var<Picture_t> P_WhiteBox = @@_Load(RESOURCE_General__WhiteBox_png);
var<Picture_t> P_WhiteCircle = @@_Load(RESOURCE_General__WhiteCircle_png);

// �������܂ŌŒ� -- �������_���� -- �T���v���Ƃ��ăL�[�v

var<Picture_t> P_ExplodePiece = @@_Load(RESOURCE_Picture__���鐯20_png);
var<Picture_t> P_Goal = @@_Load(RESOURCE_Picture__Goal_png);

// ==========
// �v���C���[
// ==========

/*
	[����(�e���L�[_8����)][�R�}(0�`3)]
*/
var<Picture_t[][]> P_Player =
[
	// 0
	null,

	// 1 (����)
	[
		RESOURCE_�_�ˏW��__Marisa__Tile_0005_png,
		RESOURCE_�_�ˏW��__Marisa__Tile_0105_png,
		RESOURCE_�_�ˏW��__Marisa__Tile_0205_png,
		RESOURCE_�_�ˏW��__Marisa__Tile_0305_png,
	],

	// 2 (��)
	[
		RESOURCE_�_�ˏW��__Marisa__Tile_0004_png,
		RESOURCE_�_�ˏW��__Marisa__Tile_0104_png,
		RESOURCE_�_�ˏW��__Marisa__Tile_0204_png,
		RESOURCE_�_�ˏW��__Marisa__Tile_0304_png,
	],

	// 3 (�E��)
	[
		RESOURCE_�_�ˏW��__Marisa__Tile_0003_png,
		RESOURCE_�_�ˏW��__Marisa__Tile_0103_png,
		RESOURCE_�_�ˏW��__Marisa__Tile_0203_png,
		RESOURCE_�_�ˏW��__Marisa__Tile_0303_png,
	],

	// 4 (��)
	[
		RESOURCE_�_�ˏW��__Marisa__Tile_0006_png,
		RESOURCE_�_�ˏW��__Marisa__Tile_0106_png,
		RESOURCE_�_�ˏW��__Marisa__Tile_0206_png,
		RESOURCE_�_�ˏW��__Marisa__Tile_0306_png,
	],

	// 5
	null,

	// 6 (�E)
	[
		RESOURCE_�_�ˏW��__Marisa__Tile_0002_png,
		RESOURCE_�_�ˏW��__Marisa__Tile_0102_png,
		RESOURCE_�_�ˏW��__Marisa__Tile_0202_png,
		RESOURCE_�_�ˏW��__Marisa__Tile_0302_png,
	],

	// 7 (����)
	[
		RESOURCE_�_�ˏW��__Marisa__Tile_0007_png,
		RESOURCE_�_�ˏW��__Marisa__Tile_0107_png,
		RESOURCE_�_�ˏW��__Marisa__Tile_0207_png,
		RESOURCE_�_�ˏW��__Marisa__Tile_0307_png,
	],

	// 8 (��)
	[
		RESOURCE_�_�ˏW��__Marisa__Tile_0000_png,
		RESOURCE_�_�ˏW��__Marisa__Tile_0100_png,
		RESOURCE_�_�ˏW��__Marisa__Tile_0200_png,
		RESOURCE_�_�ˏW��__Marisa__Tile_0300_png,
	],

	// 9 (�E��)
	[
		RESOURCE_�_�ˏW��__Marisa__Tile_0001_png,
		RESOURCE_�_�ˏW��__Marisa__Tile_0101_png,
		RESOURCE_�_�ˏW��__Marisa__Tile_0201_png,
		RESOURCE_�_�ˏW��__Marisa__Tile_0301_png,
	],
];

// ==============
// �v���C���[ End
// ==============

// ======
// �^�C��
// ======

var<Picture_t> P_Tile_Grass = @@_Load(RESOURCE_�҂ۂ�q��__BaseChip__Tile_0000_png);

var<Picture_t> P_Tile_Tree_LT = @@_Load(RESOURCE_�҂ۂ�q��__BaseChip__Tile_0001_png);
var<Picture_t> P_Tile_Tree_RT = @@_Load(RESOURCE_�҂ۂ�q��__BaseChip__Tile_0101_png);
var<Picture_t> P_Tile_Tree_LB = @@_Load(RESOURCE_�҂ۂ�q��__BaseChip__Tile_0002_png);
var<Picture_t> P_Tile_Tree_RB = @@_Load(RESOURCE_�҂ۂ�q��__BaseChip__Tile_0102_png);
var<Picture_t> P_Tile_Tree_Error = @@_Load(RESOURCE_Picture__TreeError_png);

// ==========
// �^�C�� End
// ==========

var<Picture_t> P_Enemy_Frog = @@_Load(RESOURCE_Picture__Frog_png);
var<Picture_t> P_Enemy_Houdai = @@_Load(RESOURCE_Picture__Houdai_png);
var<Picture_t> P_Enemy_Tama0001 = @@_Load(RESOURCE_Picture__Tama0001_png);
var<Picture_t> P_Enemy_Boss0001 = @@_Load(RESOURCE_Picture__Boss0001_png);
