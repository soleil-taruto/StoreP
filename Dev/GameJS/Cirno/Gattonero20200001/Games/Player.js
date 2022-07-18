/*
	プレイヤー情報
*/

/*
	プレイヤーの位置
*/
var<double> PlayerX = 0.0;
var<double> PlayerY = 0.0;

/*
	プレイヤー・ダメージ・フレーム
	0 == 無効
	1〜 == ダメージ中
*/
var<int> PlayerDamageFrame = 0;

/*
	プレイヤー無敵時間フレーム
	0 == 無効
	1〜 == 無敵時間中
*/
var<int> PlayerInvincibleFrame = 0;

/*
	プレイヤーの垂直方向の速度
*/
var<double> PlayerYSpeed = 0.0;

/*
	プレイヤーが左を向いているか
*/
var<boolean> PlayerFacingLeft = false;

/*
	今フレームの当たり判定, null == 当たり判定無し
*/
var<Crash_t> PlayerCrash = null;

/*
	プレイヤー移動フレーム
	0 == 無効
	1〜 == 移動中
*/
var<int> PlayerMoveFrame = 0;

/*
	プレイヤー・ジャンプ・カウンタ
	0 == 無効
	1〜 == ジャンプｎ回目
*/
var<int> PlayerJumpCount = 0;

/*
	プレイヤー・ジャンプ・フレーム
	0 == 無効
	1〜 == ジャンプ中
*/
var<int> PlayerJumpFrame = 0;

/*
	プレイヤー滞空フレーム
	0 == 無効
	1〜 == 滞空中
*/
var<int> PlayerAirborneFrame = 0;

/*
	プレイヤーしゃがみフレーム
	0 == 無効
	1〜 == しゃがみ中
*/
var<int> PlayerShagamiFrame = 0;

/*
	プレイヤー攻撃フレーム
	0 == 無効
	1〜 == 攻撃中
*/
var<int> PlayerAttackFrame = 0;

/*
	プレイヤー攻撃モーション
	-- 攻撃(Attack)と言っても攻撃以外の利用(スライディング・梯子など)も想定する。
	null == 無効
	null != PlayerAttack.next().value を DrawPlayer の代わりに実行される。
*/
var<generatorForTask> PlayerAttack = null;

var<boolean> @@_JumpLock = false;
var<boolean> @@_MoveSlow = false;

function <void> ResetPlayer()
{
	PlayerX = Screen_W / 2.0;
	PlayerY = Screen_H / 2.0;
	PlayerDamageFrame = 0;
	PlayerInvincibleFrame = 0;
	PlayerYSpeed = 0.0;
	PlayerFacingLeft = false;
	PlayerCrash = null;
	PlayerMoveFrame = 0;
	PlayerJumpCount = 0;
	PlayerJumpFrame = 0;
	PlayerAirborneFrame = IMAX / 2; // ゲーム開始直後に空中でジャンプできないように
	PlayerShagamiFrame = 0;
	PlayerAttackFrame = 0;
	PlayerAttack = null;
	@@_JumpLock = false;
	@@_MoveSlow = false;
}

