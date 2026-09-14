-- CreateEnum
CREATE TYPE "DeviceType" AS ENUM ('LAPTOP', 'SMARTPHONE', 'TABLET', 'DESKTOP', 'GAMING_CONSOLE', 'TV', 'OTHER');

-- CreateEnum
CREATE TYPE "DeviceCondition" AS ENUM ('WORKS_NORMALLY', 'WORKS_WITH_PROBLEMS', 'BARELY_WORKS', 'DOES_NOT_WORK', 'PHYSICALLY_DAMAGED');

-- CreateEnum
CREATE TYPE "UserIntent" AS ENUM ('KEEP_USING', 'REPAIR', 'SELL_OR_DONATE', 'RECYCLE', 'NOT_SURE');

-- CreateEnum
CREATE TYPE "AssessmentStatus" AS ENUM ('IN_PROGRESS', 'COMPLETED', 'FAILED');

-- CreateEnum
CREATE TYPE "ImageType" AS ENUM ('DEVICE', 'CIRCUIT', 'SCREEN', 'PORT', 'DAMAGE', 'OTHER');

-- CreateEnum
CREATE TYPE "RecommendationAction" AS ENUM ('KEEP_USING', 'REPAIR', 'REUSE', 'SELL_OR_DONATE', 'DATA_ERASURE', 'RECYCLE', 'EVALUATE');

-- CreateEnum
CREATE TYPE "RecommendationPriority" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "devices" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "DeviceType" NOT NULL,
    "brand" TEXT,
    "model" TEXT,
    "purchaseYear" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "devices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "assessments" (
    "id" TEXT NOT NULL,
    "deviceId" TEXT NOT NULL,
    "condition" "DeviceCondition",
    "userIntent" "UserIntent",
    "status" "AssessmentStatus" NOT NULL DEFAULT 'IN_PROGRESS',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "assessments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "assessment_images" (
    "id" TEXT NOT NULL,
    "assessmentId" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "imageType" "ImageType" NOT NULL DEFAULT 'DEVICE',
    "metadata" JSONB,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "assessment_images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ai_analyses" (
    "id" TEXT NOT NULL,
    "assessmentId" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "deviceCategory" TEXT,
    "observations" JSONB NOT NULL,
    "damageDetected" BOOLEAN,
    "confidence" DOUBLE PRECISION,
    "rawResponse" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ai_analyses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recommendations" (
    "id" TEXT NOT NULL,
    "assessmentId" TEXT NOT NULL,
    "action" "RecommendationAction" NOT NULL,
    "priority" "RecommendationPriority" NOT NULL DEFAULT 'MEDIUM',
    "reason" TEXT NOT NULL,
    "dataSafetyRequired" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "recommendations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "devices_userId_idx" ON "devices"("userId");

-- CreateIndex
CREATE INDEX "assessments_deviceId_idx" ON "assessments"("deviceId");

-- CreateIndex
CREATE INDEX "assessment_images_assessmentId_idx" ON "assessment_images"("assessmentId");

-- CreateIndex
CREATE INDEX "ai_analyses_assessmentId_idx" ON "ai_analyses"("assessmentId");

-- CreateIndex
CREATE INDEX "recommendations_assessmentId_idx" ON "recommendations"("assessmentId");

-- AddForeignKey
ALTER TABLE "devices" ADD CONSTRAINT "devices_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assessments" ADD CONSTRAINT "assessments_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "devices"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assessment_images" ADD CONSTRAINT "assessment_images_assessmentId_fkey" FOREIGN KEY ("assessmentId") REFERENCES "assessments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ai_analyses" ADD CONSTRAINT "ai_analyses_assessmentId_fkey" FOREIGN KEY ("assessmentId") REFERENCES "assessments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recommendations" ADD CONSTRAINT "recommendations_assessmentId_fkey" FOREIGN KEY ("assessmentId") REFERENCES "assessments"("id") ON DELETE CASCADE ON UPDATE CASCADE;
