/*
	部屋(ステージ)選択メニュー
*/

var<int> PANEL_L = 50; // 左上パネルの左座標
var<int> PANEL_T = 50; // 左上パネルの上座標
var<int> PANEL_W = 160;
var<int> PANEL_H = 160;
var<int> PANEL_X_GAP = 20;
var<int> PANEL_Y_GAP = 20;
var<int> PANEL_X_NUM = 4;
var<int> PANEL_Y_NUM = 4;

function* <generatorForTask> MapSelectMenu()
{
	FreezeInput();

	for (; ; )
	{
		if (GetMouseDown() == -1)
		{
			var<double> mx = GetMouseX();
			var<double> my = GetMouseY();

			var<int> index = 0;

			for (var<int> y = 0; y < PANEL_Y_NUM; y++)
			for (var<int> x = 0; x < PANEL_X_NUM; x++)
			{
				var<int> l = PANEL_L + x * (PANEL_W + PANEL_X_GAP);
				var<int> t = PANEL_T + y * (PANEL_H + PANEL_Y_GAP);
				var<int> w = PANEL_W;
				var<int> h = PANEL_H;

				if (!IsOut(
					CreateD2Point(mx, my),
					CreateD4Rect(l, t, w, h),
					0.0
					))
				{
					FreezeInput();
					yield* @@_Game(index);
					FreezeInput();
				}
			}
		}

		// 描画ここから

		SetColor("#004060");
		PrintRect(0, 0, Screen_W, Screen_H);

		var<int> index = 0;

		for (var<int> y = 0; y < PANEL_Y_NUM; y++)
		for (var<int> x = 0; x < PANEL_X_NUM; x++)
		{
			var<int> l = PANEL_L + x * (PANEL_W + PANEL_X_GAP);
			var<int> t = PANEL_T + y * (PANEL_H + PANEL_Y_GAP);

			SetColor("#ffffff");
			PrintRect(l, t, PANEL_W, PANEL_H);
			SetColor("#000000");
			SetPrint(l + 30, t + 100, 0);
			SetFSize(80);
			PrintLine(ZPad(index + 1, 2, "0"));

			index++;
		}

		yield 1;
	}
	FreezeInput();
}

function* <void> @@_Game(<int> startMapIndex)
{
	for (var<int> mapIndex = startMapIndex; mapIndex < GetMapCount(); mapIndex++)
	{
		yield* GameMain(mapIndex);
	}
}
