/*
	ゲーム・ローディング画面
*/

var<int> @@_LOADING_MAX = -1;

function <void> PrintGameLoading()
{
	if (@@_LOADING_MAX == -1)
	{
		@@_LOADING_MAX = Loading;

		CanvasBox = document.getElementById("Gattonero20200001-CanvasBox");
		CanvasBox.style.width  = Screen_W;
		CanvasBox.style.height = Screen_H;
	}
	CanvasBox.innerText = ((@@_LOADING_MAX - Loading) * 100.0 / @@_LOADING_MAX) + " PCT LOADED...";
}

function <void> PrintGameLoaded()
{
	PrintGameLoading(); // force init

	CanvasBox.innerText = "";
	CanvasBox = null;
}
