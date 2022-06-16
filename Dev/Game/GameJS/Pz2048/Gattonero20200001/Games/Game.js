/*
	�Q�[���E���C��
*/

var<int> @@_Gravity = 2; // �d�͕��� (2, 4, 6, 8) == (��, ��, �E, ��)

/*
	�e�[�u��

	�Y���F
		@@_Table[x][y]

		x == 0 �` (Field_XNum - 1)
		y == 0 �` (Field_YNum - 1)

	����Ȓl�F
		null == �����Ȃ�
*/
var<Panel_t[][]> @@_Table;

/*
	�e�[�u�����W����`��ʒu�𓾂�B
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
	�`��ʒu����e�[�u�����W�𓾂�B
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

	// �����p�l���z�u
	{
		var<int> x = ToFix(Field_XNum / 2);
		var<int> y = ToFix(Field_YNum / 2);

		@@_Table[x][y] = CreatePanel(0);
	}

	ClearMouseDown();

	for (; ; )
	{
		var inputGravity = -1; // (-1, 2, 4, 6, 8) == (������, ��, ��, �E, ��)

		if (GetMouseDown() == -1) // ? �}�E�X�E�{�^���𗣂����B
		{
			var<double> x = GetMouseX();
			var<double> y = GetMouseY();

			// �t�B�[���h�̒��S���W�� (0, 0) �ɂȂ�悤�ɕύX
			//
			x -= Field_L + Field_W / 2;
			y -= Field_T + Field_H / 2;

			if (x - y < 0) // ? ���S���猩�č���
			{
				if (x + y < 0) // ? ���S���猩�č�
				{
					inputGravity = 4;
				}
				else // ? ���S���猩�ĉ�
				{
					inputGravity = 2;
				}
			}
			else // ? ���S���猩�ĉE��
			{
				if (x + y < 0) // ? ���S���猩�ď�
				{
					inputGravity = 8;
				}
				else // ? ���S���猩�ĉE
				{
					inputGravity = 6;
				}
			}
		}

		if (inputGravity != -1)
		{
			@@_Gravity = inputGravity;

			// ����
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

							// ? �����\�� -> ��������B
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
		}

		// ====
		// �`�悱������
		// ====

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
				if (@@_Table[x][y] != null)
				{
					var<I2Point_t> table_pt = CreateI2Point(x, y);
					var<D2Point_t> draw_pt = TablePointToDrawPoint(table_pt);

					DrawPanel(@@_Table[x][y], draw_pt.X, draw_pt.Y);
				}
			}
		}

		// (G)�`��
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

		yield 1;
	}
	ClearMouseDown();
}