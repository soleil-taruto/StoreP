/*
	ブロック
*/

/@(ASTR)

/// Block_t
{
	<double> X // X-位置
	<double> Y // Y-位置

	<int> HP // 体力

	// ブロックの種類
	// -- 1 == Soft -- 柔らかい
	// -- 2 == Norm -- 硬さ普通
	// -- 3 == Hard -- 硬い
	//
	<int> Kind

	// 行動と描画
	// 処理すべきこと：
	// -- 行動
	// -- 当たり判定の設置
	// -- 描画
	// 偽を返すとブロックを破棄する。
	//
	<generatorForTask> Draw

	<Crash_t> Crash // 当たり判定
}

@(ASTR)/
