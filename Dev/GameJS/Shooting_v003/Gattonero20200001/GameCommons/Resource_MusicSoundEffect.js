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

var<Audio> M_Stage01     = @@_Load(Resources.HMIX__n138_mp3);
var<Audio> M_Stage02     = @@_Load(Resources.HMIX__n70_mp3);
var<Audio> M_Stage03     = @@_Load(Resources.HMIX__n13_mp3);
var<Audio> M_Ending      = @@_Load(Resources.HMIX__n118_mp3);
var<Audio> M_Stage01Boss = @@_Load(Resources.���[�t���J__Battle_Vampire_loop_m4a);
var<Audio> M_Stage02Boss = @@_Load(Resources.���[�t���J__Battle_Conflict_loop_m4a);
var<Audio> M_Stage03Boss = @@_Load(Resources.���[�t���J__Battle_rapier_loop_m4a);

var<SE_t> S_EnemyDamaged = @@_LoadSE(Resources.�o���s��__EnemyDamaged_mp3);
var<SE_t> S_PlayerShoot  = @@_LoadSE(Resources.�o���s��__PlayerShoot_mp3);
var<SE_t> S_EnemyDead    = @@_LoadSE(Resources.���X��__explosion01_mp3);
var<SE_t> S_PowerUp      = @@_LoadSE(Resources.���X��__powerup03_mp3);
