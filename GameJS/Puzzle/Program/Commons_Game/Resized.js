/*
	��ʃ��T�C�Y�E�C�x���g
*/

// ��ʃ��T�C�Y�E�C�x���g�̃��X�g
var @@_Reactions = [];

// ��ʃ��T�C�Y�E�C�x���g�̒ǉ�
function AddResized(reaction)
{
	@@_Reactions.push(reaction);
}

window.onresize = function()
{
	@@_Resized();
};

var @@_TimerId;

function @@_Resized()
{
	clearTimeout(@@_TimerId);
	@@_TimerId = setTimeout(@@_Resized_Main, 100);
}

function @@_Resized_Main()
{
	for (var event of @@_Reactions)
	{
		event();
	}
}
