/*
	敵
*/

/@(ASTR)

/// Enemy_t
{
	<double> X // 位置-X
	<double> Y // 位置-Y

	<generatorForTask> Draw

	<Action Enemy_t> Damaged
	<Action Enemy_t> Killed

	<int> HP // 体力

	<boolean> Crashed // 自弾に衝突したか
}

@(ASTR)/
