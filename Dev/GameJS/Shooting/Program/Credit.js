/*
	�N���W�b�g
*/

function* CreditMain()
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
		SetFont("24px '���C���I'");

		PrintLine("���f�ޒ�(�h�̗�)");
		PrintLine("HMIX�@http://www.hmix.net/");
		PrintLine("�҂ۂ�q�Ɂ@https://pipoya.net/sozai/");
		PrintLine("���X���@https://taira-komori.jpn.org/");

		yield 1;
	}
	ClearMouseDown();
}
