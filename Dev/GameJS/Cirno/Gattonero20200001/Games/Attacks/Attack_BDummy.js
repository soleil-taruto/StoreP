/*
	Attack - BDummy šƒTƒ“ƒvƒ‹
*/

function* <generatorForTask> CreateAttack_BDummy()
{
	for (; ; )
	{
		if (
			GetInput_A() == 1 ||
			GetInput_B() == 1
			)
		{
			break;
		}

		AttackProcPlayer_Move();
		AttackProcPlayer_Fall();

		AttackProcPlayer_Side();
		AttackProcPlayer_Ceiling();
		AttackProcPlayer_Ground();

		Draw(P_PlayerStand, PlayerX - Camera.X, PlayerY - Camera.Y, 1.0, 0.0, 1.0);

		yield 1;
	}
}
