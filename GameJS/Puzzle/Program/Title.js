/*
	タイトル画面
*/

var @@_Buttons =
[
	{
		L : 350,
		T : 300,
		W : 200,
		H : 55,
		Draw : function()
		{
			SetColor("#ffffff");
			PrintRect(this.L, this.T, this.W, this.H);
			SetColor("#000000");
			SetPrint(this.L + 35, this.T + 40, 0);
			SetFont("32px 'sans-serif'");
			PrintLine("スタート");
		},
		Pressed : function* ()
		{
			LOGPOS;
			yield* GameMain(1);
			LOGPOS;
		},
	},
	{
		L : 565,
		T : 300,
		W : 200,
		H : 55,
		Draw : function()
		{
			SetColor("#ffffff");
			PrintRect(this.L, this.T, this.W, this.H);
			SetColor("#000000");
			SetPrint(this.L + 25, this.T + 40, 0);
			SetFont("32px 'sans-serif'");
			PrintLine("スタートB");
		},
		Pressed : function* ()
		{
			LOGPOS;
			yield* GameMain(2);
			LOGPOS;
		},
	},
	{
		L : 350,
		T : 370,
		W : 200,
		H : 55,
		Draw : function()
		{
			SetColor("#ffff80");
			PrintRect(this.L, this.T, this.W, this.H);
			SetColor("#000080");
			SetPrint(this.L + 35, this.T + 40, 0);
			SetFont("32px 'sans-serif'");
			PrintLine("Credit");
		},
		Pressed : function* ()
		{
			LOGPOS;
			yield* CreditMain();
			LOGPOS;
		},
	},
	{
		L : 350,
		T : 440,
		W : 200,
		H : 55,
		Draw : function()
		{
			SetColor("#ffff80");
			PrintRect(this.L, this.T, this.W, this.H);
			SetColor("#000080");
			SetPrint(this.L + 35, this.T + 40, 0);
			SetFont("32px 'sans-serif'");
			PrintLine("Exit");
		},
		Pressed : function* ()
		{
			LOGPOS;
			window.location.href = "..";
//			window.location.href = "https://www.google.com/";
			LOGPOS;
		},
	},
];

function* TitleMain()
{
	for (; ; )
	{
		SetColor("#80a080");
		PrintRect(0, 0, Screen_W, Screen_H);

		SetColor("#000000");
		SetPrint(40, 220, 0);
		SetFSize(160);
		PrintLine("Adventure");

		for (var button of @@_Buttons)
		{
			button.Draw();

			if (GetMouseDown() == -1)
			{
				if (
					button.L < GetMouseX() && GetMouseX() < button.L + button.W &&
					button.T < GetMouseY() && GetMouseY() < button.T + button.H
					)
				{
					ClearMouseDown();
					yield* button.Pressed();
					ClearMouseDown();
					break;
				}
			}
		}
		yield 1;
	}
}
