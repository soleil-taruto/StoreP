/*
	îwåi
*/

function* <generatorForTask> BackgroundTask()
{
	yield* @@_Wait(60);

	// TODO
	// TODO
	// TODO
}

function* <generatorForTask> @@_Wait(<int> frameMax)
{
	for (var<int> frame = 0; frame < frameLmt; frame++)
	{
		yield 1;
	}
}
