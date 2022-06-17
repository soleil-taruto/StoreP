/*
	I3Color_t �^
*/

/@(ASTR)

// �A���t�@�l�̖����F��\���B
// �e�F�� 0 �` 255 ��z�肷��B
// R �� -1 �ɂ��邱�Ƃɂ���Ė����ȐF�������B

/// I3Color_t
{
	<double> R // -1 == ����
	<double> G
	<double> B
}

@(ASTR)/

function <I3Color_t> CreateI3Color(<double> r, <double> g, <double> b)
{
	var ret =
	{
		R: r,
		G: g,
		B: b,
	};

	return ret;
}

function <D3Color_t> I3ColorToD3Color(<I3Color_t> src)
{
	return CreateD3Color(
		src.R / 255.0,
		src.G / 255.0,
		src.B / 255.0
		);
}

function <I4Color_t> I3ColorToI4Color(<I3Color_t> src, <int> a)
{
	return CreateI4Color(
		src.R,
		src.G,
		src.B,
		a
		);
}
