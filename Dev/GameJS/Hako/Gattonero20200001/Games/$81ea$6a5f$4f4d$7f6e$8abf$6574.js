/*
	自機位置調整
*/

// タッチ情報
// 0 == 無効
// 1 == 天井
// 2 == 地面
//
var<boolean> @@_Touch = 0;

function <void> Do_自機位置調整()
{
	// reset
	{
		@@_Touch = 0;
	}

	// TODO ???
	// TODO ???
	// TODO ???
}

function <boolean> Is_自機位置調整_Touch_Roof()
{
	return @@_Touch == 1;
}

function <boolean> Is_自機位置調整_Touch_Ground()
{
	return @@_Touch == 2;
}
