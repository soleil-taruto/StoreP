/*
	セーブデータ
*/

function <void> SetLastClearedStageIndex(<int> index)
{
	SetLocalStorageValue("LastClearedStageIndex", "" + index);
}

function <int> GetLastClearedStageIndex()
{
	return parseInt(GetLocalStorageValue("LastClearedStageIndex", "0"));
}
