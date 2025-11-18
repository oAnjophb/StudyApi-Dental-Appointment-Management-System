/*
  Warnings:

  - You are about to drop the `Agendamento` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Dentist` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Disponibility` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Patient` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ScheduleLock` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Servico` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_DentistToServico` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'RECEPTIONIST', 'DENTIST');

-- CreateEnum
CREATE TYPE "AppointmentStatus" AS ENUM ('SCHEDULED', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED', 'NO_SHOW', 'CANCELLED');

-- CreateEnum
CREATE TYPE "Weekday" AS ENUM ('SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY');

-- DropForeignKey
ALTER TABLE "Agendamento" DROP CONSTRAINT "Agendamento_dentistaId_fkey";

-- DropForeignKey
ALTER TABLE "Agendamento" DROP CONSTRAINT "Agendamento_pacienteId_fkey";

-- DropForeignKey
ALTER TABLE "Agendamento" DROP CONSTRAINT "Agendamento_servicoId_fkey";

-- DropForeignKey
ALTER TABLE "Disponibility" DROP CONSTRAINT "Disponibility_dentistaId_fkey";

-- DropForeignKey
ALTER TABLE "ScheduleLock" DROP CONSTRAINT "ScheduleLock_dentistaId_fkey";

-- DropForeignKey
ALTER TABLE "_DentistToServico" DROP CONSTRAINT "_DentistToServico_A_fkey";

-- DropForeignKey
ALTER TABLE "_DentistToServico" DROP CONSTRAINT "_DentistToServico_B_fkey";

-- DropTable
DROP TABLE "Agendamento";

-- DropTable
DROP TABLE "Dentist";

-- DropTable
DROP TABLE "Disponibility";

-- DropTable
DROP TABLE "Patient";

-- DropTable
DROP TABLE "ScheduleLock";

-- DropTable
DROP TABLE "Servico";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "_DentistToServico";

-- DropEnum
DROP TYPE "AgendamentoStatus";

-- DropEnum
DROP TYPE "Role";

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "UserRole" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dentists" (
    "userId" INTEGER NOT NULL,
    "specialty" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "patients" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "birthDate" TIMESTAMP(3),
    "address" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "patients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "services" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "price" DECIMAL(65,30),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dentist_services" (
    "dentistId" INTEGER NOT NULL,
    "serviceId" INTEGER NOT NULL,

    CONSTRAINT "dentist_services_pkey" PRIMARY KEY ("dentistId","serviceId")
);

-- CreateTable
CREATE TABLE "appointments" (
    "id" SERIAL NOT NULL,
    "startDateTime" TIMESTAMP(3) NOT NULL,
    "endDateTime" TIMESTAMP(3) NOT NULL,
    "status" "AppointmentStatus" NOT NULL DEFAULT 'SCHEDULED',
    "patientId" INTEGER NOT NULL,
    "dentistId" INTEGER NOT NULL,
    "serviceId" INTEGER NOT NULL,
    "createdById" INTEGER NOT NULL,
    "updatedById" INTEGER,
    "originalAppointmentId" INTEGER,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "appointments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "availabilities" (
    "id" SERIAL NOT NULL,
    "weekday" "Weekday" NOT NULL,
    "startTime" INTEGER NOT NULL,
    "endTime" INTEGER NOT NULL,
    "dentistId" INTEGER NOT NULL,

    CONSTRAINT "availabilities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "schedule_locks" (
    "id" SERIAL NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "reason" TEXT,
    "dentistId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "schedule_locks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "dentists_userId_key" ON "dentists"("userId");

-- CreateIndex
CREATE INDEX "appointments_dentistId_startDateTime_idx" ON "appointments"("dentistId", "startDateTime");

-- CreateIndex
CREATE INDEX "appointments_patientId_idx" ON "appointments"("patientId");

-- CreateIndex
CREATE UNIQUE INDEX "availabilities_dentistId_weekday_startTime_key" ON "availabilities"("dentistId", "weekday", "startTime");

-- AddForeignKey
ALTER TABLE "dentists" ADD CONSTRAINT "dentists_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dentist_services" ADD CONSTRAINT "dentist_services_dentistId_fkey" FOREIGN KEY ("dentistId") REFERENCES "dentists"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dentist_services" ADD CONSTRAINT "dentist_services_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_dentistId_fkey" FOREIGN KEY ("dentistId") REFERENCES "dentists"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_originalAppointmentId_fkey" FOREIGN KEY ("originalAppointmentId") REFERENCES "appointments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "availabilities" ADD CONSTRAINT "availabilities_dentistId_fkey" FOREIGN KEY ("dentistId") REFERENCES "dentists"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schedule_locks" ADD CONSTRAINT "schedule_locks_dentistId_fkey" FOREIGN KEY ("dentistId") REFERENCES "dentists"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
