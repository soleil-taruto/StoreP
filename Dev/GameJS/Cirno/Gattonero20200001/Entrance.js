/*
	“ü‚èŒû
*/

var<int> @@_GAME_START_W = 200;
var<int> @@_GAME_START_H = 100;
var<int> @@_GAME_START_L = (Screen_W - @@_GAME_START_W) / 2;
var<int> @@_GAME_START_T = (Screen_H - @@_GAME_START_H) / 2;

function* <generatorForTask> EntranceMain()
{
	SetCurtain();
	FreezeInput();

	for (; ; )
	{
		if (
			GetMouseDown() == -1 &&
			@@_GAME_START_L < GetMouseX() && GetMouseX() < @@_GAME_START_L + @@_GAME_START_W &&
			@@_GAME_START_T < GetMouseY() && GetMouseY() < @@_GAME_START_T + @@_GAME_START_H
			)
		{
			break;
		}

		SetColor("#000000");
		PrintRect(0.0, 0.0, Screen_W, Screen_H);
		SetColor("#ffffff");
		PrintRect(@@_GAME_START_L, @@_GAME_START_T, @@_GAME_START_W, @@_GAME_START_H);
		SetColor("#000000");
		SetPrint(@@_GAME_START_L + 80, @@_GAME_START_T + 20, 0);
		SetFSize(80);
		PrintLine("GAME START");

		yield 1;
	}

	FreezeInput();

	yield* TitleMain();
}
