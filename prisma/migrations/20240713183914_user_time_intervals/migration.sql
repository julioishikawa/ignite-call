-- CreateTable
CREATE TABLE "user_time_intervals" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "weekDay" INTEGER NOT NULL,
    "timeStartInMinutes" INTEGER NOT NULL,
    "TimeEndInMinutes" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "user_time_intervals_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
