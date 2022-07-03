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
	再登場フレーム・最大値
*/
var<int> PLAYER_BORN_FRAME_MAX = 30;

/*
	再登場フレーム
	-- 再登場を開始するには 1 をセットすること。
	0 == 無効
	1 ～ PLAYER_BORN_FRAME_MAX == 再登場中
*/
var<int> PlayerBornFrame = 0;

/*
	再登場中の描画位置
*/
var<double> @@_Born_X;
var<double> @@_Born_Y;

/*
	行動と描画
	処理すべきこと：
	-- 行動
	-- 当たり判定の設置
	-- 描画
*/
function <void> DrawPlayer()
{
	if (1 <= PlayerBornFrame) // ? 再登場中
	{
		var<double> rate = PlayerBornFrame / PLAYER_BORN_FRAME_MAX;
		var<double> remRate = 1.0 - rate;

		if (PlayerBornFrame == 1) // ? 初回
		{
			@@_Born_X = FIELD_L + FIELD_W / 2;
			@@_Born_Y = FIELD_B + 100.0;
		}

		@@_Born_X = Approach(@@_Born_X, PlayerX, remRate);
		@@_Born_Y = Approach(@@_Born_Y, PlayerY, remRate);

		PlayerCrash = null; // 当たり判定無し。

		Draw(P_Player, @@_Born_X, @@_Born_Y, 1.0, remRate * remRate * 10.0, 1.0);

		if (PlayerBornFrame < PLAYER_BORN_FRAME_MAX)
		{
			PlayerBornFrame++;
		}
		else
		{
			PlayerBornFrame = 0;
		}
		return;
	}

	// 移動
	{
		var<double> SPEED;

		if (1 <= GetInput_A()) // ? 低速移動
		{
			SPEED = 1.0;
		}
		else // ? 高速移動
		{
			SPEED = 5.0;
		}

		if (1 <= GetInput_2())
		{
			PlayerY += SPEED;
		}
		if (1 <= GetInput_4())
		{
			PlayerX -= SPEED;
		}
		if (1 <= GetInput_6())
		{
			PlayerX += SPEED;
		}
		if (1 <= GetInput_8())
		{
			PlayerY -= SPEED;
		}

		PlayerX = ToRange(PlayerX, FIELD_L, FIELD_R);
		PlayerY = ToRange(PlayerY, FIELD_T, FIELD_B);
	}

	if (1 <= GetInput_B() && ProcFrame % 4 == 0) // 攻撃
	{
		GetShots().push(CreateShot_Normal(PlayerX, PlayerY, Math.PI * 1.5, 20.0));
	}

	PlayerCrash = CreateCrash_Point(PlayerX, PlayerY);

	Draw(P_Player, PlayerX, PlayerY, 1.0, 0.0, 1.0);
}
