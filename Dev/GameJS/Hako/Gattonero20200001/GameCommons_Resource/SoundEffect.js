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

var<SE_t> S_Jump    = @@_Load(RESOURCE_���X��__jump12_mp3);
var<SE_t> S_Crashed = @@_Load(RESOURCE_���X��__question_mp3);
var<SE_t> S_Dead    = @@_Load(RESOURCE_���X��__explosion05_mp3);
var<SE_t> S_Start   = @@_Load(RESOURCE_���X��__strange_wave_mp3);
var<SE_t> S_Goal    = @@_Load(RESOURCE_���X��__warp1_mp3);

// ----

var<SE_t[]> S_�e�X�g�p =
[
	S_Jump,
	S_Crashed,
	S_Dead,
];

var<SE_t> S_SaveDataRemoved = S_Dead;

// ----
