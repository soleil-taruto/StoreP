/*
	�G�t�F�N�g
*/

var <generatorForTask[]> @@_Effects = [];

/*
	�G�t�F�N�g��ǉ�����B

	effect: �W�F�l���[�^�ł��邱�ƁB
		�W�F�l���[�^���U��Ԃ��ƏI���ƌ��Ȃ��B
*/
function <void> AddEffect(<generatorForTask> effect)
{
	@@_Effects.push(effect);
}

function <void> @(UNQN)_EACH()
{
	@@_Effects = @@_Effects.filter(<boolean> function(<generatorForTask> effect)
	{
		return effect.next().value;
	});
}
