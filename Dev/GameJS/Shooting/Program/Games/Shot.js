/*
	é©íe
*/

/@(ASTR)

/// Shot_t
{
	<double> X // X-à íu
	<double> Y // Y-à íu
	<boolean> Crashed // ìGÇ∆è’ìÀÇµÇΩÇ©
	<generatorForTask> Each
}

@(ASTR)/

function <Shot_t> CreateShot(<double> x, <double> y)
{
	var ret =
	{
		// à íu
		X: x,
		Y: y,

		// ìGÇ∆è’ìÀÇµÇΩÇ©
		Crashed: false,
	};

	ret.Each = @@_Each(ret);

	return ret;
}

/*
	ret: ? ê∂ë∂
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

		// âÊñ äOÇ…èoÇΩÇÃÇ≈ëﬁèÍ
		if (GetField_W() < shot.X)
		{
			break;
		}

		// è’ìÀÇ…ÇÊÇËè¡ñ≈
		if (shot.Crashed)
		{
			break;
		}

		// ï`âÊ
		Draw(P_Shot_0001, GetField_L() + shot.X, GetField_T() + shot.Y, 1.0, 0.0, 1.0);

		// ï`âÊ test
//		SetColor("#ffffff");
//		PrintRectCenter(GetField_L() + shot.X, GetField_T() + shot.Y, 10, 10);

		yield 1;
	}
}

/*
	é©íeÉäÉXÉg
*/
var <Shot_t[]> Shots = [];
