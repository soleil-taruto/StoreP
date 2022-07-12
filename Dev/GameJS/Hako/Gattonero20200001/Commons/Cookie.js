/*
	クッキー
*/

function <string[][]> GetCookie()
{
	var<string[][]> dest = [];

	var<string> sPairs = document.cookie;
	var<string[]> pairs = Tokenize(sPairs, ";", true, true);

	for (var<string> pair of pairs)
	{
		var<string[]> tokens = Tokenize(pair, "=", true, true);

		if (tokens.length == 2)
		{
			var<string[]> destPair =
			[
				tokens[0], // 名前
				tokens[1]  // 値
			];

			dest.push(destPair);
		}
	}
	return dest;
}

function <string> GetCookieValue(<string> name, <string> defval)
{
	for (var<stirng[]> pair of GetCookie())
	{
		if (pair[0] == name)
		{
			return pair[1];
		}
	}
	return defval;
}

function <void> SetCookieValue(<string> name, <string> value)
{
	document.cookie = name + "=" + value;
}
