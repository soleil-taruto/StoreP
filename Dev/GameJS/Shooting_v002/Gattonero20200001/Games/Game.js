/*
	ゲーム・メイン
*/

// 敵リスト
var<Enemy_t[]> @@_Enemies = [];

// 自弾リスト
var<Shot_t[]> @@_Shots = [];

function* <generatorForTask> GameMain()
{
	// reset
	{
		@@_Enemies = [];
		@@_Shots = [];

		PlayerX = FIELD_L + FIELD_W / 2;
		PlayerY = FIELD_T + FIELD_H / 2;
		PlayerBornFrame = 0;
		PlayerInvincibleFrame = 0;
//		PlayerAttackLv = 1;
PlayerAttackLv = 3; // TODO
		PlayerZankiNum = 3;
	}

	var<Func boolean> f_scenarioTask   = Supplier(ScenarioTask());
	var<Func boolean> f_backgroundTask = Supplier(BackgroundTask());

	for (; ; )
	{
		if (!f_scenarioTask())
		{
			break;
		}

		// ====
		// 描画ここから
		// ====

		@@_DrawWall();

		// 背景の描画
		//
		if (!f_backgroundTask())
		{
			error();
		}

		DrawPlayer(); // プレイヤーの描画

		// 敵の描画
		//
		for (var<int> index = 0; index < @@_Enemies.length; index++)
		{
			if (@@_Enemies[index].HP == -1) // ? 既に死亡
			{
				continue;
			}

			@@_Enemies[index].Crash = null; // reset

			if (!DrawEnemy(@@_Enemies[index]))
			{
				@@_Enemies[index].HP = -1;
			}
		}

		// 自弾の描画
		//
		for (var<int> index = 0; index < @@_Shots.length; index++)
		{
			if (@@_Shots[index].AttackPoint == -1) // ? 既に死亡
			{
				continue;
			}

			@@_Shots[index].Crash = null; // reset

			if (!DrawShot(@@_Shots[index]))
			{
				@@_Shots[index].AttackPoint = -1;
			}
		}

		@@_DrawFront();

		if (1 <= GetKeyInput(17)) // ? コントロール押下中 -> 当たり判定表示 (デバッグ用)
		{
			SetColor("#000000a0");
			PrintRect(0, 0, Screen_W, Screen_H);
			SetColor("#ffffffa0");

			DrawCrash(PlayerCrash);

			for (var<Enemy_t> enemy of @@_Enemies)
			{
				DrawCrash(enemy.Crash);
			}
			for (var<Shot_t> shot of @@_Shots)
			{
				DrawCrash(shot.Crash);
			}
		}

		// ====
		// 描画ここまで
		// ====

		// ====
		// 当たり判定ここから
		// ====

		for (var<int> enemyIndex = 0; enemyIndex < @@_Enemies.length; enemyIndex++)
		{
			var<Enemy_t> enemy = @@_Enemies[enemyIndex];

			if (enemy.HP == -1) // ? 既に死亡
			{
				continue;
			}

			for (var<int> shotIndex = 0; shotIndex < @@_Shots.length; shotIndex++)
			{
				var<Shot_t> shot = @@_Shots[shotIndex];

				if (shot.AttackPoint == -1) // ? 既に死亡
				{
					continue;
				}
				if (enemy.HP == 0) // ? 無敵 -> 自弾とは衝突しない。
				{
					continue;
				}

				if (IsCrashed(enemy.Crash, shot.Crash)) // ? 衝突している。敵 vs 自弾
				{
					var<int> damagePoint = Math.min(enemy.HP, shot.AttackPoint);

					enemy.HP -= damagePoint;
					shot.AttackPoint -= damagePoint;

					if (enemy.HP <= 0) // ? 死亡した。
					{
						KillEnemy(enemy);
						break; // この敵は死亡したので、次の敵へ進む。
					}
					if (shot.AttackPoint <= 0) // ? 攻撃力を使い果たした。
					{
						KillShot(shot);
						continue; // この自弾は死亡したので、次の自弾へ進む。
					}
				}
			}

			if (enemy.HP == -1) // ? 既に死亡 (2回目)
			{
				continue;
			}

			if (IsCrashed(enemy.Crash, PlayerCrash)) // ? 衝突している。敵 vs 自機
			{
				if (enemy.Kind == Enemy_Kind_e_Item) // ? アイテム -> 取得
				{
					var<Enemy_Item_Kind_e> itemKind = GetEnemyItemKind(enemy);

					switch (itemKind)
					{
					case Enemy_Item_Kind_e_PowerUp:
						PlayerAttackLv = Math.min(PlayerAttackLv + 1, PLAYER_ATTACK_LV_MAX);
						break;

					case Enemy_Item_Kind_e_ZankiUp:
						PlayerZankiNum++;
						break;

					default:
						error();
					}

					KillEnemy(enemy);
					break; // この敵(アイテム)は死亡したので、次の敵へ進む。
				}
				else // ? それ以外(敵) -> 被弾
				{
					yield* @@_PlayerDead();

					PlayerBornFrame = 1;
					break; // 被弾したので当たり判定終了
				}
			}
		}

		// ====
		// 当たり判定ここまで
		// ====

		RemoveAll(@@_Enemies, function <boolean> (<Enemy_t> enemy)
		{
			return enemy.HP == -1; // ? 死亡
		});

		RemoveAll(@@_Shots, function <boolean> (<Shot_t> shot)
		{
			return shot.AttackPoint == -1; // ? 死亡
		});

		yield 1;
	}
}

function <Enemy_t[]> GetEnemies()
{
	return @@_Enemies;
}

function <Shot_t[]> GetShots()
{
	return @@_Shots;
}

/*
	背面描画
*/
function <void> @@_DrawWall()
{
	SetColor(I3ColorToString(CreateI3Color(0, 0, 0)));
	PrintRect(FIELD_L, FIELD_T, FIELD_W, FIELD_H);
}

/*
	前面描画
*/
function <void> @@_DrawFront()
{
	SetColor(I3ColorToString(CreateI3Color(80, 60, 40)));
	PrintRect(0, 0, FIELD_L, Screen_H);
	PrintRect(0, 0, Screen_W, FIELD_T);
	PrintRect(
		0,
		FIELD_B,
		Screen_W,
		Screen_H - FIELD_B
		);
	PrintRect(
		FIELD_R,
		0,
		Screen_W - FIELD_R,
		Screen_H
		);
}

/*
	プレイヤーの被弾モーション
*/
function* <generatorForTask> @@_PlayerDead()
{
	var<generatorForTask[]> bk_effects = EjectEffects(); // エフェクト全て除去

	SetColor("#ff000040");
	PrintRect(0, 0, Screen_W, Screen_H);

	for (var<Scene_t> scene of CreateScene(20))
	{
		yield 1;
	}

	SetEffects(bk_effects); // エフェクト復元

	// 敵クリア
	//
	for (var<Enemy_t> enemy of @@_Enemies)
	{
		// アイテムは除外
		if (enemy.Kind == Enemy_Kind_e_Item)
		{
			// noop
		}
		// TODO: ボスクラスの敵も除外
		/*
		else if (
			enemy.Kind == Enemy_Kind_e_BOSS_01 ||
			enemy.Kind == Enemy_Kind_e_BOSS_02 ||
			enemy.Kind == Enemy_Kind_e_BOSS_03
			)
		{
			// noop
		}
		*/
		else
		{
			KillEnemy(enemy);
		}
	}

	// 自弾クリア
	//
	for (var<Shot_t> shot of @@_Shots)
	{
		KillShot(shot);
	}
}
