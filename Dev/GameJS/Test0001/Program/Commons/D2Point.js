public class D2Point_t
{
	double X,
	double Y,
}

public D2Point_t CreateD2Point(double x, double y)
{
	D2Point_t ret =
	{
		X: x,
		Y: y,
	};

	return ret;
}

public I2Point_t D2PointToI2Point(D2Point_t src)
{
	I2Point_t ret = CreateI2Point(
		ToInt(src.X),
		ToInt(src.Y)
		);

	return ret;
}
