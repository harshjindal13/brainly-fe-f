import { Brain, Twitter, Youtube } from "lucide-react";
import { SidebarItems } from "./SidebarItems";

export const Sidebar = () => {
  return (
    <div className="fixed top-0 left-0 h-screen w-72 overflow-hidden border-r bg-white">
      <div className="flex items-center gap-2 p-3 text-xl">
        <Brain size={33} stroke="#7f22fe" /> Second Brain
      </div>
      <SidebarItems icon={Twitter} text="Twitter" color="blue" />
      <SidebarItems icon={Youtube} text="Youtube" color="red" />
    </div>
  );
};
