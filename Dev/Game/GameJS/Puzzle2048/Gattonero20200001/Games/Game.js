/*
	ゲーム・メイン
*/

var<int> @@_Gravity = 2; // 重力方向 (2, 4, 6, 8) == (下, 左, 右, 上)

/*
	テーブル

	添字：
		@@_Table[x][y]

		x == 0 〜 (Field_XNum - 1)
		y == 0 〜 (Field_YNum - 1)

	特殊な値：
		null == 何もない
*/
var<Panel_t[][]> @@_Table;

/*
	テーブル座標から描画位置を得る。
*/
function <D2Point_t> TablePointToDrawPoint(<I2Point_t> pt)
{
	var ret =
	{
		X: Field_L + Cell_W * pt.X + Cell_W / 2,
		Y: Field_T + Cell_H * pt.Y + Cell_H / 2,
	};

	return ret;
}

/*
	描画位置からテーブル座標を得る。
*/
function <I2Point_t> DrawPointToTablePoint(<D2Point_t> pt)
{
	var<int> x = ToFix((pt.X - Field_L) / Cell_W);
	var<int> y = ToFix((pt.Y - Field_T) / Cell_H);

	x = ToRange(x, 0, Field_XNum - 1);
	y = ToRange(y, 0, Field_YNum - 1);

	return CreateI2Point(x, y);
}

function* <generatorForTask> GameMain()
{
	// init @@_Table
	{
		@@_Table = [];

		for (var<int> x = 0; x < Field_XNum; x++)
		{
			@@_Table[x] = [];

			for (var<int> y = 0; y < Field_YNum; y++)
			{
				@@_Table[x][y] = null;
			}
		}
	}

	// 初期パネル配置
	{
		var<int> x = ToFix(Field_XNum / 2);
		var<int> y = ToFix(Field_YNum / 2);

		@@_Table[x][y] = CreatePanel(0);
	}

	ClearMouseDown();

	for (; ; )
	{
		var inputGravity = -1; // (-1, 2, 4, 6, 8) == (無入力, 下, 左, 右, 上)

		if (GetMouseDown() == -1) // ? マウス・ボタンを離した。
		{
			var<double> x = GetMouseX();
			var<double> y = GetMouseY();

			// フィールドの中心座標が (0, 0) になるように変更
			//
			x -= Field_L + Field_W / 2;
			y -= Field_T + Field_H / 2;

			if (x - y < 0) // ? 中心から見て左下
			{
				if (x + y < 0) // ? 中心から見て左
				{
					inputGravity = 4;
				}
				else // ? 中心から見て下
				{
					inputGravity = 2;
				}
			}
			else // ? 中心から見て右上
			{
				if (x + y < 0) // ? 中心から見て上
				{
					inputGravity = 8;
				}
				else // ? 中心から見て右
				{
					inputGravity = 6;
				}
			}
		}

		if (inputGravity != -1)
		{
			@@_Gravity = inputGravity;

			yield* @@_GravityChanged();
		}

		// ====
		// 描画ここから
		// ====

		@@_DrawWall();

		// パネル描画
		{
			for (var<int> x = 0; x < Field_XNum; x++)
			for (var<int> y = 0; y < Field_YNum; y++)
			{
				if (@@_Table[x][y] != null)
				{
					var<I2Point_t> table_pt = CreateI2Point(x, y);
					var<D2Point_t> draw_pt = TablePointToDrawPoint(table_pt);

					DrawPanel(@@_Table[x][y], draw_pt.X, draw_pt.Y);
				}
			}
		}

		yield 1;
	}
	ClearMouseDown();
}

