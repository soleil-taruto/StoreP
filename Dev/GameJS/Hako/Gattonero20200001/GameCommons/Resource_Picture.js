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

var<Image> P_Star_S = @@_Load(Resources.Picture__Tests__���鐯20_png);
var<Image> P_Player = @@_Load(Resources.Picture__Tests__Player_png);
var<Image> P_Wall = @@_Load(Resources.Picture__Tests__Wall_png);
var<Image> P_Goal = @@_Load(Resources.Picture__Tests__Goal_png);
var<Image> P_�w�i = @@_Load(Resources.Picture__Tests__Background_png);
var<Image> P_Enemy_B = @@_Load(Resources.Picture__Tests__�G��_png);
var<Image> P_Enemy_R = @@_Load(Resources.Picture__Tests__�G��_png);
var<Image> P_Enemy_G = @@_Load(Resources.Picture__Tests__�G��_png);
