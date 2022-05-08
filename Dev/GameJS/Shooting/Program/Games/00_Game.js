/*
	ゲーム・メイン
*/

function* <generatorForTask> GameMain()
{
	// Reset
	{
		Player_X = ToInt(@@_Field_W / 2);
		Player_Y = ToInt(@@_Field_H / 2);

		Enemies = [];
		Shots = [];
		Tamas = [];
	}

	ClearMouseDown();

	Play(M_Field);

	for (; ; )
	{
		@@_自機移動();

		// 1フレーム前の当たり判定を適用する。
		if (@@_Crashed_自機と敵)
		{
			yield* @@_E_死亡とリスポーン();
		}
		@@_当たり判定(); // このフレームの当たり判定を行う。

		if (1 <= GetMouseDown() && ProcFrame % 4 == 0)
		{
			Shots.push(CreateShot(Player_X + 30, Player_Y));
		}
		if (GetRand(100) == 0)
		{
			Enemies.push(CreateEnemy(GetField_W() + 100, GetRand(GetField_H())));
		}

		// 描画ここから

		@@_Draw背景();
		@@_DrawPlayer();
		@@_DrawEnemies();
		@@_DrawShots();
		@@_DrawTamas();
		@@_Draw外枠();
		@@_DrawScore();

		yield 1;
	}
	ClearMouseDown();
}

var<int> @@_Field_L;
var<int> @@_Field_T;
var<int> @@_Field_W = 900;
var<int> @@_Field_H = 500;

function @(UNQN)_INIT()
{
	@@_Field_L = ToInt((Screen_W - @@_Field_W) / 2);
	@@_Field_T = ToInt((Screen_H - @@_Field_H) / 2);
}

function <int> GetField_L()
{
	return @@_Field_L;
}

function <int> GetField_T()
{
	return @@_Field_T;
}

function <int> GetField_W()
{
	return @@_Field_W;
}

function <int> GetField_H()
{
	return @@_Field_H;
}

function <void> @@_Draw背景()
{
	int bx = 54 - (ProcFrame * 7) % 108;
	int by = 54;

	for (var<int> x = bx; x < GetField_W() + 54; x += 108)
	for (var<int> y = by; y < GetField_H() + 54; y += 108)
	{
		Draw(P_Wall_0002, GetField_L() + x, GetField_T() + y, 1.0, 0.0, 1.0);
	}
}

function <void> @@_DrawPlayer()
{
	DrawPlayer();
}

function <void> @@_DrawEnemies()
{
	Enemies = Enemies.filter(function(enemy)
	{
		return Enemy_Each(enemy);
	});
}

function <void> @@_DrawShots()
{
	Shots = Shots.filter(function(shot)
	{
		return Shot_Each(shot);
	});
}

function <void> @@_DrawTamas()
{
	Tamas = Tamas.filter(function(tama)
	{
		return Tama_Each(tama);
	});
}

function <void> @@_Draw外枠()
{
	SetColor("#004080");
	PrintRect(0, 0, @@_Field_L, Screen_H);
	PrintRect(0, 0, Screen_W, @@_Field_T);
	PrintRect(
		@@_Field_L + @@_Field_W,
		0,
		Screen_W - (@@_Field_L + @@_Field_W),
		Screen_H
		);
	PrintRect(
		0,
		@@_Field_T + @@_Field_H,
		Screen_W,
		Screen_H - (@@_Field_T + @@_Field_H)
		);
}

// ゲームのスコア
var<int> Score = 0;
var<int> DispScore = 0; // 表示用 (Scoreを追尾する)

function <void> @@_DrawScore()
{
	// 表示用スコアの追尾
	if (Math.abs(Score - DispScore) < 30)
	{
		if (DispScore < Score)
		{
			DispScore++;
		}
		else if (Score < DispScore)
		{
			DispScore--;
		}
	}
	else
	{
		DispScore = ToInt(Approach(DispScore, Score, 0.7));
	}

	// スコア表示
	SetPrint(30, 16, 0);
	SetColor("#ffffff");
	SetFSize(16);
	PrintLine("Score: " + DispScore);
}

function <void> @@_自機移動()
{
	Player_X = GetMouseX() - @@_Field_L;
	Player_Y = GetMouseY() - @@_Field_T;
	Player_X = ToRange(Player_X, 0, @@_Field_W);
	Player_Y = ToRange(Player_Y, 0, @@_Field_H);
	Player_X = ToInt(Player_X);
	Player_Y = ToInt(Player_Y);
}

var<boolean> @@_Crashed_自機と敵 = false;

function <void> @@_当たり判定()
{
	// Reset
	{
		@@_Crashed_自機と敵 = false;

		for (var<Enemy_t> enemy of Enemies)
		{
			enemy.Crashed = false;
		}
		for (var<Shot_t> shot of Shots)
		{
			shot.Crashed = false;
		}
	}

	// 自機と敵
	{
		var<boolean> crashed = false;

		for (var<Enemy_t> enemy of Enemies)
		{
			var<double> d = GetDistance(enemy.X - Player_X, enemy.Y - Player_Y);

			if (d < 75)
			{
				crashed = true;
			}
		}
		for (var<Tama_t> tama of Tamas)
		{
			var<double> d = GetDistance(tama.X - Player_X, tama.Y - Player_Y);

			if (d < 45)
			{
				crashed = true;
			}
		}

		if (crashed)
		{
			@@_Crashed_自機と敵 = true;
		}
	}

	// 自弾と敵
	{
		for (var<Enemy_t> enemy of Enemies)
		for (var<Shot_t> shot of Shots)
		{
			var<double> d = GetDistance(enemy.X - shot.X, enemy.Y - shot.Y);

			if (d < 75)
			{
				enemy.Crashed = true;
				shot.Crashed = true;
			}
		}
	}
}

function* <generatorForTask> @@_E_死亡とリスポーン()
{
	SetColor("#ff000040");
	PrintRect(0, 0, Screen_W, Screen_H);

	for (var<int> c = 0; c < 30; c++)
	{
		yield 1;
	}

	AddCommonEffect(Effect_PlayerDead(GetField_L() + Player_X, GetField_T() + Player_Y));

	for (var<Enemy_t> enemy of Enemies)
	{
		AddCommonEffect(Effect_Explode(GetField_L() + enemy.X, GetField_T() + enemy.Y));
	}

	// スコア調整
	Score = ToInt(Score / 2);

	var<double> x = -100.0;
	var<double> y = GetField_T() + GetField_H() / 2;

	for (var<int> c = 0; c < 30; c++)
	{
		var<double> rate = (double)c / 30;

		@@_自機移動();

		x = Approach(x, Player_X, 0.9 - rate * rate * 0.6);
		y = Approach(y, Player_Y, 0.9 - rate * rate * 0.6);

		@@_Draw背景();

		Draw(P_Player, GetField_L() + x, GetField_T() + y, 1.0, 0.0, 1.0); // 登場中の自機

		@@_Draw外枠();
		@@_DrawScore();

		yield 1;
	}

	// 自弾・敵・敵弾クリア
	Shots = <Shot_t[]>[];
	Enemies = <Enemy_t[]>[];
	Tamas = <Tama_t[]>[];
}
