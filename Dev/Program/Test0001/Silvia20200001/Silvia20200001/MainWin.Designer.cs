namespace Charlotte
{
	partial class MainWin
	{
		/// <summary>
		/// 必要なデザイナー変数です。
		/// </summary>
		private System.ComponentModel.IContainer components = null;

		/// <summary>
		/// 使用中のリソースをすべてクリーンアップします。
		/// </summary>
		/// <param name="disposing">マネージ リソースが破棄される場合 true、破棄されない場合は false です。</param>
		protected override void Dispose(bool disposing)
		{
			if (disposing && (components != null))
			{
				components.Dispose();
			}
			base.Dispose(disposing);
		}

		#region Windows フォーム デザイナーで生成されたコード

		/// <summary>
		/// デザイナー サポートに必要なメソッドです。このメソッドの内容を
		/// コード エディターで変更しないでください。
		/// </summary>
		private void InitializeComponent()
		{
			this.components = new System.ComponentModel.Container();
			System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(MainWin));
			this.MainTimer = new System.Windows.Forms.Timer(this.components);
			this.Btn0001 = new System.Windows.Forms.Button();
			this.L0001 = new System.Windows.Forms.Label();
			this.SuspendLayout();
			// 
			// MainTimer
			// 
			this.MainTimer.Tick += new System.EventHandler(this.MainTimer_Tick);
			// 
			// Btn0001
			// 
			this.Btn0001.Location = new System.Drawing.Point(12, 12);
			this.Btn0001.Name = "Btn0001";
			this.Btn0001.Size = new System.Drawing.Size(100, 100);
			this.Btn0001.TabIndex = 0;
			this.Btn0001.Text = "Btn0001";
			this.Btn0001.UseVisualStyleBackColor = true;
			this.Btn0001.Click += new System.EventHandler(this.Btn0001_Click);
			// 
			// L0001
			// 
			this.L0001.AutoSize = true;
			this.L0001.Location = new System.Drawing.Point(12, 115);
			this.L0001.Name = "L0001";
			this.L0001.Size = new System.Drawing.Size(17, 20);
			this.L0001.TabIndex = 1;
			this.L0001.Text = "0";
			// 
			// MainWin
			// 
			this.AutoScaleDimensions = new System.Drawing.SizeF(8F, 20F);
			this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
			this.ClientSize = new System.Drawing.Size(284, 261);
			this.Controls.Add(this.L0001);
			this.Controls.Add(this.Btn0001);
			this.Font = new System.Drawing.Font("メイリオ", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(128)));
			this.Icon = ((System.Drawing.Icon)(resources.GetObject("$this.Icon")));
			this.Margin = new System.Windows.Forms.Padding(4, 5, 4, 5);
			this.Name = "MainWin";
			this.Text = "Silvia20200001";
			this.FormClosed += new System.Windows.Forms.FormClosedEventHandler(this.MainWin_FormClosed);
			this.Load += new System.EventHandler(this.MainWin_Load);
			this.Shown += new System.EventHandler(this.MainWin_Shown);
			this.ResumeLayout(false);
			this.PerformLayout();

		}

		#endregion

		private System.Windows.Forms.Timer MainTimer;
		private System.Windows.Forms.Button Btn0001;
		private System.Windows.Forms.Label L0001;

	}
}

