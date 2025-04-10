-- CreateTable
CREATE TABLE "PageFormEntry" (
    "id" SERIAL NOT NULL,
    "pageId" INTEGER NOT NULL,
    "formId" INTEGER NOT NULL,
    "data" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PageFormEntry_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PageFormEntry" ADD CONSTRAINT "PageFormEntry_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "Page"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PageFormEntry" ADD CONSTRAINT "PageFormEntry_formId_fkey" FOREIGN KEY ("formId") REFERENCES "Form"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
