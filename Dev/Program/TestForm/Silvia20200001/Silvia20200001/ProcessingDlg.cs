﻿using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Security.Permissions;
using System.Windows.Forms;

namespace Charlotte
{
	public partial class ProcessingDlg : Form
	{
		#region WndProc

		[SecurityPermission(SecurityAction.LinkDemand, Flags = SecurityPermissionFlag.UnmanagedCode)]
		protected override void WndProc(ref Message m)
		{
			const int WM_SYSCOMMAND = 0x112;
			const long SC_CLOSE = 0xF060L;

			if (m.Msg == WM_SYSCOMMAND && (m.WParam.ToInt64() & 0xFFF0L) == SC_CLOSE)
			{
				this.BeginInvoke((MethodInvoker)this.CloseWindow);
				return;
			}
			base.WndProc(ref m);
		}

		#endregion

		public ProcessingDlg()
		{
			InitializeComponent();

			this.MinimumSize = this.Size;
		}

		private void ProcessingDlg_Load(object sender, EventArgs e)
		{
			// none
		}

		private void ProcessingDlg_Shown(object sender, EventArgs e)
		{
			this.MainTimer.Enabled = true;
			this.Idling = true;

			PostShown.Perform(this);
		}

		private int BlockAltF4MessageKeepCountDown = 0;

		private void CloseWindow()
		{
			if (this.ProgressPct != -1)
			{
				this.BlockAltF4Message.Visible = true;
				this.BlockAltF4MessageKeepCountDown = 10;
				return;
			}

			this.MainTimer.Enabled = false;
			this.Idling = false;

			this.Close();
		}

		private bool Idling;

		private void MainTimer_Tick(object sender, EventArgs e)
		{
			if (!this.Idling)
				return;

			if (1 <= this.BlockAltF4MessageKeepCountDown)
			{
				this.BlockAltF4MessageKeepCountDown--;

				if (this.BlockAltF4MessageKeepCountDown == 0)
					this.BlockAltF4Message.Visible = false;
			}

			if (this.ProgressPct != -1)
			{
				this.ProgressPct = Math.Min(100, this.ProgressPct + 2);
				this.ProgressBar.Value = this.ProgressPct;

				if (this.ProgressPct == 100)
				{
					this.ProgressPct = -1;
					this.StartBtn.Enabled = true;
				}
			}
		}

		/// <summary>
		/// 進捗パーセント値
		/// -1 == 停止中
		/// 0 ～ 100 == 実行中
		/// </summary>
		private int ProgressPct = -1;

		private void StartBtn_Click(object sender, EventArgs e)
		{
			this.StartBtn.Enabled = false;
			this.ProgressPct = 0;
		}
	}
}
