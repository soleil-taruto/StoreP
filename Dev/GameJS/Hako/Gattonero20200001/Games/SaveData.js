/*
	セーブデータ
*/

function <void> SetLastClearedStageIndex(<int> index)
{
	SetLocalStorageValue("@(APID)_LastClearedStageIndex", "" + index);
}

function <int> GetLastClearedStageIndex()
{
	return parseInt(GetLocalStorageValue("@(APID)_LastClearedStageIndex", "0"));
}
