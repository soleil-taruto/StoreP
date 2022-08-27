#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include <windows.h>

#define APP_IDENT "{a361e0aa-7fa4-4d68-85f5-0cb8ffee4c5a}" // アプリ毎に変更する。

#define STOP_EV_NAME APP_IDENT "_STOP_CRON"
#define PERIOD_SEC 60

static time_t CurrTime;

static void RunIfTimeout(char *command, int periodSec)
{
	int remSec = (int)(CurrTime % periodSec);

	printf("Command: %s (%d, %d, %d)\n", command, periodSec, remSec, periodSec - remSec);

	if (remSec == 0)
		system(command);

	printf("Command_End\n");
}
static void RunIfTimeoutAll(void)
{
	printf("----\n");
	printf("%s", ctime(&CurrTime));

	// 周期は PERIOD_SEC の倍数であること。

	RunIfTimeout(".\\Cron1m.bat", 60);
	RunIfTimeout(".\\Cron3m.bat", 60 * 3);
	RunIfTimeout(".\\Cron10m.bat", 60 * 10);
	RunIfTimeout(".\\Cron30m.bat", 60 * 30);
	RunIfTimeout(".\\Cron1h.bat", 3600);
	RunIfTimeout(".\\Cron3h.bat", 3600 * 3);
	RunIfTimeout(".\\Cron10h.bat", 3600 * 10);
	RunIfTimeout(".\\Cron30h.bat", 3600 * 30);
}
void main(int argc, char **argv)
{
	HANDLE evStop = CreateEventA(NULL, 0, 0, STOP_EV_NAME);
	int waitSec;

	if (evStop == NULL)
	{
		printf("Error: CreateEventA()\n");
		exit(1);
	}

	if (argc == 2 && !_stricmp(argv[1], "/S"))
	{
		SetEvent(evStop);
		printf("SetEvent_Stop\n");
		goto endProc;
	}

	printf("ST_Cron\n");

	CurrTime = 0;
	RunIfTimeoutAll();
	CurrTime = (time(NULL) / PERIOD_SEC) * PERIOD_SEC;

	do
	{
		RunIfTimeoutAll();
		CurrTime += PERIOD_SEC;

		waitSec = CurrTime - time(NULL);
		waitSec = __max(waitSec, PERIOD_SEC - PERIOD_SEC / 2);
		waitSec = __min(waitSec, PERIOD_SEC + PERIOD_SEC / 2);

		printf("waitSec: %d\n", waitSec);
	}
	while (WaitForSingleObject(evStop, waitSec * 1000) == WAIT_TIMEOUT);

	printf("ED_Cron\n");

endProc:
	CloseHandle(evStop);
}
