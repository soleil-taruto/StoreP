/*
	���y�Đ��E��~
*/

/*
	���y�̉���
	0.0 �` 1.0
*/
var<double> MusicVolume = DEFAULT_VOLUME;

var<int> @@_State = 0; // 0 == ��~��, 1 == �Đ���, 2 == �t�F�[�h�A�E�g��, 3 == �Ȓ�~, 4 == ���̋Ȃ��Đ�
var<Audio> @@_Music = null;
var<Audio> @@_NextMusic = null;

// �Đ�
// music: ��
function <void> Play(<Audio> music)
{
	if (!music)
	{
		error(); // Bad music
	}

	if (@@_State == 1 && @@_Music == music) // ? �����Ȃ��Đ��� -> �������Ȃ��B
	{
		return;
	}
	if (@@_State != 0) // ? ��~���ł͂Ȃ��B-> �t�F�[�h�A�E�g���Ă���Đ�
	{
		if (@@_State == 1) // ? �Đ���
		{
			Fadeout();
		}
		@@_NextMusic = music;
		return;
	}

	music.loop = true;
	music.currentTime = 0;
	music.volume = MusicVolume;
	music.play();

	@@_State = 1;
	@@_Music = music;
}

var<int> @@_FadeoutFrame;
var<double> @@_Volume;

function <void> @(UNQN)_EACH()
{
	if (@@_State == 0) // ? ��~��
	{
		// noop
	}
	else if (@@_State == 1) // ? �Đ���
	{
		// noop
	}
	else if (@@_State == 2) // ? �t�F�[�h�A�E�g��
	{
		@@_Volume -= 1.0 / @@_FadeoutFrame;

		if (@@_Volume < 0.0)
		{
			@@_Volume = 0.0;
			@@_State = 3;
		}
		@@_Music.volume = @@_Volume * MusicVolume;
	}
	else if (@@_State == 3) // ? �Ȓ�~
	{
		@@_State = 4;

		@@_Music.pause();
		@@_Music = null;
	}
	else if (@@_State == 4) // ? ���̋Ȃ��Đ�
	{
		@@_State = 0;

		if (@@_NextMusic) // ? ���̋�_�L��
		{
			var music = @@_NextMusic;

			@@_NextMusic = null;

			Play(music);
		}
	}
	else
	{
		error(); // Bad @@_State
	}
}

// �t�F�[�h�A�E�g
function <void> Fadeout()
{
	Fadeout_F(30);
}

// �t�F�[�h�A�E�g
// frame: 1�`
function <void> Fadeout_F(<int> frame)
{
	if (frame < 1 || !Number.isInteger(frame))
	{
		error(); // Bad frame
	}

	if (@@_State == 0) // ? ��~�� -> nop
	{
		return;
	}
	if (2 <= @@_State) // ? �t�F�[�h�A�E�g��
	{
		@@_NextMusic = null; // �t�F�[�h�A�E�g���Ƀt�F�[�h�A�E�g���悤�Ƃ����B-> ���̋Ȃ��L�����Z��
		return;
	}

	@@_State = 2;
	@@_FadeoutFrame = frame;
	@@_Volume = 1.0;
}

function <void> MusicVolumeChanged()
{
	if (@@_Music != null)
	{
		@@_Music.volume = MusicVolume;
	}
}