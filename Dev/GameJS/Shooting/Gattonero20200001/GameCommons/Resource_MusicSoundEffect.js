/*
	���y�E���ʉ�
*/

/*
	���y
	Play()�֐��ɓn���B
*/
function <Audio> @@_Load(<string> url)
{
	LOGPOS();

	var<Audio> audio = new Audio(url);

	audio.load();

	return audio;
}

/@(ASTR)

// SE_t
{
	<Audio[]> Handles // �n���h���̃��X�g(3��)
	<int> Index // ���ɍĐ�����n���h���̈ʒu
}

@(ASTR)/

/*
	���ʉ�
	SE()�֐��ɓn���B
*/
function <SE_t> @@_LoadSE(<string> url)
{
	var<SE_t> ret =
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

var<Audio> M_Field = @@_Load(Resources.HMIX__n62_mp3);

var<SE_t> S_Explode = @@_LoadSE(Resources.���X��__explosion01_mp3);
