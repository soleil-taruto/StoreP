#include <windows.h>
#include <stdlib.h>
#include <stdio.h>
#include <math.h>
#include <time.h>

#define W 4
#define H 4

static void Error(void)
{
	printf("ERROR\n");
	exit(1);
}

static unsigned __int64 XS_X = 1;

static unsigned int Xorshift(void) // Xorshift-64
{
	XS_X ^= XS_X << 13;
	XS_X ^= XS_X >> 7;
	XS_X ^= XS_X << 17;

	return XS_X;
}

typedef struct
{
	int SpaceX;
	int SpaceY;
	int Cells[W][H];
}
Table_t;

static Table_t CreateTable(void)
{
	Table_t table;
	int x;
	int y;

	table.SpaceX = W - 1;
	table.SpaceY = H - 1;

	for (x = 0; x < W; x++)
	for (y = 0; y < H; y++)
	{
		table.Cells[x][y] = 1 + x + y * W;
	}
	table.Cells[W - 1][H - 1] = 0;

	return table;
}

static void Slide(Table_t *table, int nx, int ny)
{
	int tmp = table->Cells[table->SpaceX][table->SpaceY];

	table->Cells[table->SpaceX][table->SpaceY] = table->Cells[nx][ny];
	table->Cells[nx][ny] = tmp;
	table->SpaceX = nx;
	table->SpaceY = ny;
}

static void ShuffleTable(Table_t *table)
{
	int c;

	for (c = 0; c < W * H * 100; c++)
	{
		int nx = table->SpaceX;
		int ny = table->SpaceY;

		switch (Xorshift() % 4)
		{
		case 0: nx--; break;
		case 1: ny--; break;
		case 2: nx++; break;
		case 3: ny++; break;

		default:
			Error();
		}

		if (
			nx < 0 ||
			ny < 0 ||
			W <= nx ||
			H <= ny
			)
			continue;

		Slide(table, nx, ny);
	}
}

static Table_t Solve(Table_t table)
{
	return table; // TODO
}

// TODO
// TODO
// TODO

main()
{
	Table_t table = CreateTable();

	XS_X = time(NULL);
	ShuffleTable(&table);

	table = Solve(table);
}
