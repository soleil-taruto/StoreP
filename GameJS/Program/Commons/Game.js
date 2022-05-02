/*
	�Q�[���������ʊ֐�
*/

/*
	�n�_�E�I�_�E���x���� XY-���x�𓾂�B

	x: �n�_-X
	y: �n�_-Y
	targetX: �I�_-X
	targetY: �I�_-Y
	speed: ���x

	ret:
	{
		X: ���x-X
		Y: ���x-Y
	}
*/
function MAP MakeXYSpeed(double x, double y, double targetX, double targetY, double speed)
{
	return AngleToPoint(GetAngle(targetX - x, targetY - y), speed);
}

/*
	���_���猩�Ďw��ʒu�̊p�x�𓾂�B
	�p�x�� X-���v���X������ 0 �x�Ƃ��Ď��v���̃��W�A���p�ł���B
	�A�� X-���v���X�����͉E Y-���v���X�����͉��ł���B
	��Ƃ��āA�^���� Math.PI * 0.5, �^���͐^��� Math.PI * 1.5 �ɂȂ�B

	x: �w��ʒu-X
	y: �w��ʒu-Y

	ret: �p�x(���W�A���p)
*/
function double GetAngle(double x, double y)
{
	if (y < 0.0)
	{
		return Math.PI * 2.0 - GetAngle(x, -y);
	}
	if (x < 0.0)
	{
		return Math.PI - GetAngle(-x, y);
	}
	if (x <= 0.0)
	{
		return Math.PI / 2.0;
	}
	if (y <= 0.0)
	{
		return 0.0;
	}

	double r1 = 0.0;
	double r2 = Math.PI / 2.0;
	double t = y / x;
	double rm;
	double rmt;

	for (int c = 1; ; c++)
	{
		rm = (r1 + r2) / 2.0;

		if (10 <= c)
		{
			break;
		}

		rmt = Math.tan(rm);

		if (t < rmt)
		{
			r2 = rm;
		}
		else
		{
			r1 = rm;
		}
	}
	return rm;
}

/*
	�p�x�Ƌ��������Ɍ��_���猩���ʒu�𓾂�B

	angle: �p�x(���W�A���p)
	distance: ����

	ret:
	{
		X: �ʒu-X
		Y: �ʒu-Y
	}
*/
function MAP AngleToPoint(double angle, double distance)
{
	var ret =
	{
		X: distance * Math.cos(angle),
		Y: distance * Math.sin(angle),
	};

	return ret;
}

/*
	���_����w��ʒu�܂ł̋����𓾂�B

	x: �w��ʒu-X
	y: �w��ʒu-Y

	ret: ����
*/
function double GetDistance(double x, double y)
{
	return Math.sqrt(x * x + y * y);
}

/*
	���ݒl��ړI�l�ɋ߂Â��܂��B

	value: ���ݒl
	dest: �ړI�l
	rate: 0.0 �` 1.0 (�߂�����߂Â��� �` ����܂�߂Â��Ȃ�)

	ret: �߂Â�����̒l
*/
function double Approach(double value, double dest, double rate)
{
	value -= dest;
	value *= rate;
	value += dest;

	return value;
}

/*
	�� forscene, DDSceneUtils.Create() �Ɠ��l�̂���

	�g�p��F
		for (var scene of CreateScene(30))
		{
			// �����փt���[�����̏������L�q����B

			yield 1;
		}

		�񋓉񐔁F31
		�񋓁F
			{ Numer: 0, Denom: 30, Rem: 30, Rate: 0.0,    RemRate: 1.0     }
			{ Numer: 1, Denom: 30, Rem: 29, Rate: 1 / 30, RemRate: 29 / 30 }
			{ Numer: 2, Denom: 30, Rem: 28, Rate: 2 / 30, RemRate: 28 / 30 }
			...
			{ Numer: 28, Denom: 30, Rem: 2, Rate: 28 / 30, RemRate: 2 / 30 }
			{ Numer: 29, Denom: 30, Rem: 1, Rate: 29 / 30, RemRate: 1 / 30 }
			{ Numer: 30, Denom: 30, Rem: 0, Rate: 1.0,     RemRate: 0.0    }
*/
function* GEN CreateScene(int frameMax)
{
	for (int frame = 0; frame <= frameMax; frame++)
	{
		double rate = (double)frame / frameMax;

		var scene =
		{
			Numer: frame,
			Denom: frameMax,
			Rate: rate,
			Rem: frameMax - frame,
			RemRate: 1.0 - rate,
		};

		yield scene;
	}
}
