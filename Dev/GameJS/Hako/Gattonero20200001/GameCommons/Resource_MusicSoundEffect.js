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

/// SE_t
{
	<Audio[]> Handles // �n���h���̃��X�g(5��)
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
		// �n���h���̃��X�g(5��)
		Handles:
		[
			@@_Load(url), // 1
			@@_Load(url), // 2
			@@_Load(url), // 3
			@@_Load(url), // 4
			@@_Load(url), // 5
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

//var<Audio> M_���� = @@_Load(Resources.General__muon_mp3); // �f�J���̂Ń��[�h���Ȃ��B

//var<SE_t> S_���� = @@_LoadSE(Resources.General__muon_mp3); // �f�J���̂Ń��[�h���Ȃ��B

// �������܂ŌŒ� -- �������_���� -- �T���v���Ƃ��ăL�[�v

var<Audio> M_Title  = @@_Load(Resources.MusMus__MusMus_BGM_093_mp3);
var<Audio> M_Field  = @@_Load(Resources.MusMus__tw050_mp3);
var<Audio> M_Ending = @@_Load(Resources.MusMus__tw006_mp3);

var<SE_t> S_Jump    = @@_LoadSE(Resources.���X��__jump12_mp3);
var<SE_t> S_Crashed = @@_LoadSE(Resources.���X��__question_mp3);
var<SE_t> S_Dead    = @@_LoadSE(Resources.���X��__explosion05_mp3);
