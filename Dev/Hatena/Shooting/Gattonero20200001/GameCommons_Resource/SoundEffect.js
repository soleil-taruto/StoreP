/*
	���ʉ�
*/

function <SE_t> @@_Load(<string> url)
{
	return LoadSE(url);
}

// ��������e�퉹�y�E���ʉ�

// �v���t�B�N�X
// S_ ... ���ʉ�

//var<SE_t> S_���� = @@_Load(RESOURCE_General__muon_mp3); // �f�J���̂Ń��[�h���Ȃ��B

// �������܂ŌŒ� -- �������_���� -- �T���v���Ƃ��ăL�[�v

var<SE_t> S_EnemyDamaged = @@_Load(RESOURCE_Unknown__EnemyDamaged_mp3);
var<SE_t> S_PlayerShoot  = @@_Load(RESOURCE_Unknown__PlayerShoot_mp3);
var<SE_t> S_EnemyDead    = @@_Load(RESOURCE_KomoriTaira__explosion01_mp3);
var<SE_t> S_PowerUp      = @@_Load(RESOURCE_KomoriTaira__powerup03_mp3);

// ----

var<SE_t[]> S_�e�X�g�p =
[
	S_EnemyDamaged,
	S_EnemyDead,
	S_PowerUp,
];

var<SE_t> S_SaveDataRemoved = S_EnemyDead;

// ----
