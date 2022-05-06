/*
	アプリケーション用メインモジュール
*/

var APP_IDENT = "{c496ce16-4117-4315-8d03-282dc4842266}";

window.onload = function() { Main(); }; // エントリーポイント呼び出し

// エントリーポイント
function <void> Main()
{
	ProcMain(@@_Main());
}

// メイン
function* <generatorForTask> @@_Main()
{
	// リソース読み込み中は待機
	while (1 <= Loading)
	{
		SetColor("#ffffff");
		PrintRect(0, 0, Screen_W, Screen_H);

		SetColor("#000000");
		SetFSize(16);
		SetPrint(10, 25, 0);
		PrintLine("リソースを読み込んでいます ...　残り " + Loading + " 個");

		yield 1;
	}

	// -- choose one --

	yield* @@_Main2();
//	yield* Test01();
//	yield* Test02();
//	yield* Test03();

	// --
}

// 本番用メイン
function* <generatorForTask> @@_Main2()
{
	yield* TitleMain();
}
