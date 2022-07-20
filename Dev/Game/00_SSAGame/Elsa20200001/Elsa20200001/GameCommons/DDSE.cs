using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Charlotte.GameCommons
{
	public class DDSE
	{
		public bool Globally = true; // 廃止予定
		public bool Locally { get { return !this.Globally; } } // 廃止予定
		public DDSound Sound;
		public double Volume = 0.5; // 廃止予定
		public int HandleIndex = 0;

		public DDSE(string file)
			: this(new DDSound(file))
		{ }

		public DDSE(Func<byte[]> getFileData)
			: this(new DDSound(getFileData))
		{ }

		public DDSE(DDSound sound_binding)
		{
			this.Sound = sound_binding;
			this.Sound.PostLoadeds.Add(this.UpdateVolume_Handle);

			DDSEUtils.Add(this);
		}

		/// <summary>
		/// 廃止予定
		/// ローカル化する。
		/// 初期化時に呼び出すこと。
		/// -- 例：DDSE xxx = new DDSE("xxx.mp3").SetLocally();
		/// </summary>
		/// <returns>このインスタンス</returns>
		public DDSE SetLocally()
		{
			this.Globally = false;
			return this;
		}

		public void Play(bool once = true)
		{
			if (once)
				DDSEUtils.Play(this);
			else
				DDSEUtils.PlayLoop(this);
		}

		public void Stop()
		{
			DDSEUtils.Stop(this);
		}

		/// <summary>
		/// 廃止予定
		/// 固有の音量を設定する。
		/// </summary>
		/// <param name="volume">音量</param>
		public void SetVolume(double volume)
		{
			this.Volume = volume;
			this.UpdateVolume();
		}

		public void UpdateVolume()
		{
			this.UpdateVolume_Handles(this.Sound.GetHandles());
		}

		private void UpdateVolume_Handle(int handle)
		{
			this.UpdateVolume_Handles(new int[] { handle });
		}

		private void UpdateVolume_Handles(int[] handles)
		{
			double mixedVolume = DDSoundUtils.MixVolume(DDGround.SEVolume, this.Volume);

			foreach (int handle in handles)
				DDSoundUtils.SetVolume(handle, mixedVolume);
		}

		public void Touch()
		{
			this.Sound.GetHandle(0);
		}
	}
}
