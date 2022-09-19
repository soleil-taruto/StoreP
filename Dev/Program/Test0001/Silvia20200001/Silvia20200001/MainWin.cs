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
		}

		private void Btn0001_Click(object sender, EventArgs e)
		{
			this.Idling = false;
			MessageBox.Show("Btn0001");
			this.Idling = true;
		}
	}
}
