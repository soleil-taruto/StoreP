/*
	����(�X�e�[�W)�I�����j���[
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
