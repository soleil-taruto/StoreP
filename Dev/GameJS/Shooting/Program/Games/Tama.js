/*
	ìGíe
*/

function <Tama_t> CreateTama(x, y)
{
	/// Tama_t
	var<Tama_t> ret =
	{
		<double> X: x,
		<double> Y: y,

		<generatorForTask> Each: null, // late init
	};

	ret.Each = @@_Each(ret);

	return ret;
}

/*
	ret: ? ê∂ë∂
*/
function <boolean> Tama_Each(<Tama_t> tama)
{
	return tama.Each.next().value;
}

function* <generatorForTask> @@_Each(tama)
{
	var<double> speed = MakeXYSpeed(tama.X, tama.Y, Player_X, Player_Y, 3.0);
	var<double> speedX = speed.X;
	var<double> speedY = speed.Y;

	for (; ; )
	{
		tama.X += speedX;
		tama.Y += speedY;

		var<double> MARGIN = 30.0;

		// âÊñ äOÇ…èoÇΩÇÃÇ≈ëﬁèÍ
		if (
			tama.X < -MARGIN || GetField_W() + MARGIN < tama.X ||
			tama.Y < -MARGIN || GetField_H() + MARGIN < tama.Y
			)
		{
			break;
		}

		// ï`âÊ
		Draw(P_Tama_0001, GetField_L() + tama.X, GetField_T() + tama.Y, 1.0, 0.0, 1.0);

		// ï`âÊ test
//		SetColor("#00ffff");
//		PrintRectCenter(GetField_L() + tama.X, GetField_T() + tama.Y, 20, 20);

		yield 1;
	}
}

/*
	ìGíeÉäÉXÉg
*/
var<Tama_t[]> Tamas = [];
