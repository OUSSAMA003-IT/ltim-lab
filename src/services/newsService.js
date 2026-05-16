import { pb } from "../pocketbase.js";

/* =========================================================
   FETCH NEWS
========================================================= */
export const fetchNews = async () => {
  try {
    const records = await pb.collection("news").getFullList({
      sort: "-pinned, -created",
    });

    return records;
  } catch (err) {
    console.error("NEWS ERROR:", err);
    return [];
  }
};