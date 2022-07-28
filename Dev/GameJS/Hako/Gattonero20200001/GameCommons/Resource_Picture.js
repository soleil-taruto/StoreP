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
var<Image> P_Wall = @@_Load(RESOURCE_Picture__Wall_png);
var<Image> P_Goal = @@_Load(RESOURCE_Picture__Goal_png);
var<Image> P_背景 = @@_Load(RESOURCE_Picture__Background_png);
var<Image> P_Enemy_B = @@_Load(RESOURCE_Picture__敵青_png);
var<Image> P_Enemy_R = @@_Load(RESOURCE_Picture__敵赤_png);
var<Image> P_Enemy_G = @@_Load(RESOURCE_Picture__敵緑_png);
