/*
	���e - �{�[��
*/

function <Shot_t> CreateShot_Ball(<doule> x, <double> y, <double> xAdd, <double> yAdd)
{
	var ret =
	{
		X: x,
		Y: y,
		AttackPoint: 1,
		Crash: null,

		// ��������ŗL

		<double> XAdd: xAdd, // X-���x
		<double> YAdd: yAdd, // Y-���x
	};

	ret.Draw = @@_Draw(ret);
	ret.Dead = @@_Dead;

	return ret;
}

/*
	�s���ƕ`��
	���ׂ����ƁF
	-- �ړ�
	-- �����蔻��ݒu
	-- �`��
	�߂�l�F
	-- ? ����
*/
function* <generatorForTask> @@_Draw(<Shot_t> shot)
{
	for (; ; )
	{
		shot.X += shot.XAdd;
		shot.Y += shot.YAdd;

		shot.Crash = CreateCrash_Circle(shot.X, shot.Y, 15.0);

		Draw(P_Ball, shot.X, shot.Y, 1.0, 0.0, 1.0);

		yield 1;
	}
}

function <void> @@_Dead(<Shot_t> shot)
{
	// TODO
}
