/*
	�萔
*/

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
var<int> Field_L = ToInt((Screen_W - Field_W) / 2);

// �t�B�[���h�㑤(px)
var<int> Field_T = ToInt((Screen_H - Field_H) / 2);