function* <generatorForTask> @@_GravityChanged()
{
	// 落下前描画位置保存
	for (var<int> x = 0; x < Field_XNum; x++)
	for (var<int> y = 0; y < Field_YNum; y++)
	{
		var<Panel_t> panel = @@_Table[x][y];

		if (panel != null)
		{
			var<D2Point_t> draw_pt = TablePointToDrawPoint(CreateI2Point(x, y));

			panel.DrawPt = draw_pt;
		}
	}

	// 落下
	{
		var<int> dx = 0;
		var<int> dy = 0;

		if (@@_Gravity == 2)
		{
			dy = 1;
		}
		else if (@@_Gravity == 4)
		{
			dx = -1;
		}
		else if (@@_Gravity == 6)
		{
			dx = 1;
		}
		else if (@@_Gravity == 8)
		{
			dy = -1;
		}
		else
		{
			error();
		}

		for (var<boolean> moved = true; moved; )
		{
			moved = false;

			for (var<int> x = 0; x < Field_XNum; x++)
			for (var<int> y = 0; y < Field_YNum; y++)
			{
				if (@@_Table[x][y] != null)
				{
					var<int> nx = x + dx;
					var<int> ny = y + dy;

					// ? 落下可能か -> 落下する。
					if (
						0 <= nx && nx < Field_XNum &&
						0 <= ny && ny < Field_YNum &&
						@@_Table[nx][ny] == null
						)
					{
						@@_Table[nx][ny] = @@_Table[x][y];
						@@_Table[x][y] = null;

						moved = true;
					}
				}
			}
		}
	}

	// 落下後描画位置保存
	for (var<int> x = 0; x < Field_XNum; x++)
	for (var<int> y = 0; y < Field_YNum; y++)
	{
		var<Panel_t> panel = @@_Table[x][y];

		if (panel != null)
		{
			var<D2Point_t> draw_pt = TablePointToDrawPoint(CreateI2Point(x, y));

			panel.DrawPtDest = draw_pt;

			// 接地済みの場合は接地状態にする。
			{
				var<double> distance = GetDistance(
					panel.DrawPt.X - panel.DrawPtDest.X,
					panel.DrawPt.Y - panel.DrawPtDest.Y
					);

				if (distance < MICRO)
				{
					panel.DrawPtDest = null;
				}
			}
		}
	}

	// 落下モーション
	{
		var<boolean> moved = true;

		for (var<int> fallCount = 0; moved; fallCount++)
		{
			moved = false;

			@@_DrawWall();

			var<double> fallSpeed = fallCount * 3.0;

			for (var<int> x = 0; x < Field_XNum; x++)
			for (var<int> y = 0; y < Field_YNum; y++)
			{
				var<Panel_t> panel = @@_Table[x][y];

				if (panel == null)
				{
					continue;
				}
				if (panel.DrawPtDest != null) // ? 未接地
				{
					var<double> distance = GetDistance(
						panel.DrawPt.X - panel.DrawPtDest.X,
						panel.DrawPt.Y - panel.DrawPtDest.Y
						);

					if (distance < fallSpeed) // ? 今回で接地する
					{
						panel.DrawPt.X = panel.DrawPtDest.X;
						panel.DrawPt.Y = panel.DrawPtDest.Y;

						AddEffect(Effect_Dummy(panel.DrawPt.X, panel.DrawPt.Y)); // 暫定

						panel.DrawPtDest = null;
					}
					else // ? 接地まだ
					{
						var<D2Point_t> speed = MakeXYSpeed(panel.DrawPt.X, panel.DrawPt.Y, panel.DrawPtDest.X, panel.DrawPtDest.Y, fallSpeed);

						panel.DrawPt.X += speed.X;
						panel.DrawPt.Y += speed.Y;
					}

					moved = true;
				}

				DrawPanel(panel, panel.DrawPt.X, panel.DrawPt.Y);
			}

			yield 1;
		}
	}

	if (@@_Fusion())
	{
		// 融合の余韻
		{
			for (var<Scene_t> scene of CreateScene(20))
			{
				@@_DrawWall();

				for (var<int> x = 0; x < Field_XNum; x++)
				for (var<int> y = 0; y < Field_YNum; y++)
				{
					var<Panel_t> panel = @@_Table[x][y];

					if (panel != null)
					{
						var<D2Point_t> draw_pt = TablePointToDrawPoint(CreateI2Point(x, y));

						DrawPanel(panel, draw_pt.X, draw_pt.Y);
					}
				}

				yield 1;
			}
		}

		yield* @@_GravityChanged(); // ★再起★
		return;
	}

	@@_AddNewPanel();
}

