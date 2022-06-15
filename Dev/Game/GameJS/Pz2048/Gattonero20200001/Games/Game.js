/*
	ゲーム・メイン
*/

var<int> Gravity = 2; // 重力方向 (2, 4, 6, 8 : 下, 左, 右, 上)

/*
	テーブル

	添字：
		Table[x][y]

		x == 0 ～ (Field_XNum - 1)
		y == 0 ～ (Field_YNum - 1)

	値：
		-1 == 何もない
		0～ == パネル有り (0 ～ (P_数字パネル.length - 1))
*/
var<int[][]> Table;

function* <generatorForTask> GameMain()
{
	// init Table
	{
		Table = [];

		for (int x = 0; x < Field_XNum; x++)
		{
			Table[x] = [];

			for (int y = 0; y < Field_YNum; y++)
			{
				Table[x][y] = -1;
			}
		}
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
				if (Table[x][y] != -1)
				{
					Draw(
						P_数字パネル[Table[x][y]],
						Field_L + Cell_W * x + Cell_W / 2,
						Field_T + Cell_H * y + Cell_H / 2,
						1.0,
						0.0,
						1.0
						);
				}
			}
		}

		var inputGravity = 5;

		if (



		yield 1;
	}
	ClearMouseDown();
}
