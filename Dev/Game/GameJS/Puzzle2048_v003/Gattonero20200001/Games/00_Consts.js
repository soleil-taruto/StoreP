/*
	�萔
*/

/*
	�ݒ�{�^���̑傫���ƈʒu
*/
var<int> GameCfgBtn_W = 240;
var<int> GameCfgBtn_H = 85;
var<int> GameCfgBtn_L_1 = 8 * 1 + 240 * 0;
var<int> GameCfgBtn_L_2 = 8 * 2 + 240 * 1;
var<int> GameCfgBtn_L_3 = 8 * 3 + 240 * 2;
var<int> GameCfgBtn_L_4 = 8 * 4 + 240 * 3;
var<int> GameCfgBtn_T_1 = 10 * 1 + 85 * 0;
var<int> GameCfgBtn_T_2 = 10 * 2 + 85 * 1;

/*
	�t�B�[���h���\������̈�
*/
var<int> GameArea_L = 0;
var<int> GameArea_T = 200;
var<int> GameArea_W = Screen_W;
var<int> GameArea_H = Screen_H - 200;

// �Z����(px)
var<int> Cell_W = 60;

// �Z������(px)
var<int> Cell_H = 60;

// �t�B�[���h�������̃Z����
var<int> Field_XNum = 7;

// �t�B�[���h�c�����̃Z����
var<int> Field_YNum = 7;

// �t�B�[���h��(px)
var<int> Field_W = Cell_W * Field_XNum;

// �t�B�[���h����(px)
var<int> Field_H = Cell_H * Field_YNum;

// �t�B�[���h����(px)
var<int> Field_L = GameArea_L + ToInt((GameArea_W - Field_W) / 2);

// �t�B�[���h�㑤(px)
var<int> Field_T = GameArea_T + ToInt((GameArea_H - Field_H) / 2);
