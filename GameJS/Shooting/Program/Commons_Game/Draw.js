/*
	描画
*/

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

	例：画面の中心に描画
		Draw(img, Screen_W / 2, Screen_H / 2, 1.0, 0.0, 1.0);
*/
function <void> Draw(<Image> image, <double> x, <double> y, <double> a, <double> r, <double> z)
{
	var<int> w = image.naturalWidth;
	var<int> h = image.naturalHeight;

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
