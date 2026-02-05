import { Plus, Share } from "lucide-react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { Sidebar } from "../components/Sidebar";

export function Dashboard() {
  return (
    <>
      <Sidebar />
      <div className="bg-gray-light ml-72 min-h-screen border-3 border-slate-200 p-4">
        <div className="flex justify-end gap-4">
          <Button variant="primary" className="flex">
            <Plus size={17} /> Add Content
          </Button>
          <Button variant="secondary">
            <Share size={17} /> Share
          </Button>
        </div>

        <div className="flex items-start gap-3">
          <Card
            title="first tweet"
            link="https://x.com/akshaymarch7/status/2019079873176682752"
            type="twitter"
          />

          <Card
            title="yt check"
            link="https://youtu.be/R_v8P4b17do?si=0Q6ekTRtznsjU2V0"
            type="youtube"
          />
        </div>
      </div>
    </>
  );
}
