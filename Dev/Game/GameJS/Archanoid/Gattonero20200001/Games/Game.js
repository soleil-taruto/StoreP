/*
	ゲーム・メイン
*/

var<Block_t[]> @@_Blocks = [];
var<Ball_t[]> @@_Balls = [];

/*
	射出可能ボール数
*/
var<int> @@_BallStockNum = 10;

/*
	射出中フレーム
	0 == 無効
	1～ == 射出中
*/
var<boolean> @@_ShootingFrame = 0;

/*
	射出角度
*/
var<double> @@_ShootingAngle;

/*
	射出する X-位置
*/
var<double> @@_Shooter_X = Screen_W / 2;

/*
	帰ってきたボールの X-位置
	null == 無効
*/
var<double> @@_Return_X = null;

function* <generatorForTask> GameMain()
{
	for (; ; )
	{
		@@_DrawWall();

		var<double> mx = GetMouseX();
		var<double> my = GetMouseY();

		if (@@_ShootingFrame == 0) // ? 射出中ではない -> 射出方向を描画する。射出もやる。
		{
			var<double> sx = @@_Shooter_X;
			var<double> sy = Screen_H;

			var<double> shootRad = GetAngle(mx - sx, my - sy);

			if (shootRad < Math.PI / 2)
			{
				shootRad += Math.PI * 2;
			}
			var<double> RAD_LMT = 0.4;

			shootRad = ToRange(shootRad, Math.PI + RAD_LMT, Math.PI * 2 - RAD_LMT);

			for (var<int> c = 1; c <= 5; c++)
			{
				var<D2Point_t> pt = AngleToPoint(shootRad, c * 32.0);

				pt.X += sx;
				pt.Y += sy;

				Draw(P_弾道, pt.X, pt.Y, 0.5, 0.0, 1.0);
			}

			if (GetMouseDown() == -1)
			{
				@@_ShootingFrame = 1;
				@@_ShootingAngle = shootRad;
			}
		}
		else // ? 射出中
		{
			var<int> SHOOT_PER_FRAME = 10;
			var<boolean> completed = false;

			if (@@_ShootingFrame / SHOOT_PER_FRAME <= @@_BallStockNum) // ? 射出未完了
			{
				if (@@_ShootingFrame % SHOOT_PER_FRAME == 0)
				{
					var<double> x = @@_Shooter_X;
					var<double> y = Screen_H;

					var<D2Point_t> speed = AngleToPoint(@@_ShootingAngle, 8.0);

					var<double> xAdd = speed.X;
					var<double> yAdd = speed.Y;

					@@_Balls.push(CreateBall(x, y, xAdd, yAdd));
				}
			}
			else // ? 射出完了
			{
				if (@@_Balls.length == 0)
				{
					completed = true;
				}
			}

			if (completed)
			{
				@@_ShootingFrame = 0;
			}
			else
			{
				@@_ShootingFrame++;
			}
		}

		// ====
		// 描画ここから？
		// ====

		// ブロック描画
		for (var<int> index = 0; index < @@_Blocks.length; index++)
		{
			if (!DrawBlock(@@_Blocks[index]))
			{
				@@_Blocks[index] = null;
			}
		}
		RemoveFalse(@@_Blocks);

		// ボール描画
		for (var<int> index = 0; index < @@_Balls.length; index++)
		{
			if (!DrawBall(@@_Balls[index]))
			{
				@@_Balls[index] = null;
			}
		}
		RemoveFalse(@@_Balls);

		// 当たり判定
		{
			for (var<int> index = 0; index < @@_Balls.length; index++)
			{
				var<Ball_t> ball = @@_Balls[index];

				if (ball.X < 0.0)
				{
					ball.XAdd = Math.abs(ball.XAdd);
				}
				if (Screen_W < ball.X)
				{
					ball.XAdd = Math.abs(ball.XAdd) * -1;
				}
				if (ball.Y < 0.0)
				{
					ball.YAdd = Math.abs(ball.YAdd);
				}
			}
		}

		yield 1;
	}
}

function @@_DrawWall()
{
	SetColor(I3ColorToString(CreateI3Color(0, 0, 0)));
	PrintRect(0, 0, Screen_W, Screen_H);
}
