import { useEffect, useState } from "react";
import { getContact, getFaqs } from "../services/contactService";

export const useContact = () => {
  const [contact, setContact] = useState(null);
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getContact(), getFaqs()])
      .then(([contactData, faqsData]) => {
        setContact(contactData);
        setFaqs(faqsData);
      })
      .catch((err) => console.error("Contact error:", err))
      .finally(() => setLoading(false));
  }, []);

  return { contact, faqs, loading };
};