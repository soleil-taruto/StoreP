/*
	�Q�[���E���C��
*/

var<int> @@_Gravity = -1; // �d�͕��� (-1, 2, 4, 6, 8) == (����, ��, ��, �E, ��)

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

			yield* @@_GravityChanged();
		}

		// ====
		// �`�悱������
		// ====

		@@_DrawWall();

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

		yield 1;
	}
	ClearMouseDown();
}

function* <generatorForTask> @@_GravityChanged()
{
	// �����O�`��ʒu�ۑ�
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

	// ������`��ʒu�ۑ�
	for (var<int> x = 0; x < Field_XNum; x++)
	for (var<int> y = 0; y < Field_YNum; y++)
	{
		var<Panel_t> panel = @@_Table[x][y];

		if (panel != null)
		{
			var<D2Point_t> draw_pt = TablePointToDrawPoint(CreateI2Point(x, y));

			panel.DrawPtDest = draw_pt;

			// �ڒn�ς݂̏ꍇ�͐ڒn��Ԃɂ���B
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

	// �������[�V����
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
				if (panel.DrawPtDest != null) // ? ���ڒn
				{
					var<double> distance = GetDistance(
						panel.DrawPt.X - panel.DrawPtDest.X,
						panel.DrawPt.Y - panel.DrawPtDest.Y
						);

					if (distance < fallSpeed) // ? ����Őڒn����
					{
						panel.DrawPt.X = panel.DrawPtDest.X;
						panel.DrawPt.Y = panel.DrawPtDest.Y;

						AddEffect(Effect_Dummy(panel.DrawPt.X, panel.DrawPt.Y)); // �b��

						panel.DrawPtDest = null;
					}
					else // ? �ڒn�܂�
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
		// �Z���̗]�C
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

		yield* @@_GravityChanged(); // ���ċN��
		return;
	}

	@@_AddNewPanel();
}

function <boolean> @@_Fusion() // ret: ? �Z�������B
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

		// ? �Z�����邩
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

		AddEffect(Effect_Dummy(draw_pt.X, draw_pt.Y)); // �b��
	}

	var<boolean> �Z������ = 1 <= xyPairs.length;

	return �Z������;
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

	if (Field_XNum * Field_YNum * 0.5 < count) // ? �p�l������ -> �����ǉ����Ȃ��B
	{
		return;
	}

	while (!@@_TryAddNewPanel())
	{
		// noop
	}
}

function <boolean> @@_TryAddNewPanel() // ret: ? �ݒu����
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

	AddEffect(Effect_Dummy(draw_pt.X, draw_pt.Y)); // �b��

	return true;
}

/*
	�w�i�`��
	�S���[�V�����ŋ��ʂ̃p�[�c���`��
*/
function <void> @@_DrawWall()
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

	// (G)�`��
	//
	if (@@_Gravity != -1)
	{
		var<double> x = Field_L + Field_W / 2;
		var<double> y = Field_T + Field_H / 2;

		var<double> G_FAR = Field_W / 2 + 70.0;

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
