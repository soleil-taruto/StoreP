/*
	�G - �A�C�e��
*/

/// ItemType_e
//
var<int> ItemType_e_POWER_UP = @(AUTO);
var<int> ItemType_e_ZANKI_UP = @(AUTO);

function <Enemy_t> CreateEnemy_Item(<double> x, <double> y, <ItemType_e> itemType)
{
	var ret =
	{
		Kind: @(SRCN),
		X: x,
		Y: y,
		HP: 0,
		Crash: null,

		// ��������ŗL

		<ItemType_e> ItemType: itemType,
		<double> YAdd: -3.0,
	};

	ret.Draw = @@_Draw(ret);
	ret.Damaged = @@_Damaged;
	ret.Dead = @@_Dead;

	return ret;
}

function <boolean> IsEnemy_Item(<Enemy_t> enemy)
{
	return enemy.Kind == @(SRCN);
}

function* <generatorForTask> @@_Draw(<Enemy_t> enemy)
{
	var<double> Y_ADD_ADD = 0.1;

	for (; ; )
	{
		enemy.YAdd += Y_ADD_ADD;
		enemy.Y += enemy.YAdd;

		if (FIELD_B < enemy.Y)
		{
			break;
		}

		enemy.Crash = CreateCrash_Rect(CreateD4Rect_XYWH(enemy.X, enemy.Y, 200.0, 140.0));

		{
			var<Image> picture;

			switch (enemy.ItemType)
			{
			case ItemType_e_POWER_UP: picture = P_PowerUpItem; break;
			case ItemType_e_ZANKI_UP: picture = P_ZankiUpItem; break;

			default:
				error();
			}

			Draw(picture, enemy.X, enemy.Y, 1.0, 0.0, 1.0);
		}

		yield 1;
	}
}

function <void> @@_Damaged(<Enemy_t> enemy, <int> damagePoint)
{
	// noop
}

function <void> @@_Dead(<Enemy_t> enemy)
{
	EnemyCommon_AddScore(50);
//	EnemyCommon_Dead(enemy); // �G�ł͂Ȃ��̂ŁA�ʏ�̓G_���S�C�x���g�͓K�p���Ȃ��B

//	AddEffect_PlayerPowerUp(PlayerX, PlayerY); // TODO
	SE(S_PowerUp);
}

function <Item_e> GetEnemyItemType(<Enemy_t> enemy)
{
	return enemy.ItemType;
}
