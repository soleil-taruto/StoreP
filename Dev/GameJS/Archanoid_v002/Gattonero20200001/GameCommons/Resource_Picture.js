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

var<Picture_t> P_Ball = @@_Load(RESOURCE_Picture__Ball_png);
var<Picture_t> P_�e�� = @@_Load(RESOURCE_Picture__�e��_png);

var<Picture_t> P_Circle_Hard = @@_Load(RESOURCE_Picture__�~�`�u���b�N_Hard_png); // �d��
var<Picture_t> P_Circle_Norm = @@_Load(RESOURCE_Picture__�~�`�u���b�N_Norm_png); // �d������
var<Picture_t> P_Circle_Soft = @@_Load(RESOURCE_Picture__�~�`�u���b�N_Soft_png); // �_�炩��

var<Picture_t> P_Square_Hard = @@_Load(RESOURCE_Picture__�����`�u���b�N_Hard_png); // �d��
var<Picture_t> P_Square_Norm = @@_Load(RESOURCE_Picture__�����`�u���b�N_Norm_png); // �d������
var<Picture_t> P_Square_Soft = @@_Load(RESOURCE_Picture__�����`�u���b�N_Soft_png); // �_�炩��

var<Picture_t> P_Star_S = @@_Load(RESOURCE_Picture__���鐯20_png);
