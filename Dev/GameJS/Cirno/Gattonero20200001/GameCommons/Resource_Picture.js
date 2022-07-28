/*
	�摜
*/

function <Image> @@_Load(<string> url)
{
	LOGPOS();
	Loading++;

	var image = new Image();

	image.src = url;
	image.onload = function()
	{
		LOGPOS();
		Loading--;
	};

	image.onerror = function()
	{
		error();
	};

	return image;
}

// ��������e��摜

// �v���t�B�N�X
// P_ ... �摜

var<Image> P_Dummy = @@_Load(RESOURCE_General__Dummy_png);
var<Image> P_WhiteBox = @@_Load(RESOURCE_General__WhiteBox_png);
var<Image> P_WhiteCircle = @@_Load(RESOURCE_General__WhiteCircle_png);

// �������܂ŌŒ� -- �������_���� -- �T���v���Ƃ��ăL�[�v

var<Image> P_ExplodePiece = @@_Load(RESOURCE_Picture__���鐯20_png);
var<Image> P_Goal = @@_Load(RESOURCE_Picture__Goal_png);

// �v���C���[

var<Image> P_PlayerAttack = @@_Load(RESOURCE_���ނ���__CirnoAttack_png);
var<Image> P_PlayerStand  = @@_Load(RESOURCE_���ނ���__CirnoStand_png);
var<Image> P_PlayerJump   = @@_Load(RESOURCE_���ނ���__CirnoJump_png);

var<Image[]> P_PlayerRun =
[
	@@_Load(RESOURCE_���ނ���__CirnoRun_001_png),
	@@_Load(RESOURCE_���ނ���__CirnoRun_002_png),
	@@_Load(RESOURCE_���ނ���__CirnoRun_003_png),
	@@_Load(RESOURCE_���ނ���__CirnoRun_004_png),
];

// �v���C���[_Mirror

var<Image> P_PlayerMirrorAttack = @@_Load(RESOURCE_���ނ���__Mirror__CirnoAttack_png);
var<Image> P_PlayerMirrorStand  = @@_Load(RESOURCE_���ނ���__Mirror__CirnoStand_png);
var<Image> P_PlayerMirrorJump   = @@_Load(RESOURCE_���ނ���__Mirror__CirnoJump_png);

var<Image[]> P_PlayerMirrorRun =
[
	@@_Load(RESOURCE_���ނ���__Mirror__CirnoRun_001_png),
	@@_Load(RESOURCE_���ނ���__Mirror__CirnoRun_002_png),
	@@_Load(RESOURCE_���ނ���__Mirror__CirnoRun_003_png),
	@@_Load(RESOURCE_���ނ���__Mirror__CirnoRun_004_png),
];

// �v���C���[_End

var<Image> P_TileNone = @@_Load(RESOURCE_Tile__Tile_None_png);

var<Image[]> P_Tiles =
[
	@@_Load(RESOURCE_Tile__Tile_B0001_png),
	@@_Load(RESOURCE_Tile__Tile_B0002_png),
	@@_Load(RESOURCE_Tile__Tile_B0003_png),
	@@_Load(RESOURCE_Tile__Tile_B0004_png),
];

var<Image> P_Wall0001 = @@_Load(RESOURCE_�f��Good__Wall_0001_png);
var<Image> P_Wall0002 = @@_Load(RESOURCE_�f��Good__Wall_0002_png);
var<Image> P_Wall0003 = @@_Load(RESOURCE_�f��Good__Wall_0003_png);

var<Image> P_Enemy_Frog = @@_Load(RESOURCE_Picture__Frog_png);
var<Image> P_Enemy_Houdai = @@_Load(RESOURCE_Picture__Houdai_png);
var<Image> P_Enemy_Tama0001 = @@_Load(RESOURCE_Picture__Tama0001_png);
var<Image> P_Enemy_Boss0001 = @@_Load(RESOURCE_Picture__Boss0001_png);
