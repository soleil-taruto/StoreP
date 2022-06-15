/*
	�Q�[���E���C��
*/

var<int> Gravity = 2; // �d�͕��� (2, 4, 6, 8) == (��, ��, �E, ��)

/*
	�e�[�u��

	�Y���F
		Table[x][y]

		x == 0 �` (Field_XNum - 1)
		y == 0 �` (Field_YNum - 1)

	����Ȓl�F
		null == �����Ȃ�

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
				if (Table[x][y] != null)
				{
					DrawPanel(Table[x][y]);
				}
			}
		}

		// (G)�`��
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

		var inputGravity = 5; // (2, 4, 5, 6, 8) == (��, ��, ������, �E, ��)

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

		if (inputGravity != 5)
		{
			Gravity = inputGravity;
		}

		yield 1;
	}
	ClearMouseDown();
}

/*
	�e�[�u�����W����`��ʒu�𓾂�B
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
