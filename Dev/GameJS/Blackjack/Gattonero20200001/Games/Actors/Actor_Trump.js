/*
	�A�N�^�[ - Trump (�g�����v�̃J�[�h)
*/

var<int> ActorKind_Trump = @(AUTO);

function <Actor_t> CreateActor_Trump(<double> x, <double> y, <boolean> reversed)
{
	var ret =
	{
		Kind: ActorKind_Trump,
		X: x,
		Y: y,

		// ��������ŗL

		<boolean> Reversed: reversed,
		<generatorForTask> SpclDraw: ToGenerator([]),
	};

	ret.Draw = @@_Draw(ret);

	return ret;
}

function* <generatorForTask> @@_Draw(<Actor_t> actor)
{
	for (; ; )
	{
		if (!NextVal(actor.SpclDraw))
		{
			// TODO
		}

		// TODO

		yield 1;
	}
}
