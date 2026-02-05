import { Share, FileText, Trash2 } from "lucide-react";

interface CardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube";
}

function getYouTubeEmbedUrl(url: string) {
  try {
    const regex = /(?:youtu\.be\/|youtube\.com\/(?:.*v=|.*\/|embed\/))([^&?]*)/;
    const match = url.match(regex);
    const videoId = match ? match[1] : null;
    return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
  } catch (e) {
    return "";
  }
}

export const Card = ({ title, link, type }: CardProps) => {
  return (
    <div className="min-h-24 max-w-72 min-w-48 rounded-md border border-gray-200 bg-white p-8">
      <div className="flex items-center justify-between gap-4.5">
        <div className="text-md flex items-center gap-2 font-medium">
          <FileText size={20} color="gray" /> {title}
        </div>
        <div className="flex items-center gap-2.5">
          <a href={link} target="_blank">
            <Share size={20} color="gray" />
          </a>
          <Trash2 size={20} color="gray" />
        </div>
      </div>

      <div className="pt-4">
        {type === "youtube" && (
          <iframe
            className="aspect-video w-full rounded-md"
            src={getYouTubeEmbedUrl(link)}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        )}

        {type === "twitter" && (
          <blockquote className="twitter-tweet">
            <a href={link.replace("x.com", "twitter.com")}></a>
          </blockquote>
        )}
      </div>
    </div>
  );
};
