/*
	ゲーム用メインモジュール
*/

// 画面の幅
var int Screen_W = 960;

// 画面の高さ
var int Screen_H = 540;

// アプリケーション側の処理
// ジェネレータであること。
var GEN @@_AppMain;

// *_INIT イベントのリスト
var FUNC[] @@_INIT_Events = [ @(INIT) ];

// *_EACH イベントのリスト
var FUNC[] @@_EACH_Events = [ @(EACH) ];

// 描画先Canvasタグ
var T Canvas;

// Canvasを入れておくDivタグ
var T CanvasBox;

// ゲーム用メイン
// appMain: アプリケーション側の処理
// -- ジェネレータであること。
function void ProcMain(GEN appMain)
{
	@@_AppMain = appMain;

	Canvas = document.createElement("canvas");
	Canvas.style.position = "fixed";
	Canvas.width  = Screen_W;
	Canvas.height = Screen_H;

	CanvasBox = document.createElement("div");
	CanvasBox.style.position = "fixed";
	CanvasBox.appendChild(Canvas);
	document.body.appendChild(CanvasBox);

	AddResized(@@_Resized);
	@@_Resized();

	for (var event of @@_INIT_Events)
	{
		LOGPOS;
		event();
		LOGPOS;
	}

	@@_Anime();
}

function void @@_Resized()
{
	int sw = window.innerWidth;
	int sh = window.innerHeight;

	int w = sw;
	int h = Math.round((Screen_H * sw) / Screen_W);

	if (sh < h)
	{
		h = sh;
		w = Math.round((Screen_W * sh) / Screen_H);
	}
	int l = Math.round((sw - w) / 2);
	int t = Math.round((sh - h) / 2);

	Canvas.style.left   = l + "px";
	Canvas.style.top    = t + "px";
	Canvas.style.width  = w + "px";
	Canvas.style.height = h + "px";

	CanvasBox.style.left   = l + "px";
	CanvasBox.style.top    = t + "px";
	CanvasBox.style.width  = w + "px";
	CanvasBox.style.height = h + "px";
}

// リフレッシュレート高過ぎ検知用時間
var int @@_HzChaserTime = 0;

// プロセスフレームカウンタ
var int ProcFrame = 0;

// 描画先コンテキスト(描画先スクリーン)
var T Context = null;

function void @@_Anime()
{
	int currTime = new Date().getTime();

	@@_HzChaserTime = ToRange(
		@@_HzChaserTime,
		currTime - 100,
		currTime + 100
		);

	if (@@_HzChaserTime < currTime)
	{
		Context = Canvas.getContext("2d");
		@@_AppMain.next();

		for (var event of @@_EACH_Events)
		{
			event();
		}

		Context = null;
		@@_HzChaserTime += 16;
		ProcFrame++;
	}
	requestAnimationFrame(@@_Anime);
}
