import { useEffect, useState } from "react";
import { getContact } from "../services/contactService";

export const useContact = () => {
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getContact()
      .then(setContact)
      .catch((err) => console.error("Contact error:", err))
      .finally(() => setLoading(false));
  }, []);

  return { contact, loading };
};