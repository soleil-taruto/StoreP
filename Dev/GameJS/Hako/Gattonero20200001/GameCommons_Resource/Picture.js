/*
	�摜
*/

function <Picture_t> @@_Load(<string> url)
{
	return LoadPicture(url);
}

// ��������e��摜

// �v���t�B�N�X
// P_ ... �摜

var<Picture_t> P_Dummy = @@_Load(RESOURCE_General__Dummy_png);
var<Picture_t> P_WhiteBox = @@_Load(RESOURCE_General__WhiteBox_png);
var<Picture_t> P_WhiteCircle = @@_Load(RESOURCE_General__WhiteCircle_png);

// �������܂ŌŒ� -- �������_���� -- �T���v���Ƃ��ăL�[�v

var<Picture_t> P_GameStartButton = @@_Load(RESOURCE_Picture__GameStartButton_png);
var<Picture_t> P_Star_S = @@_Load(RESOURCE_Picture__���鐯20_png);
var<Picture_t> P_Player = @@_Load(RESOURCE_Picture__Player_png);
var<Picture_t> P_Wall = @@_Load(RESOURCE_Picture__Wall_png);
var<Picture_t> P_Goal = @@_Load(RESOURCE_Picture__Goal_png);
var<Picture_t> P_�w�i = @@_Load(RESOURCE_Picture__Background_png);
var<Picture_t> P_Enemy_B = @@_Load(RESOURCE_Picture__�G��_png);
var<Picture_t> P_Enemy_R = @@_Load(RESOURCE_Picture__�G��_png);
var<Picture_t> P_Enemy_G = @@_Load(RESOURCE_Picture__�G��_png);

var<Picture_t> P_TitleLogo    = @@_Load(RESOURCE_Picture__TitleLogo_png);
var<Picture_t> P_EndingString = @@_Load(RESOURCE_Picture__EndingString_png);
