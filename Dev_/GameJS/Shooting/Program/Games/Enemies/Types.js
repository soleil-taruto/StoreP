/*
	型
*/

/@(ASTR)

/// Enemy_t
{
	<double> X // 位置-X
	<double> Y // 位置-Y

	<generatorForTask> Each // フレーム処理

	<int> HP // 体力

	<boolean> Crashed // 衝突したか
}

@(ASTR)/
