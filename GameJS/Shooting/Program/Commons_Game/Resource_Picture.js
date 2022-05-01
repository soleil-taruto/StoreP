/*
	画像
*/

function @@_Load(url)
{
	LOGPOS;
	Loading++;

	var image = new Image();

	image.src = url;
	image.onload = function()
	{
		LOGPOS;
		Loading--;
	};

	image.onerror = function()
	{
		error;
	};

	return image;
}

// ここから各種画像

// プリフィクス
// P_ ... 画像

var P_Dummy = @@_Load(Resources.General__Dummy_png); // ★サンプルとしてキープ
