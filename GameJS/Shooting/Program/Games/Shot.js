/*
	自弾
*/

function <Shot_t> CreateShot(<double> x, <double> y)
{
	/// Shot_t
	var<Shot_t> ret =
	{
		// 位置
		<double> X: x,
		<double> Y: y,

		// フレーム処理
		<generatorForTask> Each: null, // late init

		// 敵と衝突したか
		<boolean> Crashed: false,
	};

	ret.Each = @@_Each(ret);

	return ret;
}

/*
	ret: ? 生存
*/
function <void> Shot_Each(<Shot_t> shot)
{
	return shot.Each.next().value;
}

function* @@_Each(shot)
{
	for (; ; )
	{
		shot.X += 10;

		// 画面外に出たので退場
		if (GetField_W() < shot.X)
		{
			break;
		}

		// 衝突により消滅
		if (shot.Crashed)
		{
			break;
		}

		// 描画
		Draw(P_Shot_0001, GetField_L() + shot.X, GetField_T() + shot.Y, 1.0, 0.0, 1.0);

		// 描画 test
//		SetColor("#ffffff");
//		PrintRectCenter(GetField_L() + shot.X, GetField_T() + shot.Y, 10, 10);

		yield 1;
	}
}

/*
	自弾リスト
*/
var Shots = [];
