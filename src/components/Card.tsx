import { Link } from "react-router";
import { File, Share, FileText, Trash2 } from "lucide-react";
import React from "react";

interface CardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube";
}

export const Card = ({ title, link, type }: CardProps) => {
  return (
    <div className="min-h-48 max-w-72 min-w-48 rounded-md border border-gray-200 bg-white p-8">
      <div className="flex items-center justify-between gap-4.5">
        <div className="text-md flex items-center gap-2 font-medium">
          <FileText size={20} color="gray" /> Project Ideas
        </div>
        <div className="flex items-center">
          <Link to={link} target="_blank">
            <Share size={20} color="gray" />
          </Link>
          <Trash2 size={20} color="gray" />
        </div>
      </div>
    </div>
  );
};
