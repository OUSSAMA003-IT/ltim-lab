import { useEffect, useState } from "react";
import { getAxes } from "../services/axesService";

export const useAxes = () => {
  const [axes, setAxes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAxes()
      .then(setAxes)
      .catch((err) => console.error("Axes error:", err))
      .finally(() => setLoading(false));
  }, []);

  return { axes, loading };
};