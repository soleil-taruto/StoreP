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

		var<string[]> credits = [ @(CRDT) ];

		for (var<int> index = 0; index < credits.length; index += 2)
		{
			PrintLine(credits[index] + "�@" + credits[index + 1]);
		}

		yield 1;
	}
	ClearMouseDown();
}
