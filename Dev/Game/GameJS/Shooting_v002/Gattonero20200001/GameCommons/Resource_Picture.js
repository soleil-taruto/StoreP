/*
	�摜
*/

function <Image> @@_Load(<string> url)
{
	LOGPOS();
	Loading++;

	var image = new Image();

	image.src = url;
	image.onload = function()
	{
		LOGPOS();
		Loading--;
	};

	image.onerror = function()
	{
		error();
	};

	return image;
}

// ��������e��摜

// �v���t�B�N�X
// P_ ... �摜

var<Image> P_Dummy = @@_Load(Resources.General__Dummy_png);
var<Image> P_WhiteBox = @@_Load(Resources.General__WhiteBox_png);
var<Image> P_WhiteCircle = @@_Load(Resources.General__WhiteCircle_png);

// �������܂ŌŒ� -- �������_���� -- �T���v���Ƃ��ăL�[�v

var<Image> P_Star_S = @@_Load(Resources.Picture__���鐯20_png);
var<Image> P_Player = @@_Load(Resources.Picture__Player_png);
var<Image> P_Shot0001 = @@_Load(Resources.Picture__Shot0001_png);
var<Image> P_Tama0001 = @@_Load(Resources.Picture__Tama0001_png);
var<Image> P_Wall0001 = @@_Load(Resources.Picture__Wall0001_png);
var<Image> P_Wall0002 = @@_Load(Resources.Picture__Wall0002_png);
var<Image> P_Wall0003 = @@_Load(Resources.Picture__Wall0003_png);
var<Image> P_Enemy0001 = @@_Load(Resources.Picture__Enemy0001_png);
var<Image> P_Enemy0002 = @@_Load(Resources.Picture__Enemy0002_png);
var<Image> P_Enemy0003 = @@_Load(Resources.Picture__Enemy0003_png);
var<Image> P_Enemy0004 = @@_Load(Resources.Picture__Enemy0004_png);
var<Image> P_Enemy0005 = @@_Load(Resources.Picture__Enemy0005_png);
var<Image> P_Enemy0006 = @@_Load(Resources.Picture__Enemy0006_png);
var<Image> P_Enemy0007 = @@_Load(Resources.Picture__Enemy0007_png);
var<Image> P_Enemy0008 = @@_Load(Resources.Picture__Enemy0008_png);
