/*
	背景
*/

function* <generatorForTask> BackgroundTask()
{
	for (; ; )
	{
		yield* Repeat(1, 60); // 60フレーム待つ。-- ウェイトはこの様に記述する。
	}
}
