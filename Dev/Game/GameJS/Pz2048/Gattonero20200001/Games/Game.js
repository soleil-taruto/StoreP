/*
	ゲーム・メイン
*/

var<int> Gravity = 2; // 重力方向 (2, 4, 6, 8) == (下, 左, 右, 上)

/*
	テーブル

	添字：
		Table[x][y]

		x == 0 ～ (Field_XNum - 1)
		y == 0 ～ (Field_YNum - 1)

	特殊な値：
		null == 何もない

*/
var<Panel_t[][]> Table;

function* <generatorForTask> GameMain()
{
	// init Table
	{
		Table = [];

		for (var<int> x = 0; x < Field_XNum; x++)
		{
			Table[x] = [];

			for (var<int> y = 0; y < Field_YNum; y++)
			{
				Table[x][y] = null;
			}
		}
	}

	{
		var<int> x = ToFix(Field_XNum / 2);
		var<int> y = ToFix(Field_YNum / 2);

		var<D2Point_t> pt = TablePointToPoint(CreateI2Point(x, y));

		Table[x][y] = CreatePanel(0, pt.X, pt.Y);
	}

	ClearMouseDown();

	for (; ; )
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

		// パネル描画
		{
			for (var<int> x = 0; x < Field_XNum; x++)
			for (var<int> y = 0; y < Field_YNum; y++)
			{
				if (Table[x][y] != null)
				{
					DrawPanel(Table[x][y]);
				}
			}
		}

		// (G)描画
		{
			var<double> x = Field_L + Field_W / 2;
			var<double> y = Field_T + Field_H / 2;

			var<double> G_FAR = 300.0;

			if (Gravity == 2)
			{
				y += G_FAR;
			}
			else if (Gravity == 4)
			{
				x -= G_FAR;
			}
			else if (Gravity == 6)
			{
				x += G_FAR;
			}
			else if (Gravity == 8)
			{
				y -= G_FAR;
			}
			else
			{
				error();
			}

			Draw(P_Gravity, x, y, 1.0, 0.0, 1.0);
		}

		var inputGravity = 5; // (2, 4, 5, 6, 8) == (下, 左, 無入力, 右, 上)

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

		if (inputGravity != 5)
		{
			Gravity = inputGravity;
		}

		yield 1;
	}
	ClearMouseDown();
}

/*
	テーブル座標から描画位置を得る。
*/
function <D2Point_t> TablePointToPoint(<I2Point_t> pt)
{
	var ret =
	{
		X: Field_L + Cell_W * pt.X + Cell_W / 2,
		Y: Field_T + Cell_H * pt.Y + Cell_H / 2,
	};

	return ret;
}
