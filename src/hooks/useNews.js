import { useEffect, useState } from "react";
import { fetchNews } from "../services/newsService";

/* =========================================================
   CUSTOM HOOK: NEWS
========================================================= */
export function useNews() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadNews = async () => {
      try {
        const data = await fetchNews();
        setNews(data);
      } catch (err) {
        setError(err);
        console.error("useNews error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, []);

  return { news, loading, error };
}