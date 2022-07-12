/*
	セーブデータ
*/

// SaveData >

/*
	既にクリアしたステージ・インデックス
	-1 == 未クリア
	0～ == ステージ・インデックス
*/
var<int> @@_AlreadyClearedStageIndex;

// < SaveData

function <void> @@_Load()
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

		@@_AlreadyClearedStageIndex = StrToInt(data[c++]);

		// < SaveData
	}
	catch // ロードに失敗したらデフォルト値をセットする。
	{
		// SaveData >

		@@_AlreadyClearedStageIndex = -1;

		// < SaveData
	}
}

function <void> @@_Save()
{
	var<string[]> data = [];

	// SaveData >

	data.push("" + @@_AlreadyClearedStageIndex);

	// < SaveData

	SetLocalStorageValue("@(APID)_SaveData", data.join(";"));
}

function <void> SetAlreadyClearedStageIndex(<int> index)
{
	@@_Load();
	@@_AlreadyClearedStageIndex = index;
	@@_Save();
}

function <int> GetAlreadyClearedStageIndex()
{
	@@_Load();
	return @@_AlreadyClearedStageIndex;
}
