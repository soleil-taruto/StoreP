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
