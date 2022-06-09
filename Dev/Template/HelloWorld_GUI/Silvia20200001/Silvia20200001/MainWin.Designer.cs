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
			this.HelloWorldMessage = new System.Windows.Forms.Label();
			this.SuspendLayout();
			// 
			// HelloWorldMessage
			// 
			this.HelloWorldMessage.AutoSize = true;
			this.HelloWorldMessage.Font = new System.Drawing.Font("Impact", 24F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
			this.HelloWorldMessage.Location = new System.Drawing.Point(12, 9);
			this.HelloWorldMessage.Name = "HelloWorldMessage";
			this.HelloWorldMessage.Size = new System.Drawing.Size(420, 39);
			this.HelloWorldMessage.TabIndex = 0;
			this.HelloWorldMessage.Text = "This is \"Hello, World!\" program.";
			// 
			// MainWin
			// 
			this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 12F);
			this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
			this.ClientSize = new System.Drawing.Size(484, 161);
			this.Controls.Add(this.HelloWorldMessage);
			this.Name = "MainWin";
			this.Text = "HelloWorld";
			this.Load += new System.EventHandler(this.MainWin_Load);
			this.ResumeLayout(false);
			this.PerformLayout();

		}

		#endregion

		private System.Windows.Forms.Label HelloWorldMessage;

	}
}

