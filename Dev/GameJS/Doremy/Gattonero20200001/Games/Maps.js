/*
	マップデータ
*/

/*
	サンプル

"■■■■■■■■■■■■■■■■■■■■■■■■■",
"■　　　　　　　　　　　　　　　　　　　　　　　■",
"■　　　　　　　　　　　　　　　　　　　　　　　■",
"■　　　　　　　　　　　　　　　　　　　　　　　■",
"■　　　　　　　　　　　　　　　　　　　　　　　■",
"■　　　　　　　　　　　　　　　　　　　　　　　■",
"■　　　　　　　　　　　　　　　　　　　　　　　■",
"■　　　　　　　　　　　　　　　　　　　　　　　■",
"■　　　　　　　　　　　　　　　　　　　　　　　■",
"■　　　　　　　　　　　　　　　　　　　　　　　■",
"■　　　　　　　　　　　　　　　　　　　　　　　■",
"■　　　　　　　　　　　　　　　　　　　　　　　■",
"■　　　　　　　　　　　　　　　　　　　　　　　■",
"■　　　　　　　　　　　　　　　　　　　　　　　■",
"■　　　　　　　　　　　　　　　　　　　　　　　■",
"■　　始　　　　　　　　　　　　　　　　　終　　■",
"■　　■　　　　　　　　　　　　　　　　　■　　■",
"■　　■　　　　　　　　　　　　　　　　　■　　■",
"■■■■■■■■■■■■■■■■■■■■■■■■■",

*/

