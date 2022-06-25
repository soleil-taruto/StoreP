/*
	ゲームパッド入力
*/

var<boolean> @@_Dir_2 = false;
var<boolean> @@_Dir_4 = false;
var<boolean> @@_Dir_6 = false;
var<boolean> @@_Dir_8 = false;
var<boolean[]> @@_Status = [];

function <void> @@_EACH()
{
	@@_Dir_2 = false;
	@@_Dir_4 = false;
	@@_Dir_6 = false;
	@@_Dir_8 = false;
	@@_Status = [];

	var<Gamepad[]> gamepads;

	if (window.navigator.getGamepads)
	{
		gamepads = window.navigator.getGamepads();
	}
	else if (window.navigator.webkitGetGamepads)
	{
		gamepads = window.navigator.webkitGetGamepads();
	}
	else
	{
		gamepads = [];
	}

	for (var<Gamepad> gamepad of gamepads)
	{
		if (gamepad)
		{
			@@_Dir_2 = @@_Dir_2 || gamepad.axes[1] >  0.5;
			@@_Dir_4 = @@_Dir_4 || gamepad.axes[0] < -0.5;
			@@_Dir_6 = @@_Dir_6 || gamepad.axes[0] >  0.5;
			@@_Dir_8 = @@_Dir_8 || gamepad.axes[1] < -0.5;

			var<int> index = 0;
			for (var<GamepadButton> button of gamepad.buttons)
			{
				@@_Status[index] = @@_Status[index] || button.pressed;
				index++;
			}
		}
	}
}

function <boolean> GetPadInput_2()
{
	return @@_Dir_2;
}

function <boolean> GetPadInput_4()
{
	return @@_Dir_4;
}

function <boolean> GetPadInput_6()
{
	return @@_Dir_6;
}

function <boolean> GetPadInput_8()
{
	return @@_Dir_8;
}

function <boolean> GetPadInput(<int> index)
{
	return !!@@_Status[index];
}
