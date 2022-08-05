/*
	�Q�[���E���C��
*/

function* <generatorForTask> GameMain(<int> mapIndex)
{
	var<string> HAMMER_NAME = "DEFAULT";
	var<double> HAMMER_R = 24.0;
	var<double> HAMMER_AIR_TEIKOU = 0.97;

	// �n���}�[�ʒu
	//
	var<double> x = Screen_W / 2.0;
	var<double> y = Screen_H / 2.0;

	// �n���}�[���x
	//
	var<double> xAdd = 0.0;
	var<double> yAdd = 0.0;

	for (var<int> frame = 0; ; frame++)
	{
		if (GetKeyInput(97) == 1) // ? NUMPAD-1
		{
			HAMMER_NAME = "S";
			HAMMER_R = 24.0;
			HAMMER_AIR_TEIKOU = 0.97;
		}
		if (GetKeyInput(98) == 1) // ? NUMPAD-2
		{
			HAMMER_NAME = "M";
			HAMMER_R = 36.0;
			HAMMER_AIR_TEIKOU = 0.975;
		}
		if (GetKeyInput(99) == 1) // ? NUMPAD-3
		{
			HAMMER_NAME = "L";
			HAMMER_R = 48.0;
			HAMMER_AIR_TEIKOU = 0.98;
		}
		if (GetKeyInput(100) == 1) // ? NUMPAD-4
		{
			HAMMER_NAME = "XL";
			HAMMER_R = 60.0;
			HAMMER_AIR_TEIKOU = 0.99;
		}

		// �}�E�X�̈ʒu
		//
		var<double> mx = GetMouseX();
		var<double> my = GetMouseY();

		mx = ToRange(mx, 0.0, Screen_W);
		my = ToRange(my, 0.0, Screen_H);

		// �o�l�̉����x
		//
		var<double> xaa = (mx - x) * 0.01;
		var<double> yaa = (my - y) * 0.01;

		yaa += 1.0; // �d�͉����x

		xAdd += xaa;
		yAdd += yaa;

		// ��C��R
		//
		xAdd *= HAMMER_AIR_TEIKOU;
		yAdd *= HAMMER_AIR_TEIKOU;

		x += xAdd;
		y += yAdd;

		// �`�悱������

		SetColor("#000000");
		PrintRect(0.0, 0.0, Screen_W, Screen_H);

		SetColor("#00ff00");
		SetPrint(0, 30, 0);
		SetFSize(30);
		PrintLine("NUMPAD-KEY_1-4 [ " + HAMMER_NAME + " ]");

		SetColor("#ffffff");
		PrintCircle(x, y, HAMMER_R);

		@@_DrawRope(x, y, mx, my);

		SetColor("#ff0000");
		PrintCircle(mx, my, 10.0);

		yield 1;
	}
}

function <void> @@_DrawRope(<double> x1, <double> y1, <double> x2, <double> y2)
{
	var<double> x = (x1 + x2) / 2.0;
	var<double> y = (y1 + y2) / 2.0;

	var<double> r = GetAngle(x1 - x2, y1 - y2);

	r += Math.PI / 2.0;

	var<double> zw = 1.0;
	var<double> zh = GetDistance(x1 - x2, y1 - y2) / GetPicture_H(P_Rope);

	Draw2(P_Rope, x, y, 0.5, r, zw, zh);
}
