/*
	文字列
*/

/*
	文字列を分割する。

	str: 文字列
	separator: セパレータ
	ignoreEmpty: 空のトークンを無視するか
	limit: トークン数が limit を超えないようにする。0 == 無効
*/
public string[] Tokenize(string str, string separator, boolean ignoreEmpty, int limit)
{
	if (separator == "")
	{
		error();
	}
	string[] dest = [];

	while (dest.length + 1 != limit)
	{
		int index = str.indexOf(separator);

		if (index == -1)
		{
			break;
		}
		dest.push(str.substring(0, index));
		str = str.substring(index + separator.length);
	}
	dest.push(str);
	return dest;
}
