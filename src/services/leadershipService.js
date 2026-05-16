import { pb } from "../pocketbase";

export const getLeadership = async () => {
  const records = await pb.collection("leadership").getFullList();

  if (records.length === 0) return null;

  const r = records[0];

  return {
    director: r.director,
    viceDirector: r.viceDirector,
  };
};