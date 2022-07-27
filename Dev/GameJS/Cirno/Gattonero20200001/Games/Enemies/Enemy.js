/*
	敵
*/

/@(ASTR)

/// Enemy_t
{
	<int> Kind // 敵の種類

	<double> X // X-位置
	<double> Y // Y-位置

	// Hint:
	// プレイヤーに撃破されない(自弾に当たらない)敵を作る場合 enemy.HP == 0 にすること。
	// -- アイテム・敵弾など
	// プレイヤーに当たらない敵を作る場合 enemy.Draw において enemy.Crash == null にすること。
	// -- アイテムなど

	// 体力
	// -1 == 死亡
	// 0 == 無敵
	// 1〜 == 残り体力
	//
	<int> HP

	// 攻撃力
	// 0〜 == 攻撃力 -- ゼロの場合、被弾モーションは実行されるけど体力が減らない。
	//
	<int> AttackPoint;

	// 自機に当たると消滅する。
	// -- 敵弾を想定する。
	//
	<boolean> HitDie;

	// 行動と描画
	// 処理すべきこと：
	// -- 行動
	// -- 当たり判定の設置
	// -- 描画
	// 偽を返すとこの敵を破棄する。
	//
	<generatorForTask> Draw

	<Crash_t> Crash // 今フレームの当たり判定置き場, null で初期化すること。null == 当たり判定無し

	<Action Enemy_t int> Damaged // 被弾イベント
	<Action Enemy_t Shot_t> Dead // 死亡イベント, この敵を撃破した自弾が無い(不明な)場合、第２引数は null になる。
}

@(ASTR)/

/*
	行動と描画
*/
function <boolean> DrawEnemy(<Enemy_t> enemy) // ret: ? 生存
{
	return enemy.Draw.next().value;
}

/*
	被弾
*/
function <void> EnemyDamaged(<Enemy_t> enemy, <int> damagePoint)
{
	enemy.Damaged(enemy, damagePoint);
}

/*
	死亡
*/
function <void> KillEnemy(<Enemy_t> enemy)
{
	KillEnemy_Shot(enemy, null);
}

/*
	死亡 (自弾による撃破)

	shot: この敵を撃破した自弾が無い(不明な)場合 null になる。
*/
function <void> KillEnemy_Shot(<Enemy_t> enemy, <Shot_t> shot)
{
	if (enemy.HP != -1) // ? まだ死亡していない。
	{
		enemy.HP = -1; // 死亡させる。
		@@_DeadEnemy(enemy, shot);
	}
}

function <void> @@_DeadEnemy(<Enemy_t> enemy, <Shot_t> shot)
{
	enemy.Dead(enemy, shot);
}
