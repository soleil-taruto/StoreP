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

var<Image> P_Ball = @@_Load(RESOURCE_Picture__Ball_png);
var<Image> P_�e�� = @@_Load(RESOURCE_Picture__�e��_png);

var<Image> P_Circle_Hard = @@_Load(RESOURCE_Picture__�~�`�u���b�N_Hard_png); // �d��
var<Image> P_Circle_Norm = @@_Load(RESOURCE_Picture__�~�`�u���b�N_Norm_png); // �d������
var<Image> P_Circle_Soft = @@_Load(RESOURCE_Picture__�~�`�u���b�N_Soft_png); // �_�炩��

var<Image> P_Square_Hard = @@_Load(RESOURCE_Picture__�����`�u���b�N_Hard_png); // �d��
var<Image> P_Square_Norm = @@_Load(RESOURCE_Picture__�����`�u���b�N_Norm_png); // �d������
var<Image> P_Square_Soft = @@_Load(RESOURCE_Picture__�����`�u���b�N_Soft_png); // �_�炩��

var<Image> P_Star_S = @@_Load(RESOURCE_Picture__���鐯20_png);
