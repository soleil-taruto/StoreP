/*
	îwåi
*/

function* <generatorForTask> CreateBackgroundTask()
{
	if (DEBUG)
	{
		// -- choose one --

//		yield* @@_Test01();
//		yield* @@_Test02();
//		yield* @@_Test03();
		yield* @@_Main();

		// --
	}
	else
	{
		yield* @@_Main();
	}
}

function* <generatorForTask> @@_Test01()
{
	for (; ; )
	{
		// none

		yield 1;
	}
}

function* <generatorForTask> @@_Main()
{
	for (; ; )
	{
		SetColor("#000080");
		PrintRect(0.0, 0.0, Screen_W, Screen_H);

		yield 1;
	}
}
