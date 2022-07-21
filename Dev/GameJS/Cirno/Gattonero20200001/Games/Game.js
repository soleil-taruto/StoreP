/*
	ゲーム・メイン
*/

// 敵リスト
var<Enemy_t[]> @@_Enemies = [];

// 自弾リスト
var<Shot_t[]> @@_Shots = [];

// カメラ位置
var<D2Point_t> Camera = CreateD2Point(0.0, 0.0);

/*
	ゲーム終了理由
*/
var<GameEndReason_e> GameEndReason = GameEndReason_e_STAGE_CLEAR;

/*
	ゲーム終了リクエスト
*/
var<boolean> GameRequestReturnToTitleMenu = false;

function* <generatorForTask> GameMain(<int> mapIndex)
{
	var<Func boolean> f_ゴミ回収 = Supplier(@@_T_ゴミ回収());

	// reset
	{
		@@_Enemies = [];
		@@_Shots = [];

		Camera = CreateD2Point(0.0, 0.0);
		GameEndReason = GameEndReason_e_STAGE_CLEAR;
		GameRequestReturnToTitleMenu = false;

		ResetPlayer();
	}

	LoadMap(mapIndex);

	{
		var<D2Point_t> pt = GetStartPtOfMap();

		PlayerX = pt.X;
		PlayerY = pt.Y;
	}

	SetCurtain();
	FreezeInput();

	yield* @@_StartMotion();

	Play(M_Field);

	@@_カメラ位置調整(true);

gameLoop:
	for (; ; )
	{
		if (GetInput_Pause() == 1) // ポーズ
		{
			yield* @@_PauseMenu();
		}
		if (GameRequestReturnToTitleMenu)
		{
			GameEndReason = GameEndReason_e_RETURN_MENU;
			break;
		}

		@@_カメラ位置調整(false);

		// ====
		// 描画ここから
		// ====

		@@_DrawWall();

		if (PlayerAttack != null && PlayerAttack()) // ? プレイヤー攻撃中
		{
			// noop
		}
		else
		{
			DrawPlayer(); // プレイヤーの描画
		}

		// 敵の描画
		//
		for (var<int> index = 0; index < @@_Enemies.length; index++)
		{
			var<Enemy_t> enemy = @@_Enemies[index];

			if (enemy.HP == -1) // ? 既に死亡
			{
				continue;
			}

			enemy.Crash = null; // reset

			if (!DrawEnemy(enemy))
			{
				enemy.HP = -1;
			}
		}

		// 自弾の描画
		//
		for (var<int> index = 0; index < @@_Shots.length; index++)
		{
			var<Shot_t> shot = @@_Shots[index];

			if (shot.AttackPoint == -1) // ? 既に死亡
			{
				continue;
			}

			shot.Crash = null; // reset

			if (!DrawShot(shot))
			{
				shot.AttackPoint = -1;
			}
		}

		@@_DrawFront();

		if (DEBUG && 1 <= GetKeyInput(17)) // ? コントロール押下中 -> 当たり判定表示 (デバッグ用)
		{
			var<double> dPlX = PlayerX - Camera.X;
			var<double> dPlY = PlayerY - Camera.Y;

			SetColor("#000000a0");
			PrintRect(0, 0, Screen_W, Screen_H);
			SetColor("#00ff0030");
			PrintRect_LTRB(
				dPlX - PLAYER_側面判定Pt_X,
				dPlY - PLAYER_側面判定Pt_YT,
				dPlX + PLAYER_側面判定Pt_X,
				dPlY + PLAYER_側面判定Pt_YB
				);
			PrintRect_LTRB(
				dPlX - PLAYER_脳天判定Pt_X,
				dPlY - PLAYER_脳天判定Pt_Y,
				dPlX + PLAYER_脳天判定Pt_X,
				dPlY
				);
			PrintRect_LTRB(
				dPlX - PLAYER_接地判定Pt_X,
				dPlY,
				dPlX + PLAYER_接地判定Pt_X,
				dPlY + PLAYER_接地判定Pt_Y
				);
			SetColor("#ff0000a0");
			DrawCrash(PlayerCrash);
			SetColor("#ffffffa0");

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

					EnemyDamaged(enemy, damagePoint);

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
				if (enemy.Kind == Enemy_Kind_e_Goal) // ? ゴール到達 -> 次のステージへ
				{
//					yield* @@_GoalMotion();

//					break gameLoop;
				}
				else
				{
					yield* @@_DeadAndRestartMotion();

					continue gameLoop;
				}
			}
		}

		// ====
		// 当たり判定ここまで
		// ====

		f_ゴミ回収();

		RemoveAll(@@_Enemies, function <boolean> (<Enemy_t> enemy)
		{
			return enemy.HP == -1; // ? 死亡
		});

		RemoveAll(@@_Shots, function <boolean> (<Shot_t> shot)
		{
			return shot.AttackPoint == -1; // ? 死亡
		});

		yield 1;

		// ★★★ ゲームループの終わり ★★★
	}

	SetCurtain_FD(30, -1.0);
