/*
	�^�C�g�����
*/

var @@_Buttons =
[
	{
		Text: "�X�^�[�g",
		Pressed : function* ()
		{
			LOGPOS();
			yield* GameMain();
			LOGPOS();
		},
	},
	{
		Text: "�ݒ�",
		Pressed : function* ()
		{
			LOGPOS();
			yield* SettingMain();
			LOGPOS();
		},
	},
	{
		Text: "Credit",
		Pressed : function* ()
		{
			LOGPOS();
			yield* CreditMain();
			LOGPOS();
		},
	},
	{
		Text: "Exit",
		Pressed : function* ()
		{
			LOGPOS();
			window.location.href = "..";
//			window.location.href = "https://www.google.com/";
			LOGPOS();
		},
	},
];

function* <generatorForTask> TitleMain()
{
	var<int> selectIndex = 0;

	for (; ; )
	{
		SetColor("#a0b0c0");
		PrintRect(0, 0, Screen_W, Screen_H);

		SetColor("#000000");
		SetPrint(15, 320, 0);
		SetFSize(180);
		PrintLine("Shooting");

		selectIndex = DrawSimpleMenu(selectIndex, 100, Screen_H - 300, 70, @@_Buttons.map(v => v.Text));

		if (DSM_Desided)
		{
			FreezeInput();
			yield* @@_Buttons[selectIndex].Pressed();
			FreezeInput();
		}
		yield 1;
	}
}