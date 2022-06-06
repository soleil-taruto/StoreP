/*
	���[�e�B���e�B
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
function MakeXYSpeed(x, y, targetX, targetY, speed)
{
	var pt = AngleToPoint(GetAngle(targetX - x, targetY - y), speed);

	var ret =
	{
		X: pt.X,
		Y: pt.Y,
	};

	return ret;
}

/*
	���_���猩�Ďw��ʒu�̊p�x�𓾂�B
	�p�x�� X-���v���X������ 0 �x�Ƃ��Ď��v���̃��W�A���p�ł��B
	�A�� X-���v���X�����͉E Y-���v���X�����͉��ł��B
	�Ⴆ�΁A�^���� Math.PI / 2, �^��� Math.PI * 1.5 �ɂȂ�܂��B

	x: �w��ʒu-X
	y: �w��ʒu-Y

	ret: �p�x
*/
function GetAngle(x, y)
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

	var r1 = 0.0;
	var r2 = Math.PI / 2.0;
	var t = y / x;
	var rm;
	var rmt;

	for (var c = 1; ; c++)
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

	angle: �p�x
	distance: ����

	ret:
	{
		X: �ʒu-X
		Y: �ʒu-Y
	}
*/
function AngleToPoint(angle, distance)
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
function GetDistance(x, y)
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
function Approach(value, dest, rate)
{
	value -= dest;
	value *= rate;
	value += dest;

	return value;
}
