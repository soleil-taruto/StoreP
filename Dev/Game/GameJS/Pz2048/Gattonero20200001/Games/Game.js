/*
	�Q�[���E���C��
*/

var<int> Gravity = 2; // �d�͕��� (2, 4, 6, 8 : ��, ��, �E, ��)

/*
	�e�[�u��

	�Y���F
		Table[x][y]

		x == 0 �` (Field_XNum - 1)
		y == 0 �` (Field_YNum - 1)

	�l�F
		-1 == �����Ȃ�
		0�` == �p�l���L�� (0 �` (P_�����p�l��.length - 1))
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

		// �g���`��
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

		// �p�l���`��
		{
			for (var<int> x = 0; x < Field_XNum; x++)
			for (var<int> y = 0; y < Field_YNum; y++)
			{
				if (Table[x][y] != -1)
				{
					Draw(
						P_�����p�l��[Table[x][y]],
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
