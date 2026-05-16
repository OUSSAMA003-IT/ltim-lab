import { useEffect, useState } from "react";
import { getStats } from "../services/statsService";

export const useStats = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStats()
      .then(setStats)
      .catch((err) => console.error("Stats error:", err))
      .finally(() => setLoading(false));
  }, []);

  return { stats, loading };
};