var<string[][]> MAPS =
[
	// テスト用
	[
"■■■■■■■■■■■■■■■■■■■■■■■■■",
"■　　　　　　　　　　　　　　　　　　　　　　　■",
"■　　　　　　　　　　　　　　　　　　　　　　　■",
"■　　　　　　　　　　　　　　　　　　　　　　　■",
"■　　　　　　　　　　　　　　　　　　　　　　　■",
"■　　　　　　　　　　　　　　　　　　　　　　　■",
"■　　　　　　　　　　　　　　　　　　　　　　　■",
"■　　　　　　　　　　　　　　　　　　　　　　　■",
"■　　　　　　　　　　　　　　　　　　　　　　　■",
"■　　　　　　　　　　　　　　　　　　　　　　　■",
"■　　　　　　　　　　　　　　　　　　　　　　　■",
"■　　　　　　　　　　　　　　　　　　　　　　　■",
"■　　　　　　　　　　　　　　　　　　　　　　　■",
"■　　　　　　　　　　　　　　　　　　　　　　　■",
"■　　　　　　　　　　　　　　　　　　　　　　　■",
"■　　始　　　　　　　　　　　　　　　　　終　　■",
"■　　■　　　　　　　　　　　　　　　　　■　　■",
"■　　■　　　　　　　　　　　　　　　　　■　　■",
"■■■■■■■■■■■■■■■■■■■■■■■■■",
	],

	// 01
	[
"■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■",
"■　　　　　　　　　　　　　　　　　　■■　　　　　　　　　　　　　　　　　　■",
"■　　　　　　　　　　　　　　　　　　■■　　　　　　　　　　　　　　　　　　■",
"■　　　　　　　　　　　　　　　　　　■■■■■　　　　　　　　　　　　　梯　■",
"■　　　　　　　　　　　　　　　　　　■■　　　　　　　　　　　　　　　　梯　■",
"■　終　　　　　　　　　　　　　　　　■■　　　　　　　　　　　　　　　　梯　■",
"■■■■■■　　　　　　　　　　　　　■■■■■　■　■　■　梯　■梯■　梯　■",
"■　　　　　　　　　　　　　　　　　　■■　　　　　　　　　　梯　　梯　　梯　■",
"■　　　　　　　　　　　　　　　　　　■■　　　　　　　　　　梯　　梯　　　　■",
"■　　　■　　　　　　　　　　　　　　■■　　　　　　　　　■梯■　梯　　　　■",
"■　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　■■■梯　　　　■",
"■　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　■■■梯　　　　■",
"■　　　　■　　　　　　　　　　　　　■■梯　　　　　　　　　■■■梯　　　　■",
"■　　　　■　　　　　　　　　　　　　■■梯　　　　　　　　　　　　梯　　　　■",
"■■■■■■■■■■■■■■■■■■■■■■■　　　　■■■■■■■■■■■■■",
"■■■■■■■■■■■■■■■■■■■■■■■　　　　■■■■■■■■■■■■■",
"■　　　　　　　　　　　　　　　　　　■■　　　　　■　　　　　　　　　　　　■",
"■　　　　　　　　　　　　　　　　　　■■　　　　　　　　　　　　　　　　　　■",
"■　　　　　　　　　　　　　　■■　　■■　　■■　　　　　　　　　　　　　　■",
"■　　梯■■■■　　　　　　　　　　　■■　　　　　　　　　　　　　　　　　　■",
"■　　梯　　　　　　　　　　　　　　　■■　　　　　　　　　　　　　　　　　　■",
"■　　梯　　　　　　　　　■■　　　　■■　　　　■■　　　　　　　　　　　　■",
"■　　梯　　　　　　　　　　　　　　　■■　　　　　　　　　　　　　　　　　　■",
"■　　梯　　　　　　　　　　　　　　　■■　　　　　　　　　　　　　　　　　　■",
"■　　梯　　　　　　　　　　　■■　　■■　　　　　■■　　　　　　　　　　　■",
"■　　梯　　　　　　　　　　　　　　　　　　　　　　■■　　　　　　　　　　　■",
"■　　梯　　　　　　　　　　　　　　　　　　　　　　■■■■■■■■■■　　　■",
"■　　梯　　　　　始　　　　　　　■■■■■■　　　■■■■■■■■■■　　　■",
"■　　梯　　■■■■■■■　　　　■■■■■■　　　　　　　　　　　　　　　　■",
"■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■",
	],

	// 02
	[
"■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■",
"■　　　　　　　　　　　　　　　　　　■■　　　　　　　　　　　　　　　　　　■",
"■　　　　　　　　　　　　　　　　　　■■　　　　　　　　　　　　　　　　　　■",
"■　　　　　　　　　　　　　　　　　　■■■■■　　　　　　　　　　　　　梯　■",
"■　　　　　　　　　　　　　　　　　　■■　　　　　　　　　　　　　　　　梯　■",
"■　始　　　　　　　　　　　　　　　　■■　　　　　　　　　　　　　　　　梯　■",
"■■■■■■　　　　　　　　　　　　　■■■■■　■　■　■　梯　■梯■　梯　■",
"■　　　　　　　　　　　　　　　　　　■■　　　　　　　　　　梯　　梯　　梯　■",
"■　　　　　　　■　　　　　　　　　　■■　　　　　　　　　　梯　　梯　　　　■",
"■　　　■　　　■　　　　　　　　　　■■　　　　　　　　　■梯■　梯　　　　■",
"■　　　　　　　■■■■■　　　　　　　　　　　　　　　　　　■■■梯　　　　■",
"■　　　　　　　■■■■■■■■　　　　　　　　　　　　　　　■■■梯　　　　■",
"■　　　　■　　■■■■■■■■　　　■■梯　　　　　　　　　■■■梯　　　　■",
"■　　　　■　　　　　　　　　　　　　■■梯　　　　　　　　　　　　梯　　　　■",
"■■■■■■■■■■■■■■■■■■■■■■■　　　　■■■■■■■■■■■■■",
"■■■■■■■■■■■■■■■■■■■■■■■　　　　■■■■■■■■■■■■■",
"■　　　　　　　　　　　　■　　　　　■■　　　　　■　　　　　　　　　　　　■",
"■　　　　　　　　　　　　　　　　　　■■　　　　　　　　　　　　　　　　　　■",
"■　　　　　　　　　　　　　　■■　　■■　　■■　　　　　　　　　　　　　　■",
"■　　　　　　　　　　　　　　　　　　■■　　　　　　　　　　　　　　　　　　■",
"■　　　　　　　　　　　　　　　　　　■■　　　　　　　　　　　　　　　　　　■",
"■　　　　　　　　　　　　■■　　　　■■　　　　■■　　　　　　　　　　　　■",
"■　　　　砲　　　　　　　　　　　　　■■　　　　　　　　　　　　　　　　　　■",
"■　　　■■■　　　　　　　　　　　　■■　　　　　　　　　　　　　　　　　　■",
"■　　砲■■■砲　　　　　　　■■　　■■　　■■　　　　　　　　　　　　　　■",
"■　　　■■■　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　■",
"■　　　　砲　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　■",
"■　　　　　　　　　　　　■■　　　　■■■■　　　　　　　　　　　　　　終　■",
"■　　　　　　　　　　　　■■　　　　■■■■　　　　　　蛙　　蛙　　蛙　　　■",
"■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■",
	],

	// 03
	[
"■■■■■■■■■■■■■■■■■■■■■■■■■",
"■　　　　砲　　　　　　　　　　　　　砲　　　　■",
"■　　　　　　　　　　　　　　　　　　　　　　　■",
"■　　　　　　　　　　　　　　　　　　　　　　　■",
"■　　　　　　　　　　　　　　　　　　　　　　　■",
"■　　　　　　　　　　　　　　　　　　　　　　　■",
"■　　　　　　　　　　　　　　　　　　　　　　　■",
"■　　　　　　　　　　　　　　　■■■　　　　　■",
"■　　　　　　　　　　　　　　　　　　　　　　　■",
"■　　　　　　　　　　　　W3W3W3　　　　　　　　■",
"■　　　　　　　　　　　　　　　　　　　　　　　■",
"■　　　　　　　　W2W2W2　　　　　　　　　　　　■",
"■　　　　　　　　　　　　　　　　　　　　　　　■",
"■　　　　　W1W1W1　　　　　　　　　　　　　　　■",
"■　　　　　　　　　　　　　　　　　　　　　　　■",
"■　　始　　　　　　　　　　　　　　　　　終　　■",
"■　　■　　　　　　　　　　　　　　　　　■　　■",
"■　　■　　　蛙　蛙　蛙　蛙　蛙　蛙　　　■　　■",
"■■■■■■■■■■■■■■■■■■■■■■■■■",
	],

	// 04
	[
"■■■■■■■■■■■■■■■■■■■■■■■■■",
"■AC　　　　　　　　　　　　　　　　　　　　　　■",
"■　　　　　　　　　　　　　　　　　　　　　　　■",
"■　　　　　　　　　　　　　　　　　　　　　　　■",
"■　　　　　　　　　　　　　　　　　　　　　　　■",
"■　　　　　　　　　　　　　　　　　　　　　　　■",
"■　　■　　　　　　　　B1　　　　　　　　■　　■",
"■　　■　　　　　　　　　　　　　　　　　■　　■",
"■　　　　　　　　　　　　　　　　　　　　　　　■",
"■　　　　　　　　　　　　　　　　　　　　　　　■",
"■　　■■　　　　　　　　　　　　　　　■■　　■",
"■　　　　　　　　　　　　　　　　　　　　　　　■",
"■　　　　　　　　　　　　　　　　　　　　　　　■",
"■■■■■　　　　　　■■■　　　　　　■■■■■",
"■　　　　　　　　　　■■■　　　　　　　　　　■",
"■　　　　　　　　　　■■■　　　　　　　　　　■",
"■　　　　　　　　　　　　　　　　　　　　　　　■",
"■　　　　　　　　　　　　　　　　　　　　　　　■",
"■　　　■■■　　■■■■■■■　　■■■　　　■",
"■　　　　　　　　　　■■■　　　　　　　　　　■",
"■　　　　　　　　　　■■■　　　　　　　　　　■",
"■　　　　　■■　　　　　　　　　■■　　　　　■",
"■　　　　　■■■　　　　　　　■■■　　　　　■",
"■　　　　　　　　　　　　　　　　　　　　　　　■",
"■　　　　　　　　　　　　　　　　　　　　　　　■",
"■　　　　■■■■■■　　　■■■■■■　　　　■",
"■　　　　　　　　　　　　　　　　　　　　　　　■",
"■　　　　　　　　　　　　　　　　　　　　　　　■",
"■　　■■　　　　　　　　　■　　　　　■■　　■",
"■　　　　　　　　　　　■　　　　　　　　　　　■",
"■　　　　　　　　　　　■　　　　　　　　　　　■",
"■■■　　　　　　　■　　　　　　　　　　　■■■",
"■　　　　　　　　　　　　　　　　　　　　　　　■",
"■　　　　　　　　　　　　　　　　　　　　　　　■",
"■　　■■■■　　■　　　　　■　　■■■■　　■",
"■　　　　　　　　■　　　　　■　　　　　　　　■",
"■　　　　　　　　■　　始　　■　　　　　　　　■",
"■■■■■■■■■■■■■■■■■■■■■■■■■",
	],

	// 05
	[
"■■■■■■■■■■■■■■■■■■■■■■■■■",
"■　　　　　　　　　　　　　　　　　　　　　　　■",
"■　　　　　　　　　　　　　　　　　　　　　　　■",
"■　　　　　　　　　　　　　　　　　　　　　　　■",
"■　　　　　　　　　　　　　　　　　　　　　　　■",
"■　　　　　　　　　　　　　　　　　　　　　　　■",
"■　　　　　　　　　　　　　　　　　　　　　　　■",
"■　　　　　　　　　　　　　　　　　　　　　　　■",
"■　　　　　　　　　　　　　　　　　　　　　　　■",
"■　　　　　　　　　　　　　　　　　　　　　　　■",
"■　　　　　　　　　　　　　　　　　　　　　　　■",
"■　　　　　　　　　　　　　　　　　　　　　　　■",
"■　　　　　　　　　　　　　　　　　　　　　　　■",
"■　　　　　　　　蛙　　　　　蛙　　　　　　　　■",
"■　　　　　W2W2W2W2W2W2W2W2W2W2W2W2W2　　　　　■",
"■　　始　　　　　　　　　　　　　　　　　終　　■",
"■　　■　　　　　　　　　　　　　　　　　■　　■",
"■　　■　　　　　　　　　　　　　　　　　■　　■",
"■■■■■■■■■■■■■■■■■■■■■■■■■",
	],

	// 06
	[
"■■■■■■■■■■■■■■■■■■■■■■■■■",
"■　　　　　　　　　　　　　　　　　　　　　　　■",
"■　　　　　　　　　　　　　　　　　　　　　　　■",
"■　　　　　　　　　　　　　　　　　　　　　　　■",
"■　　　　　　　　　　　　　　　　　　　　　　　■",
"■　　　　　　　　　　　　　　　　　　　　　　　■",
"■　　　　　　　　　　　　　　　　　　　　　　　■",
"■　　　　　　　　　　　　　　　　　　　　　　　■",
"■　　　　　　　　　　　　　　　　　　　　　　　■",
"■　　　　　　　　　　　　　　　　　　　　　　　■",
"■　　　　　　　　　　　　　　　　　　　　　　　■",
"■　　　　　　　　　　　　　　　　　　　　　　　■",
"■　　　　　　　　　　　　　　　　　　　　　　　■",
"■　　　　　　　　蛙　　砲　　蛙　　　　　　　　■",
"■　　　　　W3W3W3W3W3W3W3W3W3W3W3W3W3　　　　　■",
"■　　始　　　　　　　　　　　　　　　　　終　　■",
"■　　■　　　　　　　　　　　　　　　　　■　　■",
"■　　■　　　　　　　　　　　　　　　　　■　　■",
"■■■■■■■■■■■■■■■■■■■■■■■■■",
	],

	// 07
	[
"■■■■■■■■■■■■■■■■■■■■■■■■■",
"■　　　　　　　　　　　　　　　　　　　　　　　■",
"■　　　　　　　　　　　　　　　　　　　　　　　■",
"■　　　　　　　　　　　　　　　　　　　　　　　■",
"■　　　　　　　　　　　　　　　　　　　　　　　■",
"■　　　　　　　　　　　　　　　　　　　　　　　■",
"■　　　　　　　　　　　　　　　　　　　　　　　■",
"■　　　　　　　　　　　　　　　　　　　　　　　■",
"■　　　　　　　　　　　　　　　　　　　　　　　■",
"■　　　　　　　　　　　　　　　　　　　　　　　■",
"■　　　　　　　　　　　　　　　　　　　　　　　■",
"■　　　　　　　　　　　　　　　　　　　　　　　■",
"■　　　　　　　　　　　　　　　　　　　　　　　■",
"■　　　　　　　　　　　　　　　　　　　　　　　■",
"■　　　　　　　　　　　砲　　　　　　　　　　　■",
"■　　　　　　　　　　W1W1W1　　　　　　　　　　■",
"■　　　　　　　　W1W1W1W1W1W1W1　　　　　　　　■",
"■　　始　　　W1W1W1W1W1W1W1W1W1W1W1　　　終　　■",
"■■■■■■■■■■■■■■■■■■■■■■■■■",
	],

	// 08
	[
"■■■■■■■■■■■■■■■■■■■■■■■■■",
"■　　　　　　　　　　　　　　　　　　　　　　　■",
"■　　　　　　　　　　　　　　　　　　　　　　　■",
"■　　　　　　　　　　　　　　　　　　　　　　　■",
"■　　　　　　　　　　　　　　　　　　　　　　　■",
"■　　　　　　　　　　　　　　　　　　　　　　　■",
"■　　　　　　　　　　　　　　　　　　　　　　　■",
"■　　　　　　　　　　　　　　　　　　　　　　　■",
"■　　　　　　　　　　　　　　　　　　　　　　　■",
"■　　　　　　　　　　　　　　　　　　　　　　　■",
"■　　　　　　　　　　　　　　　　　　　　　　　■",
"■　　　　　　　　　　　　　　　　　　　　　　　■",
"■　　　　　　　　　　　　　　　　　　　　　　　■",
"■　　　　　　　　　　　　　　　　　　　　　　　■",
"■　　　　　　　　　　　　　　　　　　　　　　　■",
"■　　　　　　　　蛙　W2W2W2　蛙　　　　　　　　■",
"■　　　　　　　　W2W2W2W2W2W2W2　　　　　　　　■",
"■　　始　　　W2W2W2W2W2W2W2W2W2W2W2　　　終　　■",
"■■■■■■■■■■■■■■■■■■■■■■■■■",
	],

	// 09
	[
"■■■■■■■■■■■■■■■■■■■■■■■■■",
"■　　　　　　　　　　　　　　　　　　　　　　　■",
"■　　　　　　　　　　　　　　　　　　　　　　　■",
"■　　　　　　　　　　　　　　　　　　　　　　　■",
"■　　　　　　　　　　　　　　　　　　　　　　　■",
"■　　　　　　　　　　　　　　　　　　　　　　　■",
"■　　　　　　　　　　　　　　　　　　　　　　　■",
"■　　　　　　　　　　　　　　　　　　　　　　　■",
"■　　　　　　　　　　　　　　　　　　　　　　　■",
"■　　　　　　　　　　　　　　　　　　　　　　　■",
"■　　　　　　　　　　　　　　　　　　　　　　　■",
"■　　　　　　　　　　　　　　　　　　　　　　　■",
"■　　　　　　　　　　　　　　　　　　　　　　　■",
"■　　　　　　　　　　　　　　　　　　　　　　　■",
"■　　　　　　　　　　　砲　　　　　　　　　　　■",
"■　　　　　　　　蛙　W3W3W3　蛙　　　　　　　　■",
"■　　　　　　　　W3W3W3W3W3W3W3　　　　　　　　■",
"■　　始　　　W3W3W3W3W3W3W3W3W3W3W3　　　終　　■",
"■■■■■■■■■■■■■■■■■■■■■■■■■",
	],
];
