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
	Loading++;

	var<Audio> audio = new Audio(url);

	var<Action> loaded = function()
	{
		audio.removeEventListener("canplaythrough", loaded);
		audio.removeEventListener("error", errorLoad);

		LOGPOS();
		Loading--;
	};

	var<Action> errorLoad = function()
	{
		error();
	};

	audio.addEventListener("canplaythrough", loaded);
	audio.addEventListener("error", errorLoad);
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

//var<Audio> M_���� = @@_Load(Resources.General__muon_wav); // �f�J���̂Ń��[�h���Ȃ��B

//var<SE_t> S_���� = @@_LoadSE(Resources.General__muon_wav); // �f�J���̂Ń��[�h���Ȃ��B

// �������܂ŌŒ� -- �������_���� -- �T���v���Ƃ��ăL�[�v

var<Audio> M_Field = @@_Load(Resources.hmix__n62_mp3);

var<SE_t> S_EnemyDamaged = @@_LoadSE(Resources.�o���s��__EnemyDamaged_wav);
var<SE_t> S_PlayerShoot = @@_LoadSE(Resources.�o���s��__PlayerShoot_wav);
var<SE_t> S_EnemyDead = @@_LoadSE(Resources.���X��__explosion01_wav);
var<SE_t> S_PowerUp = @@_LoadSE(Resources.���X��__powerup03_mp3);
