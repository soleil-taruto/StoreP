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

var<Image> P_PlayerJump       = @@_Load(RESOURCE_���b�N�}����__Doremy__chara_a01_jump01_png);
var<Image> P_PlayerJumpAttack = @@_Load(RESOURCE_���b�N�}����__Doremy__chara_a01_jump02attack_png);
var<Image> P_PlayerJumpDamage = @@_Load(RESOURCE_���b�N�}����__Doremy__chara_a01_jump03damage_png);

var<Image[]> P_PlayerRun =
[
	@@_Load(RESOURCE_���b�N�}����__Doremy__chara_a01_run01_png),
	@@_Load(RESOURCE_���b�N�}����__Doremy__chara_a01_run02_png),
	@@_Load(RESOURCE_���b�N�}����__Doremy__chara_a01_run03_png),
];

var<Image[]> P_PlayerRunAttack =
[
	@@_Load(RESOURCE_���b�N�}����__Doremy__chara_a01_run04_attack_png),
	@@_Load(RESOURCE_���b�N�}����__Doremy__chara_a01_run05_attack_png),
	@@_Load(RESOURCE_���b�N�}����__Doremy__chara_a01_run06_attack_png),
];

var<Image> P_PlayerSliding      = @@_Load(RESOURCE_���b�N�}����__Doremy__chara_a01_sliding01_png);
var<Image> P_PlayerTelepo01     = @@_Load(RESOURCE_���b�N�}����__Doremy__chara_a01_telepo01_png);
var<Image> P_PlayerTelepo02     = @@_Load(RESOURCE_���b�N�}����__Doremy__chara_a01_telepo02_png);
var<Image> P_PlayerTelepo03     = @@_Load(RESOURCE_���b�N�}����__Doremy__chara_a01_telepo03_png);
var<Image> P_PlayerWait         = @@_Load(RESOURCE_���b�N�}����__Doremy__chara_a01_wait01_png);
var<Image> P_PlayerWaitMabataki = @@_Load(RESOURCE_���b�N�}����__Doremy__chara_a01_wait02_png);
var<Image> P_PlayerWaitStart    = @@_Load(RESOURCE_���b�N�}����__Doremy__chara_a01_wait03start_png);
var<Image> P_PlayerWaitAttack   = @@_Load(RESOURCE_���b�N�}����__Doremy__chara_a01_wait04attack_png);

var<Image[]> P_PlayerClimb =
[
	@@_Load(RESOURCE_���b�N�}����__Doremy__chara_a01_climb01_png),
	@@_Load(RESOURCE_���b�N�}����__Doremy__chara_a01_climb02_png),
];

var<Image> P_PlayerClimbAttack = @@_Load(RESOURCE_���b�N�}����__Doremy__chara_a01_climb03_attack_png);
var<Image> P_PlayerClimbTop    = @@_Load(RESOURCE_���b�N�}����__Doremy__chara_a01_climb04_png);

var<Image> P_PlayerEffectShockA = @@_Load(RESOURCE_���b�N�}����__Doremy__effect_a01_shock01_png);
var<Image> P_PlayerEffectShockB =
[
	@@_Load(RESOURCE_���b�N�}����__Doremy__effect_a01_shock02_png),
	@@_Load(RESOURCE_���b�N�}����__Doremy__effect_a01_shock03_png),
	@@_Load(RESOURCE_���b�N�}����__Doremy__effect_a01_shock04_png),
];

var<Image> P_PlayerEffectSliding =
[
	@@_Load(RESOURCE_���b�N�}����__Doremy__effect_a01_sliding01_png),
	@@_Load(RESOURCE_���b�N�}����__Doremy__effect_a01_sliding02_png),
	@@_Load(RESOURCE_���b�N�}����__Doremy__effect_a01_sliding03_png),
];

// =================
// �v���C���[ Mirror
// =================

var<Image> P_PlayerMirrorJump       = @@_Load(RESOURCE_���b�N�}����__Doremy__Mirror__chara_a01_jump01_png);
var<Image> P_PlayerMirrorJumpAttack = @@_Load(RESOURCE_���b�N�}����__Doremy__Mirror__chara_a01_jump02attack_png);
var<Image> P_PlayerMirrorJumpDamage = @@_Load(RESOURCE_���b�N�}����__Doremy__Mirror__chara_a01_jump03damage_png);

var<Image[]> P_PlayerMirrorRun =
[
	@@_Load(RESOURCE_���b�N�}����__Doremy__Mirror__chara_a01_run01_png),
	@@_Load(RESOURCE_���b�N�}����__Doremy__Mirror__chara_a01_run02_png),
	@@_Load(RESOURCE_���b�N�}����__Doremy__Mirror__chara_a01_run03_png),
];

var<Image[]> P_PlayerMirrorRunAttack =
[
	@@_Load(RESOURCE_���b�N�}����__Doremy__Mirror__chara_a01_run04_attack_png),
	@@_Load(RESOURCE_���b�N�}����__Doremy__Mirror__chara_a01_run05_attack_png),
	@@_Load(RESOURCE_���b�N�}����__Doremy__Mirror__chara_a01_run06_attack_png),
];

