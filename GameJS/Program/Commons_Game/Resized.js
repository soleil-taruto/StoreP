/*
	��ʃ��T�C�Y�E�C�x���g
*/

// ��ʃ��T�C�Y�E�C�x���g�̃��X�g
var FUNC[] @@_Reactions = [];

// ��ʃ��T�C�Y�E�C�x���g�̒ǉ�
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
