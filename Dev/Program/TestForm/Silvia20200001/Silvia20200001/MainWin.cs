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

		public MainWin()
		{
			InitializeComponent();

			this.MinimumSize = this.Size;
		}

		private void MainWin_Load(object sender, EventArgs e)
		{
			// none
		}

		private void MainWin_Shown(object sender, EventArgs e)
		{
			this.Idling = true;
			this.MainTimer.Enabled = true;

			PostShown.Perform(this);
		}

		private void CloseWindow()
		{
			this.Idling = false;
			this.MainTimer.Enabled = false;

			this.Close();
		}

		private bool Idling;

		private void MainTimer_Tick(object sender, EventArgs e)
		{
			if (!this.Idling)
				return;

			this.Counter.Text = "" + (ulong.Parse(this.Counter.Text) + 1);
		}

		private void PauseBtn_Click(object sender, EventArgs e)
		{
			this.Idling = false;
			MessageBox.Show("Pause");
			this.Idling = true;
		}

		private void CloseBtn_Click(object sender, EventArgs e)
		{
			this.CloseWindow();
			return;
		}

		private void FiveSecBtn_Click(object sender, EventArgs e)
		{
			this.Idling = false;
			this.Visible = false;

			using (ProcessingDlg f = new ProcessingDlg())
			{
				f.ShowDialog();
			}

			this.Idling = true;
			this.Visible = true;
		}
	}
}
