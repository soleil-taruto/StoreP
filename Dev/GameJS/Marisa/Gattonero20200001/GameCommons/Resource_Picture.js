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

// ==========
// �v���C���[
// ==========



// =================
// �v���C���[ Mirror
// =================



// ==============
// �v���C���[ End
// ==============

// ======
// �^�C��
// ======

var<Image[]> P_TileNone = @@_Load(RESOURCE_Tile__Tile_B0001_png);

var<Image[]> P_Tile_B1 = @@_Load(RESOURCE_Tile__Tile_B0001_png);
var<Image[]> P_Tile_B2 = @@_Load(RESOURCE_Tile__Tile_B0002_png);
var<Image[]> P_Tile_B3 = @@_Load(RESOURCE_Tile__Tile_B0003_png);
var<Image[]> P_Tile_B4 = @@_Load(RESOURCE_Tile__Tile_B0004_png);

// ==========
// �^�C�� End
// ==========

var<Image> P_Wall0001B = @@_Load(RESOURCE_�f��Good__Wall_0001B_png);
var<Image> P_Wall0001F = @@_Load(RESOURCE_�f��Good__Wall_0001F_png);
var<Image> P_Wall0002  = @@_Load(RESOURCE_�f��Good__Wall_0002_png);
var<Image> P_Wall0003  = @@_Load(RESOURCE_�f��Good__Wall_0003_png);

var<Image> P_Enemy_Frog = @@_Load(RESOURCE_Picture__Frog_png);
var<Image> P_Enemy_Houdai = @@_Load(RESOURCE_Picture__Houdai_png);
var<Image> P_Enemy_Tama0001 = @@_Load(RESOURCE_Picture__Tama0001_png);
var<Image> P_Enemy_Boss0001 = @@_Load(RESOURCE_Picture__Boss0001_png);
