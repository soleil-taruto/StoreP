/*
	���e
*/

/@(ASTR)

/// Shot_t
{
	<double> X // X-�ʒu
	<double> Y // Y-�ʒu
	<boolean> Crashed // �G�ƏՓ˂�����
	<double> �����蔻��_R
	<generatorForTask> Each
}

@(ASTR)/

/*
	���e���X�g
*/
var<Shot_t[]> Shots = [];

/*
	���e����
*/
function <Shot_t> CreateShot(<double> x, <double> y)
{
	var ret =
	{
		// �ʒu
		X: x,
		Y: y,

		// �G�ƏՓ˂�����
		Crashed: false,

		�����蔻��_R: 20.0,
	};

	ret.Each = @@_Each(ret);

	return ret;
}

/*
	ret: ? ����
*/
function <boolean> Shot_Each(<Shot_t> shot)
{
	return shot.Each.next().value;
}

function* <generatorForTask> @@_Each(<Shot_t> shot)
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
//		PrintRect_XYWH(GetField_L() + shot.X, GetField_T() + shot.Y, 10, 10);

		yield 1;
	}
}
