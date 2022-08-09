/*
	部屋(ステージ)選択メニュー
*/

function* <generatorForTask> GameProgressMaster()
{
	for (; ; )
	{
		yield* GameMain();

		if (GameEndReason != GameEndReason_e_RESTART_GAME)
		{
			break;
		}
	}
}
