import { Plus, Share } from "lucide-react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { Sidebar } from "../components/Sidebar";
import { CreateComponent } from "../components/CreateComponent";
import { useEffect, useState } from "react";
import useContent from "../hooks/useContent";
import api from "../lib/axios";
import toast from "react-hot-toast";

export function Dashboard() {
  const [modelOpen, setModelOpen] = useState(false);
  const { content, refresh } = useContent();

  useEffect(() => {
    refresh();
  }, [modelOpen]);
  return (
    <>
      <Sidebar />
      <div className="bg-gray-light ml-72 min-h-screen border-3 border-slate-200 p-4">
        <CreateComponent open={modelOpen} onClose={() => setModelOpen(false)} />

        <div className="flex justify-end gap-4">
          <Button
            variant="primary"
            className="flex"
            onClick={() => setModelOpen(true)}
          >
            <Plus size={17} /> Add Content
          </Button>
          <Button
            onClick={async () => {
              try {
                const res = await api.post(
                  "/v1/brain/share",
                  {
                    share: true,
                  },
                  {
                    headers: {
                      Authorization: localStorage.getItem("token") ?? "",
                    },
                  },
                );

                const hash: string | undefined =
                  res.data?.hash ??
                  (typeof res.data?.message === "string"
                    ? res.data.message.replace(/^\//, "")
                    : undefined);

                if (!hash) {
                  toast.error("Could not generate share link.");
                  return;
                }

                const shareUrl = `${window.location.origin}/share/${hash}`;

                await navigator.clipboard.writeText(shareUrl);

                toast.success("Link copied to clipboard!");
              } catch {
                toast.error("Failed to generate share link.");
              }
            }}
            variant="secondary"
          >
            <Share size={17} /> Share
          </Button>
        </div>

        <div className="flex flex-wrap items-start gap-3">
          {content.map(({ type, link, title }) => (
            <Card type={type} link={link} title={title} />
          ))}
        </div>
      </div>
    </>
  );
}
