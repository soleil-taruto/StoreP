/*
	部屋(ステージ)選択メニュー
*/

var<int> @@_PANEL_L = 50; // 左上パネルの左座標
var<int> @@_PANEL_T = 50; // 左上パネルの上座標
var<int> @@_PANEL_W = 160;
var<int> @@_PANEL_H = 160;
var<int> @@_PANEL_X_GAP = 20;
var<int> @@_PANEL_Y_GAP = 20;
var<int> @@_PANEL_X_NUM = 3;
var<int> @@_PANEL_Y_NUM = 3;

var<int> @@_RETURN_BUTTON_L = 100;
var<int> @@_RETURN_BUTTON_T = 500;
var<int> @@_RETURN_BUTTON_W = 700;
var<int> @@_RETURN_BUTTON_H = 100;

function* <generatorForTask> MapSelectMenu()
{
	yield* @@_EnterMotion();

	var<int> selectX = 0;
	var<int> selectY = 0;

	for (; ; )
	{
		if (DEBUG && GetKeyInput(85) == 1) // ? U -> 全ステージ開放 -- (デバッグ用)
		{
			CanPlayStageIndex = GetMapCount() - 1;
			SaveLocalStorage();
			SE(S_Dead);
		}

		var<int> mapIndex = -1; // -1 == 無効

		if (GetMouseDown() == -1)
		{
			var<double> mx = GetMouseX();
			var<double> my = GetMouseY();

			var<int> index = 1;

			for (var<int> y = 0; y < @@_PANEL_Y_NUM; y++)
			for (var<int> x = 0; x < @@_PANEL_X_NUM; x++)
			{
				var<int> l = @@_PANEL_L + x * (@@_PANEL_W + @@_PANEL_X_GAP);
				var<int> t = @@_PANEL_T + y * (@@_PANEL_H + @@_PANEL_Y_GAP);
				var<int> w = @@_PANEL_W;
				var<int> h = @@_PANEL_H;

				if (!IsOut(
					CreateD2Point(mx, my),
					CreateD4Rect(l, t, w, h),
					0.0
					))
				{
					mapIndex = index;
				}

				index++;
			}
		}
		if (IsPound(GetInput_2()))
		{
			selectY++;
		}
		if (IsPound(GetInput_4()))
		{
			selectX--;
		}
		if (IsPound(GetInput_6()))
		{
			selectX++;
		}
		if (IsPound(GetInput_8()))
		{
			selectY--;
		}
		if (IsPound(GetInput_A()))
		{
			mapIndex = selectX + selectY * @@_PANEL_Y_NUM + 1;
		}
		if (IsPound(GetInput_B()))
		{
			break; // タイトルへ戻る
		}

		if (mapIndex != -1)
		{
			if (CanPlayStageIndex < mapIndex) // ? プレイ不可 -- 直前のステージをクリアしていない。
			{
				// noop
			}
			else // ? プレイ可能
			{
				yield* @@_Game(mapIndex);

				{
					var index = @@_LastMapIndex - 1;

					selectX = index % @@_PANEL_X_NUM;
					selectY = ToFix(index / @@_PANEL_Y_NUM);
				}
			}
		}

		selectX += @@_PANEL_X_NUM;
		selectX %= @@_PANEL_X_NUM;

		selectY += @@_PANEL_Y_NUM;
		selectY %= @@_PANEL_Y_NUM;

		// 描画ここから

		DrawWall();

		mapIndex = 1;

		for (var<int> y = 0; y < @@_PANEL_Y_NUM; y++)
		for (var<int> x = 0; x < @@_PANEL_X_NUM; x++)
		{
			var<int> l = @@_PANEL_L + x * (@@_PANEL_W + @@_PANEL_X_GAP);
			var<int> t = @@_PANEL_T + y * (@@_PANEL_H + @@_PANEL_Y_GAP);

			if (x == selectX && y == selectY)
			{
				if (CanPlayStageIndex < mapIndex)
				{
					SetColor("#808000");
				}
				else
				{
					SetColor("#ffff00");
				}
			}
			else
			{
				if (CanPlayStageIndex < mapIndex)
				{
					SetColor("#808080");
				}
				else
				{
					SetColor("#ffffff");
				}
			}

			PrintRect(l, t, @@_PANEL_W, @@_PANEL_H);
			SetColor("#000000");
			SetPrint(l + 30, t + 110, 0);
			SetFSize(80);
			PrintLine(ZPad(mapIndex, 2, "0"));

			mapIndex++;
		}

		DrawFront();

		yield 1;
	}

	yield* @@_LeaveMotion();
}

/*
	この画面へやってきた時のモーション
*/
function* <generatorForTask> @@_EnterMotion()
{
	SetCurtain();
	FreezeInput();
	FreezeInputUntilRelease();

	Play(M_Title);
}

/*
	この画面から離れる時のモーション
*/
function* <generatorForTask> @@_LeaveMotion()
{
	FreezeInput();
	Fadeout();
	SetCurtain_FD(30, -1.0);

	for (var<Scene_t> scene of CreateScene(40))
	{
		DrawWall();
		DrawFront();

		yield 1;
	}
}

/*
	背景描画
*/
function <void> DrawWall()
{
	SetColor("#004060");
	PrintRect(0, 0, Screen_W, Screen_H);
}

/*
	前面描画
*/
function <void> DrawFront()
{
	SetColor("#ffffff");
	SetPrint(Screen_W - 360, Screen_H - 15, 0);
	SetFSize(20);
	PrintLine("Ｂボタンを押すとタイトルに戻ります");
}

var<int> @@_LastMapIndex;

function* <generatorForTask> @@_Game(<int> startMapIndex)
{
	yield* @@_LeaveMotion();

gameBlock:
	{
		for (var<int> mapIndex = startMapIndex; mapIndex < GetMapCount(); mapIndex++)
		{
			@@_LastMapIndex = mapIndex;
			yield* GameMain(mapIndex);

			if (GameEndReason == GameEndReason_e_RETURN_MENU)
			{
				break gameBlock;
			}

			CanPlayStageIndex = Math.max(CanPlayStageIndex, mapIndex + 1);
			SaveLocalStorage();
		}
		yield* Ending();
	}

	yield* @@_EnterMotion();
}
