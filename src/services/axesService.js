import { pb } from "../pocketbase";

export const getAxes = async () => {
  const records = await pb.collection("axes").getFullList({
    sort: "order",
  });

  return records.map((r) => ({
    id: r.id,
    title: r.title,
    description: r.description,
  }));
};