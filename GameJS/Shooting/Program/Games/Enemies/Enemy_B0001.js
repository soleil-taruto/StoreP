/*
	B-0001
*/

/*
	ê∂ê¨
*/
function <Enemy_t> Enemy_B0001_Create(<double> x, <double> y)
{
	var ret =
	{
		Each: @@_Each,
		Dead: @@_Dead,
		X: x,
		Y: y,
	};

	return ret;
}

function @@_Each(enemy)
{
	//
}

function @@_Dead(enemy)
{
	//
}
