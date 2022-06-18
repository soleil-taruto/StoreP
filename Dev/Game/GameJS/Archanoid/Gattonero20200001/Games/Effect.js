/*
	固有エフェクト
*/

/*
	ダミーエフェクト

	追加方法：
		AddEffect(Effect_Dummy(x, y));

	★サンプルとしてキープ
*/
function* <generatorForTask> Effect_Dummy(<double> x, <double> y)
{
	for (var<Scene_t> scene of CreateScene(30))
	{
		Draw(P_Dummy, x, y, 0.5 - 0.5 * scene.Rate, scene.Rate * Math.PI, 1.0);

		yield 1;
	}
}

function <void> AddEffect_Explode(<double> x, <double> y)
{
	for (var<int> c = 0; c < 10; c++)
	{
		AddEffect(function* ()
		{
			var<double> rot = GetRand2() * 7.0;

			for (var<Scene_t> scene of CreateScene(20))
			{
				Draw(
					P_Star_S,
					x,
					y,
					scene.Rate,
					rot,
					1.0 + 0.5 * scene.RemRate
					);

				rot *= 0.7;

				yield 1;
			}
		}());
	}
}
