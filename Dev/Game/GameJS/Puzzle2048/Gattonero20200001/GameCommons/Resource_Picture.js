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

var<Image> P_�����p�l�� =
[
	@@_Load(Resources.�����p�l��__n1_png),
	@@_Load(Resources.�����p�l��__n2_png),
	@@_Load(Resources.�����p�l��__n4_png),
	@@_Load(Resources.�����p�l��__n8_png),
	@@_Load(Resources.�����p�l��__n16_png),
	@@_Load(Resources.�����p�l��__n32_png),
	@@_Load(Resources.�����p�l��__n64_png),
	@@_Load(Resources.�����p�l��__n128_png),
	@@_Load(Resources.�����p�l��__n256_png),
	@@_Load(Resources.�����p�l��__n512_png),
	@@_Load(Resources.�����p�l��__n1024_png),
	@@_Load(Resources.�����p�l��__n2048_png),
	@@_Load(Resources.�����p�l��__n4096_png),
	@@_Load(Resources.�����p�l��__n8192_png),
	@@_Load(Resources.�����p�l��__n16384_png),
	@@_Load(Resources.�����p�l��__n32768_png),
	@@_Load(Resources.�����p�l��__n65536_png),
	@@_Load(Resources.�����p�l��__n131072_png),
	@@_Load(Resources.�����p�l��__n262144_png),
	@@_Load(Resources.�����p�l��__n524288_png),
	@@_Load(Resources.�����p�l��__n1048576_png),
	@@_Load(Resources.�����p�l��__n2097152_png),
	@@_Load(Resources.�����p�l��__n4194304_png),
	@@_Load(Resources.�����p�l��__n8388608_png),
	@@_Load(Resources.�����p�l��__n16777216_png),
	@@_Load(Resources.�����p�l��__n33554432_png),
	@@_Load(Resources.�����p�l��__n67108864_png),
	@@_Load(Resources.�����p�l��__n134217728_png),
	@@_Load(Resources.�����p�l��__n268435456_png),
	@@_Load(Resources.�����p�l��__n536870912_png),
	@@_Load(Resources.�����p�l��__n1073741824_png),
	@@_Load(Resources.�����p�l��__n2147483648_png),
	@@_Load(Resources.�����p�l��__n4294967296_png),
];

var<Image> P_Gravity = @@_Load(Resources.Picture__Gravity_png);
