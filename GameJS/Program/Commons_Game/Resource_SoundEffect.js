/*
	���y�E���ʉ�
*/

function SE_t @@_Load(STR url)
{
	var<SE_t> ret =
	{
		// �n���h���̃��X�g(3��)
		Handles:
		[
			LoadSoundFileByUrl(url),
			LoadSoundFileByUrl(url),
			LoadSoundFileByUrl(url),
		],

		// ���ɍĐ�����n���h���̈ʒu
		Index: 0,
	};

	return ret;
}

// ��������e�퉹�y�E���ʉ�

// �v���t�B�N�X
// S_ ... ���ʉ�(SE)

var SE_t S_Dummy = @@_Load(Resources.General__muon_mp3); // ���T���v���Ƃ��ăL�[�v
