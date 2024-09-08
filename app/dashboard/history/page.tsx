// app/history/page.tsx

import React from "react";
import { db } from "@/utils/db";
import { AIOutput } from "@/utils/schema";
import { currentUser } from "@clerk/nextjs/server";
import { desc, eq } from "drizzle-orm";
import HistoryTable from "../_components/HistoryTable";

export interface HISTORY {
  id: number; // Updated to use `number` instead of `Number`
  formData: string;
  aiResponse: string;
  templateSlug: string;
  createdBy: string | null;
  createdAt: string | null;
}

const History = async () => {
  const user = await currentUser();

  const HistoryList: HISTORY[] = await db
    .select()
    .from(AIOutput)
    .where(
      eq(AIOutput.createdBy, user?.primaryEmailAddress?.emailAddress ?? "")
    )
    .orderBy(desc(AIOutput.id))
    .then((records) =>
      records.map((record) => ({
        ...record,
        aiResponse: record.aiResponse ?? "", // Convert null to empty string
      }))
    );

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">History</h1>
      <HistoryTable historyList={HistoryList} />
    </div>
  );
};

export default History;
