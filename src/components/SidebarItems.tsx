import type { LucideIcon } from "lucide-react";
import { cn } from "../lib/utils";

interface SidebarItemsProps {
  text: string;
  icon: LucideIcon;
  className?: string;
  onClick?: () => void;
  // iconClassName?: string;
  color?: string;
}

export const SidebarItems = ({
  text,
  icon: Icon,
  className,
  onClick,
  // iconClassName,
  color,
}: SidebarItemsProps) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "mx-4 flex cursor-pointer items-center gap-3 p-2", //layout
        "text-gray-600 hover:text-gray-900", // Default color
        "rounded-lg transition-all hover:bg-gray-100", // hover effect
        "max-w-200px w-full", //Sizing
        className, // Allow external overrides
      )}
    >
      <Icon size={22} fill={color} className={cn("shrink-0")} />

      <span className="font-medium">{text}</span>
    </div>
  );
};
