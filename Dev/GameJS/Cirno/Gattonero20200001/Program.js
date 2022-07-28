/*
	アプリケーション用メインモジュール
*/

var<string> APP_IDENT = "{c9e92c41-52cf-44fe-8c46-b5139531e666}";

window.onload = function()
{
	Main();
};

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
		@@_Loaded();
	}
}

var @@_LOADING_MAX = -1;

function <void> @@_PrintLoading()
{
	if (@@_LOADING_MAX == -1)
	{
		@@_LOADING_MAX = Loading;
	}

	var<int> METER_W = Screen_W - 20;
	var<int> METER_H = 30;
	var<int> METER_L = ToInt((Screen_W - METER_W) / 2);
	var<int> METER_T = ToInt((Screen_H - METER_H) / 2);

	var<int> w = ToInt((METER_W * Loading) / @@_LOADING_MAX);
	var<int> d = METER_W - w;

	SetColor("#a0a0a0");
	PrintRect(0, 0, Screen_W, Screen_H);
	SetColor("#ffff00");
	PrintRect(METER_L, METER_T, w, METER_H);
	SetColor("#808080");
	PrintRect(METER_L + w, METER_T, d, METER_H);
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

//		yield* Test01(); // 各ステージをプレイ
//		yield* Test02(); // エンディング
//		yield* Test03();
		yield* @@_Main2();

		// --
	}
	else
	{
		yield* @@_Main2();
	}
}

function* <generatorForTask> @@_Main2()
{
	yield* EntranceMain();
}