var<Image> P_PlayerMirrorSliding      = @@_Load(RESOURCE_���b�N�}����__Doremy__Mirror__chara_a01_sliding01_png);
var<Image> P_PlayerMirrorTelepo01     = @@_Load(RESOURCE_���b�N�}����__Doremy__Mirror__chara_a01_telepo01_png);
var<Image> P_PlayerMirrorTelepo02     = @@_Load(RESOURCE_���b�N�}����__Doremy__Mirror__chara_a01_telepo02_png);
var<Image> P_PlayerMirrorTelepo03     = @@_Load(RESOURCE_���b�N�}����__Doremy__Mirror__chara_a01_telepo03_png);
var<Image> P_PlayerMirrorWait         = @@_Load(RESOURCE_���b�N�}����__Doremy__Mirror__chara_a01_wait01_png);
var<Image> P_PlayerMirrorWaitMabataki = @@_Load(RESOURCE_���b�N�}����__Doremy__Mirror__chara_a01_wait02_png);
var<Image> P_PlayerMirrorWaitStart    = @@_Load(RESOURCE_���b�N�}����__Doremy__Mirror__chara_a01_wait03start_png);
var<Image> P_PlayerMirrorWaitAttack   = @@_Load(RESOURCE_���b�N�}����__Doremy__Mirror__chara_a01_wait04attack_png);

var<Image[]> P_PlayerMirrorClimb =
[
	@@_Load(RESOURCE_���b�N�}����__Doremy__Mirror__chara_a01_climb01_png),
	@@_Load(RESOURCE_���b�N�}����__Doremy__Mirror__chara_a01_climb02_png),
];

var<Image> P_PlayerMirrorClimbAttack = @@_Load(RESOURCE_���b�N�}����__Doremy__Mirror__chara_a01_climb03_attack_png);
var<Image> P_PlayerMirrorClimbTop    = @@_Load(RESOURCE_���b�N�}����__Doremy__Mirror__chara_a01_climb04_png);

var<Image> P_PlayerMirrorEffectShockA = @@_Load(RESOURCE_���b�N�}����__Doremy__Mirror__effect_a01_shock01_png);
var<Image> P_PlayerMirrorEffectShockB =
[
	@@_Load(RESOURCE_���b�N�}����__Doremy__Mirror__effect_a01_shock02_png),
	@@_Load(RESOURCE_���b�N�}����__Doremy__Mirror__effect_a01_shock03_png),
	@@_Load(RESOURCE_���b�N�}����__Doremy__Mirror__effect_a01_shock04_png),
];

var<Image> P_PlayerMirrorEffectSliding =
[
	@@_Load(RESOURCE_���b�N�}����__Doremy__Mirror__effect_a01_sliding01_png),
	@@_Load(RESOURCE_���b�N�}����__Doremy__Mirror__effect_a01_sliding02_png),
	@@_Load(RESOURCE_���b�N�}����__Doremy__Mirror__effect_a01_sliding03_png),
];

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

/*
	�n��
*/
var<Image> P_Tile_Ground1 = @@_Load(RESOURCE_���b�N�}����__Tile__stage01_chip_a01_png);
var<Image> P_Tile_Ground2 = @@_Load(RESOURCE_���b�N�}����__Tile__stage01_chip_a02_png);

/*
	�t�F���X
	�ԍ��̓e���L�[���̔z�u
*/
var<Image> P_Tile_Fence1 = @@_Load(RESOURCE_���b�N�}����__Tile__stage02_chip_b01_png);
var<Image> P_Tile_Fence2 = @@_Load(RESOURCE_���b�N�}����__Tile__stage02_chip_b08_png);
var<Image> P_Tile_Fence3 = @@_Load(RESOURCE_���b�N�}����__Tile__stage02_chip_b07_png);
var<Image> P_Tile_Fence4 = @@_Load(RESOURCE_���b�N�}����__Tile__stage02_chip_b02_png);
var<Image> P_Tile_Fence5 = @@_Load(RESOURCE_���b�N�}����__Tile__stage02_chip_b09_png);
var<Image> P_Tile_Fence6 = @@_Load(RESOURCE_���b�N�}����__Tile__stage02_chip_b06_png);
var<Image> P_Tile_Fence7 = @@_Load(RESOURCE_���b�N�}����__Tile__stage02_chip_b03_png);
var<Image> P_Tile_Fence8 = @@_Load(RESOURCE_���b�N�}����__Tile__stage02_chip_b04_png);
var<Image> P_Tile_Fence9 = @@_Load(RESOURCE_���b�N�}����__Tile__stage02_chip_b05_png);

/*
	����(��)
*/
var<Image> P_Tile_Brick_S = @@_Load(RESOURCE_���b�N�}����__Tile__stage01_chip_e01_png);

/*
	����(��)
*/
var<Image> P_Tile_Brick_L1 = @@_Load(RESOURCE_���b�N�}����__Tile__stage02_chip_c01_png);
var<Image> P_Tile_Brick_L2 = @@_Load(RESOURCE_���b�N�}����__Tile__stage02_chip_c02_png);
var<Image> P_Tile_Brick_L3 = @@_Load(RESOURCE_���b�N�}����__Tile__stage02_chip_c03_png);

/*
	��q
*/
var<Image> P_Tile_Ladder = @@_Load(RESOURCE_���b�N�}����__Tile__stage02_chip_d01_png);

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
