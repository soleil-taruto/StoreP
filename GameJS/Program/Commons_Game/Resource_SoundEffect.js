/*
	音楽・効果音
*/

function SE_t @@_Load(STR url)
{
	var<SE_t> ret =
	{
		// ハンドルのリスト(3つ)
		Handles:
		[
			LoadSoundFileByUrl(url),
			LoadSoundFileByUrl(url),
			LoadSoundFileByUrl(url),
		],

		// 次に再生するハンドルの位置
		Index: 0,
	};

	return ret;
}

// ここから各種音楽・効果音

// プリフィクス
// S_ ... 効果音(SE)

var SE_t S_Dummy = @@_Load(Resources.General__muon_mp3); // ★サンプルとしてキープ
