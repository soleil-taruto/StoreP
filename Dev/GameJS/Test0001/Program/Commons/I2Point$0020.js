class I2Point_t
{
	int X,
	int Y,
}

public I2Point_t CreateI2Point(int x, int y)
{
	I2Point_t ret =
	{
		X: x,
		Y: y,
	};

	return ret;
}

public D2Point_t I2PointToD2Point(I2Point_t src)
{
	D2Point_t ret = CreateD2Point(
		src.X,
		src.Y
		);

	return ret;
}
