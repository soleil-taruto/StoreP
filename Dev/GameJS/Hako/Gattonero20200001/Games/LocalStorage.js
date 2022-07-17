/*
	ローカルストレージ (ゲームのセーブデータ取り扱い)
*/

function <void> LoadLocalStorage()
{
	try
	{
		var data = GetLocalStorageValue("@(APID)_SaveData", null);

		if (data == null)
		{
			throw null;
		}
		data = Tokenize(@@_Decode(data), ";", false, false);
		var<int> c = 0;

		if (data[c++] != "@(APID)_Credentials")
		{
			throw null;
		}

		// SaveData >

		PadInputIndex_A = StrToInt(data[c++]);
		PadInputIndex_B = StrToInt(data[c++]);

		AlreadyClearedStageIndex = StrToInt(data[c++]);

		// < SaveData
	}
	catch // ロードに失敗したらデフォルト値をセットする。
	{
		// SaveData >

		PadInputIndex_A = 0;
		PadInputIndex_B = 3;

		AlreadyClearedStageIndex = -1;

		// < SaveData
	}
}

function <void> SaveLocalStorage()
{
	var<string[]> data = [ "@(APID)_Credentials" ];

	// SaveData >

	data.push("" + PadInputIndex_A);
	data.push("" + PadInputIndex_B);

	data.push("" + AlreadyClearedStageIndex);

	// < SaveData

	SetLocalStorageValue("@(APID)_SaveData", @@_Encode(data.join(";")));
}

function <string> @@_Encode(<string> data)
{
	data = window.btoa(data);
	data = @@_UnaddEndEq(data);
	data = @@_Shuffle(data);

	return data;
}

function <string> @@_Decode(<string> data)
{
	data = @@_Shuffle(data);
	data = @@_AddEndEq(data);
	data = window.atob(data);

	return data;
}

function <string> @@_Shuffle(<string> data)
{
	var<char[]> chrs = [ ... data ];

	var<int> l = 0;
	var<int> r = chrs.length - 1;

	while(l < r)
	{
		var tmp = chrs[l];
		chrs[l] = chrs[r];
		chrs[r] = tmp;

		l++;
		r -= 3;
	}
	return chrs.join("");
}

function <string> @@_AddEndEq(<string> data)
{
	while (data.length % 4 != 0)
	{
		data += "=";
	}
	return data;
}

function <string> @@_UnaddEndEq(<string> data)
{
	while (data.endsWith("="))
	{
		data = data.substring(0, data.length - 1);
	}
	return data;
}
