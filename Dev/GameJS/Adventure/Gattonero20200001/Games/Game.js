/*
	�Q�[���E���C��
*/

// �J�����ʒu(����)
var<D2Point_t> Camera = CreateD2Point(0.0, 0.0);

// �Q�[���p�^�X�N
var<TaskManager_t> GameTasks = CreateTaskManager();

function* <generatorForTask> GameMain()
{
	FreezeInput();
	ClearAllActor();

	for (; ; )
	{
		ClearScreen();

		if (GetInput_Pause() == 1)
		{
			break;
		}

		ExecuteAllActor();
		ExecuteAllTask(GameTasks);
		yield 1;
	}
	FreezeInput();
	ClearAllActor();
}
