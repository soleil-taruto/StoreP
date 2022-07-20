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

var<Image> P_Dummy = @@_Load(Resources.General__Dummy_png);
var<Image> P_WhiteBox = @@_Load(Resources.General__WhiteBox_png);
var<Image> P_WhiteCircle = @@_Load(Resources.General__WhiteCircle_png);

// �������܂ŌŒ� -- �������_���� -- �T���v���Ƃ��ăL�[�v

var<Image> P_ExplodePiece = @@_Load(Resources.Picture__���鐯20_png);
var<Image> P_Goal = @@_Load(Resources.Picture__Goal_png);

var<Image> P_PlayerAttack = @@_Load(Resources.���ނ���__CirnoAttack_png);
var<Image> P_PlayerStand  = @@_Load(Resources.���ނ���__CirnoStand_png);
var<Image> P_PlayerJump   = @@_Load(Resources.���ނ���__CirnoJump_png);

var<Image[]> P_PlayerRun =
[
	@@_Load(Resources.���ނ���__CirnoRun_001_png),
	@@_Load(Resources.���ނ���__CirnoRun_002_png),
	@@_Load(Resources.���ނ���__CirnoRun_003_png),
	@@_Load(Resources.���ނ���__CirnoRun_004_png),
];

var<Image> P_TileNone = @@_Load(Resources.Tile__Tile_None_png);

var<Image[]> P_Tiles =
[
	@@_Load(Resources.Tile__Tile_B0001_png),
	@@_Load(Resources.Tile__Tile_B0002_png),
	@@_Load(Resources.Tile__Tile_B0003_png),
	@@_Load(Resources.Tile__Tile_B0004_png),
];
