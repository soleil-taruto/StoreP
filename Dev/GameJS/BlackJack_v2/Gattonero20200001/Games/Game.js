/*
	ÉQÅ[ÉÄÅEÉÅÉCÉì
*/

var<TaskManager_t> GameTasks = CreateTaskManager();

var<Actor[]> @@_DealerCards = [];
var<Actor[]> @@_PlayerCards = [];

var<int> @@_Credit = 1000;
var<int> @@_Bet = 0;

function* <generatorForTask> GameMain()
{
	FreezeInput();
	ClearAllActor();

	for (; ; )
	{
		yield* @@_BetMain();
	}
	FreezeInput();
	ClearAllActor();
}

function* <generatorForTask> @@_BetMain()
{
	for (; ; )
	{
		SetColor("#404080");
		PrintRect(0, 0, Screen_W, Screen_H);

		SetColor("#ffffff#);
		SetFSize(50);
		SetPrint(100, 500);
		PrintLine("BET: " + @@_Bet);

		Draw(P_ButtonBetUp,    200, 1500, 1.0, 0.0, 1.0);
		Draw(P_ButtonBetDown,  600, 1500, 1.0, 0.0, 1.0);
		Draw(P_ButtonStart,   1000, 1500, 1.0, 0.0, 1.0);

		ExecuteAllActor();
		yield 1;
	}
}
