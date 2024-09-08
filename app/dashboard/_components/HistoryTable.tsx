"use client";

import React, { useState } from "react";
import Templates from "@/app/(data)/Templates";
import { Button } from "@/components/ui/button";
import { HISTORY } from "@/app/dashboard/history/page";

interface HistoryTableProps {
  historyList: HISTORY[];
}

const HistoryTable: React.FC<HistoryTableProps> = ({ historyList }) => {
  const [copied, setCopied] = useState<string | null>(null);

  const getTemplateName = (slug: string): string => {
    const template = Templates?.find((item) => item.slug === slug);
    return template?.name || "Unknown Template";
  };

  const handleCopy = (text: string, id: number) => {
    navigator.clipboard.writeText(text);
    setCopied(id.toString());
    setTimeout(() => setCopied(null), 2000); // Reset after 2 seconds
  };

  return (
    <table className="w-full text-left border-collapse">
      <thead>
        <tr>
          <th className="border-b-2 pb-2">Template</th>
          <th className="border-b-2 pb-2">AI Response</th>
          <th className="border-b-2 pb-2">Date</th>
          <th className="border-b-2 pb-2">Words</th>
          <th className="border-b-2 pb-2">Copy</th>
        </tr>
      </thead>
      <tbody>
        {historyList.map((item, index) => (
          <tr key={index}>
            <td className="border-b py-2">{getTemplateName(item.templateSlug)}</td>
            <td className="border-b py-2 truncate max-w-xs">{item.aiResponse}</td>
            <td className="border-b py-2">{item.createdAt}</td>
            <td className="border-b py-2">{item.aiResponse.split(" ").length}</td>
            <td className="border-b py-2">
              <Button
                onClick={() => handleCopy(item.aiResponse, item.id)}
                className="relative"
              >
                Copy
                {copied === item.id.toString() && (
                  <span className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 text-sm text-green-500 animate-fade">
                    Copied!
                  </span>
                )}
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default HistoryTable;
