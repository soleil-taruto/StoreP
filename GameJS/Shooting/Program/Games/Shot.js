/*
	���e
*/

function CreateShot(x, y)
{
	var ret =
	{
		// �ʒu
		X: x,
		Y: y,

		// �G�ƏՓ˂�����
		Crashed: false,
	};

	ret.Each = @@_Each(ret);

	return ret;
}

/*
	ret: ? ����
*/
function Shot_Each(shot)
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
