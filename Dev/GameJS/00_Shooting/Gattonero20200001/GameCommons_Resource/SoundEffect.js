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

var<SE_t> S_EnemyDamaged = @@_LoadSE(RESOURCE_�o���s��__EnemyDamaged_mp3);
var<SE_t> S_PlayerShoot  = @@_LoadSE(RESOURCE_�o���s��__PlayerShoot_mp3);
var<SE_t> S_EnemyDead    = @@_LoadSE(RESOURCE_���X��__explosion01_mp3);
var<SE_t> S_PowerUp      = @@_LoadSE(RESOURCE_���X��__powerup03_mp3);
