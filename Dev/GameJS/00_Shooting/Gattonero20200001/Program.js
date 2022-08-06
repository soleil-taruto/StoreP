/*
	アプリケーション用メインモジュール
*/

setTimeout(Main, 0);

function <void> Main()
{
	@@_Loading();
}

function <void> @@_Loading()
{
	if (1 <= Loading)
	{
		@@_PrintLoading();
		setTimeout(@@_Loading, 100);
	}
	else
	{
		@@_PrintLoaded();
		@@_Loaded();
	}
}

var<int> @@_LOADING_MAX = -1;

function <void> @@_PrintLoading()
{
	if (@@_LOADING_MAX == -1)
	{
		@@_LOADING_MAX = Loading;

		CanvasBox = document.getElementById("Gattonero20200001-CanvasBox");
		CanvasBox.style.width  = Screen_W;
		CanvasBox.style.height = Screen_H;
	}
	CanvasBox.innerText = "" + ((@@_LOADING_MAX - Loading) / @@_LOADING_MAX);
}

function <void> @@_PrintLoaded()
{
	@@_PrintLoading(); // 2bs

	CanvasBox.innerText = "";
	CanvasBox = null;
}

function <void> @@_Loaded()
{
	ProcMain(@@_Main());
}

function* <generatorForTask> @@_Main()
{
	if (DEBUG)
	{
		// -- choose one --

//		yield* Test01();
//		yield* Test02();
//		yield* Test03();
		yield* @@_Main2();

		// --
	}
	else
	{
		yield* @@_Main2();
	}
}

// 本番用メイン
function* <generatorForTask> @@_Main2()
{
	yield* TitleMain();
}
