/*
	��ʃ��T�C�Y�E�C�x���g
*/

// ��ʃ��T�C�Y�E�C�x���g�̃��X�g
var<Action[]> @@_Reactions = [];

// ��ʃ��T�C�Y�E�C�x���g�̒ǉ�
function <void> AddResized(<Action> reaction)
{
	@@_Reactions.push(reaction);
}

window.onresize = function()
{
	@@_Resized();
};

var<int> @@_TimerId;

function <void> @@_Resized()
{
	clearTimeout(@@_TimerId);
	@@_TimerId = setTimeout(@@_Resized2, 100);
}

function <void> @@_Resized2()
{
	for (var<Action> event of @@_Reactions)
	{
		event();
	}
}
