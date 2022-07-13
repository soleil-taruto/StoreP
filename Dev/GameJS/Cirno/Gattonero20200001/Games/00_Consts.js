/*
	定数
*/

/*
	マップセル・サイズ (ドット単位・画面上のサイズ)
*/
var<int> TILE_W = 32;
var<int> TILE_H = 32;

// ----
// プレイヤー情報ここから
// ----

/*
	プレイヤーキャラクタの重力加速度
*/
var<double> PLAYER_GRAVITY = 0.9;

/*
	プレイヤーキャラクタの落下最高速度
*/
var<double> PLAYER_FALL_SPEED_MAX = 8.0;

/*
	プレイヤーキャラクタの(横移動)速度
*/
var<double> PLAYER_SPEED = 6.0;

/*
	プレイヤーキャラクタの低速移動時の(横移動)速度
*/
var<double> PLAYER_SLOW_SPEED = 2.0;

/*
	プレイヤーキャラクタのジャンプによる上昇速度
*/
var<double> PLAYER_JUMP_SPEED = -8.0;

// 上昇が速すぎると、脳天判定より先に側面判定に引っ掛かってしまう可能性がある。
// -- ( -(PLAYER_ジャンプによる上昇速度) < 脳天判定Pt_Y - 側面判定Pt_Y ) を維持すること。
// 下降が速すぎると、接地判定より先に側面判定に引っ掛かってしまう可能性がある。
// -- ( PLAYER_FALL_SPEED_MAX < 接地判定Pt_Y - 側面判定Pt_Y ) を維持すること。

var<double> PLAYER_側面判定Pt_X = TILE_W / 2.0;
var<double> PLAYER_側面判定Pt_Y = TILE_H / 4.0;
var<double> PLAYER_脳天判定Pt_X = TILE_W / 2.0 - 1.0;
var<double> PLAYER_脳天判定Pt_Y = TILE_H / 2.0;
var<double> PLAYER_接地判定Pt_X = TILE_W / 2.0 - 3.001;
var<double> PLAYER_接地判定Pt_Y = TILE_H / 2.0;

// ----
// プレイヤー情報ここまで
// ----

/// GameEndReason_e
//
var<int> GameEndReason_e_NORMAL = @(AUTO);
var<int> GameEndReason_e_RETURN_MENU = @(AUTO);
