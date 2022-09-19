using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading;
using System.IO;
using System.Security.Permissions;
using System.Windows.Forms;
using Charlotte.Commons;

namespace Charlotte
{
	public partial class MainWin : Form
	{
		[SecurityPermission(SecurityAction.LinkDemand, Flags = SecurityPermissionFlag.UnmanagedCode)]
		protected override void WndProc(ref Message m)
		{
			const int WM_SYSCOMMAND = 0x112;
			const long SC_CLOSE = 0xF060L;

			if (m.Msg == WM_SYSCOMMAND && (m.WParam.ToInt64() & 0xFFF0L) == SC_CLOSE)
			{
				this.CloseButtonOrF4Pressed();
				return;
			}
			base.WndProc(ref m);
		}

		public MainWin()
		{
			InitializeComponent();
		}

		private void MainWin_Load(object sender, EventArgs e)
		{
			// none
		}

		private void MainWin_Shown(object sender, EventArgs e)
		{
			this.MainTimer.Enabled = true;
			PostShown.Perform(this);
		}

		private void MainWin_FormClosed(object sender, FormClosedEventArgs e)
		{
			this.MainTimer.Enabled = false;
			this.Idling = false;
		}

		private bool Idling = true;

		private void MainTimer_Tick(object sender, EventArgs e)
		{
			if (!this.Idling)
				return;

			this.L0001.Text = "" + ((int.Parse(L0001.Text) + 1) % 10);

			if (1 <= this.CloseButtonBlockedShowCountDown)
			{
				this.CloseButtonBlockedShowCountDown--;

				if (this.CloseButtonBlockedShowCountDown == 0)
				{
					this.CloseButtonBlockedLabel.Visible = false;
				}
			}
		}

		private void Btn0001_Click(object sender, EventArgs e)
		{
			this.Idling = false;
			MessageBox.Show("Btn0001");
			this.Idling = true;
		}

		private int CloseButtonBlockedShowCountDown;

		private void CloseButtonOrF4Pressed()
		{
			this.CloseButtonBlockedLabel.Visible = true;
			this.CloseButtonBlockedShowCountDown = 10;
		}
	}
}
