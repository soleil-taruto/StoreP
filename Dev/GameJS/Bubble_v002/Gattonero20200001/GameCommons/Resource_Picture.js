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

var<Picture_t> P_�O�� = @@_Load(RESOURCE_Picture__�O��_png);

var<Picture_t[]> P_Balls =
[
	@@_Load(RESOURCE_Picture__00ff00_png),
	@@_Load(RESOURCE_Picture__00ffff_png),
	@@_Load(RESOURCE_Picture__0080ff_png),
	@@_Load(RESOURCE_Picture__ff0000_png),
	@@_Load(RESOURCE_Picture__ff00ff_png),
	@@_Load(RESOURCE_Picture__ff8000_png),
	@@_Load(RESOURCE_Picture__ffff00_png),
	@@_Load(RESOURCE_Picture__ffffff_png),
];

var<Picture_t> P_Star_S = @@_Load(RESOURCE_Picture__���鐯20_png);
