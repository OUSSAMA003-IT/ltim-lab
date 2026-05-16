import { useEffect, useState } from "react";
import { getProjects } from "../services/projectsService";

export const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProjects()
      .then(setProjects)
      .catch((err) => console.error("Projects error:", err))
      .finally(() => setLoading(false));
  }, []);

  return { projects, loading };
};