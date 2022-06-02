/*
	”z—ñ
*/

public object DesertElement(object[] arr, int index)
{
	if (index < 0 || arr.length <= index)
	{
		error();
	}
	return arr.splice(index, 1)[0];
}

public object UnaddElement(object[] arr)
{
	if (arr.length == 0)
	{
		error();
	}
	return arr.pop();
}

public object FastDesertElement(object[] arr, int index)
{
	if (index < 0 || arr.length <= index)
	{
		error();
	}
	object ret = UnaddElement(arr);

	if (index < arr.length)
	{
		object ret2 = arr[index];
		arr[index] = ret;
		ret = ret2;
	}
	return ret;
}
