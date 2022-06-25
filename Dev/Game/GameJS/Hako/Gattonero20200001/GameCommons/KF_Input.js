/*
	入力
*/

/*
	ゲームパッドのボタン・インデックス
	変更可能
*/
var<int> PadInputIndex_2 = 102;
var<int> PadInputIndex_4 = 104;
var<int> PadInputIndex_6 = 106;
var<int> PadInputIndex_8 = 108;
var<int> PadInputIndex_A = 0;
var<int> PadInputIndex_B = 3;

/*
	各ボタンの押下状態カウンタ
*/
var<int> @@_Count_2 = 0;
var<int> @@_Count_4 = 0;
var<int> @@_Count_6 = 0;
var<int> @@_Count_8 = 0;
var<int> @@_Count_A = 0;
var<int> @@_Count_B = 0;

function <void> @@_EACH()
{
	@@_Count_2 = @@_Check(@@_Count_2, PadInputIndex_2, [ 40, 74,  98 ]); // カーソル下 , J , テンキー2
	@@_Count_4 = @@_Check(@@_Count_4, PadInputIndex_4, [ 37, 72, 100 ]); // カーソル左 , H , テンキー4
	@@_Count_6 = @@_Check(@@_Count_6, PadInputIndex_6, [ 39, 76, 102 ]); // カーソル右 , L , テンキー6
	@@_Count_8 = @@_Check(@@_Count_8, PadInputIndex_8, [ 38, 75, 104 ]); // カーソル上 , K , テンキー8
	@@_Count_A = @@_Check(@@_Count_A, PadInputIndex_A, [ 90 ]); // Z
	@@_Count_B = @@_Check(@@_Count_B, PadInputIndex_B, [ 88 ]); // X
}

function <int> @@_Check(<int> counter, <int> padInputIndex, <int[]> keyCodes)
{
	var<boolean> statusPad = GetPadInput(padInputIndex);
	var<boolean> statusKey = false;

	for (var<int> keyCode of keyCodes)
	{
		if (1 <= GetKeyInput(keyCode))
		{
			statusKey = true;
		}
	}
	var<boolean> status = statusPad || statusKey;

	if (status) // ? 押している。
	{
		// 前回 ⇒ 今回
		// -1   ⇒  1
		//  0   ⇒  1
		//  1～ ⇒  2～

		counter = Math.max(counter + 1, 1);
	}
	else // ? 押していない。
	{
		// 前回 ⇒ 今回
		// -1   ⇒  0
		//  0   ⇒  0
		//  1～ ⇒ -1

		counter = Math.max(Math.max(counter, 0) * -1, -1);
	}
	return counter;
}

function <int> GetInput_2()
{
	return @@_Count_2;
}

function <int> GetInput_4()
{
	return @@_Count_4;
}

function <int> GetInput_6()
{
	return @@_Count_6;
}

function <int> GetInput_8()
{
	return @@_Count_8;
}

/*
	決定
	ジャンプ
*/
function <int> GetInput_A()
{
	return @@_Count_A;
}

/*
	キャンセル
	攻撃
*/
function <int> GetInput_B()
{
	return @@_Count_B;
}
