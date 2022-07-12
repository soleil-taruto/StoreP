/*
	•¶Žš—ñ
*/

function <string> ZPad(<T> value, <int> minlen, <string> padding)
{
	var ret = "" + value;

	while (ret.length < minlen)
	{
		ret = padding + ret;
	}
	return ret;
}

function <string> ToHex(<int> value)
{
	if (value < 0)
	{
		return "-" + ToHex(value * -1);
	}
	var ret = "";

	while (0 < value)
	{
		var<int> i = value % 16;
		ret += "0123456789abcdef".substring(i, i + 1);
		value /= 16;
		value = ToFix(value);
	}
	if (ret == "")
	{
		ret = "0";
	}
	else
	{
		ret = RevStr(ret);
	}
	return ret;
}

function <string> RevStr(<string> str)
{
	var ret = "";

	for (var<int> index = str.length - 1; 0 <= index; index--)
	{
		ret += str.substring(index, index + 1);
	}
	return ret;
}

function <string[]> Tokenize(<string> str, <string> separator, <boolean> trimming, <boolean> ignoreEmpty)
{
	if (separator == "")
	{
		error();
	}

	var<string[]> dest = [];

	for (; ; )
	{
		var<int> index = str.indexOf(separator);

		if (index == -1)
		{
			break;
		}
		dest.push(str.substring(0, index));
		str = str.substring(index + separator.length);
	}
	dest.push(str);

	if (trimming)
	{
		dest = dest.map(v => v.trim());
	}
	if (ignoreEmpty)
	{
		dest = dest.filter(v => v != "");
	}
	return dest;
}

function <int> StrToInt(<string> str)
{
	var<int> value = 0;
	var<int> sign = 1;

	for (var<int> index = 0; index < str.length; index++)
	{
		var<string> chr = str.substring(index, index + 1);

		if (chr == "-")
		{
			sign = -1;
		}
		else
		{
			var<int> p = "0123456789".indexOf(chr);

			if (p == -1)
			{
				error();
			}
			value *= 10;
			value += p;
		}
	}
	return value * sign;
}
