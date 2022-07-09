/*
	“G‹¤’Ê
*/

function <void> EnemyCommon_Dead(<Enemy_t> enemy)
{
	AddEffect_Explode(FIELD_L + enemy.X, FIELD_T + enemy.Y);
}
