/*
	�Z�[�u�f�[�^
*/

function <void> SetLastClearedStageIndex(<int> index)
{
	SetCookieValue("LastClearedStageIndex", "" + index);
}

function <int> GetLastClearedStageIndex()
{
	return parseInt(GetCookieValue("LastClearedStageIndex", "0"));
}
