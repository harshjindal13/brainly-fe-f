import { useEffect, useState } from "react";
import api from "../lib/axios";

export default function useContent() {
  const [content, setContent] = useState([]);

  function refresh() {
    api
      .get("/v1/content", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setContent(res.data.content);
      });
  }

  useEffect(() => {
    refresh();

    let interval = setInterval(() => {
      refresh();
    }, 10 * 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return { content, refresh };
}
