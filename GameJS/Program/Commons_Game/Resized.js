/*
	画面リサイズ・イベント
*/

// 画面リサイズ・イベントのリスト
var FUNC[] @@_Reactions = [];

// 画面リサイズ・イベントの追加
function void AddResized(FUNC reaction)
{
	@@_Reactions.push(reaction);
}

window.onresize = function()
{
	@@_Resized();
};

var int @@_TimerId;

function void @@_Resized()
{
	clearTimeout(@@_TimerId);
	@@_TimerId = setTimeout(@@_Resized_Main, 100);
}

function void @@_Resized_Main()
{
	for (var event of @@_Reactions)
	{
		event();
	}
}
