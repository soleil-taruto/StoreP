/*
	アクションリスト
*/

/@(ASTR)

/// ActionList_t
{
	<boolean> ClearEveryFrameMode
	<int> LasProcFrame
	<Action[]> Routines
}

@(ASTR)/

function <ActionList_t> CreateActionList(<boolean> clearEveryFrameMode)
{
	var ret =
	{
		ClearEveryFrameMode: clearEveryFrameMode,
		LastProcFrame: -1,
		Routines: [],
	};

	return ret;
}

/*
	全ての公開関数の最初に呼び出すこと。
*/
function <void> @@_Before(<ActionList_t> info)
{
	if (info.ClearEveryFrameMode)
	{
		if (info.LastProcFrame != ProcFrame)
		{
			info.LastProcFrame = ProcFrame;
			info.Routines = [];
		}
	}
}

function <void> AddAction(<ActionList_t> info, <Action> routine)
{
	@@_Before(info);

	info.Routines.push(routine);
}

function <int> GetActionCount(<ActionList_t> info)
{
	@@_Before(info);

	return info.Routines.length;
}

function <void> ClearAllAction(<ActionList_t> info)
{
	@@_Before(info);

	info.Routines = [];
}

function <void> ExecuteAllAction(<ActionList_t> info)
{
	@@_Before(info);

	for (var<Action> routine of info.Routines)
	{
		routine();
	}
	into.Routines = [];
}
