/*
	プレイヤー情報
*/

/*
	プレイヤーの位置
*/
var<double> PlayerX = FIELD_L + FIELD_W / 2;
var<double> PlayerY = FIELD_T + FIELD_H / 2;

/*
	今フレームの当たり判定, null == 当たり判定無し
*/
var<Crash_t> PlayerCrash = null;

/*
	プレイヤー再登場フレーム
	0 == 無効
	1～ == 再登場中
*/
var<int> PlayerRebornFrame = 0;

/*
	再登場中の描画位置
*/
var<double> @@_Reborn_X = -1.0;
var<double> @@_Reborn_Y = -1.0;

/*
	プレイヤー無敵時間フレーム
	0 == 無効
	1～ == 無敵時間中
*/
var<int> PlayerInvincibleFrame = 0;

/*
	攻撃レベル
	1 ～ PLAYER_ATTACK_LV_MAX
*/
var<int> PlayerAttackLv = 1;

/*
	残機
	0 ～
*/
var<int> PlayerZankiNum = 3;

function <void> ResetPlayer()
{
	PlayerX = FIELD_L + FIELD_W / 2;
	PlayerY = FIELD_T + FIELD_H / 2;
	PlayerCrash = null;
	PlayerRebornFrame = 0;
	@@_Reborn_X = -1.0;
	@@_Reborn_Y = -1.0;
	PlayerInvincibleFrame = 0;
	PlayerAttackLv = 1;
	PlayerZankiNum = 3;
}

/*
	行動
	処理すべきこと：
	-- 行動
	-- 当たり判定の設置
*/
function <void> ActPlayer()
{
	// 移動
	{
		var<double> speed;

		if (1 <= GetInput_A()) // ? 低速移動
		{
			speed = 2.5;
		}
		else // ? 高速移動
		{
			speed = 5.0;
		}

		if (1 <= GetInput_4())
		{
			PlayerX -= speed;
		}
		if (1 <= GetInput_6())
		{
			PlayerX += speed;
		}
		if (1 <= GetInput_8())
		{
			PlayerY -= speed;
		}
		if (1 <= GetInput_2())
		{
			PlayerY += speed;
		}

		PlayerX = ToRange(PlayerX, FIELD_L, FIELD_R);
		PlayerY = ToRange(PlayerY, FIELD_T, FIELD_B);
	}

rebornBlock:
	if (1 <= PlayerRebornFrame) // ? 再登場中
	{
		if (PLAYER_REBORN_FRAME_MAX < ++PlayerRebornFrame)
		{
			PlayerRebornFrame = 0;
			PlayerInvincibleFrame = 1;
			break rebornBlock;
		}
		var<int> frame = PlayerRebornFrame; // 値域 == 2 ～ PLAYER_REBORN_FRAME_MAX
		var<double> rate = RateAToB(2, PLAYER_REBORN_FRAME_MAX, PlayerRebornFrame);

		if (frame == 2) // ? 初回
		{
			@@_Reborn_X = FIELD_L + FIELD_W / 2;
			@@_Reborn_Y = FIELD_B + 100.0;
		}

		@@_Reborn_X = Approach(@@_Reborn_X, PlayerX, 1.0 - rate * rate * rate);
		@@_Reborn_Y = Approach(@@_Reborn_Y, PlayerY, 1.0 - rate * rate * rate);
	}

	// 攻撃
	//
	if (PlayerRebornFrame == 0) // ? not 再登場中
	{
		if (1 <= GetInput_B() && ProcFrame % 4 == 0)
		{
			switch (PlayerAttackLv)
			{
			case 1:
				GetShots().push(CreateShot_Normal(PlayerX, PlayerY, Math.PI * 1.5, 20.0));
				break;

			case 2:
				GetShots().push(CreateShot_Normal(PlayerX - 10 , PlayerY, Math.PI * 1.5, 20.0));
				GetShots().push(CreateShot_Normal(PlayerX + 10 , PlayerY, Math.PI * 1.5, 20.0));
				break;

			case 3:
				GetShots().push(CreateShot_Normal(PlayerX - 20 , PlayerY, Math.PI * 1.5, 20.0));
				GetShots().push(CreateShot_Normal(PlayerX      , PlayerY, Math.PI * 1.5, 20.0));
				GetShots().push(CreateShot_Normal(PlayerX + 20 , PlayerY, Math.PI * 1.5, 20.0));
				break;

			default:
				error();
			}

			SE(S_PlayerShoot);
		}
	}

	// 当たり判定をセットする。
	// -- 再登場中・無敵時間中は null (当たり判定無し) をセットすること。

	PlayerCrash = null; // reset

	if (1 <= PlayerRebornFrame) // ? 再登場中
	{
		// noop
	}
	else if (1 <= PlayerInvincibleFrame) // ? 無敵時間中
	{
		// noop
	}
	else
	{
		PlayerCrash = CreateCrash_Point(PlayerX, PlayerY);
	}
}

/*
	描画
	処理すべきこと：
	-- 描画
*/
function <void> DrawPlayer()
{
	var<double> plA = 1.0;

	if (
		1 <= PlayerDamageFrame ||
		1 <= PlayerInvincibleFrame
		)
	{
		plA = 0.5;
	}

	if (1 <= PlayerRebornFrame)
	{
		var<double> rate = PlayerRebornFrame / PLAYER_REBORN_FRAME_MAX;
		var<double> remRate = 1.0 - rate;

		Draw(P_Player, @@_Reborn_X, @@_Reborn_Y, 0.5, remRate * remRate * 30.0, 1.0);
	}
	else
	{
		Draw(P_Player, PlayerX, PlayerY, plA, 0.0, 1.0);
	}
}
