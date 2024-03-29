/*
	ゲーム用メインモジュール
*/

// *_INIT イベントのリスト
var<Action[]> @@_INIT_Events = [ @(INIT) ];

// *_EACH イベントのリスト
var<Action[]> @@_EACH_Events = [ @(EACH) ];

// アプリケーション側の処理
// ジェネレータであること。
var<generatorForTask> @@_AppMain;

// 描画先Canvasタグ
var Canvas;

// 描画先Canvasを格納するDivタグ
var CanvasBox;

// ゲーム用メイン
// appMain: アプリケーション側の処理
// -- ジェネレータであること。
function <void> ProcMain(<generatorForTask> appMain)
{
	@@_AppMain = appMain;

	/*
	memo:
		Canvas.width, Canvas.height == スクリーン・サイズ
		Canvas.style.width, Canvas.style.height == 表示上のサイズ
	*/

	Canvas = document.createElement("canvas");
	Canvas.width  = Screen_W;
	Canvas.height = Screen_H;
	Canvas.style.width  = "calc(min(" + Canvas_W + "px, 100%))";
//	Canvas.style.height = Screen_H + "px";
	Canvas.style.height = "";

	CanvasBox = document.getElementById("Gattonero20200001-CanvasBox");
	CanvasBox.style.width  = "calc(min(" + Canvas_W + "px, 100%))";
//	CanvasBox.style.height = Screen_H + "px";
	CanvasBox.style.height = "";
	CanvasBox.innerHTML = "";
	CanvasBox.appendChild(Canvas);

	for (var<Action> event of @@_INIT_Events)
	{
		LOGPOS();
		event();
		LOGPOS();
	}

	LoadLocalStorage();
	@@_Anime();
}

// リフレッシュレート高過ぎ検知用時間
var<int> @@_HzChaserTime = 0;

// プロセスフレームカウンタ
var<int> ProcFrame = 0;

// 描画先コンテキスト(描画先スクリーン)
var Context = null;

function <void> @@_Anime()
{
	var<int> currTime = new Date().getTime();

	@@_HzChaserTime = Math.max(@@_HzChaserTime, currTime - 100);
	@@_HzChaserTime = Math.min(@@_HzChaserTime, currTime + 100);

	if (@@_HzChaserTime < currTime)
	{
		Context = Canvas.getContext("2d");
		@@_AppMain.next();

		for (var<Action> event of @@_EACH_Events)
		{
			event();
		}

		Context = null;
		@@_HzChaserTime += 16;
		ProcFrame++;
	}
	requestAnimationFrame(@@_Anime);
}
