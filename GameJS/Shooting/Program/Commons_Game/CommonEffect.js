/*
	���ʃG�t�F�N�g
*/

var @@_Effects = [];

/*
	�G�t�F�N�g��ǉ�����B

	effect: �W�F�l���[�^�ł��邱�ƁB
		�W�F�l���[�^���U��Ԃ��ƏI���ƌ��Ȃ��B
*/
function AddCommonEffect(effect)
{
	@@_Effects.push(effect);
}

function @(UNQN)_EACH()
{
	@@_Effects = @@_Effects.filter(function(effect)
	{
		return effect.next().value;
	});
}
