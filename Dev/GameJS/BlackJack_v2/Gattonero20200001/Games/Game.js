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
		@@_Bet = 0;

		yield* @@_BetMain();
	}
	FreezeInput();
	ClearAllActor();
}

function* <generatorForTask> @@_BetMain()
{
	FreezeInput();

	var<double> betUpRot = 0.0;
	var<double> betDownRot = 0.0;
	var<double> startBuru = 0.0;

	for (; ; )
	{
		if (GetMouseDown() == -1)
		{
			var<int> INC_SPAN = 10;

			if (HoveredPicture == P_ButtonBetUp)
			{
				if (INC_SPAN <= @@_Credit)
				{
					@@_Credit -= INC_SPAN;
					@@_Bet += INC_SPAN;

					betUpRot = GetRand2() * 1.5;
				}
			}
			if (HoveredPicture == P_ButtonBetDown)
			{
				var<int> inc = Math.min(INC_SPAN, @@_Bet);

				@@_Credit += inc;
				@@_Bet -= inc;

				betDownRot = GetRand2() * 1.5;
			}
			if (HoveredPicture == P_ButtonStart)
			{
				if (1 <= @@_Bet)
				{
					break;
				}
				else
				{
					startBuru = 50.0;
				}
			}
		}

		betUpRot = Approach(betUpRot, 0.0, 0.9);
		betDownRot = Approach(betDownRot, 0.0, 0.9);
		startBuru = Approach(startBuru, 0.0, 0.9);

		// ï`âÊÇ±Ç±Ç©ÇÁ

		SetColor("#404080");
		PrintRect(0, 0, Screen_W, Screen_H);

		SetColor("#ffffff");
		SetFSize(120);
		SetPrint(100, 500, 120);
		PrintLine("CREDIT: " + @@_Credit);
		PrintLine("BET: " + @@_Bet);

		Draw(P_ButtonBetUp, 200, 1500, 1.0, betUpRot, 1.0);
		Draw(P_ButtonBetDown, 600, 1500, 1.0, betDownRot, 1.0);
		Draw(P_ButtonStart, 1000 + GetRand2() * startBuru, 1500 + GetRand2() * startBuru, 1.0, 0.0, 1.0);

		ExecuteAllActor();
		yield 1;
	}
	FreezeInput();
}