function <boolean> @@_Fusion() // ret: ? 融合した。
{
	var<int> dx = 0;
	var<int> dy = 0;

	if (@@_Gravity == 2)
	{
		dy = 1;
	}
	else if (@@_Gravity == 4)
	{
		dx = -1;
	}
	else if (@@_Gravity == 6)
	{
		dx = 1;
	}
	else if (@@_Gravity == 8)
	{
		dy = -1;
	}
	else
	{
		error();
	}

	var<int[][]> xyList = [];

	for (var<int> x = 0; x < Field_XNum; x++)
	for (var<int> y = 0; y < Field_YNum; y++)
	{
		xyList.push([ x, y ]);
	}

	Shuffle(xyList);

	var<int[][]> xyPairs = [];

	for (var<int[]> xy of xyList)
	{
		var<int> x = xy[0];
		var<int> y = xy[1];

		if (@@_Table[x][y] == null)
		{
			continue;
		}

		var<int> nx = x + dx;
		var<int> ny = y + dy;

		// ? 融合するか
		if (
			0 <= nx && nx < Field_XNum &&
			0 <= ny && ny < Field_YNum &&
			@@_Table[nx][ny] != null &&
			@@_Table[nx][ny].Exponent == @@_Table[x][y].Exponent &&
			@@_F_NotExistInXYPairs(xyPairs, x, y) &&
			@@_F_NotExistInXYPairs(xyPairs, nx, ny)
			)
		{
			xyPairs.push([ x, y, nx, ny ]);
		}
	}

	for (var<int[]> xyPair of xyPairs)
	{
		var x  = xyPair[0];
		var y  = xyPair[1];
		var nx = xyPair[2];
		var ny = xyPair[3];

		@@_Table[nx][ny] = null;
		@@_Table[x][y].Exponent++;

		var<D2Point_t> draw_pt = TablePointToDrawPoint(CreateI2Point(x, y));

		AddEffect(Effect_Dummy(draw_pt.X, draw_pt.Y)); // 暫定
	}

	var<boolean> 融合した = 1 <= xyPairs.length;

	return 融合した;
}

function <boolean> @@_F_NotExistInXYPairs(<int[][]> xyPairs, <int> x, <int> y)
{
	for (var<int[]> xyPair of xyPairs)
	{
		if (
			xyPair[0] == x &&
			xyPair[1] == y
			)
		{
			return false;
		}

		if (
			xyPair[2] == x &&
			xyPair[3] == y
			)
		{
			return false;
		}
	}
	return true;
}

function <void> @@_AddNewPanel()
{
	var<int> count = 0;

	for (var<int> x = 0; x < Field_XNum; x++)
	for (var<int> y = 0; y < Field_YNum; y++)
	{
		if (@@_Table[x][y] != null)
		{
			count++;
		}
	}

	if (Field_XNum * Field_YNum * 0.5 < count) // ? パネル多い -> もう追加しない。
	{
		return;
	}

	while (!@@_TryAddNewPanel())
	{
		// noop
	}
}

function <boolean> @@_TryAddNewPanel() // ret: ? 設置完了
{
	var<int> x = GetRand(Field_XNum);
	var<int> y = GetRand(Field_YNum);

	if (@@_Table[x][y] != null)
	{
		return false;
	}

	for (var<int> xc = -1; xc <= 1; xc++)
	for (var<int> yc = -1; yc <= 1; yc++)
	{
		var sx = x + xc;
		var sy = y + yc;

		if (
			0 <= sx && sx < Field_XNum &&
			0 <= sy && sy < Field_YNum &&
			@@_Table[sx][sy] != null
			)
		{
			return false;
		}
	}

	@@_Table[x][y] = CreatePanel(GetRand(3));

	var<D2Point_t> draw_pt = TablePointToDrawPoint(CreateI2Point(x, y));

	AddEffect(Effect_Dummy(draw_pt.X, draw_pt.Y)); // 暫定

	return true;
}

/*
	背景描画
	全モーションで共通のパーツも描画
*/
function <void> @@_DrawWall()
{
	ClearScreen();

	// 枠線描画
	{
		var<int> BORDER = 10;

		SetColor("#c0a0a0");
		PrintRect(
			Field_L - BORDER,
			Field_T - BORDER,
			Field_W + BORDER * 2,
			Field_H + BORDER * 2
			);

		for (var<int> x = 0; x < Field_XNum; x++)
		for (var<int> y = 0; y < Field_YNum; y++)
		{
			if ((x + y) % 2 == 0)
			{
				SetColor("#a0a0a0");
			}
			else
			{
				SetColor("#c0c0c0");
			}
			PrintRect(
				Field_L + Cell_W * x,
				Field_T + Cell_H * y,
				Cell_W,
				Cell_H
				);
		}
	}

	// (G)描画
	{
		var<double> x = Field_L + Field_W / 2;
		var<double> y = Field_T + Field_H / 2;

		var<double> G_FAR = 300.0;

		if (@@_Gravity == 2)
		{
			y += G_FAR;
		}
		else if (@@_Gravity == 4)
		{
			x -= G_FAR;
		}
		else if (@@_Gravity == 6)
		{
			x += G_FAR;
		}
		else if (@@_Gravity == 8)
		{
			y -= G_FAR;
		}
		else
		{
			error();
		}

		Draw(P_Gravity, x, y, 1.0, 0.0, 1.0);
	}
}
