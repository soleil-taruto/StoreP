/*
	音楽・効果音
*/

function <Audio> @@_Load(<string> url)
{
	LOGPOS;
	Loading++;

	var audio = new Audio(url);

	var loaded = function()
	{
		audio.removeEventListener("canplaythrough", loaded);
		audio.removeEventListener("error", errorLoad);

		LOGPOS;
		Loading--;
	};

	var errorLoad = function()
	{
		error;
	};

	audio.addEventListener("canplaythrough", loaded);
	audio.addEventListener("error", errorLoad);
	audio.load();

	return audio;
}

function <Audio> LoadSoundFileByUrl(<string> url)
{
	return @@_Load(url);
}

// ここから各種音楽・効果音

// プリフィクス
// M_ ... 音楽,BGM

var<Audio> M_Dummy = @@_Load(Resources.General__muon_mp3); // ★サンプルとしてキープ
