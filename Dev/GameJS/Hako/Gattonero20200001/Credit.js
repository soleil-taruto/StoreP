/*
	クレジット
*/

function* <generatorForTask> CreditMain()
{
	var<string[]> credits = [ @(CRDT) ];
	var<int> yStep;

	if (credits.length == 0)
	{
		credits = [ "none", "" ];
	}

	if (credits.length / 2 < 12)
	{
		yStep = 50;
	}
	else if (credits.length / 2 < 18)
	{
		yStep = 36;
	}
	else
	{
		yStep = 24;
	}

	FreezeInput();

	for (; ; )
	{
		if (GetMouseDown() == -1 || GetInput_A() == 1 || GetInput_B() == 1)
		{
			break;
		}

		SetColor("#000040");
		PrintRect(0, 0, Screen_W, Screen_H);

		SetColor("#a0ffff");
		SetPrint(30, 50, yStep);
		SetFSize(20);
		PrintLine("■素材 (文字コード順・敬称略)");
		PrintLine("");

		for (var<int> index = 0; index < credits.length; index += 2)
		{
			PrintLine(credits[index] + "　" + credits[index + 1]);
		}

		SetPrint(Screen_W - 580, Screen_H - 30, 0);
		SetFSize(20);
		PrintLine("Ａ・Ｂボタンまたは画面をクリックするとタイトルに戻ります");

		yield 1;
	}
	FreezeInput();
}
