/*
	îwåi

	----

	108 = 18 * 6
	108 = 27 * 4
	108 = 36 * 3

*/

var<TaskManager_t> @@_Tasks = CreateTaskManager();

function* <generatorForTask> BackgroundTask()
{
	var<Func boolean> f_Main = Supplier(@@_Main());

	for (; ; )
	{
		ExecuteAllTask(@@_Tasks);

		if (!f_Main())
		{
			error();
		}

		yield 1;
	}
}

function* <generatorForTask> @@_Main()
{
	AddTask(@@_Tasks, function* <generatorForTask> ()
	{
		for (; ; )
		{
			for (var<int> x = 0; x < 7; x++)
			{
				AddTask(@@_Tasks, function* <generatorForTask> ()
				{
					for (var<int> y = 0; ; y++)
					{
						var<double> dx = FIELD_L + 28 + x * 108;
						var<double> dy = FIELD_T - 54 + y * 18;

						if (FIELD_B + 54 < dy)
						{
							break;
						}

						Draw(P_Wall0001, dx, dy, 1.0, 0.0, 1.0);

						yield 1;
					}
				}());
			}

			yield* Wait(6);
		}
	}());

	for (; ; )
	{
		yield* Wait(60); // TODO
	}
}
