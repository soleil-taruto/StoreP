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

var<Image> P_ExplodeStar = @@_Load(Resources.Picture__���鐯20_png);
var<Image> P_Wall = @@_Load(Resources.Picture__Wall_png);

var<Image[]> P_Players =
[
	@@_Load(Resources.���ނ���__nc25161_0101_png),
	@@_Load(Resources.���ނ���__nc25161_0102_png),
	@@_Load(Resources.���ނ���__nc25161_0103_png),

	// TODO
];
