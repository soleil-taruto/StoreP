/*
	���y
*/

function <Sound_t> @@_Load(<string> url)
{
	return LoadSound(url);
}

// ��������e�퉹�y

// �v���t�B�N�X
// M_ ... ���y

//var<Sound_t> M_���� = @@_Load(RESOURCE_General__muon_mp3); // �f�J���̂Ń��[�h���Ȃ��B

// �������܂ŌŒ� -- �������_���� -- �T���v���Ƃ��ăL�[�v

var<Sound_t> M_Title  = @@_Load(RESOURCE_MusMus__MusMus_BGM_093_mp3);
var<Sound_t> M_Field  = @@_Load(RESOURCE_MusMus__tw050_mp3);
var<Sound_t> M_Ending = @@_Load(RESOURCE_MusMus__tw006_mp3);
