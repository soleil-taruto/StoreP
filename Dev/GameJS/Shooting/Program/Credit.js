/*
	�N���W�b�g
*/

function* <generatorForTask> CreditMain()
{
	ClearMouseDown();

	for (; ; )
	{
		if (GetMouseDown() == -1)
		{
			break;
		}

		SetColor("#a0a080");
		PrintRect(0, 0, Screen_W, Screen_H);

		SetColor("#000000");
		SetPrint(50, 80, 80);
		SetFSize(24);

		PrintLine("���f�ޒ�(�h�̗�)");
		PrintLine("����� (�����_) http://www.aj.undo.jp/material/bg/bg_material.html");

		yield 1;
	}
	ClearMouseDown();
}
