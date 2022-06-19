/*
	自弾
*/

/@(ASTR)

/// Shot_t
{
	<double> X // X-位置
	<double> Y // Y-位置

	// 攻撃力
	// 0 == 不使用・予約
	// -1 == 死亡
	// 1～ == 残り攻撃力
	//
	<int> AttackPoint

	// 行動と描画
	// 処理すべきこと：
	// -- 行動
	// -- 当たり判定の設置
	// -- 描画
	// 偽を返すとブロックを破棄する。
	//
	<generatorForTask> Draw

	<Crash_t> Crash; // 当たり判定
}

@(ASTR)/

function <boolean> DrawShot(<Shot_t> shot) // ret: ? 生存
{
	return shot.Draw.next().value;
}
