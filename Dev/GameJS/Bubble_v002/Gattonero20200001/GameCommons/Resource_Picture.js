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

var<Image> P_�O�� = @@_Load(RESOURCE_Picture__�O��_png);

var<Image[]> P_Balls =
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

var<Image> P_Star_S = @@_Load(RESOURCE_Picture__���鐯20_png);
