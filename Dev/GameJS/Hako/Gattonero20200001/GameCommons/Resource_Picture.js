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

var<Image> P_Dummy = @@_Load(RESOURCE_General__Dummy_png);
var<Image> P_WhiteBox = @@_Load(RESOURCE_General__WhiteBox_png);
var<Image> P_WhiteCircle = @@_Load(RESOURCE_General__WhiteCircle_png);

// �������܂ŌŒ� -- �������_���� -- �T���v���Ƃ��ăL�[�v

var<Image> P_Star_S = @@_Load(RESOURCE_Picture__���鐯20_png);
var<Image> P_Player = @@_Load(RESOURCE_Picture__Player_png);
var<Image> P_Wall = @@_Load(RESOURCE_Picture__Wall_png);
var<Image> P_Goal = @@_Load(RESOURCE_Picture__Goal_png);
var<Image> P_�w�i = @@_Load(RESOURCE_Picture__Background_png);
var<Image> P_Enemy_B = @@_Load(RESOURCE_Picture__�G��_png);
var<Image> P_Enemy_R = @@_Load(RESOURCE_Picture__�G��_png);
var<Image> P_Enemy_G = @@_Load(RESOURCE_Picture__�G��_png);
