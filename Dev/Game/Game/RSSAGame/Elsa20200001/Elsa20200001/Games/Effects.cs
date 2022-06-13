﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Charlotte.GameCommons;
using Charlotte.Commons;
using Charlotte.Games.Shots;

namespace Charlotte.Games
{
	public static class Effects
	{
		/// <summary>
		/// エフェクト・テスト -- ★サンプルとしてキープ
		/// 追加例：
		/// -- DDGround.EL.Add(SCommon.Supplier(Effects.TestEffect(400.0, 300.0)));
		/// </summary>
		/// <param name="x">X座標</param>
		/// <param name="y">Y座標</param>
		/// <returns>エフェクト</returns>
		public static IEnumerable<bool> TestEffect(double x, double y)
		{
			foreach (DDScene scene in DDSceneUtils.Create(30))
			{
				DDDraw.SetBright(1.0, 0.5, 0.5);
				DDDraw.DrawBegin(Ground.I.Picture.Dummy, x - DDGround.ICamera.X, y - DDGround.ICamera.Y);
				DDDraw.DrawRotate(scene.Rate * Math.PI * 2.0);
				DDDraw.DrawEnd();
				DDDraw.Reset();

				yield return true;
			}
		}

		public static IEnumerable<bool> 小爆発(double x, double y) // ★サンプルとしてキープ
		{
			foreach (DDScene scene in DDSceneUtils.Create(5))
			{
				DDDraw.SetAlpha(0.7);
				DDDraw.SetBright(1.0, 0.5, 0.5);
				DDDraw.DrawBegin(Ground.I.Picture.WhiteCircle, x - DDGround.ICamera.X, y - DDGround.ICamera.Y);
				DDDraw.DrawZoom(0.3 * scene.Rate);
				DDDraw.DrawEnd();
				DDDraw.Reset();

				yield return true;
			}
		}

		public static IEnumerable<bool> 中爆発(double x, double y) // ★サンプルとしてキープ
		{
			foreach (DDScene scene in DDSceneUtils.Create(10))
			{
				DDDraw.SetAlpha(0.7);
				DDDraw.SetBright(1.0, 0.6, 0.3);
				DDDraw.DrawBegin(Ground.I.Picture.WhiteCircle, x - DDGround.ICamera.X, y - DDGround.ICamera.Y);
				DDDraw.DrawZoom(1.5 * scene.Rate);
				DDDraw.DrawEnd();
				DDDraw.Reset();

				yield return true;
			}
		}

		public static IEnumerable<bool> 大爆発(double x, double y) // ★サンプルとしてキープ
		{
			foreach (DDScene scene in DDSceneUtils.Create(10))
			{
				DDDraw.SetAlpha(0.7);
				DDDraw.SetBright(0.6, 0.8, 1.0);
				DDDraw.DrawBegin(Ground.I.Picture.WhiteCircle, x - DDGround.ICamera.X, y - DDGround.ICamera.Y);
				DDDraw.DrawZoom(3.0 * scene.Rate);
				DDDraw.DrawEnd();
				DDDraw.Reset();

				yield return true;
			}
		}

		public static IEnumerable<bool> 閉鎖_開放(double x, double y) // ★サンプルとしてキープ
		{
			foreach (DDScene scene in DDSceneUtils.Create(15))
			{
				DDDraw.SetAlpha(0.5);
				DDDraw.SetBright(0.0, 1.0, 1.0);
				DDDraw.DrawBegin(Ground.I.Picture.WhiteBox, x - DDGround.ICamera.X, y - DDGround.ICamera.Y);
				DDDraw.DrawSetSize(GameConsts.TILE_W, GameConsts.TILE_H);
				DDDraw.DrawZoom(1.0 - scene.Rate * 0.5);
				DDDraw.DrawRotate(Math.PI * 2.0 * scene.Rate);
				DDDraw.DrawEnd();
				DDDraw.Reset();

				yield return true;
			}
		}

		public static void ティウンティウン_AddToEL(double x, double y)
		{
			foreach (IEnumerable<bool> task in ティウンティウン(x, y))
				DDGround.EL.Add(SCommon.Supplier(task));
		}

		private static IEnumerable<IEnumerable<bool>> ティウンティウン(double x, double y)
		{
			for (int c = 1; c <= 2; c++)
			{
				int speed = c * 3;
				int nanameSpeed = c * 2;

				yield return ティウンティウンSub(x, y, -speed, 0);
				yield return ティウンティウンSub(x, y, 0, -speed);
				yield return ティウンティウンSub(x, y, speed, 0);
				yield return ティウンティウンSub(x, y, 0, speed);

				yield return ティウンティウンSub(x, y, -nanameSpeed, -nanameSpeed);
				yield return ティウンティウンSub(x, y, -nanameSpeed, nanameSpeed);
				yield return ティウンティウンSub(x, y, nanameSpeed, -nanameSpeed);
				yield return ティウンティウンSub(x, y, nanameSpeed, nanameSpeed);
			}
		}

		private static IEnumerable<bool> ティウンティウンSub(double x, double y, int xSpeedScale, int ySpeedScale)
		{
			double xSpeed = xSpeedScale * 0.8;
			double ySpeed = ySpeedScale * 0.8;

			for (int frame = 0; ; frame++)
			{
				x += xSpeed;
				y += ySpeed;

				if (DDUtils.IsOutOfCamera(new D2Point(x, y)))
					break;

				DDDraw.DrawCenter(Ground.I.Picture.Effect_A01_A_Explosion[4 - frame / 3 % 5], x - DDGround.ICamera.X, y - DDGround.ICamera.Y);

				yield return true;
			}
		}

		public static IEnumerable<bool> スライディング(double x, double y)
		{
			foreach (DDPicture picture in Ground.I.Picture.Effect_A01_Sliding)
			{
				for (int c = 0; c < 4; c++)
				{
					DDDraw.DrawCenter(picture, x - DDGround.ICamera.X, y - DDGround.ICamera.Y);

					yield return true;
				}
			}
		}

		public static IEnumerable<bool> ヒットバック(double x, double y)
		{
			foreach (DDPicture picture in Ground.I.Picture.Effect_A01_Shock_B)
			{
				for (int c = 0; c < 6; c++)
				{
					DDDraw.DrawCenter(picture, x - DDGround.ICamera.X, y - DDGround.ICamera.Y);

					yield return true;
				}
			}
		}

		public static IEnumerable<bool> 自弾跳ね返し(Shot shot)
		{
			double x = shot.X;
			double y = shot.Y;
			double xa = 8.0 * (shot.FacingLeft ? 1 : -1);
			double ya = -8.0;

			for (; ; )
			{
				x += xa;
				y += ya;

				DDDraw.DrawCenter(Ground.I.Picture.Shot_Normal, x - DDGround.ICamera.X, y - DDGround.ICamera.Y);

				yield return true;
			}
		}
	}
}
