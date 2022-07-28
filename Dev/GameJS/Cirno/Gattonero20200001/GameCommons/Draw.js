/*
	描画
*/

// 画像の幅を取得する。
function <int> GetPicture_W(<Image> image)
{
	return image.naturalWidth;
}

// 画像の高さを取得する。
function <int> GetPicture_H(<Image> image)
{
	return image.naturalHeight;
}

// スクリーンのクリア
function <void> ClearScreen()
{
	Context.clearRect(0, 0, Screen_W, Screen_H);
}

/*
	描画

	x: 画像の中心とする X-座標
	y: 画像の中心とする Y-座標
	a: 不透明度 (0.0 透明 ～ 1.0 不透明)
	r: 回転
		0.0 == 回転無し
		2*PI == 時計回りに1回転
		-2*PI == 反時計回りに1回転
	z: 拡大率
		1.0 == 等倍
		2.0 == 2倍
		0.5 == 0.5倍
*/
function <void> Draw(<Image> image, <double> x, <double> y, <double> a, <double> r, <double> z)
{
	var<int> w = GetPicture_W(image);
	var<int> h = GetPicture_H(image);

	w *= z;
	h *= z;

	var<double> l = x - w / 2;
	var<double> t = y - h / 2;

	Context.translate(x, y);
	Context.rotate(r);
	Context.translate(-x, -y);
	Context.globalAlpha = a;

	Context.drawImage(image, l, t, w, h);

	// restore
	Context.translate(x, y);
	Context.rotate(-r);
	Context.translate(-x, -y);
	Context.globalAlpha = 1.0;
}
