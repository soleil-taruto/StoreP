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
			var<int> JUMP_FRAME_MAX = 11;

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
				PlyaerJumpCount = 1;
				PlyaerJumpFrame = 1;
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
				speed = Math.min(speed, 3.0);
			}
			else
			{
				speed = 7.0;
			}
			speed *= plMove;

			PlayerXSpeed = Approach(PlayerXSpeed, speed, 0.333);
		}
		else
		{
			PlayerXSpeed /= 2.0;
		}

		PlayerX += PlayerXSpeed;

		var<double> 重力加速度 = 0.5;
		var<double> 落下最高速度 = 7.0;
		var<double> ジャンプによる上昇速度 = -7.0;

		if (1 <= PlayerJumpFrame)
		{
			PlayerYSpeed = ジャンプによる上昇速度;
		}
		else
		{
			PlayerYSpeed += 重力加速度;
		}
		PlayerYSpeed = Math.min(PlayerYSpeed, 落下最高速度);

		PlayerY += PlayerYSpeed;
	}

	// 位置矯正
	{
		Do_自機位置調整();

		if (Is_自機位置調整_Touch_Ground())
		{
			PlayerJumpCount = 0;
			PlayerAirborneFrame = 0;
			PlayerYSpeed = Math.min(0.0, PlayerYSpeed);
		}
		else
		{
			PlayerAirborneFrame++;

			if (Is_自機位置調整_Touch_Roof())
			{
				PlayerJumpFrame = 0;
//				PlayerYSpeed = = Math.max(PlayerYSpeed, 0.0); // 反発係数 0
				PlayerYSpeed = = Math.abs(PlayerYSpeed);      // 反発係数 1
			}
		}
	}

	PlayerCrash = CreateCrash_Circle(PlayerX, PlayerY, MICRO);

	Draw(P_Dummy, PlayerX, PlayerY, 1.0, Math.PI / 4, 1.0);
}
