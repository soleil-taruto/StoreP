/*
	‚»‚Ì‘¼
*/

function <Func boolean> Supplier(<generatorForTask> task)
{
	var ret = function <Func boolean> ()
	{
		return task.next().value;
	};

	return ret;
}

function* <T[]> Repeat(<T> value, <int> count)
{
	for (var<int> index = 0; index < count; index++)
	{
		yield value;
	}
}
