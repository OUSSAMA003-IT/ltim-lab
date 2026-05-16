import { useEffect, useState } from "react";
import { getTeams } from "../services/teamsService";

export const useTeams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTeams()
      .then(setTeams)
      .catch((err) => console.error("Teams error:", err))
      .finally(() => setLoading(false));
  }, []);

  return { teams, loading };
};