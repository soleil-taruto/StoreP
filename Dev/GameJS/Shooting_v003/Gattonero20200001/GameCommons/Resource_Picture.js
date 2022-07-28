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

var<Image> P_Star_S = @@_Load(RESOURCE_Picture__光る星20_png);
var<Image> P_Player = @@_Load(RESOURCE_Picture__Player_png);
var<Image> P_Shot0001 = @@_Load(RESOURCE_Picture__Shot0001_png);
var<Image> P_Tama0001 = @@_Load(RESOURCE_Picture__Tama0001_png);
var<Image> P_Wall0001 = @@_Load(RESOURCE_Picture__Wall0001_png);
var<Image> P_Wall0002 = @@_Load(RESOURCE_Picture__Wall0002_png);
var<Image> P_Wall0003 = @@_Load(RESOURCE_Picture__Wall0003_png);
var<Image> P_Enemy0001 = @@_Load(RESOURCE_Picture__Enemy0001_png);
var<Image> P_Enemy0002 = @@_Load(RESOURCE_Picture__Enemy0002_png);
var<Image> P_Enemy0003 = @@_Load(RESOURCE_Picture__Enemy0003_png);
var<Image> P_Enemy0004 = @@_Load(RESOURCE_Picture__Enemy0004_png);
var<Image> P_Enemy0005 = @@_Load(RESOURCE_Picture__Enemy0005_png);
var<Image> P_Enemy0006 = @@_Load(RESOURCE_Picture__Enemy0006_png);
var<Image> P_Enemy0007 = @@_Load(RESOURCE_Picture__Enemy0007_png);
var<Image> P_Enemy0008 = @@_Load(RESOURCE_Picture__Enemy0008_png);
var<Image> P_PowerUpItem = @@_Load(RESOURCE_Picture__PowerUpItem_png);
var<Image> P_ZankiUpItem = @@_Load(RESOURCE_Picture__ZankiUpItem_png);