//	Fadeout();

	for (var<Scene_t> scene of CreateScene(40))
	{
		@@_DrawWall();
		@@_DrawFront();

		yield 1;
	}

	ClearAllEffect(); // 時限消滅ではないエフェクトを考慮して、クリアは必須とする。
	FreezeInput();

	// ★★★ end of GameMain() ★★★
}

function <void> @@_カメラ位置調整(<boolean> 一瞬で)
{
	var<double> targCamX = PlayerX - Screen_W / 2;
	var<double> targCamY = PlayerY - Screen_H / 2;

	targCamX = ToRange(targCamX, 0.0, TILE_W * Map.W - Screen_W);
	targCamY = ToRange(targCamY, 0.0, TILE_H * Map.H - Screen_H);

	Camera.X = Approach(Camera.X, targCamX, 一瞬で ? 0.0 : 0.8);
	Camera.Y = Approach(Camera.Y, targCamY, 一瞬で ? 0.0 : 0.8);
}

function* <generatorForTask> @@_T_ゴミ回収()
{
	for (; ; )
	{
		for (var<int> index = 0; index < @@_Enemies.length; index++)
		{
			var<Enemy_t> enemy = @@_Enemies[index];

			if (@@_IsProbablyEvacuated(enemy.X, enemy.Y))
			{
				enemy.HP = -1;
			}

			yield 1;
		}

		for (var<int> index = 0; index < @@_Shots.length; index++)
		{
			var<Shot_t> shot = @@_Shots[index];

			if (@@_IsProbablyEvacuated(shot.X, shot.Y))
			{
				shot.AttackPoint = -1;
			}

			yield 1;
		}

		yield 1; // @@_Enemies, @@_Shots が空の場合、ループ内の yield は実行されないので、ここにも yield を設置しておく。
	}
}

function <boolean> @@_IsProbablyEvacuated(<double> x, <double> y)
{
	var<int> MGN_SCREEN_NUM = 3;

	var<boolean> ret = IsOut(
		CreateD2Point(x, y),
		CreateD4Rect_LTRB(
			-Screen_W * MGN_SCREEN_NUM,
			-Screen_H * MGN_SCREEN_NUM,
			TILE_W * Map.W + Screen_W * MGN_SCREEN_NUM,
			TILE_H * Map.H + Screen_H * MGN_SCREEN_NUM
			),
		0.0
		);

	return ret;
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
	PrintRect(0.0, 0.0, Screen_W, Screen_H);

	// TODO: 背景

	var<I2Point_t> lt = ToTablePoint(Camera);
	var<I2Point_t> rb = ToTablePoint_XY(Camera.X + Screen_W, Camera.Y + Screen_H);
	var<int> l = lt.X;
	var<int> t = lt.Y;
	var<int> r = rb.X;
	var<int> b = rb.Y;

	// マージン付与
	{
		var<int> MARGIN = 2; // マージン・セル数

		l -= MARGIN;
		t -= MARGIN;
		r += MARGIN;
		b += MARGIN;
	}

	for (var<int> x = l; x <= r; x++)
	for (var<int> y = t; y <= b; y++)
	{
		var<MapCell_t> cell = GetMapCell_XY(x, y);
		var<Tile_t> tile = cell.Tile;

		var<D2Point> dPt = ToFieldPoint_XY(x, y);
		var<double> dx = dPt.X;
		var<double> dy = dPt.Y;

		DrawTile(tile, dx - Camera.X, dy - Camera.Y);
	}
}

/*
	前面描画
*/
function <void> @@_DrawFront()
{
	SetColor(I4ColorToString(CreateI4Color(0, 0, 0, 128)));
	PrintRect(0.0, 0.0, Screen_W, 20.0);
}

/*
	ゲーム開始モーション
*/
function* <generatorForTask> @@_StartMotion()
{
	for (var<Scene_t> scene of CreateScene(40))
	{
		@@_DrawWall();

		// TODO ???

		@@_DrawFront();

		yield 1;
	}
}

/*
	死亡＆再スタート・モーション
*/
function* <generatorForTask> @@_DeadAndRestartMotion()
{
	SetColor("#ff000040");
	PrintRect(0, 0, Screen_W, Screen_H);

	SE(S_Crashed);

	for (var<Scene_t> scene of CreateScene(30))
	{
		yield 1;
	}

	AddEffect_Explode(PlayerX, PlayerY);
	SE(S_Dead);

	// リスタートのための処理
	{
		@@_Enemies = [];
		@@_Shots = [];

		ResetPlayer();

		LoadEnemyOfMap();

		{
			var<D2Point_t> pt = GetStartPtOfMap();

			PlayerX = pt.X;
			PlayerY = pt.Y;
		}
	}

	yield* @@_StartMotion();
}

/*
	ゲーム終了モーション
	-- ゴールした。
*/
function* <generatorForTask> @@_GoalMotion()
{
	for (var<Scene_t> scene of CreateScene(30))
	{
		yield 1;
	}

	for (var<Scene_t> scene of CreateScene(40))
	{
		@@_DrawWall();

		// TODO ???

		@@_DrawFront();

		yield 1;
	}
}
