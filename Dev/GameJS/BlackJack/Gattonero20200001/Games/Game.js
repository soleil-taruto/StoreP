/*
	ゲーム・メイン
*/

function* <generatorForTask> GameMain()
{
	FreezeInput();
	ClearAllActor();

	for (; ; )
	{
		// TODO
		// TODO
		// TODO

		ExecuteAllActor();

		yield 1;
	}
	FreezeInput();
}
