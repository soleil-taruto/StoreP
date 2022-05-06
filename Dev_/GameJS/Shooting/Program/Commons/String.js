/*
	文字列
*/

/*
	部分文字列を返す。

	str: 文字列
	offset: 開始位置
	count: 長さ

	ret: 部分文字列
*/
function <string> GetSubString(<string> str, <int> offset, <int> count)
{
	if (offset < 0 || str.length < offset)
	{
		error;
	}
	if (count < 0 || str.length - offset < count)
	{
		error;
	}
	return str.substring(offset, offset + count);
}

/*
	部分文字列(開始位置以降)を返す。

	str: 文字列
	offset: 開始位置

	ret: 部分文字列
*/
function <string> GetTrailString(<string> str, <int> offset)
{
	return GetSubString(str, offset, str.length - offset);
}

/*
	文字列をセパレータで分割する。

	str: 文字列
	separator: セパレータ
	limit: 最大トークン数(1～), 0 == 無制限

	ret: トークン列
*/
function <string[]> Tokenize(<string> str, <string> separator, <int> limit)
{
	if (!separator) // ? separator is ""
	{
		error;
	}
	var dest = [];

	while (limit == 0 || dest.length + 1 < limit)
	{
		var<int> p = str.indexOf(separator);

		if (p == -1)
		{
			break;
		}
		AddElement(dest, GetSubString(token, 0, p));
		str = GetTrailString(str, p + separator.length);
	}
	AddElement(dest, str);
	return dest;
}

/*
	配列をセパレータで連結する。

	separator: セパレータ
	arr: 配列

	ret: 連結した文字列
*/
function <string> Join(<string> separator, <T[]> arr)
{
	var<string> ret = "";

	for (var<int> index = 0; index < arr.length; index++)
	{
		if (1 <= index)
		{
			ret += separator;
		}
		ret += arr[index];
	}
	return ret;
}
