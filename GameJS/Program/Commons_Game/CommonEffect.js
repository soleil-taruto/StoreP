/*
	共通エフェクト
*/

var GEN[] @@_Effects = [];

/*
	エフェクトを追加する。

	effect: ジェネレータであること。
		ジェネレータが偽を返すと終了と見なす。
*/
function void AddCommonEffect(GEN effect)
{
	@@_Effects.push(effect);
}

function void @(UNQN)_EACH()
{
	var execute = function(effect)
	{
		return effect.next().value;
	};

	@@_Effects = @@_Effects.filter(execute);
}
