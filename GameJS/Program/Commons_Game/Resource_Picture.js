/*
	�摜
*/

function @@_Load(url)
{
	LOGPOS;
	Loading++;

	var image = new Image();

	image.src = url;
	image.onload = function()
	{
		LOGPOS;
		Loading--;
	};

	image.onerror = function()
	{
		error;
	};

	return image;
}

// ��������e��摜

// �v���t�B�N�X
// P_ ... �摜

var P_Dummy = @@_Load(Resources.General__Dummy_png); // ���T���v���Ƃ��ăL�[�v
