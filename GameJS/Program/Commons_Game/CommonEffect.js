/*
	���ʃG�t�F�N�g
*/

var GEN[] @@_Effects = [];

/*
	�G�t�F�N�g��ǉ�����B

	effect: �W�F�l���[�^�ł��邱�ƁB
		�W�F�l���[�^���U��Ԃ��ƏI���ƌ��Ȃ��B
*/
function void AddCommonEffect(GEN effect)
{
	@@_Effects.push(effect);
}

function void @(UNQN)_EACH()
{
	var execute = function(effect)
	{
		return effect.next().value;
	};

	@@_Effects = @@_Effects.filter(execute);
}
