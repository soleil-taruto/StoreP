/*
	���e
*/

function <Shot_t> CreateShot(<double> x, <double> y)
{
	/// Shot_t
	var<Shot_t> ret =
	{
		// �ʒu
		<double> X: x,
		<double> Y: y,

		// �t���[������
		<generatorForTask> Each: null, // late init

		// �G�ƏՓ˂�����
		<boolean> Crashed: false,
	};

	ret.Each = @@_Each(ret);

	return ret;
}

/*
	ret: ? ����
*/
function <void> Shot_Each(<Shot_t> shot)
{
	return shot.Each.next().value;
}

function* @@_Each(shot)
{
	for (; ; )
	{
		shot.X += 10;

		// ��ʊO�ɏo���̂őޏ�
		if (GetField_W() < shot.X)
		{
			break;
		}

		// �Փ˂ɂ�����
		if (shot.Crashed)
		{
			break;
		}

		// �`��
		Draw(P_Shot_0001, GetField_L() + shot.X, GetField_T() + shot.Y, 1.0, 0.0, 1.0);

		// �`�� test
//		SetColor("#ffffff");
//		PrintRectCenter(GetField_L() + shot.X, GetField_T() + shot.Y, 10, 10);

		yield 1;
	}
}

/*
	���e���X�g
*/
var Shots = [];
