import { useEffect, useState } from "react";
import { getPartners } from "../services/partnersService";

export const usePartners = () => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPartners()
      .then(setPartners)
      .catch((err) => console.error("Partners error:", err))
      .finally(() => setLoading(false));
  }, []);

  return { partners, loading };
};