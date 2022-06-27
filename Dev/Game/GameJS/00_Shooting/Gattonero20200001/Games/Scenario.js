/*
	ƒVƒiƒŠƒI
*/

function* <generatorForTask> ScenarioTask()
{
	yield* @@_Wait(60);

	// TODO
	// TODO
	// TODO
}

function* <generatorForTask> @@_Wait(<int> frameLmt)
{
	for (var<int> frame = 0; frame < frameLmt; frame++)
	{
		yield 1;
	}
}
