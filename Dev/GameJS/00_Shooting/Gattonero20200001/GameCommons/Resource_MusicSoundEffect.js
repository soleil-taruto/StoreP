/*
	���y�E���ʉ�
*/

/*
	���y
	Play()�֐��ɓn���B
*/
function <Sound_t> @@_Load(<string> url)
{
	return LoadSound(url);
}

/@(ASTR)

/// SE_t
{
	<Sound_t[]> Handles // �n���h���̃��X�g(5��)
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

//var<Sound_t> M_���� = @@_Load(RESOURCE_General__muon_mp3); // �f�J���̂Ń��[�h���Ȃ��B

//var<SE_t> S_���� = @@_LoadSE(RESOURCE_General__muon_mp3); // �f�J���̂Ń��[�h���Ȃ��B

// �������܂ŌŒ� -- �������_���� -- �T���v���Ƃ��ăL�[�v

var<Sound_t> M_Stage01     = @@_Load(RESOURCE_HMIX__n138_mp3);
var<Sound_t> M_Stage02     = @@_Load(RESOURCE_HMIX__n70_mp3);
var<Sound_t> M_Stage03     = @@_Load(RESOURCE_HMIX__n13_mp3);
var<Sound_t> M_Ending      = @@_Load(RESOURCE_HMIX__n118_mp3);
var<Sound_t> M_Stage01Boss = @@_Load(RESOURCE_���[�t���J__Battle_Vampire_loop_m4a);
var<Sound_t> M_Stage02Boss = @@_Load(RESOURCE_���[�t���J__Battle_Conflict_loop_m4a);
var<Sound_t> M_Stage03Boss = @@_Load(RESOURCE_���[�t���J__Battle_rapier_loop_m4a);

var<SE_t> S_EnemyDamaged = @@_LoadSE(RESOURCE_�o���s��__EnemyDamaged_mp3);
var<SE_t> S_PlayerShoot  = @@_LoadSE(RESOURCE_�o���s��__PlayerShoot_mp3);
var<SE_t> S_EnemyDead    = @@_LoadSE(RESOURCE_���X��__explosion01_mp3);
var<SE_t> S_PowerUp      = @@_LoadSE(RESOURCE_���X��__powerup03_mp3);
