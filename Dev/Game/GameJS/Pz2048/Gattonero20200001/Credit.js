/*
	NWbg
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

		PrintLine("¡fÞñ(hÌª)");
		PrintLine("none");
//		PrintLine("HMIX@http://www.hmix.net/");
//		PrintLine("ÒÛâqÉ@https://pipoya.net/sozai/");
//		PrintLine("¬X½@https://taira-komori.jpn.org/");

		yield 1;
	}
	ClearMouseDown();
}
