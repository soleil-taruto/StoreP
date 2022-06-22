/*
	定数
*/

/*
	設定ボタンの大きさと位置
*/
var<int> GameCfgBtn_W = 300;
var<int> GameCfgBtn_H = 85;
var<int> GameCfgBtn_L_1 = 25;
var<int> GameCfgBtn_L_2 = 350;
var<int> GameCfgBtn_L_3 = 675;
var<int> GameCfgBtn_T_1 = 10;
var<int> GameCfgBtn_T_2 = 105;

/*
	フィールド等表示する領域
*/
var<int> GameArea_L = 0;
var<int> GameArea_T = 200;
var<int> GameArea_W = Screen_W;
var<int> GameArea_H = Screen_H - 200;

// セル幅(px)
var<int> Cell_W = 60;

// セル高さ(px)
var<int> Cell_H = 60;

// フィールド横方向のセル数
var<int> Field_XNum = 7;

// フィールド縦方向のセル数
var<int> Field_YNum = 7;

// フィールド幅(px)
var<int> Field_W = Cell_W * Field_XNum;

// フィールド高さ(px)
var<int> Field_H = Cell_H * Field_YNum;

// フィールド左側(px)
var<int> Field_L = GameArea_L + ToInt((GameArea_W - Field_W) / 2);

// フィールド上側(px)
var<int> Field_T = GameArea_T + ToInt((GameArea_H - Field_H) / 2);
