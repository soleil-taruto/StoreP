/*
	数学系
*/

/*
	始点・終点・速度から XY-速度を得る。

	x: X-始点
	y: Y-始点
	targetX: X-終点
	targetY: Y-終点
	speed: 速度

	ret:
	{
		X: X-速度
		Y: Y-速度
	}
*/
function <D2Point_t> MakeXYSpeed(<double> x, <double> y, <double> targetX, <double> targetY, <double> speed)
{
	return AngleToPoint(GetAngle(targetX - x, targetY - y), speed);
}

/*
	原点から見て指定位置の角度を得る。
	角度は X-軸プラス方向を 0 度として時計回りのラジアン角です。
	但し X-軸プラス方向は右 Y-軸プラス方向は下です。
	例えば、真下は Math.PI / 2, 真上は Math.PI * 1.5 になります。

	x: X-指定位置
	y: Y-指定位置

	ret: 角度
*/
function <double> GetAngle(<double> x, <double> y)
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

	var<double> r1 = 0.0;
	var<double> r2 = Math.PI / 2.0;
	var<double> t = y / x;
	var<double> rm;
	var<double> rmt;

	for (var<int> c = 1; ; c++)
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
	角度と距離を元に原点から見た位置を得る。

	angle: 角度
	distance: 距離

	ret:
	{
		X: X-位置
		Y: Y-位置
	}
*/
function <D2Point_t> AngleToPoint(<double> angle, <double> distance)
{
	var<D2Point_t> ret =
	{
		X: distance * Math.cos(angle),
		Y: distance * Math.sin(angle),
	};

	return ret;
}

/*
	原点から指定位置までの距離を得る。

	x: X-指定位置
	y: Y-指定位置

	ret: 距離
*/
function <double> GetDistance(<double> x, <double> y)
{
	return Math.sqrt(x * x + y * y);
}

/*
	現在値を目的値に近づけます。

	value: 現在値
	dest: 目的値
	rate: 0.0 〜 1.0 (めっちゃ近づける 〜 あんまり近づけない)

	ret: 近づけた後の値
*/
function <double> Approach(<double> value, <double> dest, <double> rate)
{
	value -= dest;
	value *= rate;
	value += dest;

	return value;
}
