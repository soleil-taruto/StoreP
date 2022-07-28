/*
	画像
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

// ここから各種画像

// プリフィクス
// P_ ... 画像

var<Image> P_Dummy = @@_Load(RESOURCE_General__Dummy_png);
var<Image> P_WhiteBox = @@_Load(RESOURCE_General__WhiteBox_png);
var<Image> P_WhiteCircle = @@_Load(RESOURCE_General__WhiteCircle_png);

// ★ここまで固定 -- 持ち回り_共通 -- サンプルとしてキープ

var<Image> P_ExplodePiece = @@_Load(RESOURCE_Picture__光る星20_png);
var<Image> P_Goal = @@_Load(RESOURCE_Picture__Goal_png);

// プレイヤー

var<Image> P_PlayerAttack = @@_Load(RESOURCE_えむくろ__CirnoAttack_png);
var<Image> P_PlayerStand  = @@_Load(RESOURCE_えむくろ__CirnoStand_png);
var<Image> P_PlayerJump   = @@_Load(RESOURCE_えむくろ__CirnoJump_png);

var<Image[]> P_PlayerRun =
[
	@@_Load(RESOURCE_えむくろ__CirnoRun_001_png),
	@@_Load(RESOURCE_えむくろ__CirnoRun_002_png),
	@@_Load(RESOURCE_えむくろ__CirnoRun_003_png),
	@@_Load(RESOURCE_えむくろ__CirnoRun_004_png),
];

// プレイヤー_Mirror

var<Image> P_PlayerMirrorAttack = @@_Load(RESOURCE_えむくろ__Mirror__CirnoAttack_png);
var<Image> P_PlayerMirrorStand  = @@_Load(RESOURCE_えむくろ__Mirror__CirnoStand_png);
var<Image> P_PlayerMirrorJump   = @@_Load(RESOURCE_えむくろ__Mirror__CirnoJump_png);

var<Image[]> P_PlayerMirrorRun =
[
	@@_Load(RESOURCE_えむくろ__Mirror__CirnoRun_001_png),
	@@_Load(RESOURCE_えむくろ__Mirror__CirnoRun_002_png),
	@@_Load(RESOURCE_えむくろ__Mirror__CirnoRun_003_png),
	@@_Load(RESOURCE_えむくろ__Mirror__CirnoRun_004_png),
];

// プレイヤー_End

var<Image> P_TileNone = @@_Load(RESOURCE_Tile__Tile_None_png);

var<Image[]> P_Tiles =
[
	@@_Load(RESOURCE_Tile__Tile_B0001_png),
	@@_Load(RESOURCE_Tile__Tile_B0002_png),
	@@_Load(RESOURCE_Tile__Tile_B0003_png),
	@@_Load(RESOURCE_Tile__Tile_B0004_png),
];

var<Image> P_Wall0001 = @@_Load(RESOURCE_素材Good__Wall_0001_png);
var<Image> P_Wall0002 = @@_Load(RESOURCE_素材Good__Wall_0002_png);
var<Image> P_Wall0003 = @@_Load(RESOURCE_素材Good__Wall_0003_png);

var<Image> P_Enemy_Frog = @@_Load(RESOURCE_Picture__Frog_png);
var<Image> P_Enemy_Houdai = @@_Load(RESOURCE_Picture__Houdai_png);
var<Image> P_Enemy_Tama0001 = @@_Load(RESOURCE_Picture__Tama0001_png);
var<Image> P_Enemy_Boss0001 = @@_Load(RESOURCE_Picture__Boss0001_png);
