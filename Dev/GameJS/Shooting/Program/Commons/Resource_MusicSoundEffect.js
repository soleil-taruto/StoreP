/*
	���y�E���ʉ�
*/

/*
	���y
	Play()�֐��ɓn���B
*/
function @@_Load(url)
{
	LOGPOS;
	Loading++;

	var audio = new Audio(url);

	var loaded = function()
	{
		audio.removeEventListener("canplaythrough", loaded);
		audio.removeEventListener("error", errorLoad);

		LOGPOS;
		Loading--;
	};

	var errorLoad = function()
	{
		error;
	};

	audio.addEventListener("canplaythrough", loaded);
	audio.addEventListener("error", errorLoad);
	audio.load();

	return audio;
}

/*
	���ʉ�
	SE()�֐��ɓn���B
*/
function @@_LoadSE(url)
{
	var ret =
	{
		// �n���h���̃��X�g(3��)
		Handles:
		[
			@@_Load(url),
			@@_Load(url),
			@@_Load(url),
		],

		// ���ɍĐ�����n���h���̈ʒu
		Index: 0,
	};

	return ret;
}

// ��������e�퉹�y�E���ʉ�

// �v���t�B�N�X
// M_ ... ���y,BGM
// S_ ... ���ʉ�(SE)

var M_Field = @@_Load(Resources.HMIX__n62_mp3);

var S_Explode = @@_LoadSE(Resources.���X��__explosion01_mp3);
