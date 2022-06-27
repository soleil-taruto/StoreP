/*
	タイトル画面
*/

var<int> @@_BUTTON_W = 200;
var<int> @@_BUTTON_H = 55;
var<int> @@_BUTTON_L = ToInt((Screen_W - @@_BUTTON_W) / 2);
var<int> @@_BUTTON_T = Screen_H - 300;
var<int> @@_BUTTON_Y_STEP = 70;

var<I3Color_t> @@_BUTTON_BACK_COLOR = CreateI3Color(255, 255, 128);
var<I3Color_t> @@_BUTTON_TEXT_COLOR = CreateI3Color(0, 0, 0);

var<int> @@_BUTTON_TEXT_L = 35;
var<int> @@_BUTTON_TEXT_T = 40;
var<int> @@_BUTTON_TEXT_FONT_SIZE = 32;

var @@_Buttons =
[
	{
		Text: "スタート",
		Pressed : function* ()
		{
			LOGPOS();
			yield* GameMain();
			LOGPOS();
		},
	},
	{
		Text: "設定",
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
		selectIndex = SimpleMenu(selectIndex, 100, Screen_H - 300, 70, @@_Buttons.filter(v => v.Text), function <void> ()
		{
			SetColor("#a0b0c0");
			PrintRect(0, 0, Screen_W, Screen_H);

			SetColor("#000000");
			SetPrint(40, 320, 0);
			SetFSize(160);
			PrintLine("Template");
		});

		FreezeInput();
		yield* @@_Buttons[selectIndex].Pressed();
		FreezeInput();

		//yield 1; // 不要
	}
}
