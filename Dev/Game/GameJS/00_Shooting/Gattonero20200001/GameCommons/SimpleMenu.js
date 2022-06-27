/*
	シンプル・メニュー
*/

var<int> @@_ITEM_H = 30;
var<int> @@_TEXT_T = 20;

function* <generatorForTask> SimpleMenu(<int> selectIndex, <int> x, <int> y, <int> yStep, <string[]> items, <Action> wallDrawer)
{
	FreezeInput();

gameLoop:
	for (; ; )
	{
		if (GetMouseDown() == -1)
		{
			var<double> mx = GetMouseX();
			var<double> my = GetMouseY();

			for (var<int> index = 0; index < items.length; index++)
			{
				if (!IsOut(
					CreateD2Point(mx, my),
					CreateD4Rect(0, y + yStep * index, Screen_W, @@_ITEM_H),
					0.0
					))
				{
					selectIndex = index;
					break gameLoop;
				}
			}
		}
		if (IsPound(GetInput_8()))
		{
			selectIndex--;
		}
		if (IsPound(GetInput_2()))
		{
			selectIndex++;
		}
		if (GetInput_A() == 1)
		{
			break;
		}
		if (GetInput_B() == 1)
		{
			if (selectIndex == items.length - 1)
			{
				break;
			}
			selectIndex = items.length - 1;
		}

		selectIndex += items.length;
		selectIndex %= items.length;

		wallDrawer();

		for (var<int> index = 0; index < items.length; index++)
		{
			if (index == selectIndex)
			{
				SetColor("#ffff00a0");
			}
			else
			{
				SetColor("#ffffffa0");
			}
			PrintRect(0, y, Screen_W, @@_ITEM_H);
			SetColor("#000000");
			SetPrint(x, y + @@_TEXT_T, 0);
			PrintLine(items[index]);
		}

		yield 1;
	}
	FreezeInput();

	return selectIndex;
}
