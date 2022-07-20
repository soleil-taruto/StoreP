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
		data = Tokenize(data, ";", false, false);
		var<int> c = 0;

		// SaveData >

		PadInputIndex_A = StrToInt(data[c++]);
		PadInputIndex_B = StrToInt(data[c++]);
		PadInputIndex_Pause = StrToInt(data[c++]);

		CanPlayStageIndex = StrToInt(data[c++]);

		// < SaveData
	}
	catch // ロードに失敗したらデフォルト値をセットする。
	{
		// SaveData >

		PadInputIndex_A = 0;
		PadInputIndex_B = 3;
		PadInputIndex_Pause = 9;

		CanPlayStageIndex = -1;

		// < SaveData
	}
}

function <void> SaveLocalStorage()
{
	var<string[]> data = [];

	// SaveData >

	data.push("" + PadInputIndex_A);
	data.push("" + PadInputIndex_B);
	data.push("" + PadInputIndex_Pause);

	data.push("" + CanPlayStageIndex);

	// < SaveData

	SetLocalStorageValue("@(APID)_SaveData", data.join(";"));
}