/*
	行動と描画
	処理すべきこと：
	-- 行動
	-- 当たり判定の設置
	-- 描画
*/
function <void> DrawPlayer()
{
	// reset
	{
		PlayerCrash = null;
	}

	// 移動
	{
		var<boolean> move = false;
		var<boolean> slow = false;
		var<boolean> attack = false;
		var<boolean> shagami = false;
		var<int> jump = 0;

		if (1 <= GetInput_2())
		{
			shagami = true;
		}
		if (1 <= GetInput_4())
		{
			PlayerFacingLeft = true;
			move = true;
		}
		if (1 <= GetInput_6())
		{
			PlayerFacingLeft = false;
			move = true;
		}

		if (1 <= GetInput_B())
		{
//			slow = true;
			attack = true;
		}
		if (1 <= GetInput_A())
		{
			jump = GetInput_A();
		}

		if (move)
		{
			PlayerMoveFrame++;
			shagami = false;
		}
		else
		{
			PlayerMoveFrame = 0;
		}

		@@_MoveSlow = move && slow;

		if (jump == 0)
		{
			@@_JumpLock = false;
		}

		if (1 <= PlayerJumpFrame) // ? ジャンプ中
		{
			var<int> JUMP_FRAME_MAX = 13;

			if (1 <= jump && PlayerJumpFrame < JUMP_FRAME_MAX)
			{
				PlayerJumpFrame++;
			}
			else
			{
				PlayerJumpFrame = 0;
			}
		}
		else // ? 接地中 || 滞空中
		{
			// 事前入力 == 着地前の数フレーム間にジャンプボタンを押し始めてもジャンプできるようにする。
			// 入力猶予 == 落下(地面から離れた)直後の数フレーム間にジャンプボタンを押し始めてもジャンプできるようにする。

			var<int> 事前入力時間 = 10;
			var<int> 入力猶予時間 = 5;

			if (1 <= jump && jump < 事前入力時間 && PlayerAirborneFrame < 入力猶予時間 && PlayerJumpCount == 0 && !@@_JumpLock)
			{
				PlayerJumpCount = 1;
				PlayerJumpFrame = 1;
				@@_JumpLock = true;
			}
		}

		if (PlayerJumpFrame == 1) // ? ジャンプ開始
		{
			SE(S_Jump);
		}

		if (1 <= PlayerAirborneFrame)
		{
			shagami = false;
		}

		if (shagami)
		{
			PlayerShagamiFrame++;
		}
		else
		{
			PlayerShagamiFrame = 0;
		}

		if (attack)
		{
			PlayerAttackFrame++;
		}
		else
		{
			PlayerAttackFrame = 0;
		}

	damageBlock:
		if (1 <= PlayerDamageFrame) // ? ダメージ中
		{
			if (PLAYER_DAMAGE_FRAME_MAX < ++PlayerDamageFrame)
			{
				PlayerDamageFrame = 0;
				PlayerInvincibleFrame = 1;
				break damageBlock;
			}
			var<int> frame = PlayerDamageFrame; // 値域 == 2 〜 PLAYER_DAMAGE_FRAME_MAX
			double rate = RateAToB(2, PLAYER_DAMAGE_FRAME_MAX, frame);

			// ダメージ中の処理
			{
				// TODO
			}
		}

	invincibleBlock:
		if (1 <= PlayerInvincibleFrame) // ? 無敵時間中
		{
			if (PLAYER_INVINCIBLE_FRAME_MAX < ++PlayerInvincibleFrame)
			{
				PlayerInvincibleFrame = 0;
				break invincibleBlock;
			}
			var<int> frame = PlayerInvincibleFrame; // 値域 == 2 〜 PLAYER_INVINCIBLE_FRAME_MAX
			double rate = RateAToB(2, PLAYER_INVINCIBLE_FRAME_MAX, frame);

			// 無適時間中の処理
			{
				// none
			}
		}

		if (1 <= PlayerMoveFrame) // ? 移動中
		{
			var<double> speed = 0.0;

			if (@@_MoveSlow)
			{
				speed = PlayerMoveFrame * 0.2;
				speed = Math.min(speed, PLAYER_SLOW_SPEED);
			}
			else
			{
				speed = PLAYER_SPEED;
			}
			speed *= PlayerFacingLeft ? -1.0 : 1.0;

			PlayerX += speed;
		}
		else
		{
			PlayerX = ToInt(PlayerX);
		}

		if (1 <= PlayerJumpFrame)
		{
			PlayerYSpeed = PLAYER_JUMP_SPEED;
		}
		else
		{
			PlayerYSpeed += PLAYER_GRAVITY;
			PlayerYSpeed = Math.min(PlayerYSpeed, PLAYER_FALL_SPEED_MAX);
		}

		PlayerY += PlayerYSpeed;
	}

	// 位置矯正
	{
		var<boolean> touchSide_L =
			GetMapCell(ToTablePoint_XY(PlayerX - PLAYER_側面判定Pt_X, PlayerY - PLAYER_側面判定Pt_YT )).WallFlag ||
			GetMapCell(ToTablePoint_XY(PlayerX - PLAYER_側面判定Pt_X, PlayerY                        )).WallFlag ||
			GetMapCell(ToTablePoint_XY(PlayerX - PLAYER_側面判定Pt_X, PlayerY + PLAYER_側面判定Pt_YB )).WallFlag;

		var<boolean> touchSide_R =
			GetMapCell(ToTablePoint_XY(PlayerX + PLAYER_側面判定Pt_X, PlayerY - PLAYER_側面判定Pt_YT )).WallFlag ||
			GetMapCell(ToTablePoint_XY(PlayerX + PLAYER_側面判定Pt_X, PlayerY                        )).WallFlag ||
			GetMapCell(ToTablePoint_XY(PlayerX + PLAYER_側面判定Pt_X, PlayerY + PLAYER_側面判定Pt_YB )).WallFlag;

		if (touchSide_L && touchSide_R) // -> 壁抜け防止のため再チェック
		{
			touchSide_L = GetMapCell(ToTablePoint_XY(PlayerX - PLAYER_側面判定Pt_X, PlayerY)).WallFlag;
			touchSide_R = GetMapCell(ToTablePoint_XY(PlayerX + PLAYER_側面判定Pt_X, PlayerY)).WallFlag;
		}

		if (touchSide_L && touchSide_R)
		{
			// noop
		}
		else if (touchSide_L)
		{
			PlayerX = ToTileCenterX(PlayerX - PLAYER_側面判定Pt_X) + TILE_W / 2.0 + PLAYER_側面判定Pt_X;
		}
		else if (touchSide_R)
		{
			PlayerX = ToTileCenterX(PlayerX + PLAYER_側面判定Pt_X) - TILE_W / 2.0 - PLAYER_側面判定Pt_X;
		}

		var<boolean> touchCeiling_L = GetMapCell(ToTablePoint_XY(PlayerX - PLAYER_脳天判定Pt_X , PlayerY - PLAYER_脳天判定Pt_Y)).WallFlag;
		var<boolean> touchCeiling_M = GetMapCell(ToTablePoint_XY(PlayerX                       , PlayerY - PLAYER_脳天判定Pt_Y)).WallFlag;
		var<boolean> touchCeiling_R = GetMapCell(ToTablePoint_XY(PlayerX + PLAYER_脳天判定Pt_X , PlayerY - PLAYER_脳天判定Pt_Y)).WallFlag;

		if ((touchCeiling_L && touchCeiling_R) || touchCeiling_M)
		{
			if (PlayerYSpeed < 0.0)
			{
				// プレイヤーと天井の反発係数
				//
//				var<double> K = 1.0;
				var<double> K = 0.0;

				PlayerY = ToTileCenterY(PlayerY - PLAYER_脳天判定Pt_Y) + TILE_H / 2 + PLAYER_脳天判定Pt_Y;
				PlayerYSpeed = Math.abs(PlayerYSpeed) * K;
				PlayerJumpFrame = 0;
			}
		}
		else if (touchCeiling_L)
		{
			PlayerX = ToTileCenterX(PlayerX - PLAYER_脳天判定Pt_X) + TILE_W / 2.0 + PLAYER_脳天判定Pt_X;
		}
		else if (touchCeiling_R)
		{
			PlayerX = ToTileCenterX(PlayerX + PLAYER_脳天判定Pt_X) - TILE_W / 2.0 - PLAYER_脳天判定Pt_X;
		}

		var<boolean> touchGround =
			GetMapCell(ToTablePoint_XY(PlayerX - PLAYER_接地判定Pt_X, PlayerY + PLAYER_接地判定Pt_Y)).WallFlag ||
			GetMapCell(ToTablePoint_XY(PlayerX + PLAYER_接地判定Pt_X, PlayerY + PLAYER_接地判定Pt_Y)).WallFlag;

		// memo: @ 2022.7.11
		// 上昇中(ジャンプ中)に接地判定が発生することがある。
		// 接地中は重力により PlayerYSpeed がプラスに振れる。
		// -> 接地による位置等の調整は PlayerYSpeed がプラスに触れている場合のみ行う。

		if (touchGround && 0.0 < PlayerYSpeed)
		{
			PlayerY = ToTileCenterY(PlayerY + PLAYER_接地判定Pt_Y) - TILE_H / 2.0 - PLAYER_接地判定Pt_Y;
			PlayerYSpeed = 0.0;
			PlayerJumpCount = 0;
			PlayerAirborneFrame = 0;
		}
		else
		{
			PlayerAirborneFrame++;
		}
	}

	// プレイヤーの当たり判定をセットする。
	// -- アイテムを取得したりすることを考慮して、ダメージ中・無敵時間中でも当たり判定は生成する。

	PlayerCrash = CreateCrash_Rect(CreateD4Rect_XYWH(
		PlayerX,
		PlayerY,
		TILE_W,
		TILE_H
		));

	Draw(P_Player, PlayerX, PlayerY, 1.0, 0.0, 1.0);
}
