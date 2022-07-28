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

var<Image> P_軌道 = @@_Load(RESOURCE_Picture__軌道_png);

var<Image[]> P_Balls =
[
	@@_Load(RESOURCE_Picture__00ff00_png),
	@@_Load(RESOURCE_Picture__00ffff_png),
	@@_Load(RESOURCE_Picture__0080ff_png),
	@@_Load(RESOURCE_Picture__ff0000_png),
	@@_Load(RESOURCE_Picture__ff00ff_png),
	@@_Load(RESOURCE_Picture__ff8000_png),
	@@_Load(RESOURCE_Picture__ffff00_png),
	@@_Load(RESOURCE_Picture__ffffff_png),
];

var<Image> P_Star_S = @@_Load(RESOURCE_Picture__光る星20_png);
