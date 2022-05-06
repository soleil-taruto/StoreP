/*
	B-0001
*/

/*
	ê∂ê¨
*/
function <Enemy_t> Enemy_B0001_Create(<double> x, <double> y)
{
	var<Enemy_t> ret =
	{
		<double> X: x,
		<double> Y: y,
		<generatorForTask> Each: @@_Each,
		<generatorForTask> Dead: @@_Dead,
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
