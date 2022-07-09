/*
	プレイヤー情報
*/

/*
	プレイヤーの位置
*/
var<double> PlayerX = FIELD_L + FIELD_W / 2;
var<double> PlayerY = FIELD_T + FIELD_H / 2;

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
	1～ == 移動中
*/
var<int> PlayerMoveFrame = 0;

/*
	プレイヤー・ジャンプ・カウンタ
	0 == 無効
	1～ == ジャンプｎ回目
*/
var<int> PlayerJumpCount = 0;

/*
	プレイヤー・ジャンプ・フレーム
	0 == 無効
	1～ == ジャンプ中
*/
var<int> PlayerJumpFrame = 0;

/*
	プレイヤー滞空フレーム
	0 == 無効
	1～ == 滞空中
*/
var<int> PlayerAirborneFrame = 0;

var<boolean> @@_JumpLock = false;
var<boolean> @@_MoveSlow = false;

/*
	行動と描画
	処理すべきこと：
	-- 行動
	-- 当たり判定の設置
	-- 描画
*/
function <void> DrawPlayer()
{
	// 移動
	{
		var<boolean> move = false;
		var<boolean> slow = false;
		var<int> jump = 0;

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
			slow = true;
		}
		if (1 <= GetInput_A())
		{
			jump = GetInput_A();
		}

		if (move)
		{
			PlayerMoveFrame++;
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
			// TODO: SE
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
		}

		PlayerYSpeed = Math.min(PlayerYSpeed, PLAYER_FALL_SPEED_MAX);

		PlayerY += PlayerYSpeed;
	}

	// 位置矯正
	{
		var<boolean> touchSide_L =
			GetMapCell(ToTablePoint_XY(PlayerX - PLAYER_側面判定Pt_X, PlayerY - PLAYER_側面判定Pt_Y )).WallFlag ||
			GetMapCell(ToTablePoint_XY(PlayerX - PLAYER_側面判定Pt_X, PlayerY                       )).WallFlag ||
			GetMapCell(ToTablePoint_XY(PlayerX - PLAYER_側面判定Pt_X, PlayerY + PLAYER_側面判定Pt_Y )).WallFlag;

		var<boolean> touchSide_R =
			GetMapCell(ToTablePoint_XY(PlayerX + PLAYER_側面判定Pt_X, PlayerY - PLAYER_側面判定Pt_Y )).WallFlag ||
			GetMapCell(ToTablePoint_XY(PlayerX + PLAYER_側面判定Pt_X, PlayerY                       )).WallFlag ||
			GetMapCell(ToTablePoint_XY(PlayerX + PLAYER_側面判定Pt_X, PlayerY + PLAYER_側面判定Pt_Y )).WallFlag;

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
			PlayerX = ToInt(PlayerX / TILE_W) * TILE_W + PLAYER_側面判定Pt_X;
		}
		else if (touchSide_R)
		{
			PlayerX = ToInt(PlayerX / TILE_W) * TILE_W - PLAYER_側面判定Pt_X;
		}

		var<boolean> touchCeiling_L =
			GetMapCell(ToTablePoint_XY(PlayerX - PLAYER_脳天判定Pt_X, PlayerY - PLAYER_脳天判定Pt_Y)).WallFlag;

		var<boolean> touchCeiling_R =
			GetMapCell(ToTablePoint_XY(PlayerX + PLAYER_脳天判定Pt_X, PlayerY - PLAYER_脳天判定Pt_Y)).WallFlag;

		if (touchCeiling_L && touchCeiling_R)
		{
			if (PlayerYSpeed < 0.0)
			{
				var<double> plY = (ToFix((PlayerY - PLAYER_脳天判定Pt_Y) / TILE_H) + 1) * TILE_H + PLAYER_脳天判定Pt_Y;

				PlayerY = plY;
				PlayerYSpeed = 0.0;
				PlayerJumpFrame = 0;
			}
		}
		else if (touchCeiling_L)
		{
			PlayerX = ToInt(PlayerX / TILE_W) * TILE_W + PLAYER_脳天判定Pt_X;
		}
		else if (touchCeiling_R)
		{
			PlayerX = ToInt(PlayerX / TILE_W) * TILE_W - PLAYER_脳天判定Pt_X;
		}

		var<boolean> touchGround =
			GetMapCell(ToTablePoint_XY(PlayerX - PLAYER_接地判定Pt_X, PlayerY + PLAYER_接地判定Pt_Y)).WallFlag ||
			GetMapCell(ToTablePoint_XY(PlayerX + PLAYER_接地判定Pt_X, PlayerY + PLAYER_接地判定Pt_Y)).WallFlag;

		if (touchGround)
		{
			if (0.0 < PlayerYSpeed)
			{
				var<double> plY = ToFix((PlayerY + PLAYER_接地判定Pt_Y) / TILE_H) * TILE_H - PLAYER_接地判定Pt_Y;

				PlayerY = plY;
				PlayerYSpeed = 0.0;
			}
		}

		if (touchGround)
		{
			PlayerJumpCount = 0;
			PlayerAirborneFrame = 0;
		}
		else
		{
			PlayerAirborneFrame++;
		}
	}

	PlayerCrash = CreateCrash_Circle(PlayerX, PlayerY, MICRO);

	Draw(P_Player, FIELD_L + PlayerX, FIELD_T + PlayerY, 1.0, 0.0, 1.0);
}
