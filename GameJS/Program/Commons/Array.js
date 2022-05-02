/*
	配列
*/

/*
	配列に要素を挿入する。

	arr: 配列
	index: 位置
	element: 要素
*/
function InsertElement(arr, index, element)
{
	if (index < 0 || arr.length < index)
	{
		error;
	}
	arr.push(-1);

	for (var i = arr.length - 1; index < i; i--)
	{
		arr[i] = arr[i - 1];
	}
	arr[index] = element;
}

/*
	配列に要素を追加する。

	arr: 配列
	element: 要素
*/
function AddElement(arr, element)
{
	InsertElement(arr, arr.length, element);
}

/*
	配列から要素を取り出す。

	arr: 配列
	index: 位置

	ret: 要素
*/
function DesertElement(arr, index)
{
	if (index < 0 || arr.length <= index)
	{
		error;
	}
	var ret = arr[index];

	for (var i = index; i < arr.length - 1; i++)
	{
		arr[i] = arr[i + 1];
	}
	arr.pop();
	return ret;
}

/*
	配列から要素を取り出す。

	arr: 配列
	index: 位置

	ret: 要素
*/
function FastDesertElement(arr, index)
{
	if (index < 0 || arr.length <= index)
	{
		error;
	}
	var ret = arr[index];
	arr[index] = arr[arr.length - 1];
	arr.pop();
	return ret;
}

/*
	配列から最後の要素を取り出す。

	arr: 配列

	ret: 要素
*/
function UnaddElement(arr)
{
	return DesertElement(arr, arr.length - 1);
}

/*
	配列の要素を入れ替える。

	arr: 配列
	index_A: 入れ替え位置(1)
	index_B: 入れ替え位置(2)
*/
function SwapElement(arr, index_A, index_B)
{
	var tmp = arr[index_A];
	arr[index_A] = arr[index_B];
	arr[index_B] = tmp;
}

/*
	シャッフルする。

	arr: 配列
*/
function Shuffle(arr)
{
	for (var i = arr.length - 1; 2 <= i; i--)
	{
		SwapElement(arr, GetRand(i), i);
	}
}

/*
	部分配列を返す。

	arr: 配列
	offset: 開始位置
	count: 長さ

	ret: 部分配列
*/
function GetSubArray(arr, offset, count)
{
	if (offset < 0 || arr.length < offset)
	{
		error;
	}
	if (count < 0 || arr.length - offset < count)
	{
		error;
	}
	var dest = [];

	for (var index = 0; index < count; index++)
	{
		dest.push(arr[offset + index]);
	}
	return dest;
}

/*
	部分配列(開始位置以降)を返す。

	arr: 配列
	offset: 開始位置

	ret: 部分配列
*/
function GetTrailArray(arr, offset)
{
	return GetSubArray(arr, offset, arr.length - offset);
}

/*
	配列を複製する。

	arr: 配列

	ret: 配列の複製
*/
function CloneArray(arr)
{
	return GetSubArray(arr, 0, arr.length);
}

/*
	マッチする要素を削除する。

	arr: 配列
	match: 判定メソッド
*/
function RemoveAll(arr, match)
{
	var w = 0;

	for (var r = 0; r < arr.length; r++)
	{
		// マッチしなければ配列に残すので、w の指す位置へ書き込む。
		if (!match(arr[r]))
		{
			arr[w] = arr[r];
			w++;
		}
	}
	while (w < arr.length)
	{
		arr.pop();
	}
}

/*
	偽となる要素(false, null, undefined, 0, 空文字列)を除去する。

	arr: 配列
*/
function RemoveFalse(arr)
{
	RemoveAll(arr, function(token)
	{
		return !token;
	});
}
