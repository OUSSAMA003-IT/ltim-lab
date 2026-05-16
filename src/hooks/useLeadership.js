import { useEffect, useState } from "react";
import { getLeadership } from "../services/leadershipService";

export const useLeadership = () => {
  const [leadership, setLeadership] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLeadership()
      .then(setLeadership)
      .catch((err) => console.error("Leadership error:", err))
      .finally(() => setLoading(false));
  }, []);

  return { leadership, loading };
};