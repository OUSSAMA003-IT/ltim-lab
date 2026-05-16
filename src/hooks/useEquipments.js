import { useEffect, useState } from "react";
import { getEquipments } from "../services/equipmentsService";

export const useEquipments = () => {
  const [equipments, setEquipments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEquipments()
      .then(setEquipments)
      .catch((err) => console.error("Equipments error:", err))
      .finally(() => setLoading(false));
  }, []);

  return { equipments, loading };
};